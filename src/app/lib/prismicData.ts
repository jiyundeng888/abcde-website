import { createClient } from "../../prismicio";
import * as prismic from "@prismicio/client";
import {
  categoryData,
  productDetails,
  type CategoryPageData,
  type ProductDetailData,
  type ProductCardData,
} from "../components/navConfig";

/**
 * Fetch category page data from Prismic by UID.
 * Falls back to hardcoded data from navConfig.ts when Prismic content is not available.
 *
 * @param categorySlug - The category UID (e.g., "amplifiers", "speakers")
 * @returns CategoryPageData with title, accent, subtitle, heroImage, description, and products
 */
export async function getCategoryPageData(
  categorySlug: string
): Promise<CategoryPageData> {
  try {
    const client = createClient();
    const doc = await client.getByUID("category_page", categorySlug).catch(() => null);

    if (!doc) {
      console.log(`No category_page document found for UID "${categorySlug}", using fallback data`);
      return categoryData[categorySlug];
    }

    const data = doc.data as any;

    // Transform Prismic category page data
    const fallback = categoryData[categorySlug];
    const products: ProductCardData[] = (data.products || [])
      .filter((item: any) => item.name || item.slug)
      .map((item: any) => ({
        badge: item.badge || "",
        series: item.series || "",
        name: item.name || "",
        slug: item.slug || "",
        description: item.description || "",
        rating: item.rating || 5,
        reviews: item.reviews || 0,
        currentPrice: item.current_price || "",
        originalPrice: item.original_price || "",
        image: item.image?.url || fallback?.heroImage || "",
      }));

    return {
      title: data.title || fallback?.title || categorySlug,
      accent: data.accent || fallback?.accent || "",
      subtitle: data.subtitle || fallback?.subtitle || "",
      heroImage: data.hero_image?.url || fallback?.heroImage || "",
      description: data.description || fallback?.description || "",
      products: products.length > 0 ? products : fallback?.products || [],
    };
  } catch (error) {
    console.log(`Error fetching category page "${categorySlug}" from Prismic, using fallback:`, error);
    return categoryData[categorySlug];
  }
}

/**
 * Fetch product detail data from Prismic by UID (slug).
 * Falls back to hardcoded data from navConfig.ts when Prismic content is not available.
 *
 * @param slug - The product UID (e.g., "abcde-2000-1d")
 * @param expectedCategory - Optional category to validate (e.g., "amplifiers")
 * @returns ProductDetailData or null if not found
 */
export async function getProductDetailData(
  slug: string,
  expectedCategory?: string
): Promise<ProductDetailData | null> {
  try {
    const client = createClient();
    const doc = await client.getByUID("product", slug).catch(() => null);

    if (!doc) {
      console.log(`No product document found for UID "${slug}", using fallback data`);
      const fallback = productDetails[slug];
      if (!fallback) return null;
      if (expectedCategory && fallback.categorySlug !== expectedCategory) return null;
      return fallback;
    }

    const data = doc.data as any;
    const fallback = productDetails[slug];

    // Determine category
    const categorySlug = data.category || fallback?.categorySlug || "";
    if (expectedCategory && categorySlug !== expectedCategory) return null;

    // Map category slug to display name
    const categoryNames: Record<string, string> = {
      amplifiers: "Amplifiers",
      speakers: "Speakers",
      subwoofers: "Subwoofers",
      sleds: "Sleds",
    };

    // Transform Prismic product data
    const specs = (data.specs || [])
      .filter((item: any) => item.label)
      .map((item: any) => ({
        label: item.label || "",
        value: item.value || "",
      }));

    const features = (data.features || [])
      .filter((item: any) => item.text)
      .map((item: any) => item.text || "");

    const whatsIncluded = (data.whats_included || [])
      .filter((item: any) => item.item)
      .map((item: any) => item.item || "");

    // Convert RichText long_description to plain text
    const longDesc = data.long_description
      ? prismic.asText(data.long_description)
      : fallback?.longDesc || "";

    return {
      name: data.name || fallback?.name || "",
      slug: slug,
      series: data.series || fallback?.series || "",
      category: categoryNames[categorySlug] || fallback?.category || "",
      categorySlug: categorySlug,
      badge: data.badge || fallback?.badge || "",
      shortDesc: data.short_description || fallback?.shortDesc || "",
      longDesc: longDesc,
      rating: data.rating || fallback?.rating || 5,
      reviews: data.reviews || fallback?.reviews || 0,
      currentPrice: data.current_price || fallback?.currentPrice || "",
      originalPrice: data.original_price || fallback?.originalPrice || "",
      image: data.image?.url || fallback?.image || "",
      specs: specs.length > 0 ? specs : fallback?.specs || [],
      features: features.length > 0 ? features : fallback?.features || [],
      whatsIncluded: whatsIncluded.length > 0 ? whatsIncluded : fallback?.whatsIncluded || [],
      inStock: data.in_stock !== undefined ? data.in_stock : fallback?.inStock ?? true,
    };
  } catch (error) {
    console.log(`Error fetching product "${slug}" from Prismic, using fallback:`, error);
    const fallback = productDetails[slug];
    if (!fallback) return null;
    if (expectedCategory && fallback.categorySlug !== expectedCategory) return null;
    return fallback;
  }
}

/**
 * Get related products from the same category.
 * Fetches from Prismic if available, otherwise uses hardcoded data.
 *
 * @param categorySlug - The category slug (e.g., "amplifiers")
 * @param currentSlug - The current product slug to exclude
 * @returns Array of up to 3 related ProductCardData
 */
export async function getRelatedProductsFromPrismic(
  categorySlug: string,
  currentSlug: string
): Promise<ProductCardData[]> {
  const catData = await getCategoryPageData(categorySlug);
  if (!catData) return [];
  return catData.products.filter((p) => p.slug !== currentSlug).slice(0, 3);
}

/**
 * Get all product slugs for a given category.
 * Uses hardcoded data for static generation (Prismic content may change at runtime).
 *
 * @param categorySlug - The category slug
 * @returns Array of slug strings
 */
export function getProductSlugsForCategory(categorySlug: string): string[] {
  return Object.keys(productDetails)
    .filter((slug) => productDetails[slug].categorySlug === categorySlug)
    .map((slug) => slug);
}
