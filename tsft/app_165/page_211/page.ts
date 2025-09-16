import { Page, Locator, expect } from '@playwright/test';

export class p_211 {
    readonly page: Page;

    // Elementos da página
    readonly btnConsultar: Locator;
    readonly btnItens: Locator;
    readonly selItem: Locator;
    readonly btnConsutaItens: Locator;
    readonly campoEstoque: Locator;
    readonly btnFechaBuscarItens: Locator;
    readonly txtMensagemErroConsulta: Locator;
    readonly btnFechaMensagemErro: Locator;

    constructor(page: Page) {
        this.page = page;

        // elementos da pagina
        this.btnConsultar = page.getByRole('button', { name: 'Consultar' });
        this.btnItens = page.locator('iframe[title="Consultar"]').contentFrame().locator('#P212_CODIGO_ITEM_lov_btn');
        this.selItem = page.getByRole('option', { name: '10 - 1003 01 HAPPY SAPATO' });
        this.btnConsutaItens = page.locator('iframe[title="Consultar"]').contentFrame().getByRole('button', { name: 'Consultar' });
        this.campoEstoque = page.getByText('Item 10 - 1003 01 HAPPY SAPATO TENIS VERMELHO Grupo: 2 - PRODUTO PRONTO');
        this.txtMensagemErroConsulta = page.locator('iframe[title="Consultar"]').contentFrame().getByRole('heading', { name: 'Ocorreu 1 erro' });
        this.btnFechaMensagemErro = page.locator('iframe[title="Consultar"]').contentFrame().getByRole('button', { name: '' });
    };

    async acessaModalConsulta() {
        await this.btnConsultar.click();
    };

    async selecionaItem() {
        await this.btnItens.click();
        await this.selItem.click();
    };

    async consutaItem() {
        await this.btnConsutaItens.click()
    };

    async verificaEstoque() {
        await expect(this.campoEstoque).toBeVisible();
    };

    async verificaMensagemErroConsulta() {
        await this.txtMensagemErroConsulta.waitFor({ state: 'visible' });
        await expect(this.txtMensagemErroConsulta).toBeVisible();
    };

    async fechaMensagemErro() {
        await this.btnFechaMensagemErro.click();
    };

    async fechaModal() {
        await this.btnFechaBuscarItens.click();
    };
}