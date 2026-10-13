import test from 'node:test';
import assert from 'node:assert/strict';
import {toEnrichedInstrument} from '../src/payment-instrument-mapper.js';

test('exposes normalized billing country for a card payment method', () => {
  assert.equal(toEnrichedInstrument({instrumentType: 'CARD', network: 'VISA', lastFour: '4242', billingAddress: {countryCode: 'us'}}).billingCountry, 'US');
});