import type { SliceComponentProps } from "@prismicio/react";
import type { Slice } from "@prismicio/client";

export default function CategoryGrid({ slice }: SliceComponentProps<Slice>) {
  const items = (slice.items || []).filter((item: any) => item.name || item.image?.url);

  if (items.length === 0) return null;

  return (
    <section className="categories" id="categories">
      <div className="categories-grid">
        {items.map((item: any, i: number) => (
          <div key={i} className="category-card">
            <img src={item.image?.url} alt={item.name || ""} loading="lazy" />
            <div className="category-card-overlay">
              <div className="category-name">{item.name}</div>
              <div className="category-shop-now">Shop Now</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
