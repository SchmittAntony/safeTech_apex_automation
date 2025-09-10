// Financeiro  -> Cadastro -> Categoria lançamento Extrato
import * as allure from "allure-js-commons";
import { test, expect } from '@playwright/test';
import { acessoAPP245_640 } from './navigation';
import { p_640 } from './page';


test.describe.configure({ mode: 'serial' });


test('Cadastro de categoria - Fluxo completo', async ({ page, context }) => {
    await allure.epic("APP245_640 - Cadastro de categoria");
    await allure.feature("Validações de Cadastro válido");
    await allure.story("Fluxo completo de cadastro válido");

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
    await allure.epic("APP245_640 - Cadastro de categoria");
    await allure.feature("Validação de cadastro inválido");
    await allure.story("Tentativa de cadastro sem campos obrigatorios");  

    const newPage = await acessoAPP245_640(page, context);
    const page640 = new p_640(newPage);
    
    await page640.navegarParaCadastro();
    await page640.preencherCadastroInvalido();
    await page640.clicarSalvarCadastro();
    await page640.btnConfirmaExcluir.click();


});