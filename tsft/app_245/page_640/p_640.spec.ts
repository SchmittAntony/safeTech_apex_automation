// Financeiro  -> Cadastro -> Categoria lançamento Extrato

import { test, expect } from '@playwright/test';
import { acessoAPP245_640 } from './navigation';
import { p_640 } from './page';


test.describe.configure({ mode: 'serial' });


test('Cadastro de categoria válida', async ({ page, context }) => {
    const newPage = await acessoAPP245_640(page, context);
    const page640 = new p_640(newPage);

    await page640.navegarParaCadastro();
    await page640.preencherCadastro();
    await page640.clicarSalvarCadastro();
    await page640.clicarFecharNotificacao();
    await page640.pesquisaCadastro();
    await page640.clicarExcluirCadastro(); 

});

test('Cadastro de categoria inválida', async ({ page, context }) => {
    const newPage = await acessoAPP245_640(page, context);
    const page640 = new p_640(newPage);
    
    await page640.navegarParaCadastro();
    await page640.preencherCadastroInvalido();
    await page640.clicarSalvarCadastro();
    await page640.btnConfirmaExcluir.click();


});