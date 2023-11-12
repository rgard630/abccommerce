// routes/category-routes.js
const express = require('express');
const router = express.Router();
const { Category, Product } = require('../models');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product],
    });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve categories.' });
  }
});

// GET a single category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product],
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve the category.' });
  }
});

// CREATE a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new category.' });
  }
});

// UPDATE a category by ID
router.put('/:id', async (req, res) => {
  try {
    const [rowsUpdated, [updatedCategory]] = await Category.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the category.' });
  }
});

// DELETE a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategoryCount = await Category.destroy({
      where: { id: req.params.id },
    });

    if (deletedCategoryCount === 0) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    res.json({ message: 'Category deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the category.' });
  }
});

module.exports = router;

