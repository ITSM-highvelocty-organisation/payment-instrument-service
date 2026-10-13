export function normalizeCountryCode(countryCode) {
  return countryCode?.trim().toUpperCase() ?? null;
}
