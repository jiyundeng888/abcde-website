import type { SliceComponentProps } from "@prismicio/react";
import type { Slice } from "@prismicio/client";

export default function FeaturesStrip({ slice }: SliceComponentProps<Slice>) {
  const items = (slice.items || []).filter((item: any) => item.title);

  if (items.length === 0) return null;

  return (
    <section className="features-strip">
      <div className="features-container">
        {items.map((item: any, i: number) => (
          <div key={i} className="feature-item">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24"><path d={item.icon_path || ""} /></svg>
            </div>
            <div className="feature-text">{item.title}<small>{item.subtitle}</small></div>
          </div>
        ))}
      </div>
    </section>
  );
}
