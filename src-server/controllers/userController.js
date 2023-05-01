import { User } from "../models/User.js";

export async function getAll(req, res) {
    
    try {
    
        const user = await User.find();
        return res.status(200).json(user);

    } catch (error) {
        
        console.log("ошибка получения всех пользователей", error);
        return res.status(500).json(error);

    }
}
