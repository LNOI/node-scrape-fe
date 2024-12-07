'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { IoLanguage } from "react-icons/io5"; // Import icon từ react-icons

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { label: 'Tiếng Việt', value: 'vi', icon: '🇻🇳' },
    { label: 'English', value: 'en', icon: '🇬🇧' },
  ];

  const handleChange = (value: string) => {
    const newPath = pathname.replace(/^\/[a-z]{2}/, '');
    const path = `/${value}${newPath}`;
    router.push(path);
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          variant="light"
          size="sm"
          isIconOnly
          className="text-default-500 hover:text-primary h-auto"
        >
          <IoLanguage className="w-5 h-5" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selection"
        selectionMode="single"
        selectedKeys={[locale]}
        onSelectionChange={(keys) => {
          const selected = Array.from(keys)[0] as string;
          handleChange(selected);
        }}
      >
        {languages.map((lang) => (
          <DropdownItem key={lang.value} startContent={<span>{lang.icon}</span>}>
            {lang.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
} 