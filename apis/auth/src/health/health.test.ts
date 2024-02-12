import { HttpStatus } from '@repo/error-handler'
import supertest from 'supertest'
import { describe, expect, it } from 'vitest'
import { ApiRoutes } from '../constants'
import { route } from '../lib/helpers'
import { createServer } from '../server'

describe('server', () => {
  it('health check returns 200', async () => {
    await supertest(createServer())
      .get(route(ApiRoutes.health))
      .expect(HttpStatus.OK)
      .then((res) => {
        expect(res.body.ok).toBe(true)
      })
  })
})
