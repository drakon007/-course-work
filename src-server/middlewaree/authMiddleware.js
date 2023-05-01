// импортируем модули
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

// получаем секретный ключ
const SECRET_KEY = process.env.SECRET_KEY;
const secret = `${SECRET_KEY}`;

// связующие програмное обеспечение для проверки авторизации
export default function authMiddleWare(req, res, next) {

    // проверка метода
    if (req.method === 'OPTIONS') {
        next();
    }

    try {

        // получение токена
        const token = req.headers.authorization.split(' ')[1];

        // проверка токена
        if (!token) {
            console.log('Нет токена');
            return res.status(401).json({ message: 'Пользователь не авторизован'});
        }

        // декодировка токена
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();

    } catch (error) {

    // отклик серверной части пользователю
    console.log(error);
    return res.status(401).json({ message: 'Пользователь не авторизован'});

    }
}