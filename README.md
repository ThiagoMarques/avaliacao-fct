# Avaliação FCT - Angular

Sistema de avaliação desenvolvido com Angular para gestão de avaliações FCT (Gratificação de Função Comissionada Técnica) - SERPRO.

## Sobre

Aplicação web desenvolvida em Angular para gerenciamento de avaliações, colaboradores, projetos e atributos relacionados ao sistema FCT.

## Funcionalidades

- Gestão de colaboradores
- Sistema de avaliações
- Atributos e pesos
- Relatórios e consultas
- Gestão de projetos
- Distribuição e abrangência
- Sistema de segurança e autenticação

## Como Começar

### Pré-requisitos

- Node.js (versão 14+ recomendada)
- npm ou yarn
- Angular CLI instalado globalmente
- json-server (para backend mock)

### Clonando o Repositório

```bash
git clone https://github.com/ThiagoMarques/avaliacao-fct.git
cd avaliacao-fct
```

### Instalando as Dependências

```bash
npm install
```

### Instalando o Angular CLI

```bash
npm install -g @angular/cli
```

### Instalando o json-server

```bash
npm install -g json-server
```

## Comandos Principais

### Inicializando o Servidor

```bash
ng serve
# ou
npm start
```

A aplicação estará disponível em `http://localhost:4200`

### Iniciando o Backend (json-server)

Na raiz da aplicação, execute:

```bash
json-server --watch db.json
```

O backend mock estará disponível em `http://localhost:3000`

### Atualizando o Repositório

```bash
# Baixar a versão mais atual
git pull origin master
# ou simplesmente
git pull
```

### Atualizar os Arquivos no Git

```bash
git add .
git commit -m "sua mensagem aqui"
git push
```

### Parar os Serviços

Pressione `Ctrl+C` no terminal

## Estrutura do Projeto

```
avaliacao-fct/
├── src/
│   ├── app/
│   │   ├── colaborador/      # Módulo de colaboradores
│   │   ├── avaliacao/        # Módulo de avaliações
│   │   ├── projeto/          # Módulo de projetos
│   │   ├── atributo/         # Módulo de atributos
│   │   ├── consultaavaliacao/ # Consultas de avaliação
│   │   ├── relatorios/       # Relatórios
│   │   ├── security/         # Segurança e autenticação
│   │   └── shared/           # Componentes compartilhados
│   ├── assets/               # Recursos estáticos
│   └── environments/         # Configurações de ambiente
├── backend/                  # Backend e chaves
├── sql dados/               # Scripts SQL e modelos
├── db.json                  # Dados mock para json-server
└── package.json
```

## Tecnologias Utilizadas

- **Angular 4.3**: Framework principal
- **TypeScript**: Linguagem de programação
- **json-server**: Backend mock para desenvolvimento
- **AdminLTE**: Template administrativo
- **Bootstrap**: Framework CSS
- **Font Awesome**: Ícones
- **RxJS**: Programação reativa

## Expressões Regulares

Expressões regulares usadas na validação de formulários:

### Email Regex

```javascript
/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
```

### Number Regex

```javascript
/^[0-9]*$/
```

## Upgrade para Angular 4.3

### Dependências do package.json

```json
{
  "dependencies": {
    "@angular/animations": "4.3.3",
    "@angular/common": "4.3.3",
    "@angular/compiler": "4.3.3",
    "@angular/core": "4.3.3",
    "@angular/forms": "4.3.3",
    "@angular/platform-browser": "4.3.3",
    "@angular/platform-browser-dynamic": "4.3.3",
    "@angular/router": "4.3.3",
    "admin-lte": "2.3.11",
    "core-js": "2.4.1",
    "font-awesome": "4.7.0",
    "intl": "1.2.5",
    "jquery": "3.1.1",
    "reflect-metadata": "0.1.10",
    "rxjs": "5.4.2",
    "ts-helpers": "1.1.2",
    "web-animations-js": "2.2.5",
    "zone.js": "0.8.16"
  },
  "devDependencies": {
    "@angular/cli": "1.2.7",
    "@angular/compiler-cli": "4.3.3",
    "@types/jasmine": "2.5.53",
    "@types/express": "4.0.37",
    "@types/jsonwebtoken": "7.2.3",
    "@types/node": "7.0.5",
    "codelyzer": "3.1.2",
    "jasmine-core": "2.7.0",
    "jasmine-spec-reporter": "4.1.1",
    "json-server": "0.12.0",
    "jsonwebtoken": "7.4.1",
    "karma": "1.7.0",
    "karma-chrome-launcher": "2.2.0",
    "karma-cli": "1.0.1",
    "karma-jasmine": "1.1.0",
    "karma-remap-istanbul": "0.6.0",
    "protractor": "5.1.2",
    "ts-node": "3.3.0",
    "tslint": "5.5.0",
    "typescript": "2.4.2",
    "webdriver-manager": "12.0.6"
  }
}
```

## Banco de Dados

O projeto inclui scripts SQL na pasta `sql dados/`:
- Modelo transacional
- Procedures
- Views
- Consultas pivot
- Validações

## Testes

```bash
# Executar testes unitários
npm test

# Executar testes e2e
npm run e2e
```

## Build

```bash
# Build para desenvolvimento
ng build

# Build para produção
ng build --prod
```

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Enviar pull requests

## Créditos

Todas as imagens usadas na aplicação são pertencentes a [freepik.com](https://www.freepik.com/)

