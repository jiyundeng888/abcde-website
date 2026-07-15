import SiteLayout from "../components/SiteLayout";

export const metadata = {
  title: "Support - ABCDE Car Audio",
  description: "Get help with ABCDE car audio products. FAQs, contact info, returns, and warranty support.",
};

export default function SupportPage() {
  const faqs = [
    {
      q: "What is the warranty on ABCDE products?",
      a: "All ABCDE products come with a 2-year manufacturer warranty covering defects in materials and workmanship.",
    },
    {
      q: "How long does shipping take?",
      a: "Orders placed before 4 PM CST ship the same day. Standard shipping takes 3-5 business days within the US.",
    },
    {
      q: "What is your return policy?",
      a: "We offer a 30-day return policy on all unused products in their original packaging. Returns are free for defective items.",
    },
    {
      q: "Do you offer financing?",
      a: "Yes! We offer Affirm financing with flexible payment plans. Select Affirm at checkout to see your options.",
    },
    {
      q: "How do I wire my subwoofer?",
      a: "Use our Subwoofer Wiring Calculator to determine the correct wiring configuration for your setup. You can also contact our support team for assistance.",
    },
    {
      q: "Can I install ABCDE products myself?",
      a: "While many of our products are designed for DIY installation, we recommend professional installation for complex systems like amplifiers and subwoofers.",
    },
  ];

  return (
    <SiteLayout>
      {/* SUPPORT HERO */}
      <section className="hero" style={{ minHeight: "350px" }}>
        <div className="hero-bg" style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Customer <span className="accent">Support</span></h1>
          <p className="hero-subtitle">We&apos;re here to help you get the most out of your ABCDE gear</p>
        </div>
      </section>

      {/* SUPPORT OPTIONS */}
      <section style={{
        padding: "60px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          marginBottom: "60px",
        }}>
          <div style={{
            background: "var(--ivory-light, #faf9f5)",
            borderRadius: "16px",
            padding: "32px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}>
            <div style={{
              width: "56px",
              height: "56px",
              margin: "0 auto 16px",
              borderRadius: "50%",
              background: "var(--terracotta, #d97757)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3 style={{ fontFamily: "var(--font-serif, serif)", fontSize: "1.25rem", marginBottom: "8px" }}>
              Call Us
            </h3>
            <p style={{ color: "var(--gray-text, #5e5d59)", fontSize: "0.95rem" }}>
              Mon-Fri 9AM-5PM CST<br />
              <strong style={{ color: "var(--terracotta, #d97757)" }}>1-800-ABCDE-USA</strong>
            </p>
          </div>

          <div style={{
            background: "var(--ivory-light, #faf9f5)",
            borderRadius: "16px",
            padding: "32px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}>
            <div style={{
              width: "56px",
              height: "56px",
              margin: "0 auto 16px",
              borderRadius: "50%",
              background: "var(--terracotta, #d97757)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h3 style={{ fontFamily: "var(--font-serif, serif)", fontSize: "1.25rem", marginBottom: "8px" }}>
              Email Us
            </h3>
            <p style={{ color: "var(--gray-text, #5e5d59)", fontSize: "0.95rem" }}>
              24/7 support<br />
              <strong style={{ color: "var(--terracotta, #d97757)" }}>support@abcde.com</strong>
            </p>
          </div>

          <div style={{
            background: "var(--ivory-light, #faf9f5)",
            borderRadius: "16px",
            padding: "32px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}>
            <div style={{
              width: "56px",
              height: "56px",
              margin: "0 auto 16px",
              borderRadius: "50%",
              background: "var(--terracotta, #d97757)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <h3 style={{ fontFamily: "var(--font-serif, serif)", fontSize: "1.25rem", marginBottom: "8px" }}>
              Live Chat
            </h3>
            <p style={{ color: "var(--gray-text, #5e5d59)", fontSize: "0.95rem" }}>
              Mon-Fri 9AM-5PM CST<br />
              <strong style={{ color: "var(--terracotta, #d97757)" }}>Click chat icon below</strong>
            </p>
          </div>
        </div>

        {/* FAQ SECTION */}
        <h2 style={{
          fontFamily: "var(--font-serif, serif)",
          fontSize: "2rem",
          textAlign: "center",
          marginBottom: "40px",
        }}>
          Frequently Asked <span className="accent">Questions</span>
        </h2>

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {faqs.map((faq, i) => (
            <details
              key={i}
              style={{
                background: "var(--ivory-light, #faf9f5)",
                borderRadius: "8px",
                marginBottom: "12px",
                padding: "20px 24px",
                border: "1px solid rgba(0,0,0,0.06)",
                cursor: "pointer",
              }}
            >
              <summary style={{
                fontFamily: "var(--font-sans, Inter, sans-serif)",
                fontWeight: 600,
                fontSize: "1.05rem",
                color: "var(--dark-text, #141413)",
                outline: "none",
              }}>
                {faq.q}
              </summary>
              <p style={{
                marginTop: "12px",
                color: "var(--gray-text, #5e5d59)",
                lineHeight: 1.6,
                fontSize: "0.95rem",
              }}>
                {faq.a}
              </p>
            </details>
          ))}
        </div>

        {/* QUICK LINKS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          maxWidth: "800px",
          margin: "60px auto 0",
        }}>
          {[
            "Return Center",
            "Subwoofer Wiring Calculator",
            "About Us",
            "Affirm Financing",
            "Blog",
            "Careers",
            "Policies",
            "Privacy Policy",
            "Terms of Service",
          ].map((link, i) => (
            <div
              key={i}
              style={{
                background: "var(--ivory-light, #faf9f5)",
                borderRadius: "8px",
                padding: "16px 20px",
                textAlign: "center",
                fontFamily: "var(--font-sans, Inter, sans-serif)",
                fontSize: "0.9rem",
                color: "var(--gray-text, #5e5d59)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {link}
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
