import {normalizeCountryCode} from './country-code.js';

export function mapBillingAddress(billingAddress) {
  return billingAddress ? {countryCode: normalizeCountryCode(billingAddress.countryCode)} : null;
}
