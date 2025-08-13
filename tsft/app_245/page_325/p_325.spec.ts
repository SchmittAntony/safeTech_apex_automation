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
    async function preencherCamposBasicos(page, codigoBanco) {
        await page.locator('#P330_CODIGO_BANCO').fill(codigoBanco);
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
        const codigoBanco = gerarCodigos();
        await preencherCamposBasicos(newPage, codigoBanco);

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

        // Valida e obtém o código final salvo
        const codigoBancoFinal = await validarCampoCodigoDisplay(newPage, codigoBanco);

        // Capturar código criado
        const bancoCriado = codigoBancoFinal;

        // Pesquisar o banco criado
        await newPage.locator('#B2334015705776409244').click();
        await newPage.locator('#R2244631083017159928_search_field').fill(bancoCriado);
        await newPage.locator('#R2244631083017159928_search_button').click();

        const verificaCod = newPage.locator('.u-tR').filter({ hasText: bancoCriado }).first();
        await expect(verificaCod).toHaveText(bancoCriado);

        // Excluir registro criado
        const botaoEditar = newPage.getByRole('link', { name: '' });
        await expect(botaoEditar).toBeVisible({ timeout: 10000 });
        await botaoEditar.click({ force: true });

        await newPage.getByRole('button', { name: 'Excluir' }).click();
        await newPage.getByRole('button', { name: 'OK' }).click();
        await newPage.getByRole('button', { name: 'Remover Filtro' }).click();

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