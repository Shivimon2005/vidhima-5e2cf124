export interface SiteContact {
  displayPhone: string;
  telHref: string;
  waNumber: string;
  waText: string;
}

const construction: SiteContact = {
  displayPhone: "+91 62308 23269",
  telHref: "tel:+916230823269",
  waNumber: "916230823269",
  waText: "Hi, I'm interested in construction services in Himachal Pradesh.",
};

const designStudio: SiteContact = {
  displayPhone: "+91 85805 04989",
  telHref: "tel:+918580504989",
  waNumber: "918580504989",
  waText:
    "Hi Vidhima Design Studio, I would like to consult with an architect regarding design services for my project in Himachal Pradesh.",
};

/** Studio pages use the studio number everywhere; the rest of the site keeps the construction number. */
export const getContact = (pathname: string): SiteContact =>
  pathname.startsWith("/design-studio") ? designStudio : construction;

export const waLink = (c: SiteContact) =>
  `https://wa.me/${c.waNumber}?text=${encodeURIComponent(c.waText)}`;
