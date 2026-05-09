import { describe, it, expect, vi } from 'vitest';
import { dbOrderToOrder, DbOrder } from './useOrders';
import { CarConfiguration, Order } from '@/store/configuratorStore';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(),
    functions: { invoke: vi.fn() }
  }
}));

describe('useOrders - dbOrderToOrder', () => {
  it('should correctly map a DbOrder to an Order object', () => {
    const mockDbOrder: DbOrder = {
      id: 'uuid-123',
      order_number: 'VLO-123456',
      color: 'midnight-black',
      wheel_type: 'sport',
      optionals: ['precision-park'],
      customer_name: 'João da Silva',
      customer_email: 'joao@email.com',
      customer_phone: '11999999999',
      customer_cpf: '12345678901',
      payment_method: 'financiamento',
      total_price: 45000,
      status: 'APROVADO',
      created_at: '2023-10-10T10:00:00Z',
      updated_at: '2023-10-10T10:00:00Z',
    };

    const expectedOrder: Order = {
      id: 'VLO-123456',
      configuration: {
        exteriorColor: 'midnight-black' as CarConfiguration['exteriorColor'],
        interiorColor: 'cream' as CarConfiguration['interiorColor'],
        wheelType: 'sport' as CarConfiguration['wheelType'],
        optionals: ['precision-park'],
      },
      totalPrice: 45000,
      customer: {
        name: 'João',
        surname: 'da Silva',
        email: 'joao@email.com',
        phone: '11999999999',
        cpf: '12345678901',
        store: '', // Assumed empty in current implementation
      },
      paymentMethod: 'financiamento',
      status: 'APROVADO',
      createdAt: '2023-10-10T10:00:00Z',
    };

    const result = dbOrderToOrder(mockDbOrder);
    expect(result).toEqual(expectedOrder);
  });

  it('should handle names with only one word', () => {
    const mockDbOrder: DbOrder = {
      id: 'uuid-123',
      order_number: 'VLO-123456',
      color: 'midnight-black',
      wheel_type: 'sport',
      optionals: null, // Test handling of null optionals
      customer_name: 'Maria',
      customer_email: 'maria@email.com',
      customer_phone: '11999999999',
      customer_cpf: '12345678901',
      payment_method: 'avista',
      total_price: 40000,
      status: 'EM_ANALISE',
      created_at: '2023-10-10T10:00:00Z',
      updated_at: '2023-10-10T10:00:00Z',
    };

    const result = dbOrderToOrder(mockDbOrder);
    expect(result.customer.name).toBe('Maria');
    expect(result.customer.surname).toBe('');
    expect(result.configuration.optionals).toEqual([]);
  });
});
