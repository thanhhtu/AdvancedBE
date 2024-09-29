import pool from '../config/database.config.js';

class UsersModel {
    async getUsers() {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT Email, (CAST (Gender AS INT)) AS Gender, Age, Role FROM users');
        connection.release();
        return rows;
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
            throw error;
        }
    }

    async createUser(user){
        try{
            const connection = await pool.getConnection();
            const query = `INSERT INTO users (Email, Password, Gender, Age, Role) VALUES (?, ?, ?, ?, ?);`;
            const {Email, Password, Gender, Age, Role} = user;
            const value = [Email, Password, Gender, Age, Role];
            const results = await connection.query(query, value);
            return results[0].insertId;
        }catch(error){
            throw error;
        }
    }

    async updateUser(user){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE users SET Email = ?, Password = ?, Gender = ?, Age = ?, Role = ? WHERE UserID = ?`;
            const {Email, Password, Gender, Age, Role, UserID} = user;
            const value = [Email, Password, Gender, Age, Role, UserID];
            const results = await connection.query(query, value);
            return results[0].affectedRows;
        }catch(error){
            throw error;
        }
    }

    async deleteUser(userId){
        try{
            const connection = await pool.getConnection();
            const query = `DELETE FROM users WHERE UserID = ?`;
            const value = [userId];
            const results = await connection.query(query, value);
            return results[0].affectedRows;
        }catch(error){
            throw error;
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
            throw error;
        }
    }

    async setPasswordToken(passwordResetToken, passwordResetExpiration, email){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE users SET PasswordResetToken = ?, PasswordResetExpiration = ? WHERE Email = ?`;
            const value = [passwordResetToken, passwordResetExpiration, email];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }

    async checkTokenPassword(email, passwordResetToken){
        try{
            const connection = await pool.getConnection()
            const query = `SELECT * FROM users WHERE Email = ? AND PasswordResetToken = ? AND PasswordResetExpiration >= ?`;
            const value = [email, passwordResetToken, new Date(Date.now())];
            const [rows] = await connection.query(query, value);
            connection.release();
            return rows[0];
        }catch(error){
            throw error;
        }
    }

    async resetPassword(newHashedPassword, passwordLastResetDate, email){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE users SET Pwd = ?, PasswordResetToken = NULL, PasswordResetExpiration = NULL, PasswordLastResetDate = ? WHERE Email = ?`;
            const value = [newHashedPassword, passwordLastResetDate, email];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }
}

export default new UsersModel()
