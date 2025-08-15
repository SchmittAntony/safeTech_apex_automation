// Financero -> Cadastros -> Banco padrao por empresa

import { test, expect } from '@playwright/test';
import { acessoAPP245_595 } from './navigation';

async function selecionaParametros(newPage) {
    // Empressa
    await newPage.locator('iframe[title="Cadastro Banco por Empresa"]')
        .contentFrame()
        .getByRole('combobox', { name: ' Empresa (Valor Necessário)' })
        .click();
    await newPage.getByRole('option', { name: '25 - TESTE APEX' })
        .click();

    // banco 
    await newPage.locator('iframe[title="Cadastro Banco por Empresa"]')
        .contentFrame()
        .getByRole('combobox', { name: ' Banco (Valor Necessário)' })
        .click();
    await newPage.getByRole('option', { name: '1 - BANCO DO BRASIL S/A' })
        .click();

    // Tipo Parcela
    await newPage.locator('iframe[title="Cadastro Banco por Empresa"]')
        .contentFrame()
        .getByLabel('Tipo Parcela (Valor Necessá')
        .selectOption('B');

    // Forma de Pagamento Documento
    await newPage.locator('iframe[title="Cadastro Banco por Empresa"]')
        .contentFrame()
        .getByLabel('Forma de Pagamento Documento')
        .selectOption('5');

    // Observação   
    await newPage.locator('iframe[title="Cadastro Banco por Empresa"]')
        .contentFrame()
        .getByRole('textbox', { name: 'Observação' })
        .fill('Teste Qualidade - QA');

    // Concluir cadastro
    await newPage.locator('iframe[title="Cadastro Banco por Empresa"]')
        .contentFrame()
        .getByRole('button', { name: 'Incluir Banco por Empresa' })
        .click();

}

test('Cadastro Banco por Empresa > Valido', async ({ page, context }) => {

    // Chamador da nevegação
    const newPage = await acessoAPP245_595(page, context);

    // Clica no botão que abre o modal
    await newPage.getByRole('button', { name: 'Novo Banco por Empresa' }).click();

    // Preencher campos
    await selecionaParametros(newPage);

    // Pesquisa Registro criado
    const campoPesquisa = newPage.getByRole('textbox', { name: 'Relatório de Pesquisa' });
    await campoPesquisa.isVisible();
    await campoPesquisa.click();
    await campoPesquisa.fill('Teste Qualidade - QA');

    await newPage.getByRole('button', { name: 'Ir', exact: true }).click();

    // Verifica registro/exclusão
    const campo = newPage.locator('td').filter({ hasText: 'TESTE QUALIDADE - QA' });

    if (await campo.count() > 0) {
        // Localiza o botão de editar na mesma linha
        const botaoEditar = newPage.locator('tr')
            .filter({ hasText: '25TESTE APEXB1BANCO DO BRASIL' })
            .getByRole('link');

        await botaoEditar.click();
    }

    await newPage.locator('iframe[title="Cadastro Banco por Empresa"]')
        .contentFrame()
        .getByRole('button', { name: 'Excluir' })
        .click();
    await newPage.getByRole('button', { name: 'OK' }).click();

});

test('Cadastro com dados Inválidos', async ({ page, context }) => {

    const newPage = await acessoAPP245_595(page, context);

    // Clica no botão que abre o modal
    await newPage.getByRole('button', { name: 'Novo Banco por Empresa' }).click();


    //Prechimento de alguns campos

    // Campo Empresa
    await newPage.locator('iframe[title="Cadastro Banco por Empresa"]')
        .contentFrame()
        .getByRole('combobox', { name: ' Empresa (Valor Necessário)' })
        .click();
    await newPage.getByRole('option', { name: '25 - TESTE APEX' })
        .click();

    // banco 
    await newPage.locator('iframe[title="Cadastro Banco por Empresa"]')
        .contentFrame()
        .getByRole('combobox', { name: ' Banco (Valor Necessário)' })
        .click();
    await newPage.getByRole('option', { name: '1 - BANCO DO BRASIL S/A' })
        .click();

    // Observação   
    await newPage.locator('iframe[title="Cadastro Banco por Empresa"]')
        .contentFrame()
        .getByRole('textbox', { name: 'Observação' })
        .fill('Teste Qualidade - QA');

    // Concluir cadastro
    await newPage.locator('iframe[title="Cadastro Banco por Empresa"]')
        .contentFrame()
        .getByRole('button', { name: 'Incluir Banco por Empresa' })
        .click();



})