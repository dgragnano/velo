import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('CT03 - Configuração do Veículo (Adição de Opcionais) e Cálculo de Preço', async ({ page }) => {
  const evidenceDir = path.join(process.cwd(), 'playwright', 'e2e', 'evidence', 'CT03');
  if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true });
  }

  // Pré-Condições
  await page.goto('/configure');
  await page.waitForLoadState('networkidle');
  await expect(page.getByTestId('total-price')).toHaveText('R$ 40.000,00');

  // Id 1: Marcar o checkbox do opcional "Precision Park"
  await page.getByTestId('opt-precision-park').click();
  await expect(page.getByTestId('total-price')).toHaveText('R$ 45.500,00');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(evidenceDir, 'CT03_Passo1_PrecisionPark.png') });

  // Id 2: Marcar o checkbox do opcional "Flux Capacitor"
  await page.getByTestId('opt-flux-capacitor').click();
  await expect(page.getByTestId('total-price')).toHaveText('R$ 50.500,00');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(evidenceDir, 'CT03_Passo2_FluxCapacitor.png') });

  // Id 3: Desmarcar os checkboxes dos opcionais
  await page.getByTestId('opt-precision-park').click();
  await page.getByTestId('opt-flux-capacitor').click();
  await expect(page.getByTestId('total-price')).toHaveText('R$ 40.000,00');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(evidenceDir, 'CT03_Passo3_DesmarcarOpcionais.png') });

  // Re-select them to test persistence in Step 4
  await page.getByTestId('opt-precision-park').click();
  await page.getByTestId('opt-flux-capacitor').click();
  await expect(page.getByTestId('total-price')).toHaveText('R$ 50.500,00');

  // Id 4: Clicar no botão "Monte o Seu" (Checkout)
  await page.getByTestId('checkout-button').click();
  await expect(page).toHaveURL(/.*\/order/);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(evidenceDir, 'CT03_Passo4_Checkout.png') });
});
