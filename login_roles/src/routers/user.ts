import { UserController } from '../controller/UserController';
import { Router } from 'express';


const router = Router();

//leer todos los usuarios
router.get('/', UserController.getAll);

//leer un usuario
router.get('/:id', UserController.getById);

//crear nuevo usuario
router.post('/', UserController.newUser);

//editar usuario
router.patch('/:id', UserController.editUser);

//eliminar usuario
router.delete('/:id', UserController.deleteUser);

export default router;