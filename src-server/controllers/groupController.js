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
        if (candidates.length == 1) {
            return res.status(400).json({message: "Группа уже существует"}); 
        }

        if (typeof(namespc) == "string") {
            let checkPc = await Pc.find({name: namespc});
            if (checkPc.length == 0) {
                return res.status(403).json({message: "Введен не существующий пк"}); 
            }
        } else {
            for (let pc of namespc) {
                let checkPc = await Pc.find({name: pc});
                if (checkPc.length == 0) {
                    return res.status(403).json({message: "Введен не существующий пк"}); 
                }
            }
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

        if (typeof(namespc) == "string") {
            let checkPc = await Pc.find({name: namespc});
            if (checkPc.length == 0) {
                return res.status(403).json({message: "Введен не существующий пк"}); 
            }
            candidates[0].namespc.push(namespc);
            let newNamePc = Array.from(new Set(candidates[0].namespc));
            const newGroup = await Group.findOneAndUpdate({name: candidates[0].name}, {namespc: newNamePc})
            return res.status(200).json({message: "Группа обнавлена перезагрузите страницу"})
        } else {
            for (let pc of namespc) {
                let checkPc = await Pc.find({name: pc});
                if (checkPc.length == 0) {
                    return res.status(403).json({message: "Введен не существующий пк"}); 
                }
                candidates[0].namespc.push(pc);
            }
            let newNamePc = Array.from(new Set(candidates[0].namespc));
            const newGroup = await Group.findOneAndUpdate({name: candidates[0].name}, {namespc: newNamePc})
            return res.status(200).json({message: "Группа обнавлена перезагрузите страницу"})
        }
    } catch (error) {
       console.log(error);
       return res.status(403).json({message: "У вас нет доступа сюда"}); 
    }
}

export async function deletInGroup(req, res) {
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
        if (typeof(namespc) == "string") {
            let oldNamePc = candidates[0].namespc;
            let newNamePc = oldNamePc.filter((oldNamePc) => oldNamePc !== namespc )
            // candidates[0].namespc = newNamePc;
            const newGroup = await Group.findOneAndUpdate( {name: candidates[0].name}, {namespc: newNamePc})
            return res.status(200).json({message: "Группа обнавлена перезагрузите страницу"})
        }

    } catch (error) {
       console.log(error);
       return res.status(403).json({message: "У вас нет доступа сюда"}); 
    }
}