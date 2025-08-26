import { test } from '@playwright/test';
import { acessoAPP245_455 } from './navigation';
import { p_455 } from './page';

test.describe.configure({ mode: 'serial' });

test('Cadastro de Banco válido', async ({ page, context }) => {
    const newPage = await acessoAPP245_455(page, context);
    const page455 = new p_455(newPage);

    await page455.navegarParaCadastro();
    await page455.preencherCadastro();
    await page455.salvarCadastro();
    await page455.excluirCadastro();
});

test('Cadastro de Banco Inválido', async ({ page, context }) => {
    const newPage = await acessoAPP245_455(page, context);
    const page455 = new p_455(newPage);

    await page455.navegarParaCadastro();
    await page455.preencherCadastroInvalido();
    await page455.salvarCadastro();
    
    await page455.btnFechaMensagem.click();

})
