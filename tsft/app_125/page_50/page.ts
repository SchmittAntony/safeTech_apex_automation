import { Page, Locator, expect } from '@playwright/test';

export class p_50 {
    readonly page: Page;

    // Elementos da página
    readonly btnFechaFiltroPesquisa: Locator;
    readonly btnAcessaCadastroPessoa: Locator;
    readonly campoNome: Locator;
    readonly campoTelPrincipal: Locator;
    readonly campoTelAlternativo: Locator;
    readonly campoEmail: Locator;
    readonly campoEmailFiscal: Locator;
    readonly campoCobranca: Locator;
    readonly campoCep: Locator;
    readonly campoCepPesquisa: Locator;
    readonly selCepPesquisa: Locator;
    readonly campoCNPJ: Locator;
    readonly campoNomeFantasia: Locator;
    readonly campoIE: Locator;
    readonly campoInscricaoMuni: Locator;
    readonly btnIncluirPessoa: Locator;
    readonly txtMensagemSucesso: Locator;
    readonly btnFechaMensagem: Locator;
    readonly campoPesquisa: Locator;
    readonly campoSubPesquisa: Locator;
    readonly selCadastroPessoa: Locator;
    readonly btnFiltrar: Locator;
    readonly btnAcessaCadastro: Locator;
    readonly btnCadastro: Locator;
    readonly txtConfirmaExclusao: Locator;
    readonly btnConfirmaExclusao: Locator;

    constructor(page: Page) {
        this.page = page;

        // elementos da pagina
        this.btnFechaFiltroPesquisa = page.getByRole('button', { name: ' Fechar' });
        this.btnAcessaCadastroPessoa = page.getByRole('button', { name: 'Nova Pessoa' });
        this.campoNome = page.getByRole('textbox', { name: ' Nome' });
        this.campoTelPrincipal = page.locator('#P50_TELEFONE_PRINCIPAL');
        this.campoTelAlternativo = page.locator('#P50_TELEFONE_ALTERNATIVO');
        this.campoEmail = page.getByRole('textbox', { name: 'Email', exact: true });
        this.campoEmailFiscal = page.getByRole('textbox', { name: 'Email Fiscal' });
        this.campoCobranca = page.getByRole('textbox', { name: 'Email Cobrança' });
        this.campoCep = page.locator('#P50_CEP_CONTAINER').getByRole('combobox', { name: 'CEP' });
        this.campoCepPesquisa = page.getByRole('textbox', { name: 'Pesquisar' });
        this.selCepPesquisa = page.getByRole('option', { name: '93800222 - AVENIDA JOAO' });
        this.campoCNPJ = page.getByRole('textbox', { name: 'CNPJ' });
        this.campoNomeFantasia = page.getByRole('textbox', { name: 'Nome Fantasia' });
        this.campoIE = page.getByRole('textbox', { name: 'I. E.', exact: true });
        this.campoInscricaoMuni = page.getByRole('textbox', { name: 'Inscrição Municipal' });
        this.btnIncluirPessoa = page.getByRole('button', { name: 'Incluir Pessoa' });
        this.txtMensagemSucesso = page.getByRole('heading', { name: 'Operação realizada com' });
        this.btnFechaMensagem = page.getByRole('button', { name: '' });
        this.campoPesquisa = page.getByRole('combobox', { name: 'Pessoa' });
        this.campoSubPesquisa = page.getByRole('textbox', { name: 'Pesquisar' });
        this.selCadastroPessoa = page.getByText('TESTE DE AUTOMAÇÃO SAFETECH');
        this.btnFiltrar = page.getByRole('button', { name: 'Filtrar' });
        this.btnAcessaCadastro = page.getByRole('link', { name: '' });
        this.btnCadastro = page.getByRole('button', { name: 'Excluir' });
        this.txtConfirmaExclusao = page.getByText('Deseja mesmo deletar esse');
        this.btnConfirmaExclusao = page.getByRole('button', { name: 'OK' });

    };

    async acessaCadastroPessoa() {
        await this.btnFechaFiltroPesquisa.click();
        await this.btnAcessaCadastroPessoa.click();
    };

    async cadastroPessoaJuridica() {
        await this.preencherNome();
        await this.preencherCampoTelPrincipal();
        await this.preencherCampoTelAlternativo();
        await this.preecherCampoEmail();
        await this.preencherCampoEmailFiscal();
        await this.preencherCampoCobranca();
        await this.preencherCampoCep();
        await this.preencherCampoCNPJ();
        await this.preencherCampoNomeFantasia();
        await this.preencherCampoIE();
        await this.preencherCampoInscricaoMuni();
        await this.salvarCadastroPessoa();
    };

    async consultaCadastroPessoa() {
        await this.campoPesquisa.click();
        await this.campoSubPesquisa.fill('TESTE DE AUTOMAÇÃO SAFETECH');
        await this.campoSubPesquisa.press('Enter');
        await this.selCadastroPessoa.click();
        await this.btnFiltrar.click();
    }

    async excluirCadastroPessoa() {
        await this.btnAcessaCadastro.click();
        await this.btnCadastro.click();
        await expect(this.txtConfirmaExclusao).toBeVisible();
        await this.btnConfirmaExclusao.click();
        await expect(this.txtMensagemSucesso).toBeVisible();
        await this.btnFechaMensagem.click();
    }

    // dados do cadastro
    async preencherNome() {
        await this.campoNome.click();
        await this.campoNome.fill('TESTE DE AUTOMAÇÃO SAFETECH');
    };

    async preencherCampoTelPrincipal() {
        await this.campoTelPrincipal.click();
        await this.campoTelPrincipal.fill('51995472650');
    };

    async preencherCampoTelAlternativo() {
        await this.campoTelAlternativo.click();
        await this.campoTelAlternativo.fill('51995472650');
    };

    async preecherCampoEmail() {
        await this.campoEmail.click();
        await this.campoEmail.fill('teste@gmail.com');
    };

    async preencherCampoEmailFiscal() {
        await this.campoEmailFiscal.click();
        await this.campoEmailFiscal.fill('teste@gmail.com');
    };

    async preencherCampoCobranca() {
        await this.campoCobranca.click();
        await this.campoCobranca.fill('teste@gmail.com');
    };

    async preencherCampoCep() {
        await this.campoCep.click();
        await this.campoCepPesquisa.fill('93800222')
        await this.campoCepPesquisa.press('Enter');
        await this.selCepPesquisa.click();
    };

    async preencherCampoCNPJ() {
        await this.campoCNPJ.click();
        await this.campoCNPJ.fill('20160783000188');
    };

    async preencherCampoNomeFantasia() {
        await this.campoNomeFantasia.click();
        await this.campoNomeFantasia.fill('SAFETECH');
    };

    async preencherCampoIE() {
        await this.campoIE.click();
        await this.campoIE.fill('1310108738');
    };

    async preencherCampoInscricaoMuni() {
        await this.campoInscricaoMuni.click();
        await this.campoInscricaoMuni.fill('03974110013');
    };

    async salvarCadastroPessoa() {
        await this.btnIncluirPessoa.click();
        await expect(this.txtMensagemSucesso).toBeVisible();
        await this.btnFechaMensagem.click();
    };
}