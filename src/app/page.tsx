import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import PromoBanner from "@/components/PromoBanner";
import HowItWorks from "@/components/HowItWorks";
import SocialProof from "@/components/SocialProof";
import ServiceAreas from "@/components/ServiceAreas";
import ProblemStatement from "@/components/ProblemStatement";
import Solution from "@/components/Solution";
import Benefits from "@/components/Benefits";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { faqs } from "@/lib/faq-data";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhyChooseUs />
        <Services />
        <PromoBanner />
        <HowItWorks />
        <SocialProof />
        <ServiceAreas />
        <ProblemStatement />
        <Solution />
        <Benefits />
        <Pricing />
        <CTA />
        <FAQ />
      </main>
      <Footer />
      <FloatingCallButton />
    </>
  );
}
