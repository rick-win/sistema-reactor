import {getRepository} from "typeorm";
import {Request, Response} from "express";
import { User } from '../entity/User';
import {validate} from 'class-validator';

export class UserController {
    static getAll = async(req: Request, res: Response) =>{
        const userRepository = getRepository(User);
        let users;

        try{
            const users = await userRepository.find({select:['id', 'username', 'role']});
        }
        catch(e){
            res.status(404).json({message: 'Algo anda mal'});
        }
        
        if(users.length > 0 ){
            res.send(users);
        }
        else{
            res.status(404).json({message: 'Sin Resultado'});
        }
    };

    static getById = async(req: Request ,res:Response)=>{
        const{id} = req.params;
        const userRepository = getRepository(User);
        try{
            const user = await userRepository.findOneOrFail(id);
            res.send(user);
        }
        catch(e){
            res.status(404).json({message: 'Sin Resultado'});
       }
    }; 
    
    static newUser = async(req: Request, res: Response)=>{
        const{username, password, role}= req.body;
        const user = new User();

        user.username = username;
        user.password = password;
        user.role = role;

        //validar
        const validationOpt = {validationError: {target:false, value:false }};
        const errors  = await validate(user, validationOpt);
        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        //todo: has password

        const userRepository = getRepository(User);
        try{
            user.hashPassword();
            await userRepository.save(user);
        }
        catch(e){
            return res.status(409).json({message: 'El nombre de usuario ya existe'})
        }
        //todo okey
        res.send('Usuario Creado');
    };

    static editUser = async(req: Request, res: Response) =>{
        let user;
        const {id} = req.params;
        const {username, role}= req.body;

// try leer usuario
        const userRepository = getRepository(User);
        try{
            user = await userRepository.findOneOrFail(id);
            user.username = username;
            user.role = role;
        }
        catch{
            return res.status(404).json({message: 'Usuario no encontrado'})
        }

        const validationOpt = {validationError: {target:false, value:false }};
        const errors = await validate(user, validationOpt);
        
        if(errors.length > 0 ){
            return res.status(400).json(errors);
        }

        //try guardar usuario
        try{
            await userRepository.save(user);
        }
        catch(e){
            return res.status(409).json({message:'Nombre de usuario ya esta en uso'});
        }
        res.status(201).json({message: 'usuario actualizado'});
    };

    static deleteUser = async(req: Request, res: Response) =>{
        const{id} = req.params;
        const userRepository = getRepository(User);
        let user: User;

        try{
            user = await userRepository.findOneOrFail(id);
        }
        catch(e){
            return res.status(404).json({message:'Usuario no encontrado'});
        }

        //eliminar usuario
        userRepository.delete(id);
        res.status(201).json({message: 'Usuario Eliminado'});

    };
}
export default UserController;

 

