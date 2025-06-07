const sequelize = require('./db/connection');

sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso!');
    process.exit();
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  });