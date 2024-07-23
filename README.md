# TaskNext

Este projeto foi criado como uma ferramenta de aprendizado para desenvolver habilidades em Next.js, MongoDB e JWT.

## Descrição

TaskNext é uma aplicação de gerenciamento de tarefas construída com Next.js, MongoDB, e JWT para autenticação. Este projeto permite aos usuários criar, visualizar e gerenciar suas tarefas de maneira eficiente.

## Funcionalidades

- Cadastro e login de usuários
- Criação de novas tarefas
- Visualização de tarefas existentes
- Redirecionamento automático para criar tarefas quando não houver nenhuma

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)
- [Bootstrap](https://getbootstrap.com/)

## Estrutura do Projeto

- `/components`: Componentes reutilizáveis da aplicação
- `/lib`: Arquivos de configuração e conexão ao banco de dados
- `/models`: Modelos do MongoDB para usuários e tarefas
- `/pages`: Páginas da aplicação, incluindo API routes

## Instalação e Configuração

1. Clone o repositório:

```
  git clone https://github.com/doxz1n/gerenciador-tarefas.git
  cd gerenciador-tarefas
```

2. Instale as dependências:

```
   npm install
```

3. Crie um arquivo .env.local na raiz do projeto e adicione as seguintes variáveis:

```
   MONGODB_URI=Seu link do MongoDB
   JWT_SECRET=Seu JWT Secret
```

4. Inicie o servidor:

```
   npm run dev
```

## Uso

- Registro e Login
  Acesse `/register` para criar uma nova conta.
  Acesse `/login` para entrar com uma conta existente.
- Gerenciamento de Tarefas
  Após o login, você será redirecionado para a página de tarefas `/tarefas`.
  Para criar uma nova tarefa, clique em "Criar uma Nova Tarefa" ou será redirecionado automaticamente se não houver tarefas.

## Contato

- Para mais informações ou para relatar problemas, entre em contato através do GitHub Issues no repositório.
