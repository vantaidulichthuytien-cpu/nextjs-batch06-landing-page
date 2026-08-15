import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Clock,
  ArrowLeft,
  ArrowRight,
  Phone,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { posts, getPost } from "@/lib/posts";
import { SITE_URL, SITE_NAME, SITE_PHONE, SITE_PHONE_DISPLAY } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: {
      canonical: `/tin-tuc/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/tin-tuc/${post.slug}`,
      title: post.title,
      description: post.metaDescription,
      images: [{ url: post.coverImage, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.coverImage],
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const otherPosts = posts.filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: SITE_NAME },
    url: `${SITE_URL}/tin-tuc/${post.slug}`,
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
          <div className="relative h-[45vh] min-h-[320px] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-auto max-w-3xl px-6 pb-10 lg:px-8">
                <Link
                  href="/tin-tuc"
                  className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white"
                >
                  <ArrowLeft className="size-4" />
                  Tất cả tin tức
                </Link>
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                  {post.category}
                </span>
                <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                  {post.title}
                </h1>
                <div className="mt-3 flex items-center gap-4 text-sm text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-4" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-4" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
          {post.sections.map((section) => (
            <div key={section.heading} className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed text-slate-600">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-2xl bg-blue-600 p-8 text-center sm:p-10">
            <h2 className="text-2xl font-bold text-white">
              Cần tư vấn thuê xe cho chuyến đi của bạn?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-blue-100">
              {SITE_NAME} sẵn sàng hỗ trợ báo giá miễn phí trong 5 phút, đội
              xe đời mới, tài xế chuyên nghiệp.
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
                href="/lien-he"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Liên hệ đặt xe
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </article>

        <section className="border-t border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-xl font-bold text-slate-900">Bài viết khác</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/tin-tuc/${p.slug}`}
                  className="group block overflow-hidden rounded-xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <p className="mt-3 text-sm font-semibold text-slate-900 group-hover:text-blue-600">
                    {p.title}
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
