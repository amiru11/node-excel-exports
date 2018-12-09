import { validateToken } from './jwt'
import config from '../../config'

export const authenticate = (req, res, next) => {
  const token = req.get(config.header.token)

  if (token) {
    validateToken({ token })
      .then(payload => {
        req.validUser = payload
        next()
      })
      .catch(err => next(err))
  } else {
    next(new Error('No Token'))
  }
}

export const validateAdmin = (req, res, next) => {
  const token = req.get(config.header.token)

  if (token) {
    validateToken({ token })
      .then(payload => {
        if (payload.isAdmin) {
          req.validUser = payload
          next()
        } else {
          const error = new Error('권한이 없습니다.')
          error.status = 402
          next(error)
        }
      })
      .catch(err => next(err))
  } else {
    next(new Error('No Token'))
  }
}

export const paginate = (req, res, next) => {
  req.page = Number(req.query['x-page']) || config.pagination.defaultPage
  req.pageSize =
    Number(req.query['x-page-size']) || config.pagination.defaultPageSize
  next()
}

export const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
