"use client";

import { HeroVideoMp4, HeroVideoWebm } from "@/public";
import { useEffect, useRef } from "react";

const HERO_PILLS = [
  { label: "BUILD WITH FUTURE", href: "#build", variant: "solid" as const },
  { label: "INVEST IN FUTURE", href: "#invest", variant: "outline" as const },
  { label: "PARTNER WITH FUTURE", href: "#partner", variant: "outline" as const },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.loop = true;

    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.then === "function") {
        p.catch(() => {
          const resume = () => {
            video.play().catch(() => {});
            window.removeEventListener("pointerdown", resume);
            window.removeEventListener("touchstart", resume);
            window.removeEventListener("keydown", resume);
          };
          window.addEventListener("pointerdown", resume, { once: true });
          window.addEventListener("touchstart", resume, { once: true });
          window.addEventListener("keydown", resume, { once: true });
        });
      }
    };

    const onEnded = () => {
      try {
        video.currentTime = 0;
      } catch {
        /* ignore */
      }
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      const onReady = () => {
        tryPlay();
        video.removeEventListener("loadeddata", onReady);
        video.removeEventListener("canplay", onReady);
      };
      video.addEventListener("loadeddata", onReady);
      video.addEventListener("canplay", onReady);
    }

    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!el || !overlay || !content) return;

    let raf = 0;
    const update = () => {
      const vh = window.innerHeight || 1;
      const scroll = window.scrollY || document.documentElement.scrollTop || 0;
      const progress = Math.min(1, Math.max(0, scroll / vh));
      el.dataset.progress = progress.toFixed(3);

      const dim = 0.5 + progress * 0.5;
      overlay.style.background = `rgba(0, 0, 0, ${dim})`;

      const contentFade = Math.min(1, progress / 0.45);
      content.style.opacity = String(1 - contentFade);
      content.style.transform = `translateY(${-contentFade * 40}px)`;
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
      ref={sectionRef}
      id="hero"
      data-section="hero"
      className="sticky top-0 z-0 flex h-[100dvh] w-full items-end overflow-hidden pb-12 sm:pb-20 lg:pb-36"
    >
      <video
        ref={videoRef}
        data-hero-video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={HeroVideoMp4} type="video/mp4" />
        <source src={HeroVideoWebm} type="video/webm" />
      </video>

      <div
        ref={overlayRef}
        data-hero-overlay
        className="absolute inset-0 backdrop-blur-[1px]"
        style={{ background: "rgba(0, 0, 0, 0.5)" }}
      />

      <div
        data-hero-bottom-fade
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[50vh] sm:h-[55vh]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5, 14, 10, 0) 0%, rgba(5, 14, 10, 0.35) 45%, rgba(5, 14, 10, 0.8) 75%, rgba(5, 14, 10, 1) 100%)",
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 flex w-full flex-col items-start gap-5 px-5 will-change-[opacity,transform] sm:gap-7 sm:px-8 lg:gap-8 lg:px-20"
      >
        <h1
          data-hero-headline
          className="font-darker text-[38px] leading-[0.85] font-semibold tracking-[-0.02em] text-[#FFE3C3] xs:text-[44px] sm:text-[60px] md:text-[80px] lg:text-[96px] lg:leading-18.5 lg:tracking-[-2.88px]"
        >
          We{" "}
          <span
            data-hero-strike
            className="text-white"
            style={{
              backgroundImage: "linear-gradient(#fff, #fff)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "0 62%",
              backgroundSize: "100% 0.07em",
            }}
          >
            invest in companies who
          </span>
          <br />
          build Africa&apos;s future
        </h1>

        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {HERO_PILLS.map((pill) => (
            <a
              key={pill.href}
              href={pill.href}
              data-hero-pill
              data-active={pill.variant === "solid"}
              className="font-darker inline-flex items-center justify-center gap-2 rounded-[500px] px-3.5 py-2.5 text-[13px] font-extrabold leading-tight tracking-[-0.3px] transition-colors sm:px-5 sm:py-3.5 sm:text-[16px] sm:leading-7 sm:tracking-[-0.5px] lg:text-[20px] lg:tracking-[-0.6px] data-[active=false]:glass-pill data-[active=false]:text-white data-[active=true]:bg-[#FFE3C3] data-[active=true]:text-[#132D27] data-[active=true]:hover:bg-white"
            >
              {pill.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}