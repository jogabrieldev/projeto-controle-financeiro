import express, {Request, Response} from 'express';
import {pool} from "./infra/database";
import v1Router from './routes/v1router';
const app = express();
const PORT = 3000;
app.use(express.json());
app.use('/api', v1Router);

// testar conexão com o banco tabelas usuario ja esta criada 21/04/2026
// Rota de teste
// app.get('/db-test', async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query('SELECT current_database(), now()');
//     res.json({
//       db: result.rows[0].current_database,
//       time: result.rows[0].now
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Falha ao consultar o banco' });
//   }
// });
app.get('/', (req:Request, res:Response) => {
  res.json({ status: 'ok rodando', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[server]: Servidor rodando em http://localhost:${PORT}`);
});