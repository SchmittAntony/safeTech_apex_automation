import * as allure from "allure-js-commons";
import { test, expect } from '@playwright/test';
import { acessoAPP245_465 } from './navigation';
import { p_465 } from './page';

test.describe.configure({ mode: 'serial' });

test('Cadastro Tipo Vencimento Boleto - Fluxo completo', async ({ page, context }) => {
    await allure.epic("APP245_465 - Cadastro Tipo vencimento Boleto");
    await allure.feature("Validações de Cadastro válido");
    await allure.story("Fluxo completo de cadastro válido");

    const newPage = await acessoAPP245_465(page, context);
    const page465 = new p_465(newPage); 


    await page465.navegarParaCadastro();
    await page465.preencherCadastro();
    await page465.clicarSalvarCadastro();
    await page465.clicarFecharNotificacao();
    await page465.clicarExcluirCadastro();

})


test('Cadastro Tipo Vencimento Boleto inválido', async ({ page, context }) => {
    await allure.epic("APP245_465 - Cadastro Tipo vencimento Boleto");
    await allure.feature("Validações de cadastro inválido");
    await allure.story("Tentativa de cadastro sem campos obrigatorios");

    const newPage = await acessoAPP245_465(page, context);
    const page465 = new p_465(newPage); 

    await page465.navegarParaCadastro();
    await page465.preencherCadastroInvalido();
    await page465.clicarSalvarCadastro();
    await page465.btnConfirmaExcluir.click();

})
