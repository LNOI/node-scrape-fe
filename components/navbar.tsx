"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useSession } from "next-auth/react";
import InformationUser from "@/components/InformationUser";
import { signIn } from "next-auth/react";
import { useTranslations } from 'next-intl';

const navigationItems = [
  {
    label: "Trang chủ",
    href: "/",
  },
  {
    label: "Bảng điều khiển",
    href: "/dashboard",
  },
  {
    label: "Hướng dẫn sử dụng",
    href: "/account",
  },
  {
    label: "Đăng ký",
    href: "/subscription",
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const { data: session, status } = useSession();
  const t = useTranslations('auth');
  const router = useRouter();

  const handleSignIn = () => {
    router.push(`/${currentLocale}/auth`);
  };

  const handleSignUp = () => {
    router.push(`/${currentLocale}/auth?mode=signup`);
  };

  return (
    <NextUINavbar 
      maxWidth="xl" 
      position="sticky"
      className="bg-background/70 dark:bg-background/70 backdrop-blur-md border-b border-default-200/50"
    >
      {/* Logo */}
      <NavbarContent className="basis-1/6" justify="start">
        <NavbarBrand as="li" className="gap-2 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href={`/${currentLocale}`}>
            <Logo className="w-7 h-7" />
            <p className="font-bold text-inherit text-lg">SOCIAL LISTENING</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Navigation Links - Center */}
      <NavbarContent className="hidden sm:flex basis-2/3" justify="center">
        <nav className="flex gap-2">
          {navigationItems.map((item) => {
            if (session && item.href === '/register') return null;
            const isActive = pathname === `/${currentLocale}${item.href}`;
            return (
              <NavbarItem key={item.href}>
                <Link
                  href={`/${currentLocale}${item.href}`}
                  className={clsx(
                    "relative px-3 py-1.5 text-sm transition-all duration-300 ease-in-out",
                    "hover:text-primary",
                    "data-[active=true]:text-primary",
                    "group",
                    {
                      'text-primary font-medium': isActive,
                    }
                  )}
                  data-active={isActive}
                >
                  {item.label}
                  <span className={clsx(
                    "absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 transition-transform duration-300",
                    "group-hover:scale-x-100",
                    {
                      'scale-x-100': isActive,
                    }
                  )} />
                </Link>
              </NavbarItem>
            );
          })}
        </nav>
      </NavbarContent>

      {/* Right Side Items */}
      <NavbarContent className="hidden sm:flex basis-1/6" justify="end">
        <NavbarItem className="flex gap-1">
          <ThemeSwitch />
          <LanguageSwitcher />
          {session ? (
            <InformationUser />
          ) : (
            <div className="flex gap-2">
              <Button
                color="primary"
                variant="flat"
                size="sm"
                onPress={handleSignUp}
              >
                {t('signUp')}
              </Button>
              <Button
                variant="bordered"
                size="sm"
                onPress={handleSignIn}
              >
                {t('signIn')}
              </Button>
            </div>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarContent className="sm:hidden" justify="end">
        <ThemeSwitch />
        <LanguageSwitcher />
        {session ? (
          <InformationUser />
        ) : (
          <Button
            variant="bordered"
            size="sm"
            onPress={handleSignIn}
          >
            {t('signIn')}
          </Button>
        )}
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Menu Items */}
      <NavbarMenu className="pt-6 bg-background/80 backdrop-blur-md">
        {navigationItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link
              href={`/${currentLocale}${item.href}`}
              className={clsx(
                "w-full text-base py-2",
                "hover:text-primary",
                {
                  'text-primary font-medium': pathname === `/${currentLocale}${item.href}`,
                }
              )}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        {!session && (
          <NavbarMenuItem>
            <Button
              color="primary"
              variant="flat"
              className="w-full"
              onPress={handleSignIn}
            >
              {t('signIn')}
            </Button>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </NextUINavbar>
  );
};
