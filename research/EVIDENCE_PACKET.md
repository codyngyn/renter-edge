# First evidence packet: 180 Water Street, apartment 312

Collected November 1, 2026, America/Los_Angeles. Machine-readable evidence: [180-water-312.evidence.json](180-water-312.evidence.json).

## Why this case

A real historical NYC listing with explicit rent-concession inputs and useful failure cases. It is a research demonstration, not a current apartment recommendation. No renter preferences were assumed, no broker was contacted, and no application was made.

## Findings to carry into the build

1. **Historical availability:** The [unit listing](https://www.renthop.com/listings/180-water-street/312/76253469) is labeled leased/expired while its body still invites immediate occupancy. Current availability is unknown.
2. **Cost clarity:** Listed gross rent is $4,992; the advertised net figure is $4,730. One free month across the original 19-month term computes to $4,729.26 before fees. The small discrepancy is consistent with rounding and is not evidence of fraud. An incoming takeover renter's entitlement to the concession is unknown.
3. **Incomplete totals:** For one leaseholder, gross rent plus the listed $65 amenity charge is $5,057 before unknown insurance and electricity. For one applicant, first month + deposit + application is a $10,004 subtotal. Neither is an all-in quote; the deposit is a refundable cash outlay rather than rent expense. All inputs are historical listing claims.
4. **Conflicting amenity claims:** The [building marketing site](https://www.180waterst.com/) advertises a rooftop pool; the [RentHop building summary](https://www.renthop.com/building/180-water-street-new-york-ny-10038) says there is none. The direct building statement is stronger evidence of what is advertised, but current operation, access, seasonality, and cost still require confirmation.
5. **Extraction contamination:** Initial search excerpts mixed in a nearby listing's $4,795 price and 577-square-foot size. Full-page extraction showed that these belong to 116 John Street, unit 3109. They are not a discrepancy in the target listing. Target-unit description claims 610 square feet, not independently measured.

## Official record check and its limits

[HPD's exact building overview](https://hpdonline.nyc.gov/hpdonline/building/29370/overview) confirms 180 Water Street, Manhattan, building ID 29370, BIN 1001134, block 70, and lot 32. These yield BBL 1000700032, also found in the [historical NYC benchmarking list](https://www.nyc.gov/assets/buildings/pdf/benchmarking_cbl_compliance_2020.pdf). The historical list is identity corroboration only.

HPD returned errors in some sections. The TinyFish browser summary reported violation and complaint counts, but direct follow-up extraction did not establish them. Keep these fields **unknown**, not zero. The browser summary also mistakenly inferred a BBL from a BIN and counted complaint rows without accounting for a repeated complaint ID. Those conclusions were rejected. A reported issue in another unit must not be attributed to apartment 312.

## Provider trace and freshness

Priority followed: **Parallel → TinyFish → Exa**.

- Parallel found the case and extracted the relevant pages. Acquisition dates were September 9 for the listing, October 24 for building marketing, and October 7 for the secondary building summary. Retrieval during this session does not make those snapshots current.
- TinyFish's fresh listing fetch was blocked. Exa then returned consistent historical status and terms; its acquisition date was not supplied.
- TinyFish performed the interactive HPD lookup. Parallel then checked its exact returned overview URL, with an acquisition date of November 2 UTC (November 1 local).
- Exact per-call timestamps were not supplied. The JSON records the observed collection window, separate from provider acquisition dates.

## Questions for a future live renter workflow

- Is this exact unit available, and what are the current written terms?
- Which concessions transfer, over what remaining term, and on what payment schedule?
- What additional costs and deposit-transfer conditions apply?
- What pool access and flex-wall conditions apply to this apartment?

## Step 2 completion

One real case, source references, evidence labels, calculations, access limitations, and unresolved questions are saved. The JSON is an evidence packet; the final report/import schema belongs to step 4. Step 3 can now build the viewer with fictional examples. No app implementation or publication occurred in this step.
