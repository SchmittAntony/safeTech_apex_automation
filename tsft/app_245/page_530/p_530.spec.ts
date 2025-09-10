import * as allure from "allure-js-commons";
import { test, expect } from '@playwright/test';
import { acessoAPP245_530 } from './navigation';
import { p_530 } from './page';

test.describe.configure({ mode: 'serial' });

test('Cadastro tipo movimento comissão - Fluxo completo', async ({ page, context }) => {
    await allure.epic("APP245_530 - Cadastro tipo movimento comissão");
    await allure.feature("Validações de Cadastro válido");
    await allure.story("Fluxo completo de cadastro válido");

    const newPage = await acessoAPP245_530(page, context);
    const page530 = new p_530(newPage);

    await page530.nevegarParaCadastro();
    await page530.preencherCadastro();
    await page530.clicarSalvarCadastro();
    await page530.clicarFecharNotificacao();
    await page530.clicarExcluirCadastro(); 


})

test('Cadastro tipo movimento comissão - Inválida', async ({ page, context }) => {
    await allure.epic("APP245_530 - Cadastro tipo movimento comissão");
    await allure.feature("Validação de cadastro inválido");
    await allure.story("Tentativa de cadastro sem campos obrigatorios");

    const newPage = await acessoAPP245_530(page, context);
    const page530 = new p_530(newPage);

    await page530.nevegarParaCadastro();
    await page530.preencherCamposInvalido();
    await page530.clicarSalvarCadastro();
    await page530.navegarParaHome();

})