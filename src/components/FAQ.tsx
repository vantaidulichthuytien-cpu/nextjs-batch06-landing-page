"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal";

const faqs = [
  {
    question: "Thủ tục thuê xe cần những gì?",
    answer:
      "Bạn chỉ cần cung cấp thông tin lộ trình, số lượng khách và thời gian thuê. Chúng tôi sẽ báo giá và ký hợp đồng thuê xe đơn giản, nhanh gọn.",
  },
  {
    question: "Có nhận thuê xe gấp trong ngày không?",
    answer:
      "Có. Chúng tôi có đội xe sẵn sàng phục vụ 24/7, kể cả các yêu cầu thuê xe gấp trong ngày tùy theo tình trạng xe trống.",
  },
  {
    question: "Giá thuê đã bao gồm những gì?",
    answer:
      "Giá đã bao gồm xăng dầu, phí cầu đường, lương tài xế và bảo hiểm hành khách. Không phát sinh chi phí ẩn.",
  },
  {
    question: "Có phụ thu khi đi ngoài tỉnh không?",
    answer:
      "Với các chuyến đi liên tỉnh hoặc lộ trình đặc biệt, chi phí sẽ được tính toán và báo trước rõ ràng trong báo giá, không phát sinh thêm.",
  },
  {
    question: "Cần đặt cọc bao nhiêu khi thuê xe?",
    answer:
      "Mức đặt cọc thường từ 20-30% giá trị hợp đồng tùy loại xe và thời gian thuê, phần còn lại thanh toán khi kết thúc chuyến đi.",
  },
  {
    question: "Xe có được bảo hiểm đầy đủ không?",
    answer:
      "Tất cả xe trong hệ thống đều có bảo hiểm trách nhiệm dân sự và bảo hiểm hành khách theo quy định, đảm bảo an toàn tối đa cho bạn.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
            Hỏi đáp
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Câu hỏi thường gặp
          </h2>
        </Reveal>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-medium text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-teal-400 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="animate__animated animate__fadeIn animate__faster px-6 pb-5 text-sm text-zinc-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
