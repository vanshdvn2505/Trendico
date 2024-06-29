import express from 'express';
import mongoose, {connect} from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const PORT = process.env.PORT
const URL = process.env.URL

const connectToDatabase = async () => {
    try {
        await mongoose.connect(URL);    
        console.log("Connected To Database!");
    }
    catch(error){
        console.log("Failed To Connect To Database ", error);
    }
}
connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}))
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Server is running");
})

import authRoutes from './routes/auth.routes.js'
app.use('/auth', authRoutes)

app.listen(PORT, () => {
    console.log("Listening...")
})