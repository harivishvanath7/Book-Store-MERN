import express, { request, response } from "express";
import { PORT, MONGODBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request data i.e, posting in postman
app.use(express.json());

// getting resource from server
app.get('/', (request, response)=>{
    console.log(request);
    return response.status(200).send("Vanakkam da mapla..")
});

// Middleware for Routing
app.use('/books', booksRoute);

// Middleware for handling CORS policy

// Option:1 Allowing all origins with default of cors(*)
// app.use(cors());

// Option:2 Allowing Custom origins
app.use(cors({
    origin:"http://localhost:5555",
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:['Content-Type'],
}));

mongoose
    .connect(MONGODBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to Port: ${PORT}`);
        });  
    })
    .catch((error)=>{
        console.log(error);
    });