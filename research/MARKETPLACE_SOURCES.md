# Marketplace replacement — November 2, 2026

The user requested replacing fictional properties with real listings on active marketplaces. Three exact-unit RentHop reports now populate the viewer. All are dated snapshots. No inquiry, tour, or application was submitted; no photos or contact details were copied.

Discovery: [RentHop November roundup](https://www.renthop.com/blog/manhattan-listings-in-november-2026-under-3500), published October 27, 2026, acquired November 2 by Parallel. This is the same publisher as the listings, not independent verification.

- [150 East 39th Street #901](https://www.renthop.com/listings/150-e-39th-st/901/77243945/show): $3,430 monthly in both providers. Parallel acquired October 28 and showed November 1 move-in; Exa showed immediate move-in, acquisition date unspecified. No complete cost schedule or rent-concession basis established.
- [330 East 46th Street #3V](https://www.renthop.com/listings/330-east-46th-street/3v/76720441): Exa showed $3,100 and immediate move-in. Parallel’s October 21 snapshot showed $3,495. A [separate posting](https://www.renthop.com/listings/330-e-46th-street-unit-3v/3v/74448979/show) showed $3,450 and leased/expired status through Exa; its October 28 Parallel version lacked that marker. Price changes over time are plausible; current payable rent remains null rather than selecting a convenient figure. The $3,250 recommendation card seen elsewhere was not used as a verified target price.
- [241 East 46th Street #3D](https://www.renthop.com/listings/east-46th-street/3d/77218097/show): $2,995 monthly and immediate move-in in retrieved versions. Parallel acquired October 28; Exa acquisition date unspecified. Pet policy and full charges remain unknown.

Provider order followed: Parallel search/extraction → TinyFish fresh fetch (`ttl: 0`, all three original candidates bot-blocked) → Exa extraction. Exa returned updated content, but retrieval today does not establish when that content was acquired. Relative posting ages were not converted to absolute dates. No listing is labeled independently verified or guaranteed currently available.

Report sources retain factual summaries, direct links, retrieval date and acquisition caveats. Amenities remain advertiser claims. No official record searches were performed for these three properties. “No fee” was not converted into zero deposit/application/amenity charges. Lease terms and concessions remain null. The two consistent advertised monthly amounts are supplied rent inputs, not verified gross lease quotes; the UI label was adjusted accordingly. Net-effective figures remain unknown without concession inputs.

Fictional examples were moved to `tests/fixtures/fictional.mjs` to preserve deterministic edge-case coverage without presenting invented properties in the public viewer. The older 180 Water historical report remains available for import.
