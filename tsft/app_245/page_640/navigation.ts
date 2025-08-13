import { Page, BrowserContext, expect } from '@playwright/test';
import { login } from '../../support/login';


export async function acessoAPP245_640(page: Page, context: BrowserContext) {
    await login(page);

    // 1. Clicar para abrir a nova janela
    await page.locator('#arvere_tree_20 > span.a-TreeView-toggle').click();
    await page.locator('#arvere_tree_494').isVisible();
    await page.locator('#arvere_tree_494 > span.a-TreeView-toggle').click();

    // 2. Aguardar o evento de abertura de nova janela
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Fica aguardando a nova janela
        page.locator('#arvere_tree_505').click() // Ação que abre a janela
    ]);

    // 3. Verificações na nova janela
    await newPage.waitForLoadState('domcontentloaded');
    console.log('Nova URL:', newPage.url());

    // 4. Validação básica
    await expect(newPage).toHaveTitle('Categoria Lançamento Extrato'); // Adapte se necessário

    return newPage;
}
