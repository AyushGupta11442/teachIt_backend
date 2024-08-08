import express from 'express'; 
import cors from 'cors';
// import cookieParser from 'cookie-parser';
import userAuthRouter from './routes/';
import dotenv from 'dotenv';
import { dbclient } from './db/index.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));   


app.use(express.json({limit: '20kb'}));
app.use(express.urlencoded({extended: true , limit: '16kb'}));
app.use(express.static('public'));
// app.use(cookieParser());



console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);

app.use('/api/v1/users', userAuthRouter);




export default app;
