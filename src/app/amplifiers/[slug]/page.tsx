import { notFound } from "next/navigation";
import SiteLayout from "../../components/SiteLayout";
import ProductDetailPage from "../../components/ProductDetailPage";
import { productDetails, categoryData, getProductDetail, getRelatedProducts } from "../../components/navConfig";

export function generateStaticParams() {
  return Object.keys(productDetails)
    .filter((slug) => productDetails[slug].categorySlug === "amplifiers")
    .map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then((resolvedParams) => {
    const product = getProductDetail(resolvedParams.slug);
    return {
      title: product ? `${product.name} - ABCDE Car Audio` : "Product - ABCDE Car Audio",
      description: product ? product.shortDesc : "ABCDE Car Audio product",
    };
  });
}

export default async function AmplifierProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductDetail(slug);
  if (!product || product.categorySlug !== "amplifiers") {
    notFound();
  }
  const relatedProducts = getRelatedProducts("amplifiers", slug);
  return (
    <SiteLayout>
      <ProductDetailPage product={product} relatedProducts={relatedProducts} />
    </SiteLayout>
  );
}
