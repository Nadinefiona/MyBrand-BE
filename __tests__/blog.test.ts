import { test, it, describe, expect, beforeAll, afterAll } from "@jest/globals";
import mongoose from "mongoose";
import supertest from "supertest";
import app   from '../src/index';
import fs from'fs'
import path from 'path'
import FormData from "form-data";


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

  it("should create a new blog", async () => {
    const imagePath = path.resolve(__dirname, "assets", "js.png");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hZGlueXllQGdtYWlsLmNvbSIsImlhdCI6MTcwOTE5NzQ3N30.9Vgwqrt_Z4fBB3nx5EtDUHEJNMlfMFSEjD-UF1n-QDw"; 

    const formData = new FormData();
    formData.append("title", "Test Blog");
    formData.append("content", "This is a test blog.");
    formData.append("image", fs.createReadStream(imagePath))
    

    const response = await supertest(app)
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .field("title", "Test Blog")
      .field("content", "This is a test blog.")
      .attach("image", imagePath, { contentType: "multipart/form-data" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Blog Created Successfully");
  });

it("Without title field", async() => {
  const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hZGlueXllQGdtYWlsLmNvbSIsImlhdCI6MTcwOTE5NzQ3N30.9Vgwqrt_Z4fBB3nx5EtDUHEJNMlfMFSEjD-UF1n-QDw"; // Replace with an actual authentication token
  const res = await supertest(app)
  .post('/api/blogs')
  .set("Authorization", `Bearer ${token}`)
  .send({
    content: 'Contents',
    image: ' '
  })
expect(res.status).toBe(400);
});

it("Without content field", async() => {
  const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hZGluZTEyM0BnbWFpbC5jb20iLCJpYXQiOjE3MDkyMzY2MTB9.5O5mMOmKONhYF9FRsV0VEiWxON6wMAMZ3thWgaJbr1Y";
  const res = await supertest(app)
  .post('/api/blogs')
  .set("Authorization", `Bearer ${token}`)
  .send({
    title: 'Title of blog',
    image: ' '
  })
expect(res.status).toBe(400);
});

it("Without Image field", async() => {
  const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hZGlueXllQGdtYWlsLmNvbSIsImlhdCI6MTcwOTE5NzQ3N30.9Vgwqrt_Z4fBB3nx5EtDUHEJNMlfMFSEjD-UF1n-QDw";
  const res = await supertest(app)
  .post('/api/blogs')
  .set("Authorization", `Bearer ${token}`)
  .send({
    title: 'title',
    content: 'Contents',
  })
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
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hZGlueXllQGdtYWlsLmNvbSIsImlhdCI6MTcwOTE5NzQ3N30.9Vgwqrt_Z4fBB3nx5EtDUHEJNMlfMFSEjD-UF1n-QDw";
    const blogId = '65df0a3bc7a2c910337f71a6'; 
    const updatedBlog = {
      title: 'Updated Blog',
      content: 'This is an updated test blog.',
    };

    const response = await supertest(app)
      .patch(`/api/blogs/${blogId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedBlog);

    expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty('message');
    // expect(response.body.message).toBe('Blog Updated Successfully');
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
      .post('/api/blogs/65df0a3bc7a2c910337f71a6/comments')
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
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hZGlueXllQGdtYWlsLmNvbSIsImlhdCI6MTcwOTE5NzQ3N30.9Vgwqrt_Z4fBB3nx5EtDUHEJNMlfMFSEjD-UF1n-QDw"; 

    const response = await supertest(app)
        .get(`/api/messages/${messageId}`)
        .set("Authorization", `Bearer ${token}`)


    expect(response.status).toBe(200);
});



  it('should delete a message', async () => {
    const messageId = '1';
    const response = await supertest(app).delete(`/api/messages/${messageId}`);
    expect(response.status).toBe(204);
  });
});

 
describe('AuthController', () => {
  
//  it('should sign up a new user', async () => {
//     const res = await supertest(app)
//       .post('/api/signup')
//       .send({
//         "fullName": "Nadine Fiona h ",
//         "email":"nadine00@gmail.com",
//         "password":"nadine99fiona"
//       });

//     expect(res.status).toBe(201);
//     expect(res.body).toHaveProperty('message', 'User created successfully');
//  });
 
it("signup", async () => {
  const newUser = await supertest(app).post('/api/signup').send({
    "fullName": "fiona",
    "email": "",
    "password": "fiona@@123"
  })
  expect(newUser.status).toBe(400);
})
})

//  it('should sign in an existing user', async () => {
//   await supertest(app)
//   const res = await supertest(app)
//     .post('/api/signin')
//     .send({
//       "email":"nadine00@gmail.com",
//       "password":"nadine99fiona"
//     });

//   expect(res.status).toEqual(200);
//   expect(res.body).toHaveProperty('token');
// }); 


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


