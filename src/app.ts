import express from 'express';
import Router from './config/routes';
import mongoose from "mongoose";

const app = express();
const port = 8080 || process.env.PORT;

mongoose.connect('mongodb://localhost:27017/qna')
    .then()
    .catch(e => `Error on connecting to MongoDb ${JSON.stringify(e)}`);

app.use(Router);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
