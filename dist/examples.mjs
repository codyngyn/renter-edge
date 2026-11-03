// Real marketplace snapshots. Retrieval is not a guarantee of present availability.
export const examples = [
  {
    "format": "renter-edge-report",
    "version": 1,
    "fictional": false,
    "id": "marketplace-1",
    "title": "150 East 39th Street #901",
    "scenario": "Advertised rent agrees",
    "prepared": "November 2, 2026",
    "verdict": "Confirm the full written terms",
    "summary": "Real RentHop listing, captured through research connectors. The retrieved page advertises immediate move-in, but current availability has not been confirmed with management. Missing fees remain unknown.",
    "property": {
      "name": "150 East 39th Street",
      "area": "Murray Hill, Manhattan · RentHop snapshot",
      "unit": "901",
      "layout": "Studio · 1 bathroom claimed",
      "availability": "Advertised for immediate move-in in the Exa retrieval on Nov 2, 2026. Snapshot age was not supplied; availability is not independently confirmed."
    },
    "costs": {
      "gross": 3430,
      "amenity": null,
      "deposit": null,
      "application": null,
      "freeMonths": null,
      "termMonths": null,
      "unknowns": [
        "Utilities",
        "Renters insurance",
        "Other move-in charges"
      ],
      "sourceIds": [
        "listing"
      ],
      "note": "The displayed monthly price is an advertised rent, not a verified lease quote. Gross/net basis, concessions and lease term are not established. No-fee marketing does not establish that deposits or other charges are zero. Upfront subtotal includes only known inputs; confirm the first payment and complete move-in bill."
    },
    "sources": [
      {
        "id": "listing",
        "title": "150 East 39th Street #901 — RentHop via Exa",
        "type": "Rental marketplace · advertiser claim",
        "url": "https://www.renthop.com/listings/150-e-39th-st/901/77243945/show",
        "captured": "Retrieved Nov 2, 2026 via Exa; acquisition date not supplied.",
        "excerpt": "Factual summary, not a quotation: Exact unit 901 is advertised at $3,430 monthly, studio/one bath, no broker fee, immediate move-in. Claims include doorman, elevator, fitness center, building laundry, roof deck and pets allowed. Lease length, concessions, deposit and amenity charges were not established."
      },
      {
        "id": "earlier",
        "title": "150 East 39th Street #901 — earlier Parallel snapshot",
        "type": "Rental marketplace · advertiser claim",
        "url": "https://www.renthop.com/listings/150-e-39th-st/901/77243945/show",
        "captured": "Retrieved Nov 2, 2026 via Parallel; acquired Oct 28, 2026.",
        "excerpt": "Factual summary, not a quotation: Advertises the same exact unit at $3,430 per month with no broker fee. Move-in shown as November 1. Same webpage and publisher as the Exa retrieval; not independent corroboration."
      }
    ],
    "findings": [
      {
        "level": "supported",
        "title": "Advertised price agrees across retrieved versions",
        "detail": "Both retrieved versions of the exact unit page show $3,430 monthly. This establishes consistency in the supplied snapshots, not a verified lease quote or all-in price.",
        "sourceIds": [
          "listing",
          "earlier"
        ]
      },
      {
        "level": "unknown",
        "title": "No-fee does not mean no additional costs",
        "detail": "The advertiser says there is no broker fee. Deposit, application charges, utilities, insurance and any amenity fees were not established in the retrieved text. Missing amounts are not zero.",
        "sourceIds": [
          "listing"
        ]
      },
      {
        "level": "unknown",
        "title": "Availability needs a current confirmation",
        "detail": "The retrieved listing advertises immediate move-in. TinyFish could not refresh the candidate pages because access was blocked; Exa did not supply its acquisition date. No manager has confirmed availability.",
        "sourceIds": [
          "listing"
        ]
      },
      {
        "level": "supported",
        "title": "Building amenities are advertised",
        "detail": "The listing describes doorman service, fitness facilities, building laundry and a roof deck. Operating hours, access charges and actual condition were not independently checked.",
        "sourceIds": [
          "listing"
        ]
      },
      {
        "level": "unknown",
        "title": "Official building records not assessed",
        "detail": "This report reviews marketplace text only. Complaint and violation records were not queried for this case; no safety or compliance conclusion is drawn.",
        "sourceIds": []
      }
    ],
    "questions": [
      "Is this exact unit still available, and can you send its current written rent and lease terms?",
      "Is the advertised price gross or net-effective, and are concessions conditional?",
      "What are the deposit, application charge, utilities, insurance and other recurring or move-in charges?",
      "Are gym and roof-deck access included, and what pet restrictions or charges apply?"
    ]
  },
  {
    "format": "renter-edge-report",
    "version": 1,
    "fictional": false,
    "id": "marketplace-2",
    "title": "330 East 46th Street #3V",
    "scenario": "Price needs confirmation",
    "prepared": "November 2, 2026",
    "verdict": "Resolve the price before budgeting",
    "summary": "An active-looking RentHop posting advertises $3,100, but earlier snapshots and a separate expired posting show different prices for unit 3V. The payable rent stays unknown until management confirms the current offer.",
    "property": {
      "name": "330 East 46th Street",
      "area": "Turtle Bay, Manhattan · RentHop snapshot",
      "unit": "3V",
      "layout": "Studio · 1 bathroom claimed",
      "availability": "Advertised for immediate move-in in the Exa retrieval on Nov 2, 2026. Snapshot age was not supplied; availability is not independently confirmed."
    },
    "costs": {
      "gross": null,
      "amenity": null,
      "deposit": null,
      "application": null,
      "freeMonths": null,
      "termMonths": null,
      "unknowns": [
        "Utilities",
        "Renters insurance",
        "Other move-in charges"
      ],
      "sourceIds": [
        "listing",
        "earlier",
        "expired"
      ],
      "note": "Conflicting snapshots show $3,100 and $3,495 for the same posting. Another posting shows $3,450 and is returned as expired. These may reflect changes over time; acquisition timing is incomplete. No single price is treated as confirmed, and all calculated totals remain unknown."
    },
    "sources": [
      {
        "id": "listing",
        "title": "330 East 46th Street #3V — RentHop via Exa",
        "type": "Rental marketplace · advertiser claim",
        "url": "https://www.renthop.com/listings/330-east-46th-street/3v/76720441",
        "captured": "Retrieved Nov 2, 2026 via Exa; acquisition date not supplied.",
        "excerpt": "Factual summary, not a quotation: Exact unit 3V is advertised at $3,100 monthly, studio/one bath, no broker fee and immediate move-in. Doorman and elevator are listed. Pet permission and the full fee schedule are not established. This differs from the older Parallel snapshot of the same URL."
      },
      {
        "id": "earlier",
        "title": "330 East 46th Street #3V — earlier price snapshot",
        "type": "Rental marketplace · advertiser claim",
        "url": "https://www.renthop.com/listings/330-east-46th-street/3v/76720441",
        "captured": "Retrieved Nov 2, 2026 via Parallel; acquired Oct 21, 2026.",
        "excerpt": "Factual summary, not a quotation: The exact unit page advertises $3,495 with immediate move-in. Exa returns $3,100 for the same URL without an acquisition timestamp. Temporal price changes cannot be distinguished from stale data with certainty."
      },
      {
        "id": "expired",
        "title": "330 East 46th Street #3V — separate expired posting",
        "type": "Rental marketplace · advertiser claim",
        "url": "https://www.renthop.com/listings/330-e-46th-street-unit-3v/3v/74448979/show",
        "captured": "Retrieved Nov 2, 2026 via Exa; acquisition date not supplied.",
        "excerpt": "Factual summary, not a quotation: Separate posting shows $3,450 and leased/expired status while retaining immediate-move-in wording. It is excluded as an active offer. An Oct 28 Parallel snapshot showed it without the expired marker."
      }
    ],
    "findings": [
      {
        "level": "conflict",
        "title": "Same unit, different prices and dates",
        "detail": "The same listing URL returns $3,100 through Exa and $3,495 in an Oct 21 Parallel snapshot. A separate expired posting shows $3,450. These could be price changes or stale records; the current payable amount is unresolved.",
        "sourceIds": [
          "listing",
          "earlier",
          "expired"
        ]
      },
      {
        "level": "unknown",
        "title": "No-fee does not mean no additional costs",
        "detail": "The advertiser says there is no broker fee. Deposit, application charges, utilities, insurance and any amenity fees were not established in the retrieved text. Missing amounts are not zero.",
        "sourceIds": [
          "listing"
        ]
      },
      {
        "level": "unknown",
        "title": "Availability needs a current confirmation",
        "detail": "The retrieved listing advertises immediate move-in. TinyFish could not refresh the candidate pages because access was blocked; Exa did not supply its acquisition date. No manager has confirmed availability.",
        "sourceIds": [
          "listing"
        ]
      },
      {
        "level": "unknown",
        "title": "Official building records not assessed",
        "detail": "This report reviews marketplace text only. Complaint and violation records were not queried for this case; no safety or compliance conclusion is drawn.",
        "sourceIds": []
      }
    ],
    "questions": [
      "Is this exact unit still available, and can you send its current written rent and lease terms?",
      "Is the advertised price gross or net-effective, and are concessions conditional?",
      "What are the deposit, application charge, utilities, insurance and other recurring or move-in charges?",
      "Which posting and price are current for 3V, and why do the retrieved versions differ?"
    ]
  },
  {
    "format": "renter-edge-report",
    "version": 1,
    "fictional": false,
    "id": "marketplace-3",
    "title": "241 East 46th Street #3D",
    "scenario": "Fees and policies missing",
    "prepared": "November 2, 2026",
    "verdict": "Confirm the full written terms",
    "summary": "Real RentHop listing, captured through research connectors. The retrieved page advertises immediate move-in, but current availability has not been confirmed with management. Missing fees remain unknown.",
    "property": {
      "name": "241 East 46th Street",
      "area": "Turtle Bay, Manhattan · RentHop snapshot",
      "unit": "3D",
      "layout": "Studio · 1 bathroom claimed",
      "availability": "Advertised for immediate move-in in the Exa retrieval on Nov 2, 2026. Snapshot age was not supplied; availability is not independently confirmed."
    },
    "costs": {
      "gross": 2995,
      "amenity": null,
      "deposit": null,
      "application": null,
      "freeMonths": null,
      "termMonths": null,
      "unknowns": [
        "Utilities",
        "Renters insurance",
        "Other move-in charges"
      ],
      "sourceIds": [
        "listing"
      ],
      "note": "The displayed monthly price is an advertised rent, not a verified lease quote. Gross/net basis, concessions and lease term are not established. No-fee marketing does not establish that deposits or other charges are zero. Upfront subtotal includes only known inputs; confirm the first payment and complete move-in bill."
    },
    "sources": [
      {
        "id": "listing",
        "title": "241 East 46th Street #3D — RentHop via Exa",
        "type": "Rental marketplace · advertiser claim",
        "url": "https://www.renthop.com/listings/east-46th-street/3d/77218097/show",
        "captured": "Retrieved Nov 2, 2026 via Exa; acquisition date not supplied.",
        "excerpt": "Factual summary, not a quotation: Exact unit 3D is advertised at $2,995 monthly, studio/one bath, no broker fee and immediate move-in. Claims include separate kitchen, microwave, dishwasher and hardwood flooring. Pet permission, lease length, deposit and other charges were not established."
      },
      {
        "id": "earlier",
        "title": "241 East 46th Street #3D — earlier Parallel snapshot",
        "type": "Rental marketplace · advertiser claim",
        "url": "https://www.renthop.com/listings/east-46th-street/3d/77218097/show",
        "captured": "Retrieved Nov 2, 2026 via Parallel; acquired Oct 28, 2026.",
        "excerpt": "Factual summary, not a quotation: Advertises the same exact unit at $2,995 per month with no broker fee. Immediate move-in shown. Same webpage and publisher as the Exa retrieval; not independent corroboration."
      }
    ],
    "findings": [
      {
        "level": "supported",
        "title": "Advertised price agrees across retrieved versions",
        "detail": "Both retrieved versions of the exact unit page show $2,995 monthly. This establishes consistency in the supplied snapshots, not a verified lease quote or all-in price.",
        "sourceIds": [
          "listing",
          "earlier"
        ]
      },
      {
        "level": "unknown",
        "title": "No-fee does not mean no additional costs",
        "detail": "The advertiser says there is no broker fee. Deposit, application charges, utilities, insurance and any amenity fees were not established in the retrieved text. Missing amounts are not zero.",
        "sourceIds": [
          "listing"
        ]
      },
      {
        "level": "unknown",
        "title": "Availability needs a current confirmation",
        "detail": "The retrieved listing advertises immediate move-in. TinyFish could not refresh the candidate pages because access was blocked; Exa did not supply its acquisition date. No manager has confirmed availability.",
        "sourceIds": [
          "listing"
        ]
      },
      {
        "level": "unknown",
        "title": "Pet policy is not established",
        "detail": "The retrieved page does not establish whether pets are permitted. Silence is not a no-pets rule or permission. Ask management for the unit-specific policy.",
        "sourceIds": [
          "listing"
        ]
      },
      {
        "level": "unknown",
        "title": "Official building records not assessed",
        "detail": "This report reviews marketplace text only. Complaint and violation records were not queried for this case; no safety or compliance conclusion is drawn.",
        "sourceIds": []
      }
    ],
    "questions": [
      "Is this exact unit still available, and can you send its current written rent and lease terms?",
      "Is the advertised price gross or net-effective, and are concessions conditional?",
      "What are the deposit, application charge, utilities, insurance and other recurring or move-in charges?",
      "Are pets permitted, and what restrictions apply to this exact apartment?"
    ]
  }
];
