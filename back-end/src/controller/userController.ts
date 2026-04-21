import {Request, Response} from "express";
import {user} from "../types/userTypes";
export default class UserController{
      
    public async createUser(req: Request, res: Response){
        if(!req.body){
            return res.status(400).json({message:"Dados do usuário são obrigatórios"});
        }
        const {nome, email, telefone, profissao, senha, cpf} = req.body as user;
       
        res.status(201).json({message: "Usuário criado com sucesso", user: {nome, email, telefone, profissao, cpf, senha}});
    }
}