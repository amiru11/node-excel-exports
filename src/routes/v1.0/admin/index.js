import { Router } from 'express'

import * as users from './users'
import * as posts from './posts'

import { paginate } from '../../../lib/middlewares'

const router = Router()

/**
 * Users
 */
router.get('/users', paginate, users.get)
router.put('/users/:id', users.update)
router.delete('/users/:id', users.remove)

/**
 * Posts
 */
router.get('/posts', paginate, posts.get)
router.delete('/posts/:id', posts.remove)

export default router
