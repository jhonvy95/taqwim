import { Request } from "express";
export interface IGetUserAuthInfoRequest extends Request {
  uid?: string | Document<Types.ObjectId>;
  name?: string;
}

export interface Payloadjwt {
  uid: string;
  name: string;
  iat: number;
  exp: number;
}
