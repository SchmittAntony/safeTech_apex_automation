import { Page, Locator, expect } from '@playwright/test';

export class p_475 {
    readonly page: Page;

    // Elementos da pagina
    readonly btnModalCadastro: Locator;
    readonly btnSalvarCadastro: Locator;
    readonly campoPesquisaCadastro: Locator;
    readonly validaCadastroCriado: Locator;
    readonly btnEditarCadastro: Locator;
    readonly btnExcluirCadastro: Locator;
    readonly btnConfirmaExcluir: Locator;

    // Campos do cadastro
    readonly campoDescricao: Locator;


    constructor(page: Page) {
        this.page = page;

        this.btnModalCadastro = page.getByRole('button', { name: 'Novo Agrupamento Tipo' })
        this.btnSalvarCadastro = page.locator('iframe[title="Cadastro Agrupamento Tipo Vencimento Boleto"]')
            .contentFrame().getByRole('button', { name: 'Incluir Agrupamento Tipo' });

        this.campoPesquisaCadastro = page.getByRole('textbox', { name: 'Relatório de Pesquisa' });

        this.validaCadastroCriado = page.locator('tr', {
            has: page.getByText('TESTE QUALIDADE - QA')
        });

        this.btnEditarCadastro = page.getByRole('link', { name: '' });

        this.btnExcluirCadastro = page.locator('iframe[title="Cadastro Agrupamento Tipo Vencimento Boleto"]')
            .contentFrame().getByRole('button', { name: 'Excluir' });
        this.btnConfirmaExcluir = page.getByRole('button', { name: 'OK' });

        // Campos do cadastro
        this.campoDescricao = page.locator('iframe[title="Cadastro Agrupamento Tipo Vencimento Boleto"]')
            .contentFrame()
            .getByRole('textbox', { name: 'Descrição' });

    }

    async nevegarParaCadastro() {
        await this.btnModalCadastro.click();
    }

    async preencherCadastro() {
        await this.campoDescricao.fill('Teste Qualidade - QA')
    }

    async clicarSalvarCadastro() {
        await this.btnSalvarCadastro.click();
    }

    async pesquisaCadastro() {
        await this.campoPesquisaCadastro.fill('Teste Qualidade - QA');
        await this.campoPesquisaCadastro.press('Enter');
    }

    async verificarEClicarEditarCadastro(textoPesquisa: string): Promise<void> {
        const linha = this.page.locator('tr', { has: this.page.getByText(textoPesquisa) });
        const botaoEditar = linha.getByRole('link', { name: '' });
        await expect(botaoEditar).toBeVisible();
        await botaoEditar.click();
    }

    async clicarExcluirCadastro() {
        await this.btnExcluirCadastro.click();
        await this.btnConfirmaExcluir.click();
    }


}