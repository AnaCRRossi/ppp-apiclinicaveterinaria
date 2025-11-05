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
app.use(morgan('dev'));

app.use('/auth', authRoutes);
app.use('/pets', petRoutes);
app.use('/consultas', consultaRoutes);
app.use('/procedimentos', procedimentoRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

// Sempre iniciar o servidor (os testes usarão supertest que não precisa de servidor rodando)
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
