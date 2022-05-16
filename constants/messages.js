const MESSAGE = {
  TALKER_NOT_FOUND: 'Pessoa palestrante não encontrada',
  INVALID_EMAIL: 'O "email" deve ter o formato "email@email.com"',
  INVALID_PASSWORD: 'O "password" deve ter pelo menos 6 caracteres',
  MANDATORY_TOKEN: 'Token não encontrado',
  INVALID_TOKEN: 'Token inválido',
  MANDATORY_NAME: 'O campo "name" é obrigatório',
  INVALID_NAME: 'O "name" deve ter pelo menos 3 caracteres',
  MANDATORY_AGE: 'O campo "age" é obrigatório',
  INVALID_AGE: 'A pessoa palestrante deve ser maior de idade',
  MANDATORY_TALK:
    'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  INVALID_DATE: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  INVALID_RATE: 'O campo "rate" deve ser um inteiro de 1 à 5',
};

MESSAGE.MANDATORY_LOGIN_FIELD = (email) =>
  `O campo "${email ? 'password' : 'email'}" é obrigatório`;

module.exports = MESSAGE;
