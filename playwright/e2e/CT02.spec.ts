import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('CT02 - Configuração do Veículo (Cores e Rodas) e Cálculo do Preço Base', async ({ page }) => {
  // Ensure the evidence directory exists
  const evidenceDir = path.join(process.cwd(), 'playwright', 'e2e', 'evidence', 'CT02');
  if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true });
  }

  // Id 1: Verificar o preço inicial de venda
  await page.goto('/configure');
  await page.waitForLoadState('networkidle');
  await expect(page.getByTestId('total-price')).toHaveText('R$ 40.000,00');
  await page.screenshot({ path: path.join(evidenceDir, 'CT02_Passo1_PrecoInicial.png') });

  // Id 2: Selecionar uma cor exterior diferente ("Midnight Black" ou "Lunar White")
  await page.getByTestId('color-option-midnight-black').click();
  await expect(page.getByTestId('total-price')).toHaveText('R$ 40.000,00');
  // Wait a little for the model rendering to update if there's any animation
  await page.waitForTimeout(500); 
  await page.screenshot({ path: path.join(evidenceDir, 'CT02_Passo2_CorAlterada.png') });

  // Id 3: Selecionar a opção de roda "Sport Wheels"
  await page.getByTestId('wheel-option-sport').click();
  await expect(page.getByTestId('total-price')).toHaveText('R$ 42.000,00');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(evidenceDir, 'CT02_Passo3_RodaSport.png') });

  // Id 4: Selecionar novamente a roda "Aero Wheels"
  await page.getByTestId('wheel-option-aero').click();
  await expect(page.getByTestId('total-price')).toHaveText('R$ 40.000,00');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(evidenceDir, 'CT02_Passo4_RodaAero.png') });
});
