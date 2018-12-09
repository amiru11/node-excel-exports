import { Router } from 'express'

import adminRouter from './admin'
import * as auth from './auth'
import * as posts from './posts'

import { paginate, validateAdmin } from '../../lib/middlewares'

const router = Router()

/**
 * GET home page
 */

router.get('/', (req, res) => {
  res.json({
    version: 'v1.0'
  })
})

/**
 * Admin
 */
router.use('/admin', validateAdmin, adminRouter)

/**
 * Authentication
 */
router.post('/signup', auth.signup)
router.post('/login', auth.login)

/**
 * POSTS
 */
router.get('/posts', paginate, posts.get)
router.post('/posts', posts.post)
router.put('/posts/:id', posts.put)
router.delete('/posts/:id', posts.remove)

export default router
