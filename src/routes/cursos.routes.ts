import { Router } from 'express';
import prisma from '../databases/prismaClient';

const cursosRoutes = Router();

// 1. POST /cursos - Cadastra um curso
cursosRoutes.post('/', async (req, res) => {
  try {
    const { titulo, descricao, instrutor_id } = req.body;

    if (!titulo || !descricao || !instrutor_id) {
      return res.status(400).json({ erro: 'Título, descrição e instrutor_id são obrigatórios.' });
    }

    // Verifica se o instrutor informado existe no banco
    const instrutorExiste = await prisma.instrutor.findUnique({
      where: { id: Number(instrutor_id) },
    });

    if (!instrutorExiste) {
      return res.status(404).json({ erro: 'Instrutor informado não existe.' });
    }

    const curso = await prisma.curso.create({
      data: {
        titulo,
        descricao,
        instrutor_id: Number(instrutor_id),
      },
    });

    return res.status(201).json(curso);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao cadastrar curso.' });
  }
});

// 2. GET /cursos - Lista todos os cursos (com dados do instrutor)
cursosRoutes.get('/', async (req, res) => {
  try {
    const cursos = await prisma.curso.findMany({
      include: { instrutor: true }, // Traz as informações do instrutor ligado ao curso
    });
    return res.json(cursos);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao buscar cursos.' });
  }
});

// 3. GET /cursos/:id - Busca um curso pelo ID
cursosRoutes.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const curso = await prisma.curso.findUnique({
      where: { id: Number(id) },
      include: { instrutor: true },
    });

    if (!curso) {
      return res.status(404).json({ erro: 'Curso não encontrado.' });
    }

    return res.json(curso);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao buscar curso.' });
  }
});

// 4. PUT /cursos/:id - Atualiza um curso
cursosRoutes.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, instrutor_id } = req.body;

    const curso = await prisma.curso.update({
      where: { id: Number(id) },
      data: {
        titulo,
        descricao,
        instrutor_id: instrutor_id ? Number(instrutor_id) : undefined,
      },
    });

    return res.json(curso);
  } catch (error) {
    return res.status(400).json({ erro: 'Não foi possível atualizar o curso.' });
  }
});

// 5. DELETE /cursos/:id - Remove um curso
cursosRoutes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.curso.delete({
      where: { id: Number(id) },
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ erro: 'Não foi possível remover o curso.' });
  }
});

export default cursosRoutes;