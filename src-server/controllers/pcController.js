import ping from "ping";
import { Pc } from "../models/Pc.js";
import * as pingMiddleware from "../middlewaree/pingMiddleware.js";


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

   const arr = await pingDorname(name);
   
   if (!arr || arr[0] == undefined || arr[0] == false) {
      return res.status(400).json({ error: "Пк не отвечает на отправленный запрос, пожалуйста включите пк"});
   }

   const ip = arr[1]; 

   const lasttime = new Date();

   const pc = new Pc({name, ip, lasttime});
   await pc.save();

   return res.status(200).json({ message: "ПК добавлен в систему"});
}

// async function pingDorname(namePc) {

//    let arr = [];
//    let resPC = await ping.promise.probe(namePc, {
//       timeout: 1, //время отправки
//    });
//    arr.push(resPC.alive);
//    arr.push(resPC.numeric_host);
//    return arr;

// }

// ping 
export async function pingOne(req, res) {

    try {

      const { name } = req.body;
      if (!name) {
         return res.status(400).json({ message: "Не получено название или адрес пк"});
      }

      let resPC = await ping.promise.probe(name, {
         timeout: 1, //время отправки
      });
      // console.log(resPS);
      return res.status(200, {'Content-Type': 'text/html; charset=utf-8'}).json(resPC.alive);
      
    } catch (error) {

       console.log(error, "ошибка нет токена авторизации");
       return res.status(403).json({ message: "У вас нет доступа сюда" });

    }

}

export async function pingAll(req, res)  {
   
   try {

      let arrPC = [];

      const pc = await Pc.find();

      let hosts = [];
      for (let host of pc) {
         hosts.push(host.name);
      }

      let live = [];
      for(let host of hosts) {
         let res = await ping.promise.probe(host, {
            timeout: 1,
         });
         live.push(res.alive);
         live.push(res.numeric_host);
      }

      for (let i=0 , j=0; i < pc.length; i++, j+=2) {
         
         arrPC.push(
            {
               name: pc[i].name,
               ip: pc[i].ip,
               lasttime: pc[i].lasttime,
               isAlive: live[j]
            }) 
      }

      return res.status(200).json(arrPC);

     } catch (error) {

      console.log(error, "ошибка, нет токена авторизации");
      return res.status(403).json({ message: "У вас нет доступа сюда" });

     }
}

export async function deletePc (req, res) {

   const pcId = req.params.id;
   console.log(pcId);

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
         return res.status(400).json({ message: "Данного Пк не существует" });         
      }

      const { name } = req.body;
      if (!pcId) {
         return res.status(400).json({ message: "имя" });         
      }

      const candidate  = await Pc.findOne({ name });
      
      // проверка на существование пк
      if (candidate) {
          return res.status(400).json({error: "Пк уже существует"});
      }

      const arr = await pingDorname(name);
   
      if (!arr || arr[0] == undefined || arr[0] == false) {
         return res.status(400).json({ error: "Пк не отвечает на отправленный запрос, пожалуйста включите пк"});
      }

      const ip = arr[1]; 
      const lasttime = new Date();

      const newpc = await Pc.findByIdAndUpdate(pcId, {name, ip, lasttime});
      return res.json(newpc);

   } catch (error) {
      
      console.log(error, "ошибка, нет токена авторизации");
      return res.status(403).json({ message: "У вас нет доступа сюда"});

   }

}