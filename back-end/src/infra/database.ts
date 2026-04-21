import { Pool } from 'pg';
import 'dotenv/config';

// Configuração do Pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, 
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erro ao conectar no Postgres:', err.stack);
  } else {
    console.log('🐘 Postgres conectado com sucesso em:', res.rows[0].now);
  }
});