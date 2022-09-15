import { Bearer } from 'permit';
// import jwtSimple from 'jwt-simple';
import express from 'express';
// import jwt from '../jwt';
// import { userServices } from "../server"
import { logger } from '../configs/winston'


export interface User {
    id: number
    username: string
}

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

const permit = new Bearer({
    query:"access_token"
})

export async function isUserLoggedIn(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {
        const token = permit.check(req)
        console.log(token)
        console.log("Return")
        return 
    }catch(e) {
        logger.error(e.message)
        res.status(401).json({msg:"Permission Denied"})
        return 
    }
}