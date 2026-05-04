import { pool } from "./database"
import { User } from "../types/userTypes";

export class UserModels {
     
    async insertNewUser (userData: User): Promise<User | null>{
       
         const query:string = `
            INSERT INTO usuario (nome, telefone, sexo, email, data_nasc, cpf_user, senha)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `; 

        const values = [
            userData.nome,
            userData.telefone,
            userData.sexo,
            userData.email,
            userData.data_nasc, 
            userData.cpf,
            userData.senha
        ];

        try {
           const result = await pool.query(query, values);
           return result.rows[0];
        } catch (error) {
            console.error("Erro ao inserir usuário:", error);
            throw new Error("Erro para inserir o usuário no sistema!" +`${error}`);
        }
     
    }

    async getAllUsers(): Promise<User[]>{
       const query:string = "SELECT * FROM usuario";
       try {
         const result = await pool.query(query)
         return result.rows; 
       } catch (error) {
         throw new Error("Erro ao buscar todos os usuários do sistema" + `${error}`);
       }
    }
}

