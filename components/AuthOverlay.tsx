"use client";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';

export default function AuthOverlay() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const t = useTranslations('auth');

  const handleSignIn = () => {
    router.push(`/${currentLocale}/auth`);
  };

  const handleSignUp = () => {
    router.push(`/${currentLocale}/auth?mode=signup`);
  };

  return (
    <div className="absolute inset-0 backdrop-blur-sm bg-background/50 z-50 flex flex-col items-center ">
      <div className="bg-content1 p-8 rounded-large shadow-large text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {t('accessDenied')}
        </h2>
        <p className="text-default-500 mb-6">
          {t('loginRequired')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            color="primary"
            variant="flat"
            onPress={handleSignUp}
            size="lg"
          >
            {t('signUp')}
          </Button>
          <Button
            variant="bordered"
            onPress={handleSignIn}
            size="lg"
          >
            {t('signIn')}
          </Button>
        </div>
      </div>
    </div>
  );
} 