
export function gerarCodigos(): string {
  const codigo = Math.floor(Math.random() * 1000); // 0 a 999
  return codigo.toString().padStart(3, '0'); // completa com zeros à esquerda
};

export async function validarCampoCodigoDisplay(page, codigoBancoInicial) {
    let codigoBanco = codigoBancoInicial;
    const campoDisplay = page.locator('#P330_CODIGO_BANCO_DISPLAY');

    for (let tentativa = 1; tentativa <= 3; tentativa++) {
        // Se o campo já está visível, encerra
        if (await campoDisplay.isVisible()) {
            return codigoBanco;
        }

        // Fecha notificação de erro, se existir
        const botaoFecharNotificacao = page.locator('button[title="Fechar Notificação"]');
        if (await botaoFecharNotificacao.isVisible({ timeout: 2000 }).catch(() => false)) {
            await botaoFecharNotificacao.click();
        }

        // Gerar novo código se não for a primeira tentativa
        if (tentativa > 1) {
            codigoBanco = gerarCodigos();
        }

        // Preencher e salvar
        await page.locator('#P330_CODIGO_BANCO').fill(codigoBanco);
        await page.locator('#B2334015419460409241').click();

        // Esperar um pouco para ver se o campo aparece
        try {
            await campoDisplay.waitFor({ state: 'visible', timeout: 5000 });
            return codigoBanco; // Sucesso
        } catch {
            if (tentativa === 3) {
                throw new Error("Não foi possível criar o banco após 3 tentativas.");
            }
        }
    }
};

