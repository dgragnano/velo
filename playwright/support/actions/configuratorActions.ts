import { Page, expect } from '@playwright/test'

export function createConfiguratorActions(page: Page) {
  const totalPrice = page.getByTestId('total-price')
  const carExteriorImage = page.getByTestId('car-exterior-image')
  const modelHeading = page.getByRole('heading', { name: 'Velô Sprint' })
  const buildButton = page.getByRole('button', { name: 'Monte o Seu' })

  return {
    optionalCheckbox(name: string | RegExp) {
      return page.getByRole('checkbox', { name })
    },

    async openFresh(options?: { assertBasePrice?: boolean }) {
      await page.addInitScript(() => {
        localStorage.removeItem('velo-configurator-storage')
      })
      await page.goto('/configure')
      await expect(modelHeading).toBeVisible()
      if (options?.assertBasePrice) {
        await expect(totalPrice).toHaveText('R$ 40.000,00')
      }
    },

    async selectColor(buttonName: string) {
      await page.getByRole('button', { name: buttonName }).click()
    },

    async selectWheels(name: string | RegExp) {
      await page.getByRole('button', { name }).click()
    },

    async expectTotalPrice(text: string) {
      await expect(totalPrice).toHaveText(text)
    },

    async expectCarExteriorImage(alt: RegExp, src: RegExp) {
      await expect(carExteriorImage).toHaveAttribute('alt', alt)
      await expect(carExteriorImage).toHaveAttribute('src', src)
    },

    async proceedToOrder() {
      await buildButton.click()
      await expect(page).toHaveURL(/\/order$/)
      await expect(
        page.getByRole('heading', { name: 'Finalizar Pedido' }),
      ).toBeVisible()
    },

    async expectOrderSummaryTotal(text: string) {
      await expect(page.getByTestId('summary-total-price')).toHaveText(text)
    },
  }
}
