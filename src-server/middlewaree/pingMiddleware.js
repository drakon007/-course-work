import ping from 'ping';

/*
get status and ip one pc in array
# array = [status, ip]
*/
export default async function pingOneByName(namePc) {
    let arr = []; 
    let resPC = await ping.promise.probe(namePc, {
       timeout: 1, //time ping
    });
    arr.push(resPC.alive); //add in arr
    arr.push(resPC.numeric_host);
    return arr;
}

/*
get status and ip many pc in array
# array = [status1, ip2, status2, ip2 ... statusN, ipN]
*/
export default async function pingManyPcByNameIngroup(arrNamePc) {

    try {
        let arrPcFinish = [];

        for (let host of arrNamePc) {
            
        }

        // let live = [];
        // for(let host of hosts) {
        //    let res = await ping.promise.probe(host, {
        //       timeout: 1,
        //    });
        //    live.push(res.alive);
        //    live.push(res.numeric_host);
        // }

        // for (let i=0 , j=0; i < pc.length; i++, j+=2) {
           
        //    arrPC.push(
        //       {
        //          name: pc[i].name,
        //          ip: pc[i].ip,
        //          lasttime: pc[i].lasttime,
        //          isAlive: live[j]
        //       }) 
        // }
        // return arrPC;
       } catch (error) {
        console.log(error, "ошибка, запрос на все ПК");
        return res.status(403).json({ message: "У вас нет доступа сюда" });
       }

}