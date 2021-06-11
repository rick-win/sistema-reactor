import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';



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
            return res.status(400).json({message:' usuario o contraseña incorrecto!'})    
        }

        //comproba contraseña
        if(!user.checkPassword(password)){
            return res.status(400).json({message: ' Usuario o contraseña incorrecto'})
        }

        const token = jwt.sign({userId: user.id, username: user.username}, config.jwtSecret,{expiresIn: '1h'});

        res.json({message: 'OK', token});
    };
}
export default AuthController;