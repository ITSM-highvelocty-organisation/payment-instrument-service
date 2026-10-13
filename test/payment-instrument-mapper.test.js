import test from 'node:test';
import assert from 'node:assert/strict';
import {toEnrichedInstrument} from '../src/payment-instrument-mapper.js';

test('normalizes a wallet method without billing data', () => {
  assert.equal(toEnrichedInstrument({instrumentType: 'APPLE_PAY', network: 'VISA', lastFour: '4242', billingAddress: null}).billingCountry, null);
});