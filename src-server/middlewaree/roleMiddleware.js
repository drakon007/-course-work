// импорт модулей
import iwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

// получаем секретный ключ
const SECRET_KEY = process.env.SECRET_KEY;
const secret = `${SECRET_KEY}`;

// связующие програмное обеспечение для проверки роли
export default function releMiddleWare(roles) {

    return function (req, res, next) {

        if (req, res, next) {
            next();
        }

        try {

            // получение токена
            const token = req.headers.authorization.split(' ')[1];
           
             // проверка токена
            if (!token) {
                console.log("Нет токена");
                return res.status(401).json({ message: 'Пользователь не авторизован'});
            }

             // декодировка роли
            const  {reoles: userRole} = jwt.verify(token, secret);

            // по дефолту роль не подходит
            let hasRole = false;

            // проверка роли
            userRole.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            
            // вывод проверки роли
            if (!hasRole) {
                console.log("У пользователя нет доступа ");
                return res.status(401).json({ message: 'У вас нет доступа'});
            }

            next();

        } catch (error) {
            
             // отклик серверной части пользователю
            console.log(error);
            return res.status(401).json({ message: 'Пользователь не авторизован'});

        }
    }
}