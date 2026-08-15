export interface DestinationSection {
  heading: string;
  paragraphs: string[];
  image?: { src: string; alt: string };
}

export interface Destination {
  slug: string;
  name: string;
  tagline: string;
  metaDescription: string;
  heroImage: string;
  distance: string;
  sections: DestinationSection[];
}

export const destinations: Destination[] = [
  {
    slug: "da-lat",
    name: "Đà Lạt",
    tagline: "Thành phố ngàn hoa",
    metaDescription:
      "Kinh nghiệm du lịch Đà Lạt: điểm tham quan nổi bật, ẩm thực đặc trưng, thời điểm lý tưởng. Thuê xe đi Đà Lạt cùng Nhà Xe Thủy Tiên, tài xế chuyên nghiệp, giá minh bạch.",
    heroImage:
      "https://images.unsplash.com/photo-1764624748576-d8b2c08b9eec?w=1600&q=80",
    distance: "Khoảng 280km từ Đồng Nai, di chuyển 6-7 giờ bằng ô tô",
    sections: [
      {
        heading: "Giới thiệu chung",
        paragraphs: [
          "Đà Lạt nằm trên cao nguyên Lâm Viên ở độ cao hơn 1.500m so với mực nước biển, sở hữu khí hậu mát mẻ quanh năm hiếm có ở Việt Nam. Không khí trong lành, những đồi thông reo và kiến trúc mang hơi hướng Pháp đã biến nơi đây thành điểm đến nghỉ dưỡng được yêu thích bậc nhất cả nước.",
          "Thành phố còn được mệnh danh là \"thành phố ngàn hoa\" bởi khắp các con đường, góc phố đều rực rỡ sắc hoa quanh năm, từ hoa hồng, cẩm tú cầu đến dã quỳ vào mùa cuối năm.",
        ],
      },
      {
        heading: "Điểm tham quan nổi bật",
        paragraphs: [
          "Hồ Xuân Hương nằm giữa trung tâm thành phố là nơi lý tưởng để dạo bộ, đạp xe ngắm cảnh vào sáng sớm. Thung lũng Tình Yêu và Đồi chè Cầu Đất mang đến khung cảnh đồi núi trập trùng xanh mướt, rất thích hợp để chụp ảnh.",
          "Ga Đà Lạt cổ kính với kiến trúc độc đáo, Quảng trường Lâm Viên hiện đại về đêm, hay Thác Datanla hùng vĩ cũng là những cái tên không thể bỏ qua khi ghé thăm thành phố cao nguyên này.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1706159084581-24b647c63b13?w=1200&q=80",
          alt: "Vườn hoa hồng rực rỡ tại Đà Lạt",
        },
      },
      {
        heading: "Ẩm thực đặc trưng",
        paragraphs: [
          "Đến Đà Lạt, du khách không thể bỏ qua bánh tráng nướng - món ăn vặt trứ danh được ví như \"pizza Đà Lạt\", ly sữa đậu nành nóng hổi giữa tiết trời se lạnh, hay nồi lẩu gà lá é đậm đà hương vị núi rừng. Atiso và dâu tây Đà Lạt cũng là những đặc sản được nhiều người tìm mua làm quà.",
        ],
      },
      {
        heading: "Thời điểm lý tưởng để đi",
        paragraphs: [
          "Đà Lạt mát mẻ quanh năm nên có thể ghé thăm bất cứ lúc nào. Tuy nhiên đẹp nhất là khoảng tháng 12 đến tháng 1 khi hoa mai anh đào nở rộ, hoặc tháng 11 mùa hoa dã quỳ vàng rực khắp các triền đồi. Nên tránh mùa mưa từ tháng 7 đến tháng 9 vì thời tiết dễ ẩm ướt, trơn trượt khi di chuyển.",
        ],
      },
    ],
  },
  {
    slug: "tp-ho-chi-minh",
    name: "TP. Hồ Chí Minh",
    tagline: "Trung tâm kinh tế sôi động",
    metaDescription:
      "Khám phá TP. Hồ Chí Minh: Chợ Bến Thành, Nhà thờ Đức Bà, Landmark 81 và ẩm thực Sài Gòn. Đặt xe đưa đón TP.HCM cùng Nhà Xe Thủy Tiên, tài xế chuyên nghiệp.",
    heroImage:
      "https://images.unsplash.com/photo-1774516793393-efedbb98efc8?w=1600&q=80",
    distance: "Khoảng 35km từ Đồng Nai/Biên Hòa, di chuyển khoảng 1 giờ",
    sections: [
      {
        heading: "Giới thiệu chung",
        paragraphs: [
          "TP. Hồ Chí Minh là đô thị lớn nhất Việt Nam, nơi hội tụ nhịp sống hiện đại sôi động xen lẫn những dấu ấn lịch sử, kiến trúc thời Pháp thuộc. Đây vừa là trung tâm kinh tế, vừa là điểm đến quen thuộc cho các chuyến công tác, du lịch ngắn ngày hay đưa đón sân bay.",
        ],
      },
      {
        heading: "Điểm tham quan nổi bật",
        paragraphs: [
          "Chợ Bến Thành với tháp đồng hồ biểu tượng là nơi mua sắm, thưởng thức ẩm thực đường phố quen thuộc của du khách trong và ngoài nước. Nhà thờ Đức Bà, Bưu điện Trung tâm Sài Gòn mang kiến trúc Pháp cổ kính nằm ngay trung tâm quận 1.",
          "Toà nhà Landmark 81 - biểu tượng mới của thành phố - sở hữu đài quan sát nhìn toàn cảnh sông Sài Gòn. Phố đi bộ Nguyễn Huệ, Dinh Độc Lập và Bảo tàng Chứng tích Chiến tranh cũng là những điểm đến giàu giá trị lịch sử, văn hoá.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1680783307371-749c26e0f5c3?w=1200&q=80",
          alt: "Chợ Bến Thành, biểu tượng của TP. Hồ Chí Minh",
        },
      },
      {
        heading: "Ẩm thực Sài Gòn",
        paragraphs: [
          "Ẩm thực Sài Gòn là bức tranh giao thoa văn hoá đa dạng: từ phở, bánh mì, cơm tấm sườn bì chả, hủ tiếu Nam Vang đến ly cà phê vợt đậm đà tại các quán lâu năm trong khu Chợ Lớn.",
        ],
      },
      {
        heading: "Thời điểm lý tưởng để đi",
        paragraphs: [
          "TP. Hồ Chí Minh có thể ghé thăm quanh năm nhờ khí hậu ấm áp ổn định. Nên sắp xếp lịch trình tránh giờ cao điểm (7-9h sáng, 17-19h chiều) để việc di chuyển trong nội thành được thuận tiện hơn.",
        ],
      },
    ],
  },
  {
    slug: "nha-trang",
    name: "Nha Trang",
    tagline: "Thành phố biển xinh đẹp",
    metaDescription:
      "Cẩm nang du lịch Nha Trang: bãi biển, Vinpearl, lặn ngắm san hô và đặc sản hải sản. Thuê xe đi Nha Trang cùng Nhà Xe Thủy Tiên, xe đời mới, an toàn.",
    heroImage:
      "https://images.unsplash.com/photo-1570366290364-5e76a15ae408?w=1600&q=80",
    distance: "Khoảng 450km từ Đồng Nai, di chuyển 8-9 giờ bằng ô tô",
    sections: [
      {
        heading: "Giới thiệu chung",
        paragraphs: [
          "Nha Trang sở hữu một trong những vịnh biển đẹp nhất Việt Nam với bãi cát trắng mịn, nước biển trong xanh quanh năm. Đây là điểm đến lý tưởng cho các hoạt động biển như tắm biển, lặn ngắm san hô hay khám phá các đảo lân cận.",
        ],
      },
      {
        heading: "Điểm tham quan nổi bật",
        paragraphs: [
          "Vinpearl Land trên đảo Hòn Tre với hệ thống cáp treo vượt biển dài nhất Việt Nam là điểm vui chơi giải trí không thể bỏ lỡ. Tháp Bà Ponagar mang kiến trúc Chăm cổ kính toạ lạc trên đồi cao nhìn ra cửa sông Cái.",
          "Đảo Hòn Mun nổi tiếng với các rạn san hô đa dạng, rất thích hợp cho hoạt động lặn biển. Bãi biển Trần Phú chạy dọc trung tâm thành phố, Chợ Đầm và khu suối khoáng nóng Tháp Bà cũng là những trải nghiệm đáng thử.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1687025846297-5b19ae9b1363?w=1200&q=80",
          alt: "Bãi biển Nha Trang nhìn ra vịnh biển xanh",
        },
      },
      {
        heading: "Ẩm thực đặc trưng",
        paragraphs: [
          "Bún cá Nha Trang, nem nướng Ninh Hoà, bánh căn nóng hổi hay các loại hải sản tươi sống đánh bắt trong ngày là những món ăn làm nên thương hiệu ẩm thực của thành phố biển này.",
        ],
      },
      {
        heading: "Thời điểm lý tưởng để đi",
        paragraphs: [
          "Nha Trang đẹp nhất từ tháng 1 đến tháng 8 khi trời nắng ráo, biển lặng, thuận lợi cho các hoạt động tắm biển và lặn ngắm san hô. Mùa mưa bão thường rơi vào tháng 10-12 nên cần lưu ý theo dõi thời tiết trước chuyến đi.",
        ],
      },
    ],
  },
  {
    slug: "mui-ne-phan-thiet",
    name: "Mũi Né - Phan Thiết",
    tagline: "Thiên đường đồi cát",
    metaDescription:
      "Khám phá Mũi Né - Phan Thiết: đồi cát bay, làng chài, lướt ván diều và hải sản tươi ngon. Thuê xe đi Mũi Né cùng Nhà Xe Thủy Tiên, giá minh bạch, tài xế chuyên nghiệp.",
    heroImage:
      "https://images.unsplash.com/photo-1777500822241-9d90e64e77f3?w=1600&q=80",
    distance: "Khoảng 200km từ Đồng Nai, di chuyển khoảng 4 giờ",
    sections: [
      {
        heading: "Giới thiệu chung",
        paragraphs: [
          "Mũi Né - Phan Thiết nổi tiếng với những đồi cát trải dài đầy nắng gió, khác biệt hoàn toàn so với các bãi biển thông thường. Đây cũng là một trong những điểm lướt ván diều (kitesurfing) hàng đầu Đông Nam Á nhờ gió biển ổn định quanh năm.",
        ],
      },
      {
        heading: "Điểm tham quan nổi bật",
        paragraphs: [
          "Đồi cát bay (đồi cát đỏ) và Đồi cát trắng là hai địa danh biểu tượng, đặc biệt đẹp vào lúc bình minh hoặc hoàng hôn khi ánh nắng nhuộm vàng những triền cát. Suối Tiên với dòng suối nhỏ uốn lượn giữa các vách cát đầy màu sắc cũng là điểm check-in được yêu thích.",
          "Làng chài Mũi Né với hàng trăm thuyền thúng đầy màu sắc neo đậu là nét văn hoá đặc trưng của vùng biển này. Tháp Chăm Poshanư và Lầu Ông Hoàng mang đến góc nhìn lịch sử, văn hoá thú vị.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1767827693183-6769bc2e29bf?w=1200&q=80",
          alt: "Làng chài Mũi Né với những thuyền thúng đầy màu sắc",
        },
      },
      {
        heading: "Trải nghiệm nổi bật",
        paragraphs: [
          "Lướt ván diều, trượt cát trên đồi cát bay, hay đơn giản là ngắm bình minh nhuộm vàng những triền cát là những trải nghiệm khiến Mũi Né trở nên đặc biệt so với các điểm đến biển khác.",
        ],
      },
      {
        heading: "Thời điểm lý tưởng để đi",
        paragraphs: [
          "Mùa gió từ tháng 11 đến tháng 4 là thời điểm lý tưởng nhất, đặc biệt phù hợp cho các hoạt động lướt ván diều. Thời tiết khô ráo, ít mưa giúp việc di chuyển và tham quan đồi cát thuận lợi hơn.",
        ],
      },
    ],
  },
  {
    slug: "vung-tau",
    name: "Vũng Tàu",
    tagline: "Biển gần Sài Gòn",
    metaDescription:
      "Kinh nghiệm du lịch Vũng Tàu: Tượng Chúa Kitô Vua, Bạch Dinh, bãi Sau, bãi Trước và đặc sản bánh khọt. Thuê xe đi Vũng Tàu cùng Nhà Xe Thủy Tiên, xe đời mới, an toàn.",
    heroImage:
      "https://images.unsplash.com/photo-1695615090894-b7f6ee2b13b5?w=1600&q=80",
    distance: "Khoảng 90km từ Đồng Nai, di chuyển khoảng 2 giờ",
    sections: [
      {
        heading: "Giới thiệu chung",
        paragraphs: [
          "Nhờ vị trí chỉ cách Đồng Nai và TP. Hồ Chí Minh khoảng 2 giờ di chuyển, Vũng Tàu từ lâu đã là điểm đến biển quen thuộc cho các chuyến đi ngắn ngày, du lịch cuối tuần cùng gia đình, bạn bè.",
        ],
      },
      {
        heading: "Điểm tham quan nổi bật",
        paragraphs: [
          "Tượng Chúa Kitô Vua sừng sững trên đỉnh Núi Nhỏ là điểm đến biểu tượng, từ đây có thể phóng tầm mắt bao quát toàn cảnh thành phố biển. Bạch Dinh mang kiến trúc Pháp cổ kính nằm giữa rừng hoa sứ trăm năm tuổi.",
          "Bãi Sau và Bãi Trước là hai bãi biển chính với hệ thống nhà hàng, khách sạn ven biển sầm uất. Ngọn Hải Đăng Vũng Tàu và khu vực Hòn Bà khi thuỷ triều xuống cũng là những trải nghiệm thú vị cho du khách thích khám phá.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1689289270364-8c94840201b8?w=1200&q=80",
          alt: "Toàn cảnh thành phố biển Vũng Tàu nhìn từ đồi cao",
        },
      },
      {
        heading: "Ẩm thực đặc trưng",
        paragraphs: [
          "Bánh khọt Vũng Tàu giòn rụm ăn kèm rau sống là món ăn không thể bỏ qua. Lẩu cá đuối, các loại ốc và hải sản tươi sống theo mùa cũng góp phần làm nên nét ẩm thực đặc trưng của thành phố biển này.",
        ],
      },
      {
        heading: "Thời điểm lý tưởng để đi",
        paragraphs: [
          "Vũng Tàu có thể ghé thăm quanh năm nhờ khoảng cách gần. Do lượng khách cuối tuần khá đông, nên cân nhắc di chuyển vào các ngày trong tuần để có trải nghiệm thoải mái hơn và tránh kẹt xe khi vào/ra thành phố.",
        ],
      },
    ],
  },
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
