"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const [chatActive, setChatActive] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

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

  const navItems = [
    "Amplifiers",
    "Subwoofers",
    "Speakers",
    "Wiring & Accessories",
    "Empty Subwoofer Boxes",
    "Loaded Subwoofer Boxes",
    "Complete Packages",
  ];

  const categories = [
    { name: "Amplifiers", img: "https://cdn.shopify.com/s/files/1/1690/0705/files/amplifiers-corrected_650x.jpg?v=1676307831" },
    { name: "Subwoofers", img: "https://cdn.shopify.com/s/files/1/1690/0705/files/subwoofers1_650x.jpg?v=1664730876" },
    { name: "Speakers", img: "https://cdn.shopify.com/s/files/1/1690/0705/files/speakers_650x.jpg?v=1664730896" },
    { name: "Wiring Kits", img: "https://cdn.shopify.com/s/files/1/1690/0705/files/wiring-kits_650x.jpg?v=1664730938" },
  ];

  const products = [
    { badge: "Best Seller", series: "ABCDE Series", name: "ABCDE-2000.1D", desc: "2000W RMS Monoblock Car Audio Amplifier", stars: 5, reviews: 127, current: "$299.99", original: "$449.99", img: "https://cdn.shopify.com/s/files/1/1690/0705/files/amplifiers-corrected_650x.jpg?v=1676307831" },
    { badge: "New", series: "Meso Series", name: "MESO-12 D2", desc: "1500W RMS 12-Inch Subwoofer Dual 2 Ohm", stars: 5, reviews: 89, current: "$189.99", original: "$279.99", img: "https://cdn.shopify.com/s/files/1/1690/0705/files/subwoofers1_650x.jpg?v=1664730876" },
    { badge: "", series: "AT Series v2", name: "ATv2-200.4D", desc: "4-Channel Class D Car Audio Amplifier", stars: 4, reviews: 54, current: "$229.99", original: "$329.99", img: "https://cdn.shopify.com/s/files/1/1690/0705/files/speakers_650x.jpg?v=1664730896" },
    { badge: "Sale", series: "Wiring", name: "0 Gauge Amp Kit", desc: "Complete 0 GA Amplifier Wiring Installation Kit", stars: 5, reviews: 203, current: "$79.99", original: "$119.99", img: "https://cdn.shopify.com/s/files/1/1690/0705/files/wiring-kits_650x.jpg?v=1664730938" },
  ];

  return (
    <>
      {/* PROMO BANNER */}
      <div className="promo-banner">
        <span className="pulse-dot"></span>
        Orders Before 4 PM CST Ship Same Day!
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
              <li key={i}><a href="#" onClick={() => setMobileMenuActive(false)}>{item} <span className="arrow">›</span></a></li>
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
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Power Your <span className="accent">Ride</span></h1>
          <p className="hero-subtitle">Premium Car Audio Equipment</p>
          <button className="hero-cta" onClick={scrollToCategories}>Shop Now</button>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="categories" id="categories">
        <div className="categories-grid">
          {categories.map((cat, i) => (
            <div key={i} className={`category-card fade-in ${visibleElements.has(i) ? "visible" : ""}`} data-index={i}>
              <img src={cat.img} alt={cat.name} loading="lazy" />
              <div className="category-card-overlay">
                <div className="category-name">{cat.name}</div>
                <div className="category-shop-now">Shop Now</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="features-strip">
        <div className="features-container">
          {[
            { title: "Same Day Shipping", sub: "Orders before 4 PM CST", icon: "M3 7v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm10 2h6v3h-6V9zm0 5h6v3h-6v-3zM5 9h6v8H5V9z" },
            { title: "2 Year Warranty", sub: "On all products", icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" },
            { title: "Quality Guaranteed", sub: "Premium materials", icon: "M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" },
            { title: "Expert Support", sub: "Mon-Fri 9AM-5PM CST", icon: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" },
          ].map((f, i) => (
            <div key={i} className="feature-item">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24"><path d={f.icon} /></svg>
              </div>
              <div className="feature-text">{f.title}<small>{f.sub}</small></div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured">
        <h2 className="section-title">Featured <span className="accent">Products</span></h2>
        <p className="section-subtitle">Top-rated car audio gear from our most popular series</p>
        <div className="products-grid">
          {products.map((p, i) => (
            <div key={i} className={`product-card fade-in ${visibleElements.has(i + 10) ? "visible" : ""}`} data-index={i + 10}>
              <div className="product-image">
                {p.badge && <span className="product-badge">{p.badge}</span>}
                <img src={p.img} alt={p.name} loading="lazy" />
              </div>
              <div className="product-info">
                <div className="product-series">{p.series}</div>
                <div className="product-name">{p.name}</div>
                <div className="product-desc">{p.desc}</div>
                <div className="product-rating">
                  <span className="stars">{"★".repeat(p.stars)}{"☆".repeat(5 - p.stars)}</span>
                  <span className="review-count">({p.reviews} reviews)</span>
                </div>
                <div className="product-price">
                  <span className="current">{p.current}</span>
                  <span className="original">{p.original}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Sign Up And Save</h2>
          <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input type="email" placeholder="Enter your email" required />
            <div className="country-select">
              <select>
                <option>🇺🇸 +1</option><option>🇨🇦 +1</option><option>🇬🇧 +44</option>
                <option>🇦🇺 +61</option><option>🇩🇪 +49</option>
              </select>
            </div>
            <input type="tel" className="phone-input" placeholder="Phone Number" />
            <button type="submit" className="newsletter-btn">Sign Up</button>
          </form>
          <p className="newsletter-disclaimer">
            By submitting this form and signing up for texts, you consent to receive marketing text messages (e.g. promos, cart reminders) from ABCDE at the number provided, including messages sent by autodialer. Consent is not a condition of purchase. Msg &amp; data rates may apply. Msg frequency varies. Unsubscribe at any time by replying STOP. <a href="#">Privacy Policy</a> &amp; <a href="#">Terms</a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="logo">
              <div className="logo-icon">AB</div>
              <div className="logo-text"><span className="ct">AB</span>CDE</div>
            </a>
            <p>ABCDE is a leading manufacturer of high-quality car audio equipment including amplifiers, subwoofers, speakers, and wiring accessories. Built for enthusiasts who demand the best.</p>
            <div className="footer-social">
              {[
                { label: "Facebook", path: "M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8v8.44C19.62 23.1 24 18.1 24 12.07" },
                { label: "Instagram", path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38C1.35 2.67.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12.66.66 1.33 1.08 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.12-1.38.66-.66 1.08-1.33 1.38-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.12C21.33 1.35 20.65.94 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84c-3.4 0-6.16 2.76-6.16 6.16s2.76 6.16 6.16 6.16 6.16-2.76 6.16-6.16S15.4 5.84 12 5.84zM12 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.41-10.85c-.8 0-1.44.64-1.44 1.44s.64 1.44 1.44 1.44 1.44-.64 1.44-1.44-.64-1.44-1.44-1.44z" },
                { label: "YouTube", path: "M23.5 6.2c-.3-1-1.1-1.8-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5c-1 .3-1.8 1.1-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1.1 1.8 2.1 2.1 1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5c1-.3 1.8-1.1 2.1-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" },
                { label: "TikTok", path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" },
              ].map((s, i) => (
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
              <button type="submit">→</button>
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
          <p>&copy; 2026 ABCDE. All Rights Reserved.</p>
          <div className="footer-payments">
            {["VISA", "MC", "AMEX", "PAYPAL", "AFFIRM", "SHOP PAY"].map((p, i) => (
              <span key={i} className="payment-badge">{p}</span>
            ))}
          </div>
          <div className="footer-currency">🇺🇸 United States (USD $)</div>
        </div>
      </footer>

      {/* POPUP MODAL */}
      <div className={`popup-overlay ${popupActive ? "active" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setPopupActive(false); }}>
        <div className="popup">
          <button className="popup-close" onClick={() => setPopupActive(false)}>
            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
          </button>
          <div className="popup-title">Unlock</div>
          <div className="popup-discount">11% OFF</div>
          <div className="popup-subtitle">Your First Order</div>
          <input type="email" placeholder="Enter your email address" id="popupEmail" />
          <button className="popup-btn" onClick={handlePopupSubmit}>Get My Discount Now</button>
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
            <div className="status">● Online Now</div>
          </div>
        </div>
        <div className="chat-body">
          <div className="chat-message">Hi! Welcome to ABCDE. How can we help you today?</div>
        </div>
        <div className="chat-input-area">
          <input type="text" placeholder="Type your message..." />
          <button>➤</button>
        </div>
      </div>
    </>
  );
}
