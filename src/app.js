import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import authRoutes from './routes/auth.js';
import petRoutes from './routes/pets.js';
import consultaRoutes from './routes/consultas.js';
import procedimentoRoutes from './routes/procedimentos.js';

const swaggerDocument = YAML.load('./resources/swagger.yaml');

const app = express();
app.use(cors());
app.use(express.json());

// Primeiro configurar as rotas do Swagger (sem logging)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Depois configurar morgan apenas para outras rotas
app.use(morgan('dev', {
  skip: function (req, res) {
    // Pular logs das rotas do Swagger
    return req.originalUrl && req.originalUrl.includes('/docs');
  }
}));

app.use('/auth', authRoutes);
app.use('/pets', petRoutes);
app.use('/consultas', consultaRoutes);
app.use('/procedimentos', procedimentoRoutes);

const PORT = process.env.PORT || 3000;

// Só iniciar o servidor se este arquivo for executado diretamente (não importado pelos testes)
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

export default app;
