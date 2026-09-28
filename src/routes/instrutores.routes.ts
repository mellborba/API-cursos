import { Router } from 'express';
import prisma from '../databases/prismaClient';
const instrutoresRoutes = Router();

// 1. POST /instrutores - Cadastra um instrutor
instrutoresRoutes.post('/', async (req, res) => {
  try {
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ erro: 'Nome e e-mail são obrigatórios.' });
    }

    const instrutor = await prisma.instrutor.create({
      data: { nome, email },
    });

    return res.status(201).json(instrutor);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ erro: 'E-mail já cadastrado.' });
    }
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

// 2. GET /instrutores - Lista todos os instrutores (com os seus cursos)
instrutoresRoutes.get('/', async (req, res) => {
  try {
    const instrutores = await prisma.instrutor.findMany({
      include: { cursos: true }, // Inclui os cursos do instrutor na resposta
    });
    return res.json(instrutores);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao buscar instrutores.' });
  }
});

// 3. GET /instrutores/:id - Busca um instrutor pelo ID
instrutoresRoutes.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const instrutor = await prisma.instrutor.findUnique({
      where: { id: Number(id) },
      include: { cursos: true },
    });

    if (!instrutor) {
      return res.status(404).json({ erro: 'Instrutor não encontrado.' });
    }

    return res.json(instrutor);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao buscar instrutor.' });
  }
});

// 4. PUT /instrutores/:id - Atualiza um instrutor
instrutoresRoutes.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    const instrutor = await prisma.instrutor.update({
      where: { id: Number(id) },
      data: { nome, email },
    });

    return res.json(instrutor);
  } catch (error) {
    return res.status(400).json({ erro: 'Não foi possível atualizar o instrutor.' });
  }
});

// 5. DELETE /instrutores/:id - Remove um instrutor
instrutoresRoutes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.instrutor.delete({
      where: { id: Number(id) },
    });

    return res.status(204).send(); // Status 204 = Sucesso sem conteúdo
  } catch (error) {
    return res.status(400).json({ erro: 'Não foi possível remover o instrutor.' });
  }
});

export default instrutoresRoutes;