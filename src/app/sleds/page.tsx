import SiteLayout from "../components/SiteLayout";
import CategoryPage from "../components/CategoryPage";
import { categoryData } from "../components/navConfig";

export const metadata = {
  title: "Sleds & Enclosures - ABCDE Car Audio",
  description: "Shop ABCDE Sleds - complete bass packages with subwoofer, enclosure, and amplifier.",
};

export default function SledsPage() {
  return (
    <SiteLayout>
      <CategoryPage data={categoryData.sleds} />
    </SiteLayout>
  );
}
