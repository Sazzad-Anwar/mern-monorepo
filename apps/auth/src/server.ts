import { ErrorHandler, NotFound } from '@repo/error-handler'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import process, { version } from 'process'
import * as pack from '../package.json'
import healthRouter from './health/routes'

dotenv.config()

export const baseUrl = '/api/v1/auth'
export const serviceDetails = {
  ServiceName: pack.name,
  Version: pack.version,
  ProcessId: process.pid,
  NodeVersion: version,
  Environment: process.env.NODE_ENV,
  Host: `http://localhost:${process.env.PORT}`,
}

export const createServer = () => {
  const app = express()
  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get(baseUrl, (req, res) => {
      res.json(serviceDetails)
    })
    .use(`${baseUrl}/health`, healthRouter)
    .use(NotFound)
    .use(ErrorHandler)

  return app
}
