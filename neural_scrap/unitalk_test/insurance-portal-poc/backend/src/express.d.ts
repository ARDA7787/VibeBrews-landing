import { Multer } from 'multer';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: number;
    file?: Express.Multer.File;
  }
}
