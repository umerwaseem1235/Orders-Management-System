'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  ArrowRight,
  BarChart3,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Truck,
  Wallet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DEMO_ACCOUNTS } from '@/lib/demo-accounts';
import { loginAction } from '../actions';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const FEATURES = [
  { icon: Truck, text: 'Order booking, approval and dispatch in one place' },
  { icon: Wallet, text: 'Customer ledgers, payments and receivables' },
  { icon: BarChart3, text: 'Live sales, stock and booker performance reports' },
  { icon: ShieldCheck, text: 'Role-based access with full audit trail' },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = (data: LoginFormValues) => {
    setError(null);
    startTransition(async () => {
      // On success the server action redirects; it only returns on failure.
      const result = await loginAction(data);
      if (result?.error) setError(result.error);
    });
  };

  const fillDemo = (email: string, password: string) => {
    setError(null);
    setValue('email', email, { shouldValidate: true });
    setValue('password', password, { shouldValidate: true });
  };

  const inputClass = (invalid: boolean) =>
    `block w-full rounded-md border ${
      invalid ? 'border-red-500' : 'border-gray-300'
    } bg-white py-2.5 pl-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#14532D] focus:outline-none focus:ring-1 focus:ring-[#14532D]`;

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Brand panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-[#0b3a1f] via-[#14532D] to-[#1b6b3a] p-12 text-white lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-lg font-bold text-[#14532D]">
            AT
          </div>
          <span className="text-2xl font-bold tracking-tight">ALI TRADERS</span>
        </div>

        <div className="max-w-md">
          <h1 className="text-4xl font-bold leading-tight">Sales &amp; Distribution Management</h1>
          <p className="mt-4 text-base text-green-100">
            One secure workspace for the Main Office, Accounts and field Order Bookers.
          </p>
          <ul className="mt-10 space-y-4">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-green-50">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/10">
                  <Icon className="h-4 w-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-green-200">&copy; {new Date().getFullYear()} Ali Traders. All rights reserved.</p>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-16 lg:w-1/2 xl:px-28">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#14532D] font-bold text-white">
              AT
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">ALI TRADERS</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">Sign in to continue to your dashboard.</p>

          {error && (
            <div role="alert" className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  placeholder="name@alitraders.com"
                  className={`${inputClass(!!errors.email)} pr-3`}
                  {...register('email')}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={`${inputClass(!!errors.password)} pr-10`}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="rememberMe" className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 accent-[#14532D]"
                  {...register('rememberMe')}
                />
                Remember me
              </label>
              <span className="text-sm text-gray-500">Forgot password? Contact your administrator.</span>
            </div>

            <Button type="submit" disabled={isPending} className="h-11 w-full">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Demo accounts */}
          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">Demo accounts</h3>
              <span className="text-xs text-gray-500">Click to fill</span>
            </div>
            <ul className="mt-3 space-y-2">
              {DEMO_ACCOUNTS.map((a) => (
                <li key={a.email}>
                  <button
                    type="button"
                    onClick={() => fillDemo(a.email, a.password)}
                    className="w-full rounded-md border border-gray-200 bg-white p-3 text-left transition-colors hover:border-[#14532D] hover:bg-green-50/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{a.roleLabel}</span>
                      <span className="text-xs text-gray-500">{a.description}</span>
                    </div>
                    <div className="mt-1 font-mono text-xs text-gray-600">
                      {a.email} &nbsp;/&nbsp; {a.password}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
