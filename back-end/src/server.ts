import express from 'express';
const app = express();
const PORT = 3000;
app.use(express.json());

// Rota de teste

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[server]: Servidor rodando em http://localhost:${PORT}`);
});