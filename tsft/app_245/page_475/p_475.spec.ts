import { test, expect } from '@playwright/test';
import { acessoAPP245_475 } from './navigation';

test('Agrupamento tipo Vencimento Boleto - Válido', async ({ page, context }) => {

    const newPage = await acessoAPP245_475(page, context);

    //Acesso ao modal
    await newPage.getByRole('button', { name: 'Novo Agrupamento Tipo' }).click();

    //Campo Descrição
    const descricao = await newPage.locator('iframe[title="Cadastro Agrupamento Tipo Vencimento Boleto"]')
        .contentFrame()
        .getByRole('textbox', { name: 'Descrição' });

    await descricao.fill('Teste Qualidade - QA');

    //Salva cadastro
    const salva = await newPage.locator('iframe[title="Cadastro Agrupamento Tipo Vencimento Boleto"]')
        .contentFrame().
        getByRole('button', { name: 'Incluir Agrupamento Tipo' });

    await salva.click();

})

test('Agrupamento tipo Vencimento Boleto - Excluir cadastro', async ({ page, context }) => {

    const newPage = await acessoAPP245_475(page, context);

    //Pesquisa cadastro
    await newPage.getByRole('textbox', { name: 'Relatório de Pesquisa' }).fill('Teste Qualidade - QA');
    await newPage.getByRole('button', { name: 'Ir', exact: true }).click();

    //Pesquisa Cadastro
    const linha = newPage.locator('tr', {
        has: newPage.getByText('TESTE QUALIDADE - QA')
    });
    const botaoEditar = linha.getByRole('link', { name: '' });
    await expect(botaoEditar).toBeVisible();
    await botaoEditar.click();

    //exclui cadastro
    await newPage.locator('iframe[title="Cadastro Agrupamento Tipo Vencimento Boleto"]')
        .contentFrame()
        .getByRole('button', { name: 'Excluir' })
        .click();
    await newPage.getByRole('button', { name: 'OK' }).click();

})