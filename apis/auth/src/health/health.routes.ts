import express from 'express'
import expressAsyncHandler from 'express-async-handler'

const healthRouter = express.Router()

healthRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    res.json({ ok: true })
  }),
)

export default healthRouter
