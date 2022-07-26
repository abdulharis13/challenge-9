// import express
const express = require("express");
// import cors
const cors = require('cors');

// setting express
const app = express();

//import bodyparser
const bodyParser = require('body-parser');
const path = require('path');

// port config
const port = process.env.PORT || 4000;

// import routing
const router = require("./router");

// middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// implement cors
app.use(cors());
//bodyparser
app.use(bodyParser.json());
//middleware untuk bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.listen(port, () => console.log(`Server menyala pada port ${port}, url: http://localhost:${port}`));