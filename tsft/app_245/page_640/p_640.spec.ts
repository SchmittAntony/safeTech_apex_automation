// Financeiro  -> Cadastro -> Categoria lançamento Extrato

import { test, expect } from '@playwright/test';
import { acessoAPP245_640 } from './navigation';
import { gerarCodigos } from '../../support/scripts';

test.describe.configure({ mode: 'serial' });

async function preencherCamposBasicos(page, codigoCategoria) {
    await page.locator('#P645_CODIGO_CATEGORIA').fill(codigoCategoria);
    await page.locator('#P645_TIPO_CATEGORIA').selectOption('C');
    await page.locator('#P645_DESCRICAO').fill('TESTE QUALIDADE - QA');
    await page.locator('#P645_CODIGO_BANCO_lov_btn').click();
    await page.getByRole('option', { name: '1 - BANCO DO BRASIL S/A' }).click();
    await page.getByRole('button', { name: 'Incluir Categoria Lançamento' }).click();
}

test('Cadastro de categoria válida', async ({ page, context }) => {
    const newPage = await acessoAPP245_640(page, context);

    await newPage.getByRole('button', { name: 'Nova Categoria' }).click();

    //Preenchimento das informações
    const codigoCategoria = gerarCodigos();
    await preencherCamposBasicos(newPage, codigoCategoria);
    await newPage.getByRole('button', { name: 'Incluir Categoria Lançamento' }).click();

    // Fecha notificação
    const botaoFecharNotificacao = newPage.locator('button[title="Fechar Notificação"]');
    await botaoFecharNotificacao.waitFor({ state: 'visible', timeout: 5000 });
    await botaoFecharNotificacao.click();

    //Extrai código Categoria
    const categoriaCriada = await newPage.locator('#P645_CODIGO_CATEGORIA').inputValue();

    //Pesquisa Categoria criada
    await newPage.getByRole('button', { name: 'Voltar' }).click();
    await newPage.getByRole('textbox', { name: 'Relatório de Pesquisa' }).fill(categoriaCriada);
    await newPage.getByRole('button', { name: 'Ir', exact: true }).click();

    // Valida criação de categoria
    const verificaCategoria = newPage.getByLabel('Código CategoriaCrescente').filter({ hasText: categoriaCriada }).first();
    await expect(verificaCategoria).toHaveText(categoriaCriada)

    // Excluir registro criado
    const botaoEditar = newPage.getByRole('link', { name: '' });
    await expect(botaoEditar).toBeVisible({ timeout: 10000 });
    await botaoEditar.click({ force: true });
    await newPage.getByRole('button', { name: 'Excluir' }).click();
    await newPage.getByRole('button', { name: 'OK' }).click();
    await newPage.getByRole('button', { name: 'Remover Filtro' }).click();

});

test('Cadastro de categoria inválida', async ({ page, context }) => {
    const newPage = await acessoAPP245_640(page, context);

    // Acesso ao cadastro
    await newPage.getByRole('button', { name: 'Nova Categoria' }).click();

    //Preenchimento sem codigo categoria
    await newPage.locator('#P645_TIPO_CATEGORIA').selectOption('D');
    await newPage.locator('#P645_DESCRICAO').fill('TESTE QUALIDADE - QA');
    await newPage.locator('#P645_CODIGO_BANCO_lov_btn').click();
    await newPage.getByRole('option', { name: '1 - BANCO DO BRASIL S/A' }).click();
    await newPage.getByRole('button', { name: 'Incluir Categoria Lançamento' }).click();

    // Fecha notificação
    await newPage.getByRole('button', { name: 'OK' }).click();
    await newPage.getByRole('button', { name: 'Voltar' }).click();

});