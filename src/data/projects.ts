import neelamImg1 from "@/assets/vidhima real estate assets/WhatsApp Image 2026-05-29 at 14.46.16 (1).jpeg";
import neelamImg2 from "@/assets/vidhima real estate assets/WhatsApp Image 2026-05-29 at 14.46.16.jpeg";
import neelamImg3 from "@/assets/vidhima real estate assets/WhatsApp Image 2026-05-30 at 16.30.52.jpeg";
import neelamImg4 from "@/assets/vidhima real estate assets/WhatsApp Image 2026-05-30 at 16.30.56.jpeg";
import neelamImg5 from "@/assets/vidhima real estate assets/WhatsApp Image 2026-05-30 at 16.30.58.jpeg";
import neelamImg6 from "@/assets/vidhima real estate assets/WhatsApp Image 2026-05-30 at 16.31.07.jpeg";
import neelamImg7 from "@/assets/vidhima real estate assets/WhatsApp Image 2026-05-30 at 16.31.28.jpeg";
import neelamImg8 from "@/assets/vidhima real estate assets/WhatsApp Image 2026-05-30 at 16.31.37.jpeg";
import neelamImg9 from "@/assets/vidhima real estate assets/WhatsApp Image 2026-05-30 at 16.31.41.jpeg";
import neelamImg10 from "@/assets/vidhima real estate assets/WhatsApp Image 2026-05-30 at 16.31.44.jpeg";
import neelamImg11 from "@/assets/vidhima real estate assets/WhatsApp Image 2026-05-30 at 16.31.48.jpeg";
import neelamImg12 from "@/assets/vidhima real estate assets/WhatsApp Image 2026-05-30 at 16.31.54.jpeg";

export type ProjectStatus = "completed" | "ongoing" | "upcoming";
export type ProjectType = "Residential" | "Commercial" | "Mixed Use" | "Hostel / Guest House";

export interface Milestone {
  label: string;
  status: "done" | "active" | "upcoming";
  note?: string;
}

export interface Project {
  slug: string;
  name: string;
  type: ProjectType;
  subType: string;
  location: string;
  status: ProjectStatus;
  coverImage: string;
  images: string[];
  outcome: string;
  description: string;
  specs: {
    area?: string;
    floors?: string;
    duration?: string;
    budget?: string;
    completedYear?: string;
  };
  highlights: string[];
  milestones?: Milestone[];
}

export const projects: Project[] = [
  {
    slug: "neelam-residence-yol",
    name: "Neelam Residence — Tang, Narwana",
    type: "Residential",
    subType: "G+2 Family Home",
    location: "Tang, Narwana",
    status: "ongoing",
    coverImage: neelamImg4,
    images: [neelamImg1, neelamImg2, neelamImg3, neelamImg4, neelamImg5, neelamImg6, neelamImg7, neelamImg8, neelamImg9, neelamImg10, neelamImg11, neelamImg12],
    outcome: "G+2 family residence — structural frame complete, finishing work in progress",
    description:
      "A G+2 residential project for Neelam Ma'am on a well-located plot in Tang, Narwana. Designed as a spacious family home with RCC frame construction, seismic Zone IV compliance, and a practical layout tailored to the client's requirements. The structural frame is complete and interior finishing is now underway.",
    specs: {
      area: "3000 sq ft",
      floors: "Ground + 2",
      duration: "6 months",
      budget: "₹2.5 Crores",
    },
    highlights: [
      "Seismic Zone IV compliant RCC frame",
      "Structural frame complete",
      "Interior finishing in progress",
      "Client-approved layout with dedicated parking",
    ],
    milestones: [
      { label: "Site Preparation & Excavation", status: "done" },
      { label: "Foundation & Plinth Beam", status: "done" },
      { label: "Ground Floor RCC Frame", status: "done" },
      { label: "First Floor RCC Frame", status: "done" },
      { label: "Second Floor (G+2) RCC Frame", status: "done" },
      { label: "Brick Masonry & Internal Walls", status: "done" },
      { label: "Interior Plastering & Finishing", status: "active", note: "In progress" },
      { label: "Flooring, Tiles & Fixtures", status: "upcoming" },
      { label: "External Finishing & Painting", status: "upcoming" },
      { label: "Handover to Client", status: "upcoming" },
    ],
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const getProjectsByStatus = (status: ProjectStatus) =>
  projects.filter((p) => p.status === status);
