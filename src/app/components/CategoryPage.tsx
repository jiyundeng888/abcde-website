"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { CategoryPageData } from "./navConfig";

export default function CategoryPage({ data }: { data: CategoryPageData }) {
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

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

  let fadeIndex = 0;

  return (
    <>
      {/* CATEGORY HERO */}
      <section className="hero" style={{ minHeight: "400px" }}>
        <div className="hero-bg" style={{ backgroundImage: `url('${data.heroImage}')` }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">{data.title} <span className="accent">{data.accent}</span></h1>
          <p className="hero-subtitle">{data.subtitle}</p>
        </div>
      </section>

      {/* CATEGORY DESCRIPTION */}
      <section style={{
        padding: "60px 20px",
        textAlign: "center",
        maxWidth: "800px",
        margin: "0 auto",
      }}>
        <p style={{
          fontSize: "1.125rem",
          lineHeight: 1.7,
          color: "var(--gray-text, #5e5d59)",
          fontFamily: "var(--font-sans, Inter, sans-serif)",
        }}>
          {data.description}
        </p>
      </section>

      {/* PRODUCTS GRID */}
      <section className="featured">
        <h2 className="section-title">Featured <span className="accent">Products</span></h2>
        <p className="section-subtitle">Top-rated gear from our {data.title} collection</p>
        <div className="products-grid">
          {data.products.map((p, i) => {
            const idx = fadeIndex++;
            const productPath = `/${data.title.toLowerCase().replace(/[^a-z]/g, "")}/${p.slug}/`;
            // Map category title to correct URL path
            const categoryPath = data.title === "Sleds" ? "/sleds/" : `/${data.title.toLowerCase()}/`;
            return (
              <Link key={i} href={`${categoryPath}${p.slug}/`} className={`product-card fade-in ${visibleElements.has(idx) ? "visible" : ""}`} data-index={idx} style={{ textDecoration: "none", color: "inherit" }}>
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
