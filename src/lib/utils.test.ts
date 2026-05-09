import { describe, it, expect } from 'vitest';
import { isValidCpf, isValidEmailStrict, onlyDigits } from './utils';

describe('utils', () => {
  describe('onlyDigits', () => {
    it('should remove all non-digit characters', () => {
      expect(onlyDigits('123.456.789-00')).toBe('12345678900');
      expect(onlyDigits('(11) 98765-4321')).toBe('11987654321');
      expect(onlyDigits('abc123def')).toBe('123');
    });
  });

  describe('isValidCpf', () => {
    it('should return true for valid CPFs', () => {
      // Usando um CPF gerado para testes (válido matematicamente)
      expect(isValidCpf('52998224725')).toBe(true);
      expect(isValidCpf('529.982.247-25')).toBe(true);
    });

    it('should return false for invalid CPFs', () => {
      expect(isValidCpf('12345678901')).toBe(false); // Checksum incorreto
      expect(isValidCpf('111.111.111-11')).toBe(false); // Dígitos repetidos
      expect(isValidCpf('123')).toBe(false); // Tamanho inválido
      expect(isValidCpf('abcdefghijk')).toBe(false); // Sem dígitos
    });
  });

  describe('isValidEmailStrict', () => {
    it('should return true for valid emails', () => {
      expect(isValidEmailStrict('teste@exemplo.com')).toBe(true);
      expect(isValidEmailStrict('nome.sobrenome@empresa.com.br')).toBe(true);
      expect(isValidEmailStrict('usuario123@dominio.org')).toBe(true);
      expect(isValidEmailStrict(' teste@exemplo.com ')).toBe(true); // Espaços externos são ignorados pelo trim
    });

    it('should return false for invalid emails', () => {
      expect(isValidEmailStrict('teste@.com')).toBe(false); // Sem domínio antes do .
      expect(isValidEmailStrict('teste@exemplo..com')).toBe(false); // Pontos consecutivos
      expect(isValidEmailStrict('teste@@exemplo.com')).toBe(false); // Múltiplos @
      expect(isValidEmailStrict('teste.exemplo.com')).toBe(false); // Sem @
      expect(isValidEmailStrict('teste @exemplo.com')).toBe(false); // Espaço interno
    });
  });
});
