import { Request, Response } from 'express'
import { logger } from '../configs/winston'
import { PostServices } from '../services/postServices'
import { formatDate } from "../utilities/formatDate"

export class PostController {
	constructor(private postService: PostServices) { }

	getAllPost = async (req: Request, res: Response) => {
		try {
			const posts = await this.postService.getAllPost()
			res.json({ success: true, posts: posts })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({
				success: false,
				message: 'Internal Server Error'
			})
			return
		}
	}

	getPostByID = async (req: Request, res: Response) => {
		try {
			let pid = req.params.pid
			const post = await this.postService.getPostByID(pid)
			res.json({ success: true, post: post })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({
				success: false,
				message: 'Internal Server Error'
			})
			return
		}
	}

	deletePostByID = async (req: Request, res: Response) => {
		try {
			let pid = req.params.pid
			await this.postService.deletePostByID(pid)
			res.json({ success: true })
		} catch (e) {
			logger.error(e.message)
			res.status(500).json({
				success: false,
				message: 'Internal Server Error'
			})
			return
		}
	}

	postArticle = async (req: Request, res: Response) => {

		try {
			const uid = req.params.uid
			const postDate = req.params.date
			const formattedDate = formatDate(postDate)
			const content = req.body.content
			const title = "testing"

			if (!uid) {
				res.status(400).json({ success: false })
				return
			}

			const result = await this.postService.postArticle(uid,title,content,formattedDate)

			if (result.length === 0) {
				res.status(400).json({ success: false })
				return
			}
			res.status(200).json({ success: true })

		} catch (e) {
			logger.error(e.message)
			res.status(500).json({
				success: false,
				message: 'Internal Server Error'
			})
			return
		}

	}
}
