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
  const id = req.params.id
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
  try {
    const deleted = await ItemsRepository.delete(req.params.id);
    if (deleted) {
      return res.status(200).send('Deleted');
    } else {
      return res.status(404).send(`Item ${req.params.id} not found`);
    }
  } catch (err) {
    res.status(500).send('Error deleting item');
  }
});



module.exports = router;