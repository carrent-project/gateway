import { Request } from 'express';

export interface IRequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
    roles: {
      roleName: TRoleName,
      roleDescription: string
    }[];
  };
}

export type TRoleName = "user" | "manager" | "admin"