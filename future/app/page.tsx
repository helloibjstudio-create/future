"use client";

import { useState, useEffect } from "react";
import { Builders, Founders, HeroBoy, Investors, logo, ripple } from "@/public";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Total animation time is 7.95s. We swap views right as it ends.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#142621] text-white overflow-hidden font-sans">
        
        {/* Inline styles for the sequential loader animation */}
        <style>{`
          @keyframes sequential-load {
            0% { background-color: #2B3F37; }
            100% { background-color: #FFE3C3; }
          }
        `}</style>

        {/* Background Ripple Effect */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <Image
            src={ripple} 
            alt="Ripple background pattern"
            fill
            className="opacity-90 " // Ensures ripple looks good on all devices
            priority
          />
        </div>

        {/* Top Header / Logo - Optimized for mobile */}
        <div className="absolute top-6 sm:top-8 md:top-10 z-10 flex items-center gap-1.5 sm:gap-2">
          <Image
            src={logo} 
            alt="Future Logo"
            width={14.742}
            height={18}
            className="object-contain w-[12px] sm:w-[14.742px]" // Slightly smaller icon on very small screens
          />
          <span className="text-[18px] sm:text-[22px] font-[600] font-[family-name:var(--font-darker-grotesque)] tracking-tight">Future</span>
        </div>

        {/* Main Hero Content - Fully responsive font sizing and spacing */}
        <div className="z-10 flex flex-col items-center gap-6 sm:gap-8 px-4 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[96px] font-[family-name:var(--font-darker-grotesque)] font-[600] tracking-tight text-center leading-tight">
            The future is here
          </h1>
          
          {/* Custom Segmented Loader - Fluid sizing for all screens */}
          <div className="flex gap-[2px] sm:gap-0 w-full max-w-[280px] sm:max-w-none justify-center">
            {[...Array(10)].map((_, i) => {
              let shapeClass = "[clip-path:polygon(0_0,calc(100%-6px)_0,100%_100%,6px_100%)] sm:[clip-path:polygon(0_0,calc(100%-10px)_0,100%_100%,10px_100%)]";
              
              if (i === 0) {
                shapeClass = "[clip-path:polygon(0_0,calc(100%-6px)_0,100%_100%,0_100%)] sm:[clip-path:polygon(0_0,calc(100%-10px)_0,100%_100%,0_100%)]";
              } else if (i === 9) {
                shapeClass = "[clip-path:polygon(0_0,100%_0,100%_100%,6px_100%)] sm:[clip-path:polygon(0_0,100%_0,100%_100%,10px_100%)]";
              }

              return (
                <div 
                  key={i} 
                  className={`h-[8px] sm:h-[10px] w-full sm:w-[30px] md:w-[35px] lg:w-[45px] bg-[#2B3F37] ${shapeClass}`}
                  style={{ 
                    animation: `sequential-load 0.3s ease-out forwards ${i * 0.85}s` 
                  }} 
                />
              );
            })}
          </div>
        </div>
        
      </main>
    );
  }

  // --------------------------------------------------------
  // VIEW 2: THE MAIN DASHBOARD (Optimized for all devices)
  // --------------------------------------------------------
  return (
    // min-h-screen for mobile scrolling, lg:h-screen for a locked desktop view
    <main className="relative w-full min-h-[100dvh] lg:h-[100dvh] bg-[#142621] text-white flex flex-col font-sans animate-in fade-in duration-700 lg:overflow-hidden overflow-y-auto overflow-x-hidden">
      
      {/* Deep Green Header - Responsive padding and logo logic */}
      <header className="w-full bg-[#18362F] z-50 shrink-0 shadow-md">
        <div className="flex justify-between items-center py-3 sm:py-4 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Image src={logo} alt="Future Logo" width={16} height={20} className="object-contain w-[14px] sm:w-[16px]" />
            {/* Hide "Future" text on very small screens to save space, show on sm and up */}
            <span className="hidden sm:block text-[20px] md:text-[24px] font-[600] font-[family-name:var(--font-darker-grotesque)] tracking-tight">Future</span>
          </div>
          
          <button className="bg-white text-black px-4 py-2 sm:px-5 md:px-6 md:py-2.5 rounded-full text-[11px] sm:text-xs md:text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
            Choose your path
            <span className="text-sm md:text-lg leading-none">↓</span>
          </button>
        </div>
      </header>

      {/* Flexible Hero Section */}
      <div className="relative flex-1 w-full overflow-hidden min-h-[40vh] sm:min-h-[50vh] flex flex-col justify-center">
        
        {/* 1. BACKGROUND TEXT (Solid green fill, NO stroke) */}
        {/* We use highly responsive clamp values to ensure text scales perfectly from 320px screens to 4k */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none pb-12 md:pb-0">
          <h1 
            className="font-geist  text-[#23423A] select-none" 
            style={{
              fontSize: 'clamp(60px, 18vw, 270px)', 
              fontWeight: 700,
              fontStyle: 'normal',
              lineHeight: 'clamp(40px, 10vw, 112.072px)',
              letterSpacing: '-8.1px',
              ['leadingTrim' as any]: 'both',
              ['textEdge' as any]: 'cap',
            }}
          >
            FUTURE
          </h1>
        </div>

        {/* 2. FOREGROUND BOY IMAGE */}
        {/* aspect-[16/9] combined with object-contain ensures the box maintains its shape on all devices while the image fits perfectly inside */}
        <div className="absolute inset-0 mx-auto w-full max-w-[1007px] z-10 pointer-events-none translate-y-[40px] sm:translate-y-[60px] lg:translate-y-[50px] transition-transform duration-300 px-4 sm:px-0 flex items-center justify-center">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-full">
            <Image 
              src={HeroBoy} 
              alt="Future Vision" 
              fill 
              className="object-contain lg:object-bottom object-center"
              priority
            />
          </div>
        </div>

        {/* 3. MASKED FOREGROUND TEXT (Double Masking Technique) */}
        
        {/* OUTER MASK: Image Mask (Strictly clips the white stroke to the silhouette of the boy) */}
        <div 
          className="absolute inset-0 mx-auto w-full max-w-[1007px] z-30 pointer-events-none translate-y-[40px] sm:translate-y-[60px] lg:translate-y-[50px] transition-transform duration-300 px-4 sm:px-0 flex items-center justify-center"
          style={{
            WebkitMaskImage: `url(${typeof HeroBoy === 'string' ? HeroBoy : (HeroBoy as any).src})`,
            maskImage: `url(${typeof HeroBoy === 'string' ? HeroBoy : (HeroBoy as any).src})`,
            ['maskType' as any]: 'alpha',
            ['WebkitMaskType' as any]: 'alpha',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            // On mobile we center the mask because the image is centered, on desktop we pin to bottom
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          }}
        >
          {/* INNER MASK: Radial Gradient (Fades the pure white stroke from the center outward) */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              // Responsive radial gradient. Tighter fade on mobile, wider on desktop
              WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 55%)',
              maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 55%)',
            }}
          >
            {/* TEXT CONTAINER: Reversed translation aligns perfectly with the background green text */}
            {/* Must mirror the exact pixel shift of the parent container to keep the text aligned */}
            <div className="absolute inset-0 flex items-center justify-center pb-12 md:pb-0 -translate-y-[40px] sm:-translate-y-[60px] lg:-translate-y-[50px] transition-transform duration-300">
              <h1 
                className="font-geist text-transparent select-none"
                style={{
                  fontSize: 'clamp(60px, 18vw, 270px)', 
                  fontWeight: 700,
                  fontStyle: 'normal',
                  lineHeight: 'clamp(40px, 10vw, 112.072px)',
                  letterSpacing: '-8.1px',
                  // Slightly thinner stroke on mobile so it doesn't look clumped
                  WebkitTextStrokeWidth: 'clamp(1px, 0.3vw, 4px)',
                  WebkitTextStrokeColor: '#FFFFFF',
                  ['leadingTrim' as any]: 'both',
                  ['textEdge' as any]: 'cap',
                }}
              >
                FUTURE
              </h1>
            </div>
          </div>
        </div>

        {/* Full-width Bottom Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-[45%] md:h-[40%] bg-gradient-to-t from-[#142621] via-[#142621]/90 to-transparent z-40 pointer-events-none" />
      </div>

      {/* Selection Cards Section - Completely responsive grid */}
      <div className="relative w-full px-4 sm:px-6 lg:px-12 pb-6 md:pb-10 shrink-0 z-50 mt-[-2rem] md:mt-0">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          
          <button className="group relative h-[120px] sm:h-[160px] md:h-[180px] xl:h-[220px] w-full rounded-2xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 shadow-xl">
            <Image src={Investors} alt="Investor" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-[family-name:var(--font-darker-grotesque)] font-[600] tracking-wider text-white">
                INVESTOR
              </h2>
            </div>
          </button>

          <button className="group relative h-[120px] sm:h-[160px] md:h-[180px] xl:h-[220px] w-full rounded-2xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 shadow-xl">
            <Image src={Founders} alt="Founders" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-[family-name:var(--font-darker-grotesque)] font-[600] tracking-wider text-white">
                FOUNDERS
              </h2>
            </div>
          </button>

          {/* Third card spans full width on tablet (sm to lg) for better grid balance */}
          <button className="group relative h-[120px] sm:h-[160px] md:h-[180px] xl:h-[220px] w-full rounded-2xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 shadow-xl sm:col-span-2 lg:col-span-1">
            <Image src={Builders} alt="Builders" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-[family-name:var(--font-darker-grotesque)] font-[600] tracking-wider text-white">
                BUILDERS
              </h2>
            </div>
          </button>

        </div>
      </div>

    </main>
  );
}