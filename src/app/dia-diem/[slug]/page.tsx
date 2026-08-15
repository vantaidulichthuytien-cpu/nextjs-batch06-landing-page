import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { destinations, getDestination } from "@/lib/destinations";
import { SITE_URL, SITE_NAME, SITE_PHONE, SITE_PHONE_DISPLAY } from "@/lib/site";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return {};

  const title = `Du Lịch ${destination.name} - Kinh Nghiệm & Thuê Xe Trọn Gói`;

  return {
    title,
    description: destination.metaDescription,
    alternates: {
      canonical: `/dia-diem/${destination.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/dia-diem/${destination.slug}`,
      title,
      description: destination.metaDescription,
      images: [{ url: destination.heroImage, alt: destination.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: destination.metaDescription,
      images: [destination.heroImage],
    },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestination(slug);

  if (!destination) {
    notFound();
  }

  const otherDestinations = destinations.filter((d) => d.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: destination.name,
    description: destination.metaDescription,
    image: destination.heroImage,
    url: `${SITE_URL}/dia-diem/${destination.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1 bg-white">
        <section className="relative pt-16">
          <div className="relative h-[50vh] min-h-[360px] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={destination.heroImage}
              alt={destination.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-auto max-w-3xl px-6 pb-10 lg:px-8">
                <Link
                  href="/#khu-vuc-phuc-vu"
                  className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white"
                >
                  <ArrowLeft className="size-4" />
                  Tất cả khu vực phục vụ
                </Link>
                <p className="flex items-center gap-1.5 text-sm font-semibold text-blue-300">
                  <MapPin className="size-4" />
                  {destination.tagline}
                </p>
                <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                  Du Lịch {destination.name}
                </h1>
                <p className="mt-2 text-sm text-slate-200">{destination.distance}</p>
              </div>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
          {destination.sections.map((section) => (
            <div key={section.heading} className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed text-slate-600">
                    {p}
                  </p>
                ))}
              </div>
              {section.image && (
                <figure className="mt-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={section.image.src}
                    alt={section.image.alt}
                    className="h-72 w-full rounded-2xl object-cover sm:h-96"
                  />
                  <figcaption className="mt-2 text-center text-xs text-slate-400">
                    {section.image.alt}
                  </figcaption>
                </figure>
              )}
            </div>
          ))}

          <div className="rounded-2xl bg-blue-600 p-8 text-center sm:p-10">
            <h2 className="text-2xl font-bold text-white">
              Đặt xe đi {destination.name} ngay hôm nay
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-blue-100">
              Nhà Xe Thủy Tiên phục vụ tuyến {destination.name} với xe đời mới, tài
              xế chuyên nghiệp, giá minh bạch. Liên hệ để nhận báo giá miễn phí
              trong 5 phút.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={`tel:${SITE_PHONE}`}
                className="flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-transform hover:scale-105"
              >
                <Phone className="size-4" />
                Gọi ngay {SITE_PHONE_DISPLAY}
              </a>
              <Link
                href="/#lien-he"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Xem bảng giá thuê xe
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </article>

        <section className="border-t border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-xl font-bold text-slate-900">Khu vực khác {SITE_NAME} phục vụ</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {otherDestinations.map((d) => (
                <Link
                  key={d.slug}
                  href={`/dia-diem/${d.slug}`}
                  className="group relative overflow-hidden rounded-xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.heroImage}
                    alt={d.name}
                    className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <p className="absolute bottom-2 left-3 text-sm font-semibold text-white">
                    {d.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCallButton />
    </>
  );
}
