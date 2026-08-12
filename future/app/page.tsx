import { logo, ripple } from "@/public";
import Image from "next/image";

export default function Home() {
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
          src={ripple} // Update extension if you export as .svg
          alt="Ripple background pattern"
          fill
          className=" opacity-90"
          priority
        />
      </div>

      {/* Top Header / Logo */}
      <div className="absolute top-10 z-10 flex items-center gap-1">
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
        <h1 className="text-5xl md:text-6xl lg:text-[96px] font-[family-name:var(--font-darker-grotesque)] font-[600] tracking-tight">
          The future is here
        </h1>
        
        {/* Custom Segmented Loader with Straight Ends (Left Slant) */}
        <div className="flex ">
          {[...Array(10)].map((_, i) => {
            // Default shape for middle segments (slanted left: \ \ \ \)
            let shapeClass = "[clip-path:polygon(0_0,calc(100%-10px)_0,100%_100%,10px_100%)]";
            
            // First segment: straight left wall, slanted right wall (| \)
            if (i === 0) {
              shapeClass = "[clip-path:polygon(0_0,calc(100%-10px)_0,100%_100%,0_100%)]";
            } 
            // Last segment: slanted left wall, straight right wall (\ |)
            else if (i === 9) {
              shapeClass = "[clip-path:polygon(0_0,100%_0,100%_100%,10px_100%)]";
            }

            return (
              <div 
                key={i} 
                className={`h-[10px] w-[45px] bg-[#2B3F37] ${shapeClass}`}
                style={{ 
                  /* 'forwards' freezes the background color at #FFE3C3 when it finishes */
                  animation: `sequential-load 0.3s ease-out forwards ${i * 0.45}s` 
                }} 
              />
            );
          })}
        </div>
      </div>
      
    </main>
  );
}