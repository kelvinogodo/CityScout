// Illustrative content only. Every row seeded from here is flagged
// `is_sample = true`, shown with a "Sample listing" badge on the site, and
// removed by `node scripts/clear-sample.mjs`. Photos are stock images of
// Nigerian buildings (see public/images/CREDITS.md), not real CityScout
// inventory. Replace with real listings through /admin as soon as possible.

export const sampleProperties = [
  {
    slug: "sample-modern-duplex-abakaliki",
    location: "GRA, Abakaliki, Ebonyi State",
    price: 85000000,
    type: "house",
    listing_status: "for_sale",
    bedrooms: 4,
    bathrooms: 5,
    land_size_sqm: null,
    title_document: "c_of_o",
    price_negotiable: true,
    description:
      "Sample listing. A contemporary detached duplex with a brick-clad upper floor, tiled roof and a fully walled, gated compound. Shown for illustration of how listings appear on this site.",
    images: {
      front: "samples/abuja-duplex-front.jpg",
      side: "samples/abuja-duplex-side.jpg",
      back: "samples/abuja-duplex-detail.jpg",
    },
  },
  {
    slug: "sample-terrace-bungalows-abakaliki",
    location: "Old Enugu Road, Abakaliki, Ebonyi State",
    price: 38500000,
    type: "house",
    listing_status: "for_sale",
    bedrooms: 3,
    bathrooms: 3,
    land_size_sqm: null,
    title_document: null,
    price_negotiable: false,
    description:
      "Sample listing. A row of well-kept bungalows with arched entrances, landscaped frontage and shaded parking under mature palms. Shown for illustration of how listings appear on this site.",
    images: {
      front: "samples/abuja-bungalows.jpg",
      side: "samples/abuja-bungalows-palms.jpg",
      back: "samples/abuja-bungalows-entrance.jpg",
    },
  },
  {
    slug: "sample-tower-apartment-abakaliki",
    location: "CBD, Abakaliki, Ebonyi State",
    price: 4500000,
    type: "house",
    listing_status: "for_rent",
    bedrooms: 3,
    bathrooms: 4,
    land_size_sqm: null,
    title_document: null,
    price_negotiable: false,
    description:
      "Sample listing. A spacious three-bedroom apartment in a secure residential tower with covered entrance, parking and a landscaped forecourt. Rent is quoted per year. Shown for illustration of how rental listings appear on this site.",
    images: {
      front: "samples/lagos-tower-front.jpg",
      side: "samples/lagos-development.jpg",
      back: "samples/lagos-tower-dusk.jpg",
    },
  },
  {
    slug: "sample-farmland-plantation-ishielu",
    location: "Ishielu, Ebonyi State",
    price: 12000000,
    type: "land",
    listing_status: "for_sale",
    bedrooms: null,
    bathrooms: null,
    land_size_sqm: 20000,
    title_document: "survey_plan",
    price_negotiable: true,
    description:
      "Sample listing. Two hectares of established plantation land with farm tracks between the blocks and water nearby. Suited to agriculture or agri-business. Shown for illustration of how land listings appear on this site.",
    images: {
      front: "samples/farm-plantation-aerial.jpg",
      side: "samples/farm-plantation-blocks.jpg",
      back: "samples/farm-plantation-paths.jpg",
    },
  },
  {
    slug: "sample-green-estate-plot-afikpo",
    location: "Afikpo North, Ebonyi State",
    price: 6500000,
    type: "land",
    listing_status: "for_sale",
    bedrooms: null,
    bathrooms: null,
    land_size_sqm: 648,
    title_document: "c_of_o",
    price_negotiable: false,
    description:
      "Sample listing. A full plot in a quiet, green setting with mature trees, a motorable access road and nearby institutions. Shown for illustration of how land listings appear on this site.",
    images: {
      front: "samples/plateau-front.jpg",
      side: "samples/plateau-buildings.jpg",
      back: "samples/plateau-grounds.jpg",
    },
  },
  {
    slug: "sample-neighbourhood-plots-abakaliki",
    location: "Enugu Expressway, Abakaliki, Ebonyi State",
    price: 9500000,
    type: "land",
    listing_status: "for_sale",
    bedrooms: null,
    bathrooms: null,
    land_size_sqm: 600,
    title_document: "governors_consent",
    price_negotiable: true,
    description:
      "Sample listing. A residential plot within an established, fast-growing neighbourhood, close to the main road, markets and schools. Shown for illustration of how land listings appear on this site.",
    images: {
      front: "samples/neighbourhood-town.jpg",
      side: "hero/abuja-hillside.jpg",
      back: "hero/city-palms.jpg",
    },
  },
];

const disclaimer =
  "<p><em>General guidance only, not legal advice. Sample article shown for illustration.</em></p>";

export const samplePosts = [
  {
    slug: "sample-checks-before-buying-land-in-nigeria",
    title: "Six checks before you buy land in Nigeria",
    author: "CityScout Realtors",
    category: "featured",
    image: "hero/lagos-ikoyi.jpg",
    alt: "Aerial view of a residential district in Lagos, Nigeria",
    seo_title: "Six checks before you buy land in Nigeria",
    meta: "A practical checklist for buyers: verify ownership, title documents, survey, and site before you pay.",
    body: `<p>Buying land is usually the biggest purchase a family makes. A few careful checks before you pay can save years of dispute.</p>
<ol>
<li><strong>Verify the seller.</strong> Confirm the person selling is the true owner or a properly authorised agent, and take copies of their identification.</li>
<li><strong>Ask for the title documents.</strong> Depending on the land, these can include a Certificate of Occupancy, a Deed of Assignment, and evidence of any required government consent.</li>
<li><strong>Search the land registry.</strong> Confirm the land is not subject to a prior sale, mortgage, or court case.</li>
<li><strong>Commission your own survey.</strong> A licensed surveyor can confirm boundaries and check for government acquisition or setback issues.</li>
<li><strong>Use a lawyer.</strong> Have a property lawyer review every document before money changes hands.</li>
<li><strong>Visit the site, more than once.</strong> Go in different weather to check drainage, flooding, and access.</li>
</ol>
<p>Pay through traceable channels and keep every receipt.</p>${disclaimer}`,
  },
  {
    slug: "sample-bungalow-or-duplex",
    title: "Bungalow or duplex: which suits your family?",
    author: "CityScout Realtors",
    category: "normal",
    image: "hero/abuja-hillside.jpg",
    alt: "Rooftops of a residential neighbourhood in Abuja, Nigeria",
    seo_title: "Bungalow or duplex: which suits your family?",
    meta: "Compare bungalows and duplexes on plot size, cost, maintenance, and long-term resale.",
    body: `<p>Both styles work well in Nigerian cities. The better choice depends on your plot, budget, and how your household will change.</p>
<h3>Bungalows</h3>
<p>Single-storey living is easier for elderly relatives and young children, and is usually cheaper to build and maintain. It needs a larger plot for the same floor area.</p>
<h3>Duplexes</h3>
<p>Two floors use a smaller plot more efficiently and can separate living and sleeping areas. They cost more to build and maintain, and stairs may not suit everyone.</p>
<p>Whichever you choose, check the roof, drainage, and water supply first.</p>${disclaimer}`,
  },
  {
    slug: "sample-what-to-inspect-on-a-property-visit",
    title: "What to inspect on a property visit",
    author: "CityScout Realtors",
    category: "normal",
    image: "hero/city-palms.jpg",
    alt: "A Nigerian town with palm trees and hills",
    seo_title: "What to inspect on a property visit",
    meta: "A short inspection checklist for buyers visiting a house or plot.",
    body: `<p>Photos never show everything. Take this checklist with you.</p>
<ul>
<li>Roof and ceilings: look for stains that suggest leaks.</li>
<li>Water: is there a borehole or reliable supply, and how is it stored?</li>
<li>Power: grid connection, meter status, and any backup arrangement.</li>
<li>Drainage and road access, especially in the rainy season.</li>
<li>Neighbourhood: security, noise, and nearby schools and markets.</li>
<li>Paperwork: match what you see to the documents you are shown.</li>
</ul>${disclaimer}`,
  },
];
