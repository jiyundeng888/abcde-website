import type { SliceComponentProps } from "@prismicio/react";
import type { Slice } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

export default function Newsletter({ slice }: SliceComponentProps<Slice>) {
  const primary = slice.primary as any;

  return (
    <section className="newsletter">
      <div className="newsletter-content">
        <h2>{primary?.title || "Sign Up And Save"}</h2>
        <p>{primary?.description || "Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals."}</p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
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
        {primary?.disclaimer && (
          <div className="newsletter-disclaimer">
            <PrismicRichText field={primary.disclaimer} />
          </div>
        )}
      </div>
    </section>
  );
}
