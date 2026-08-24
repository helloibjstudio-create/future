"use client";

import { useEffect, useRef } from "react";

const HEADLINE_LINE_1 = "Africa needs 25 million";
const HEADLINE_LINE_2 = "new jobs. Every year";

const BODY =
  "Physical infrastructure cannot scale quickly enough to absorb a rapidly growing workforce. The digital economy provides a scalable path to connect African talent to global demand. Future is building the systems that make digital work possible. The goal is to directly contribute 10 million jobs where talent earn $10,000 annually. But a digital economy needs more than skilled people; it requires the assets, infrastructure, financial systems, and environments that enable productivity at scale. This is why Future is a group of companies in five dimensions, working together as an integrated digital conglomerate.";

function Words({ text }: { text: string }) {
  const parts = text.split(" ");
  return (
    <>
      {parts.map((word, i) => (
        <span
          key={i}
          data-reveal-word
          className="inline-block will-change-[opacity]"
          style={{ opacity: 0.18 }}
        >
          {word}&nbsp;
        </span>
      ))}
    </>
  );
}

export default function MissionSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let words: HTMLElement[] = [];
    let total = 0;

    const collect = () => {
      words = Array.from(
        container.querySelectorAll<HTMLElement>("[data-reveal-word]")
      );
      total = words.length;
    };

    let raf = 0;
    const update = () => {
      if (!total) collect();
      if (!total) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) return;

      // Track scroll progress while pinned
      const rawProgress = -rect.top / scrollableDistance;
      const progress = Math.min(1, Math.max(0, rawProgress));

      // Animation smoothly completes near the end of the pinned scroll
      const animationProgress = Math.min(1, progress / 0.9);

      const isMobile = window.innerWidth < 768;
      const waveSize = isMobile ? 8 : 16;
      const head = animationProgress * (total + waveSize);

      for (let i = 0; i < total; i++) {
        const diff = head - i;
        const local = Math.min(1, Math.max(0, diff / waveSize));
        words[i].style.opacity = (0.18 + local * 0.82).toFixed(3);
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    collect();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(
      "resize",
      () => {
        collect();
        onScroll();
      },
      { passive: true }
    );

    const fontsReady =
      typeof document !== "undefined" && "fonts" in document
        ? document.fonts.ready
        : null;
    fontsReady?.then(() => {
      collect();
      update();
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="mission"
      data-section="mission"
      className="relative mb-8 h-[170vh] w-full bg-[#050E0A] sm:mb-12 md:h-[180vh] lg:mb-16"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden">
        <div className="mx-auto flex max-w-240 flex-col items-center gap-6 px-6 text-center sm:gap-8 lg:gap-10">
          <p className="font-geist text-[14px] font-semibold uppercase leading-6 tracking-[-0.4px] text-white sm:text-[16px] sm:leading-7 sm:tracking-[-0.48px]">
            The Challenge
          </p>

          <h2 className="font-darker text-[32px] font-extrabold uppercase leading-[1.05] tracking-[-1px] text-[#E8FFED] xs:text-[36px] sm:text-[44px] sm:tracking-[-1.32px] md:text-[52px] md:tracking-[-1.56px] lg:text-[64px] lg:leading-15 lg:tracking-[-1.92px]">
            {HEADLINE_LINE_1}
            <br />
            {HEADLINE_LINE_2}
          </h2>

          <p className="font-geist text-[15px] font-medium leading-6 tracking-[-0.4px] text-[#AEB4B3] xs:text-[16px] sm:text-[18px] sm:leading-7 lg:text-[20px] lg:leading-8 lg:tracking-[-0.6px]">
            <Words text={BODY} />
          </p>
        </div>
      </div>
    </section>
  );
}