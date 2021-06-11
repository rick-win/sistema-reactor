import { UserController } from '../controller/UserController';
import { Router } from 'express';
import { checkJwt } from '../middleware/jwt';


const router = Router();

//leer todos los usuarios
router.get('/', [checkJwt], UserController.getAll);

//leer un usuario
router.get('/:id', [checkJwt], UserController.getById);

//crear nuevo usuario
router.post('/', [checkJwt], UserController.newUser);

//editar usuario
router.patch('/:id', [checkJwt], UserController.editUser);

//eliminar usuario
router.delete('/:id', [checkJwt], UserController.deleteUser);

export default router;