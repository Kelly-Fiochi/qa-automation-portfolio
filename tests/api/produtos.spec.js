import { test, expect } from '@playwright/test';
import { gerarUsuario } from '../../utils/userFactory.js';

async function criarUsuarioELogar(request, { administrador }) {
  const usuario = gerarUsuario({ administrador });
  const criado = await (await request.post('/usuarios', { data: usuario })).json();
  const login = await (
    await request.post('/login', {
      data: { email: usuario.email, password: usuario.password },
    })
  ).json();
  return { id: criado._id, token: login.authorization };
}

function gerarProduto() {
  return {
    nome: `Produto QA ${Date.now()}${Math.floor(Math.random() * 1000)}`,
    preco: 100,
    descricao: 'Produto criado por teste automatizado',
    quantidade: 10,
  };
}

test.describe('API - Produtos', () => {
  let admin;

  test.beforeEach(async ({ request }) => {
    admin = await criarUsuarioELogar(request, { administrador: true });
  });

  test.afterEach(async ({ request }) => {
    await request.delete(`/usuarios/${admin.id}`);
  });

  test('admin cadastra produto (201)', async ({ request }) => {
    const response = await request.post('/produtos', {
      data: gerarProduto(),
      headers: { Authorization: admin.token },
    });
    const body = await response.json();

    expect(response.status()).toBe(201);
    expect(body.message).toBe('Cadastro realizado com sucesso');
    expect(body._id).toBeTruthy();

    await request.delete(`/produtos/${body._id}`, {
      headers: { Authorization: admin.token },
    });
  });

  test('cadastro sem token é negado (401)', async ({ request }) => {
    const response = await request.post('/produtos', { data: gerarProduto() });

    expect(response.status()).toBe(401);
  });

  test('não permite produto com nome duplicado (400)', async ({ request }) => {
    const produto = gerarProduto();
    const headers = { Authorization: admin.token };

    const primeiro = await (await request.post('/produtos', { data: produto, headers })).json();
    const response = await request.post('/produtos', { data: produto, headers });

    expect(response.status()).toBe(400);

    await request.delete(`/produtos/${primeiro._id}`, { headers });
  });

  test('usuário comum não cadastra produto (403)', async ({ request }) => {
    const comum = await criarUsuarioELogar(request, { administrador: false });

    const response = await request.post('/produtos', {
      data: gerarProduto(),
      headers: { Authorization: comum.token },
    });

    expect(response.status()).toBe(403);

    await request.delete(`/usuarios/${comum.id}`);
  });
});