// Financeiro -> Cadastros -> Banco

import { test, expect } from '@playwright/test';
import { acessoAPP245_325 } from './navigation';
import { gerarCodigos, validarCampoCodigoDisplay } from '../../support/scripts';

//function para as chaves
async function marcarToggle(page, selector) {
    await page.locator(`${selector} + span.a-Switch-toggle`).click({ force: true });
    await expect(page.locator(selector)).toBeChecked();
}

//function para prenhcer os campos
async function preencherCamposBasicos(page) {
    await page.locator('#P330_CODIGO_BANCO').fill('88');
    await page.locator('#P330_DESCRICAO').fill('Teste automatizado - Qualidade');
    await page.locator('#P330_TIPO_LIQUIDACAO').fill('1');
    await page.locator('#P330_DATA_CONCILIACAO_BANCARIA_CCR').selectOption('C');
    await page.locator('#P330_CAMINHO_LOGOTIPO').fill('G:\\Sft\\fotos\\bb.bmp');
    await page.locator('#P330_LINK_BANCO').fill('https://www.google.com/');
}

test.describe.configure({ mode: 'serial' });

test('Cadastro de Banco válido', async ({ page, context }) => {
    const newPage = await acessoAPP245_325(page, context);

    // Acessar tela de cadastro
    await newPage.locator('#R2334005167570681352').isVisible();
    await newPage.locator('#B2334012294542409209').click();

    // Preencher campos básicos
    await preencherCamposBasicos(newPage);

    // Lista de toggles a serem marcados
    const toggles = [
        '#P330_BANCO_CRECEBER',
        '#P330_RATEIO_CR',
        '#P330_RATEIO_CP',
        '#P330_GERA_PLANILHA_OPERACAO_VENDOR',
        '#P330_USA_SEG_DIGITO_VERIFICADOR',
        '#P330_GERA_INTEGRACAO_CONTABIL',
        '#P330_CONCILIA_EXTRATO',
        '#P330_SERASA',
        '#P330_PARTICIPA_FLUXO_CAIXA',
        '#P330_RELATORIO_CRECEBER',
        '#P330_CONSIDERA_INADIMPLENCIA',
        '#P330_LIMITE_CREDITO_EXTRA',
        '#P330_NOTA_DEBITO',
        '#P330_OBRIGAR_SEQ_PAR_BANCO_CHEQUE',
    ];

    // Marcar todos os toggles
    for (const toggle of toggles) {
        await marcarToggle(newPage, toggle);
    }

    // Salvar cadastro
    await newPage.locator('#B2334015419460409241').click();

    // Fecha notificação
    const botaoFecharNotificacao = newPage.locator('button[title="Fechar Notificação"]');
    await botaoFecharNotificacao.waitFor({ state: 'visible', timeout: 5000 });
    await botaoFecharNotificacao.click();

    //Pesquisa cadastro criado
    await newPage.getByRole('button', { name: 'Voltar' }).click();

    const pesquisa = newPage.getByRole('textbox', { name: 'Relatório de Pesquisa' });
    await pesquisa.fill('Teste automatizado - Qualidade');
    await pesquisa.press('Enter');

    // Localiza o elemento pelo texto exato
    const verificaCod = newPage.getByText('TESTE AUTOMATIZADO - QUALIDADE', { exact: true });

    // Espera até ele estar visível (timeout opcional)
    await verificaCod.waitFor({ state: 'visible', timeout: 30000 }); // espera até 30s

    // exlcuir cadastro
    await expect(verificaCod).toHaveText('TESTE AUTOMATIZADO - QUALIDADE');
    await newPage.getByRole('link', { name: '' }).click();
    await newPage.getByRole('button', { name: 'Excluir' }).click();
    await newPage.getByRole('button', { name: 'OK' }).click();
    await newPage.getByRole('button', { name: 'Voltar' }).click();


    await newPage.waitForTimeout(8000);

});

test('Tentativa de cadastro sem código Banco', async ({ page, context }) => {
    const newPage = await acessoAPP245_325(page, context);

    // 1. Acessar tela de cadastro
    await newPage.locator('#R2334005167570681352').isVisible();
    await newPage.locator('#B2334012294542409209').click();

    // 2. Preencher todos campos EXCETO o código (deixar vazio)
    await newPage.locator('#P330_DESCRICAO').fill('Teste sem código');
    await newPage.locator('#P330_TIPO_LIQUIDACAO').fill('1');
    await newPage.locator('#P330_DATA_CONCILIACAO_BANCARIA_CCR').selectOption('C');
    // ... outros campos (menos o código)

    // 3. Tentar salvar
    await newPage.locator('#B2334015419460409241').click();

    // 5. Fechar notificação
    const botaoFecharNotificacao = newPage.locator('button[title="Fechar Notificação"]');
    await botaoFecharNotificacao.waitFor({ state: 'visible', timeout: 10000 });
    await botaoFecharNotificacao.click();

});