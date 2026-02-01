import { test, expect } from '@playwright/test';

/// AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/');


  // Arrange
  //Checkpoint  
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();

  //Checkpoint
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');


  // Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-MMXKY1');

  await page.getByTestId('search-order-button').click();

  // Assert

  await expect(page.getByTestId('order-result-id')).toContainText('VLO-MMXKY1');

  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');


});