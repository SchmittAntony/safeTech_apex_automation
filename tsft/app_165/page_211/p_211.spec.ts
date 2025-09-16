import * as allure from "allure-js-commons";
import { test } from '@playwright/test';
import { acessoAPP165_211 } from './navigation';
import { p_211 } from './page';

test.describe.configure({ mode: 'serial' });

test('Itens em estoque válido - Fluxo de consulta', async ({ page, context }) => {
    await allure.epic("APP165_211 - Itens em estoque");
    await allure.feature("Validações de consulta estoque do item");
    await allure.story("Fluxo de consulta");

    const newPage = await acessoAPP165_211(page, context);
    const page211 = new p_211(newPage);

    await page211.acessaModalConsulta();
    await page211.selecionaItem();
    await page211.consutaItem();
    await page211.verificaEstoque();

});

test('Itens em estoque Inválido', async ({ page, context }) => {
    await allure.epic("APP165_211 - Itens em estoque");
    await allure.feature("Validações de consulta Inválido");
    await allure.story("Tentativa de realizar consulta sem parametros");

    const newPage = await acessoAPP165_211(page, context);
    const page211 = new p_211(newPage);

    await page211.acessaModalConsulta();
    await page211.consutaItem();
    await page211.verificaMensagemErroConsulta();
    await page211.fechaMensagemErro();

});