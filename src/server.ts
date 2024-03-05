
import express ,{Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import databaseConnection from './config/db';
import app from './index';

dotenv.config();


databaseConnection();


const port = process.env.PORT || 3000;

const server= app.listen(port, () => {
    console.log(`Server has started and is running on port ${port}`);
  });
  export const closeServer = () => {
    server.close();
  }; 


 

