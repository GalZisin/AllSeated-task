import express from 'express';
import cors from 'cors';

import users from './routes/userRoute';

import errorMiddleware from './middlewares/errors';

const app = express();

var corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200, // For legacy browser support
}

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/v1', users);

//Middleware to handle errors
app.use(errorMiddleware);

export default app;