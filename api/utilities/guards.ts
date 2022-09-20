import { Bearer } from 'permit';
import jwtSimple from 'jwt-simple';
import express from 'express';
import jwt from '../jwt';
import { userServices } from "../server"
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
    query: "access_token"
})

export async function isUserLoggedIn(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {
        const token = permit.check(req)

        if (token === "null") {
            res.status(401).json({ msg: "Permission Denied" })
            return
        }
        const payload = jwtSimple.decode(token, jwt.jwtSecret as string)

        const user = await userServices.checkUserToken(payload.id, payload.username)
        if (user) {
            return next()
        }

    } catch (e) {
        logger.error(e.message)
        res.status(401).json({ msg: "Permission Denied" })
        return
    }
}

export async function isDietitianLoggedIn(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {
        const token = permit.check(req)

        if (token === "null") {
            res.status(401).json({ msg: "Permission Denied" })
            return
        }
        const payload = jwtSimple.decode(token, jwt.jwtSecret as string)

        const user = await userServices.checkDietitianToken(payload.id, payload.username)
        if (user) {
            return next()
        }

    } catch (e) {
        logger.error(e.message)
        res.status(401).json({ msg: "Permission Denied" })
        return
    }
}