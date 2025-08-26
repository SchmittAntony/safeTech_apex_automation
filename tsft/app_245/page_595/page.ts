import { Page, Locator, expect } from '@playwright/test';

export class p_595 {
    readonly page: Page;

    //Elementos da pagina
    readonly btnModalCadastro: Locator;
    readonly campoPesquisaCadastro: Locator;
    readonly btnExcluirCadastro: Locator;
    readonly btnConfirmaExcluir: Locator;
    readonly btnSalvarCadastro: Locator;

    //Campos de Cadastro
    readonly selEmpresa: Locator;
    readonly selTesteApex: Locator;

    readonly selBanco: Locator;
    readonly selBancoBrasil: Locator;

    readonly selTipoParcela: Locator;
    readonly selFormaPagamentoDoc: Locator;
    readonly campoObservacao: Locator;


    constructor(page: Page) {
        this.page = page;

        //Elementos da pagina
        this.btnModalCadastro = page.getByRole('button', { name: 'Novo Banco por Empresa' });
        this.campoPesquisaCadastro = page.getByRole('textbox', { name: 'Relatório de Pesquisa' });

        this.btnExcluirCadastro = page.locator('iframe[title="Cadastro Banco por Empresa"]')
            .contentFrame().getByRole('button', { name: 'Excluir' });

        this.btnConfirmaExcluir = page.getByRole('button', { name: 'OK' });

        //Campos cadastro
        this.selEmpresa = page.locator('iframe[title="Cadastro Banco por Empresa"]')
            .contentFrame().getByRole('combobox', { name: ' Empresa (Valor Necessário)' });

        this.selTesteApex = page.getByRole('option', { name: '25 - TESTE APEX' });

        this.selBanco = page.locator('iframe[title="Cadastro Banco por Empresa"]')
            .contentFrame().getByRole('combobox', { name: ' Banco (Valor Necessário)' });

        this.selBancoBrasil = page.getByRole('option', { name: '1 - BANCO DO BRASIL S/A' });

        this.selTipoParcela = page.locator('iframe[title="Cadastro Banco por Empresa"]')
            .contentFrame().getByLabel('Tipo Parcela (Valor Necessá');

        this.selFormaPagamentoDoc = page.locator('iframe[title="Cadastro Banco por Empresa"]')
            .contentFrame().getByLabel('Forma de Pagamento Documento');

        this.campoObservacao = page.locator('iframe[title="Cadastro Banco por Empresa"]')
            .contentFrame().getByRole('textbox', { name: 'Observação' });

        this.btnSalvarCadastro = page.locator('iframe[title="Cadastro Banco por Empresa"]')
            .contentFrame().getByRole('button', { name: 'Incluir Banco por Empresa' });
    }


    async navegarParaCadastro() {
        await this.btnModalCadastro.click();
    }

    async preencherCadastro() {
        await this.selEmpresa.click();
        await this.selTesteApex.click();

        await this.selBanco.click();
        await this.selBancoBrasil.click();

        await this.selTipoParcela.selectOption('B');
        await this.selFormaPagamentoDoc.selectOption('5');
        await this.campoObservacao.fill('Teste Qualidade - QA');
    }

    async clicarSalvarCadastro() {
        await this.btnSalvarCadastro.click();
    }

    async clicarExluirCadastro() {
        await this.btnExcluirCadastro.click();
        await this.btnConfirmaExcluir.click();
    }

    async pesquisaCadastro() {
        await this.page.waitForTimeout(2000);
        await this.campoPesquisaCadastro.fill('Teste Qualidade - QA');
        await this.campoPesquisaCadastro.press('Enter');
    }

    async verificarEClicarEditarCadastro(textoPesquisa: string): Promise<void> {
        const linha = this.page.locator('tr', { has: this.page.getByText(textoPesquisa) });
        const botaoEditar = linha.getByRole('link', { name: '' });
        await expect(botaoEditar).toBeVisible();
        await botaoEditar.click();
    }

    async preencherCadastroInvalido() {
        await this.selEmpresa.click();
        await this.selTesteApex.click();

        await this.selBanco.click();
        await this.selBancoBrasil.click();

        await this.campoObservacao.fill('Teste Qualidade - QA');
    }

}