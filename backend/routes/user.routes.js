const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.midleware");

router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers); // solo admin puede listar todos
router.get('/:id', authMiddleware, userController.getUserById); // cualquiera puede ver un usuario (opcional)
router.post('/', authMiddleware, adminMiddleware, userController.createUser); // solo admin puede crear
router.put('/:id', authMiddleware, adminMiddleware, userController.updateUser); // solo admin puede actualizar
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUser); // solo admin puede borrar


module.exports = router;
