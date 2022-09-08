import { Request, Response } from 'express'
import { UserServices } from "../services/userServices"

export class UserController {
    constructor(private userService:UserServices) {}

    login = async (req: Request, res: Response) => {
        this.userService.login
    }

}