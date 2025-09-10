const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Limpando resultados anteriores...\n');

// Função para limpar diretório
function cleanDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`✅ Diretório ${dirPath} limpo`);
  }
  fs.mkdirSync(dirPath, { recursive: true });
}

// Limpar diretórios de resultados e relatórios
cleanDirectory('allure-results');
cleanDirectory('allure-report');

console.log('🚀 Executando testes Playwright...\n');

try {
  // Executar testes
  execSync('npx playwright test --reporter=line,allure-playwright', { 
    stdio: 'inherit',
    env: { ...process.env }
  });
  console.log('\n🎉 Testes executados!');
} catch (testError) {
  console.log('\n⚠️  Alguns testes falharam, mas vamos gerar o relatório...');
  // Continua para gerar o relatório mesmo com falhas
}

console.log('\n📊 Gerando relatório Allure...\n');

try {
  // Verificar se há resultados para gerar o relatório
  const resultsFiles = fs.readdirSync('allure-results');
  if (resultsFiles.length === 0) {
    console.log('ℹ️  Nenhum resultado encontrado para gerar o relatório');
    process.exit(0);
  }

  // Gerar relatório Allure
  execSync('npx allure generate allure-results -o allure-report --clean', { 
    stdio: 'inherit' 
  });
  console.log('\n✅ Relatório Allure gerado com sucesso!');
} catch (generateError) {
  console.error('❌ Erro ao gerar relatório Allure:', generateError.message);
  process.exit(1);
}

console.log('🌐 Abrindo relatório no navegador...\n');

try {
  // Abrir relatório Allure
  execSync('npx allure open allure-report', { 
    stdio: 'inherit',
    timeout: 10000 // 10 segundos timeout
  });
  console.log('\n✨ Relatório aberto no navegador!');
} catch (openError) {
  console.log('ℹ️  Relatório gerado em: ' + path.resolve('allure-report', 'index.html'));
  console.log('📋 Abra manualmente o arquivo acima no navegador');
}

// Mensagem final
console.log('\n📋 Processo concluído! Relatório sempre limpo e atualizado.');