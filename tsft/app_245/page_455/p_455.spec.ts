import { test, expect } from '@playwright/test';
import { acessoAPP245_455 } from './navigation';


async function preecnherCampos( page ) {
    //Descrição
    await page.getByRole('textbox', { name: ' Descrição' }).fill('Teste Qualidade - QA');

    //Tipo Sistema
    await page.getByLabel('Tipo Sistema').selectOption('CP');

    //Tipo Pagamento
    await page.getByLabel('Tipo Pagamento').selectOption('A');

    //Tipo movimento cobrança
    await page.locator('#P460_CODIGO_MOVTO_PAGTO_DOC_lov_btn').click({ force: true});
    await page.getByRole('option', { name: '149 - LIQUIDACAO TARIFA' }).click();

    //Tipo automação 
    await page.getByLabel('Tipo Automação').selectOption('P');

    //Modalidade forma pagmento
    await page.locator('#P460_ID_MODALIDADE_FORMA_PAGTO_lov_btn').click();
    await page.getByRole('option', { name: '- DINHEIRO' }).click();

    //Emite nota debito
    await page.locator('#P460_EMITE_NOTA_DEBITO_CONTAINER span').nth(1).click();
    
    //Pago cartorio
    await page.locator('#P460_PAGO_CARTORIO_CONTAINER span').nth(1).click();

}

test('Formas de Pagamento Documento - Válido', async ({ page, context}) => {

    const newPage = await acessoAPP245_455(page, context);

    //acesso ao modal de cadastro
    await newPage.getByRole('button', { name: 'Nova Forma Pagamento Documento' }).click();

    //Preenche os campos
    await preecnherCampos(newPage);

    //Salva cadastro
    await newPage.getByRole('button', { name: 'Incluir Forma de Pagamento' }).click();

    //fecha mensagem
    await newPage.getByRole('button', { name: '' }).click();

    //exclui cadastro
    await newPage.getByRole('button', { name: 'Excluir' }).click();
    await newPage.getByRole('button', { name: 'OK' }).click();

})

test('Forma de Pagmento Documento - Inválido', async ({ page, context}) => {

    const newPage = await acessoAPP245_455(page, context);

    //acesso ao modal de cadastro
    await newPage.getByRole('button', { name: 'Nova Forma Pagamento Documento' }).click();
    
    //Descrição
    await newPage.getByRole('textbox', { name: ' Descrição' }).fill('Teste Qualidade - QA');

    //Tipo Sistema
    await newPage.getByLabel('Tipo Sistema').selectOption('CP');

    //Salva cadastro
    await newPage.getByRole('button', { name: 'Incluir Forma de Pagamento' }).click();

    //fecha mensagem
    await newPage.getByRole('button', { name: '' }).click();
    await newPage.getByRole('button', { name: 'Excluir' });

})