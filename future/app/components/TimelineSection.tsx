"use client";

import { useEffect, useRef } from "react";

type Era = {
  key: string;
  years: string;
  title: string;
  body: string;
  side: "left" | "right";
};

const ERAS: Era[] = [
  {
    key: "operators",
    years: "2014-2020",
    title: "OPERATORS",
    body: "Learned to build from the inside. Co-founded Andela and Flutterwave.",
    side: "left",
  },
  {
    key: "investors",
    years: "2020-2026",
    title: "INVESTORS",
    body: "Backed 85 companies across 16 countries.",
    side: "right",
  },
  {
    key: "builders",
    years: "2026 – 2036",
    title: "BUILDERS",
    body: "Concentrating capital and builder energy behind five marquee companies.",
    side: "left",
  },
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let raf = 0;
    const update = () => {
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;

      if (scrollable <= 0) return;

      // Calculate progress of the scroll through the 300vh section (0 to 1)
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));

      const trackH = trackRef.current?.offsetHeight || 0;
      const sparkY = progress * trackH;

      // 1. Move the Spark Trail (green line)
      if (trailRef.current) {
        trailRef.current.style.transform = `scaleY(${progress})`;
      }
      
      // 2. Move the Spark Head (glowing dot)
      if (sparkRef.current) {
        sparkRef.current.style.top = `${progress * 100}%`;
      }

      // 3. Cinematic Camera Tracking (Scrolls the entire content wrapper UP)
      if (wrapperRef.current) {
        const contentH = wrapperRef.current.offsetHeight;
        // Calculates how far the wrapper needs to move up to reach the bottom gracefully
        const maxOffset = Math.max(0, contentH - window.innerHeight + 120);
        const yOffset = -progress * maxOffset;
        wrapperRef.current.style.transform = `translate3d(0, ${yOffset}px, 0)`;
      }

      // 4. Activate Cards based on Spark position
      cardsRef.current.forEach((card) => {
        if (!card) return;

        // Calculate card's vertical center relative to the track
        const cardCenter = card.offsetTop + card.offsetHeight / 2;
        
        // Distance from the spark to the card center (Positive = spark has passed it)
        const distance = sparkY - cardCenter;

        let opacity = 0.2;
        let scale = 0.95;
        let isActive = false;
        let isPassed = false;

        if (distance > -200 && distance < 0) {
          // Spark is approaching: Fade in and scale up smoothly
          const factor = 1 - Math.abs(distance) / 200;
          opacity = 0.2 + factor * 0.8;
          scale = 0.95 + factor * 0.05;
          isActive = factor > 0.6;
        } else if (distance >= 0 && distance <= 150) {
          // Spark is passing: Full power
          opacity = 1;
          scale = 1;
          isActive = true;
        } else if (distance > 150 && distance < 300) {
          // Spark has passed: Dim down slightly
          const factor = (distance - 150) / 150;
          opacity = 1 - factor * 0.4;
          scale = 1 - factor * 0.02;
          isPassed = true;
        } else if (distance >= 300) {
          // Left behind in history
          opacity = 0.6;
          scale = 0.98;
          isPassed = true;
        }

        // Apply smooth styles ONLY to the `<article>` tag, preserving the wrapper and line lengths
        const article = card.querySelector("article");
        if (article) {
          article.style.opacity = opacity.toFixed(3);
          article.style.transform = `scale(${scale.toFixed(3)})`;
        }

        // Update the visual state of the original white half-circle nodes
        const node = card.querySelector("[data-node]") as HTMLElement;
        const line = card.querySelector("[data-line]") as HTMLElement;

        if (node && line) {
          if (isActive) {
            node.style.borderColor = "#6DD693";
            node.style.boxShadow = "0 0 16px 2px rgba(109,214,147,0.6)";
            line.style.backgroundColor = "#6DD693";
          } else if (isPassed) {
            node.style.borderColor = "#2B5D42";
            node.style.boxShadow = "none";
            line.style.backgroundColor = "#2B5D42";
          } else {
            node.style.borderColor = "#FDDFBB";
            node.style.boxShadow = "none";
            line.style.backgroundColor = "#2B5D42";
          }
        }
      });
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      data-section="timeline"
      className="relative w-full bg-[#050E0A]"
      style={{ height: "300vh" }} // Provides the scroll track length
    >
      <div className="sticky top-0 flex h-[100dvh] w-full flex-col overflow-hidden">
        
        {/* Scrolling Content Wrapper (Handles panning up via cinematic camera tracking) */}
        <div
          ref={wrapperRef}
          className="absolute left-0 right-0 w-full transition-transform duration-75 ease-out will-change-transform pt-16 sm:pt-24 md:pt-32"
        >
          {/* Header Content */}
          <div className="relative z-20 mx-auto mb-12 flex w-full max-w-240 flex-col items-center gap-4 px-6 text-center lg:mb-16 lg:gap-6">
            <p className="font-geist text-[14px] font-semibold uppercase leading-6 tracking-[-0.4px] text-white sm:text-[16px] sm:leading-7 sm:tracking-[-0.48px]">
              About Future
            </p>
            <h2 className="font-darker text-[36px] font-extrabold uppercase leading-[1.05] tracking-[-1px] text-white sm:text-[44px] sm:tracking-[-1.32px] md:text-[52px] md:tracking-[-1.56px] lg:text-[64px] lg:leading-15 lg:tracking-[-1.92px]">
              We&apos;ve been building
              <br />
              for twelve years.
            </h2>
            <p className="max-w-140 font-geist text-[16px] font-medium leading-7 tracking-[-0.4px] text-white/68 sm:text-[18px] sm:leading-8 lg:tracking-[-0.48px]">
              Our current mission is bigger in scale, but our foundation spans
              twelve years of execution.
            </p>
          </div>

          <div className="relative mx-auto max-w-278 px-6 pb-20 pl-12 sm:pb-32 md:pl-6">
            {/* Dim Base Track */}
            <div
              ref={trackRef}
              className="absolute bottom-0 left-6 top-0 w-0.75 rounded-full bg-white/10 md:left-1/2 md:-translate-x-1/2"
            />

            {/* Lit Spark Trail */}
            <div
              ref={trailRef}
              className="absolute bottom-0 left-6 top-0 w-0.75 origin-top rounded-full bg-[#6DD693] md:left-1/2 md:-translate-x-1/2"
              style={{ transform: "scaleY(0)" }}
            />

            {/* Traveling Spark Head */}
            <div
              ref={sparkRef}
              className="absolute z-20 left-6 h-3 w-3 -translate-x-[calc(50%-1.5px)] rounded-full border-[3px] border-[#6DD693] bg-white shadow-[0_0_20px_6px_rgba(109,214,147,0.7)] md:left-1/2 md:h-4 md:w-4 md:-translate-x-1/2"
              style={{ top: "0%" }}
            />

            {/* Grid of Cards */}
            <div className="grid grid-cols-1 gap-y-16 py-10 md:grid-cols-[1fr_170px_1fr] md:gap-y-24 md:py-0">
              {ERAS.map((era, i) => {
                const isLeft = era.side === "left";
                return (
                  <div
                    key={era.key}
                    ref={(el) => {
                      cardsRef.current[i] = el;
                    }}
                    style={{ gridRow: i + 1 }}
                    className={`relative w-full md:max-w-98.25 ${
                      isLeft
                        ? "md:col-start-1 md:justify-self-end"
                        : "md:col-start-3 md:justify-self-start"
                    }`}
                  >
                    <article 
                      className={`flex flex-col items-start rounded-3xl border border-[#244F39] bg-[#0D1D1B] p-6 shadow-2xl sm:rounded-4xl sm:p-8 transition-transform duration-100 will-change-[opacity,transform] ${
                        isLeft ? "origin-right" : "origin-left"
                      }`}
                      style={{ opacity: 0.2, transform: "scale(0.95)" }}
                    >
                      <p className="font-darker text-[16px] font-extrabold uppercase leading-8 tracking-[-0.48px] text-[#9B9B9B] sm:text-[20px] sm:leading-15 sm:tracking-[-0.6px]">
                        {era.years}
                      </p>
                      <h3 className="mt-2 font-darker text-[28px] font-extrabold uppercase leading-[1.05] tracking-[-0.84px] text-white sm:text-[32px] sm:tracking-[-0.96px] lg:text-[36px] lg:leading-15 lg:tracking-[-1.08px]">
                        {era.title}
                      </h3>
                      <p className="mt-2 max-w-98.25 font-geist text-[16px] font-medium leading-7 tracking-[-0.4px] text-white/68 sm:text-[18px] sm:leading-8 lg:text-[20px] lg:tracking-[-0.8px]">
                        {era.body}
                      </p>
                    </article>

                    {/* Fixed Line Connections (No longer scales or fades) */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 items-center md:flex ${
                        isLeft ? "left-full" : "right-full flex-row-reverse"
                      }`}
                    >
                      <div
                        data-node
                        className={`relative z-10 h-7 w-3.5 border border-[#FDDFBB] bg-white transition-all duration-300 ${
                          isLeft
                            ? "rounded-r-full border-l-0"
                            : "rounded-l-full border-r-0"
                        }`}
                      />
                      <div
                        data-line
                        className="h-0.75 w-17.75 bg-[#2B5D42] transition-colors duration-300"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}