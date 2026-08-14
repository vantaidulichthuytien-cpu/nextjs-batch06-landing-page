import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemStatement from "@/components/ProblemStatement";
import Solution from "@/components/Solution";
import Benefits from "@/components/Benefits";
import Services from "@/components/Services";
import SocialProof from "@/components/SocialProof";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProblemStatement />
        <Solution />
        <Benefits />
        <Services />
        <SocialProof />
        <Pricing />
        <CTA />
        <FAQ />
      </main>
      <Footer />
      <FloatingCallButton />
    </>
  );
}
