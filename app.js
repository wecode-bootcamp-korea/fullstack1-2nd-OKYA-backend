import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './router';

const app = express();
const logger = morgan('dev');

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(routes);

export default app;
