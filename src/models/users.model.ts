import { ResultSetHeader } from 'mysql2/promise'
import pool from '../config/database.config';
import CustomError from '../service/customError.service';
import { IUser, IUserGetInfo, IUserPostInfo } from '../types/user.data';
import { errorInfo } from '../service/handleError.service';
import { StatusCodes } from 'http-status-codes';

class UsersModel {
    async getUsers() {
        try{
            const connection = await pool.getConnection();
            const [rows] = await connection.query<IUserGetInfo[]>('SELECT Email, CAST(Gender AS VARCHAR(255)) AS Gender, Age FROM users');
            connection.release();
            return rows;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async getDetailUser(userId: number){
        try{
            const connection = await pool.getConnection();
            const query = `SELECT Email, CAST (Gender AS VARCHAR(255)) AS Gender, Age FROM users WHERE UserID = ?;`;
            const [rows] = await connection.query<IUserGetInfo[]>(query, userId);

            if(rows[0] == null){
                throw new CustomError(StatusCodes.NOT_FOUND, 'User not found'); //404
            }

            connection.release();
            return rows[0];
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async createUser(user: IUserPostInfo){
        try{
            const {Email, Password, Gender, Age, Role} = user;

            const connection = await pool.getConnection();
            
            //insert users
            const queryUser = `INSERT INTO users (Email, Password, Gender, Age) VALUES (?, ?, ?, ?);`;
            const valueUser = [Email, Password, Gender, Age];
            const resultsUser = await connection.query<ResultSetHeader>(queryUser, valueUser);

            //insert user-role
            for(let i = 0; i < Role.length; i++){
                const queryRole = `INSERT INTO users_roles (UserID, RoleID) VALUES (?, ?);`;
                const valueRole = [resultsUser[0].insertId, Role[i]];
                await connection.query<ResultSetHeader>(queryRole, valueRole);
            }

            connection.release();
            return resultsUser[0].insertId;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async updateUser(user: IUserPostInfo, userID: number){
        try{
            const {Email, Password, Gender, Age, Role} = user;

            const connection = await pool.getConnection();

            const query = `UPDATE users SET Email = ?, Password = ?, Gender = ?, Age = ? WHERE UserID = ?`;
            const value = [Email, Password, Gender, Age, userID];
            const results = await connection.query<ResultSetHeader>(query, value);

            connection.release();
            return results[0].affectedRows;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async deleteUser(userId: number){
        try{
            const connection = await pool.getConnection();

            //delete role of user
            await connection.query<ResultSetHeader>('DELETE FROM users_roles WHERE UserID = ?', userId);

            //delete user
            const resultsUser = await connection.query<ResultSetHeader>('DELETE FROM users WHERE UserID = ?', userId);

            connection.release();
            return resultsUser[0].affectedRows;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async getUserByEmail(email: string) {
        try{
            const connection = await pool.getConnection();
            const [rows] = await connection.query<IUser[]>('SELECT * FROM users WHERE Email = ?', email);
            connection.release();
            console.log(rows[0])
            return rows[0];
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async setAccessToken(accessToken: string, email: string){
        try{
            const connection = await pool.getConnection();
            await connection.query('UPDATE users SET AccessToken = ? WHERE Email = ?', [accessToken, email]);
            connection.release();
            return true;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async getAccessTokenByUserID(userId: number){
        try{
            const connection = await pool.getConnection();
            const [rows] = await connection.query<IUser[]>('SELECT * FROM users WHERE UserID = ?', userId);
            connection.release();
            return rows[0].AccessToken;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }
}

export default new UsersModel()
