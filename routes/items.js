import express from 'express';
const router = express.Router();
import ItemsRepository from '../ItemsRepositoryORM.js';

router.get('/', async (req, res) => {
  try {
    const items = await ItemsRepository.getAll();
    res.json(items);
  } catch (err) {
    console.log("🚀 ~ router.get ~ err:", err)
    res.status(500).send('Error getting items');
  }
})

router.post('/', async (req, res) => {
  try {
    const newItem = { item: req.body.item };
    console.log("🚀 ~ router.post ~ newItem:", newItem)
    await ItemsRepository.create(newItem);
    res.status(201).json(newItem)
  }
  catch (err) {
    console.log("🚀 ~ router.post ~ err:", err)
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
      return res.status(404).send(`Item ${req.params.id} not found`);
    } else {
      return res.status(200).send(`${req.params.id} Deleted`);
    }
  } catch (err) {
    res.status(500).send('Error deleting item');
  }
});



export default router;
