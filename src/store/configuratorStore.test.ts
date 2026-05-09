import { describe, it, expect } from 'vitest';
import {
  calculateTotalPrice,
  calculateInstallment,
  formatPrice,
  CarConfiguration,
  useConfiguratorStore
} from './configuratorStore';

describe('configuratorStore', () => {
  describe('calculateTotalPrice', () => {
    it('should calculate base price with aero wheels and no optionals', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'aero',
        optionals: []
      };
      // BASE_PRICE = 40000
      expect(calculateTotalPrice(config)).toBe(40000);
    });

    it('should add sport wheels price', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'sport',
        optionals: []
      };
      // 40000 + 2000 = 42000
      expect(calculateTotalPrice(config)).toBe(42000);
    });

    it('should add optionals price', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'aero',
        optionals: ['precision-park', 'flux-capacitor']
      };
      // 40000 + 5500 + 5000 = 50500
      expect(calculateTotalPrice(config)).toBe(50500);
    });

    it('should calculate total with sport wheels and optionals', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'sport',
        optionals: ['precision-park']
      };
      // 40000 + 2000 + 5500 = 47500
      expect(calculateTotalPrice(config)).toBe(47500);
    });
  });

  describe('calculateInstallment', () => {
    it('should calculate installment correctly (12x with 2% monthly interest)', () => {
      const total = 40000;
      const rate = 0.02;
      const months = 12;
      const expected = (total * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      const roundedExpected = Math.round(expected * 100) / 100;

      expect(calculateInstallment(total)).toBe(roundedExpected);
    });
  });

  describe('formatPrice', () => {
    it('should format price to BRL correctly', () => {
      const formatted = formatPrice(40000);

      // We check for string components to avoid issues with narrow no-break space vs normal space in different Node environments
      expect(formatted).toContain('R$');
      expect(formatted).toContain('40.000,00');
    });
  });

  describe('toggleOptional', () => {
    it('should add optional if not present and remove if already present', () => {
      // Setup initial state
      const store = useConfiguratorStore.getState();
      store.resetConfiguration();
      
      // Ensure it starts empty
      expect(useConfiguratorStore.getState().configuration.optionals).toEqual([]);
      
      // Add optional
      store.toggleOptional('precision-park');
      expect(useConfiguratorStore.getState().configuration.optionals).toContain('precision-park');
      
      // Remove optional
      store.toggleOptional('precision-park');
      expect(useConfiguratorStore.getState().configuration.optionals).not.toContain('precision-park');
      expect(useConfiguratorStore.getState().configuration.optionals).toEqual([]);
    });
  });
});
