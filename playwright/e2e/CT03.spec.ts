import { test } from '../support/fixtures'

test.describe('CT03 - Configuração do Veículo (Adição de Opcionais) e Cálculo de Preço', () => {
  test.beforeEach(async ({ app }) => {
    await app.configurator.openFresh({ assertBasePrice: true })
  })

  test('deve atualizar preço com opcionais e persistir no checkout', async ({
    app,
  }) => {
    const { configurator } = app
    const precision = configurator.optionalCheckbox(/Precision Park/)
    const flux = configurator.optionalCheckbox(/Flux Capacitor/)

    await precision.click()
    await configurator.expectTotalPrice('R$ 45.500,00')

    await flux.click()
    await configurator.expectTotalPrice('R$ 50.500,00')

    await precision.click()
    await configurator.expectTotalPrice('R$ 45.000,00')

    await flux.click()
    await configurator.expectTotalPrice('R$ 40.000,00')

    await configurator.proceedToOrder()
    await configurator.expectOrderSummaryTotal('R$ 40.000,00')
  })
})
