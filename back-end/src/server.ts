import express, {Request, Response} from 'express';
import v1Router from './routes/v1router';
const app = express();
const PORT = 3000;
app.use(express.json());
app.use('/api', v1Router);

// Rota de teste

app.get('/', (req:Request, res:Response) => {
  res.json({ status: 'ok rodando', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[server]: Servidor rodando em http://localhost:${PORT}`);
});