import SiteLayout from "../components/SiteLayout";
import CategoryPage from "../components/CategoryPage";
import { getCategoryPageData } from "../lib/prismicData";

export const metadata = {
  title: "Subwoofers - ABCDE Car Audio",
  description: "Shop ABCDE subwoofers - high-power handling subs for earth-shaking bass in your car.",
};

export default async function SubwoofersPage() {
  const data = await getCategoryPageData("subwoofers");
  return (
    <SiteLayout>
      <CategoryPage data={data} />
    </SiteLayout>
  );
}
