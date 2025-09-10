![Logo SafeTech](https://safetech.inf.br/wp-content/uploads/2023/07/safetech-logo-capa-1.svg)

# Automação Menu SFT

Este projeto consiste na automação de testes funcionais dos programas presentes no menu SFT, visando validar fluxos críticos, garantir a estabilidade das funcionalidades e incrementar a confiabilidade do software através de execuções regressivas automatizadas.

# Tecnologias e Frameworks
![Node.js](https://img.shields.io/badge/Node.js-20.x%2B-brightgreen?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue?logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-1.40%2B-orange?logo=playwright&logoColor=white)
![Allure Reports](https://img.shields.io/badge/Allure_Reports-2.24%2B-blue?logo=allure&logoColor=white)


**Playwright** → automação de testes web

**TypeScript** → linguagem base do projeto

**Node.js** → ambiente de execução

**Page Object Model (POM)** → padrão de organização do código

**Test Runner do Playwright** → Padrão de execução dos testes

**Allure Reports** → Relátorios mais detalhados

# Como executar o projeto 

**1 Passo** → Realizar o clone do repositorio utilizando o comando `git clone + link_repositorio`

**2 Passo** → Acessar o arquivo principal do projeto `safeTech_apex_automation`

**3 Passo** → Rodar o comando `npm install` para instalar todas as dependências do projeto

**4 Passo** → É necessário criar o arquivo `.env` seguindo o exemplo do arquivo `.env.example` 

**5 Passo** → Projeto está pronto para ser executado

# Comandos para execução 

### Para execução sem visualização
```bash 
npx playwright test 
``` 

### Para visualização com painel Playwright
```bash 
npx playwright test --ui 
```

### Para execução no modo debug linha por linha
```bash 
npx playwright test --debug`
```

### Para execução no modo headed navegador visível
```bash 
playwright test --headed`
```

### Para execução do programa especifico
```bash 
npx playwright test tsft/app_245/page_245/p_245.spec.ts`
```

### Para execução com relátorio Allure Reposts
```bash 
npm run test:report

npm run test
 
npm run test:headed
```



