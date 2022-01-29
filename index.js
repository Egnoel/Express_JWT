//Getting the express package
const express = require('express');
// Invoking express in to the app variable and inicializing it
const app = express();
//require the enviroment package
const dotenv = require('dotenv');
//Importing routes
const authRoute = require('./routes/auth');
//importing mongoose package
const mongoose = require('mongoose');
//importing posts Routes
const postRoute = require('./routes/posts');
//config
dotenv.config();



// connect with MongoDB
mongoose.connect(process.env.DB_CONNECT,
{useNewUrlParser:true},
()=>console.log("Connected"));

//Middlewares
app.use(express.json());

//Routes Middlewares, every authRoute will have /api/user as prefix
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

//Listen to the port and running the server
app.listen(3000, ()=>console.log("server is running"));