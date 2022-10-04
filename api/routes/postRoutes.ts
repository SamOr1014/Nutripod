import express from 'express'
import { postController } from '../server'
import { isUserLoggedIn, isDietitianLoggedIn } from '../utilities/guards'

export const postRoutes = express.Router()

postRoutes.get('/all', isUserLoggedIn, postController.getAllPost)
postRoutes.post('/:uid/:date', isDietitianLoggedIn, postController.postArticle)
postRoutes.get('/:pid', isUserLoggedIn, postController.getPostByID)
postRoutes.delete('/:pid', isDietitianLoggedIn, postController.deletePostByID)
