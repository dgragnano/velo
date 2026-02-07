//função para criar coódigo de pedido dinâmico

export function generateOrderCode() {
    const prefix = 'VLO';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    const randomLetters = (length) =>
        Array.from({ length }, () =>
            letters.charAt(Math.floor(Math.random() * letters.length))
        ).join('');

    const randomNumber = () =>
        numbers.charAt(Math.floor(Math.random() * numbers.length));

    const randomPart = randomLetters(5) + randomNumber();

    return `${prefix}-${randomPart}`;
}