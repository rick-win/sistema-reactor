import { UserController } from '../controller/UserController';
import { Router } from 'express';
import { checkJwt } from '../middleware/jwt';
import { checkRole } from '../middleware/role';

const router = Router();

//leer todos los usuarios
router.get('/',[checkJwt, checkRole(['admin'])], UserController.getAll);

//leer un usuario
router.get('/:id', [checkJwt, checkRole(['admin'])], UserController.getById);

//crear nuevo usuario
router.post('/', [checkJwt, checkRole(['admin'])], UserController.newUser);

//editar usuario
router.patch('/:id', [checkJwt, checkRole(['admin'])], UserController.editUser);

//eliminar usuario
router.delete('/:id',[checkJwt, checkRole(['admin'])], UserController.deleteUser);

export default router;