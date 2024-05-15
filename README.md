# Bookshelf

Bookshelf is a project with basic CRUD operation which create books, getting all the books and a single book by the id, editing or updating any book, deleting any book.
In this application I have used Javascript as a programming language, Nodejs as a runtime environment, express as a framework to make Rest APIs' and mongodb-memory-server to store the data in the local machine memory (in memory database), fs to read and write the local files, axios to get the html content from the url
I have used different third party modules like express to create the server and make APIs', Cors to use cross origin platforms, dotenv to store the private data, mongodb-memory-server to store the data in local machine memory etc.

# Project Structure
--> Basically, in the root project directory, we have node_modules, public, src, .env, .gitignore, package.json, package-lock.json
--> src
    - controllers : for all business logics
    - db          : for database connection and configuration
    - models      : for creating schema and models for a particular collection (e.g - book collection)
    - routes      : to handle all the routes of the CRUD operation
    - utils       : for the utility purpose, like wrapper function or common function or response handler function etc.
    - app.js      : creating the express app and the configuration with the base route
    - index.js    : to connect the database and initiate/run the server (entry point of the code as per package.json)
    - constant.js : to define all the constants that is reusable over the whole project

# How to start the application
--> Clone the project in your local machine
--> npm i - to install all the third party modules
--> npm run start/npm start - to start the development server
--> Use any third party tools (postman/thunderclient) to test the application

# You can find the attachements in the mail
--> Postman Collection
--> Postman Environment
--> Bookshelf API Documentation


NOTE: I HAVE INCLUDED THE .env FILE IN THE GIT REPOSITORY, SO THAT YOU CAN ACCESS EVERYTHING FOR TESTING THE PROJECT, IMMEDIATELY AFTER CLONING THE PROJECT