import { test, expect } from '@playwright/test';
import { login } from '../../support/login';

test('Acesso APP245_325', async ({ page, context }) => {
    await login(page);
    
    // 1. Clicar para abrir a nova janela
    await page.locator('#arvere_tree_19 > span.a-TreeView-toggle').click();
    await page.locator('#arvere_tree_491').isVisible();
    await page.locator('#arvere_tree_491 > span.a-TreeView-toggle').click();
    
    // 2. Aguardar o evento de abertura de nova janela
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Fica aguardando a nova janela
        page.locator('#arvere_tree_499').click() // Ação que abre a janela
    ]);
    
    // 3. Verificações na nova janela
    await newPage.waitForLoadState('domcontentloaded');
    console.log('Nova URL:', newPage.url());
    
    // 4. Validação básica
    await expect(newPage).toHaveTitle('Banco'); // Adapte
    // await expect(newPage.locator('algum-seletor-unico')).toBeVisible();

});
