// Financero -> Cadastros -> Banco padrao por empresa
import * as allure from "allure-js-commons";
import { test, expect } from '@playwright/test';
import { acessoAPP245_595 } from './navigation';
import { p_595 } from './page';

test.describe.configure({ mode: 'serial' });

test('Cadastro Banco por Empresa - Fluxo completo', async ({ page, context }) => {
    await allure.epic("APP245_595 - Cadastro Banco por Empresa");
    await allure.feature("Validações de Cadastro válido");
    await allure.story("Fluxo completo de cadastro válido");    

    const newPage = await acessoAPP245_595(page, context);
    const page530 = new p_595(newPage);

    await page530.navegarParaCadastro();
    await page530.preencherCadastro();
    await page530.clicarSalvarCadastro();
    await page530.pesquisaCadastro();
    await page530.verificarEClicarEditarCadastro('TESTE QUALIDADE - QA');
    await page530.clicarExluirCadastro();

});

test('Cadastro Banco por Empresa - Inválido', async ({ page, context }) => {
    await allure.epic("APP245_595 - Cadastro Banco por Empresa");
    await allure.feature("Validação de cadastro inválido");
    await allure.story("Tentativa de cadastro sem campos obrigatorios");  

    const newPage = await acessoAPP245_595(page, context);
    const page530 = new p_595(newPage);

    await page530.navegarParaCadastro();
    await page530.preencherCadastroInvalido();
    await page530.clicarSalvarCadastro();
    await page530.btnConfirmaExcluir.click();

    
    
})