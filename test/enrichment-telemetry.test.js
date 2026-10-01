import test from 'node:test';
import assert from 'node:assert/strict';
import {recordEnrichmentOutcome} from '../src/enrichment-telemetry.js';

test('records billing-country availability and exception details', () => {
  const event = recordEnrichmentOutcome({paymentMethod: {instrumentType: 'GOOGLE_PAY', network: 'MASTERCARD'}, enrichedInstrument: null, error: new Error('timeout'), latencyMs: 24});
  assert.equal(event.failure, 1);
  assert.equal(event.exceptionClass, 'Error');
});

test('buckets enrichment latency for alerting', () => {
  const bucketFor = (latencyMs) => recordEnrichmentOutcome({paymentMethod: {instrumentType: 'CARD', network: 'VISA'}, enrichedInstrument: {billingCountry: 'US'}, error: null, latencyMs}).latencyBucket;
  assert.equal(bucketFor(12), 'fast');
  assert.equal(bucketFor(120), 'normal');
  assert.equal(bucketFor(640), 'slow');
  assert.equal(bucketFor(4200), 'critical');
});
