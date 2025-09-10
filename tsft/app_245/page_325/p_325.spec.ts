import * as allure from "allure-js-commons";
import { test } from '@playwright/test';
import { acessoAPP245_325 } from './navigation';
import { p_325 } from './page';

test.describe.configure({ mode: 'serial' });

test('Cadastro de Banco válido - Fluxo completo', async ({ page, context }) => {
    await allure.epic("APP245_325 - Cadastro de Bancos");
    await allure.feature("Validações de Cadastro válido");
    await allure.story("Fluxo completo de cadastro válido");

    const newPage = await acessoAPP245_325(page, context);
    const page325 = new p_325(newPage);

    await page325.realizarCadastroCompleto();
    await page325.pesquisarCadastro('Teste automatizado - Qualidade');
    await page325.verificarCadastroCriado('TESTE AUTOMATIZADO - QUALIDADE');
    await page325.excluirCadastro();
});

test('Cadastro de Banco inválido', async ({ page, context }) => {
    await allure.epic("APP245_325 - Cadastro de Bancos");
    await allure.feature("Validações de cadastro inválido");
    await allure.story("Tentativa de cadastro sem código do banco");

    const newPage = await acessoAPP245_325(page, context);
    const page325 = new p_325(newPage);

    await page325.acessarTelaCadastro();
    await page325.preencherCadastroInvalido();
    await page325.salvarCadastro();
    await page325.fecharNotificacao();
});