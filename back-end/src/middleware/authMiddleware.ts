import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  // O formato costuma ser "Bearer <TOKEN>"
  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    // Você pode anexar o ID do usuário ao request para usar nos controllers
    (req as any).userId = (decoded as any).id;
    
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};