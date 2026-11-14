export function gerarUsuario({ administrador = true } = {}) {
  const id = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return {
    nome: `QA Teste ${id}`,
    email: `qa.${id}@teste.com`,
    password: 'Senha@123',
    administrador: String(administrador),
  };
}