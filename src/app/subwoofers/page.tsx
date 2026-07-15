import SiteLayout from "../components/SiteLayout";
import CategoryPage from "../components/CategoryPage";
import { categoryData } from "../components/navConfig";

export const metadata = {
  title: "Subwoofers - ABCDE Car Audio",
  description: "Shop ABCDE subwoofers - high-power handling subs for earth-shaking bass in your car.",
};

export default function SubwoofersPage() {
  return (
    <SiteLayout>
      <CategoryPage data={categoryData.subwoofers} />
    </SiteLayout>
  );
}
