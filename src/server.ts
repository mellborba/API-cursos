import express from 'express';
import instrutoresRoutes from './routes/instrutores.routes';
import cursosRoutes from './routes/cursos.routes';

const app = express();

// Permite que o Express leia dados em formato JSON no req.body
app.use(express.json());

// Associa as rotas às entidades
app.use('/instrutores', instrutoresRoutes);
app.use('/cursos', cursosRoutes);

app.listen(3000, () => {
  console.log("🚀 Servidor rodando na porta 3000");
});