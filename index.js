const cors = require('cors')
const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8080'
}));

const itemRoutes = require('./routes/items');
app.use('/items', itemRoutes);


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})