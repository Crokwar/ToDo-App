import 'dotenv/config';
import express from 'express';
import userRouter from './src/routes/user.route.js';
import notesRouter from './src/routes/notes.route.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/users', userRouter);
app.use('/api/v1', notesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>  console.log('listening on port ' + PORT));