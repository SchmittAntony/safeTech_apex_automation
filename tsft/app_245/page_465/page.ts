import { Page, Locator, expect } from '@playwright/test';

export class p_465{
    readonly page: Page;

    // Elementos da página
    readonly btnModalCadastro: Locator;
    readonly btnSalvaCadastro: Locator;
    readonly btnFechaNotificacao: Locator;
    readonly btnExcluirCadastro: Locator;
    readonly btnConfirmaExcluir: Locator;

    // Campos do cadastro
    readonly campoCodigo: Locator;
    readonly campoDescricao: Locator;
    
    readonly selVencimentoBoleto: Locator;
    readonly selTesteQa: Locator;
    
    readonly selFinanceiroEntrada: Locator;
    readonly selEntrada: Locator;

    readonly selFinanceiroPagamento: Locator;
    readonly selBaixaConhecimento: Locator;

    readonly selTipoDocumento: Locator;


    constructor(page: Page) {
        this.page = page;

        // Elementos da página
        this.btnModalCadastro = page.getByRole('button', { name: 'Novo Tipo Vencimento Boleto' });
        this.btnSalvaCadastro = page.getByRole('button', { name: 'Incluir Tipo Vencimento Boleto' });
        this.btnFechaNotificacao = page.locator('button[title="Fechar Notificação"]');
        this.btnExcluirCadastro = page.getByRole('button', { name: 'Excluir' });
        this.btnConfirmaExcluir = page.getByRole('button', { name: 'OK' });

        // Campos do cadastro
        this.campoCodigo = page.getByRole('textbox', { name: ' Código (Valor Necessário)' });
        this.campoDescricao = page.getByRole('textbox', { name: ' Descrição (Valor Necessário)' });
    
        this.selVencimentoBoleto = page.locator('#P470_CODIGO_AGRUP_TP_VENCTO_BOL_lov_btn');
        this.selTesteQa = page.getByRole('option', { name: '- TESTE QA' });
    
        this.selFinanceiroEntrada = page.locator('#P470_CODIGO_MOVIMENTO_lov_btn');
        this.selEntrada = page.getByRole('option', { name: '155 - ENTRADA' });

        this.selFinanceiroPagamento = page.locator('#P470_CODIGO_MOVIMENTO_PAGTO_lov_btn');
        this.selBaixaConhecimento = page.getByRole('option', { name: '- BAIXA CONHECIMENTO FRETE' });

        this.selTipoDocumento = page.getByLabel('Tipo Documento (Valor Necessá');
    }

    //Métados

    //Métado Modal de cadastro
    async navegarParaCadastro() {
        await this.btnModalCadastro.click();
    }

    //Métado preencher cadastro
    async preencherCadastro() {
        await this.campoCodigo.fill('48');
        await this.campoDescricao.fill('Teste Qualidade - QA');
    
        await this.selVencimentoBoleto.click();
        await this.selTesteQa.click();
    
        await this.selFinanceiroEntrada.click();
        await this.selEntrada.click();

        await this.selFinanceiroPagamento.click();
        await this.selBaixaConhecimento.click();

        await this.selTipoDocumento.selectOption('D');
    }

    //Métado salvar cadastro
    async clicarSalvarCadastro() {
        await this.btnSalvaCadastro.click();
    }

    //Métado Fechar notificação
    async clicarFecharNotificacao() {
        await this.btnFechaNotificacao.waitFor({ state: 'visible', timeout: 5000 });
        await this.btnFechaNotificacao.click();
    }

    async clicarExcluirCadastro() {
        await this.btnExcluirCadastro.click();
        await this.btnConfirmaExcluir.click();
    }

    async preencherCadastroInvalido() {
        await this.campoCodigo.fill('48');
        await this.selVencimentoBoleto.click();
        await this.selTesteQa.click();
    }

}