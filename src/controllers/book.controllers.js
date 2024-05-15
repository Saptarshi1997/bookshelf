const asyncHandler = require("../utils/asyncHandler");
const responseHandler = require("../utils/responseHandler");
const Book = require("../models/book.models");

const addBook = asyncHandler(async (req, res) => {
    // get video file and the details from frontend
    // save the video and details to database

    const { title, author, publishedYear } = req.body;

    if (!title) {
        return res.json(new responseHandler(400, {}, "Title is required!"))
    }
    if (!author) {
        return res.json(new responseHandler(400, {}, "Author is required!"))
    }

    const existingBook = await Book.findOne({ title: title });

    if (existingBook) {
        return res.json(new responseHandler(400, {}, "Book is already there is the shelf!"))
    }

    const book = await Book.create({
        title,
        author,
        publishedYear
    });

    return res.json(new responseHandler(201, book, "Book added successfully"));
})

const getAllBooks = asyncHandler(async (req, res) => {
    // get queries like pageNum, limit, sort, etc. from frontend
    const { pageNum = 1, limit = 10 } = req.body;

    // Prepare the options for pagination
    const options = {
        skip: (parseInt(pageNum) - 1) * parseInt(limit),
        limit: parseInt(limit),
    };

    try {
        // Perform the database query
        const books = await Book.find({}, null, options).populate({ path: 'owner', select: 'title author publishedYear', options: { strictPopulate: false } });

        // Return the paginated list of books
        return res.json(new responseHandler(201, books, "Books fetched successfully"));
    } catch (error) {
        console.log("error in fetching books", error);
        return res.json(new responseHandler(400, {}, "Error in fetching books!"));
    }
});

const deleteBook = asyncHandler(async (req, res) => {
    const bookId = req.params.id;

    try {
        // Find the book by its ID and delete it
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.json(new responseHandler(404, {}, "Book not found"));
        }

        return res.json(new responseHandler(200, {}, "Book deleted successfully"));
    } catch (error) {
        console.log("Error in deleting book", error);
        return res.json(new responseHandler(500, {}, "Error in deleting book"));
    }
});

const updateBook = asyncHandler(async (req, res) => {
    const bookId = req.params.id;
    const { title, author, publishedYear } = req.body;

    try {
        // Find the book by its ID and update it
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { title, author, publishedYear },
            { new: true } // Return the updated document
        );

        if (!updatedBook) {
            return res.json(new responseHandler(404, {}, "Book not found"));
        }

        return res.json(new responseHandler(200, updatedBook, "Book updated successfully"));
    } catch (error) {
        console.log("Error in updating book", error);
        return res.json(new responseHandler(500, {}, "Error in updating book"));
    }
});

const getBookById = asyncHandler(async (req, res) => {
    const bookId = req.params.id;

    try {
        // Find the book by its ID
        const book = await Book.findById(bookId);

        if (!book) {
            return res.json(new responseHandler(404, {}, "Book not found"));
        }

        return res.json(new responseHandler(200, book, "Book found"));
    } catch (error) {
        console.log("Error in fetching book by ID", error);
        return res.json(new responseHandler(500, {}, "Error in fetching book by ID"));
    }
});

module.exports = { getAllBooks, addBook, deleteBook, updateBook, getBookById }