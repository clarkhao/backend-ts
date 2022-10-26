import { ErrorRequestHandler } from "express";
const errorHandler: ErrorRequestHandler = async (err,req,res,next) => {
    console.error(err)
    //res.status(500).send('Something broke!')
}

export {errorHandler};