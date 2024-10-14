import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction}  from 'express';
import booksService from './books.service';
import { handlerErrorRes } from '../../service/handleError.service';
import { IBook } from '../../types/book.data';

class BooksController {
    async viewBooks(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const bookId = Number(req.params.id);
            let books = await booksService.getDetailBook(bookId);
            res.status(StatusCodes.OK).json({
                success: true,
                data: books
            });
        }catch(error){
            handlerErrorRes(error, res);
        }
    }

    async addBooks(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const bookName = req.body.Name;
            const insertedUserId = Number(req.user.id);
            let result = await booksService.addBook(bookName, insertedUserId);
            res.status(StatusCodes.OK).json({
                success: true,
                data: result
            });
        }catch(error){
            handlerErrorRes(error, res);
        }
    }

    async deleteBook(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const bookId = Number(req.params.id);
            const result = await booksService.deleteBook(bookId);
            res.status(StatusCodes.OK).json({
                success: true,
                affectRows: result
            });
        }catch(error){
            handlerErrorRes(error, res);
        }
    }
}

export default new BooksController();