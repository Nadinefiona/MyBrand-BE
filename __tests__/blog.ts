import { test, it, describe, expect, beforeAll, afterAll } from '@jest/globals';
import supertest, { Request, Response } from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index';
import dotenv from 'dotenv';
dotenv.config();
const ENV_db_URL = process.env.MONGODB_TEST_URI || '';
const DB_Password = process.env.MONGODB_PASSWORD || '';
const DB_url = ENV_db_URL.replace('<password>', DB_Password);
console.log(DB_url);
describe('Auth Testing', () => {
  it('if user not found', async () => {
    const payload: {
      email: string;
      password: string;
    } = {
      email: '',
      password: '',
    };
    const res = await supertest(app).post('/api/blogs').send({
      title: '',
      content: '',
    });
    // expect(res.statusCode).toBe(404);
  });
  it('if user have invalid Emaill', async () => {
    const payload: {
      email: string;
      password: string;
    } = {
      email: 'elyse@gmail.com',
      password: '12345',
    };
    const res = await supertest(app)
      .post('/api/blogs')
      .send({
        title: '',
        content: ''
        })
      .set('email', payload.email)
      .set('password', payload.password);
    expect(res.statusCode).toBe(401);
  });
  it('if user unauthorized', async () => {
    const payload: {
      email: string;
      password: string;
    } = {
      email: 'john@yahoo.fr',
      password: '123456',
    };
    const res = await supertest(app)
      .post('/api/blogs')
      .send({
        title: '',
        content: ''
      })

      
  });
});