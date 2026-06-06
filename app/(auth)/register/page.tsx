"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, LockKeyhole, User2, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative h-screen overflow-hidden bg-linear-to-br from-[#352F44] via-[#44444E] to-[#50577A] flex items-center justify-center px-4 py-4">
      
      <div className="w-full max-w-6xl h-full max-h-225 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        <div className="grid h-full lg:grid-cols-2">
          
          {/* LEFT SIDE */}
          <div className="hidden lg:flex relative overflow-hidden bg-linear-to-br from-[#352F44] via-[#44444E] to-[#5C5470]">
            
            <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#B9B4C7]/20 blur-3xl z-10" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#6B728E]/20 blur-3xl z-10" />

            <div className="relative h-full w-full">
              <Image
                src="/NoteVault-register-image.png"
                alt="NoteVault Register"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center bg-[#FAF0E6] p-6 sm:p-10">
            <div className="w-full max-w-md">
              
              <div className="mb-8">
                <h2 className="text-4xl font-black text-[#352F44]">
                  Create Account
                </h2>

                <p className="mt-3 text-[#5C5470]">
                  Welcome to NoteVault — let’s get you started.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Username */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#352F44]">
                    Username
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-[#B9B4C7] bg-white px-4 py-4 transition-all focus-within:border-[#5C5470] focus-within:shadow-lg">
                    <User2 className="h-5 w-5 text-[#6B728E]" />

                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          username: e.target.value,
                        })
                      }
                      className="w-full bg-transparent text-[#352F44] outline-none placeholder:text-[#6B728E]"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#352F44]">
                    Email
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-[#B9B4C7] bg-white px-4 py-4 transition-all focus-within:border-[#5C5470] focus-within:shadow-lg">
                    <Mail className="h-5 w-5 text-[#6B728E]" />

                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className="w-full bg-transparent text-[#352F44] outline-none placeholder:text-[#6B728E]"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#352F44]">
                    Password
                  </label>

                  <div className="flex items-center gap-3 rounded-2xl border border-[#B9B4C7] bg-white px-4 py-4 transition-all focus-within:border-[#5C5470] focus-within:shadow-lg">
                    <LockKeyhole className="h-5 w-5 text-[#6B728E]" />

                    <input
                      type="password"
                      placeholder="Create password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                      className="w-full bg-transparent text-[#352F44] outline-none placeholder:text-[#6B728E]"
                      required
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <p className="rounded-xl border border-red-300 bg-red-100 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                  </p>
                )}

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center rounded-2xl bg-linear-to-r from-[#5C5470] to-[#50577A] px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <LoaderCircle className="h-6 w-6 animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* Footer */}
              <p className="mt-6 text-center text-sm text-[#5C5470]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#352F44] underline underline-offset-4"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}