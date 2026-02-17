import { Page, expect } from '@playwright/test'

// Types
type OrderStatus = 'APROVADO' | 'REPROVADO' | 'EM_ANALISE'

type StatusConfig = {
    bgClass: string
    textClass: string
    iconClass: string
}

// Constants
const STATUS_CLASSES: Record<OrderStatus, StatusConfig> = {
    APROVADO:   { bgClass: 'bg-green-100',  textClass: 'text-green-700',  iconClass: 'lucide-circle-check-big' },
    REPROVADO:  { bgClass: 'bg-red-100',    textClass: 'text-red-700',    iconClass: 'lucide-circle-x'         },
    EM_ANALISE: { bgClass: 'bg-amber-100',  textClass: 'text-amber-700',  iconClass: 'lucide-clock'            }
}

// Page Object
export class OrderLockupPage {
    constructor(private page: Page) { }

    async searchOrder(code: string) {
        await this.page.getByRole('textbox', { name: 'Número do Pedido' }).fill(code)
        await this.page.getByRole('button', { name: 'Buscar Pedido' }).click()
    }

    async validateStatusBadge(status: OrderStatus) {
        const { bgClass, textClass, iconClass } = STATUS_CLASSES[status]
        const statusBadge = this.page.getByRole('status').filter({ hasText: status })

        await expect(statusBadge).toHaveClass(new RegExp(bgClass))
        await expect(statusBadge).toHaveClass(new RegExp(textClass))
        await expect(statusBadge.locator('svg')).toHaveClass(new RegExp(iconClass))
    }
}