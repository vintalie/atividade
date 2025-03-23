# Projeto pra aula do Rafael

Opa pessoal! desenvolvi essa estrutura para nós darmos continuidade a aula do Rafael, segue aqui como:
 instalar e iniciar a aplicação,
 como criar uma pagina, 
 como rotear a pagina criada
 aonde colocar os arquivos de estilos e imagens
 banco de dados (em breve)

# Como instalar a aplicação
A aplicação utiliza nodejs, e npm (certifique-se de ter baixado no site oficial do node), e usa os pacotes [Express](https://expressjs.com/), [Sequelize](https://sequelize.org/), [EJS](https://ejs.co/), entre outros

 ## Instalando
 Para instalar primeiro baixe o projeto utilizando o comando ```git clone https://github.com/vintalie/atividade/``` , após isso acesse a pagina do projeto com ```cd atividade```, em seguida execute ```npm install``` para instalar todas as dependencias, e por fim execute:``ǹpm run start```

# Como criar uma Pagina
Para isso precisamos criar um controlador que exporta as funções que usamos no arquivo "routes.js ".
Dentro da pasta "controllers", vamos criar uma pasta com: "o nome da pagina" seguido de "Controller" (com a primeira letra maiuscula), da seguinte forma: musicaController
Dentro desse arquivo precisamos exportar um objeto contendo uma função definida da seguinte foma:
``m̀odule.exports = {
    get:function(req,res) {
        req.render('musica')
    }
}```
por fim, agora precisamos criar o frontend da musica, fazemos isso criando uma arquivo ejs na pasta "views", com o nome "musica.ejs", podemos definir tags html e usar as funções do ejs utilizando a syntax do JS entre <%- %>
Exemplo para incluir o arquivo header.ejs dentro da pasta "parts":```<%- include('parts/header') %>```

# Roteando a pagina
Por fim, precisamos colocar essa pagina no ar, propriamente dito ,roteando ela.
para isso precisamos acesasr o arquvo routes.js na raiz do projeto, requerir o arquivo musicaController/index.js, e definir uma routa que irá executar a função que definimos lá no controlador, da seguinte forma:
```
const musicaController = require('./controllers/musicaController')
...
router.get('/musica', musicaController.get)
```

# Estilizando a pagina
Para fazermos isso é muito simples, basta adicionar os arquivos na pata assets, e acessa-los definindo o caminho a partir da pasta assets, exemplo ```<link rel="stylesheet" href="css/style.css">```


## Fontes

- [Sequelize](https://sequelize.org/)
- [Express](https://expressjs.com/)
- [EJS](https://ejs.co/)