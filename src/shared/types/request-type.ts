import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: { sub: number; email: string }; // Tipando a propriedade 'user' com a estrutura que esperamos
}
