import ping from "ping";
import { Pc } from "../models/Pc.js";
import * as pingMiddleware from "../middlewaree/pingMiddleware.js";


export async function getAll(req, res) {

     try {

      const pc = await Pc.find();
      return res.status(200).json(pc);

     } catch (error) {

      console.log(error, "ошибка нет токена авторизации");
      return res.status(403).json({ message: "У вас нет доступа сюда" });

     }

}

export async function getOne(req, res) {

   const pcId = req.params.id;

   if (!pcId) {
      return res.status(400).json({ message: "Не полученны данные о пк, возможно он выключен" });
   }

    try {
   
      const pc = await Pc.findById(pcId);
      return res.status(200).json(pc);
      
    } catch (error) {

       console.log(error, "ошибка нет токена авторизации");
       return res.status(403).json({ message: "У вас нет доступа сюда" });

    }

}

export async function createPc(req, res) {
   const { name } = req.body;

   if (!name) {
      return res.status(400).json({ error: "не полученно имя пк, проверьте правильность запроса"});
   }

   const candidate  = await Pc.findOne({ name });

   // проверка на существование пк
   if (candidate) {
       return res.status(400).json({error: "Пк уже существует"});
   }

   const arr = await pingMiddleware.pingOneByName(name);
   console.log(arr);
   if (!arr || arr[0] == undefined || arr[0] == false) {
      return res.status(400).json({ error: "Пк не отвечает на отправленный запрос, пожалуйста включите пк"});
   }

   const ip = arr[1]; 

   const lasttime = new Date();

   const pc = new Pc({name, ip, lasttime});
   await pc.save();

   return res.status(200).json({ message: "ПК добавлен в систему"});
}

export async function pingOne(req, res) {

    try {
      let isAlive = false;
      const name = req.params.name;
      if (!name) {
         return res.status(400).json({ message: "Не получено название или адрес пк"});
      }
      let resPc = await pingMiddleware.pingOneByName(name);
      if (resPc[0] == true) {
      isAlive = true;
      }
      return res.status(200).json(isAlive);
      
    } catch (error) {

       console.log(error, "ошибка нет токена авторизации");
       return res.status(403).json({ message: "У вас нет доступа сюда" });

    }

}

export async function pingAll(req, res)  {
   
   try {

      const arrPc = await pingMiddleware.pingAllPcByNameAndCheckLive();

      return res.status(200).json(arrPc);

     } catch (error) {
      console.log(error, "ошибка, нет токена авторизации");
      return res.status(403).json({ message: "У вас нет доступа сюда" });
     }
}

export async function deletePc (req, res) {

   const pcId = req.params.id;

   try {

      if (!pcId) {
         return res.status(400).json({ message: "Данного Пк уже не существует" });         
      }
      const delPc = await Pc.findByIdAndDelete(pcId);
      return res.status(200).json(delPc);
      
   } catch (error) {

      console.log(error, "ошибка, нет токена авторизации");
      return res.status(403).json({ message: "У вас нет доступа сюда"});

   }

}

export async function appdatePc (req, res) {

   const pcId = req.params.id;

   try {
      
      if (!pcId) {
         return res.status(400).json({ error: "Данного Пк не существует" });         
      }
      const { name } = req.body;
      if (!pcId) {
         return res.status(400).json({ error: "имя" });         
      }
      const candidate  = await Pc.findOne({ name });
      if (candidate) {
          return res.status(400).json({error: "Пк уже существует"});
      }

      const arr = await pingMiddleware.pingOneByName(name);
   
      if (!arr || arr[0] == undefined || arr[0] == false) {
         return res.status(400).json({ error: "Пк не отвечает на отправленный запрос, пожалуйста включите пк"});
      }

      const ip = arr[1]; 
      const lasttime = new Date();

      const newpc = await Pc.findByIdAndUpdate(pcId, {name, ip, lasttime});
      return res.json({message: "Пк Обнавлен"});

   } catch (error) {
      
      console.log(error, "ошибка, нет токена авторизации");
      return res.status(403).json({ message: "У вас нет доступа сюда"});

   }

}