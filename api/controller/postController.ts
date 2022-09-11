import { Request, Response } from 'express'
import { PostServices } from "../services/postServices"

export class PostController {
    constructor(private postService:PostServices) {}

    get = async (req: Request, res: Response) => {
        const results = await this.postService.get()
        if(results.length === 0 ) {
            res.json({success:false,message:"Error in post"})
            return
        }
        const result = res.json(results)
        res.send(result)
    }

}