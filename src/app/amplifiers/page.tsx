import SiteLayout from "../components/SiteLayout";
import CategoryPage from "../components/CategoryPage";
import { categoryData } from "../components/navConfig";

export const metadata = {
  title: "Amplifiers - ABCDE Car Audio",
  description: "Shop ABCDE amplifiers - Class D monoblock and multi-channel amps for car audio systems.",
};

export default function AmplifiersPage() {
  return (
    <SiteLayout>
      <CategoryPage data={categoryData.amplifiers} />
    </SiteLayout>
  );
}
