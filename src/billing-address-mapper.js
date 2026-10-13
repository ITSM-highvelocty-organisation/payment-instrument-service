import {normalizeCountryCode} from './country-code.js';

export function mapBillingAddress(billingAddress) {
  if (!billingAddress) return null;
  return {countryCode: normalizeCountryCode(billingAddress.countryCode), region: billingAddress.region?.trim().toUpperCase() ?? null};
}
