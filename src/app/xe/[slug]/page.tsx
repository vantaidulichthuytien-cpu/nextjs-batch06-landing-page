import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, Phone, Check, ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { vehicles, getVehicle } from "@/lib/vehicles";
import { SITE_URL, SITE_PHONE, SITE_PHONE_DISPLAY } from "@/lib/site";

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) return {};

  const title = `Cho Thuê ${vehicle.name} - Giá Từ ${vehicle.price}`;

  return {
    title,
    description: vehicle.metaDescription,
    alternates: {
      canonical: `/xe/${vehicle.slug}`,
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/xe/${vehicle.slug}`,
      title,
      description: vehicle.metaDescription,
      images: [{ url: vehicle.image, alt: vehicle.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: vehicle.metaDescription,
      images: [vehicle.image],
    },
  };
}

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);

  if (!vehicle) {
    notFound();
  }

  const otherVehicles = vehicles.filter((v) => v.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vehicle.name,
    description: vehicle.metaDescription,
    image: `${SITE_URL}${vehicle.image}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "VND",
      price: vehicle.price.replace(/\D/g, ""),
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/xe/${vehicle.slug}`,
    },
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
          <div className="relative h-[45vh] min-h-[340px] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-auto max-w-3xl px-6 pb-10 lg:px-8">
                <Link
                  href="/#dich-vu"
                  className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white"
                >
                  <ArrowLeft className="size-4" />
                  Tất cả loại xe
                </Link>
                <p className="flex items-center gap-1.5 text-sm font-semibold text-blue-300">
                  <Users className="size-4" />
                  {vehicle.seats} · {vehicle.tagline}
                </p>
                <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                  {vehicle.name}
                </h1>
                <p className="mt-2 text-lg font-semibold text-white">
                  Từ {vehicle.price}
                </p>
              </div>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900">Giới thiệu</h2>
            <div className="mt-4 space-y-4">
              {vehicle.description.map((p, i) => (
                <p key={i} className="leading-relaxed text-slate-600">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Tiện nghi nổi bật</h2>
              <ul className="mt-4 space-y-3">
                {vehicle.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-600">
                    <Check className="mt-0.5 size-4 shrink-0 text-blue-600" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Phù hợp cho</h2>
              <ul className="mt-4 space-y-3">
                {vehicle.idealFor.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-600">
                    <Check className="mt-0.5 size-4 shrink-0 text-blue-600" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl bg-blue-600 p-8 text-center sm:p-10">
            <h2 className="text-2xl font-bold text-white">
              Đặt {vehicle.name} ngay hôm nay
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-blue-100">
              Xe đời mới, tài xế chuyên nghiệp, giá minh bạch từ {vehicle.price}.
              Liên hệ để nhận báo giá miễn phí trong 5 phút.
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
                Nhận báo giá
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </article>

        <section className="border-t border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-xl font-bold text-slate-900">Loại xe khác</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {otherVehicles.map((v) => (
                <Link
                  key={v.slug}
                  href={`/xe/${v.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="relative h-40 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={v.image}
                      alt={v.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                      <Users className="size-3.5" />
                      {v.seats}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900">{v.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-blue-600">
                      Từ {v.price}
                    </p>
                  </div>
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
