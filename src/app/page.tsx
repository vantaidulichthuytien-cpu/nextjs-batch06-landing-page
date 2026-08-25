import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemStatement from "@/components/ProblemStatement";
import Solution from "@/components/Solution";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import SocialProof from "@/components/SocialProof";
import HowItWorks from "@/components/HowItWorks";
import ServiceAreas from "@/components/ServiceAreas";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
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
      {/*
        Thứ tự: đau → giải pháp → sản phẩm → cách báo giá → bằng chứng
        → quy trình → tuyến → gỡ thắc mắc → chốt.

        Bản trước đặt ProblemStatement ở vị trí thứ 8 (sau SocialProof và
        ServiceAreas) nên phần thuyết phục mạnh nhất gần như không ai đọc tới,
        và đặt FAQ sau CTA — tức mời khách hành động khi họ còn nguyên thắc mắc.

        Đã bỏ WhyChooseUs, Benefits và PromoBanner: cả ba lặp lại đúng những
        điều Solution và Pricing đã nói (riêng "Hỗ trợ 24/7" xuất hiện 4 lần),
        và PromoBanner còn hiển thị bảng giá thứ hai lệch với bảng giá chính.
      */}
      <main className="flex-1">
        <Hero />
        <ProblemStatement />
        <Solution />
        <Services />
        <Pricing />
        <SocialProof />
        <HowItWorks />
        <ServiceAreas />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <FloatingCallButton />
    </>
  );
}
