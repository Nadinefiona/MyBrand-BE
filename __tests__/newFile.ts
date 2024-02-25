import { it, describe, expect } from '@jest/globals';
import supertest from 'supertest';
import app from '../src/index';

//testing coverage should be atleast 70 or 80%
// beforeAll(async () => {
//   await mongoose.connect(DB_url);
// }, 50000);
// afterAll(async () => {
//   await mongoose.connection.close();
// });
describe('Testing API', () => {
  it('/api/* for 404', async () => {
    const response = await supertest(app).get('/api/*');
    expect(response.statusCode).toBe(404);
  });
  it('getting All blogs', async () => {
    const response = await supertest(app).get('/api/blogs');
    expect(response.body.message).toContain('Blogs Fetched Successfully');
  });

  const payload: {
    email: string;
    password: string;
  } = {
    email: 'nadinefiona9@gmail.com',
    password: 'nadinefiona@@2468',
  };

  let singleBlog: any;

  it('posting A blog', async () => {
    const res = await supertest(app)
      .post('/api/blogs')
      .send({
        title: 'intergation',
        content: 'Testing'
      })
      .set('email', payload.email)
      .set('password', payload.password);
    singleBlog = res.body.data;
    // expect(res.body.message).toContain('Blog Created Successfully');
  });

  it('Getting single blog or fetch', async () => {
    const response = await supertest(app).get(`/api/blogs/${singleBlog.id}`);
    expect(response.statusCode).toBe(200);
  });

  it('getting Blog Comments', async () => {
    const response = await supertest(app)
      .get(`/api/blogs/${singleBlog.id}/comments`);
    // .set('email', payload.email)
    // .set('password', payload.password);
    expect(response.statusCode).toBe(200);
  });
});
