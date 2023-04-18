// импортируем модули
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app= express();
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';

// импортируем модули путей
import { authRouter } from './routers/authRouters.js';
import { pcRouter } from './routers/pcRouters.js';



// внешние переменные созданного хоста
const HOST = process.env.HOST;
const PORT = process.env.PORT;

// внешние переменные подключения к mongoBD
const BD_HOST = process.env.BD_HOST;
const BD_PORT = process.env.BD_PORT;
const BD_NAME = process.env.BD_NAME;

//использование модулей для логирования
app.use(morgan('dev'));
app.use(fileUpload({}));
app.use(cors());
app.use(express.json());

// добавление ветки 
app.use('/auth', authRouter);
app.use('/pc', pcRouter);


// функция для подключения к базе данных
async function Connect() {

    try {
        await mongoose.connect(`mongodb://${BD_HOST}:${BD_PORT}/${BD_NAME}`);
        console.log('MongoDB connected');
    } catch (error) {
        console.log('Connection error', error.message);
    }
    console.log(`Server running at http://${HOST}:${PORT}`);

}

app.listen(PORT, Connect);