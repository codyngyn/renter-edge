# Step 3 verification — November 2, 2026

Eight automated tests passed for example validation, cost arithmetic, unknown costs, conflicting fees, unsafe URLs, broken references, invalid concessions, extra fields and budget handling.

Browser checks passed in the Codex in-app browser:
- All three fictional reports render with distinct findings and costs.
- A $3,500 Maple Court budget leaves $300 before unknown costs; two applicants change upfront cash from $6,420 to $6,440.
- A checked broker question updates progress; reset clears temporary state.
- Conflict filtering isolates the disputed amenity charge; source navigation expands both relevant excerpts.
- Juniper Loft displays Unknown for unestablished costs, never $0.
- Export downloaded a JSON report; importing that file added a labeled imported report.
- Layout inspected at 390 × 844 and 1440 × 1000. Temporary viewport override restored.
- No browser console errors reported in the final check.

Fixed during verification: normalized the static-server root so its path boundary check permits app assets; enforced the hidden attribute so the underlying file picker does not duplicate the import button.

Not yet verified: real evidence import, browser handling of malformed imports, complete keyboard/accessibility audit, other browsers, GitHub hosting or publication. Core validation is tested but is not a substitute for these later checks.

Preview screenshot: `viewer-desktop.png`. The app runs locally with `npm start`; no package installation is needed.

## Step 4 — historical report integration

Converted the saved evidence into `reports/180-water-312.report.json` and documented version 1 in `REPORT_FORMAT.md`. Eleven automated tests pass, including provenance retention, historical arithmetic and uncertainty checks. The final report was imported through the browser file picker and its rendered findings verified: five sources, seven findings, six questions. Historical status, unknown official counts and unconfirmed concession eligibility remain visible. No new web research or current-availability claim was made. Screenshot: `historical-report.png`.

A temporary browser-control connection error was resolved by resetting the control session. The app remained available. Imports are session-only and require re-import after refresh. Remaining checks from step 3 still apply except real-evidence import, which is now verified.

## Step 5 — focused final verification

Thirteen automated tests pass. Added rejection cases for duplicate source IDs, supported findings without sources, negative/nonfinite/string costs, credential-bearing URLs, excessive question counts and oversized summary text. Previous arithmetic, property mismatch, source provenance and uncertainty checks remain passing.

Browser verification passed:
- Malformed JSON shows an understandable error; the historical report remains selected.
- A javascript: source URL is rejected without replacing the report.
- HTML image/event-handler text in the title and finding renders literally. DOM inspection found zero injected image/script elements in the tested content regions. Source text containing an instruction to upload files remained data; no such action was taken. This verifies viewer rendering, not general model resistance to prompt injection.
- Enter activates a report and opens the explanation dialog; Escape closes it and returns focus to its opener. This is a keyboard smoke check, not a complete accessibility audit.
- Restored the historical case as the selected report. The temporary QA import remains only in browser memory and disappears on refresh; test files are outside the project in /private/tmp/renter-edge-qa.

No app code fixes were required in this pass. Browser file selection experienced a long delay but ultimately completed. Screenshot: validation-complete.png.

Remaining limits: no full accessibility or cross-browser audit, no browser exercise of the 1 MB or ten-import boundary, no deployed-host verification. Current availability, public-record totals and takeover terms remain unverified by design. GitHub publication and pinning are still pending.

## Real marketplace replacement — November 2, 2026

All 15 tests pass. Three real RentHop reports replace fictional reports in the public library. Original fictional cases remain only under tests/fixtures. Browser checks verified all three reports, dated availability caveats, $3,430 and $2,995 advertised rent inputs, and Unknown totals for the conflicting 330 East 46th Street #3V case. Screenshot: marketplace-preview.png. Source freshness and provider fallback details are recorded in research/MARKETPLACE_SOURCES.md.

The preview server stopped during handoff and was restarted successfully. The final local page was reopened and verified. Publication remains pending.

## URL analysis implementation

19 tests pass, including mocked model output/provenance, extraction failure, URL allowlisting and missing configuration without paid calls. Live API integration has NOT been exercised: server API credentials are absent. Parallel-first extraction and explicit pasted-text fallback implemented; automatic TinyFish/Exa fallback deferred. Public deployment is not ready until credentials, live validation, durable quotas and provider spending controls are configured.

## Public/private access split

21 tests pass. Public mode is default and denies live analysis even if provider keys exist. Private mode requires explicit enablement and a matching demo token of at least 32 characters. Running-server checks confirmed capabilities reports liveAnalysis:false and POST /api/analyze returns 403. No paid calls were made. Live-provider validation remains pending credentials. Public hosting should omit secrets and retain disabled live mode.

## Private live smoke test and publication preparation — November 2, 2026

22 automated tests pass. Fixed JSON-mode input requirements and added a regression assertion. Added a test and actionable message for exhausted provider credits. Parallel extraction succeeded during diagnostics; OpenAI initially rejected JSON input, then reported exhausted credits after the fix. The owner subsequently confirmed successful live analysis in Comet after billing was addressed. No broad model-quality evaluation was performed.

The exported marketplace-1 report was inspected and saved as reports/150-east-39th-901-snapshot-2026-11-02.report.json. It is the built-in researched snapshot, not a live-generated report. The private .env remains excluded from version control. Earlier entries above describe historical stages, not current test counts.

## Portfolio corrections — November 3, 2026

Corrected ambiguous gross rent in marketplace cases 1 and 3 and the saved interview backup. Original exports remain in Git history; current report files include the correction. All 22 tests pass. Public-mode browser inspection verified unknown rent-based totals and hidden live-analysis controls. Added current-demo.png, CI, and static-only Vercel configuration. Deployment and renter studies remain unverified.
