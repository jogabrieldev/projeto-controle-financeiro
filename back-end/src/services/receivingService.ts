
import {ReceivingModels} from "../infra/receivingModels"
import {receiving} from "../types/receivingType"
import { UserModels } from "../infra/userModels";
const conn = new ReceivingModels()
const userModel = new UserModels();
export class ReceivingService {
    
    public async validateInsertReceiving(data:receiving): Promise<void>{
        if (!data.id_user) {
         throw new Error("A identificação do usuário é obrigatória para o registro.", );
        }
        const userExists = await userModel.findById(data.id_user);
        if (!userExists) throw new Error("Usuário não encontrado ou inativo.");

        if (data.valor === undefined || data.valor === null) {
         throw new Error("O valor do recebimento é obrigatório.");
        }
        if (!data.descricao || data.descricao.trim().length === 0) {
          throw new Error("A descrição do recebimento não pode estar vazia.");
        }
        if(data.descricao.trim().length > 55){
          throw new Error("Adescrição do recebimento não poder ser muito longo.");
        }
        await conn.insertReceiving(data);
    }
}