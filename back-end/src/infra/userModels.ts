import { pool } from "./database"
import { User } from "../types/userTypes";

export class UserModels {
     
    async insertNewUser (userData: User): Promise<User | null>{
       
         const query = `
            INSERT INTO usuario (nome, telefone, sexo, email, data_nasc, senha)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `; 

        const values = [
            userData.nome,
            userData.email,
            userData.telefone,
            userData.profissao,
            userData.senha, 
            userData.cpf
        ];

        try {
           const result = await pool.query(query, values);
           return result.rows[0];
        } catch (error) {
            console.error("Erro ao inserir usuário:", error);
            throw new Error("Erro para inserir o usuário no sistema!" +`${error}`);
        }
     
    }
}

