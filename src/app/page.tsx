import { AgeGate } from "@/components/AgeGate";
import { FdaWarning } from "@/components/FdaWarning";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { VelocityTicker } from "@/components/VelocityTicker";
import { DealsSection } from "@/components/DealsSection";
import { CategoryBento } from "@/components/CategoryBento";
import { Reviews } from "@/components/Reviews";
import { StatsBand } from "@/components/StatsBand";
import { VisitSection } from "@/components/VisitSection";
import { EmailClub } from "@/components/EmailClub";
import { Footer } from "@/components/Footer";
import { StickyBar } from "@/components/StickyBar";

export default function Home() {
  return (
    <>
      <AgeGate />
      <FdaWarning />
      <Header />
      <main>
        <Hero />
        <VelocityTicker />
        <DealsSection />
        <CategoryBento />
        <Reviews />
        <StatsBand />
        <VisitSection />
        <EmailClub />
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
