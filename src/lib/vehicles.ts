export interface Vehicle {
  slug: string;
  name: string;
  seats: string;
  tagline: string;
  image: string;
  price: string;
  metaDescription: string;
  description: string[];
  features: string[];
  idealFor: string[];
}

export const vehicles: Vehicle[] = [
  {
    slug: "xe-4-7-cho",
    name: "Xe 4 - 7 Chỗ",
    seats: "4 - 7 chỗ",
    tagline: "Nhỏ gọn, linh hoạt, tiết kiệm",
    image: "/xe4cho.jpg",
    price: "900.000đ/ngày",
    metaDescription:
      "Cho thuê xe 4 - 7 chỗ đời mới, tài xế chuyên nghiệp, giá từ 900.000đ/ngày. Phù hợp gia đình, cặp đôi, công tác ngắn ngày. Đặt xe ngay cùng Nhà Xe Thủy Tiên.",
    description: [
      "Dòng xe 4 - 7 chỗ là lựa chọn linh hoạt và tiết kiệm nhất trong đội xe, phù hợp cho những chuyến đi gọn nhẹ không cần quá nhiều chỗ ngồi. Xe đời mới, nội thất sạch sẽ, vận hành êm ái trên mọi cung đường.",
      "Với kích thước nhỏ gọn, xe dễ dàng di chuyển trong nội thành lẫn các cung đường đèo dốc, mang lại trải nghiệm thoải mái cho cả gia đình hay nhóm bạn nhỏ.",
    ],
    features: [
      "Điều hòa 2 chiều mát nhanh",
      "Ghế da êm ái, có thể ngả lưng",
      "Khoang hành lý rộng rãi",
      "Xe đời mới, bảo dưỡng định kỳ",
    ],
    idealFor: [
      "Gia đình nhỏ đi du lịch cuối tuần",
      "Cặp đôi đi tuần trăng mật, du lịch riêng tư",
      "Công tác, đón tiễn sân bay",
      "Nhóm bạn thân 4 - 7 người",
    ],
  },
  {
    slug: "xe-16-cho",
    name: "Xe 16 Chỗ",
    seats: "16 chỗ",
    tagline: "Rộng rãi cho nhóm đông",
    image: "/xe16cho.jpg",
    price: "1.800.000đ/ngày",
    metaDescription:
      "Cho thuê xe 16 chỗ đời mới, tài xế chuyên nghiệp, giá từ 1.800.000đ/ngày. Phù hợp nhóm bạn, gia đình đông người đi du lịch. Đặt xe ngay cùng Nhà Xe Thủy Tiên.",
    description: [
      "Xe 16 chỗ là lựa chọn phổ biến cho các nhóm gia đình đông người hoặc nhóm bạn cùng đi du lịch. Không gian rộng rãi, cửa sổ kính lớn giúp hành khách thoải mái ngắm cảnh trên suốt hành trình.",
      "Xe được trang bị đầy đủ tiện nghi, đảm bảo sự thoải mái cho những chuyến đi dài ngày đến các điểm du lịch xa như Đà Lạt, Nha Trang hay Mũi Né.",
    ],
    features: [
      "Điều hòa 2 dàn lạnh mát đều toàn xe",
      "Ghế bọc da, hàng ghế rộng rãi",
      "Cửa sổ kính lớn ngắm cảnh dọc đường",
      "Khoang hành lý chứa được nhiều vali lớn",
    ],
    idealFor: [
      "Nhóm bạn hoặc gia đình đông người đi du lịch",
      "Đưa đón nhân viên công ty hằng ngày",
      "Đoàn khách tham quan ngắn ngày",
      "Di chuyển liên tỉnh, đi tour trong ngày",
    ],
  },
  {
    slug: "xe-29-cho",
    name: "Xe 29 Chỗ",
    seats: "29 chỗ",
    tagline: "Xe khách cao cấp, quy mô vừa",
    image: "/xe29cho.jpg",
    price: "2.800.000đ/ngày",
    metaDescription:
      "Cho thuê xe 29 chỗ đời mới, tài xế chuyên nghiệp, giá từ 2.800.000đ/ngày. Cùng dòng xe khách cao cấp như xe 45 chỗ, phù hợp đoàn công ty, team building. Đặt xe ngay cùng Nhà Xe Thủy Tiên.",
    description: [
      "Xe 29 chỗ thuộc cùng dòng xe khách cao cấp như xe 45 chỗ trong đội xe, chỉ khác biệt về số lượng ghế ngồi. Xe sở hữu thiết kế rộng rãi, ghế bọc da cao cấp và đầy đủ tiện nghi như dòng xe lớn, phù hợp cho các đoàn khách quy mô vừa.",
      "Đây là lựa chọn quen thuộc của các đoàn công ty tổ chức team building, trường học, đoàn thể khi tổ chức các chuyến dã ngoại, tham quan cho số lượng lớn thành viên.",
    ],
    features: [
      "Ghế bọc da cao cấp, ngả thoải mái",
      "Điều hòa 2 dàn lạnh mát đều toàn xe",
      "Hệ thống âm thanh, giải trí hiện đại",
      "Khoang hành lý cỡ lớn",
    ],
    idealFor: [
      "Đoàn công ty tổ chức team building",
      "Học sinh, sinh viên đi dã ngoại",
      "Đoàn khách du lịch theo tour",
      "Đưa đón hội nghị, sự kiện",
    ],
  },
  {
    slug: "xe-45-cho",
    name: "Xe 45 Chỗ",
    seats: "45 chỗ",
    tagline: "Quy mô lớn, chuyên nghiệp",
    image: "/xe45cho.jpg",
    price: "3.800.000đ/ngày",
    metaDescription:
      "Cho thuê xe 45 chỗ đời mới, tài xế chuyên nghiệp, giá từ 3.800.000đ/ngày. Dành cho hội nghị, sự kiện, đoàn khách quy mô lớn. Đặt xe ngay cùng Nhà Xe Thủy Tiên.",
    description: [
      "Xe 45 chỗ là dòng xe cao cấp nhất trong đội xe, phù hợp cho các đoàn khách quy mô lớn như hội nghị, sự kiện doanh nghiệp hoặc các tour du lịch tập thể đông người.",
      "Với thiết kế rộng rãi, ghế ngồi cao cấp và hệ thống tiện nghi đầy đủ, xe mang đến trải nghiệm thoải mái cho hành khách trong suốt hành trình dài.",
    ],
    features: [
      "Ghế bọc da cao cấp, ngả thoải mái",
      "Điều hòa 2 dàn lạnh công suất mạnh",
      "Hệ thống âm thanh, giải trí hiện đại",
      "Khoang hành lý cỡ lớn, sức chứa cao",
    ],
    idealFor: [
      "Hội nghị, sự kiện doanh nghiệp",
      "Đoàn khách du lịch quy mô lớn",
      "Đưa đón học sinh, đoàn thể đông người",
      "Thuê xe theo tháng cho doanh nghiệp",
    ],
  },
];

export function getVehicle(slug: string) {
  return vehicles.find((v) => v.slug === slug);
}
