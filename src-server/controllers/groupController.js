import { Pc } from '../models/Pc.js';
import { Group } from '../models/Group.js';

export async function getAllGroup(req, res) {
    try {
        
        const group = await Group.find();
        return res.status(200).json(group);

    } catch (error) {
       console.log(error);
       return res.status(403).json({message: "У вас нет доступа сюда"}); 
    }
}

export async function getOneGroup(req, res) {
    try {

        const groupId = req.params.id;
        if (!groupId) {
            res.status(403).json({message: "Такой группы не существует"});
        }
        const group = await Group.findById(groupId);
        return res.status(200).json(group);

    } catch (error) {
       console.log(error);
       return res.status(403).json({message: "У вас нет доступа сюда"}); 
    }
}

export async function createGroup(req, res) {
    try {
        
        const { name, namespc } = req.body;
        if (!name) {
            return res.status(403).json({message: "Введите название группы"}); 
        }
        if (!namespc) {
            return res.status(403).json({message: "Введите имя Пк"}); 
        }
        const candidates = await Group.find({name});
        if (!candidates) {
            return res.status(403).json({message: "Группа уже существует"}); 
        }

        const group = new Group({name, namespc});
        await group.save();

        return res.status(200).json({message: "Группа создана"});

    } catch (error) {
       console.log(error);
       return res.status(403).json({message: "У вас нет доступа сюда"}); 
    }
}

export async function deleteGroup(req, res) {
    try {

        const groupId = req.params.id;
        if (!groupId) {
            res.status(403).json({message: "Такой группы не существует"});
        }
        const groupDelete = Group.findByIdAndDelete(groupId);
        return res.status(200).json({groupDelete});

    } catch (error) {
       console.log(error);
       return res.status(403).json({message: "У вас нет доступа сюда"}); 
    }
}

export async function addInGroup(req, res) {
    try {

        const { name, namespc } = req.body;
        if (!name) {
            return res.status(403).json({message: "Введите название группы"}); 
        }
        if (!namespc) {
            return res.status(403).json({message: "Введите имя ПК"}); 
        }
        const candidates = await Group.find({name});
        if (!candidates) {
            return res.status(403).json({message: "Группы не существует"}); 
        }

        console.log(typeof(candidates));
        console.log(candidates);
        console.log(candidates.name);
        // candidates.push({
        //     name: candidates.name,
        //     namespc: candidates.namespc + namespc
        // });
        // console.log(candidates);
       // const newgroup = await findUpdate({name, {namespc: [candidates.namespc]}})
        return res.status(200).json({message: 'dfdfa'});

    } catch (error) {
       console.log(error);
       return res.status(403).json({message: "У вас нет доступа сюда"}); 
    }
}

export async function deletInGroup(req, res) {
    try {

        const groupId = req.params.id;
        if (!groupId) {
            res.status(403).json({message: "Такой группы не существует"});
        }
        const { name, namespc } = req.body;
        if (!name) {
            return res.status(403).json({message: "Введите название группы"}); 
        }
        if (!namespc) {
            return res.status(403).json({message: "Введите имя Пк"}); 
        }
        const candidates = await Group.find({name});
        if (!candidates) {
            return res.status(403).json({message: "Группа уже существует"}); 
        }
        console.log(candidates);



    } catch (error) {
       console.log(error);
       return res.status(403).json({message: "У вас нет доступа сюда"}); 
    }
}