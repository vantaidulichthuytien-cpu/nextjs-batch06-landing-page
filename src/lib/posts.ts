export interface PostSection {
  heading: string;
  paragraphs: string[];
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  coverImage: string;
  category: string;
  publishedAt: string;
  readTime: string;
  sections: PostSection[];
}

export const posts: Post[] = [
  {
    slug: "kinh-nghiem-thue-xe-du-lich-cho-gia-dinh",
    title: "Kinh nghiệm thuê xe du lịch cho gia đình đông người",
    excerpt:
      "Chọn xe bao nhiêu chỗ, lưu ý gì về giá và hợp đồng khi thuê xe đưa cả gia đình đi du lịch dài ngày.",
    metaDescription:
      "Kinh nghiệm thuê xe du lịch cho gia đình đông người: cách chọn số chỗ ngồi phù hợp, lưu ý về giá, hợp đồng và tài xế. Nhà Xe Thủy Tiên chia sẻ chi tiết.",
    coverImage:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80",
    category: "Kinh nghiệm",
    publishedAt: "2026-06-12",
    readTime: "5 phút đọc",
    sections: [
      {
        heading: "Xác định số lượng thành viên trước khi chọn xe",
        paragraphs: [
          "Với nhóm gia đình dưới 7 người, xe 4 - 7 chỗ là lựa chọn tiết kiệm và linh hoạt nhất, dễ di chuyển trong phố lẫn đường đèo. Nếu đi cùng ông bà, con nhỏ và cần thêm chỗ để hành lý, nhóm 8 - 16 người nên cân nhắc xe 16 chỗ để có không gian thoải mái hơn.",
          "Luôn cộng thêm khoảng trống cho hành lý, đồ chơi trẻ em hoặc đồ cồng kềnh khi tính số chỗ ngồi thực tế cần thuê, tránh tình trạng xe chật chội trong suốt hành trình dài.",
        ],
      },
      {
        heading: "Hỏi rõ về giá và các khoản phụ phí",
        paragraphs: [
          "Giá thuê xe thường được tính theo ngày hoặc theo km, một số đơn vị có thể phát sinh phụ phí cầu đường, phí qua đêm hoặc phí chờ. Nên yêu cầu báo giá trọn gói rõ ràng trước khi đặt để tránh phát sinh ngoài ý muốn.",
          "Tại Nhà Xe Thủy Tiên, mọi báo giá đều minh bạch ngay từ đầu, không phụ phí ẩn, giúp khách hàng dễ dàng lên kế hoạch chi tiêu cho chuyến đi.",
        ],
      },
      {
        heading: "Kiểm tra tài xế và tình trạng xe",
        paragraphs: [
          "Với các chuyến đi xa, nên chọn đơn vị có tài xế nhiều kinh nghiệm, thông thạo cung đường và có xe đời mới, được bảo dưỡng định kỳ để đảm bảo an toàn cho cả gia đình trong suốt hành trình.",
        ],
      },
    ],
  },
  {
    slug: "5-luu-y-khi-thue-xe-16-cho-di-tour",
    title: "5 lưu ý khi thuê xe 16 chỗ đi tour nhóm đông",
    excerpt:
      "Những điều cần kiểm tra trước khi ký hợp đồng thuê xe 16 chỗ cho chuyến tour công ty hoặc nhóm bạn.",
    metaDescription:
      "5 lưu ý quan trọng khi thuê xe 16 chỗ đi tour: lịch trình, hợp đồng, tài xế, tiện nghi trên xe và chính sách huỷ chuyến. Tham khảo cùng Nhà Xe Thủy Tiên.",
    coverImage:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80",
    category: "Hướng dẫn",
    publishedAt: "2026-05-28",
    readTime: "4 phút đọc",
    sections: [
      {
        heading: "1. Thống nhất lịch trình chi tiết",
        paragraphs: [
          "Trước khi thuê xe, hãy chốt rõ điểm đón, điểm trả, các điểm dừng chân và thời gian dự kiến cho từng chặng. Lịch trình càng chi tiết, đơn vị cho thuê xe càng dễ sắp xếp tài xế và bố trí xe phù hợp.",
        ],
      },
      {
        heading: "2. Đọc kỹ hợp đồng và chính sách huỷ chuyến",
        paragraphs: [
          "Hợp đồng nên nêu rõ giá thuê, số km giới hạn (nếu có), phụ phí phát sinh và chính sách hoàn/huỷ khi có thay đổi lịch trình đột xuất.",
        ],
      },
      {
        heading: "3. Kiểm tra tiện nghi trên xe",
        paragraphs: [
          "Với các chuyến đi dài, nên ưu tiên xe có điều hòa 2 dàn lạnh, ghế bọc da êm ái và khoang hành lý rộng rãi để cả đoàn thoải mái suốt hành trình.",
        ],
      },
      {
        heading: "4. Xác nhận thông tin tài xế trước ngày khởi hành",
        paragraphs: [
          "Nên có số điện thoại liên hệ trực tiếp với tài xế phụ trách chuyến đi để tiện trao đổi về điểm đón, giờ giấc trong ngày di chuyển.",
        ],
      },
      {
        heading: "5. Đặt xe sớm vào mùa cao điểm",
        paragraphs: [
          "Vào các dịp lễ, Tết hoặc mùa du lịch cao điểm, nên đặt xe trước ít nhất 1-2 tuần để đảm bảo có xe đúng loại và đúng thời gian mong muốn.",
        ],
      },
    ],
  },
  {
    slug: "cam-nang-thue-xe-dua-don-san-bay",
    title: "Cẩm nang thuê xe đưa đón sân bay đúng giờ, không lo trễ chuyến",
    excerpt:
      "Hướng dẫn cách tính thời gian di chuyển, đặt xe trước bao lâu và các lưu ý để chuyến bay không bị trễ.",
    metaDescription:
      "Cẩm nang thuê xe đưa đón sân bay: cách tính thời gian di chuyển, đặt xe trước bao lâu, lưu ý về hành lý. Dịch vụ đưa đón sân bay uy tín từ Nhà Xe Thủy Tiên.",
    coverImage:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
    category: "Cẩm nang",
    publishedAt: "2026-04-15",
    readTime: "4 phút đọc",
    sections: [
      {
        heading: "Đặt xe trước bao lâu là hợp lý?",
        paragraphs: [
          "Với chuyến bay nội địa, nên đặt xe đưa đón trước ít nhất 3-4 giờ so với giờ khởi hành để có thời gian làm thủ tục. Với chuyến bay quốc tế, nên cộng thêm 1-2 giờ dự phòng.",
        ],
      },
      {
        heading: "Tính toán thời gian di chuyển thực tế",
        paragraphs: [
          "Ngoài thời gian di chuyển theo bản đồ, cần cộng thêm thời gian dự phòng cho tình huống kẹt xe giờ cao điểm, đặc biệt vào các khung giờ 7-9h sáng và 17-19h chiều tại khu vực trung tâm.",
        ],
      },
      {
        heading: "Lưu ý về hành lý và số lượng hành khách",
        paragraphs: [
          "Nên báo trước số lượng hành khách và hành lý cồng kềnh (vali lớn, đồ thể thao...) để đơn vị cho thuê xe sắp xếp loại xe có khoang chứa đồ phù hợp.",
        ],
      },
    ],
  },
  {
    slug: "thue-xe-45-cho-cho-doanh-nghiep-can-luu-y-gi",
    title: "Thuê xe 45 chỗ cho sự kiện doanh nghiệp cần lưu ý gì?",
    excerpt:
      "Những yếu tố doanh nghiệp cần cân nhắc khi thuê xe lớn phục vụ hội nghị, team building hoặc sự kiện đông người.",
    metaDescription:
      "Thuê xe 45 chỗ cho sự kiện doanh nghiệp: cách chọn nhà xe uy tín, thương lượng hợp đồng dài hạn và đảm bảo an toàn cho đoàn khách đông người.",
    coverImage:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80",
    category: "Doanh nghiệp",
    publishedAt: "2026-03-20",
    readTime: "5 phút đọc",
    sections: [
      {
        heading: "Ưu tiên nhà xe có kinh nghiệm phục vụ đoàn lớn",
        paragraphs: [
          "Đoàn xe phục vụ hội nghị, sự kiện thường yêu cầu độ chính xác cao về giờ giấc và khả năng điều phối nhiều xe cùng lúc. Nên chọn đơn vị có kinh nghiệm tổ chức các chuyến đi cho đoàn từ 40 người trở lên.",
        ],
      },
      {
        heading: "Thương lượng hợp đồng thuê theo tháng hoặc dài hạn",
        paragraphs: [
          "Nếu doanh nghiệp có nhu cầu thuê xe thường xuyên, hợp đồng thuê theo tháng thường giúp tiết kiệm chi phí hơn so với đặt xe lẻ từng chuyến, đồng thời được ưu tiên bố trí xe vào mùa cao điểm.",
        ],
      },
      {
        heading: "Đảm bảo an toàn cho đoàn khách đông người",
        paragraphs: [
          "Xe cỡ lớn cần được bảo dưỡng định kỳ nghiêm ngặt, tài xế có kinh nghiệm lái xe đường dài. Nên yêu cầu đơn vị cho thuê cung cấp thông tin bảo hiểm và giấy tờ xe đầy đủ trước chuyến đi.",
        ],
      },
    ],
  },
  {
    slug: "uu-dai-thue-xe-mua-le-tet",
    title: "Ưu đãi thuê xe mùa lễ Tết - Đặt sớm để có giá tốt nhất",
    excerpt:
      "Cập nhật chương trình ưu đãi và lưu ý về giá thuê xe trong mùa cao điểm lễ, Tết tại Nhà Xe Thủy Tiên.",
    metaDescription:
      "Cập nhật ưu đãi thuê xe mùa lễ Tết từ Nhà Xe Thủy Tiên: đặt xe sớm để giữ giá tốt, tránh tình trạng hết xe vào cao điểm.",
    coverImage:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&q=80",
    category: "Khuyến mãi",
    publishedAt: "2026-02-01",
    readTime: "3 phút đọc",
    sections: [
      {
        heading: "Vì sao nên đặt xe sớm vào mùa cao điểm?",
        paragraphs: [
          "Vào các dịp lễ lớn và Tết Nguyên Đán, nhu cầu thuê xe tăng cao đột biến khiến giá thuê có thể điều chỉnh và số lượng xe trống giảm nhanh. Đặt xe trước 2-4 tuần giúp khách hàng giữ được mức giá tốt và loại xe mong muốn.",
        ],
      },
      {
        heading: "Chính sách ưu đãi dành cho khách đặt sớm",
        paragraphs: [
          "Nhà Xe Thủy Tiên áp dụng chính sách giữ giá cho khách hàng đặt xe trước lịch trình cao điểm, đồng thời ưu tiên hỗ trợ đổi lịch linh hoạt khi có thay đổi kế hoạch.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
