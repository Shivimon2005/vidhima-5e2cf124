export type TenderType = "Roads" | "Building" | "Drainage" | "Slope Protection" | "Infrastructure";

export interface Tender {
  name: string;
  department: string;
  contractValue?: string;
  year: number;
  type: TenderType;
  status: "Completed" | "Ongoing";
  location: string;
  scope: string[];
}

export const tenders: Tender[] = [
  {
    name: "Inscription Plaques — DFCCIL Bridges & Cable Duct Cover Slabs, PKYN–SNL Section",
    department: "DFCCIL / EDFC Field Unit, Ambala-Civil",
    year: 2025,
    type: "Infrastructure",
    status: "Ongoing",
    location: "Ambala, Haryana",
    scope: [
      "Providing & fixing cast in-situ inscription plaques on 268 DFCCIL bridges",
      "Cover slab inscriptions on drain & S&T cable ducts",
      "Masonry, precast RCC, and cement plaster finishing works",
      "PKYN–SNL section under CGM/DFCCIL/Ambala — awarded Dec 2025",
    ],
  },
];

export const credentials = [
  { label: "Contractor Class", value: "Class-I Registered" },
  { label: "Empanelled With", value: "HP Govt. Departments" },
  { label: "GST", value: "Registered & Compliant" },
  { label: "PAN", value: "Active" },
  { label: "EPF / ESI", value: "Compliant Workforce" },
  { label: "Max Single Contract", value: "₹3 Crore" },
];
