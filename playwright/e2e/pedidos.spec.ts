import { test, expect } from '@playwright/test'

import { generateOrderCode } from '../support/helpers'

import { OrderLookupPage } from '../support/pages/OrderLookupPage'

/// AAA - Arrange, Act, Assert

//agrupador de cenários de teste
test.describe('Consulta de Pedidos', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })


  test('deve consultar um pedido aprovado', async ({ page }) => {
    //Teste Data
    //const order = 'VLO-MMXKY1'

    const order = {
      number: 'VLO-MMXKY1',
      status: 'APROVADO',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Douglas Teste',
        email: 'email@email.com'
      },
      payment: 'À Vista'
    }

    // Act

    const orderLookupPage = new OrderLookupPage(page)

    await orderLookupPage.buscar(order.number)


    // Assert

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

    const statusBadge = page.getByRole('status').filter({ hasText: 'APROVADO' })
    await expect(statusBadge).toHaveClass(/bg-green-100/)
    await expect(statusBadge).toHaveClass(/text-green-700/)

    const statusIcon = statusBadge.locator('svg')
    await expect(statusIcon).toHaveClass(/lucide-circle-check-big/)

  })

  test('deve consultar um pedido reprovado', async ({ page }) => {

    //Teste Data
    //const order = 'VLO-CYYEJJ'

    const order = {
      number: 'VLO-CYYEJJ',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Senhor Madruga',
        email: 'madruga@chaves.com'
      },
      payment: 'À Vista'
    }

    // Act
    const orderLookupPage = new OrderLookupPage(page)

    await orderLookupPage.buscar(order.number)


    // Assert

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

    const statusBadge = page.getByRole('status').filter({ hasText: 'REPROVADO' })
    await expect(statusBadge).toHaveClass(/bg-red-100/)
    await expect(statusBadge).toHaveClass(/text-red-700/)

    const statusIcon = statusBadge.locator('svg')
    await expect(statusIcon).toHaveClass(/lucide-circle-x/)

  })

  test('deve consultar um pedido em análise', async ({ page }) => {

    //Teste Data
    //const order = 'VLO-CYYEJJ'

    const order = {
      number: 'VLO-CZ30J2',
      status: 'EM_ANALISE',
      color: 'Glacier Blue',
      wheels: 'sport Wheels',
      customer: {
        name: 'José Bernardes',
        email: 'bernardes@jose.com'
      },
      payment: 'À Vista'
    }

    // Act
    const orderLookupPage = new OrderLookupPage(page)

    await orderLookupPage.buscar(order.number)


    // Assert

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

    const statusBadge = page.getByRole('status').filter({ hasText: 'EM_ANALISE' })
    await expect(statusBadge).toHaveClass(/bg-amber-100/)
    await expect(statusBadge).toHaveClass(/text-amber-700/)

    const statusIcon = statusBadge.locator('svg')
    await expect(statusIcon).toHaveClass(/lucide-clock/)


  })


  test('deve exibir mensagem para pedido não encontrado', async ({ page }) => {

    const order = generateOrderCode()

    const orderLookupPage = new OrderLookupPage(page)

    await orderLookupPage.buscar(order)

    /* Verificação feita pelo codegen com a opção 'Assert text' mas nao é a melhor validação, pois está verificando em todo o html (root), já que a página HTML não tem todos os IDs (acessibilidade) para a localização dos elementos
      await expect(page.locator('#root')).toContainText('Pedido não encontrado');
      await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente')
     */

    /* Essa estratégia de busca de elemento não dá certo pois o parametro 'paragraph' nao é uma area role válida para consulta nesse contexto  
    const title = page.getByRole('heading', {name:'Pedido não encontrado' })
    await expect(title).toBeVisible()
    
    const message = page.getByRole('paragraph', {name: 'Verifique o número do pedido e tente novamente'})
    await expect(message).toBeVisible() */

    /* A estratégia com o xpath dá certo e é um pouco melhor, pois há 2 verificações em conjunto (o elemento p + o texto), mas ainda nao é a melhor escolha
    const title = page.getByRole('heading', {name:'Pedido não encontrado' })
    await expect(title).toBeVisible()
    
    const message = page.locator('//p[text()="Verifique o número do pedido e tente novamente"]')
    await expect(message).toBeVisible()
     */

    /* Essa estratégia é quase a ideal pois não usa XPath e usa o playwright "puro" para localizar o elemento 'p' e seu texto correspondente e a sintaxe fica mais clara
    const title = page.getByRole('heading', {name:'Pedido não encontrado' })
    await expect(title).toBeVisible()
    
    const message = page.locator('p', {hasText: 'Verifique o número do pedido e tente novamente'})
    await expect(message).toBeVisible() */

    //Essa é a melhor estratégia pois usa a função de Snapshot do codegen. Pelo snapshot ele compara os elementos da tela com as validações esperadas e nesse contexto o 'paragraph' funciona.
    //Ela apenas lê a árvore de acessibilidade, que já existe no DOM
    //Faz comparação de texto e estrutura
    //Não envolve imagens nem validação por pixels
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img
    - heading "Pedido não encontrado" [level=3]
    - paragraph: Verifique o número do pedido e tente novamente
    `)

  })

})



