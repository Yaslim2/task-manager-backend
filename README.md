# Task Manager Backend

Este é o backend de uma aplicação de gestão de tarefas construída com NestJS, TypeORM e PostgreSQL. O backend fornece autenticação via JWT, operações CRUD para tarefas e proteções de rota baseadas em autenticação.

## Tecnologias Utilizadas

- **NestJS** - Framework para a criação de APIs REST escaláveis
- **TypeORM** - ORM para mapeamento de entidades com PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **Docker** - Gerenciamento de contêineres para o banco de dados
- **JWT** - Autenticação baseada em tokens JSON Web Tokens
- **Redis** - Cache de dados para otimizar listagens de tarefas

## Funcionalidades

- **Autenticação JWT**: Registro e login de usuários com geração de token JWT para autenticação.
- **Gerenciamento de Tarefas**: Criação, edição, exclusão e listagem de tarefas. Cada tarefa tem título, descrição, status (pendente, em andamento, concluída) e data de criação.
- **Filtragem e Busca**: Filtragem por status e busca por título das tarefas.
- **Cache com Redis**: Cache de listagens de tarefas, atualizado sempre que há mudanças, para melhorar o desempenho.
- **Paginação**: As listagens de tarefas são paginadas, e a API retorna dados de paginação.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) para o banco de dados e Redis
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Configuração do Projeto

1.  **Clone o Repositório**

    Execute o seguinte comando para clonar o repositório:

    ```bash
    git clone https://github.com/seu-usuario/task-manager-backend.git
    ```

    Em seguida, acesse o diretório do projeto:

    ```bash
    cd task-manager-backend
    ```

2.  **Instale as Dependências**

    Execute o seguinte comando para instalar todas as dependências necessárias:

    ```bash
    npm install ou yarn
    ```

3.  **Configuração de Variáveis de Ambiente**

    Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

    ```bash
    DB_HOST= Host do banco de dados.
    DB_PORT= Porta do PostgreSQL (padrão 5432).
    DB_USER= Usuário do banco de dados.
    DB_PASSWORD= Senha do banco de dados.
    DB_NAME= Nome do banco de dados.
    REDIS_HOST= Host do Redis.
    REDIS_PORT= Porta do Redis.
    ```

4.  **Configuração do Docker Compose**

    O arquivo `docker-compose.yml` inclui os serviços do PostgreSQL e Redis necessários para o backend. Caso deseje personalizar, edite as variáveis conforme necessário.

## Executando o Projeto

1. **Suba o Banco de Dados e o Cache com Docker Compose**

   Execute o seguinte comando para iniciar os contêineres do PostgreSQL e Redis:

   ```bash
   docker-compose up -d
   ```

2. **Execute a Aplicação NestJS**

   Com os serviços em execução, inicie o servidor backend com o comando:

   ```bash
   npm run start:dev
   ```

   A API estará disponível em `http://localhost:3000`.

## Estrutura de Pastas

A estrutura do projeto segue uma organização modular:

- **`src/`**: Root do projeto
- **`/modules/auth/`**: Módulo de autenticação com registro e login de usuários.
- **`/modules/users/`**: Módulo de usuários, com entidade e lógica associada.
- **`/modules/tasks/`**: Módulo de tarefas, incluindo controlador e serviço para gerenciamento de tarefas.
- **`app.module.ts`**: Módulo principal que importa todos os módulos necessários.
- **`entities/`**: Contém as entidades da aplicação, que representam as tabelas no banco de dados.

<!-- ## Endpoints Disponíveis

### Usuário

- **`POST /auth/register`**: Registra um novo usuário. Requer um corpo JSON com `email`, `name` e `password`.
- **`POST /auth/login`**: Realiza login e retorna um token JWT. Requer um corpo JSON com `email` e `password`.

### Tarefas

- **`GET /tasks`**: Retorna as tarefas do usuário autenticado com suporte a filtros (status) e paginação.
- **`POST /tasks`**: Cria uma nova tarefa. Requer um corpo JSON com `title`, `description`, e `status`.
- **`PATCH /tasks/:id`**: Atualiza uma tarefa existente. Requer um corpo JSON com `title`, `description`, e `status`.
- **`DELETE /tasks/:id`**: Exclui uma tarefa.

## Testando a API

Use uma ferramenta como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para testar os endpoints. Para acessar as rotas protegidas, você precisa incluir o token JWT no cabeçalho da requisição como `Authorization: Bearer <seu-token>`.

## Comandos Docker Compose

- **Subir os Serviços**: Para iniciar o banco de dados PostgreSQL e o Redis, use:

`docker-compose up -d`

- **Parar e Remover os Contêineres**: Para parar os contêineres e remover as instâncias, use:

`docker-compose down`

- **Verificar Logs**: Para visualizar os logs do PostgreSQL, use:

`docker-compose logs -f db`

## Contribuição

Contribuições são bem-vindas! Caso tenha sugestões, correções ou melhorias, abra uma _issue_ ou envie um _pull request_.

## Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

```

```

```

``` -->
