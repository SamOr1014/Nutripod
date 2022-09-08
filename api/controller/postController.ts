import { Request, Response } from 'express'
import { PostServices } from "../services/postServices"

export class PostController {
    constructor(private postService:PostServices) {}

    get = async (req: Request, res: Response) => {
        this.postService.get
    }

}