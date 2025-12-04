const Tattoo = require('../models/tattoo.model');

module.exports = {
  getAllTattoos: async (req, res) => {
    try {
      const tattoos = await Tattoo.getAll();
      res.json(tattoos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getTattooById: async (req, res) => {
    try {
      const tattoo = await Tattoo.getById(req.params.id);
      if (!tattoo) return res.status(404).json({ message: 'Tattoo not found' });
      res.json(tattoo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createTattoo: async (req, res) => {
  try {
    const { name, description } = req.body;

    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`; // ruta pública
    }

    const newTattoo = await Tattoo.create({
      name,
      description,
      image: imagePath, // guarda la ruta en la BD
    });

    res.status(201).json(newTattoo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},

  updateTattoo: async (req, res) => {
    try {
      const updatedTattoo = await Tattoo.update(req.params.id, req.body);
      if (!updatedTattoo) return res.status(404).json({ message: 'Tattoo not found' });
      res.json(updatedTattoo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteTattoo: async (req, res) => {
    try {
      const deletedTattoo = await Tattoo.delete(req.params.id);
      if (!deletedTattoo) return res.status(404).json({ message: 'Tattoo not found' });
      res.json(deletedTattoo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
