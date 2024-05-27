import express, { request, response } from "express";
import { PORT, MONGODBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';

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