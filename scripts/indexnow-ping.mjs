const KEY      = "227a3c9bdf04483880757e6e0f820aa9";
const SITE_URL = "https://vidhima-construction-website.netlify.app";

const urls = [
  `${SITE_URL}/`,
  `${SITE_URL}/about`,
  `${SITE_URL}/services`,
  `${SITE_URL}/contact`,
  `${SITE_URL}/why-choose-us`,
  `${SITE_URL}/faq`,
  `${SITE_URL}/government-tenders`,
  `${SITE_URL}/sub-contracting`,
  `${SITE_URL}/projects`,
  `${SITE_URL}/projects/neelam-residence-yol`,
  `${SITE_URL}/leadership`,
  `${SITE_URL}/careers`,
  `${SITE_URL}/csr`,
  `${SITE_URL}/blog`,
  `${SITE_URL}/blog/house-construction-cost-kangra-palampur-2025`,
  `${SITE_URL}/blog/building-on-sloped-plot-himachal-pradesh`,
  `${SITE_URL}/blog/3-bhk-luxury-apartments-construction-palampur`,
  `${SITE_URL}/blog/premium-commercial-shop-project-kangra`,
  `${SITE_URL}/blog/student-hostel-construction-dharamshala`,
  `${SITE_URL}/blog/modern-villa-construction-palampur`,
  `${SITE_URL}/blog/mixed-use-building-construction-palampur`,
  `${SITE_URL}/blog/construction-quality-standards-residential-apartments-hp`,
];

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE_URL).hostname, key: KEY, urlList: urls }),
});

console.log(`IndexNow ping: ${res.status} ${res.statusText}`);
