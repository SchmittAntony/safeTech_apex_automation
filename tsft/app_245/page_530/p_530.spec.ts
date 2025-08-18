import { test, expect } from '@playwright/test';
import { acessoAPP245_530 } from './navigation';


    async function preencherCamposBasicos( page ) {
     
    //campo Descrição
    await page.getByRole('textbox', { name: ' Descrição' }).fill('Teste de Qualidade - QA');

    //campo Abreviação
    await page.getByRole('textbox', { name: 'Abreviação' }).fill('QA');

    //campo order relatório
    await page.getByRole('textbox', { name: ' Ordem Relatório' }).fill('6');

    //campo switch rel.comissão
    await page.locator('#P535_RELATORIO_CONTAINER span').nth(1).click();

    //campo tipo movimento
    await page.getByLabel('Tipo Movimento').selectOption('P');

    //campo tipo pagmento comissão
    await page.getByLabel('Tipo Pagamento Comissão').selectOption('F');

    }

    async function campoInvalidos( page ) {
    //campo Descrição
    await page.getByRole('textbox', { name: ' Descrição' }).fill('Teste de Qualidade - QA');

    //campo Abreviação
    await page.getByRole('textbox', { name: 'Abreviação' }).fill('QA');

    //salva cadastro
    await page.getByRole('button', { name: 'Incluir Tipo Movimento Comiss' }).click()
    }


test('Cadastro tipo movimento comissão - Válido', async ({ page, context }) => {

    const newPage = await acessoAPP245_530(page, context);

    //Acesso ao modal
    await newPage.getByRole('button', { name: 'Novo Tipo Movimento Comissão' }).click();

    // cadastro dos campos
    await preencherCamposBasicos(newPage);

    //salva cadastro
    await newPage.getByRole('button', { name: 'Incluir Tipo Movimento Comiss' }).click()

    //Fecha notificação
    await newPage.getByRole('button', { name: '' }).click();
    
    //Excluir cadastro
    await newPage.getByRole('button', { name: 'Excluir' }).click();
    await newPage.getByRole('button', { name: 'OK' }).click();

})

test('Cadastro tipo movimento comissão - Inválida', async ({ page, context }) => {

    const newPage = await acessoAPP245_530(page, context);

    //Acesso ao modal
    await newPage.getByRole('button', { name: 'Novo Tipo Movimento Comissão' }).click();

    // campos invalidos
    await campoInvalidos(newPage);

    //Verifica mensagem de erro 
    await newPage.getByText('Corrija os erros antes de').isVisible();
    await newPage.getByRole('button', { name: 'OK' }).click(); 

    //Volta page
    await newPage.getByRole('button', { name: 'Voltar' }).click();
})