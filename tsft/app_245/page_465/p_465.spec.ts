import { test, expect } from '@playwright/test';
import { acessoAPP245_465 } from './navigation';

async function preencherCamposBasicos(page) {
    //Código
    await page.getByRole('textbox', { name: ' Código (Valor Necessário)' }).fill('48');

    //Decrição
    await page.getByRole('textbox', { name: ' Descrição (Valor Necessário)' }).fill('Teste Qualidade - QA');

    //Agrupamento Tipo Vencimento boleto
    await page.locator('#P470_CODIGO_AGRUP_TP_VENCTO_BOL_lov_btn').click();
    await page.getByRole('option', { name: '- TESTE QA' }).click();

    //Movimento Financeiro Entrada
    await page.locator('#P470_CODIGO_MOVIMENTO_lov_btn').click();
    await page.getByRole('option', { name: '155 - ENTRADA' }).click();

    //Movimento Financiero Pagamento
    await page.locator('#P470_CODIGO_MOVIMENTO_PAGTO_lov_btn').click();
    await page.getByRole('option', { name: '- BAIXA CONHECIMENTO FRETE' }).click();

    //Tipo Documento
    await page.getByLabel('Tipo Documento (Valor Necessá').selectOption('D');

}

test('Cadastro Tipo Vencimento Boleto - Válido', async ({ page, context }) => {

    const newPage = await acessoAPP245_465(page, context);

    //Acesso cadastro
    await newPage.getByRole('button', { name: 'Novo Tipo Vencimento Boleto' }).click();

    //cadastro
    await preencherCamposBasicos(newPage);

    //Salva cadastro
    await newPage.getByRole('button', { name: 'Incluir Tipo Vencimento Boleto' }).click();

    // Fecha notificação
    const botaoFecharNotificacao = newPage.locator('button[title="Fechar Notificação"]');
    await botaoFecharNotificacao.waitFor({ state: 'visible', timeout: 5000 });
    await botaoFecharNotificacao.click();

    //Excluir cadastro
    await newPage.getByRole('button', { name: 'Excluir' }).click();
    await newPage.getByRole('button', { name: 'OK' }).click();

})

test('Cadastro Tipo Vencimento Boleto - Inválido', async ({ page, context }) => {

    const newPage = await acessoAPP245_465(page, context);

    //Acesso cadastro
    await newPage.getByRole('button', { name: 'Novo Tipo Vencimento Boleto' }).click();

    //Campos
    //Código
    await newPage.getByRole('textbox', { name: ' Código (Valor Necessário)' }).fill('48');

    //Tipo Documento
    await newPage.getByLabel('Tipo Documento (Valor Necessá').selectOption('D');

    //Salva cadastro
    await newPage.getByRole('button', { name: 'Incluir Tipo Vencimento Boleto' }).click();

    // Fecha notificação
    await newPage.getByRole('button', { name: 'OK' }).click();

})