import { Router } from 'express'

import getRouter from './get'
import postRouter from './post'
import putRouter from './put'
import deleteRouter from './delete'

const router = new Router()

router.use('/', getRouter)
router.use('/', postRouter)
router.use('/', putRouter)
router.use('/', deleteRouter)

export default router
