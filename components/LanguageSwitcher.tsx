'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Select, SelectItem } from "@nextui-org/select";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { label: 'Tiếng Việt', value: 'vi' },
    { label: 'English', value: 'en' },
  ];

  const handleChange = (value: string) => {
    const newPath = pathname.replace(/^\/[a-z]{2}/, '');
    const path = `/${value}${newPath}`;
    router.push(path);
  };

  return (
    <Select 
      defaultSelectedKeys={[locale]}
      onChange={(e) => handleChange(e.target.value)}
      className="w-32"
    >
      {languages.map((lang) => (
        <SelectItem key={lang.value} value={lang.value}>
          {lang.label}
        </SelectItem>
      ))}
    </Select>
  );
} 