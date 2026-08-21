import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import MissionSection from "./components/MissionSection";
import DimensionsSection from "./components/DimensionsSection";
import TimelineSection from "./components/TimelineSection";
import StatsSection from "./components/StatsSection";
import NewsInsightsSection from "./components/NewsInsightsSection";
import PartnerWithFutureSection from "./components/PartnerWithFutureSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative w-full bg-[#050E0A] text-white">
      <Header />

      <HeroSection />

      <div
        data-scroll-over
        className="relative z-10 w-full bg-[#050E0A]"
      >
        <MissionSection />
        <DimensionsSection />
        <TimelineSection />
        <StatsSection />
        <NewsInsightsSection />
        <PartnerWithFutureSection />
        <Footer />
      </div>
    </main>
  );
}
