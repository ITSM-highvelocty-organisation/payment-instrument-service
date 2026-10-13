import test from 'node:test';
import assert from 'node:assert/strict';
import {mapBillingAddress} from '../src/billing-address-mapper.js';

test('maps an optional billing address into normalized metadata', () => {
  assert.deepEqual(mapBillingAddress({countryCode: 'ca'}), {countryCode: 'CA', region: null});
  assert.deepEqual(mapBillingAddress({countryCode: ' gb '}), {countryCode: 'GB', region: null});
  assert.equal(mapBillingAddress(null), null);
});

test('includes the normalized region when provided', () => {
  assert.deepEqual(mapBillingAddress({countryCode: 'us', region: ' ca '}), {countryCode: 'US', region: 'CA'});
});
