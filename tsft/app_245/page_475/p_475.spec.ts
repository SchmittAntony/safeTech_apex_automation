import * as allure from "allure-js-commons";
import { test, expect } from '@playwright/test';
import { acessoAPP245_475 } from './navigation';
import { p_475 } from './page';

test.describe.configure({ mode: 'serial' });

test('Cadastro Agrupamento tipo Vencimento Boleto - Fluxo completo', async ({ page, context }) => {
    await allure.epic("APP245_475 - Cadastro Agrupamento tipo vencimento boleto");
    await allure.feature("Validações de Cadastro válido");
    await allure.story("Fluxo completo de cadastro válido");

    const newPage = await acessoAPP245_475(page, context);
    const page475 = new p_475(newPage); 

    await page475.nevegarParaCadastro();
    await page475.preencherCadastro();
    await page475.clicarSalvarCadastro();

})

test('Agrupamento tipo Vencimento Boleto - Excluir cadastro', async ({ page, context }) => {
    await allure.epic("APP245_475 - Cadastro Agrupamento tipo vencimento boleto");
    await allure.feature("Validações de exclução cadastro");
    await allure.story("Fluxo de exclusão de cadastro");

    const newPage = await acessoAPP245_475(page, context);
    const page475 = new p_475(newPage); 
    
    await page475.pesquisaCadastro();
    await page475.verificarEClicarEditarCadastro('Teste Qualidade - QA');
    await page475.clicarExcluirCadastro();

})