import {mapBillingAddress} from './billing-address-mapper.js';

export function toEnrichedInstrument(paymentMethod) {
  const billingAddress = mapBillingAddress(paymentMethod.billingAddress);
  return {instrumentType: paymentMethod.instrumentType, network: paymentMethod.network, lastFour: paymentMethod.lastFour, billingCountry: billingAddress?.countryCode ?? null};
}