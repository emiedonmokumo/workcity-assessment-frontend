export function formatPrice(amount: number, currency = 'NGN', locale = 'en-NG') {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    });

    return formatter.format(amount);
}