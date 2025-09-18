import * as allure from "allure-js-commons";
import { test } from '@playwright/test';
import { acessoAPP125_50 } from './navigation';
import { p_50 } from './page';

test.describe.configure({ mode: 'serial' });

test('Cadastro de Pessoa - Fluxo de cadastro Juridico', async ({ page, context }) => {
    await allure.epic("APP125_50 - Pessoa");
    await allure.feature("Validações de cadastro de pessoa Juridico");
    await allure.story("Fluxo de cadastro");

    const newPage = await acessoAPP125_50(page, context);
    const page50 = new p_50(newPage);

    await page50.acessaCadastroPessoa();
    await page50.cadastroPessoaJuridica();

});

test('Cadastro de Pessoa - Fluxo de excluir Juridico', async ({ page, context }) => {
    await allure.epic("APP125_50 - Pessoa");
    await allure.feature("Validações de exclusão de pessoa Juridico");
    await allure.story("Fluxo de exclusão");

    const newPage = await acessoAPP125_50(page, context);
    const page50 = new p_50(newPage);

    await page50.consultaCadastroPessoa();
    await page50.excluirCadastroPessoa();

});