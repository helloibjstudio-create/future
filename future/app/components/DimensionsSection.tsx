"use client";

import { useState, useEffect, useRef } from "react";

type Dimension = {
  key: string;
  label: string;
  category: string;
  title: string;
  description: string;
  bullets: string[];
  links: { label: string; href: string }[];
};

// Reordered to match the clockwise visual layout
const DIMENSIONS: Dimension[] = [
  {
    key: "talent",
    label: "TALENT NATION",
    category: "DIGITAL SKILLS",
    title: "TALENT NATION",
    description: "Building the workforce for the digital economy.",
    bullets: ["Solves the talent gap by training and providing workforce."],
    links: [
      { label: "WEBSITE", href: "#" },
      { label: "LINKEDIN", href: "#" },
    ],
  },
  {
    key: "asset",
    label: "ASSET STACK",
    category: "DIGITAL ASSETS",
    title: "ASSET STACK",
    description:
      "Putting productive assets in the hands of people who need them.",
    bullets: [
      "Solves the productivity asset gap by making work devices accessible.",
    ],
    links: [
      { label: "WEBSITE", href: "#" },
      { label: "LINKEDIN", href: "#" },
    ],
  },
  {
    key: "itana",
    label: "ITANA",
    category: "DIGITAL GOVERNMENT",
    title: "ITANA",
    description: "Building the environments for digital businesses to grow.",
    bullets: ["Solves the operating environment gap via digital governance."],
    links: [
      { label: "WEBSITE", href: "#" },
      { label: "LINKEDIN", href: "#" },
    ],
  },
  {
    key: "infraco",
    label: "INFRACO",
    category: "DIGITAL INFRASTRUCTURE",
    title: "INFRACO",
    description:
      "Building the infrastructure that makes digital work possible.",
    bullets: ["Solves the talent gap by training and providing workforce."],
    links: [
      { label: "WEBSITE", href: "#" },
      { label: "LINKEDIN", href: "#" },
    ],
  },
  {
    key: "futurepay",
    label: "FUTURE PAY",
    category: "DIGITAL FINANCIAL SERVICES",
    title: "FUTUREPAY",
    description: "Building the financial rails for a digital economy.",
    bullets: ["Solves the financial access gap with payment and value rails."],
    links: [
      { label: "WEBSITE", href: "#" },
      { label: "LINKEDIN", href: "#" },
    ],
  },
];

const DIAGRAM_ORDER = ["talent", "asset", "itana", "infraco", "futurepay"];
const DIAGRAM_DIMENSIONS = DIAGRAM_ORDER.map(
  (key) => DIMENSIONS.find((d) => d.key === key)!
);

const VIEW = 560;
const CENTER = VIEW / 2;
const OUTER_RING_R = 210;
const NODE_R = 20;
const NODE_ORBIT = 210;

// Increased the offsets to give plenty of clearance under the text
const LABEL_TRANSFORMS = [
  "translate(-50%, calc(-100% - 32px))",             // Top (Talent)
  "translate(calc(-50% + 36px), calc(-100% - 28px))", // Top-Right (Asset)
  "translate(calc(-50% + 28px), 30px)",              // Bottom-Right (Itana)
  "translate(calc(-50% - 28px), 30px)",              // Bottom-Left (Infraco)
  "translate(calc(-50% - 36px), calc(-100% - 28px))", // Top-Left (Future Pay)
];

function nodeAngle(index: number) {
  return (index / DIAGRAM_DIMENSIONS.length) * Math.PI * 2 - Math.PI / 2;
}

function nodeSvgPos(index: number) {
  const a = nodeAngle(index);
  return {
    x: CENTER + Math.cos(a) * NODE_ORBIT,
    y: CENTER + Math.sin(a) * NODE_ORBIT,
  };
}

export default function DimensionsSection() {
  const [activeKey, setActiveKey] = useState(DIMENSIONS[0].key);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.getAttribute("data-dimension-key");
            if (key) setActiveKey(key);
          }
        });
      },
      {
        root: null,
        // Aligns trigger strictly with top level of the sticky diagram
        rootMargin: isMobile ? "-20% 0px -55% 0px" : "-18% 0px -60% 0px",
        threshold: 0.1,
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToDimension = (key: string) => {
    setActiveKey(key);
    const index = DIMENSIONS.findIndex((d) => d.key === key);
    if (cardRefs.current[index]) {
      cardRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="companies"
      data-section="dimensions"
      className="relative w-full bg-[#050E0A] pt-4 pb-12 sm:pb-16 lg:pb-20"
    >
      <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="mx-auto mb-10 flex max-w-240 flex-col items-center gap-4 text-center sm:mb-14 sm:gap-6 lg:mb-16 lg:gap-10">
          <p className="font-geist text-[13px] font-medium uppercase leading-6 tracking-[-0.4px] text-[#E8FFED] sm:text-[16px] sm:leading-7">
            Companies
          </p>
          <h2 className="font-darker text-[32px] font-extrabold uppercase leading-[1.05] tracking-[-1px] text-[#E8FFED] sm:text-[44px] md:text-[52px] lg:text-[64px] lg:leading-15">
            Five dimensions.
            <br />
            One integrated engine.
          </h2>
          <p className="max-w-167.25 font-geist text-[15px] font-medium leading-6 text-white/68 sm:text-[18px] sm:leading-7 lg:text-[20px] lg:leading-8">
            Not a holding company. Not a federation. One machine built across
            the five dimensions that make Africa&apos;s digital economy possible.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          
          {/* Left Sticky Diagram Container */}
          <div
            ref={diagramRef}
            className="sticky top-0 z-20 flex w-full flex-col items-center justify-start bg-[#050E0A] pt-2 pb-6 sm:py-4 lg:top-24 lg:z-10 lg:items-start lg:bg-transparent lg:p-0"
          >
            <div className="relative aspect-square w-full max-w-[300px] xs:max-w-[340px] sm:max-w-[400px] lg:max-w-[460px]">
              <svg
                viewBox={`0 0 ${VIEW} ${VIEW}`}
                className="h-full w-full overflow-visible"
                aria-hidden="true"
              >
                {/* Outer Ring */}
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={OUTER_RING_R}
                  fill="none"
                  stroke="#152422"
                  strokeWidth="1.5"
                />

                {/* Inner Dashed Ring */}
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r="85"
                  fill="none"
                  stroke="#152422"
                  strokeWidth="2.5"
                  strokeDasharray="10 10"
                />

                {/* Base Dark Lines */}
                {DIAGRAM_DIMENSIONS.map((d, i) => {
                  const { x, y } = nodeSvgPos(i);
                  return (
                    <line
                      key={`base-line-${d.key}`}
                      x1={CENTER}
                      y1={CENTER}
                      x2={x}
                      y2={y}
                      stroke="#12221F"
                      strokeWidth={1.5}
                    />
                  );
                })}

                {/* Active Light Ray */}
                {DIAGRAM_DIMENSIONS.map((d, i) => {
                  const { x, y } = nodeSvgPos(i);
                  const isActive = d.key === activeKey;
                  return (
                    <line
                      key={`glow-line-${d.key}`}
                      x1={CENTER}
                      y1={CENTER}
                      x2={x}
                      y2={y}
                      stroke="#6DD693"
                      strokeWidth={3.5}
                      strokeLinecap="round"
                      style={{
                        strokeDasharray: NODE_ORBIT,
                        strokeDashoffset: isActive ? 0 : NODE_ORBIT,
                        transition:
                          "stroke-dashoffset 650ms cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    />
                  );
                })}

                {/* Core Node */}
                <circle cx={CENTER} cy={CENTER} r={NODE_R} fill="#6DD693" />

                {/* Node Endpoints */}
                {DIAGRAM_DIMENSIONS.map((d, i) => {
                  const { x, y } = nodeSvgPos(i);
                  const isActive = d.key === activeKey;
                  return (
                    <circle
                      key={`node-${d.key}`}
                      cx={x}
                      cy={y}
                      r={NODE_R}
                      fill={isActive ? "#6DD693" : "#12221F"}
                      style={{
                        transition: "fill 300ms ease",
                        cursor: "pointer",
                      }}
                      onClick={() => scrollToDimension(d.key)}
                    />
                  );
                })}
              </svg>

              {/* Edge Node Buttons */}
              {DIAGRAM_DIMENSIONS.map((d, i) => {
                const { x, y } = nodeSvgPos(i);
                const xPct = (x / VIEW) * 100;
                const yPct = (y / VIEW) * 100;
                const isActive = d.key === activeKey;

                return (
                  <button
                    key={`label-${d.key}`}
                    type="button"
                    onClick={() => scrollToDimension(d.key)}
                    style={{
                      left: `${xPct}%`,
                      top: `${yPct}%`,
                      transform: LABEL_TRANSFORMS[i],
                    }}
                    className={`absolute cursor-pointer whitespace-nowrap font-darker text-[11px] uppercase leading-none tracking-tight transition-all duration-300 sm:text-[14px] md:text-[16px] lg:text-[18px] ${
                      isActive
                        ? "scale-105 font-extrabold text-[#6DD693]"
                        : "font-bold text-[#8CA195] opacity-60 hover:text-[#B5CDBF] hover:opacity-100"
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>

            <div className="pointer-events-none absolute -bottom-6 left-0 h-6 w-full bg-gradient-to-b from-[#050E0A] to-transparent lg:hidden" />
          </div>

          {/* Right Narrative List */}
          <div className="relative z-10 flex flex-col pt-0">
            {DIMENSIONS.map((d, index) => {
              const isActive = d.key === activeKey;
              const isLast = index === DIMENSIONS.length - 1;

              return (
                <div
                  key={d.key}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  data-dimension-key={d.key}
                  className={`flex flex-col justify-start border-b border-[#152422] transition-opacity duration-300 ${
                    index === 0
                      ? "pt-0 pb-10 sm:pb-12 lg:pb-14"
                      : isLast
                      ? "pt-8 pb-4 sm:pt-10 lg:pt-12 border-b-0 min-h-[300px] lg:min-h-[460px]"
                      : "py-8 sm:py-10 lg:py-12"
                  } ${isActive ? "opacity-100" : "opacity-20"}`}
                >
                  <p className="font-darker text-[13px] font-bold uppercase tracking-[-0.42px] text-[#A8AEAD] sm:text-[14px]">
                    {d.category}
                  </p>
                  <h3 className="mt-1 font-darker text-[24px] font-bold uppercase leading-8 tracking-[-0.66px] text-[#6DD693] sm:text-[28px] sm:leading-10 lg:text-[34px] lg:leading-11">
                    {d.title}
                  </h3>
                  <p className="mt-2 font-geist text-[15px] font-medium leading-6 tracking-[-0.4px] text-white/80 sm:text-[16px] sm:leading-7">
                    {d.description}
                  </p>

                  <ul className="mt-3 space-y-2">
                    {d.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-3 font-darker text-[14px] font-semibold leading-5 text-white/70 sm:text-[15px]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="shrink-0"
                          aria-hidden="true"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            width="15"
                            height="15"
                            rx="7.5"
                            fill="#12221F"
                            stroke="#253431"
                          />
                          <path
                            d="M4 8.25101L5.36366 10.4178C5.49151 10.621 5.76827 10.6666 5.95453 10.5151L12 5.59998"
                            stroke="#6DD693"
                            strokeLinecap="round"
                          />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-center gap-3">
                    {d.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-geist text-[11px] font-semibold tracking-wide text-white transition-colors hover:bg-white/15 sm:px-4 sm:py-2 sm:text-[12px]"
                      >
                        {l.label === "WEBSITE" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M2 12h20" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                          </svg>
                        )}
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}