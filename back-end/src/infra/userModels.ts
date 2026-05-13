import { pool } from "./database"
import { User } from "../types/userType";

export class UserModels {
     
    async insertNewUser (userData: User): Promise<User | null>{
       
         const query:string = `
            INSERT INTO usuario (nome, telefone, sexo, email, data_nasc, cpf_user, senha, tipo_receber)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `; 

        const values = [
            userData.nome,
            userData.telefone,
            userData.sexo,
            userData.email,
            userData.data_nasc, 
            userData.cpf,
            userData.senha,
            userData.tipo_receber
        ];

        try {
           const result = await pool.query(query, values);
           return result.rows[0];
        } catch (error) {
            console.error("Erro ao inserir usuário:", error);
            throw new Error("Erro para inserir o usuário no sistema!" +`${error}`);
        }
     
    }

    async getUserByEmail(email: string): Promise<any | null> {
        const query = "SELECT id_user, email, senha, nome FROM usuario WHERE email = $1";
        try {
            const result = await pool.query(query, [email]);
            return result.rows[0] || null;
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            throw new Error("Erro na consulta de autenticação.");
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

