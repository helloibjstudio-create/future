"use client";

import { useState } from "react";

type Category = "ALL" | "NEWS" | "ESSAYS" | "RESEARCH" | "CONVERSATIONS" | "MEDIA KITS";

const CATEGORIES: Category[] = [
  "ALL",
  "NEWS",
  "ESSAYS",
  "RESEARCH",
  "CONVERSATIONS",
  "MEDIA KITS",
];

type Insight = {
  key: string;
  category: Exclude<Category, "ALL">;
  title: string;
  excerpt: string;
  href: string;
};

const INSIGHTS: Insight[] = Array.from({ length: 9 }).map((_, i) => ({
  key: `insight-${i}`,
  category: "ESSAYS",
  title: "Why digital work is africa's fastest path to 25 million Jobs a year",
  excerpt:
    "Studying and sharing the forces, ideas, news, and evidence shaping Africa's digital economy.",
  href: "#",
}));

export default function NewsInsightsSection() {
  const [active, setActive] = useState<Category>("ALL");

  const visible = active === "ALL"
    ? INSIGHTS
    : INSIGHTS.filter((n) => n.category === active);

  return (
    <section
      id="news"
      data-section="news"
      className="relative w-full bg-[#050E0A] py-20 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-360 px-6 lg:px-12">
        <div className="mx-auto mb-12 flex max-w-240 flex-col items-center gap-6 text-center sm:gap-8 lg:gap-10">
          <p className="font-geist text-[14px] font-medium uppercase leading-6 tracking-[-0.4px] text-[#E8FFED] sm:text-[16px] sm:leading-7 sm:tracking-[-0.64px]">
            News &amp; Insights
          </p>
          <h2 className="font-darker text-[36px] font-extrabold uppercase leading-[1.05] tracking-[-1px] text-[#E8FFED] sm:text-[44px] sm:tracking-[-1.32px] md:text-[52px] md:tracking-[-1.56px] lg:text-[64px] lg:leading-15 lg:tracking-[-1.92px]">
            See the future
            <br />
            through our lens.
          </h2>
          <p className="max-w-167.25 font-geist text-[16px] font-medium leading-7 tracking-[-0.4px] text-white/68 sm:text-[18px] lg:text-[20px] lg:leading-8 lg:tracking-[-0.8px]">
            Studying and sharing the forces, ideas, news, and evidence shaping
            Africa&apos;s digital economy.
          </p>
        </div>

        <div
          data-news-tabs
          className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 md:mb-16"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              data-news-tab
              data-active={active === cat}
              onClick={() => setActive(cat)}
              className="font-geist inline-flex items-center justify-center gap-2.5 rounded-[80px] px-4 py-2.5 text-[13px] uppercase leading-6 tracking-[-0.3px] transition-colors sm:px-5 sm:py-3 sm:text-[16px] sm:leading-7 sm:tracking-[-0.5px] lg:px-6.25 lg:py-3.5 lg:text-[20px] lg:tracking-[-0.8px] data-[active=false]:bg-[#062520] data-[active=false]:font-semibold data-[active=false]:text-[#7E8E8B] data-[active=false]:hover:bg-[#0A3B32] data-[active=true]:bg-[#FDF2E4] data-[active=true]:font-bold data-[active=true]:text-[#132D27] data-[active=true]:hover:bg-white"
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          data-news-grid
          className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((n) => (
            <article
              key={n.key}
              data-news-card
              data-news-key={n.key}
              className="flex w-full max-w-120 flex-col items-start rounded-4xl bg-[#062520] px-6 py-8"
            >
              <p className="font-geist text-[16px] font-medium uppercase leading-7 tracking-[-0.64px] text-[#E8FFED]">
                {n.category}
              </p>
              <h3 className="mt-6 font-darker text-[24px] font-bold tracking-[-0.72px] text-[#E8FFED]" style={{ lineHeight: "26px" }}>
                {n.title}
              </h3>
              <p className="mt-3 font-geist text-[16px] font-medium leading-6 tracking-[-0.64px] text-white/68">
                {n.excerpt}
              </p>
              <a
                href={n.href}
                className="mt-6 inline-flex h-10.25 items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-5 font-darker text-[16px] font-bold uppercase leading-7 tracking-[-0.48px] text-white transition-colors hover:bg-white/10"
              >
                Read Essay
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
