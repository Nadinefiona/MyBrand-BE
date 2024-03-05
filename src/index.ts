import express ,{Express, Request, Response} from 'express';
import CustomResponse  from './utils/response';
import router  from './routes/routes';
import dotenv from 'dotenv';
import upload from './helper/multer';
import cors from 'cors';
import { swaggerUiMiddleware, swaggerUiSetup } from './swagger';


dotenv.config();

import databaseConnection from './config/db';
const app: Express = express();

databaseConnection();

app.use('/api-docs', swaggerUiMiddleware, swaggerUiSetup);



app.use(cors())


app.use(express.json());
app.use(upload.single('image'))
app.use('/api', router);



const port = process.env.PORT || 3000;


const server= app.listen(port, () => {
  console.log(`Server has started and is running on port ${port}`);
});
export const closeServer = () => {
  server.close();
};

export default app;
