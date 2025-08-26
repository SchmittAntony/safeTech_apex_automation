import { Page, Locator, expect } from '@playwright/test';

export class p_530 {
    readonly page: Page;

    //Elementos da pagina
    readonly btnModalCadastro: Locator;
    readonly btnSalvarCadastro: Locator;
    readonly btnFecharNotificacao: Locator;
    readonly btnExcluirCadastro: Locator;
    readonly btnConfirmaExcluir: Locator;
    readonly btnVoltaHome: Locator;

    //Campos do Cadastro
    readonly campoDescricao: Locator;
    readonly campoAbreviacao: Locator;
    readonly campoOrderRelatorio: Locator;
    readonly tglRelComissao: Locator;
    readonly selTipoMovimento: Locator;
    readonly selTipoPamentoCmissao: Locator;

    constructor(page: Page) {
        this.page = page;

        //Elementos da pagina
        this.btnModalCadastro = page.getByRole('button', { name: 'Novo Tipo Movimento Comissão' });
        this.btnSalvarCadastro = page.getByRole('button', { name: 'Incluir Tipo Movimento Comiss' });
        this.btnFecharNotificacao = page.getByRole('button', { name: '' });
        this.btnExcluirCadastro = page.getByRole('button', { name: 'Excluir' });
        this.btnConfirmaExcluir = page.getByRole('button', { name: 'OK' });
        this.btnVoltaHome = page.getByRole('button', { name: 'Voltar' });

        //Campos do Cadastro
        this.campoDescricao = page.getByRole('textbox', { name: ' Descrição' });
        this.campoAbreviacao = page.getByRole('textbox', { name: 'Abreviação' });
        this.campoOrderRelatorio = page.getByRole('textbox', { name: ' Ordem Relatório' });
        this.tglRelComissao = page.locator('#P535_RELATORIO_CONTAINER span').nth(1);
        this.selTipoMovimento = page.getByLabel('Tipo Movimento');
        this.selTipoPamentoCmissao = page.getByLabel('Tipo Pagamento Comissão');
    }

    async nevegarParaCadastro() {
        await this.btnModalCadastro.click();
    }

    async preencherCadastro() {
        await this.campoDescricao.fill('Teste de Qualidade - QA');
        await this.campoAbreviacao.fill('QA');
        await this.campoOrderRelatorio.fill('6');
        await this.tglRelComissao.click();
        await this.selTipoMovimento.selectOption('P');
        await this.selTipoPamentoCmissao.selectOption('F');
    }

    async clicarSalvarCadastro() {
        await this.btnSalvarCadastro.click();
    }

    async clicarExcluirCadastro() {
        await this.btnExcluirCadastro.click();
        await this.btnConfirmaExcluir.click();
    }

    async clicarFecharNotificacao() {
        await this.btnFecharNotificacao.click();
    }

    async preencherCamposInvalido() {
        await this.campoDescricao.fill('Teste de Qualidade - QA');
        await this.campoAbreviacao.fill('QA');
        await this.campoOrderRelatorio.fill('6');
    }

    async navegarParaHome() {
        await this.btnVoltaHome.click();
    }

}