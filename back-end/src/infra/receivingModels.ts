import { pool } from "./database"
import { receiving } from "../types/receivingType";

export class ReceivingModels {
     
    async insertReceiving (Data: receiving): Promise<receiving | null>{
        const query:string = `INSERT INTO receber (usuario_id, descricao, valor) VALUES ($1, $2, $3)RETURNING *;`; 
            const values = [Data.id_user,Data.descricao,Data.valor];
            try {
               const result = await pool.query(query.trim(), values);
               return result.rows[0];
            } catch (error) {
                console.error("Erro ao inserir valor recebido:", error);
                throw new Error("Erro para inserir valor recebido pelo o usuário no sistema!" +`${error}`);
            }
         
        }
}