import bcrypt from "bcrypt";
import { User } from "../types/userType";
import { UserModels } from "../infra/userModels";
import { AuthUser } from "../types/authType";

const userModel = new UserModels();

export class UserService {
    
    public async registerUser(userData: User): Promise<User> {
        const saltRounds = 10;
        const hashedHash = await bcrypt.hash(userData.senha, saltRounds);
        const userWithHashedPassword = {...userData,
        senha: hashedHash};
        const createdUser = await userModel.insertNewUser(userWithHashedPassword);
        if (!createdUser) {
            throw new Error("Erro ao criar usuário no banco de dados.");
        }
        return createdUser;
    }
    public async validateUserCredentials(credentials: AuthUser): Promise<any | null> {

       const { email, password } = credentials;
       const user = await userModel.getUserByEmail(email);
        if (!user){
          throw new Error("Usuário não encontrado")
        };
        const isMatch = await bcrypt.compare(password, user.senha);
        if (!isMatch){
            throw new Error("Senha passado pelo o usuário esta INCORRETA")
        }
        return {
            id: user.id_user,
            email: user.email,
            nome: user.nome,
            tipo_receber:user.tipo_receber
        }
    }

    public async getUser(){
        try {
           const users = await userModel.getAllUsers()   
           return users;
        } catch (error) {
            console.error("erro ao buscar user")
        }
    }
}