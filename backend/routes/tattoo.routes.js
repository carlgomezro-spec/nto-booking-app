const express = require('express');
const router = express.Router();
const tattooController = require('../controllers/tattoo.controller');
const upload = require("../middlewares/upload");

// Rutas existentes
router.get('/', tattooController.getAllTattoos);
router.get('/:id', tattooController.getTattooById);
router.put('/:id', tattooController.updateTattoo);
router.delete('/:id', tattooController.deleteTattoo);

// POST con imagen
router.post('/', upload.single("image"), tattooController.createTattoo);

module.exports = router;
