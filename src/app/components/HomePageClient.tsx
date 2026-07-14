"use client";

import { useState, useEffect, useRef } from "react";
import type { HomepageData } from "../types";

export default function HomePageClient({ data }: { data: HomepageData }) {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const [chatActive, setChatActive] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { navItems, hero, popup, footer, sections, promoBannerText } = data;

  // Popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && !sessionStorage.getItem("popupShown")) {
        setPopupActive(true);
        sessionStorage.setItem("popupShown", "true");
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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

  // Close menus on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuActive(false);
        setPopupActive(false);
        setChatActive(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuActive(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToCategories = () => {
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for subscribing! Check your inbox for exclusive deals.");
  };

  const handlePopupSubmit = () => {
    const email = (document.getElementById("popupEmail") as HTMLInputElement)?.value;
    if (email && email.includes("@")) {
      alert(`Thank you! Your 11% discount code has been sent to ${email}`);
      setPopupActive(false);
    } else {
      alert("Please enter a valid email address.");
    }
  };

  let fadeIndex = 0;

  const socialLinks = [
    { label: "Facebook", path: "M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8v8.44C19.62 23.1 24 18.1 24 12.07" },
    { label: "Instagram", path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.67.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.12-1.38.66-.66 1.08-1.33 1.38-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.12C21.33 1.35 20.65.94 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84c-3.4 0-6.16 2.76-6.16 6.16s2.76 6.16 6.16 6.16 6.16-2.76 6.16-6.16S15.4 5.84 12 5.84zM12 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.41-10.85c-.8 0-1.44.64-1.44 1.44s.64 1.44 1.44 1.44 1.44-.64 1.44-1.44-.64-1.44-1.44-1.44z" },
    { label: "YouTube", path: "M23.5 6.2c-.3-1-1.1-1.8-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5c-1 .3-1.8 1.1-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1.1 1.8 2.1 2.1 1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5c1-.3 1.8-1.1 2.1-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" },
    { label: "TikTok", path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" },
  ];

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
              <form className="newsletter-form" onSubmit={handleSubscribe}>
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
      {/* PROMO BANNER */}
      <div className="promo-banner">
        <span className="pulse-dot"></span>
        {promoBannerText}
      </div>

      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <button className="hamburger" onClick={() => setMobileMenuActive(!mobileMenuActive)}>
            <span></span><span></span><span></span>
          </button>
          <a href="#" className="logo">
            <div className="logo-icon">AB</div>
            <div className="logo-text"><span className="ct">AB</span>CDE</div>
          </a>
        </div>
        <nav className="desktop-nav" style={{ position: "static", flex: 1 }}>
          <ul>
            {navItems.map((item, i) => (
              <li key={i}><a href="#">{item}</a></li>
            ))}
          </ul>
        </nav>
        <div className="header-right">
          <button className="header-icon" onClick={() => alert("Search functionality")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
          <button className="header-icon" onClick={() => alert("Your cart is currently empty.")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span className="cart-badge">0</span>
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`mobile-menu-overlay ${mobileMenuActive ? "active" : ""}`} onClick={() => setMobileMenuActive(false)}></div>
      <div className={`mobile-menu ${mobileMenuActive ? "active" : ""}`}>
        <button className="mobile-menu-close" onClick={() => setMobileMenuActive(false)}>&times;</button>
        <div className="logo">
          <div className="logo-icon">AB</div>
          <div className="logo-text"><span className="ct">AB</span>CDE</div>
        </div>
        <nav>
          <ul>
            {navItems.map((item, i) => (
              <li key={i}><a href="#" onClick={() => setMobileMenuActive(false)}>{item} <span className="arrow">{"\u203A"}</span></a></li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu-section-title">Sign Up And Save</div>
        <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
        <input type="email" className="email-input" placeholder="Enter your email" />
        <div className="mobile-menu-section-title">Get Support</div>
        <ul className="mobile-support-links">
          <li><a href="#">FAQs</a></li><li><a href="#">Contact Us</a></li>
          <li><a href="#">Return Center</a></li><li><a href="#">Subwoofer Wiring Calculator</a></li>
        </ul>
        <div className="mobile-menu-section-title">Company Information</div>
        <ul className="mobile-support-links">
          <li><a href="#">About Us</a></li><li><a href="#">Affirm Financing</a></li>
          <li><a href="#">Blog</a></li><li><a href="#">Careers</a></li>
          <li><a href="#">Policies</a></li><li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
        </ul>
      </div>

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

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="logo">
              <div className="logo-icon">AB</div>
              <div className="logo-text"><span className="ct">AB</span>CDE</div>
            </a>
            <p>{footer.description}</p>
            <div className="footer-social">
              {socialLinks.map((s, i) => (
                <a key={i} href="#" aria-label={s.label}>
                  <svg viewBox="0 0 24 24"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h3>Main Menu</h3>
            <ul className="footer-links">
              {navItems.map((item, i) => <li key={i}><a href="#">{item}</a></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h3>Sign Up And Save</h3>
            <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <div className="footer-email-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">{"\u2192"}</button>
            </div>
            <h3 style={{ marginTop: "25px" }}>Get Support</h3>
            <ul className="footer-links">
              <li><a href="#">FAQs</a></li><li><a href="#">Contact Us</a></li>
              <li><a href="#">Return Center</a></li><li><a href="#">Subwoofer Wiring Calculator</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Company Information</h3>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li><li><a href="#">Affirm Financing</a></li>
              <li><a href="#">Blog</a></li><li><a href="#">Careers</a></li>
              <li><a href="#">Policies</a></li><li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{footer.copyright}</p>
          <div className="footer-payments">
            {["VISA", "MC", "AMEX", "PAYPAL", "AFFIRM", "SHOP PAY"].map((p, i) => (
              <span key={i} className="payment-badge">{p}</span>
            ))}
          </div>
          <div className="footer-currency">{"\uD83C\uDDFA\uD83C\uDDF8"} United States (USD $)</div>
        </div>
      </footer>

      {/* POPUP MODAL */}
      <div className={`popup-overlay ${popupActive ? "active" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setPopupActive(false); }}>
        <div className="popup">
          <button className="popup-close" onClick={() => setPopupActive(false)}>
            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
          </button>
          <div className="popup-title">{popup.title}</div>
          <div className="popup-discount">{popup.discount}</div>
          <div className="popup-subtitle">{popup.subtitle}</div>
          <input type="email" placeholder="Enter your email address" id="popupEmail" />
          <button className="popup-btn" onClick={handlePopupSubmit}>{popup.buttonText}</button>
          <p className="popup-disclaimer">
            By submitting this form and signing up for texts, you consent to receive marketing text messages from ABCDE. Consent is not a condition of purchase. Msg &amp; data rates may apply. Unsubscribe at any time by replying STOP.
          </p>
        </div>
      </div>

      {/* FLOATING BUTTONS */}
      <div className="floating-buttons">
        <button className="floating-btn rewards-btn" onClick={() => alert("Join ABCDE Rewards Program and earn points on every purchase!")}>
          <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
          Rewards
        </button>
        <button className="floating-btn help-btn" onClick={() => setChatActive(!chatActive)}>
          <span>?</span>
        </button>
      </div>

      {/* CHAT WIDGET */}
      <div className={`chat-widget ${chatActive ? "active" : ""}`}>
        <div className="chat-header">
          <div className="chat-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" /></svg>
          </div>
          <div>
            <h4>ABCDE Support</h4>
            <div className="status">{"\u25CF"} Online Now</div>
          </div>
        </div>
        <div className="chat-body">
          <div className="chat-message">Hi! Welcome to ABCDE. How can we help you today?</div>
        </div>
        <div className="chat-input-area">
          <input type="text" placeholder="Type your message..." />
          <button>{"\u27A4"}</button>
        </div>
      </div>
    </>
  );
}
