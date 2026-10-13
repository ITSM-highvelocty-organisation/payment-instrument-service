const latencyBuckets = [[50, 'fast'], [250, 'normal'], [1000, 'slow']];

function toLatencyBucket(latencyMs) {
  return latencyBuckets.find(([upperBoundMs]) => latencyMs < upperBoundMs)?.[1] ?? 'critical';
}

function toMerchantSegment(merchantId) {
  if (!merchantId) return 'unknown';
  return merchantId.startsWith('ent_') ? 'enterprise' : 'standard';
}

function toFailureReason(error) {
  if (!error) return null;
  if (error instanceof TypeError) return 'contract_violation';
  if (/timeout/i.test(error.message)) return 'dependency_timeout';
  return 'unclassified';
}

export function recordEnrichmentOutcome({paymentMethod, enrichedInstrument, error, latencyMs, merchantId}) {
  return {event: 'instrument.enrichment.outcome', instrumentType: paymentMethod.instrumentType, network: paymentMethod.network, merchantSegment: toMerchantSegment(merchantId), billingCountry: enrichedInstrument?.billingCountry ?? null, billingCountryAvailable: Boolean(enrichedInstrument?.billingCountry), exceptionClass: error?.constructor?.name ?? null, failureReason: toFailureReason(error), failure: error ? 1 : 0, latencyMs, latencyBucket: toLatencyBucket(latencyMs)};
}
