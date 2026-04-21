import jwt from 'jsonwebtoken';

export const generateToken = (userId: string) => {
    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
    throw new Error("As variáveis de ambiente JWT não foram configuradas.");
  }
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as any,
  });
};