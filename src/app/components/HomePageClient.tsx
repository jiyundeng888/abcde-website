"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { HomepageData } from "../types";

export default function HomePageClient({ data }: { data: HomepageData }) {
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { hero, sections } = data;

  // Scroll fade-in animation
  useEffect(() => {
    if (typeof window === "undefined") return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setVisibleElements((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".fade-in").forEach((el) => {
      observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToCategories = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  };

  let fadeIndex = 0;

  const renderSection = (section: HomepageData["sections"][number], sectionIdx: number) => {
    switch (section.type) {
      case "category_grid":
        return (
          <section className="categories" id="categories" key={sectionIdx}>
            <div className="categories-grid">
              {section.categories.map((cat, i) => {
                const idx = fadeIndex++;
                return (
                  <div key={i} className={`category-card fade-in ${visibleElements.has(idx) ? "visible" : ""}`} data-index={idx}>
                    <img src={cat.image} alt={cat.name} loading="lazy" />
                    <div className="category-card-overlay">
                      <div className="category-name">{cat.name}</div>
                      <div className="category-shop-now">Shop Now</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );

      case "features_strip":
        return (
          <section className="features-strip" key={sectionIdx}>
            <div className="features-container">
              {section.features.map((f, i) => (
                <div key={i} className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24"><path d={f.iconPath} /></svg>
                  </div>
                  <div className="feature-text">{f.title}<small>{f.subtitle}</small></div>
                </div>
              ))}
            </div>
          </section>
        );

      case "featured_products":
        return (
          <section className="featured" key={sectionIdx}>
            <h2 className="section-title">{section.sectionTitle} <span className="accent">{section.sectionTitleAccent}</span></h2>
            <p className="section-subtitle">{section.sectionSubtitle}</p>
            <div className="products-grid">
              {section.products.map((p, i) => {
                const idx = fadeIndex++;
                return (
                  <div key={i} className={`product-card fade-in ${visibleElements.has(idx) ? "visible" : ""}`} data-index={idx}>
                    <div className="product-image">
                      {p.badge && <span className="product-badge">{p.badge}</span>}
                      <img src={p.image} alt={p.name} loading="lazy" />
                    </div>
                    <div className="product-info">
                      <div className="product-series">{p.series}</div>
                      <div className="product-name">{p.name}</div>
                      <div className="product-desc">{p.description}</div>
                      <div className="product-rating">
                        <span className="stars">{"\u2605".repeat(p.rating)}{"\u2606".repeat(5 - p.rating)}</span>
                        <span className="review-count">({p.reviews} reviews)</span>
                      </div>
                      <div className="product-price">
                        <span className="current">{p.currentPrice}</span>
                        <span className="original">{p.originalPrice}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );

      case "newsletter":
        return (
          <section className="newsletter" key={sectionIdx}>
            <div className="newsletter-content">
              <h2>{section.title}</h2>
              <p>{section.description}</p>
              <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing! Check your inbox for exclusive deals."); }}>
                <input type="email" placeholder="Enter your email" required />
                <div className="country-select">
                  <select>
                    <option>{"\uD83C\uDDFA\uD83C\uDDF8"} +1</option>
                    <option>{"\uD83C\uDDE8\uD83C\uDDE6"} +1</option>
                    <option>{"\uD83C\uDDEC\uD83C\uDDE7"} +44</option>
                    <option>{"\uD83C\uDDE6\uD83C\uDDFA"} +61</option>
                    <option>{"\uD83C\uDDE9\uD83C\uDDEA"} +49</option>
                  </select>
                </div>
                <input type="tel" className="phone-input" placeholder="Phone Number" />
                <button type="submit" className="newsletter-btn">Sign Up</button>
              </form>
              <p className="newsletter-disclaimer" dangerouslySetInnerHTML={{ __html: section.disclaimer.replace(/<a/g, '<a href="#"') }} />
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url('${hero.backgroundImage}')` }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">{hero.title} <span className="accent">{hero.titleAccent}</span></h1>
          <p className="hero-subtitle">{hero.subtitle}</p>
          <button className="hero-cta" onClick={scrollToCategories}>{hero.ctaText}</button>
        </div>
      </section>

      {/* DYNAMIC SECTIONS FROM PRISMIC SLICE ZONE */}
      {sections.map((section, idx) => renderSection(section, idx))}
    </>
  );
}
