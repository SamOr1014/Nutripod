import { Request, Response } from 'express'
import { UserServices } from "../services/userServices"

export class UserController {
    constructor(private userService:UserServices) {}

    login = async (req: Request, res: Response) => {
        const results = await this.userService.login()
        if(results.length === 0 ) {
            res.json({success:false,message:"Error in post"})
            return
        }
        const result = res.json(results)
        res.send(result)
    }


}