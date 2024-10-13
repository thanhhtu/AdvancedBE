import { RowDataPacket } from "mysql2";

export interface IBook extends RowDataPacket{
    BookID: number;
    Name: string;
    InsertDate: Date;
    UserID: number;
}