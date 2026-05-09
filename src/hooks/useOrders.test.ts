import { describe, it, expect, vi } from 'vitest';
import { dbOrderToOrder, DbOrder } from './useOrders';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe('useOrders', () => {
  describe('dbOrderToOrder', () => {
    it('should map a database order to application order correctly', () => {
      const mockDbOrder: DbOrder = {
        id: 'uuid-123',
        order_number: 'VLO-123456',
        color: 'glacier-blue',
        wheel_type: 'sport',
        optionals: ['precision-park', 'flux-capacitor'],
        customer_name: 'João da Silva Sauro',
        customer_email: 'joao@exemplo.com',
        customer_phone: '11999999999',
        customer_cpf: '12345678900',
        payment_method: 'financiamento',
        total_price: 52500,
        status: 'APROVADO',
        created_at: '2023-01-01T10:00:00Z',
        updated_at: '2023-01-01T10:00:00Z'
      };

      const result = dbOrderToOrder(mockDbOrder);

      // Verify basic fields
      expect(result.id).toBe('VLO-123456');
      expect(result.totalPrice).toBe(52500);
      expect(result.paymentMethod).toBe('financiamento');
      expect(result.status).toBe('APROVADO');
      expect(result.createdAt).toBe('2023-01-01T10:00:00Z');

      // Verify name splitting
      expect(result.customer.name).toBe('João');
      expect(result.customer.surname).toBe('da Silva Sauro');
      expect(result.customer.email).toBe('joao@exemplo.com');
      expect(result.customer.phone).toBe('11999999999');
      expect(result.customer.cpf).toBe('12345678900');

      // Verify configuration mapping
      expect(result.configuration.exteriorColor).toBe('glacier-blue');
      expect(result.configuration.interiorColor).toBe('cream'); // Hardcoded in the mapping
      expect(result.configuration.wheelType).toBe('sport');
      expect(result.configuration.optionals).toEqual(['precision-park', 'flux-capacitor']);
    });

    it('should handle customer names with only one word', () => {
      const mockDbOrder: DbOrder = {
        id: 'uuid-123',
        order_number: 'VLO-123456',
        color: 'lunar-white',
        wheel_type: 'aero',
        optionals: null, // Test with null optionals
        customer_name: 'Maria',
        customer_email: 'maria@exemplo.com',
        customer_phone: '11999999999',
        customer_cpf: '12345678900',
        payment_method: 'avista',
        total_price: 40000,
        status: 'EM_ANALISE',
        created_at: '2023-01-01T10:00:00Z',
        updated_at: '2023-01-01T10:00:00Z'
      };

      const result = dbOrderToOrder(mockDbOrder);

      expect(result.customer.name).toBe('Maria');
      expect(result.customer.surname).toBe(''); // Should be empty
      expect(result.configuration.optionals).toEqual([]); // Should handle null as empty array
    });
  });
});
