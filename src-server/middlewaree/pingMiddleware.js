import ping from 'ping';
import { Pc } from "../models/Pc.js";

/*
get status and ip one pc in array
# array = [status, ip]
*/
export async function pingOneByName(namePc) {
    let arr = []; 
    let Pc = await ping.promise.probe(namePc, {
       timeout: 1, //time ping
    });
    //add info for pc in arr
    arr.push(Pc.alive);
    arr.push(Pc.numeric_host);
    return arr;
}

/*
get name, ip, lasttime, isAlive
# array = [name1, ip1, lasttime1, isAlive1 ... nameN, ipN, lasttimeN, isAliveN]
*/
export async function pingAllPcByNameAndCheckLive() {

    let arrPc = [];

    const pc = await Pc.find();

    let hosts = [];
    for (let host of pc) {
        hosts.push(host.name);
    }

    let live = [];
    for(let host of hosts) {
        let res = await ping.promise.probe(host, {
        timeout: 1});
        live.push(res.alive);
        live.push(res.numeric_host);
    }

    for (let i=0 , j=0; i < pc.length; i++, j+=2) {
        arrPc.push(
        {
            _id: pc[i]._id,
            name: pc[i].name,
            ip: pc[i].ip,
            lasttime: pc[i].lasttime,
            isAlive: live[j]
        }) 
    }
    return arrPc;
}