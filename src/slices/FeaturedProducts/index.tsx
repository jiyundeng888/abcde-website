import type { SliceComponentProps } from "@prismicio/react";
import type { Slice } from "@prismicio/client";

export default function FeaturedProducts({ slice }: SliceComponentProps<Slice>) {
  const primary = slice.primary as any;
  const items = (slice.items || []).filter((item: any) => item.name);

  return (
    <section className="featured">
      <h2 className="section-title">{primary?.section_title || "Featured"} <span className="accent">{primary?.section_title_accent || "Products"}</span></h2>
      <p className="section-subtitle">{primary?.section_subtitle || "Top-rated car audio gear from our most popular series"}</p>
      <div className="products-grid">
        {items.map((item: any, i: number) => (
          <div key={i} className="product-card">
            <div className="product-image">
              {item.badge && <span className="product-badge">{item.badge}</span>}
              <img src={item.image?.url} alt={item.name} loading="lazy" />
            </div>
            <div className="product-info">
              <div className="product-series">{item.series}</div>
              <div className="product-name">{item.name}</div>
              <div className="product-desc">{item.description}</div>
              <div className="product-rating">
                <span className="stars">{"\u2605".repeat(item.rating || 5)}{"\u2606".repeat(5 - (item.rating || 5))}</span>
                <span className="review-count">({item.reviews || 0} reviews)</span>
              </div>
              <div className="product-price">
                <span className="current">{item.current_price}</span>
                <span className="original">{item.original_price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
