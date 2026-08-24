"use client";

import { useState, useEffect } from "react";

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
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const visible = active === "ALL"
    ? INSIGHTS
    : INSIGHTS.filter((n) => n.category === active);

  // Intersection Observer to handle scroll & filter entry animations
  useEffect(() => {
    // Reset revealed items when switching tabs so they re-animate
    setRevealed(new Set());

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-anim-id");
            if (id) {
              setRevealed((prev) => new Set(prev).add(id));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Slight delay ensures the DOM has updated with the new filtered elements before observing
    const timer = setTimeout(() => {
      document.querySelectorAll("[data-anim-id]").forEach((el) => {
        observer.observe(el);
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [active]);

  return (
    <section
      id="news"
      data-section="news"
      className="relative w-full bg-[#050E0A] py-14 sm:py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="mx-auto mb-10 flex max-w-240 flex-col items-center gap-4 text-center sm:mb-12 sm:gap-6 lg:gap-10">
          <p className="font-geist text-[13px] font-medium uppercase leading-6 tracking-[-0.4px] text-[#E8FFED] sm:text-[16px] sm:leading-7 sm:tracking-[-0.64px]">
            News &amp; Insights
          </p>
          <h2 className="font-darker text-[32px] font-extrabold uppercase leading-[1.05] tracking-[-1px] text-[#E8FFED] sm:text-[44px] sm:tracking-[-1.32px] md:text-[52px] md:tracking-[-1.56px] lg:text-[64px] lg:leading-15 lg:tracking-[-1.92px]">
            See the future
            <br />
            through our lens.
          </h2>
          <p className="max-w-167.25 font-geist text-[15px] font-medium leading-6 tracking-[-0.4px] text-white/68 sm:text-[18px] sm:leading-7 lg:text-[20px] lg:leading-8 lg:tracking-[-0.8px]">
            Studying and sharing the forces, ideas, news, and evidence shaping
            Africa&apos;s digital economy.
          </p>
        </div>

        {/* Categories / Tabs */}
        <div
          data-news-tabs
          className="mb-8 flex w-full items-center gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:mb-12 sm:flex-wrap sm:justify-center sm:gap-2.5 sm:overflow-visible sm:pb-0 md:mb-16 [&::-webkit-scrollbar]:hidden"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              data-news-tab
              data-active={active === cat}
              onClick={() => setActive(cat)}
              className="font-geist inline-flex shrink-0 items-center justify-center gap-2 rounded-[80px] px-3.5 py-2 text-[12px] uppercase leading-none tracking-[-0.3px] transition-colors sm:px-5 sm:py-3 sm:text-[15px] sm:leading-7 sm:tracking-[-0.5px] lg:px-6.25 lg:py-3.5 lg:text-[18px] lg:tracking-[-0.8px] data-[active=false]:bg-[#062520] data-[active=false]:font-semibold data-[active=false]:text-[#7E8E8B] data-[active=false]:hover:bg-[#0A3B32] data-[active=true]:bg-[#FDF2E4] data-[active=true]:font-bold data-[active=true]:text-[#132D27] data-[active=true]:hover:bg-white"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div
          data-news-grid
          className="mx-auto grid grid-cols-1 items-stretch justify-items-center gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {visible.map((n, i) => {
            // Unique ID combining the active filter and card key so they remount/reanimate on tab change
            const uid = `${active}-${n.key}`;
            const isRevealed = revealed.has(uid);

            return (
              <article
                key={uid}
                data-news-card
                data-anim-id={uid}
                className={`flex w-full max-w-120 flex-col items-start justify-between rounded-3xl bg-[#062520] p-6 sm:rounded-4xl sm:p-7 lg:py-8 will-change-[opacity,transform] transition-all duration-700 ease-out ${
                  isRevealed
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-10 scale-[0.98] opacity-0"
                }`}
                // Stagger the entry delay based on the column index
                style={{ transitionDelay: `${(i % 3) * 100}ms` }}
              >
                <div>
                  <p className="font-geist text-[13px] font-medium uppercase leading-6 tracking-[-0.64px] text-[#E8FFED] sm:text-[15px] sm:leading-7">
                    {n.category}
                  </p>
                  <h3
                    className="mt-4 font-darker text-[20px] font-bold tracking-[-0.72px] text-[#E8FFED] sm:mt-5 sm:text-[22px] lg:mt-6 lg:text-[24px]"
                    style={{ lineHeight: "1.2" }}
                  >
                    {n.title}
                  </h3>
                  <p className="mt-2.5 font-geist text-[14px] font-medium leading-6 tracking-[-0.5px] text-white/68 sm:mt-3 sm:text-[15px] sm:leading-6">
                    {n.excerpt}
                  </p>
                </div>
                <a
                  href={n.href}
                  className="mt-6 inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4.5 font-darker text-[14px] font-bold uppercase leading-none tracking-[-0.48px] text-white transition-colors hover:bg-white/10 sm:h-10.25 sm:px-5 sm:text-[16px]"
                >
                  Read Essay
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}