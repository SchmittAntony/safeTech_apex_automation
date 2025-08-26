import { test } from '@playwright/test';
import { acessoAPP245_325 } from './navigation';
import { p_325 } from './page';

test.describe.configure({ mode: 'serial' });

test('Cadastro de Banco válido', async ({ page, context }) => {
    const newPage = await acessoAPP245_325(page, context);
    const page325 = new p_325(newPage);

    // Realiza cadastro completo
    await page325.realizarCadastroCompleto();

    // Pesquisa e verifica o cadastro
    await page325.pesquisarCadastro('Teste automatizado - Qualidade');
    await page325.verificarCadastroCriado('TESTE AUTOMATIZADO - QUALIDADE');
    
    // Exclui o cadastro
    await page325.excluirCadastro();
});

test('Tentativa de cadastro sem código Banco', async ({ page, context }) => {
    const newPage = await acessoAPP245_325(page, context);
    const page325 = new p_325(newPage);

    await page325.acessarTelaCadastro();
    await page325.preencherCadastroInvalido();
    await page325.salvarCadastro();
    await page325.fecharNotificacao();
});