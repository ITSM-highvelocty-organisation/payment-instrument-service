# payment-instrument-service

Normalizes token-vault payment methods for cards and wallets.

## Enrichment contract

`toEnrichedInstrument(paymentMethod)` returns `instrumentType`, `network`, `lastFour`
and a normalized `billingCountry`.

Wallet methods such as Apple Pay and Google Pay are returned by the token vault
without billing data, so `billingAddress` can be `null` for a valid instrument.
