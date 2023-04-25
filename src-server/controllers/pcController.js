import * as dotenv from "dotenv";
dotenv.config();
import ping from "ping";

import { User } from "../models/User.js";
import { Role } from "../models/Role.js";
import { Pc } from "../models/Pc.js";

const SECRET_KEY = process.env.SECRET_KEY;
const  secret = `${SECRET_KEY}`;

export async function getAll(req, res) {

     try {

      const pc = await Pc.find();
      console.log(pc);
      return res.status(200).json(pc);

     } catch (error) {

        console.log(error, "ошибка нет токена авторизации");
        return res.status(403).json({ message: "У вас нет доступа сюда" });

     }

}

export async function getOne(req, res) {

   const pcId = req.params.id;

    try {
   
      const pc = await Pc.findById(pcId);
      return res.status(200).json(pc);

    } catch (error) {

       console.log(error, "ошибка нет токена авторизации");
       return res.status(403).json({ message: "У вас нет доступа сюда" });

    }

}

export async function pingOne(req, res) {

    try {

      let hosts = ['10.100.3.3', '10.100.3.4'];
      let arr = [];
      for(let host of hosts){
         let res = await ping.promise.probe(host);
         console.log(res);
         arr.push(res)
     }  
     
      console.log(arr)
      return res.status(200, {'Content-Type': 'text/html; charset=utf-8'}).json(arr);
      

    } catch (error) {

       console.log(error, "ошибка нет токена авторизации");
       return res.status(403).json({ message: "У вас нет доступа сюда" });

    }

}