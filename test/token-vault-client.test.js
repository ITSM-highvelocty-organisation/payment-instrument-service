import test from 'node:test';
import assert from 'node:assert/strict';
import {TokenVaultClient} from '../src/token-vault-client.js';

test('returns a wallet method that can omit billing data', () => {
  assert.equal(new TokenVaultClient().getPaymentMethod('applePay').billingAddress, null);
});

test('rejects an unknown token with PAYMENT_METHOD_NOT_FOUND', () => {
  assert.throws(() => new TokenVaultClient().getPaymentMethod('nope'), {message: 'PAYMENT_METHOD_NOT_FOUND'});
});

test('does not leak internal state between lookups', () => {
  const client = new TokenVaultClient();
  client.getPaymentMethod('savedCard').billingAddress.countryCode = 'GB';
  assert.equal(client.getPaymentMethod('savedCard').billingAddress.countryCode, 'US');
});
