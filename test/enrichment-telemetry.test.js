import test from 'node:test';
import assert from 'node:assert/strict';
import {recordEnrichmentOutcome} from '../src/enrichment-telemetry.js';

test('records billing-country availability and exception details', () => {
  const event = recordEnrichmentOutcome({paymentMethod: {instrumentType: 'GOOGLE_PAY', network: 'MASTERCARD'}, enrichedInstrument: null, error: new Error('timeout'), latencyMs: 24});
  assert.equal(event.failure, 1);
  assert.equal(event.exceptionClass, 'Error');
  assert.equal(event.billingCountry, null);
});

test('buckets enrichment latency for alerting', () => {
  const bucketFor = (latencyMs) => recordEnrichmentOutcome({paymentMethod: {instrumentType: 'CARD', network: 'VISA'}, enrichedInstrument: {billingCountry: 'US'}, error: null, latencyMs}).latencyBucket;
  assert.equal(bucketFor(12), 'fast');
  assert.equal(bucketFor(120), 'normal');
  assert.equal(bucketFor(640), 'slow');
  assert.equal(bucketFor(4200), 'critical');
});

test('tags enrichment events with the merchant segment', () => {
  const segmentFor = (merchantId) => recordEnrichmentOutcome({paymentMethod: {instrumentType: 'CARD', network: 'VISA'}, enrichedInstrument: {billingCountry: 'US'}, error: null, latencyMs: 18, merchantId}).merchantSegment;
  assert.equal(segmentFor('ent_42'), 'enterprise');
  assert.equal(segmentFor('m_42'), 'standard');
  assert.equal(segmentFor(undefined), 'unknown');
});

test('classifies enrichment failure reasons', () => {
  const reasonFor = (error) => recordEnrichmentOutcome({paymentMethod: {instrumentType: 'APPLE_PAY', network: 'VISA'}, enrichedInstrument: null, error, latencyMs: 31}).failureReason;
  assert.equal(reasonFor(new TypeError("Cannot read properties of null (reading 'countryCode')")), 'contract_violation');
  assert.equal(reasonFor(new Error('upstream timeout')), 'dependency_timeout');
  assert.equal(reasonFor(null), null);
});
