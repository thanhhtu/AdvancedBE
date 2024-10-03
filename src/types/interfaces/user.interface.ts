import { RowDataPacket } from "mysql2";
import { BitwiseOperator } from "typescript";

export interface IUser extends RowDataPacket{
    UserID: number;
    Email: string;
    Password: string;
    Gender: BitwiseOperator;
    Age: number;
    AccessToken: string;
}

export interface IUserGetInfo extends RowDataPacket{
    Email: string;
    Gender: string;
    Age: number;
    Role: string;
}

export interface IUserPostInfo{ //người dùng nhập
    Email: string;
    Password: string;
    RepeatPassword: string;
    Gender: string;
    Age: number;
    Role: string;
}

export interface ILoginInfo{
    Email: string;
    Password: string;
}

export interface IPayload{
    id: number;
}