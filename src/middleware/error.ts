import { NextFunction, Request, Response } from 'express';
import ErrorShape from "../interfaces/errorResponce";

const errorHandler = (
    req :Request ,
    res : Response ,
    next :NextFunction ,
    err: ErrorShape
)=>{
    const status = err.statusCode || 500 ;
    const message = err.message || ('Something went wrong we are Sorry ');

    res.status(status).json({status , message});
};

export default errorHandler

