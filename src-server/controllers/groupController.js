import { Pc } from '../models/Group.js';
import { Group } from '../models/Group.js';

export async function getAll(req, res) {
    try {
        
        const { name, namespc } = req.body;



    } catch (error) {
       console.log(error);
       return res.status(403).json({message: "У вас нет доступа сюда"}); 
    }
}