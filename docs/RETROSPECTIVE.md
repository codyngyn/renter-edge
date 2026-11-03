# Renter Edge: build retrospective

November 3, 2026 · Cody Nguyen

## Why I built it

I was curious whether AI could help me look past rental marketing and identify what I would actually need to confirm before renting. A listing can advertise a price and amenities without establishing the full monthly cost, lease terms, or current availability. I wanted a small tool that made those gaps visible.

The prototype is now a [public saved-report viewer](https://renter-edge.vercel.app), with optional private listing analysis running locally. It is a working exploration of that idea, not evidence of product-market fit.

## Decisions I owned—and how I used Codex

I chose the renter problem, prioritized a short build, requested real marketplace examples, and chose to keep public exploration separate from paid live analysis. I tested the live flow, surfaced failures, and prioritized clearer evidence and more reliable behavior. Codex implemented the application, investigated errors, proposed technical fixes, and ran the software and model checks with my direction.

The scope stayed deliberately narrow: RentHop URLs or pasted listing text, a consistent report format, source-linked findings, deterministic cost calculations, and questions for a broker. The runtime uses Parallel for retrieval and OpenAI for analysis. TinyFish and Exa supported preparation of saved research examples; they are not automatic fallback adapters in the app.

## What worked

A saved-report mode made the product immediately explorable without a visitor account or API key. Keeping paid analysis local let me demonstrate the live workflow without exposing an unrestricted public endpoint funded by my credits.

Separating calculations from generated prose made the arithmetic testable. Evidence labels, source notes, and explicit unknowns gave the report a useful structure beyond a free-form summary. Exportable reports also made it possible to revisit findings when a listing or provider was unavailable.

## What failed and what changed

**Advertised price became an unjustified calculation input.** Saved examples put a displayed price into gross rent even while acknowledging that its gross/net basis was unknown. I corrected those reports so the advertised amount remains in source evidence while gross rent and rent-based totals remain unknown. A consistent price across snapshots does not establish its contractual meaning.

**The first live request failed before producing a report.** OpenAI's JSON mode rejected the request because the required JSON instruction was absent from the input message. After that fix, the account had no API credits. Clearer provider-specific errors replaced a generic failure message. These were integration and account-setup failures, not browser problems.

**Passing numeric checks hid a wrong explanation.** The first four-case AI evaluation passed two cases; the other two failed evidence-label validation. Review of a passing output also found an incorrect explanation of gross versus net rent. Explicit rent definitions and allowed labels improved the instructions. A subsequent run exposed null layouts rejected by the viewer, leading to narrow normalization of missing property text to “Unknown.” Monetary unknowns stayed null.

The final run passed all four defined checks. Earlier failures and outputs remain in the repository. Because the same cases informed the fixes, this result demonstrates regression progress on known examples—not generalization to unseen listings. See [the evaluation record](EVALUATION.md).

**Publication involved more than pushing code.** A GitHub credential could not upload workflow files without workflow permission; adding the workflow through GitHub resolved that step. Vercel required separate CLI authentication. The resulting public deployment serves static reports; it does not publish the private analysis server or its credentials.

## What I learned

A successful model response is only one part of a working product. Retrieval, model output, validation, calculation, interface wording, billing, and deployment each introduced a different failure mode.

Validation can reject malformed reports, but it cannot establish that every claim is true. Even correct numbers can accompany a misleading explanation. The strongest improvement came from reviewing failures and preserving uncertainty, rather than making every field appear complete.

The initial goal was a quick prototype to test the core workflow. Hardening live analysis, evaluating outputs, and publishing added follow-up work. I would budget a distinct verification and deployment phase next time rather than treat those as finishing touches.

## What remains unproven

The 22 automated software tests and four synthetic AI cases do not establish broad model reliability, retrieval freshness, resistance to all prompt injection, or usefulness to renters. The model cases do not test marketplace retrieval and were reviewed by the coding agent, not an independent human evaluator. No renter study has been completed, and no time-saving or decision-quality outcome is claimed.

## What I would do next

1. **Test whether the report changes renter behavior.** Observe 3–5 renters using a listing with and without the report. Track unsupported cost assumptions, useful questions identified, and understanding of the evidence labels. The [feedback protocol](USER_FEEDBACK.md) describes the method; no results are claimed yet.
2. **Evaluate unseen listings.** Build a separate set of cases that did not inform the prompt, covering concessions, conflicting prices, missing fees, stale pages, and nearby-listing contamination. Have a human compare each report against its source, including explanations rather than just numeric fields.
3. **Make freshness easier to judge.** Distinguish retrieval time from source age, flag unavailable pages, and help renters identify which details need a fresh written confirmation. A recently retrieved page is not necessarily a current listing.
4. **Improve the comparison workflow.** Test whether comparing two reports and carrying unresolved questions between them is more useful than adding more report detail. Build it only if observed renter tasks support that priority.
5. **Expand access after validating value.** Add marketplace coverage based on actual renter needs. Before offering public live analysis, implement durable usage limits, spending controls, and production access management.

The next milestone is evidence that the tool helps someone ask better questions—not a larger feature list.
