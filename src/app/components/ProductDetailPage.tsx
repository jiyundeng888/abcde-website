"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ProductDetailData, ProductCardData } from "./navConfig";

export default function ProductDetailPage({
  product,
  relatedProducts,
}: {
  product: ProductDetailData;
  relatedProducts: ProductCardData[];
}) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "features" | "included">("specs");
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
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
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    window.scrollTo(0, 0);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* BREADCRUMB */}
      <div className="product-breadcrumb">
        <div className="breadcrumb-container">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <Link href={`/${product.categorySlug}/`}>{product.category}</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>
      </div>

      {/* PRODUCT MAIN SECTION */}
      <section className="product-detail">
        <div className="product-detail-container">
          {/* IMAGE GALLERY */}
          <div className="product-detail-gallery fade-in" data-index={0}>
            <div className="product-detail-main-image">
              {product.badge && <span className="product-badge">{product.badge}</span>}
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="product-detail-info fade-in" data-index={1}>
            <div className="product-detail-series">{product.series}</div>
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-shortdesc">{product.shortDesc}</p>

            <div className="product-detail-rating">
              <span className="stars">{"\u2605".repeat(product.rating)}{"\u2606".repeat(5 - product.rating)}</span>
              <span className="review-count">({product.reviews} reviews)</span>
            </div>

            <div className="product-detail-price">
              <span className="current">{product.currentPrice}</span>
              {product.originalPrice && product.originalPrice !== product.currentPrice && (
                <span className="original">{product.originalPrice}</span>
              )}
            </div>

            <p className="product-detail-longdesc">{product.longDesc}</p>

            <div className="product-detail-stock">
              {product.inStock ? (
                <span className="in-stock">✓ In Stock - Ready to Ship</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>

            {/* QUANTITY + ADD TO CART */}
            <div className="product-detail-actions">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button
                className="add-to-cart-btn"
                onClick={() => alert(`Added ${quantity} x ${product.name} to cart!`)}
              >
                Add to Cart
              </button>
            </div>

            {/* QUICK SPECS PREVIEW */}
            <div className="product-quick-specs">
              {product.specs.slice(0, 4).map((spec, i) => (
                <div key={i} className="quick-spec-item">
                  <span className="quick-spec-label">{spec.label}</span>
                  <span className="quick-spec-value">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TABS SECTION */}
      <section className="product-tabs-section">
        <div className="product-tabs-container">
          <div className="product-tabs">
            <button
              className={activeTab === "specs" ? "active" : ""}
              onClick={() => setActiveTab("specs")}
            >
              Specifications
            </button>
            <button
              className={activeTab === "features" ? "active" : ""}
              onClick={() => setActiveTab("features")}
            >
              Features
            </button>
            <button
              className={activeTab === "included" ? "active" : ""}
              onClick={() => setActiveTab("included")}
            >
              What's Included
            </button>
          </div>

          <div className="product-tab-content fade-in" data-index={2}>
            {activeTab === "specs" && (
              <div className="specs-table">
                {product.specs.map((spec, i) => (
                  <div key={i} className="spec-row">
                    <span className="spec-label">{spec.label}</span>
                    <span className="spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "features" && (
              <ul className="features-list">
                {product.features.map((feature, i) => (
                  <li key={i}>
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "included" && (
              <ul className="included-list">
                {product.whatsIncluded.map((item, i) => (
                  <li key={i}>
                    <span className="included-icon">📦</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="featured">
          <h2 className="section-title">Related <span className="accent">Products</span></h2>
          <p className="section-subtitle">More from our {product.category} collection</p>
          <div className="products-grid">
            {relatedProducts.map((p, i) => {
              const idx = i + 10;
              return (
                <Link
                  key={i}
                  href={`/${product.categorySlug}/${p.slug}/`}
                  className={`product-card fade-in ${visibleElements.has(idx) ? "visible" : ""}`}
                  data-index={idx}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
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
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* NEWSLETTER SECTION */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Sign Up And Save</h2>
          <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing! Check your inbox for exclusive deals.");
            }}
          >
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
          <p className="newsletter-disclaimer">
            By submitting this form and signing up for texts, you consent to receive marketing text messages (e.g. promos, cart reminders) from ABCDE at the number provided, including messages sent by autodialer. Consent is not a condition of purchase. Msg &amp; data rates may apply. Msg frequency varies. Unsubscribe at any time by replying STOP.
          </p>
        </div>
      </section>
    </>
  );
}
