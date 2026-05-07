import {Request, Response} from "express";
import {User} from "../types/userType";
import { UserService } from "../services/registerUser";
import { generateToken } from "../services/authService"
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

    public async login(req: Request, res: Response) {
        try {
            const data = req.body;
            const user = await userService.validateUserCredentials(data);
            if (!user) {
                return res.status(401).json({ message: "E-mail ou senha inválidos." });
            }
            const token = generateToken(user.id);
            return res.status(200).json({message: "Login realizado com sucesso",
              user: { id: user.id, email: user.email, name: user.nome, type: user.tipo_receber},
              token
            });

        } catch (error: any) {
            console.log("error" + error)
            return res.status(500).json({ message: "Erro ao processar login." });
        }
    }

    public async getUser(req:Request, res: Response){
      try {
         const returnUsers =await userService.getUser()
         return res.status(200).json({message: "sucesso na busca" , user:returnUsers})
      } catch (error) {
        return res.status(500).json({message:"Erro interno no servidor"})
      }
    }
}