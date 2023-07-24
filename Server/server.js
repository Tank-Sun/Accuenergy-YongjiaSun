// load .env data into process.env
require("dotenv").config();

// Web server config
const express = require("express");
const morgan = require('morgan');
const cors = require("cors");
const axios = require('axios');

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/geocode', async (req, res) => {
  const lat = req.body.lat;
  const lng = req.body.lng;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    res.json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => console.log(`app started on port: ${PORT}`));