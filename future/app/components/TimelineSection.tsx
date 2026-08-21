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
  return (
    <section
      id="about"
      data-section="timeline"
      className="relative w-full bg-[#050E0A] py-20 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-300 px-6 lg:px-12">
        <div className="relative mx-auto mb-16 flex max-w-240 flex-col items-center gap-6 text-center lg:mb-24">
          <p className="font-geist text-[14px] font-semibold uppercase leading-6 tracking-[-0.4px] text-white sm:text-[16px] sm:leading-7 sm:tracking-[-0.48px]">
            About Future
          </p>
          <h2 className="font-darker text-[36px] font-extrabold uppercase leading-[1.05] tracking-[-1px] text-white sm:text-[44px] sm:tracking-[-1.32px] md:text-[52px] md:tracking-[-1.56px] lg:text-[64px] lg:leading-15 lg:tracking-[-1.92px]">
            We&apos;ve been building
            <br />
            for twelve years.
          </h2>

          <p className="max-w-140 font-geist text-[16px] font-medium leading-7 tracking-[-0.4px] text-white/68 sm:leading-8 sm:tracking-[-0.48px]">
            Our current mission is bigger in scale, but our foundation spans
            twelve years of execution.
          </p>
        </div>

        <div className="relative mx-auto max-w-278">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 left-1/2 hidden w-0.75 -translate-x-1/2 md:block"
            style={{
              background:
                "linear-gradient(180deg, rgba(109, 214, 147, 0) 0%, #6DD693 56.25%, rgba(109, 214, 147, 0) 100%)",
            }}
          />

          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-[1fr_170px_1fr] md:gap-y-28">
            {ERAS.map((era, i) => {
              const isLeft = era.side === "left";
              return (
                <div
                  key={era.key}
                  style={{ gridRow: i + 1 }}
                  className={`relative w-full md:max-w-98.25 ${
                    isLeft
                      ? "md:col-start-1 md:justify-self-end"
                      : "md:col-start-3 md:justify-self-start"
                  }`}
                >
                  <article className="flex flex-col items-start rounded-3xl border border-[#244F39] bg-[#0D1D1B] p-6 sm:rounded-4xl sm:p-8">
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

                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 items-center md:flex ${
                      isLeft ? "left-full" : "right-full flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`relative z-10 h-7 w-3.5 border border-[#FDDFBB] bg-white ${
                        isLeft
                          ? "rounded-r-full border-l-0"
                          : "rounded-l-full border-r-0"
                      }`}
                    />
                    <div className="h-0.75 w-17.75 bg-[#2B5D42]" />
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
