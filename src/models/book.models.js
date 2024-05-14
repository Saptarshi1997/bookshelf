const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishedYear: {
        type: Number,
    },
}, {
    timestamps: true
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;