import { test, expect } from '@playwright/test';
import { gerarUsuario } from '../../utils/userFactory.js';

test.describe('API - Usuários', () => {
  test('cadastra usuário com sucesso (201)', async ({ request }) => {
    const usuario = gerarUsuario();

    const response = await request.post('/usuarios', { data: usuario });
    const body = await response.json();

    expect(response.status()).toBe(201);
    expect(body.message).toBe('Cadastro realizado com sucesso');
    expect(body._id).toBeTruthy();

    await request.delete(`/usuarios/${body._id}`);
  });

  test('não permite e-mail duplicado (400)', async ({ request }) => {
    const usuario = gerarUsuario();
    const criado = await (await request.post('/usuarios', { data: usuario })).json();

    const response = await request.post('/usuarios', { data: usuario });
    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body.message).toBe('Este email já está sendo usado');

    await request.delete(`/usuarios/${criado._id}`);
  });

  test('busca usuário por id (200)', async ({ request }) => {
    const usuario = gerarUsuario();
    const criado = await (await request.post('/usuarios', { data: usuario })).json();

    const response = await request.get(`/usuarios/${criado._id}`);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.nome).toBe(usuario.nome);
    expect(body.email).toBe(usuario.email);
    expect(body._id).toBe(criado._id);

    await request.delete(`/usuarios/${criado._id}`);
  });

  test('busca de usuário inexistente retorna erro (400)', async ({ request }) => {
    // id com 16 caracteres (formato válido), mas que não existe
    const response = await request.get('/usuarios/abcdefghij123456');
    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body.message).toBe('Usuário não encontrado');
  });

  test('busca com id em formato inválido retorna erro de validação (400)', async ({ request }) => {
    const response = await request.get('/usuarios/idinvalido');
    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body.id).toBeTruthy();
  });

  test('exclui usuário (200)', async ({ request }) => {
    const usuario = gerarUsuario();
    const criado = await (await request.post('/usuarios', { data: usuario })).json();

    const response = await request.delete(`/usuarios/${criado._id}`);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.message).toBe('Registro excluído com sucesso');
  });

  test('login válido retorna token (200)', async ({ request }) => {
    const usuario = gerarUsuario();
    const criado = await (await request.post('/usuarios', { data: usuario })).json();

    const response = await request.post('/login', {
      data: { email: usuario.email, password: usuario.password },
    });
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.message).toBe('Login realizado com sucesso');
    expect(body.authorization).toContain('Bearer');

    await request.delete(`/usuarios/${criado._id}`);
  });

  test('login com senha errada é negado (401)', async ({ request }) => {
    const usuario = gerarUsuario();
    const criado = await (await request.post('/usuarios', { data: usuario })).json();

    const response = await request.post('/login', {
      data: { email: usuario.email, password: 'senha_errada' },
    });
    const body = await response.json();

    expect(response.status()).toBe(401);
    expect(body.message).toBe('Email e/ou senha inválidos');

    await request.delete(`/usuarios/${criado._id}`);
  });
});