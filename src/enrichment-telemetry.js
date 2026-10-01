const latencyBuckets = [[50, 'fast'], [250, 'normal'], [1000, 'slow']];

function toLatencyBucket(latencyMs) {
  return latencyBuckets.find(([upperBoundMs]) => latencyMs < upperBoundMs)?.[1] ?? 'critical';
}

export function recordEnrichmentOutcome({paymentMethod, enrichedInstrument, error, latencyMs}) {
  return {event: 'instrument.enrichment.outcome', instrumentType: paymentMethod.instrumentType, network: paymentMethod.network, billingCountryAvailable: Boolean(enrichedInstrument?.billingCountry), exceptionClass: error?.constructor?.name ?? null, failure: error ? 1 : 0, latencyMs, latencyBucket: toLatencyBucket(latencyMs)};
}
