import SiteLayout from "../components/SiteLayout";
import CategoryPage from "../components/CategoryPage";
import { getCategoryPageData } from "../lib/prismicData";

export const metadata = {
  title: "Speakers - ABCDE Car Audio",
  description: "Shop ABCDE speakers - component systems and coaxial speakers for crystal clear car audio.",
};

export default async function SpeakersPage() {
  const data = await getCategoryPageData("speakers");
  return (
    <SiteLayout>
      <CategoryPage data={data} />
    </SiteLayout>
  );
}
