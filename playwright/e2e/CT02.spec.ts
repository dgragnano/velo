import { test } from '../support/fixtures'

test.describe('Configuração do Veículo (Cores e Rodas) e Cálculo do Preço Base', () => {
  test.beforeEach(async ({ app }) => {
    await app.configurator.openFresh()
  })

  // Cenário 1: Validação exclusiva da troca de cor
  test('deve refletir a troca de cor corretamente na imagem e no preço', async ({
    app,
  }) => {
    const { configurator } = app

    await configurator.expectTotalPrice('R$ 40.000,00')

    await configurator.selectColor('Midnight Black')

    await configurator.expectCarExteriorImage(/midnight-black/i, /midnight-black-aero-wheels/i)

    await configurator.expectTotalPrice('R$ 40.000,00')
  })

  // Cenário 2: Validação exclusiva da troca de rodas
  test('deve refletir a troca de rodas corretamente na imagem e no preço', async ({
    app,
  }) => {
    const { configurator } = app

    await configurator.expectTotalPrice('R$ 40.000,00')

    await configurator.selectWheels(/Sport Wheels/)

    await configurator.expectCarExteriorImage(/sport wheels/i, /glacier-blue-sport-wheels/i)

    await configurator.expectTotalPrice('R$ 42.000,00')

    await configurator.selectWheels(/Aero Wheels/)

    await configurator.expectTotalPrice('R$ 40.000,00')
  })
})
