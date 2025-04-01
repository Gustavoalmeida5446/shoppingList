const express = require('express');
const router = express.Router();
const ItemsRepository = require('../ItemsRepository');

router.get('/', async (req, res) => {
  try {
    const items = await ItemsRepository.getAll();
    res.json(items);
  } catch (err) {
    res.status(500).send('Error getting items');
  }
})

router.post('/', async (req, res) => {
  try {
    const newItem = { item: req.body.item };
    await ItemsRepository.create(newItem);
    res.status(201).json(newItem)
  }
  catch (err) {
    res.status(500).send('Error creating item');
  }
})

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  try {
      const updatedItem = { ...ItemsRepository.getOneBy({ id }), ...req.body };
      ItemsRepository.update(id, updatedItem);
      res.json(updatedItem);
    }
    catch (err) {
      res.status(404).send('Item not found');
    }
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    await ItemsRepository.delete(id);
    res.status(204).send();
  } catch (err) {
    res.status(404).send('Item not found');
  }
  res.status(500).send('Error deleting item');
  res.status(404).send('Item not found');
});


module.exports = router;