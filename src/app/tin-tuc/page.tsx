import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import Reveal from "@/components/Reveal";
import { posts } from "@/lib/posts";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const title = "Tin Tức & Cẩm Nang - Nhà Xe Thủy Tiên";
const description =
  "Cẩm nang kinh nghiệm thuê xe du lịch, mẹo di chuyển an toàn và tin khuyến mãi mới nhất từ Nhà Xe Thủy Tiên.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tin-tuc" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tin-tuc`,
    title,
    description,
    images: [{ url: "/logo.png", alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.png"],
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <section className="pt-28 pb-4 sm:pt-36">
          <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Tin tức & Cẩm nang
            </span>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Kinh nghiệm thuê xe & du lịch
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              Cập nhật kinh nghiệm thuê xe, mẹo di chuyển an toàn và ưu đãi mới
              nhất từ {SITE_NAME}.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 80}>
                  <Link
                    href={`/tin-tuc/${post.slug}`}
                    className="group block h-full overflow-hidden rounded-2xl border border-slate-200"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="size-3.5" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="size-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                      <h2 className="mt-3 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                        {post.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </Reveal>
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
