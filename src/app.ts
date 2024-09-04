import express from 'express';
import Router from './config/routes';
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const port = 8080 || process.env.PORT;

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
    credentials: true // Allow cookies to be sent with requests (optional)
};

mongoose.connect('mongodb://localhost:27017/qna')
    .then()
    .catch(e => `Error on connecting to MongoDb ${JSON.stringify(e)}`);

app.use(express.json());
app.use(cors(corsOptions));
app.use(Router);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
