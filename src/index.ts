import express ,{Express, Request, Response} from 'express';
import CustomResponse  from './utils/response';
import router  from './routes/routes';
import upload from './helper/multer';
import cors from 'cors';
import { swaggerUiMiddleware, swaggerUiSetup } from './swagger';



const app: Express = express();
app.use(cors()) 


app.use('/api-docs', swaggerUiMiddleware, swaggerUiSetup);


app.use(express.json());
app.use(upload.single('image'))
app.use('/api', router);



export default app;