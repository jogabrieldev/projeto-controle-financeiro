import {Request, Response} from "express";
import {User} from "../types/userTypes";
import { UserService } from "../services/registerUser";

const userService = new UserService();
export default class UserController{
     
   public async createUser(req: Request, res: Response) {
        try {
            if (!req.body ) {
                return res.status(400).json({ message: "Dados incompletos." });
            }
            const userData = req.body as User;
            await userService.registerUser(userData);
            return res.status(201).json({message: "Usuário criado com sucesso", });

        } catch (error: any) {
            if (error.code === '23505') {
                return res.status(409).json({ message: "E-mail ou CPF já existem." });
            }
            return res.status(500).json({ 
                message: error.message || "Erro interno no servidor." 
            });
        }
    }
}