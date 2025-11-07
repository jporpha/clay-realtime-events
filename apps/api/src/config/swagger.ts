import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../config/swagger-docs';
import { Express } from 'express';

export const setupSwagger = (app: Express) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.get('/openapi.json', (req, res) => res.json(swaggerDocs));
};
