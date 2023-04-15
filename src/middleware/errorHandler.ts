import { ErrorRequestHandler } from "express";
const errorHandler: ErrorRequestHandler = async (err,req,res,next) => {
    console.error(`error_handler: ${err}`)
    res.status(500).send({error: err})
}

export {errorHandler};