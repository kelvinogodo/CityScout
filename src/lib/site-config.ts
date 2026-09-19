export const siteConfig = {
  name: "CityScout Realtors",
  description:
    "CityScout Realtors helps you find properties for sale in Abakaliki, Ebonyi State.",
  url: "https://cityscoutrealtors.com",
  phone: "+2348104673484",
  phoneDisplay: "+234 810 467 3484",
  // International format, digits only (wa.me requires no + or leading 0).
  whatsapp: "2347042244539",
  whatsappDisplay: "+234 704 224 4539",
  email: "cityscoutrealtors@gmail.com",
  address: "No. 22 Old Enugu Road, Abakaliki, Ebonyi State, Nigeria",
  social: {
    facebook: "https://web.facebook.com/profile.php?id=100086289660325",
    instagram: "https://www.instagram.com/cityscoutrealtors/",
  },
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
