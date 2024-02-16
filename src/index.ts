import express ,{Express, Request, Response} from 'express';
import CustomResponse from './utils/response';
import router from './routes/routes.js';
import dotenv from 'dotenv';


dotenv.config();

import databaseConnection from './config/db';
const app: Express = express();

databaseConnection();

app.use(express.json());
app.use('/api', router);

app.get('/api/*', (req: Request, res: Response) => {
  const response = new CustomResponse(req, res);
  response.send(null, 'API Not Found', 404);
});


const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`Server has started and is running on port ${port}`);
});

export default app;
