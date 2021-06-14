import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { validate } from 'class-validator';



class AuthController{
    static login = async (req: Request, res: Response) => {
        const{username, password} = req.body;

        if(!(username && password)){
           return res.status(400).json({message: 'Usuario & Contraseña requeridos '});
        }

        const userRepository = getRepository(User);
        let user: User;

        try{
            user = await userRepository.findOneOrFail({where:{username}});
        }
        catch(e){
            return res.status(400).json({message:' usuario o contraseña incorrecto!'});   
        }

        //comproba contraseña
        if(!user.checkPassword(password)){
            return res.status(400).json({message: ' Usuario o contraseña incorrecto'});
        }

        const token = jwt.sign({userId: user.id, username: user.username}, config.jwtSecret,{expiresIn: '1h'});

        res.json({message: 'OK', token, userId: user.id, role: user.role});
    };

    static changePassword = async (req: Request, res:Response) =>{
        const {userId} = res.locals.jwtPayload;
        const {oldPassword, newPassword} = req.body;

        if(!(oldPassword && newPassword)){
            res.status(400).json({message: 'contraseña antigua y nueva contraseña son requeridas' });
        }
        const userRepository = getRepository(User);
        let user: User;

        try{
            user = await userRepository.findOneOrFail(userId);
        }
        catch(e){
            res.status(400).json({message: 'algo anda mal!'});
        }

        if(!user.checkPassword(oldPassword)){
            return res.status(401).json({message: 'revisa tu cantraseña antigua'});
        }
        user.password = newPassword;
        const validationOps = {validationError: {target: false, value: false}};
        const errors = await validate(user, validationOps);

        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        //hash password
        user.hashPassword();
        userRepository.save(user);
        res.json({message: 'Cambio de contraseña Exitoso!'});
    };
}
export default AuthController;