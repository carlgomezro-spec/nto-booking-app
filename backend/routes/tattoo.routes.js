const express = require('express');
const router = express.Router();
const tattooController = require('../controllers/tattoo.controller');

router.get('/', tattooController.getAllTattoos);
router.get('/:id', tattooController.getTattooById);
router.post('/', tattooController.createTattoo);
router.put('/:id', tattooController.updateTattoo);
router.delete('/:id', tattooController.deleteTattoo);

module.exports = router;
