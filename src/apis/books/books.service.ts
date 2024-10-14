import booksModel from '../../models/books.model';
import CustomError from '../../service/customError.service';
import { errorInfo } from '../../service/handleError.service';
import { StatusCodes } from 'http-status-codes';
import { IBook } from '../../types/book.data';

class BooksService{
    async getDetailBook(bookId: number){
        try {
            let users;
            if(bookId) users = await booksModel.getDetailBook(bookId);
            else users = await booksModel.getBooks();
            return users;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async addBook(bookName: string, insertUserId: number){
        try {
            return await booksModel.insertBook(bookName, insertUserId)
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }

    async deleteBook(bookId: number){
        try {
            await booksModel.getDetailBook(bookId);
            const result = await booksModel.deleteBook(bookId);
            return result;
        }catch(error){
            const { statusError, messageError } = errorInfo(error);
            throw new CustomError(statusError, messageError);
        }
    }
}

export default new BooksService();