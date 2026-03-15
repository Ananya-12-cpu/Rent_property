"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema, RegisterFormData } from "@/lib/validations/authSchema";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Building2, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const { register: registerUser, isAuthenticated, registerLoading } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: yupResolver(registerSchema) });

  useEffect(() => {
    if (isAuthenticated) router.replace("/properties");
  }, [isAuthenticated, router]);

  const password = watch("password", "");

  const passwordChecks = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One number", met: /[0-9]/.test(password) },
  ];

  const onSubmit = (data: RegisterFormData) => {
    registerUser({ name: data.name, email: data.email, password: data.password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-bold text-2xl">
            <Building2 className="h-8 w-8" />
            RentPro
          </Link>
          <h1 className="text-xl font-semibold text-gray-900 mt-4">Create your account</h1>
          <p className="text-gray-500 text-sm mt-1">Start finding your perfect rental today</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />

            {/* Password strength */}
            {password && (
              <div className="flex flex-col gap-1">
                {passwordChecks.map(({ label, met }) => (
                  <div key={label} className={`flex items-center gap-2 text-xs ${met ? "text-emerald-600" : "text-gray-400"}`}>
                    <CheckCircle className={`h-3.5 w-3.5 ${met ? "text-emerald-500" : "text-gray-300"}`} />
                    {label}
                  </div>
                ))}
              </div>
            )}

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <Button type="submit" fullWidth size="lg" loading={registerLoading}>
              Create Account
            </Button>
          </form>

          <p className="mt-4 text-xs text-center text-gray-400">
            By creating an account, you agree to our{" "}
            <Link href="#" className="text-blue-600 hover:underline">Terms of Service</Link>{" "}
            and{" "}
            <Link href="#" className="text-blue-600 hover:underline">Privacy Policy</Link>.
          </p>

          <div className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
