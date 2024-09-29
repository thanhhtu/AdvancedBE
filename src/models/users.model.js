import pool from '../config/database.config.js';
import CustomError from '../service/customError.service.js';
import { StatusCodes } from 'http-status-codes';

class UsersModel {
    async getUsers() {
        try{
            const connection = await pool.getConnection();
            const [rows] = await connection.query('SELECT Email, (CAST (Gender AS INT)) AS Gender, Age, Role FROM users');
            connection.release();
            return rows;
        }catch(error){
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    async getDetailUser(userId){
        try{
            const connection = await pool.getConnection();
            const query = `SELECT Email, (CAST (Gender AS INT)) AS Gender, Age, Role FROM users WHERE UserID = ?`;
            const value = [userId];
            const [rows] = await connection.query(query, value);
            connection.release();
            return rows[0];
        }catch(error){
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    async createUser(user){
        try{
            const connection = await pool.getConnection();
            const query = `INSERT INTO users (Email, Password, Gender, Age, Role) VALUES (?, ?, ?, ?, ?);`;
            const {Email, Password, Gender, Age, Role} = user;
            const value = [Email, Password, Gender, Age, Role];
            const results = await connection.query(query, value);
            connection.release();
            return results[0].insertId;
        }catch(error){
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    async updateUser(user){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE users SET Email = ?, Password = ?, Gender = ?, Age = ?, Role = ? WHERE UserID = ?`;
            const {Email, Password, Gender, Age, Role, UserID} = user;
            const value = [Email, Password, Gender, Age, Role, UserID];
            const results = await connection.query(query, value);
            connection.release();
            return results[0].affectedRows;
        }catch(error){
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    async deleteUser(userId){
        try{
            const connection = await pool.getConnection();
            const query = `DELETE FROM users WHERE UserID = ?`;
            const value = [userId];
            const results = await connection.query(query, value);
            connection.release();
            return results[0].affectedRows;
        }catch(error){
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    async getUserByEmail(email) {
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE Email = ?`;
            const value = [email];
            const [rows] = await connection.query(query, value);
            connection.release();
            return rows[0];
        }catch(error){
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    async setAccessToken(accessToken, email){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE users SET AccessToken = ? WHERE Email = ?`;
            const value = [accessToken, email];
            await connection.query(query, value);
            connection.release();
            return true;
        }catch(error){
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }

    async getAccessTokenByUserID(userId){
        try{
            const connection = await pool.getConnection();
            const query = `SELECT AccessToken FROM users WHERE UserID = ?`;
            const value = [userId];
            const [rows] = await connection.query(query, value);
            connection.release();
            return rows[0].AccessToken;
        }catch(error){
            throw new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }
    }
}

export default new UsersModel()
