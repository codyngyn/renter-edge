// All properties, documents and claims in these fixtures are fictional.
export const examples = [
  {
    "format": "renter-edge-report",
    "version": 1,
    "fictional": true,
    "prepared": "November 1, 2026",
    "id": "maple-court",
    "title": "Maple Court",
    "scenario": "Mostly consistent",
    "verdict": "A few details to confirm",
    "summary": "The supplied rent terms agree. Confirm the remaining costs and current availability before taking the next step.",
    "property": {
      "name": "Maple Court",
      "area": "Brooklyn · fictional property",
      "unit": "4B",
      "layout": "1 bedroom · 1 bathroom",
      "availability": "Advertised as available in this fictional example; not independently checked."
    },
    "costs": {
      "gross": 3200,
      "amenity": 0,
      "deposit": 3200,
      "application": 20,
      "termMonths": 12,
      "freeMonths": 1,
      "unknowns": [
        "Electricity",
        "Renters insurance"
      ],
      "sourceIds": [
        "listing",
        "terms"
      ],
      "note": "One month free is averaged over the original 12-month term. The gross rent is the starting point for monthly cash planning; confirm when the credit is applied."
    },
    "sources": [
      {
        "id": "listing",
        "title": "Sample listing",
        "type": "Fictional listing",
        "url": null,
        "captured": "Fictional example · Nov 1, 2026",
        "excerpt": "Apartment 4B is a one-bedroom rental. Gross rent is $3,200 per month. A 12-month lease includes one month free. No separate amenity charge is advertised."
      },
      {
        "id": "terms",
        "title": "Sample leasing summary",
        "type": "Fictional leasing terms",
        "url": null,
        "captured": "Fictional example · Nov 1, 2026",
        "excerpt": "For apartment 4B: $3,200 monthly base rent, one month free on a 12-month lease, a $3,200 security deposit and $20 application fee per applicant. Electricity and insurance are additional; amounts are not supplied."
      }
    ],
    "findings": [
      {
        "level": "supported",
        "title": "The rent terms line up",
        "detail": "Both supplied documents state the same base rent, original lease term and concession. This supports consistency between the documents, not independent verification.",
        "sourceIds": [
          "listing",
          "terms"
        ]
      },
      {
        "level": "inferred",
        "title": "The headline discount is a lease average",
        "detail": "The calculated net-effective figure spreads the free month across the term. It does not establish what is billed in any individual month.",
        "sourceIds": [
          "listing",
          "terms"
        ]
      },
      {
        "level": "unknown",
        "title": "Two recurring costs are still open",
        "detail": "Electricity and insurance amounts are missing, so the known monthly subtotal is not an all-in budget.",
        "sourceIds": [
          "terms"
        ]
      }
    ],
    "questions": [
      "Which month receives the free-rent credit, and is that schedule included in the lease?",
      "What are the insurance requirements and typical electricity charges?",
      "Is this exact apartment still available, and can I review the current written terms?"
    ]
  },
  {
    "format": "renter-edge-report",
    "version": 1,
    "fictional": true,
    "prepared": "November 1, 2026",
    "id": "canal-house",
    "title": "Canal House",
    "scenario": "Conflicting claims",
    "verdict": "Resolve the conflicting terms",
    "summary": "The advertised number hides a higher base rent, and the supplied sources disagree about an amenity charge. Get one written cost schedule.",
    "property": {
      "name": "Canal House",
      "area": "Manhattan · fictional property",
      "unit": "8C",
      "layout": "1 bedroom · flex layout claimed",
      "availability": "Availability is not established by the supplied examples."
    },
    "costs": {
      "gross": 4200,
      "amenity": null,
      "deposit": 4200,
      "application": 20,
      "termMonths": 12,
      "freeMonths": 1,
      "unknowns": [
        "Electricity",
        "Renters insurance",
        "Flex-wall installation"
      ],
      "sourceIds": [
        "listing",
        "manager"
      ],
      "note": "Amenity charges are disputed and excluded from the known subtotal. The listing says included; the sample manager note says $85 per leaseholder. Confirm the payable amount."
    },
    "sources": [
      {
        "id": "listing",
        "title": "Sample listing",
        "type": "Fictional listing",
        "url": null,
        "captured": "Fictional example · Nov 1, 2026",
        "excerpt": "Apartment 8C is advertised at $3,850 net effective: gross rent of $4,200 with one month free on a 12-month lease. Amenities are included. The living room can be divided with a flex wall."
      },
      {
        "id": "manager",
        "title": "Sample manager note",
        "type": "Fictional manager correspondence",
        "url": null,
        "captured": "Fictional example · Nov 1, 2026",
        "excerpt": "For 8C, base rent is $4,200 per month. The amenity charge is $85 per leaseholder per month. First month, a $4,200 deposit and a $20 application fee per applicant apply. Permission and cost for a partition have not been confirmed."
      },
      {
        "id": "building",
        "title": "Sample building brochure",
        "type": "Fictional building marketing",
        "url": null,
        "captured": "Fictional example · Nov 1, 2026",
        "excerpt": "The fictional Canal House advertises a fitness room and rooftop lounge. This brochure does not specify fees, opening hours or unit-specific partition permissions."
      }
    ],
    "findings": [
      {
        "level": "conflict",
        "title": "Amenities: included or $85 extra?",
        "detail": "The listing and manager note contradict each other. The fee stays unknown in the calculator until the terms are reconciled.",
        "sourceIds": [
          "listing",
          "manager"
        ]
      },
      {
        "level": "supported",
        "title": "$3,850 is not the base rent",
        "detail": "The listing explicitly states $4,200 gross rent. Both numbers can be consistent when one month free is averaged across a year.",
        "sourceIds": [
          "listing",
          "manager"
        ]
      },
      {
        "level": "unknown",
        "title": "A flex layout is only a claim",
        "detail": "There is no unit-specific permission or installation quote in the supplied documents. A building brochure cannot establish either.",
        "sourceIds": [
          "listing",
          "manager",
          "building"
        ]
      }
    ],
    "questions": [
      "Please confirm whether amenities are included or billed at $85 per leaseholder, and put the final amount in writing.",
      "When is the free-month credit applied, and does it depend on any eligibility conditions?",
      "Is a partition permitted in 8C, and who pays for installation and removal?",
      "What is the complete move-in bill and monthly fee schedule?"
    ]
  },
  {
    "format": "renter-edge-report",
    "version": 1,
    "fictional": true,
    "prepared": "November 1, 2026",
    "id": "juniper-loft",
    "title": "Juniper Loft",
    "scenario": "Missing evidence",
    "verdict": "More information needed",
    "summary": "There is a price claim, but too little detail to establish the payable rent or move-in cost. Missing information should remain visible.",
    "property": {
      "name": "Juniper Loft",
      "area": "Queens · fictional property",
      "unit": "Not specified",
      "layout": "Studio claimed · size unknown",
      "availability": "A supplied excerpt says available soon; exact unit and date are missing."
    },
    "costs": {
      "gross": null,
      "amenity": null,
      "deposit": null,
      "application": null,
      "termMonths": null,
      "freeMonths": null,
      "unknowns": [
        "Utilities",
        "Renters insurance"
      ],
      "sourceIds": [],
      "note": "The sample advert says 'from $2,600' without identifying gross versus net rent, a unit, or a lease term. It is not used as a confirmed cost input."
    },
    "sources": [
      {
        "id": "listing",
        "title": "Sample search excerpt",
        "type": "Fictional incomplete listing",
        "url": null,
        "captured": "Fictional example · Nov 1, 2026",
        "excerpt": "Juniper Loft studios from $2,600. Available soon. Flexible terms and great amenities. Contact for details."
      }
    ],
    "findings": [
      {
        "level": "unknown",
        "title": "The price cannot be used as gross rent",
        "detail": "The excerpt does not explain the price basis, any concessions, or which apartment it describes.",
        "sourceIds": [
          "listing"
        ]
      },
      {
        "level": "unknown",
        "title": "The exact apartment is missing",
        "detail": "There is no unit identifier. Building information or another apartment's photos cannot be safely assigned to this listing.",
        "sourceIds": [
          "listing"
        ]
      },
      {
        "level": "unknown",
        "title": "No building records were supplied",
        "detail": "This example contains no official record lookup. That does not mean there are no complaints or violations.",
        "sourceIds": []
      }
    ],
    "questions": [
      "What is the exact address and unit number?",
      "Is $2,600 gross or net-effective rent, and what lease term and concessions apply?",
      "What deposits, fees and recurring charges apply to this specific apartment?",
      "Can you share the current unit-specific listing and written availability date?"
    ]
  }
];
