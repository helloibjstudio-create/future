"use client";

import { useState } from "react";

type Dimension = {
  key: string;
  label: string;
  category: string;
  title: string;
  description: string;
  bullets: string[];
  links: { label: string; href: string }[];
};

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
];

const DIAGRAM_ORDER = ["talent", "asset", "itana", "infraco", "futurepay"];
const DIAGRAM_DIMENSIONS = DIAGRAM_ORDER.map(
  (key) => DIMENSIONS.find((d) => d.key === key)!,
);

const VIEW = 496;
const CENTER = VIEW / 2;
const OUTER_RING_R = 247.25;
const NODE_R = 22;
const NODE_ORBIT = 248;
const NODE_ORBIT_PCT = (NODE_ORBIT / VIEW) * 100;

const LABEL_ABOVE = "translate(-50%, calc(-100% - 14px))";
const LABEL_BELOW = "translate(-50%, 14px)";

const LABEL_TRANSFORMS = [
  LABEL_ABOVE,
  LABEL_ABOVE,
  LABEL_BELOW,
  LABEL_BELOW,
  LABEL_ABOVE,
];

function nodeAngle(index: number) {
  return (index / DIMENSIONS.length) * Math.PI * 2 - Math.PI / 2;
}

function nodeSvgPos(index: number) {
  const a = nodeAngle(index);
  return {
    x: CENTER + Math.cos(a) * NODE_ORBIT,
    y: CENTER + Math.sin(a) * NODE_ORBIT,
  };
}

function nodePercentPos(index: number) {
  const a = nodeAngle(index);
  return {
    x: 50 + Math.cos(a) * NODE_ORBIT_PCT,
    y: 50 + Math.sin(a) * NODE_ORBIT_PCT,
  };
}

export default function DimensionsSection() {
  const [activeKey, setActiveKey] = useState(DIMENSIONS[0].key);

  return (
    <section
      id="companies"
      data-section="dimensions"
      className="relative w-full bg-[#050E0A] pt-4 pb-24 md:pt-8 md:pb-32"
    >
      <div className="mx-auto max-w-300 px-6 lg:px-12">
        <div className="mx-auto mb-12 flex max-w-240 flex-col items-center gap-6 text-center sm:gap-8 lg:mb-16 lg:gap-10">
          <p className="font-geist text-[14px] font-medium uppercase leading-6 tracking-[-0.4px] text-[#E8FFED] sm:text-[16px] sm:leading-7 sm:tracking-[-0.64px]">
            Companies
          </p>
          <h2 className="font-darker text-[36px] font-extrabold uppercase leading-[1.05] tracking-[-1px] text-[#E8FFED] sm:text-[44px] sm:tracking-[-1.32px] md:text-[52px] md:tracking-[-1.56px] lg:text-[64px] lg:leading-15 lg:tracking-[-1.92px]">
            Five dimensions.
            <br />
            One integrated engine.
          </h2>
          <p className="max-w-167.25 font-geist text-[16px] font-medium leading-7 tracking-[-0.4px] text-white/68 sm:text-[18px] lg:text-[20px] lg:leading-8 lg:tracking-[-0.8px]">
            Not a holding company. Not a federation. One machine built across
            the five dimensions that make Africa&apos;s digital economy possible.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-16 md:gap-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-32">
          <div className="flex items-start justify-center pt-8 lg:pt-16">
            <div className="relative aspect-square w-full max-w-124">
              <svg
                viewBox={`0 0 ${VIEW} ${VIEW}`}
                className="absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
              >
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={OUTER_RING_R}
                  fill="none"
                  stroke="#152422"
                  strokeWidth="1.5"
                />

                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r="92.5"
                  fill="none"
                  stroke="#152422"
                  strokeWidth="3"
                  strokeDasharray="11 11"
                />

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
                      strokeWidth={3}
                      strokeLinecap="round"
                      style={{
                        strokeDasharray: NODE_ORBIT,
                        strokeDashoffset: isActive ? 0 : NODE_ORBIT,
                        transition: "stroke-dashoffset 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    />
                  );
                })}

                <circle cx={CENTER} cy={CENTER} r={NODE_R} fill="#6DD693" />

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
                        transition: isActive
                          ? "fill 250ms ease 500ms"
                          : "fill 200ms ease",
                        cursor: "pointer",
                      }}
                      onClick={() => setActiveKey(d.key)}
                      onMouseEnter={() => setActiveKey(d.key)}
                    />
                  );
                })}
              </svg>

              {DIAGRAM_DIMENSIONS.map((d, i) => {
                const { x, y } = nodePercentPos(i);
                const isActive = d.key === activeKey;
                return (
                  <button
                    key={`label-${d.key}`}
                    type="button"
                    onClick={() => setActiveKey(d.key)}
                    onMouseEnter={() => setActiveKey(d.key)}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: LABEL_TRANSFORMS[i],
                    }}
                    className={`absolute cursor-pointer font-darker text-[13px] uppercase leading-6 tracking-[-0.36px] whitespace-nowrap transition-colors sm:text-[16px] sm:leading-8 sm:tracking-[-0.48px] md:text-[20px] md:leading-10 md:tracking-[-0.6px] lg:text-[24px] lg:leading-15 lg:tracking-[-0.72px] ${
                      isActive
                        ? "font-extrabold text-[#6DD693]"
                        : "font-bold text-[#8CA195] hover:text-[#B5CDBF]"
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col divide-y divide-[#152422] border-y border-[#152422]">
            {DIMENSIONS.map((d) => {
              const isActive = d.key === activeKey;
              return (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => setActiveKey(d.key)}
                  onMouseEnter={() => setActiveKey(d.key)}
                  data-dimension-card
                  data-dimension-key={d.key}
                  data-active={isActive}
                  className="py-6 text-left transition-colors data-[active=true]:bg-[rgba(3,20,17,0)]"
                >
                  <p className="font-darker text-[14px] font-bold uppercase leading-15 tracking-[-0.42px] text-[#A8AEAD]">
                    {d.category}
                  </p>
                  <h3 className="font-darker text-[22px] font-bold uppercase leading-10 tracking-[-0.66px] text-[#6DD693] sm:text-[24px] sm:leading-12 sm:tracking-[-0.72px] lg:text-[28px] lg:leading-15 lg:tracking-[-0.84px]">
                    {d.title}
                  </h3>
                  <p className="font-geist text-[16px] font-medium leading-8 tracking-[-0.64px] text-white/68">
                    {d.description}
                  </p>
                  <ul className="mt-3 space-y-1">
                    {d.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 font-darker text-[16px] font-semibold leading-8 tracking-[-0.32px] text-white/68"
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
                          />
                          <rect
                            x="0.5"
                            y="0.5"
                            width="15"
                            height="15"
                            rx="7.5"
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
                  <div className="mt-4 flex items-center gap-2">
                    {d.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 font-geist text-[11px] font-semibold tracking-wide text-white transition-colors hover:bg-white/10"
                      >
                        {l.label === "WEBSITE" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
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
                            width="12"
                            height="12"
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
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
