import express from 'express'
import itemRoutes from './routes/items.js';
// const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

// const itemRoutes = require('./routes/items');
app.use('/items', itemRoutes);


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})