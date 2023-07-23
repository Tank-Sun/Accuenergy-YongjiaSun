// load .env data into process.env
require("dotenv").config();

// Web server config
const express = require("express");
const morgan = require('morgan');
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());

app.listen(PORT, () => console.log(`app started on port: ${PORT}`));