import { Page, Locator, expect } from '@playwright/test';

export class p_640 {
    readonly page: Page;

    // Elementos da pagina
    readonly btnModalCadastro: Locator;
    readonly btnSalvarCadastro: Locator;
    readonly btnFecharNotificacao: Locator;
    readonly campoPesquisaCadastro: Locator;
    readonly btnExcluirCadastro: Locator;
    readonly btnConfirmaExcluir: Locator;
    readonly btnVoltarHome: Locator;
    readonly campoIdCategoria: Locator;
    readonly validaId: Locator;
    readonly btnEditarCadastro: Locator;


    // Elementos do cadastro
    readonly campoCodigoCategoria: Locator;
    readonly selTipoCategoria: Locator;
    readonly campoDescricao: Locator;
    
    readonly selBanco: Locator;
    readonly selBancoSelecionado: Locator;

    constructor(page: Page) {
        this.page = page;

        //Elementos da pagina
        this.btnModalCadastro = page.getByRole('button', { name: 'Nova Categoria' });
        this.btnSalvarCadastro = page.getByRole('button', { name: 'Incluir Categoria Lançamento' });
        this.btnFecharNotificacao = page.locator('button[title="Fechar Notificação"]');
        this.btnVoltarHome = page.getByRole('button', { name: 'Voltar' });
        this.campoPesquisaCadastro = page.getByRole('textbox', { name: 'Relatório de Pesquisa' });
        this.btnExcluirCadastro = page.getByRole('button', { name: 'Excluir' });
        this.btnConfirmaExcluir = page.getByRole('button', { name: 'OK' });
        this.btnVoltarHome = page.getByRole('button', { name: 'Voltar' });
        this.validaId = page.getByLabel('Código CategoriaCrescente');
        this.btnEditarCadastro = page.getByRole('link', { name: '' });
        this.campoIdCategoria = page.locator('#P645_CODIGO_CATEGORIA');

        //Elementos do cadastro
        this.campoCodigoCategoria = page.locator('#P645_CODIGO_CATEGORIA');
        this.selTipoCategoria = page.locator('#P645_TIPO_CATEGORIA')
        this.campoDescricao = page.locator('#P645_DESCRICAO')
    
        this.selBanco = page.locator('#P645_CODIGO_BANCO_lov_btn')
        this.selBancoSelecionado = page.getByRole('option', { name: '1 - BANCO DO BRASIL S/A' });

    }

 
    async navegarParaCadastro() {
        await this.btnModalCadastro.click();
    }

    async preencherCadastro() {
        await this.campoCodigoCategoria.fill('996');
        await this.selTipoCategoria.selectOption('C');
        await this.campoDescricao.fill('TESTE QUALIDADE - QA');
        
        await this.selBanco.click();
        await this.selBancoSelecionado.click();
        
    }

    async clicarSalvarCadastro() {
        await this.btnSalvarCadastro.click();
    }

    async clicarFecharNotificacao() {
        await this.btnFecharNotificacao.waitFor({ state: 'visible', timeout: 5000 });
        await this.btnFecharNotificacao.click();
    }

    async pesquisaCadastro() {
        const categoriaCriada = await this.campoIdCategoria.inputValue();
        await this.btnVoltarHome.click();
        await this.campoPesquisaCadastro.fill(categoriaCriada);
        await this.campoPesquisaCadastro.press('Enter');

        const verificaCategoria = await this.validaId.filter({ hasText: categoriaCriada }).first();
        await expect(verificaCategoria).toHaveText(categoriaCriada);

        const btnEditar = await this.btnEditarCadastro
        await expect(btnEditar).toBeVisible({ timeout: 40000 });
        await btnEditar.click({ force: true });
        
    }

    async clicarExcluirCadastro() {
        await this.btnExcluirCadastro.click();
        await this.btnConfirmaExcluir.click();   
    }

    async preencherCadastroInvalido() {
        await this.selTipoCategoria.selectOption('D');
        await this.campoDescricao.fill('TESTE QUALIDADE - QA');
        
        await this.selBanco.click();
        await this.selBancoSelecionado.click();
    }

}