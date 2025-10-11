import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import contactsRoutes from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const app = express();

const PORT = Number(getEnvVar('PORT', '3000'));

export default function setupServer() {
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use('/contacts', contactsRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Server is running on port ${PORT}`);
  });
}
