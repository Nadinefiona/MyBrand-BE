import { test, it, describe, expect, beforeAll, afterAll } from "@jest/globals";
import mongoose from "mongoose";
import supertest from "supertest";
import app from '../src/index';



describe('BlogController', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://fiona:TYSBVbCSm3URPuqU@cluster0.6zhup.mongodb.net/MY_DB');
  },40000);
  
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should get all blogs', async () => {
    const response = await supertest(app).get('/api/blogs');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Blogs Fetched Successfully');
  }, 20000);

  it('should create a new blog', async () => {
    const newBlog = {
      title: 'Test Blog',
      content: 'This is a test blog.',
      image: ''
    };

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hZGlueXllQGdtYWlsLmNvbSIsImlhdCI6MTcwOTE5NzQ3N30.9Vgwqrt_Z4fBB3nx5EtDUHEJNMlfMFSEjD-UF1n-QDw'; // Replace with an actual authentication token

    const response = await supertest(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Blog Created Successfully');
});

it("Without title field", async() => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hZGlueXllQGdtYWlsLmNvbSIsImlhdCI6MTcwOTE5NzQ3N30.9Vgwqrt_Z4fBB3nx5EtDUHEJNMlfMFSEjD-UF1n-QDw';
  const res = await supertest(app)
  .post('/api/blogs')
  .send({
    content: 'Contents',
    image: ' '
  }).set('Authorization' , `Bear ${token}`);
expect(res.status).toBe(400);
});


it("Without content field", async() => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hZGlueXllQGdtYWlsLmNvbSIsImlhdCI6MTcwOTE5NzQ3N30.9Vgwqrt_Z4fBB3nx5EtDUHEJNMlfMFSEjD-UF1n-QDw';
  const res = await supertest(app)
  .post('/api/blogs')
  .send({
    title: 'Title of blog',
    image: ' '
  }).set('Authorization' , `Bear ${token}`);
expect(res.status).toBe(400);
});

it("Without Image field", async() => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hZGlueXllQGdtYWlsLmNvbSIsImlhdCI6MTcwOTE5NzQ3N30.9Vgwqrt_Z4fBB3nx5EtDUHEJNMlfMFSEjD-UF1n-QDw';
  const res = await supertest(app)
  .post('/api/blogs')
  .send({
    title: 'title',
    content: 'Contents',
  }).set('Authorization' , `Bear ${token}`);
expect(res.status).toBe(400);
});

  it('should get a blog by ID', async () => {
    const blogId = '65df0a3bc7a2c910337f71a6'; 
    const response = await supertest(app).get(`/api/blogs/${blogId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title');
    // expect(response.body.title).toBe('Test Blog');
  });

  it('should update a blog', async () => {
    const blogId = '65df0a3bc7a2c910337f71a6'; 
    const updatedBlog = {
      title: 'Updated Blog',
      content: 'This is an updated test blog.',
    };

    const response = await supertest(app)
      .patch(`/api/blogs/${blogId}`)
      .send(updatedBlog);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Blog Updated Successfully');
  });


});

describe('CommentController', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://fiona:TYSBVbCSm3URPuqU@cluster0.6zhup.mongodb.net/MY_DB');
  },40000);
  
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should post a new comment', async () => {
    const newComment = {
      name: 'Test User',
      email: 'test@example.com',
      comment: 'This is a test comment.',
    };

    const response = await supertest(app)
      .post('/api/blogs/:65df0a3bc7a2c910337f71a6/comments')
      .send(newComment);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Comment Posted Successfully');
  });
  it('should like a blog', async () => {
    const blogId = '65df0a3bc7a2c910337f71a6'; 
    const response = await supertest(app)
      .post(`/api/blogs/${blogId}/like`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Blog liked successfully');
  });

  it('should get all comments for a blog', async () => {
    const blogId = '65df0a3bc7a2c910337f71a6'; 
    const response = await supertest(app).get(`/api/blogs/${blogId}/comments`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('comments');
  });


});

describe('LikeController', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://fiona:TYSBVbCSm3URPuqU@cluster0.6zhup.mongodb.net/MY_DB');
  },40000);
  
  afterAll(async () => {
    await mongoose.connection.close();
  });




  it('should delete like for a blog', async () => {
    const blogId = '65df0a3bc7a2c910337f71a6'; 
    const response = await supertest(app)
      .delete(`/api/blogs/${blogId}/unlike`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('like removed successfully');
  });

  it('should get all likes for a blog', async () => {
    const blogId = '65df0a3bc7a2c910337f71a6';
    const response = await supertest(app)
      .get(`/api/blogs/${blogId}/likes`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('likeCount');
  });
  it('should get all likes for a blog', async () => {
    const blogId = '65df0a3bc7a2c910337f71a6';
    const response = await supertest(app)
      .get(`/api/blogs/${blogId}/likes`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('likeCount');
  });
});

describe('MessageController', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://fiona:TYSBVbCSm3URPuqU@cluster0.6zhup.mongodb.net/MY_DB');
  },40000);
  
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new message', async () => {
    const newMessage = {
      name: 'Test User',
      email: 'test@example.com',
      text: 'This is a test message.',
    };

    const response = await supertest(app)
      .post('/api/messages')
      .send(newMessage);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Message Created Successfully');
  });

  it('should get a message by ID', async () => {
    const messageId = '1'; 
    const response = await supertest(app).get(`/api/messages/${messageId}`);
    // expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    // expect(response.body.name).toBe('Test User');
  });


  it('should delete a message', async () => {
    const messageId = '1';
    const response = await supertest(app).delete(`/api/messages/${messageId}`);
    expect(response.status).toBe(204);
  });
});


describe('AuthController', () => {
 it('should sign up a new user', async () => {
    const res = await supertest(app)
      .post('/api/signup')
      .send({
        "fullName": "Nadine Fiona h ",
        "email":"nadine77@gmail.com",
        "password":"nadine99fiona"
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'User created successfully');
 });

 it('should not sign up a user with an existing email', async () => {
    await supertest(app)
      .post('/api/signup')
      .send({
        "fullName": "Nadine Fiona h ",
        "email":"nadine77@gmail.com",
        "password":"nadine99fiona"
      });

    const res = await supertest(app)
      .post('/api/signup')
      .send({
        "fullName": "Nadine Fiona h ",
        "email":"nadine77@gmail.com",
        "password":"nadine99fiona"
      });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message', 'User already exists');
 });

 it('should sign in an existing user', async () => {
  await supertest(app)
    .post('/api/signup')
    .send({
      "fullName": "Nadinegg ",
      "email":"nadinyye@gmail.com",
      "password":"nadinehfiona"
    });

  const res = await supertest(app)
    .post('/api/signin')
    .send({
      "email":"nadinyye@gmail.com",
      "password":"nadinehfiona"
    });

  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('token');
}, 5000); 


 it('should not sign in a user with invalid credentials', async () => {
  console.log('Starting test...');
  const startTime = Date.now();

  const res = await supertest(app)
    .post('/api/signin')
    .send({
      email: 'test@example.com',
      password: 'wrongpassword',
    });

  console.log(`Test took ${Date.now() - startTime} ms`);

  expect(res.status).toBe(500);
  expect(res.body).toHaveProperty('message', 'Internal server error');
}, 20000);

});
