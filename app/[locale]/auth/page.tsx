'use client';
import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import { useTranslations } from 'next-intl';
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Set initial login state based on URL mode
  useEffect(() => {
    if (mode === 'signup') {
      setIsLogin(false);
    }
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Đăng nhập
        const result = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (result?.error) {
          setError(t('loginError'));
          return;
        }

        router.push('/dashboard');
      } else {
        // Đăng ký
        if (formData.password !== formData.confirmPassword) {
          setError(t('passwordMismatch'));
          return;
        }

        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message);
        }

        // Tự động đăng nhập sau khi đăng ký
        await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        router.push('/dashboard');
      }
    } catch (err) {
      setError(err.message || t('generalError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl font-bold">
            {isLogin ? t('welcomeBack') : t('createAccount')}
          </h1>
          <p className="text-default-500">
            {isLogin ? t('loginSubtitle') : t('registerSubtitle')}
          </p>
        </CardHeader>

        <CardBody className="flex flex-col gap-4">
          {/* Social Login */}
          <Button
            startContent={<FcGoogle className="text-xl" />}
            variant="bordered"
            onPress={() => signIn('google')}
            size="lg"
            className="w-full"
          >
            {t('continueWithGoogle')}
          </Button>

          <div className="flex items-center gap-2">
            <Divider className="flex-1" />
            <span className="text-default-500 text-sm">{t('or')}</span>
            <Divider className="flex-1" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              type="password"
              label={t('password')}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            {!isLogin && (
              <Input
                type="password"
                label={t('confirmPassword')}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            )}

            {error && (
              <p className="text-danger text-sm">{error}</p>
            )}

            <Button
              color="primary"
              type="submit"
              isLoading={loading}
              size="lg"
              className="w-full"
            >
              {isLogin ? t('signIn') : t('signUp')}
            </Button>
          </form>

          <p className="text-center text-sm">
            {isLogin ? t('noAccount') : t('haveAccount')}{' '}
            <Button
              onPress={() => setIsLogin(!isLogin)}
              variant="light"
              className="text-primary font-medium px-1"
            >
              {isLogin ? t('signUp') : t('signIn')}
            </Button>
          </p>
        </CardBody>
      </Card>
    </div>
  );
} 