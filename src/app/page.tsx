import { client } from "../prismicio";
import HomePageClient from "./components/HomePageClient";
import { defaultHomepageData, type HomepageData } from "./types";
import * as prismic from "@prismicio/client";

// Fetch homepage content from Prismic at build time
async function getHomepageData(): Promise<HomepageData> {
  try {
    // Fetch the single homepage document from Prismic
    const doc = await client.getSingle("homepage");

    const data = doc.data as any;

    // Transform Prismic data into our HomepageData format
    const homepageData: HomepageData = {
      promoBannerText: data.promo_banner_text || defaultHomepageData.promoBannerText,
      navItems:
        data.nav_items?.map((item: any) => item.name).filter(Boolean) ||
        defaultHomepageData.navItems,
      hero: {
        title: data.hero_title || defaultHomepageData.hero.title,
        titleAccent:
          data.hero_title_accent || defaultHomepageData.hero.titleAccent,
        subtitle: data.hero_subtitle || defaultHomepageData.hero.subtitle,
        ctaText: data.hero_cta_text || defaultHomepageData.hero.ctaText,
        backgroundImage:
          data.hero_background_image?.url ||
          defaultHomepageData.hero.backgroundImage,
      },
      popup: {
        title: data.popup_title || defaultHomepageData.popup.title,
        discount: "11% OFF",
        subtitle: "Your First Order",
        buttonText:
          data.popup_button_text || defaultHomepageData.popup.buttonText,
      },
      footer: {
        description:
          prismic.asText(data.footer_description) ||
          defaultHomepageData.footer.description,
        copyright:
          data.footer_copyright || defaultHomepageData.footer.copyright,
      },
      sections: [],
    };

    // Transform Slice Zone into sections
    if (data.body && Array.isArray(data.body)) {
      for (const slice of data.body) {
        switch (slice.slice_type) {
          case "category_grid":
            homepageData.sections.push({
              type: "category_grid",
              categories: (slice.items || [])
                .filter((item: any) => item.name || item.image?.url)
                .map((item: any) => ({
                  name: item.name || "",
                  image: item.image?.url || "",
                })),
            });
            break;

          case "features_strip":
            homepageData.sections.push({
              type: "features_strip",
              features: (slice.items || [])
                .filter((item: any) => item.title)
                .map((item: any) => ({
                  title: item.title || "",
                  subtitle: item.subtitle || "",
                  iconPath: item.icon_path || "",
                })),
            });
            break;

          case "featured_products":
            homepageData.sections.push({
              type: "featured_products",
              sectionTitle:
                slice.primary?.section_title || "Featured",
              sectionTitleAccent:
                slice.primary?.section_title_accent || "Products",
              sectionSubtitle:
                slice.primary?.section_subtitle ||
                "Top-rated car audio gear from our most popular series",
              products: (slice.items || [])
                .filter((item: any) => item.name)
                .map((item: any) => ({
                  badge: item.badge || "",
                  series: item.series || "",
                  name: item.name || "",
                  description: item.description || "",
                  rating: item.rating || 5,
                  reviews: item.reviews || 0,
                  currentPrice: item.current_price || "",
                  originalPrice: item.original_price || "",
                  image: item.image?.url || "",
                })),
            });
            break;

          case "newsletter":
            homepageData.sections.push({
              type: "newsletter",
              title: slice.primary?.title || "Sign Up And Save",
              description:
                slice.primary?.description ||
                "Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.",
              disclaimer:
                prismic.asText(slice.primary?.disclaimer) ||
                "By submitting this form and signing up for texts, you consent to receive marketing text messages from ABCDE.",
            });
            break;
        }
      }
    }

    // If no sections were loaded from Prismic, use default data
    if (homepageData.sections.length === 0) {
      homepageData.sections = defaultHomepageData.sections;
    }

    return homepageData;
  } catch (error) {
    // If Prismic content is not available, use default static data
    console.log("Using fallback data - Prismic content not yet configured");
    return defaultHomepageData;
  }
}

export default async function Home() {
  const data = await getHomepageData();
  return <HomePageClient data={data} />;
}
