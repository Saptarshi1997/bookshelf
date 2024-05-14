const express = require('express');
const bookController = require('../controllers/book.controllers');

const router = express.Router();

router.route("/").get(
    bookController.getAllBooks
);

router.route("/add-book").post(
    bookController.addBook
);

router.route("/delete-book/:id").delete(
    bookController.deleteBook
);

router.route("/update-book/:id").put(
    bookController.updateBook
);

router.route("/get-book/:id").get(
    bookController.getBookById
);

module.exports = router;