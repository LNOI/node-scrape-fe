'use client';
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { useTranslations } from 'next-intl';
import { FaCheck } from "react-icons/fa";
import { Chip } from "@nextui-org/chip";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import clsx from "clsx";

export default function RegisterPage() {
  const t = useTranslations();

  const plans = [
    {
      name: "Trial",
      price: "Miễn phí",
      duration: "1 ngày",
      description: "Trải nghiệm đầy đủ tính năng Pro",
      features: [
        "Thu thập dữ liệu không giới hạn",
        "Tự động đăng bài lên đa nền tảng",
        "Phân tích dữ liệu chuyên sâu",
        "Tìm kiếm khách hàng tiềm năng",
        "Tự động trả lời tin nhắn",
        "Báo cáo chi tiết",
      ],
      button: "Dùng thử ngay",
      popular: false,
    },
    {
      name: "Pro",
      price: "499.000",
      originalPrice: "1.000.000",
      duration: "tháng",
      description: "Giải pháp toàn diện cho doanh nghiệp",
      features: [
        "Tất cả tính năng của gói Trial",
        "API tích hợp",
        "Quản lý nhiều tài khoản",
        "Tùy chỉnh bot AI thông minh",
        "Phân tích cảm xúc khách hàng",
        "Dự đoán xu hướng thị trường",
        "Hỗ trợ 24/7",
        "Đào tạo sử dụng",
      ],
      button: "Nâng cấp Pro",
      popular: true,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Chọn gói phù hợp với bạn</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">
          Bắt đầu miễn phí, nâng cấp khi bạn cần
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={clsx(
              "border-2",
              plan.popular
                ? "border-primary"
                : "border-transparent"
            )}
          >
            <CardHeader className="flex flex-col gap-2 p-6">
              {plan.popular && (
                <Chip
                  color="primary"
                  variant="flat"
                  className="absolute top-3 right-3"
                >
                  Phổ biến nhất
                </Chip>
              )}
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">
                  {plan.price}
                </span>
                <span className="text-small text-default-500">
                  VND/{plan.duration}
                </span>
              </div>
              {plan.originalPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-default-500 line-through">
                    {plan.originalPrice} VND
                  </span>
                  <Chip color="danger" size="sm">-50%</Chip>
                </div>
              )}
              <p className="text-default-500">{plan.description}</p>
            </CardHeader>
            <CardBody className="px-6">
              <ul className="space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <FaCheck className="text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
            <CardFooter className="px-6 pb-6">
              <Button
                color={plan.popular ? "primary" : "default"}
                variant={plan.popular ? "shadow" : "bordered"}
                size="lg"
                radius="lg"
                className="w-full"
              >
                {plan.button}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-20 max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-center mb-8">Câu hỏi thường gặp</h2>
        <div className="space-y-4">
          <Accordion>
            <AccordionItem title="Tôi có thể hủy đăng ký bất cứ lúc nào không?">
              Có, bạn có thể hủy đăng ký bất cứ lúc nào. Chúng tôi sẽ hoàn tiền theo tỷ lệ thời gian còn lại.
            </AccordionItem>
            <AccordionItem title="Tôi có thể chuyển đổi giữa các gói không?">
              Có, bạn có thể nâng cấp hoặc hạ cấp gói của mình bất cứ lúc nào.
            </AccordionItem>
            <AccordionItem title="Có giới hạn số lượng tài khoản không?">
              Gói Pro cho phép bạn quản lý không giới hạn số lượng tài khoản mạng xã hội.
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
} 