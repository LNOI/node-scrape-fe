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
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import InformationUser  from "@/components/InformationUser";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import LanguageSwitcher from '@/components/LanguageSwitcher';

const tabs = [
  {
    id: "nav_auto_post",
    label: "Auto Post",
    href: "/dashboard/auto_post",
  },
  {
    id: "nav_history_scrape",
    label: "History scrape",
    href: "/dashboard/scrape",
  }

];
export const Navbar = () => {
  
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">3SCRAPE</p>
          </NextLink>
        </NavbarBrand>

      </NavbarContent>

      <NavbarContent className="basis-2/5 sm:basis-full" justify="start">
        {tabs.map((tab) => ( 
          <NavbarItem key={tab.id}>
            <Link
              href={tab.href}
              color="foreground"
              size="lg"
              className={clsx(
                "px-4 py-2",
                linkStyles,
                "hover:bg-default-100",
                "rounded-md",
                "transition-colors",
                "duration-200",
                "ease-in-out",
                "text-sm",
                "font-semibold",
                "cursor-pointer",
              )}
            >
              {tab.label}
            </Link>
          </NavbarItem>
        ))}

      </NavbarContent>  

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex gap-2">

          <ThemeSwitch />
          <LanguageSwitcher />
        </NavbarItem>
        {/* <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Pricing
          </Button>
        </NavbarItem> */}
        <NavbarItem className="hidden md:flex">
            <InformationUser></InformationUser>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <LanguageSwitcher />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
