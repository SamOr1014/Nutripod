import express from 'express'
import { postController } from '../server'
import { isUserLoggedIn } from '../utilities/guards'

export const postRoutes = express.Router()

postRoutes.get('/all', isUserLoggedIn, postController.getAllPost)

postRoutes.get('/:pid', isUserLoggedIn, postController.getPostByID)

postRoutes.delete('/:pid', isUserLoggedIn, postController.deletePostByID)
