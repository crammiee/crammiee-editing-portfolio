"use client"; // Needed because we’re adding a clickable button

import React from "react";

type HeroSectionProps = {
  headline: string;
  subheadline: string;
  ctaLabel?: string;
};

export function HeroSection({ headline, subheadline, ctaLabel }: HeroSectionProps) {
  return (
    <section>
      <div>
        <h1>{headline}</h1>
        <p>{subheadline}</p>
        {ctaLabel && (
          <button
            type="button"
            onClick={() => {
              // Placeholder: soon will scroll to contact section
              console.log("Work With Me button clicked");
            }}
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </section>
  );
}
