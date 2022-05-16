const MESSAGE = {
  TALKER_NOT_FOUND: 'Pessoa palestrante não encontrada',
  INVALID_EMAIL: 'O "email" deve ter o formato "email@email.com"',
  INVALID_PASSWORD: 'O "password" deve ter pelo menos 6 caracteres',
};

MESSAGE.MANDATORY_LOGIN_FIELD = (email) =>
  `O campo "${email ? 'password' : 'email'}" é obrigatório`;

module.exports = MESSAGE;
