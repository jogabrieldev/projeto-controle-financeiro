import {Request, Response} from "express";
import{ReceivingService} from "../services/receivingService"
import {receiving} from "../types/receivingType"

const services = new ReceivingService();
export default class ReceivingController {
     
    public async registerReceiving(req:Request, res:Response){
      try {
            if(!req.body){
            return res.status(400).json({message:"Os Dados obrigatorios não foram enviados"}) 
            }
            const userData = req.body as receiving;
            await services.validateInsertReceiving(userData);
            return res.status(201).json({message: "Usuário criado com sucesso", });
      } catch (error:any) {
        if (error.code === '23505') {
                return res.status(409).json({ message: "dados ja existentes." });
            }
            return res.status(500).json({ 
                message: error.message || "Erro interno no servidor." 
            });
      }
    }
}