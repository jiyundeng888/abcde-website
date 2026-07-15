import { notFound } from "next/navigation";
import SiteLayout from "../../components/SiteLayout";
import ProductDetailPage from "../../components/ProductDetailPage";
import { getProductDetailData, getRelatedProductsFromPrismic, getProductSlugsForCategory } from "../../lib/prismicData";

export function generateStaticParams() {
  return getProductSlugsForCategory("speakers").map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(async (resolvedParams) => {
    const product = await getProductDetailData(resolvedParams.slug, "speakers");
    return {
      title: product ? `${product.name} - ABCDE Car Audio` : "Product - ABCDE Car Audio",
      description: product ? product.shortDesc : "ABCDE Car Audio product",
    };
  });
}

export default async function SpeakerProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductDetailData(slug, "speakers");
  if (!product) {
    notFound();
  }
  const relatedProducts = await getRelatedProductsFromPrismic("speakers", slug);
  return (
    <SiteLayout>
      <ProductDetailPage product={product} relatedProducts={relatedProducts} />
    </SiteLayout>
  );
}
