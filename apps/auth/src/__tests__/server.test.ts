import supertest from 'supertest'
import { describe, expect, it } from 'vitest'
import { baseUrl, createServer } from '../server'

describe('server', () => {
  it('health check returns 200', async () => {
    await supertest(createServer())
      .get(`${baseUrl}/health`)
      .expect(200)
      .then((res) => {
        expect(res.body.ok).toBe(true)
      })
  })
})
