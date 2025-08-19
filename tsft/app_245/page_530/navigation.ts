import { Page, BrowserContext, expect } from '@playwright/test';
import { login } from '../../support/login';


export async function acessoAPP245_530(page: Page, context: BrowserContext) {
    await login(page);

    // Pesquisa pagina
    const buttonFinanceiro = await page.locator('div').filter({ hasText: /^Financeiro$/ })
    await buttonFinanceiro.isVisible();

    // 2. Aguardar o evento de abertura de nova janela
    const [newPage] = await Promise.all([
        context.waitForEvent('page', { timeout: 60000 }), // Fica aguardando a nova janela
        buttonFinanceiro.click() // Ação que abre a janela
    ]);

    // 3. Verificações na nova janela
    await newPage.waitForLoadState('domcontentloaded');
    console.log('Nova URL:', newPage.url());

    // 4. Validação básica
    await expect(newPage).toHaveTitle('Financeiro'); // Adapte se necessário

    // acessa Cadastros
    await newPage.getByRole('link', { name: ' Cadastros' }).click();

    // acessa pagina
    await newPage.getByRole('link', { name: ' Tipo Movimento Comissão' }).click();

    return newPage;
}
