const swaggerDocs = {
  openapi: '3.0.0',
  info: {
    title: 'Clay Realtime Events API',
    version: '1.0.0',
    description:
      'API para ingesta, consulta y monitoreo de eventos en tiempo real.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
  ],
  tags: [
    { name: 'Eventos', description: 'Operaciones de eventos' },
    { name: 'Métricas', description: 'Consultas agregadas' },
    { name: 'Stream', description: 'Suscripción en tiempo real' },
  ],
  paths: {
    '/events': {
      get: {
        summary: 'Lista los eventos',
        tags: ['Eventos'],
        responses: { 200: { description: 'OK' } },
      },
      post: {
        summary: 'Crea un evento',
        tags: ['Eventos'],
        responses: { 202: { description: 'Evento aceptado' } },
      },
    },
    '/metrics': {
      get: {
        summary: 'Muestra métricas de eventos',
        tags: ['Métricas'],
        responses: { 200: { description: 'OK' } },
      },
    },
    '/stream': {
      get: {
        summary: 'Recibe eventos en tiempo real',
        tags: ['Stream'],
        responses: { 200: { description: 'SSE conectado' } },
      },
    },
  },
};

export default swaggerDocs;
