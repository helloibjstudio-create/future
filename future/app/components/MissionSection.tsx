"use client";

import { useEffect, useRef } from "react";

const HEADLINE_LINE_1 = "Africa needs 25 million";
const HEADLINE_LINE_2 = "new jobs. Every year.";

const BODY =
  "Physical infrastructure cannot scale quickly enough to absorb a rapidly growing workforce. The digital economy provides a scalable path to connect African talent to global demand. Future is building the systems that make digital work possible. The goal is to directly contribute 10 million jobs where talent earn $10,000 annually. But a digital economy needs more than skilled people; it requires the assets, infrastructure, financial systems, and environments that enable productivity at scale. This is why Future is a group of companies in five dimensions, working together as an integrated digital conglomerate.";

function Words({ text }: { text: string }) {
  const parts = text.split(" ");
  return (
    <>
      {parts.map((word, i) => (
        <span key={i} data-reveal-word style={{ opacity: 0.18 }}>
          {word}
          {i < parts.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let lines: HTMLElement[][] = [];
    let totalWords = 0;

    const regroup = () => {
      const words = Array.from(
        section.querySelectorAll<HTMLElement>("[data-reveal-word]"),
      );
      lines = [];
      let current: HTMLElement[] = [];
      let currentY = Number.NEGATIVE_INFINITY;
      for (const w of words) {
        const y = Math.round(w.getBoundingClientRect().top);
        if (y - currentY > 6) {
          if (current.length) lines.push(current);
          current = [];
          currentY = y;
        }
        current.push(w);
      }
      if (current.length) lines.push(current);
      totalWords = words.length;
    };

    let raf = 0;
    const update = () => {
      if (!lines.length) return;
      const vh = window.innerHeight || 1;
      const rect = section.getBoundingClientRect();
      const startY = vh * 0.85;
      const endY = -rect.height * 0.15;
      const range = Math.max(1, startY - endY);
      const progress = Math.min(1, Math.max(0, (startY - rect.top) / range));

      let cumulative = 0;
      for (const line of lines) {
        const lineStart = cumulative / totalWords;
        const lineEnd = (cumulative + line.length) / totalWords;
        const localRaw = (progress - lineStart) / (lineEnd - lineStart);
        const local = Math.min(1, Math.max(0, localRaw));

        const wordDur = Math.min(2.5, line.length);
        const head = local * (line.length + wordDur - 1);
        for (let i = 0; i < line.length; i++) {
          const p = Math.min(1, Math.max(0, (head - i) / wordDur));
          line[i].style.opacity = (0.18 + p * 0.82).toFixed(3);
        }
        cumulative += line.length;
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    const onResize = () => {
      regroup();
      onScroll();
    };

    regroup();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    const fontsReady =
      typeof document !== "undefined" && "fonts" in document
        ? document.fonts.ready
        : null;
    fontsReady?.then(() => {
      regroup();
      update();
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mission"
      data-section="mission"
      className="relative flex min-h-screen w-full items-center justify-center bg-[#050E0A]"
    >
      <div className="mx-auto flex max-w-240 flex-col items-center gap-6 px-6 py-20 text-center sm:gap-8 sm:py-28 lg:py-34.5">
        <p className="font-geist text-[14px] font-semibold uppercase leading-6 tracking-[-0.4px] text-white sm:text-[16px] sm:leading-7 sm:tracking-[-0.48px]">
          <Words text="The Challenge" />
        </p>

        <h2 className="font-darker text-[36px] font-extrabold uppercase leading-[1.05] tracking-[-1px] text-[#E8FFED] sm:text-[44px] sm:tracking-[-1.32px] md:text-[52px] md:tracking-[-1.56px] lg:text-[64px] lg:leading-15 lg:tracking-[-1.92px]">
          <Words text={HEADLINE_LINE_1} />
          <br />
          <Words text={HEADLINE_LINE_2} />
        </h2>

        <p className="font-geist text-[16px] font-medium leading-7 tracking-[-0.4px] text-[#AEB4B3] sm:text-[18px] sm:leading-7 lg:text-[20px] lg:leading-8 lg:tracking-[-0.6px]">
          <Words text={BODY} />
        </p>
      </div>
    </section>
  );
}
