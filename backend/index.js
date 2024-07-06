import express from 'express';
import mongoose, { connect } from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const PORT = process.env.PORT
const URL = process.env.URL
import Product from './models/product.models.js';
const products = [
    {
        "id": 1,
        "title": "UltraSlim Laptop",
        "description": "Ultra-thin and lightweight laptop with a powerful processor and long battery life.",
        "category": "Laptops",
        "price": 1299.99,
        "discountPercentage": 8,
        "rating": 4.7,
        "stock": 30,
        "tags": ["laptop", "ultra-thin", "lightweight"],
        "brand": "TechLap",
        "weight": 1.2,
        "dimensions": {
            "width": 30,
            "height": 2,
            "depth": 20
        },
        "warrantyInformation": "2 years warranty",
        "reviews": [],
        "returnPolicy": "30 days return policy",
        "images": [
            "https://m.media-amazon.com/images/I/418Zn4ba8RL._SY300_SX300_QL70_FMwebp_.jpg",
        ],
        "thumbnail": "https://m.media-amazon.com/images/I/418Zn4ba8RL._SY300_SX300_QL70_FMwebp_.jpg"
    },
    {
        "id": 2,
        "title": "Gaming Laptop",
        "description": "High-performance gaming laptop with dedicated graphics card and RGB keyboard.",
        "category": "Laptops",
        "price": 1999.99,
        "discountPercentage": 10,
        "rating": 4.9,
        "stock": 20,
        "tags": ["gaming laptop", "high-performance", "gaming"],
        "brand": "GameMaster",
        "weight": 2.5,
        "dimensions": {
            "width": 35,
            "height": 3,
            "depth": 25
        },
        "warrantyInformation": "3 years warranty",
        "reviews": [],
        "returnPolicy": "30 days return policy",
        "images": [
            "https://m.media-amazon.com/images/I/41yKTlE4+DL._AC_UF480,480_SR480,480_.jpg",
            "https://m.media-amazon.com/images/I/41Hns1jz4aL._AC_UF480,480_SR480,480_.jpg"
        ],
        "thumbnail": "https://m.media-amazon.com/images/I/41Hns1jz4aL._AC_UF480,480_SR480,480_.jpg"
    },
    {
        "id": 3,
        "title": "Convertible Laptop",
        "description": "Versatile convertible laptop with touchscreen capability and 360-degree hinge.",
        "category": "Laptops",
        "price": 1499.99,
        "discountPercentage": 5,
        "rating": 4.6,
        "stock": 40,
        "tags": ["convertible laptop", "touchscreen", "versatile"],
        "brand": "FlexBook",
        "weight": 1.8,
        "dimensions": {
            "width": 32,
            "height": 2.5,
            "depth": 22
        },
        "warrantyInformation": "2 years warranty",
        "reviews": [],
        "returnPolicy": "30 days return policy",
        "images": [
            "https://m.media-amazon.com/images/I/41KJFgB-pjL._AC_UF480,480_SR480,480_.jpg",
        ],
        "thumbnail": "https://m.media-amazon.com/images/I/41KJFgB-pjL._AC_UF480,480_SR480,480_.jpg"
    },
    {
        "id": 4,
        "title": "Business Laptop",
        "description": "Robust business laptop with security features and long-lasting battery.",
        "category": "Laptops",
        "price": 1799.99,
        "discountPercentage": 7,
        "rating": 4.8,
        "stock": 25,
        "tags": ["business laptop", "security features", "professional"],
        "brand": "BizPro",
        "weight": 2.0,
        "dimensions": {
            "width": 31,
            "height": 2.2,
            "depth": 21
        },
        "warrantyInformation": "3 years warranty",
        "reviews": [],
        "returnPolicy": "30 days return policy",
        "images": [
            "https://m.media-amazon.com/images/I/41n6UmDhUAL._AC_UF480,480_SR480,480_.jpg"
        ],
        "thumbnail": "https://m.media-amazon.com/images/I/41n6UmDhUAL._AC_UF480,480_SR480,480_.jpg"
    },
    {
        "id": 5,
        "title": "Student Laptop",
        "description": "Affordable and reliable laptop for students, perfect for everyday tasks.",
        "category": "Laptops",
        "price": 899.99,
        "discountPercentage": 12,
        "rating": 4.4,
        "stock": 50,
        "tags": ["student laptop", "affordable", "reliable"],
        "brand": "EduTech",
        "weight": 1.5,
        "dimensions": {
            "width": 28,
            "height": 2,
            "depth": 19
        },
        "warrantyInformation": "2 years warranty",
        "reviews": [],
        "returnPolicy": "30 days return policy",
        "images": [
            "https://m.media-amazon.com/images/I/41rZynHGBKL._AC_UF480,480_SR480,480_.jpg",
            "https://m.media-amazon.com/images/I/41asNsDaWfL._AC_UF480,480_SR480,480_.jpg"
        ],
        "thumbnail": "https://m.media-amazon.com/images/I/41rZynHGBKL._AC_UF480,480_SR480,480_.jpg"
    }
]

const connectToDatabase = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Connected To Database!");
    }
    catch (error) {
        console.log("Failed To Connect To Database ", error);
    }
}
connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}))
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Server is running");
})

app.post('/save-products', async (req, res) => {
    try {

        const savedProducts = await Product.insertMany(products);

        res.json(savedProducts);
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ error: err.message });
    }
});

import authRoutes from './routes/auth.routes.js'
app.use('/auth', authRoutes)

import userRoutes from './routes/user.routes.js'
app.use('/user', userRoutes)

import productRoutes from './routes/product.routes.js'
app.use('/product', productRoutes)

app.listen(PORT, () => {
    console.log("Listening...")
})