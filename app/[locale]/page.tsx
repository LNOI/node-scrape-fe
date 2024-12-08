import { useTranslations } from 'next-intl';
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { Card, CardBody } from "@nextui-org/card";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { BsRobot, BsSearch, BsDatabase } from "react-icons/bs";

export default function Home() {
  const t = useTranslations();

  const features = [
    {
      title: t('features.dataCollection.title'),
      description: t('features.dataCollection.description'),
      icon: <BsDatabase className="w-8 h-8 text-primary" />,
      platforms: [
        { name: "Facebook", icon: <FaFacebook className="w-6 h-6 text-blue-600" /> },
        { name: "Instagram", icon: <FaInstagram className="w-6 h-6 text-pink-600" /> },
        { name: "TikTok", icon: <FaTiktok className="w-6 h-6 text-black" /> },
      ],
    },
    {
      title: t('features.automation.title'),
      description: t('features.automation.description'),
      icon: <BsRobot className="w-8 h-8 text-primary" />,
    },
    {
      title: t('features.customerSearch.title'),
      description: t('features.customerSearch.description'),
      icon: <BsSearch className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
      {/* Hero Section */}
      <div className="inline-block max-w-3xl text-center justify-center">
        <h1 className="text-5xl font-bold tracking-tight">
          {t('hero.title')}
        </h1>
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
          {t('hero.subtitle')}
        </p>
        <div className="flex gap-4 mt-8 justify-center">
          <Link
            href="/dashboard"
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
              size: "lg",
            })}
          >
            {t('hero.tryFree')}
          </Link>
          <Link
            href="#features"
            className={buttonStyles({
              variant: "bordered",
              radius: "full",
              size: "lg",
            })}
          >
            {t('hero.learnMore')}
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="w-full max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">{t('features.title')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6">
              <CardBody>
                <div className="flex flex-col items-center text-center gap-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                  {feature.platforms && (
                    <div className="flex gap-4 mt-4">
                      {feature.platforms.map((platform, pIndex) => (
                        <div key={pIndex} className="flex items-center gap-2">
                          {platform.icon}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full bg-primary/10 py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {t('cta.subtitle')}
          </p>
          <Link
            href="/dashboard"
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
              size: "lg",
            })}
          >
            {t('cta.button')}
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-gray-100 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Thông tin công ty */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.about.title')}</h3>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">{t('footer.about.company')}</p>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                {t('footer.about.address')}
              </p>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                {t('footer.about.contact')}
              </p>
            </div>
          </div>

          {/* Chính sách */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.policies.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/policies/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  {t('footer.policies.terms')}
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  {t('footer.policies.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/policies/refund" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  {t('footer.policies.refund')}
                </Link>
              </li>
              <li>
                <Link href="/policies/service" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  {t('footer.policies.service')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Bảng giá & Hỗ trợ */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.support.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  {t('footer.support.pricing')}
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  {t('footer.support.center')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  {t('footer.support.faq')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  {t('footer.support.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Thanh toán & Kết nối */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.payment.title')}</h3>
            <div className="grid grid-cols-3 gap-4">
              <img src="/payments/visa.png" alt="Visa" className="h-8" />
              <img src="/payments/mastercard.png" alt="Mastercard" className="h-8" />
              <img src="/payments/momo.png" alt="Momo" className="h-8" />
              <img src="/payments/vnpay.png" alt="VNPay" className="h-8" />
              <img src="/payments/banking.png" alt="Banking" className="h-8" />
              <img src="/payments/paypal.png" alt="PayPal" className="h-8" />
            </div>
            
            <h3 className="text-lg font-semibold mt-6">{t('footer.payment.connect')}</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-blue-600 hover:text-blue-700">
                <FaFacebook className="w-6 h-6" />
              </Link>
              <Link href="https://instagram.com" className="text-pink-600 hover:text-pink-700">
                <FaInstagram className="w-6 h-6" />
              </Link>
              <Link href="https://tiktok.com" className="hover:text-gray-700">
                <FaTiktok className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-600 dark:text-gray-400">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </footer>
    </section>
  );
} 