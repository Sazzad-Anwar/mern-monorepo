import expressAsyncHandler from 'express-async-handler'
import { dummyResponse } from './login.const'
import { loginSchema } from './login.type'

const loginController = expressAsyncHandler(async (req, res) => {
  const value = loginSchema.parse(req.body)

  if (process.env.ENV === 'test') {
    res.json(dummyResponse)
  } else {
    res.json({ data: value })
  }
})

export default loginController
