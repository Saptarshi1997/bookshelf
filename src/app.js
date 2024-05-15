const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bookRouter = require("../src/routes/book.routes");


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({
    limit: "16kb",
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb",
}));


app.use(cookieParser())

app.use("/api/v1/books", bookRouter);

module.exports = app;