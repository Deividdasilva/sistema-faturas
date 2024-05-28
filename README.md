
# # sistema-faturas
Este projeto consiste em uma API backend desenvolvida em Node.js, e um frontend em React. Utiliza PostgreSQL como sistema de banco de dados, com Docker e Docker Compose para simplificar a configuração e a execução do ambiente de desenvolvimento.

## Requisitos

- Docker
- Docker Compose

## Configuração do Ambiente

### Clonando o Repositório

```bash
git clone https://github.com/Deividdasilva/sistema-faturas.git
cd sistema-faturas/docker
```

### Iniciando os Containers

Utilize o Docker Compose para iniciar os containers:

```bash
docker-compose up -d
```

### Acessando a Aplicação

- **API Backend**: [http://localhost:3000](http://localhost:3000)
- **Frontend**: [http://localhost:3001](http://localhost:3001)

## Estrutura do Projeto

- `sistemas-faturas/api`: Código-fonte da API backend Node.js.
- `sistemas-faturas/front`: Código-fonte do frontend React.
- `sistemas-faturas/docker`: Arquivos de configuração para Docker e Docker Compose.