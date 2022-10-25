import { RequestHandler } from "express";

const readCode: RequestHandler = async (req, res, next) => {
    console.log(req);
    res.redirect('http://192.168.3.55:3000')
}

export {readCode};