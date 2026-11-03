# AI evaluation

This is a small synthetic smoke evaluation, not an accuracy benchmark. Run it with `node --env-file=.env eval/run.mjs`; it makes four paid OpenAI calls and overwrites eval/results.json. It does not fetch live listings.

Cases cover ambiguous price basis, missing fees, contradictory prices, and contamination by nearby listing text plus an embedded instruction. Each case checks gross rent, preservation of unknown fees, and target unit identity. Expected values are specified before execution in eval/run.mjs. Full model outputs and timestamps are saved for review.

Limitations: one run per case, one model, synthetic wording, no independent human grading, no retrieval evaluation, no measured renter outcomes. Passing these assertions does not prove every statement in a report is correct or establish general prompt-injection resistance. Failed and timed-out calls must remain in the results.

## Recorded results — November 3, 2026

Baseline: 2/4 passed the automated assertions; two outputs failed evidence-label validation. Manual review also found an incorrect gross/net definition in an otherwise numerically passing output. After explicit enum and rent-definition instructions, a second run failed all four cases because missing layouts were returned as null. The final run passed 4/4 after explicit text-field instructions and narrow normalization of null/empty property text to Unknown. Final findings were manually reviewed by the coding agent for price definitions, conflict handling, and nearby-listing contamination; this is not independent human review.

All three runs are retained in eval/: baseline-results.json, label-fix-results.json and results.json. These are synthetic test reports, not real listings, despite the production analyzer assigning its usual report flags and provenance. Do not present them as marketplace evidence. The sample size is too small to establish a reliable production success rate.
