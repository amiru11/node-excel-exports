import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import flash from 'connect-flash'
import CORS from 'cors'
import Raven from 'raven'

import db from './db'
import passport from './passport'
import routes from './routes/index'

import config from '../config'

db()
passport()

const app = express()
app.disable('x-powered-by')

// View engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

app.use(
  logger('dev', {
    skip: () => app.get('env') === 'test'
  })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../public')))

app.use(flash())
app.use(
  CORS({
    exposedHeaders: ['x-page', 'x-page-size', 'x-total-count']
  })
)

// Must configure Raven before doing anything else with it
Raven.config(config.sentry.DSN).install()

// The request handler must be the first middleware on the app
app.use(Raven.requestHandler())

// Routes
app.use('/api', routes)

// Catch 404 and forward to error handler
app.use((req, res) => {
  throw new Error('Not Found')
})

// The error handler must be before any other error middleware
app.use(Raven.errorHandler())

// Error handler
app.use(function onError(err, req, res, next) {
  // eslint-disable-line no-unused-vars
  /**
   * if you use only for API Server
   */
  const error = {
    project: config.project,
    version: config.version,
    host: req.headers.host,
    'user-agent': req.headers['user-agent'],
    url: req.url,
    status: err.status || 500,
    method: req.method,
    message: err.message || err.text || 'There was an error on API server',
    userId: req.validUser ? req.validUser.id : null,
    env: process.env.NODE_ENV
  }

  res.status(err.status || 500).json(error)
})

export default app
