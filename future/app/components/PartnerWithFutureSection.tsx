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
      className="relative w-full bg-[#050E0A] py-16 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-300 px-5 sm:px-6 lg:px-12">
        <div className="mx-auto mb-10 flex max-w-240 flex-col items-center gap-4 text-center sm:mb-12 sm:gap-8 lg:mb-16 lg:gap-10">
          <p className="font-geist text-[13px] font-medium uppercase leading-6 tracking-[-0.4px] text-[#E8FFED] sm:text-[16px] sm:leading-7 sm:tracking-[-0.64px]">
            Partner with Future
          </p>
          <h2 className="font-darker text-[32px] font-extrabold uppercase leading-[1.05] tracking-[-1px] text-[#E8FFED] sm:text-[44px] sm:tracking-[-1.32px] md:text-[52px] md:tracking-[-1.56px] lg:text-[64px] lg:leading-15 lg:tracking-[-1.92px]">
            Build the future with us.
            <br />
            One integrated engine.
          </h2>
          <p className="max-w-167.25 font-geist text-[15px] font-medium leading-6 tracking-[-0.4px] text-white/68 sm:text-[18px] sm:leading-7 lg:text-[20px] lg:leading-8 lg:tracking-[-0.8px]">
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
              className="group relative flex items-center justify-between border-t border-white/10 py-7 transition-colors last:border-b hover:bg-white/[0.02] sm:py-10 md:py-14"
            >
              <div className="pr-4">
                <div className="font-darker text-[36px] font-semibold leading-none tracking-tight text-white transition-colors group-hover:text-emerald-300 xs:text-[44px] sm:text-[64px] md:text-[80px] lg:text-[96px]">
                  {path.label}
                </div>
                <p className="mt-2 text-[13px] font-medium tracking-wide text-white/50 sm:mt-3 sm:text-[14px]">
                  {path.body}
                </p>
              </div>

              <div className="shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1 group-hover:translate-x-1">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 80 80"
                  fill="none"
                  className="h-10 w-10 text-white/35 transition-colors duration-300 group-hover:text-white sm:h-14 sm:w-14 md:h-20 md:w-20"
                >
                  <path
                    d="M20 20 L60 20 L60 60"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M20 60 L60 20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}