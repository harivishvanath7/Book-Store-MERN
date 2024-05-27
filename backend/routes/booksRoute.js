import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for saving a new book
router.post('/', async (request, response) => {
    try {
        // validation
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
          return response.status(400).send({
            message: 'Send all required fields: title, author, publishYear',
          });
        }

        // creating a book variable / object
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        // sending to client
        return response.status(201).send(book);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// Route for getting all books from database
router.get("/", async (request, response) => {
    try {
        const books = await Book.find({});
        
        return response.status(200).json({
            count: books.length,              // Better structure of data
            data: books
        });
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({message: error.message})
    }
})

//Route for getting one book by id
router.get("/:id", async (request, response) => {
    try {
        const {id} = request.params;
        const book = await Book.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
})

// Update the value of a book - requires id and request body
router.put('/:id', async(request, response) => {
    try{
        // validation
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
          return response.status(400).send({
            message: 'Send all required fields: title, author, publishYear',
          });
        }

        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({message: "Book Not Found"});
        }
            return response.status(200).send({message: "Book Updated Successfully."});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Deleting a book - requires id only
router.delete('/:id', async (request, response) => {
    try {
        const {id} = request.params;

        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message: 'Book not found'})
        }
        return response.status(200).send({message: 'Book deleted successfully'})
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({message: error.message});
    }
})

export default router;