import { test, expect } from '@playwright/test'

import { generateOrderCode } from '../support/helpers'

/// AAA - Arrange, Act, Assert

//agrupador de cenários de teste
test.describe('Consulta de Pedidos', ()=> {

//Ganchos para chamar repetição nos cenários de teste

  /* test.beforeAll(async () => {
    console.log(
      'beforeAll: roda uma vez antes de todos os testes.'
    )
  }) */
  
  /* test.beforeEach(async () => {
    console.log(
      'beforeEach: roda antes de cada teste.'
    )
  }) */
  
  /* test.afterEach(async () => {
    console.log(
      'afterEach: roda depois de cada teste.'
    )
  }) */
  
 /*  test.afterAll(async () => {
    console.log(
      'afterAll: roda uma vez depois de todos os testes.'
    )
  }) */
  
    test.beforeEach(async ({page}) => {
      await page.goto('http://localhost:5173/')
      await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
    
      await page.getByRole('link', { name: 'Consultar Pedido' }).click()
      await expect(page.getByRole('heading')).toContainText('Consultar Pedido')



    })
    

  test('deve consultar um pedido aprovado', async ({ page }) => {


    //Teste Data
    const order = 'VLO-MMXKY1' 
  
    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()
  
  
    // Assert
  
    const containerPedido = page.getByRole('paragraph')
      .filter({ hasText: /^Pedido$/ })
      .locator('..') //Sobe um nível e pega o elemento pai (a div que agrupa ambos)
  
    await expect(containerPedido).toContainText(order, { timeout: 10_000 })
  
    await expect(page.getByText('APROVADO')).toBeVisible({ timeout: 10_000 })
  
  })
  
  
  test('deve exibir mensagem para pedido não encontrado', async ({ page }) => {
  
    const order = generateOrderCode()
  
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()
  
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



