import { Page, Locator, expect } from '@playwright/test';

export class p_325 {
    readonly page: Page;
    
    // Elementos da página
    readonly campoPesquisa: Locator;
    readonly btnCadastro: Locator;
    readonly btnSalvar: Locator;
    readonly btnVoltar: Locator;
    readonly btnExcluir: Locator;
    readonly btnOK: Locator;
    readonly btnFecharNotificacao: Locator;
    readonly btnEditar: Locator;

    // Campos do formulário
    readonly campoCodigoBanco: Locator;
    readonly campoDescricao: Locator;
    readonly campoTipoLiquidacao: Locator;
    readonly campoDataConciliacao: Locator;
    readonly campoCaminhoLogotipo: Locator;
    readonly campoLinkBanco: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Inicializar locators
        this.campoPesquisa = page.getByRole('textbox', { name: 'Relatório de Pesquisa' });
        this.btnCadastro = page.locator('#B2334012294542409209');
        this.btnSalvar = page.locator('#B2334015419460409241');
        this.btnVoltar = page.getByRole('button', { name: 'Voltar' });
        this.btnExcluir = page.getByRole('button', { name: 'Excluir' });
        this.btnOK = page.getByRole('button', { name: 'OK' });
        this.btnFecharNotificacao = page.locator('button[title="Fechar Notificação"]');
        this.btnEditar = page.getByRole('link', { name: '' });

        // Campos do formulário
        this.campoCodigoBanco = page.locator('#P330_CODIGO_BANCO');
        this.campoDescricao = page.locator('#P330_DESCRICAO');
        this.campoTipoLiquidacao = page.locator('#P330_TIPO_LIQUIDACAO');
        this.campoDataConciliacao = page.locator('#P330_DATA_CONCILIACAO_BANCARIA_CCR');
        this.campoCaminhoLogotipo = page.locator('#P330_CAMINHO_LOGOTIPO');
        this.campoLinkBanco = page.locator('#P330_LINK_BANCO');
    }

    // Métodos de navegação
    async aguardarCarregamento() {
        await this.page.locator('#R2334005167570681352').waitFor({ state: 'visible', timeout: 30000 });
    }

    async acessarTelaCadastro() {
        await this.aguardarCarregamento();
        await this.btnCadastro.click();
    }

    // Métodos de preenchimento
    async preencherCamposBasicos(codigo: string = '88', descricao: string = 'Teste automatizado - Qualidade') {
        await this.campoCodigoBanco.fill(codigo);
        await this.campoDescricao.fill(descricao);
        await this.campoTipoLiquidacao.fill('1');
        await this.campoDataConciliacao.selectOption('C');
        await this.campoCaminhoLogotipo.fill('G:\\Sft\\fotos\\bb.bmp');
        await this.campoLinkBanco.fill('https://www.google.com/');
    }

    async marcarToggle(selector: string) {
        await this.page.locator(`${selector} + span.a-Switch-toggle`).click({ force: true });
        await expect(this.page.locator(selector)).toBeChecked();
    }

    async marcarTodosToggles() {
        const toggles = [
            '#P330_BANCO_CRECEBER',
            '#P330_RATEIO_CR',
            '#P330_RATEIO_CP',
            '#P330_GERA_PLANILHA_OPERACAO_VENDOR',
            '#P330_USA_SEG_DIGITO_VERIFICADOR',
            '#P330_GERA_INTEGRACAO_CONTABIL',
            '#P330_CONCILIA_EXTRATO',
            '#P330_SERASA',
            '#P330_PARTICIPA_FLUXO_CAIXA',
            '#P330_RELATORIO_CRECEBER',
            '#P330_CONSIDERA_INADIMPLENCIA',
            '#P330_LIMITE_CREDITO_EXTRA',
            '#P330_NOTA_DEBITO',
            '#P330_OBRIGAR_SEQ_PAR_BANCO_CHEQUE',
        ];

        for (const toggle of toggles) {
            await this.marcarToggle(toggle);
        }
    }

    // Métodos de ações
    async salvarCadastro() {
        await this.btnSalvar.click();
    }

    async fecharNotificacao() {
        await this.btnFecharNotificacao.waitFor({ state: 'visible', timeout: 10000 });
        await this.btnFecharNotificacao.click();
    }

    async pesquisarCadastro(texto: string) {
        await this.btnVoltar.click();
        await this.campoPesquisa.fill(texto);
        await this.campoPesquisa.press('Enter');
    }

    async verificarCadastroCriado(textoEsperado: string) {
        const elemento = this.page.getByText(textoEsperado, { exact: true });
        await elemento.waitFor({ state: 'visible', timeout: 30000 });
        await expect(elemento).toHaveText(textoEsperado);
        return elemento;
    }

    async excluirCadastro() {
        await this.btnEditar.click();
        await this.btnExcluir.click();
        await this.btnOK.click();
        await this.page.waitForTimeout(8000);
    }

    async realizarCadastroCompleto(codigo: string = '88', descricao: string = 'Teste automatizado - Qualidade') {
        await this.acessarTelaCadastro();
        await this.preencherCamposBasicos(codigo, descricao);
        await this.marcarTodosToggles();
        await this.salvarCadastro();
        await this.fecharNotificacao();
    }

    async preencherCadastroInvalido() {
        await this.campoDescricao.fill('Teste sem código');
        await this.campoTipoLiquidacao.fill('1');
        await this.campoDataConciliacao.selectOption('C');
        await this.campoCaminhoLogotipo.fill('G:\\Sft\\fotos\\bb.bmp');
        await this.campoLinkBanco.fill('https://www.google.com/');
    }

}