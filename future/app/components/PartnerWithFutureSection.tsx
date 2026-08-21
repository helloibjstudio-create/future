"use client";

type Path = {
  key: string;
  label: string;
  body: string;
  href: string;
};

const PATHS: Path[] = [
  {
    key: "build",
    label: "BUILD",
    body: "For founders and operators.",
    href: "#build",
  },
  {
    key: "invest",
    label: "INVEST",
    body: "For capital partners and institutions.",
    href: "#invest",
  },
  {
    key: "partner",
    label: "PARTNER",
    body: "For corporation and Governments.",
    href: "#partner",
  },
  {
    key: "join",
    label: "JOIN",
    body: "For exceptional builder talent.",
    href: "#join",
  },
];

export default function PartnerWithFutureSection() {
  return (
    <section
      id="partner"
      data-section="partner"
      className="relative w-full bg-[#050E0A] py-20 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-300 px-6 lg:px-12">
        <div className="mx-auto mb-12 flex max-w-240 flex-col items-center gap-6 text-center sm:gap-8 lg:mb-16 lg:gap-10">
          <p className="font-geist text-[14px] font-medium uppercase leading-6 tracking-[-0.4px] text-[#E8FFED] sm:text-[16px] sm:leading-7 sm:tracking-[-0.64px]">
            Partner with Future
          </p>
          <h2 className="font-darker text-[36px] font-extrabold uppercase leading-[1.05] tracking-[-1px] text-[#E8FFED] sm:text-[44px] sm:tracking-[-1.32px] md:text-[52px] md:tracking-[-1.56px] lg:text-[64px] lg:leading-15 lg:tracking-[-1.92px]">
            Build the future with us.
            <br />
            One integrated engine.
          </h2>
          <p className="max-w-167.25 font-geist text-[16px] font-medium leading-7 tracking-[-0.4px] text-white/68 sm:text-[18px] lg:text-[20px] lg:leading-8 lg:tracking-[-0.8px]">
            If you want to deploy capital, build companies, solve hard problems,
            or create digital systems engage with Future.
          </p>
        </div>

        <div data-partner-list className="flex flex-col">
          {PATHS.map((path, i) => (
            <a
              key={path.key}
              href={path.href}
              data-partner-row
              data-partner-key={path.key}
              data-partner-index={i}
              className="group relative flex flex-col justify-between border-t border-white/8 py-10 transition-colors last:border-b hover:bg-white/[0.02] md:flex-row md:items-center md:py-14"
            >
              <div>
                <div className="font-darker text-[44px] font-semibold leading-none tracking-tight text-white transition-colors group-hover:text-emerald-300 sm:text-[64px] md:text-[80px] lg:text-[96px]">
                  {path.label}
                </div>
                <p className="mt-3 text-[13px] font-medium tracking-wide text-white/50 md:text-[14px]">
                  {path.body}
                </p>
              </div>

              <svg
                aria-hidden="true"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                className="mt-6 hidden text-white/25 transition-colors group-hover:text-white md:mt-0 md:block"
              >
                <path
                  d="M20 20 L60 20 L60 60"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M20 60 L60 20"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
