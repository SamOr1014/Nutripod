import { Request, Response } from 'express'
import { UserServices } from "../services/userServices"

export class UserController {
    constructor(private userService:UserServices) {}

    login = async (req: Request, res: Response) => {
        console.log("received in server userController")
        const results = await this.userService.login()
        if(results.length === 0 ) {
            res.json({success:false,message:"Error in user"})
            return
        }
        const result = res.json(results)
        res.send(result)
    }


}