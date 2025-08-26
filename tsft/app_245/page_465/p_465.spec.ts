import { test, expect } from '@playwright/test';
import { acessoAPP245_465 } from './navigation';
import { p_465 } from './page';

test.describe.configure({ mode: 'serial' });

test('Cadastro de Banco válido', async ({ page, context }) => {
    const newPage = await acessoAPP245_465(page, context);
    const page465 = new p_465(newPage); 


    await page465.navegarParaCadastro();
    await page465.preencherCadastro();
    await page465.clicarSalvarCadastro();
    await page465.clicarFecharNotificacao();
    await page465.clicarExcluirCadastro();

})


test('Cadastro de Banco Inválido', async ({ page, context }) => {
    const newPage = await acessoAPP245_465(page, context);
    const page465 = new p_465(newPage); 

    await page465.navegarParaCadastro();
    await page465.preencherCadastroInvalido();
    await page465.clicarSalvarCadastro();
    await page465.btnConfirmaExcluir.click();

})
