import supertest from 'supertest';
import app from '../src/index';
import mongoose from 'mongoose';




describe('BlogController', () => {
  beforeAll(async () => {
    // await mongoose.connect(process.env.MONGODB_TEST_URI as string, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // await clearDatabase();
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
      // Include other necessary fields
    };

    const token = 'your_auth_token_here'; // Replace with an actual authentication token

    // Include the token in the request header
    const response = await supertest(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Blog Created Successfully');
});


  it('should get a blog by ID', async () => {
    const blogId = '65df0a3bc7a2c910337f71a6'; // Replace with an actual blog ID
    const response = await supertest(app).get(`/api/blogs/${blogId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title');
    // expect(response.body.title).toBe('Test Blog');
  });

  it('should update a blog', async () => {
    const blogId = '65df0a3bc7a2c910337f71a6'; // Replace with an actual blog ID
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
    // await mongoose.connect(process.env.MONGODB_TEST_URI as string, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // await clearDatabase();
  });

  it('should post a new comment', async () => {
    const newComment = {
      name: 'Test User',
      email: 'test@example.com',
      comment: 'This is a test comment.',
    };

    const response = await supertest(app)
      .post('/api/blogs/:65dc81763be23013461f0b6e/comments') // Replace :id with an actual blog ID
      .send(newComment);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Comment Posted Successfully');
  });

  it('should post a new comment', async () => {
    const newComment = {
      name: 'TesUser',
      email: 'tes@example.com',
      comment: 'test comment.',
    };

    const response = await supertest(app)
      .post('/api/blogs/:65dc81763be23013461f0b6e/comments') // Replace :id with an actual blog ID
      .send(newComment);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Comment Posted Successfully');
  });

  it('should get all comments for a blog', async () => {
    const blogId = '65dc81763be23013461f0b6e'; // Replace with an actual blog ID
    const response = await supertest(app).get(`/api/blogs/${blogId}/comments`);
    // expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('comments');
  });


});

describe('LikeController', () => {
  beforeAll(async () => {
    // await mongoose.connect(process.env.MONGODB_TEST_URI as string, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // await clearDatabase();
  });

  it('should like a blog', async () => {
    const blogId = '65dc81763be23013461f0b6e'; // Replace with an actual blog ID
    const response = await supertest(app)
      .post(`/api/blogs/${blogId}/like`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Blog liked successfully');
  });

  it('should delete like for a blog', async () => {
    const blogId = '65dc81763be23013461f0b6e'; // Replace with an actual blog ID
    const response = await supertest(app)
      .delete(`/api/blogs/${blogId}/unlike`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('like removed successfully');
  });

  it('should get all likes for a blog', async () => {
    const blogId = '65dc81763be23013461f0b6e'; // Replace with an actual blog ID
    const response = await supertest(app)
      .get(`/api/blogs/${blogId}/likes`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('likeCount');
  });
  it('should get all likes for a blog', async () => {
    const blogId = '65dc81763be23013461f0b6e'; // Replace with an actual blog ID
    const response = await supertest(app)
      .get(`/api/blogs/${blogId}/likes`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('likeCount');
  });
});

describe('MessageController', () => {
  beforeAll(async () => {
    // await mongoose.connect(process.env.MONGODB_TEST_URI as string, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // await clearDatabase();
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
    const messageId = '1'; // Replace with an actual message ID
    const response = await supertest(app).get(`/api/messages/${messageId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toBe('Test User');
  });

  it('should update a message', async () => {
    const messageId = '1'; // Replace with an actual message ID
    const updatedMessage = {
      text: 'This is an updated test message.',
    };

    const response = await supertest(app)
      .patch(`/api/messages/${messageId}`)
      .send(updatedMessage);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Message Updated Successfully');
  });

  it('should delete a message', async () => {
    const messageId = '1'; // Replace with an actual message ID
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
 },3000);

 it('should sign in an existing user', async () => {
  await supertest(app)
    .post('/api/signup')
    .send({
      "fullName": "Nadine Fiona h ",
      "email":"nadine77@gmail.com",
      "password":"nadine99fiona"
    });

  const res = await supertest(app)
    .post('/api/signin') // Adjusted path
    .send({
      "email":"nadine77@gmail.com",
      "password":"nadine99fiona"
    });

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('token');
}, 30000); // Increase the timeout to 20 seconds


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
}, 20000); // Increase the timeout to 20 seconds

});
