"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, UserCircle, LogIn, Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        if (res.error === "CredentialsSignin") {
          setError("Invalid username or password");
          return;
        }
        setError(res.error || "Login failed");
        return;
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl p-10 rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.1)] border border-white/30 dark:border-zinc-800/50 relative z-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-indigo-600 to-violet-500 text-white rounded-2xl mb-4 shadow-lg shadow-indigo-500/30 transform hover:rotate-6 transition-transform duration-300">
          <LogIn className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Welcome Back!</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 font-light">Log in to continue your learning journey.</p>
      </div>

      {registered && (
        <div className="mb-6 p-4 bg-green-50/50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-medium rounded-xl border border-green-100 dark:border-green-800/30 text-center backdrop-blur-sm">
          Registration successful! Please log in.
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50/50 dark:bg-red-900/20 text-red-700 dark:text-red-400 font-medium rounded-xl border border-red-100 dark:border-red-800/30 text-center backdrop-blur-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <input
            type="text"
            required
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full px-4 py-3.5 pt-6 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/50 border border-gray-200/50 dark:border-zinc-700/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all duration-300 peer placeholder-transparent font-medium"
            placeholder="Username"
            id="username"
          />
          <label
            htmlFor="username"
            className="absolute left-4 top-2 text-xs font-medium text-indigo-600 transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600 pointer-events-none flex items-center gap-2"
          >
            <UserCircle className="w-4 h-4" />
            Username
          </label>
        </div>

        <div className="relative group">
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-3.5 pt-6 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/50 border border-gray-200/50 dark:border-zinc-700/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all duration-300 peer placeholder-transparent font-medium"
            placeholder="Password"
            id="password"
          />
          <label
            htmlFor="password"
            className="absolute left-4 top-2 text-xs font-medium text-indigo-600 transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600 pointer-events-none flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Password
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center relative overflow-hidden group ${
            loading ? "bg-gray-400" : "bg-gradient-to-r from-indigo-600 to-violet-500 shadow-indigo-500/25 hover:shadow-indigo-500/40"
          }`}
        >
          {/* Shimmer effect */}
          {!loading && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          )}
          
          {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="mt-10 text-center text-gray-500 dark:text-gray-400 text-sm">
        Don't have an account yet?{" "}
        <Link href="/register" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-500/10 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[30%] right-[20%] w-[20%] h-[20%] rounded-full bg-amber-400/5 blur-[80px] animate-pulse" style={{ animationDelay: '4s' }}></div>

      <Suspense fallback={
        <div className="w-full max-w-md bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl p-20 rounded-[40px] shadow-xl flex flex-col items-center justify-center border border-white/30">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-bold">Loading login...</p>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
