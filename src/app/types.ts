// Type definitions for the homepage data structure
// This interface is used by both the server component (to prepare data from Prismic)
// and the client component (to render the UI)

export interface Product {
  badge: string;
  series: string;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  currentPrice: string;
  originalPrice: string;
  image: string;
}

export interface Category {
  name: string;
  image: string;
}

export interface Feature {
  title: string;
  subtitle: string;
  iconPath: string;
}

export type HomepageSection =
  | { type: "category_grid"; categories: Category[] }
  | { type: "features_strip"; features: Feature[] }
  | {
      type: "featured_products";
      sectionTitle: string;
      sectionTitleAccent: string;
      sectionSubtitle: string;
      products: Product[];
    }
  | {
      type: "newsletter";
      title: string;
      description: string;
      disclaimer: string;
    };

export interface HomepageData {
  promoBannerText: string;
  navItems: string[];
  hero: {
    title: string;
    titleAccent: string;
    subtitle: string;
    ctaText: string;
    backgroundImage: string;
  };
  popup: {
    title: string;
    discount: string;
    subtitle: string;
    buttonText: string;
  };
  footer: {
    description: string;
    copyright: string;
  };
  sections: HomepageSection[];
}

// Default/fallback data used when Prismic content is not yet available
export const defaultHomepageData: HomepageData = {
  promoBannerText: "Orders Before 4 PM CST Ship Same Day!",
  navItems: [
    "Amplifiers",
    "Subwoofers",
    "Speakers",
    "Wiring & Accessories",
    "Empty Subwoofer Boxes",
    "Loaded Subwoofer Boxes",
    "Complete Packages",
  ],
  hero: {
    title: "Power Your",
    titleAccent: "Ride",
    subtitle: "Premium Car Audio Equipment",
    ctaText: "Shop Now",
    backgroundImage:
      "https://cdn.shopify.com/s/files/1/1690/0705/files/ctsound-main-hero.jpg?v=1664730765&width=2400",
  },
  popup: {
    title: "Unlock",
    discount: "11% OFF",
    subtitle: "Your First Order",
    buttonText: "Get My Discount Now",
  },
  footer: {
    description:
      "ABCDE is a leading manufacturer of high-quality car audio equipment including amplifiers, subwoofers, speakers, and wiring accessories. Built for enthusiasts who demand the best.",
    copyright: "© 2026 ABCDE. All Rights Reserved.",
  },
  sections: [
    {
      type: "category_grid",
      categories: [
        {
          name: "Amplifiers",
          image:
            "https://cdn.shopify.com/s/files/1/1690/0705/files/amplifiers-corrected_650x.jpg?v=1676307831",
        },
        {
          name: "Subwoofers",
          image:
            "https://cdn.shopify.com/s/files/1/1690/0705/files/subwoofers1_650x.jpg?v=1664730876",
        },
        {
          name: "Speakers",
          image:
            "https://cdn.shopify.com/s/files/1/1690/0705/files/speakers_650x.jpg?v=1664730896",
        },
        {
          name: "Wiring Kits",
          image:
            "https://cdn.shopify.com/s/files/1/1690/0705/files/wiring-kits_650x.jpg?v=1664730938",
        },
      ],
    },
    {
      type: "features_strip",
      features: [
        {
          title: "Same Day Shipping",
          subtitle: "Orders before 4 PM CST",
          iconPath:
            "M3 7v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm10 2h6v3h-6V9zm0 5h6v3h-6v-3zM5 9h6v8H5V9z",
        },
        {
          title: "2 Year Warranty",
          subtitle: "On all products",
          iconPath:
            "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
        },
        {
          title: "Quality Guaranteed",
          subtitle: "Premium materials",
          iconPath:
            "M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z",
        },
        {
          title: "Expert Support",
          subtitle: "Mon-Fri 9AM-5PM CST",
          iconPath:
            "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",
        },
      ],
    },
    {
      type: "featured_products",
      sectionTitle: "Featured",
      sectionTitleAccent: "Products",
      sectionSubtitle: "Top-rated car audio gear from our most popular series",
      products: [
        {
          badge: "Best Seller",
          series: "ABCDE Series",
          name: "ABCDE-2000.1D",
          description: "2000W RMS Monoblock Car Audio Amplifier",
          rating: 5,
          reviews: 127,
          currentPrice: "$299.99",
          originalPrice: "$449.99",
          image:
            "https://cdn.shopify.com/s/files/1/1690/0705/files/amplifiers-corrected_650x.jpg?v=1676307831",
        },
        {
          badge: "New",
          series: "Meso Series",
          name: "MESO-12 D2",
          description: "1500W RMS 12-Inch Subwoofer Dual 2 Ohm",
          rating: 5,
          reviews: 89,
          currentPrice: "$189.99",
          originalPrice: "$279.99",
          image:
            "https://cdn.shopify.com/s/files/1/1690/0705/files/subwoofers1_650x.jpg?v=1664730876",
        },
        {
          badge: "",
          series: "AT Series v2",
          name: "ATv2-200.4D",
          description: "4-Channel Class D Car Audio Amplifier",
          rating: 4,
          reviews: 54,
          currentPrice: "$229.99",
          originalPrice: "$329.99",
          image:
            "https://cdn.shopify.com/s/files/1/1690/0705/files/speakers_650x.jpg?v=1664730896",
        },
        {
          badge: "Sale",
          series: "Wiring",
          name: "0 Gauge Amp Kit",
          description: "Complete 0 GA Amplifier Wiring Installation Kit",
          rating: 5,
          reviews: 203,
          currentPrice: "$79.99",
          originalPrice: "$119.99",
          image:
            "https://cdn.shopify.com/s/files/1/1690/0705/files/wiring-kits_650x.jpg?v=1664730938",
        },
      ],
    },
    {
      type: "newsletter",
      title: "Sign Up And Save",
      description:
        "Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.",
      disclaimer:
        'By submitting this form and signing up for texts, you consent to receive marketing text messages (e.g. promos, cart reminders) from ABCDE at the number provided, including messages sent by autodialer. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Unsubscribe at any time by replying STOP.',
    },
  ],
};
