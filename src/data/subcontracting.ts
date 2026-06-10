export interface Capability {
  trade: string;
  description: string;
  capacity: string;
  equipment: string[];
}

export interface SubProject {
  clientContractor: string;
  projectName: string;
  trade: string;
  volume: string;
  location: string;
  year: number;
  outcome: string;
}

export const capabilities: Capability[] = [
  {
    trade: "RCC Structural Work",
    description: "Columns, beams, slabs, footings, and raft foundations. Works to IS 456 with proper curing and cover supervision.",
    capacity: "Up to 20,000 sq ft / month",
    equipment: ["Transit mixer (2 units)", "Concrete vibrators (4 units)", "Bar bending machine", "Column formwork sets"],
  },
  {
    trade: "Masonry & Blockwork",
    description: "Brick, AAC block, and stone masonry for load-bearing, partition, and boundary walls.",
    capacity: "Up to 15,000 sq ft / month",
    equipment: ["Scaffolding system (3 sets)", "Mortar mixer", "Masonry tools & platforms"],
  },
  {
    trade: "Excavation & Earthwork",
    description: "Plot excavation, cut-and-fill, hard rock excavation, and slope earthwork on hill terrain.",
    capacity: "Up to 5,000 cum / month",
    equipment: ["JCB excavator (1 unit)", "Tipper trucks (3 units)", "Plate compactor"],
  },
  {
    trade: "Slope Protection & Retaining Walls",
    description: "RCC retaining walls, breast walls, gabion structures, and toe protection for roads and hill sites.",
    capacity: "Up to 500 running metres / month",
    equipment: ["Shuttering frames", "Concrete pump", "Transit mixer", "Scaffolding"],
  },
  {
    trade: "Plastering & Waterproofing",
    description: "Internal and external plastering, terrace waterproofing with membrane/coating systems, basement tanking.",
    capacity: "Up to 25,000 sq ft / month",
    equipment: ["Plastering machines", "Waterproofing spray applicators", "Grinding machines"],
  },
  {
    trade: "Formwork & Shuttering",
    description: "Supply, erection, and striking of formwork for slabs, columns, beams, and retaining structures.",
    capacity: "Up to 30,000 sq ft / month",
    equipment: ["Steel prop systems (200 units)", "MS plate formwork", "Centering frames", "Beam props"],
  },
  {
    trade: "Drainage & Underground Works",
    description: "Storm drains, sewerage lines, manholes, culvert construction, and water main trenching.",
    capacity: "Up to 800 running metres / month",
    equipment: ["Excavator", "Pipe laying tools", "Compactor", "Dewatering pump"],
  },
];

export const subProjects: SubProject[] = [
  {
    clientContractor: "Khanday Infrastructure Pvt Ltd",
    projectName: "VUP & LVUP Construction — Delhi-Amritsar-Katra Expressway, Pathankot Link Road",
    trade: "RCC Structural Work",
    volume: "VUP (1+375 & 3+015) + LVUP (3+900)",
    location: "Pathankot Link Road, Punjab (NH-44, Km 0–12.345)",
    year: 2025,
    outcome: "Vehicular and light vehicular underpasses constructed to approved drawings and BOQ; completion certificate issued Jan 2026",
  },
  {
    clientContractor: "Bharat Constructions India Pvt Ltd",
    projectName: "Box Culvert Construction — Pathankot–Mandi Highway",
    trade: "RCC Structural Work",
    volume: "Box culvert at CH: 28+630",
    location: "Pathankot–Mandi Highway, Himachal Pradesh",
    year: 2025,
    outcome: "Box culvert executed to structural drawings and technical specifications; virtual completion certificate issued Feb 2026",
  },
  {
    clientContractor: "GIL-TPL JV (GMR + Tata Projects Ltd)",
    projectName: "Drain & Minor RCC Bridges — Pilakhni to Sahnewal",
    trade: "Drainage & Underground Works",
    volume: "Multi-package (5 work orders, PKG 301)",
    location: "Pilakhni–Sahnewal stretch, Punjab",
    year: 2022,
    outcome: "Drain and minor rub bridge works completed across 5 packages; virtual completion certificate issued June 2022 by GIL-TPL JV",
  },
];

export const equipmentList = [
  { item: "JCB Excavator", count: 1 },
  { item: "Transit Mixer (6 cum)", count: 2 },
  { item: "Tipper Trucks", count: 3 },
  { item: "Concrete Pump", count: 1 },
  { item: "Bar Bending Machine", count: 2 },
  { item: "Plate Compactor", count: 2 },
  { item: "Scaffolding Sets", count: 3 },
  { item: "Steel Prop Systems", count: 200 },
  { item: "Concrete Vibrators", count: 4 },
  { item: "Dewatering Pumps", count: 2 },
];
