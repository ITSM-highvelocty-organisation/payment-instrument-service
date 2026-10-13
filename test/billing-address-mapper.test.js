import test from 'node:test';
import assert from 'node:assert/strict';
import {mapBillingAddress} from '../src/billing-address-mapper.js';

test('maps an optional billing address into normalized metadata', () => {
  assert.deepEqual(mapBillingAddress({countryCode: 'ca'}), {countryCode: 'CA'});
  assert.deepEqual(mapBillingAddress({countryCode: ' gb '}), {countryCode: 'GB'});
  assert.equal(mapBillingAddress(null), null);
});
