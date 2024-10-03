import { Response } from 'express';
import { StatusCodes } from "http-status-codes";
import CustomError from "./customError.service";

let handlerErrorRes = (error: unknown, res: Response) => {
    if(error instanceof CustomError){
        return res.status(error.status).json({
            success: false,
            error: error.message,
        });
    }else if(error instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ //400
            success: false,
            error: error.message,
        });
    }else{
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: 'Unknown error',
        });
    }
}

function errorInfo(error: unknown){
    let messageError: string;
    let statusError:number;

    if(error instanceof CustomError){
        statusError = error.status;
        messageError = error.message;
    }else if(error instanceof Error){
        statusError = StatusCodes.INTERNAL_SERVER_ERROR;
        messageError = error.message;
    }else{
        statusError = StatusCodes.INTERNAL_SERVER_ERROR;
        messageError = "Unknown error";
    }

    return { statusError, messageError }
}

export { handlerErrorRes, errorInfo };