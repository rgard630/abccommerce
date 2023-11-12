// routes/tag-routes.js
const express = require('express');
const router = express.Router();
const { Tag, Product } = require('../models');

// GET all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [Product],
    });
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve tags.' });
  }
});

// GET a single tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [Product],
    });

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found.' });
    }

    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve the tag.' });
  }
});

// CREATE a new tag
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new tag.' });
  }
});

// UPDATE a tag by ID
router.put('/:id', async (req, res) => {
  try {
    const [rowsUpdated, [updatedTag]] = await Tag.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'Tag not found.' });
    }

    res.json(updatedTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the tag.' });
  }
});

// DELETE a tag by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTagCount = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (deletedTagCount === 0) {
      return res.status(404).json({ error: 'Tag not found.' });
    }

    res.json({ message: 'Tag deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the tag.' });
  }
});

module.exports = router;
