const methods = new Map([
  ['savedCard', {instrumentType: 'CARD', network: 'VISA', lastFour: '4242', billingAddress: {countryCode: 'US'}}],
  ['applePay', {instrumentType: 'APPLE_PAY', network: 'VISA', lastFour: '4242', billingAddress: null}],
  ['googlePay', {instrumentType: 'GOOGLE_PAY', network: 'MASTERCARD', lastFour: '4444', billingAddress: null}]
]);

export class TokenVaultClient {
  getPaymentMethod(token) {
    const method = methods.get(token);
    if (!method) throw new Error('PAYMENT_METHOD_NOT_FOUND');
    return structuredClone(method);
  }

  getBillingCountry(token) {
    return this.getPaymentMethod(token).billingAddress?.countryCode ?? null;
  }
}
