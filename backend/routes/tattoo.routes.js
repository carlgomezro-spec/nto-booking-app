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

/**
 * @openapi
 * tags:
 *   name: Tattoos
 *   description: Gestión de tatuajes
 */

/**
 * @openapi
 * /api/tattoos:
 *   get:
 *     tags: [Tattoos]
 *     summary: Obtener todos los tatuajes
 *     responses:
 *       200:
 *         description: Lista de tatuajes
 */

/**
 * @openapi
 * /api/tattoos/{id}:
 *   get:
 *     tags: [Tattoos]
 *     summary: Obtener tatuaje por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tatuaje encontrado
 *       404:
 *         description: No existe
 */

/**
 * @openapi
 * /api/tattoos/{id}:
 *   put:
 *     tags: [Tattoos]
 *     summary: Actualizar un tatuaje
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Tatuaje actualizado
 */

/**
 * @openapi
 * /api/tattoos/{id}:
 *   delete:
 *     tags: [Tattoos]
 *     summary: Eliminar un tatuaje
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         description: Eliminado correctamente
 */

/**
 * @openapi
 * /api/tattoos:
 *   post:
 *     tags: [Tattoos]
 *     summary: Crear tatuaje (con imagen subida)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tatuaje creado
 */


module.exports = router;
