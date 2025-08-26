// Financero -> Cadastros -> Banco padrao por empresa

import { test, expect } from '@playwright/test';
import { acessoAPP245_595 } from './navigation';
import { p_595 } from './page';

test.describe.configure({ mode: 'serial' });

test('Cadastro Banco por Empresa > Valido', async ({ page, context }) => {
    const newPage = await acessoAPP245_595(page, context);
    const page530 = new p_595(newPage);

    await page530.navegarParaCadastro();
    await page530.preencherCadastro();
    await page530.clicarSalvarCadastro();
    await page530.pesquisaCadastro();
    await page530.verificarEClicarEditarCadastro('TESTE QUALIDADE - QA');
    await page530.clicarExluirCadastro();

    await newPage.waitForTimeout(8000);

});

test('Cadastro com dados Inválidos', async ({ page, context }) => {
    const newPage = await acessoAPP245_595(page, context);
    const page530 = new p_595(newPage);

    await page530.navegarParaCadastro();
    await page530.preencherCadastroInvalido();
    await page530.clicarSalvarCadastro();
    await page530.btnConfirmaExcluir.click();

    
    
})