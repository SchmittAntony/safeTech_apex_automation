import { test, expect } from '@playwright/test';
import { acessoAPP245_475 } from './navigation';
import { p_475 } from './page';

test.describe.configure({ mode: 'serial' });

test('Agrupamento tipo Vencimento Boleto - Válido', async ({ page, context }) => {
    const newPage = await acessoAPP245_475(page, context);
    const page475 = new p_475(newPage); 

    await page475.nevegarParaCadastro();
    await page475.preencherCadastro();
    await page475.clicarSalvarCadastro();

})

test('Agrupamento tipo Vencimento Boleto - Excluir cadastro', async ({ page, context }) => {
    const newPage = await acessoAPP245_475(page, context);
    const page475 = new p_475(newPage); 
    
    await page475.pesquisaCadastro();
    await page475.verificarEClicarEditarCadastro('Teste Qualidade - QA');
    await page475.clicarExcluirCadastro();

})