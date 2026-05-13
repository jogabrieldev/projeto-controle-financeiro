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
            const userId = (req as any).userId
            if(!userId){
              return res.status(400).json({message:"Identificação do usuário não fornecida,"})
            }
            const userData: receiving = {
                ...req.body,
                id_user: userId 
            };
            await services.validateInsertReceiving(userData);
            return res.status(201).json({message: "Recebimento enviado com sucesso!", });
      } catch (error:any) {
        return res.status(500).json({ 
          message: error.message || "Erro interno no servidor." 
        });
      }
    }
}