const onlyDigits = (value) => value.replace(/\D/g, '');

const isValidCpf = (value) => {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  const calcDigit = (base, factor) => {
    let total = 0;
    for (let i = 0; i < base.length; i++) {
      total += Number(base[i]) * (factor - i);
    }
    const mod = total % 11;
    return mod < 2 ? 0 : 11 - mod;
  };

  const d1 = calcDigit(cpf.slice(0, 9), 10);
  const d2 = calcDigit(cpf.slice(0, 10), 11);
  return cpf.endsWith(`${d1}${d2}`);
};

// Generate valid CPFs
function generateCPF() {
  const randomDigit = () => Math.floor(Math.random() * 10);
  const base = Array.from({length: 9}, randomDigit).join('');
  const calcDigit = (b, f) => {
    let t = 0;
    for (let i = 0; i < b.length; i++) t += Number(b[i]) * (f - i);
    const m = t % 11;
    return m < 2 ? 0 : 11 - m;
  };
  const d1 = calcDigit(base, 10);
  const d2 = calcDigit(base + d1, 11);
  return base + d1 + d2;
}

const valid1 = generateCPF();
const valid2 = generateCPF();
console.log("Valid CPFs:");
console.log(valid1, isValidCpf(valid1));
console.log(valid2, isValidCpf(valid2));

// Test 12345678909
console.log("12345678909", isValidCpf("12345678909"));
