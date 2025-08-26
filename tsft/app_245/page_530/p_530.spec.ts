import { test, expect } from '@playwright/test';
import { acessoAPP245_530 } from './navigation';
import { p_530 } from './page';

test.describe.configure({ mode: 'serial' });

test('Cadastro tipo movimento comissão - Válido', async ({ page, context }) => {
    const newPage = await acessoAPP245_530(page, context);
    const page530 = new p_530(newPage);

    await page530.nevegarParaCadastro();
    await page530.preencherCadastro();
    await page530.clicarSalvarCadastro();
    await page530.clicarFecharNotificacao();
    await page530.clicarExcluirCadastro(); 


})

test('Cadastro tipo movimento comissão - Inválida', async ({ page, context }) => {
    const newPage = await acessoAPP245_530(page, context);
    const page530 = new p_530(newPage);

    await page530.nevegarParaCadastro();
    await page530.preencherCamposInvalido();
    await page530.clicarSalvarCadastro();
    await page530.navegarParaHome();

})