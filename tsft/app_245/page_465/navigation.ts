
import { Page, BrowserContext, expect } from '@playwright/test';
import { login } from '../../support/login';

export async function acessoAPP245_465(page: Page, context: BrowserContext) {
    await login(page);

    // Pesquisa pagina
    const buttonFinanceiro = await page.locator('div').filter({ hasText: /^Financeiro$/ })
    await buttonFinanceiro.isVisible();

    let newPage: Page | null = null;
    let attempts = 0;
    const maxAttempts = 2; // Número máximo de tentativas

    while (attempts < maxAttempts && !newPage) {
        try {
            attempts++;
            console.log(`Tentativa ${attempts} de ${maxAttempts}`);

            const [pageResult] = await Promise.all([
                context.waitForEvent('page', { timeout: 10000 }), // Reduzido para 10 segundos
                buttonFinanceiro.click()
            ]);

            newPage = pageResult;
            break;

        } catch (error) {
            console.log(`Tentativa ${attempts} falhou: ${error.message}`);

            // Não há espera entre as tentativas - próxima tentativa acontece imediatamente
            if (attempts >= maxAttempts) {
                throw new Error('Falha ao abrir a nova janela após todas as tentativas');
            }
        }
    }

    // 3. Verificações na nova janela
    await newPage.waitForLoadState('domcontentloaded');

    // 4. Validação básica
    await expect(newPage).toHaveTitle('Financeiro');

    // acessa Cadastros
    await newPage.getByRole('link', { name: ' Cadastros' }).click();

    // acessa pagina
    await newPage.getByRole('link', { name: ' Tipo Vencimento Boleto' }).click();

    return newPage;
}