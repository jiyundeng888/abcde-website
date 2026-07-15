import SiteLayout from "../components/SiteLayout";
import CategoryPage from "../components/CategoryPage";
import { getCategoryPageData } from "../lib/prismicData";

export const metadata = {
  title: "Amplifiers - ABCDE Car Audio",
  description: "Shop ABCDE amplifiers - Class D monoblock and multi-channel amps for car audio systems.",
};

export default async function AmplifiersPage() {
  const data = await getCategoryPageData("amplifiers");
  return (
    <SiteLayout>
      <CategoryPage data={data} />
    </SiteLayout>
  );
}
