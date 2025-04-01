const express = require('express');
const router = express.Router();

const data = require('../data');

router.get('/', (req, res) => {
  res.json(data)
})

router.post('/', (req, res) => {
  const newItem = { id: data.length + 1, item: req.body.item }
  data.push(newItem)
  res.status(201).json(newItem)
})

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const itemIndex = data.findIndex(item => item.id === id)
  if (itemIndex !== -1) {
    data[itemIndex].item = req.body.item
    res.json(data[itemIndex])
  } else {
    res.status(404).send('Item not found')
  }
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const itemIndex = data.findIndex(item => item.id === id)
  if (itemIndex !== -1) {
    data.splice(itemIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send('Item not found');
  }
});


module.exports = router;