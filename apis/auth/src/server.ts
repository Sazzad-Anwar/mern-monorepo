import { ErrorHandler, NotFound } from '@repo/error-handler'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import process, { version } from 'process'
import * as pack from '../package.json'
import { ApiRoutes } from './constants'
import healthRouter from './health/health.routes'
import { route } from './lib/helpers'
import loginRouter from './login/login.routes'

export const serviceDetails = {
  ServiceName: pack.name,
  Version: pack.version,
  ProcessId: process.pid,
  NodeVersion: version,
  Environment: process.env.ENV,
  Host: `http://${process.env.host}:${process.env.AUTH_PORT}`,
}

export const createServer = () => {
  const app = express()
  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get(ApiRoutes.root, (req, res) => {
      res.json(serviceDetails)
    })
    .use(route(ApiRoutes.health), healthRouter)
    .use(route(ApiRoutes.login), loginRouter)
    .use(NotFound)
    .use(ErrorHandler)

  return app
}
