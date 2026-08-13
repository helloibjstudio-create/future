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
            className="opacity-90"
            priority
          />
        </div>

        {/* Top Header / Logo */}
        <div className="absolute top-8 md:top-10 z-10 flex items-center gap-2">
          <Image
            src={logo} 
            alt="Future Logo"
            width={14.742}
            height={18}
            className="object-contain"
          />
          <span className="text-[22px] font-[600] font-[family-name:var(--font-darker-grotesque)] tracking-tight">Future</span>
        </div>

        {/* Main Hero Content */}
        <div className="z-10 flex flex-col items-center gap-8">
          <h1 className="text-5xl md:text-6xl lg:text-[96px] font-[family-name:var(--font-darker-grotesque)] font-[600] tracking-tight text-center">
            The future is here
          </h1>
          
          {/* Custom Segmented Loader with Straight Ends (Left Slant) */}
          <div className="flex">
            {[...Array(10)].map((_, i) => {
              let shapeClass = "[clip-path:polygon(0_0,calc(100%-10px)_0,100%_100%,10px_100%)]";
              
              if (i === 0) {
                shapeClass = "[clip-path:polygon(0_0,calc(100%-10px)_0,100%_100%,0_100%)]";
              } else if (i === 9) {
                shapeClass = "[clip-path:polygon(0_0,100%_0,100%_100%,10px_100%)]";
              }

              return (
                <div 
                  key={i} 
                  className={`h-[10px] w-[35px] md:w-[45px] bg-[#2B3F37] ${shapeClass}`}
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
  // VIEW 2: THE MAIN DASHBOARD (Optimized for 1440x1024 fit)
  // --------------------------------------------------------
  return (
    // md:h-screen and md:overflow-hidden locks the layout to exactly the viewport height on desktop
    <main className="relative w-full min-h-screen md:h-screen bg-[#142621] text-white flex flex-col font-sans animate-in fade-in duration-700 md:overflow-hidden overflow-y-auto">
      
      {/* Deep Green Header - Shrink-0 ensures it maintains exact height */}
      <header className="w-full bg-[#18362F] z-50 shrink-0 shadow-md">
        <div className="flex justify-between items-center py-4 px-6 lg:px-12 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="Future Logo" width={16} height={20} className="object-contain" />
            <span className="text-[22px] md:text-[24px] font-[600] font-[family-name:var(--font-darker-grotesque)] tracking-tight">Future</span>
          </div>
          
          <button className="bg-white text-black px-6 py-2 md:py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
            Choose your path
            <span className="text-lg leading-none">↓</span>
          </button>
        </div>
      </header>

      {/* Flexible Hero Section - Flex-1 dynamically absorbs remaining space */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-end z-10 overflow-hidden pt-4 md:pt-0">
        

        {/* Foreground Boy Image */}
        <div className="relative w-full max-w-[1007px] h-[50vh] md:h-full z-10 mx-auto">
          <Image 
            src={HeroBoy} 
            alt="Future Vision" 
            fill 
            className="object-contain object-bottom"
            priority
          />
        </div>

        {/* Full-width Bottom Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-[50%] md:h-[40%] bg-gradient-to-t from-[#142621] via-[#142621]/90 to-transparent z-20 pointer-events-none" />
      </div>

      {/* Selection Cards Section - Shrink-0 keeps it anchored at the bottom */}
      <div className="relative w-full px-6 lg:px-12 pb-8 md:pb-10 shrink-0 z-40 mt-[-2rem] md:mt-0">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          
          <button className="group relative h-[160px] md:h-[200px] xl:h-[220px] w-full rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform shadow-xl">
            <Image src={Investors} alt="Investor" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-[family-name:var(--font-darker-grotesque)] font-[600] tracking-wider text-white">
                INVESTOR
              </h2>
            </div>
          </button>

          <button className="group relative h-[160px] md:h-[200px] xl:h-[220px] w-full rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform shadow-xl">
            <Image src={Founders} alt="Founders" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-[family-name:var(--font-darker-grotesque)] font-[600] tracking-wider text-white">
                FOUNDERS
              </h2>
            </div>
          </button>

          <button className="group relative h-[160px] md:h-[200px] xl:h-[220px] w-full rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform shadow-xl">
            <Image src={Builders} alt="Builders" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-[family-name:var(--font-darker-grotesque)] font-[600] tracking-wider text-white">
                BUILDERS
              </h2>
            </div>
          </button>

        </div>
      </div>

    </main>
  );
}