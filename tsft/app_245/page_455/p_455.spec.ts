import * as allure from "allure-js-commons";
import { test } from '@playwright/test';
import { acessoAPP245_455 } from './navigation';
import { p_455 } from './page';

test.describe.configure({ mode: 'serial' });

test('Cadastro de forma de Pagamento - Fluxo completo', async ({ page, context }) => {
    await allure.epic("APP245_455 - Cadastro de forma de Pagamento");
    await allure.feature("Validações de Cadastro válido");
    await allure.story("Fluxo completo de cadastro válido");

    const newPage = await acessoAPP245_455(page, context);
    const page455 = new p_455(newPage);

    await page455.navegarParaCadastro();
    await page455.preencherCadastro();
    await page455.salvarCadastro();
    await page455.excluirCadastro();
});

test('Cadastro de forma de Pagamento Inválido', async ({ page, context }) => {
    await allure.epic("APP245_455 - Cadastro de forma de Pagamento");
    await allure.feature("Validações de cadastro inválido");
    await allure.story("Tentativa de cadastro sem campos obrigatorios");

    const newPage = await acessoAPP245_455(page, context);
    const page455 = new p_455(newPage);

    await page455.navegarParaCadastro();
    await page455.preencherCadastroInvalido();
    await page455.salvarCadastro();
    
    await page455.btnFechaMensagem.click();

})
