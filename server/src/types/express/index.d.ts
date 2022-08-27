import { User as PrismaUser } from '@prisma/client';
import { Request as ExpressRequest } from 'express';

declare global {
  namespace Express {
    interface User extends PrismaUser {}
  }
}
