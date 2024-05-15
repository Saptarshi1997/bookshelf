require("dotenv").config();
const app = require("./app");
const { fetchAndWritePages } = require("./controllers/url.controllers");
const connectDb = require("./db");

let PORT = process.env.PORT || 5000;

connectDb()
    .then(() => {
        fetchAndWritePages();
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}!!`)
        });
    })
    .catch((error) => {
        console.log("MONGO DB Connection Failed!!", error)
    })