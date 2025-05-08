//app.js
import createError from 'http-errors';
import express from 'express';
import path, {dirname} from 'node:path'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { fileURLToPath } from 'node:url';
import winstonLogger from './utils/logger.js'
import 'dotenv/config'

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import shortenRouter from './routes/shorten.js';
import redirectRouter from './routes/redirect.js'
import myUrlsRouter from './routes/myUrls.js'

const app = express();


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const morganFormat = process.env.NODE_ENV === "production" ? "dev" : 'combined'
app.use(morgan(morganFormat, { stream: winstonLogger.stream }));

// view engine setup
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/shorten', shortenRouter);
app.use('/redirect', redirectRouter)
app.use('/myUrls', myUrlsRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Centralized error handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Log the error (optional: use winston)
  console.error(`[ERROR] ${statusCode} - ${message}`);

  res.status(statusCode).json({
    error: message
  });
});


export default app
