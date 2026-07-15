import SiteLayout from "../components/SiteLayout";
import CategoryPage from "../components/CategoryPage";
import { categoryData } from "../components/navConfig";

export const metadata = {
  title: "Speakers - ABCDE Car Audio",
  description: "Shop ABCDE speakers - component systems and coaxial speakers for crystal clear car audio.",
};

export default function SpeakersPage() {
  return (
    <SiteLayout>
      <CategoryPage data={categoryData.speakers} />
    </SiteLayout>
  );
}
