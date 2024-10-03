import { ResultSetHeader } from 'mysql2/promise'
import pool from '../config/database.config';
import CustomError from '../service/customError.service';
import { IUser, IUserGetInfo, IUserPostInfo } from '../types/user.interface';
import { errorInfo } from '../service/handleError.service';

class UsersModel {
    async getUsers() {
        try{
            const connection = await pool.getConnection();
            const [rows] = await connection.query<IUserGetInfo[]>('SELECT Email, CAST(Gender AS VARCHAR(255)) AS Gender, Age, CAST(Role AS VARCHAR(255)) AS Role FROM users');
            connection.release();
            return rows;
        }catch(error: unknown){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async getDetailUser(userId: number){
        try{
            const connection = await pool.getConnection();
            const query = `SELECT Email, CAST (Gender AS VARCHAR(255)) AS Gender, Age, CAST (Role AS VARCHAR(255)) AS Role FROM users WHERE UserID = ?;`;
            const value = [userId];
            const [rows] = await connection.query<IUserGetInfo[]>(query, value);
            connection.release();
            return rows[0];
        }catch(error: unknown){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async createUser(user: IUserPostInfo){
        try{
            const connection = await pool.getConnection();
            const query = `INSERT INTO users (Email, Password, Gender, Age, Role) VALUES (?, ?, ?, ?, ?);`;
            const {Email, Password, Gender, Age, Role} = user;
            const value = [Email, Password, Gender, Age, Role];
            const results = await connection.query<ResultSetHeader>(query, value);
            connection.release();
            return results[0].insertId;
        }catch(error: unknown){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async updateUser(user: IUserPostInfo, userID: number){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE users SET Email = ?, Password = ?, Gender = ?, Age = ?, Role = ? WHERE UserID = ?`;
            const {Email, Password, Gender, Age, Role} = user;
            const value = [Email, Password, Gender, Age, Role, userID];
            const results = await connection.query<ResultSetHeader>(query, value);
            connection.release();
            return results[0].affectedRows;
        }catch(error: unknown){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async deleteUser(userId: number){
        try{
            const connection = await pool.getConnection();
            const query = `DELETE FROM users WHERE UserID = ?`;
            const value = [userId];
            const results = await connection.query<ResultSetHeader>(query, value);
            connection.release();
            return results[0].affectedRows;
        }catch(error: unknown){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async getUserByEmail(email: string) {
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE Email = ?`;
            const value = [email];
            const [rows] = await connection.query<IUser[]>(query, value);
            connection.release();
            console.log(rows[0])
            return rows[0];
        }catch(error: unknown){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async setAccessToken(accessToken: string, email: string){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE users SET AccessToken = ? WHERE Email = ?`;
            const value = [accessToken, email];
            await connection.query(query, value);
            connection.release();
            return true;
        }catch(error: unknown){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async getAccessTokenByUserID(userId: number){
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE UserID = ?`;
            const value = [userId];
            const [rows] = await connection.query<IUser[]>(query, value);
            connection.release();
            return rows[0].AccessToken;
        }catch(error: unknown){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }
}

export default new UsersModel()
