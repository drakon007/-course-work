import * as dotenv from "dotenv";
dotenv.config();

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
   
      const ps = await Pc.findById(pcId);
      console.log(ps);

      //todo -----


      const pc = await Pc.find();
      console.log(pc);
      return res.status(200).json(pc);

    } catch (error) {

       console.log(error, "ошибка нет токена авторизации");
       return res.status(403).json({ message: "У вас нет доступа сюда" });

    }

}

export async function button(req, res) {

    try {



    } catch (error) {

       console.log(error, "ошибка нет токена авторизации");
       return res.status(403).json({ message: "У вас нет доступа сюда" });

    }

}