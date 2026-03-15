"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, LoginFormData } from "@/lib/validations/authSchema";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Building2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const DEMO_ACCOUNTS = [
  { email: "superadmin@rentpro.com", label: "Super Admin", color: "purple" },
  { email: "admin@rentpro.com", label: "Admin", color: "blue" },
  { email: "michael@example.com", label: "User", color: "green" },
];

export default function LoginPage() {
  const { login, isAuthenticated, loginLoading } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: yupResolver(loginSchema) });

  useEffect(() => {
    if (isAuthenticated) router.replace("/properties");
  }, [isAuthenticated, router]);

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-bold text-2xl">
            <Building2 className="h-8 w-8" />
            RentPro
          </Link>
          <h1 className="text-xl font-semibold text-gray-900 mt-4">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Demo accounts */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
          <p className="text-xs font-semibold text-amber-700 mb-2">Demo Accounts (any password works):</p>
          <div className="flex flex-wrap gap-2">
            {DEMO_ACCOUNTS.map(({ email, label, color }) => (
              <button
                key={email}
                onClick={() => { setValue("email", email); setValue("password", "Password1"); }}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                  color === "purple" ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                  : color === "blue" ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex justify-end">
              <Link href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</Link>
            </div>
            <Button type="submit" fullWidth size="lg" loading={loginLoading}>
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 font-medium hover:underline">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
