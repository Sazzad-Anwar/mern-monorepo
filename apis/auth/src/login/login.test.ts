import { HttpStatus } from '@repo/error-handler'
import supertest from 'supertest'
import { describe, expect, it } from 'vitest'
import { ApiRoutes } from '../constants'
import { route } from '../lib/helpers'
import { createServer } from '../server'

describe('Login:', () => {
  describe('If request is successful:', () => {
    it('It should return 200 with tokens', async () => {
      await supertest(createServer())
        .post(route(ApiRoutes.login))
        .set({ 'Content-Type': 'application/json' })
        .send({ email: 'sazzadzihan@gmail.com', password: 'sazzad14' })
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.body.data.accessToken).toBeDefined()
          expect(res.body.data.refreshToken).toBeDefined()
        })
    })
  })

  describe('If request has invalid payload:', () => {
    it('It should return 422 with validation error', async () => {
      await supertest(createServer())
        .post(route(ApiRoutes.login))
        .set({ 'Content-Type': 'application/json' })
        .send({ email: 'sazzadzihan@gmail.com1', password: 'sazzad' })
        .expect(HttpStatus.UNPROCESSABLE_ENTITY)
        .then((res) => {
          expect(res.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY)
          expect(res.body.error.validation.length).toBeGreaterThan(0)
        })
    })
  })
})
