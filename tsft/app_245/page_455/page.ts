import { Page, Locator, expect } from '@playwright/test';

export class p_455 {
    readonly page: Page;

    // Elementos da página
    readonly btnModalCadastro: Locator;
    readonly btnSalvaCadastro: Locator;
    readonly btnFechaMensagem: Locator;
    readonly btnExcluiCadastro: Locator;
    readonly btnExcluiConfirma: Locator;

    // Campos do formulário
    readonly campoDescricao: Locator;
    readonly selTipoSistema: Locator;
    readonly selTipoPagamento: Locator;
    readonly selTipoMovimentoCobranca: Locator;
    readonly salLiquidacaoTarifa: Locator;
    readonly selTipoAutomacao: Locator;
    readonly selModalidadeFormaPagmento: Locator;
    readonly selDinheiro: Locator;
    readonly tglEmiteNotaDebito: Locator;
    readonly tglPagoCartorio: Locator;


    constructor(page: Page) {
        this.page = page;

        //Elementos da pagina
        this.btnModalCadastro = page.getByRole('button', { name: 'Nova Forma Pagamento Documento' });
        this.btnSalvaCadastro = page.getByRole('button', { name: 'Incluir Forma de Pagamento' });
        this.btnFechaMensagem = page.getByRole('button', { name: '' });
        this.btnExcluiCadastro = page.getByRole('button', { name: 'Excluir' });
        this.btnExcluiConfirma = page.getByRole('button', { name: 'OK' });
        
        //Campos cadastro
        this.campoDescricao = page.getByRole('textbox', { name: ' Descrição' });
        this.selTipoSistema = page.getByLabel('Tipo Sistema');
        this.selTipoPagamento = page.getByLabel('Tipo Pagamento');
        this.selTipoMovimentoCobranca = page.locator('#P460_CODIGO_MOVTO_PAGTO_DOC_lov_btn');
        this.salLiquidacaoTarifa = page.getByRole('option', { name: '149 - LIQUIDACAO TARIFA' });
        this.selTipoAutomacao = page.getByLabel('Tipo Automação');
        this.selModalidadeFormaPagmento = page.locator('#P460_ID_MODALIDADE_FORMA_PAGTO_lov_btn');
        this.selDinheiro = page.getByRole('option', { name: '- DINHEIRO' });
        this.tglEmiteNotaDebito = page.locator('#P460_EMITE_NOTA_DEBITO_CONTAINER span');
        this.tglPagoCartorio = page.locator('#P460_PAGO_CARTORIO_CONTAINER span');
    }

    //Métados
    //Métado preenchimento de cadastro
    async preencherCadastro() {
        await this.campoDescricao.fill('Teste Qualidade - QA');
        await this.selTipoSistema.selectOption('CP');
        await this.selTipoPagamento.selectOption('A');
        await this.selTipoMovimentoCobranca.click({ force: true});
        await this.salLiquidacaoTarifa.click();
        await this.selTipoAutomacao.selectOption('P');
        await this.selModalidadeFormaPagmento.click();
        await this.selDinheiro.click();
        await this.tglEmiteNotaDebito.nth(1).click();
        await this.tglPagoCartorio.nth(1).click();
    }

    //Métado Salvar Cadastro
    async salvarCadastro() {
        await this.btnSalvaCadastro.click();
    }

    //Métado excluir cadastro
    async excluirCadastro(){
        await this.btnFechaMensagem.click();
        await this.btnExcluiCadastro.click();
        await this.btnExcluiConfirma.click();
    }

    async navegarParaCadastro(){
        await this.btnModalCadastro.click();
    }

    async preencherCadastroInvalido(){
        await this.campoDescricao.fill('Teste Qualidade - QA');
        await this.selTipoPagamento.selectOption('A');
        await this.tglEmiteNotaDebito.nth(1).click();
    }

}