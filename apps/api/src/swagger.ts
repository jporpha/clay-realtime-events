import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Clay Realtime Events API',
      version: '1.0.0',
      description: `
      API para ingesta, consulta y monitoreo de eventos en tiempo real.
      Este servicio expone endpoints para enviar eventos, consultar métricas y suscribirse a streams.
      `,
      contact: {
        name: 'Clay Realtime Events',
        url: 'https://github.com/tu-repo',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/openapi.json', (req, res) => res.json(swaggerSpec));
};
