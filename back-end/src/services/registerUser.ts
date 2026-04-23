import bcrypt from "bcrypt";
import { User } from "../types/userTypes";
import { UserModels } from "../infra/userModels";

const userModel = new UserModels();

export class UserService {
    
    public async registerUser(userData: User): Promise<User> {
        const saltRounds = 10;
        const hashedHash = await bcrypt.hash(userData.senha, saltRounds);
        const userWithHashedPassword = {...userData,senha: hashedHash};

        const createdUser = await userModel.insertNewUser(userWithHashedPassword);
        if (!createdUser) {
            throw new Error("Erro ao criar usuário no banco de dados.");
        }
        return createdUser;
    }
}