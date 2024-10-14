import pool from '../config/database.config';
import CustomError from '../service/customError.service';
import { errorInfo } from '../service/handleError.service';
import { StatusCodes } from 'http-status-codes';
import { IBook } from '../types/book.data';
import { ResultSetHeader } from 'mysql2';

class BooksModel {
    async getBooks() {
        try{
            const connection = await pool.getConnection();
            const [rows] = await connection.query<IBook[]>('SELECT * FROM books');
            connection.release();
            return rows;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async getDetailBook(bookId: number){
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM books WHERE BookID = ?;`;
            const [rows] = await connection.query<IBook[]>(query, bookId);

            if(rows[0] == null){
                throw new CustomError(StatusCodes.NOT_FOUND, 'Book not found'); //404
            }

            connection.release();
            return rows[0];
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async insertBook(bookName: string, insertUserId: number){
        try{
            const connection = await pool.getConnection();
            
            const resultsUser = await connection.query<ResultSetHeader>('INSERT INTO books (Name, InsertDate, UserID) VALUES (?, ?, ?);', [bookName, new Date(Date.now()), insertUserId]);
            connection.release();
            return resultsUser[0].insertId;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    // async updateUser(user: IUserPostInfo, userID: number){
    //     try{
    //         const {Email, Password, Gender, Age, Role} = user;

    //         const connection = await pool.getConnection();

    //         const query = `UPDATE users SET Email = ?, Password = ?, Gender = ?, Age = ? WHERE UserID = ?`;
    //         const value = [Email, Password, Gender, Age, userID];
    //         const results = await connection.query<ResultSetHeader>(query, value);

    //         connection.release();
    //         return results[0].affectedRows;
    //     }catch(error){
    //         const { statusError, messageError } = errorInfo(error);
    //         throw new CustomError(statusError, messageError);
    //     }
    // }

    async deleteBook(bookId: number){
        try{
            const connection = await pool.getConnection();
            const resultsUser = await connection.query<ResultSetHeader>('DELETE FROM books WHERE BookID = ?', bookId);
            connection.release();
            return resultsUser[0].affectedRows;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }
}

export default new BooksModel()