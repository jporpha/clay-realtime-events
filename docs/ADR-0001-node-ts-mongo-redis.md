# ADR-0001: Node.js + TypeScript + MongoDB + Redis + React

## Contexto
El desafío solicita un sistema escalable de ingestión de eventos con procesamiento casi real-time y visualización web.  
Se valoran buenas prácticas, pipeline de procesamiento (colas, buffers, workers) y despliegue en la nube.

## Decisión
Usar **Node.js + TypeScript** como base del backend por:
- Gran adopción y ecosistema.
- Facilita compartir tipos con el frontend.
- Integración natural con Redis y Mongo.

Redis se usa como **cola/buffer** (BullMQ) entre la API y el Worker,  
permitiendo desacoplar la ingesta de la persistencia y mejorar la tolerancia a carga.

MongoDB almacena eventos y métricas, con índices por `timestamp` y `eventType`.

React + Vite ofrece una interfaz rápida para visualizar en vivo los datos vía SSE.

## Consecuencias
✅ Alta concurrencia y resiliencia  
✅ Escalabilidad horizontal (API y Worker independientes)  
✅ Stack uniforme JS/TS end-to-end  
⚠️ Requiere Redis y Mongo en producción (infra mínima adicional)

## Alternativas consideradas
- NestJS: descartado por ser framework opinionado; se busca demostrar diseño puro.  
- Kafka: sobrekill para el tamaño del desafío.  
- SQL: menos natural para ingesta time-series.

## Estado
Aceptado ✅
