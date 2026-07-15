// Navigation configuration: maps nav item names to routes
export interface NavItem {
  name: string;
  path: string;
}

export const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Amplifiers", path: "/amplifiers/" },
  { name: "Speakers", path: "/speakers/" },
  { name: "Subwoofers", path: "/subwoofers/" },
  { name: "Sleds", path: "/sleds/" },
  { name: "Support", path: "/support/" },
];

// Helper: convert a nav name to a route path
export function getRouteByName(name: string): string {
  const item = navItems.find(
    (n) => n.name.toLowerCase() === name.toLowerCase()
  );
  return item ? item.path : "/";
}

// Category data for product category pages
export interface CategoryPageData {
  title: string;
  accent: string;
  subtitle: string;
  heroImage: string;
  description: string;
  products: {
    badge: string;
    series: string;
    name: string;
    description: string;
    rating: number;
    reviews: number;
    currentPrice: string;
    originalPrice: string;
    image: string;
  }[];
}

export const categoryData: Record<string, CategoryPageData> = {
  amplifiers: {
    title: "Amplifiers",
    accent: "Series",
    subtitle: "Power Your Sound System",
    heroImage:
      "https://cdn.shopify.com/s/files/1/1690/0705/files/amplifiers-corrected_650x.jpg?v=1676307831",
    description:
      "ABCDE amplifiers deliver clean, powerful sound with Class D technology. From monoblock to multi-channel, we have the perfect amp for your build.",
    products: [
      {
        badge: "Best Seller",
        series: "ABCDE Series",
        name: "ABCDE-2000.1D",
        description: "2000W RMS Monoblock Class D Amplifier",
        rating: 5,
        reviews: 127,
        currentPrice: "$299.99",
        originalPrice: "$449.99",
        image:
          "https://cdn.shopify.com/s/files/1/1690/0705/files/amplifiers-corrected_650x.jpg?v=1676307831",
      },
      {
        badge: "New",
        series: "AT Series v2",
        name: "ATv2-200.4D",
        description: "4-Channel Class D Amplifier",
        rating: 4,
        reviews: 54,
        currentPrice: "$229.99",
        originalPrice: "$329.99",
        image:
          "https://cdn.shopify.com/s/files/1/1690/0705/files/amplifiers-corrected_650x.jpg?v=1676307831",
      },
      {
        badge: "",
        series: "ABCDE Series",
        name: "ABCDE-1000.4D",
        description: "1000W 4-Channel Class D Amplifier",
        rating: 5,
        reviews: 89,
        currentPrice: "$199.99",
        originalPrice: "$279.99",
        image:
          "https://cdn.shopify.com/s/files/1/1690/0705/files/amplifiers-corrected_650x.jpg?v=1676307831",
      },
      {
        badge: "Sale",
        series: "AT Series",
        name: "AT-1200.1D",
        description: "1200W RMS Monoblock Amplifier",
        rating: 4,
        reviews: 67,
        currentPrice: "$159.99",
        originalPrice: "$229.99",
        image:
          "https://cdn.shopify.com/s/files/1/1690/0705/files/amplifiers-corrected_650x.jpg?v=1676307831",
      },
    ],
  },
  speakers: {
    title: "Speakers",
    accent: "Collection",
    subtitle: "Crystal Clear Sound",
    heroImage:
      "https://cdn.shopify.com/s/files/1/1690/0705/files/speakers_650x.jpg?v=1664730896",
    description:
      "Experience premium sound quality with ABCDE speakers. From component systems to coaxial, our speakers deliver crystal clear highs and deep mids.",
    products: [
      {
        badge: "Best Seller",
        series: "Meso Series",
        name: "MESO-6.5",
        description: "6.5 Inch 2-Way Component Speaker System",
        rating: 5,
        reviews: 94,
        currentPrice: "$149.99",
        originalPrice: "$199.99",
        image:
          "https://cdn.shopify.com/s/files/1/1690/0705/files/speakers_650x.jpg?v=1664730896",
      },
      {
        badge: "New",
        series: "AT Series",
        name: "AT-6X9",
        description: "6x9 Inch 3-Way Coaxial Speakers",
        rating: 4,
        reviews: 41,
        currentPrice: "$89.99",
        originalPrice: "$129.99",
        image:
          "https://cdn.shopify.com/s/files/1/1690/0705/files/speakers_650x.jpg?v=1664730896",
      },
      {
        badge: "",
        series: "Meso Series",
        name: "MESO-6",
        description: "6.5 Inch Midrange Speaker (Pair)",
        rating: 5,
        reviews: 52,
        currentPrice: "$119.99",
        originalPrice: "$169.99",
        image:
          "https://cdn.shopify.com/s/files/1/1690/0705/files/speakers_650x.jpg?v=1664730896",
      },
      {
        badge: "Sale",
        series: "AT Series",
        name: "AT-TWEETER",
        description: "1 Inch Silk Dome Tweeters (Pair)",
        rating: 4,
        reviews: 38,
        currentPrice: "$49.99",
        originalPrice: "$79.99",
        image:
          "https://cdn.shopify.com/s/files/1/1690/0705/files/speakers_650x.jpg?v=1664730896",
      },
    ],
  },
  subwoofers: {
    title: "Subwoofers",
    accent: "Lineup",
    subtitle: "Feel The Bass",
    heroImage:
      "https://cdn.shopify.com/s/files/1/1690/0705/files/subwoofers1_650x.jpg?v=1664730876",
    description:
      "ABCDE subwoofers are built for bass enthusiasts. With high-power handling and precision engineering, our subs deliver earth-shaking low frequencies.",
    products: [
      {
        badge: "Best Seller",
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
        badge: "New",
        series: "ABCDE Series",
        name: "ABCDE-15 D4",
        description: "2000W RMS 15-Inch Subwoofer Dual 4 Ohm",
        rating: 5,
        reviews: 34,
        currentPrice: "$249.99",
        originalPrice: "$349.99",
        image:
          "https://cdn.shopify.com/s/files/1/1690/0705/files/subwoofers1_650x.jpg?v=1664730876",
      },
      {
        badge: "",
        series: "Meso Series",
        name: "MESO-10 D4",
        description: "1000W RMS 10-Inch Subwoofer Dual 4 Ohm",
        rating: 4,
        reviews: 56,
        currentPrice: "$149.99",
        originalPrice: "$209.99",
        image:
          "https://cdn.shopify.com/s/files/1/1690/0705/files/subwoofers1_650x.jpg?v=1664730876",
      },
      {
        badge: "Sale",
        series: "AT Series",
        name: "AT-8 D2",
        description: "600W RMS 8-Inch Subwoofer Dual 2 Ohm",
        rating: 4,
        reviews: 29,
        currentPrice: "$89.99",
        originalPrice: "$129.99",
        image:
          "https://cdn.shopify.com/s/files/1/1690/0705/files/subwoofers1_650x.jpg?v=1664730876",
      },
    ],
  },
  sleds: {
    title: "Sleds",
    accent: "& Enclosures",
    subtitle: "Ready-To-Run Bass Packages",
    heroImage:
      "https://cdn.shopify.com/s/files/1/1690/0705/files/wiring-kits_650x.jpg?v=1664730938",
    description:
      "ABCDE Sleds are complete bass packages with subwoofer, enclosure, and amplifier pre-matched for optimal performance. Just install and enjoy.",
    products: [
      {
        badge: "Best Seller",
        series: "Sled Series",
        name: "SLED-12-2000",
        description: "12 Inch Sub + Enclosure + 2000W Amp Package",
        rating: 5,
        reviews: 72,
        currentPrice: "$499.99",
        originalPrice: "$749.99",
        image:
          "https://cdn.shopify.com/s/files/1/1690/0705/files/wiring-kits_650x.jpg?v=1664730938",
      },
      {
        badge: "New",
        series: "Sled Series",
        name: "SLED-15-2500",
        description: "15 Inch Sub + Enclosure + 2500W Amp Package",
        rating: 5,
        reviews: 28,
        currentPrice: "$649.99",
        originalPrice: "$899.99",
        image:
          "https://cdn.shopify.com/s/files/1/1690/0705/files/wiring-kits_650x.jpg?v=1664730938",
      },
      {
        badge: "",
        series: "Sled Series",
        name: "SLED-10-1200",
        description: "10 Inch Sub + Enclosure + 1200W Amp Package",
        rating: 4,
        reviews: 45,
        currentPrice: "$379.99",
        originalPrice: "$529.99",
        image:
          "https://cdn.shopify.com/s/files/1/1690/0705/files/wiring-kits_650x.jpg?v=1664730938",
      },
      {
        badge: "Sale",
        series: "Sled Series",
        name: "SLED-8-800",
        description: "8 Inch Sub + Enclosure + 800W Amp Package",
        rating: 4,
        reviews: 19,
        currentPrice: "$299.99",
        originalPrice: "$429.99",
        image:
          "https://cdn.shopify.com/s/files/1/1690/0705/files/wiring-kits_650x.jpg?v=1664730938",
      },
    ],
  },
};
