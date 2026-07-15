import SiteLayout from "../components/SiteLayout";
import CategoryPage from "../components/CategoryPage";
import { getCategoryPageData } from "../lib/prismicData";

export const metadata = {
  title: "Sleds & Enclosures - ABCDE Car Audio",
  description: "Shop ABCDE Sleds - complete bass packages with subwoofer, enclosure, and amplifier.",
};

export default async function SledsPage() {
  const data = await getCategoryPageData("sleds");
  return (
    <SiteLayout>
      <CategoryPage data={data} />
    </SiteLayout>
  );
}
