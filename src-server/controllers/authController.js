// импорт модулей
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
dotenv.config();

import { User } from '../models/User.js';
import { Role } from '../models/Role.js';

const SECRET_KEY = process.env.SECRET_KEY;
const  secret = `${SECRET_KEY}`;


// создание токена для авторизации, ложим в него нужные данные
function generateAccessToken(id, roles) {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "6h"});
}

// функция регистрации пользователя
export async function register(req, res) {

    try {

        // деструкторизация пользователя
        const { name, password } = req.body;
        const candidate  = await User.findOne({ name });

        // проверка на существование пользователя
        if (candidate) {
            return res.status(400).json({
                error: 'Пользователь уже существует'
            });
        }

        // хеширование пароля
        const hash = bcrypt.hashSync(password, 10);

        // создание учетки с ролью (user)
        const userRole = await Role.findOne({value: 'ADMIN'});
        
        // создание пользователя и его добовление
        const user = new User({ name, password: hash, roles: [userRole.value]});
        await user.save();

        // отклик серверной части пользователю
        return res.json({message: 'Регистрация прошла успешно'});

    } catch (error) {

        // отклик серверной части пользователю
        res.status(400).json({
            error: 'Ошибка при регистрации пользователя'
        });

    }
}

export async function login(req, res) {
    try {

        //получение данных от пользователя
        const { name, password } = req.body;
        const user = await User.findOne({ name });

        // проверка на существование пользователя
        if (!user) {
            return res.status(404).json({message: 'Пользователь не существует'});
        }

        // проверка пароля
        const validPassword = bcrypt.compareSync(password, user.password);

        // вывод проверки пароля
        if (!validPassword) {
            return res.status(400).json({message: 'Неверный пароль'});
        }

        // генерация токена авторизации
        const token = generateAccessToken(user._id, user.role);
        
        // ответ токном
        return res.json({token, message: 'Авторизация прошла успешно'});

    } catch (error) {

        // отклик серверной части пользователю
        return res.status(400).json({ message: 'Ошибка при авторизации' });
    }
}

export async function users(req, res) {
    try {
        const users = await User.find()
       return res.json(users)
    } catch (error) {
        console.log(e)
        return res.status(400).json({message: "Ошибка с юзерами"})
    }
}


// const userRole = new Role()
// const adminRole = new Role({value: "ADMIN"})
// await userRole.save()
// await adminRole.save()