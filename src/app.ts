import express from 'express';
import Router from './config/routes';
import { Question } from './model/question';

const app = express();
const port = 8080 || process.env.PORT;

app.use(Router);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
