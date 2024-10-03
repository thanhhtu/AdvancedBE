import { IPayload } from "../src/types/interfaces/user.interface";
import * as express from "express";

declare global {
    namespace Express {
        interface Request {
            user?: Record<string, any>;
        }
    }
}