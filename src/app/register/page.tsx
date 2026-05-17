"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { GraduationCap, BookOpen, ShieldCheck, User, Mail, Lock, UserCircle, Loader2, Sparkles, Heart } from "lucide-react";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "TEACHER" ? "TEACHER" : "STUDENT";

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: initialRole,
    passkey: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-slate-950 text-slate-100">
      
      {/* Visual Side */}
      <div className={`hidden md:flex flex-col justify-center items-center p-16 relative overflow-hidden transition-all duration-700 border-e border-slate-900/50 ${
        formData.role === "TEACHER" 
          ? "bg-slate-950" 
          : "bg-slate-950"
      }`}>
        {/* Animated background blobs for the visual panel */}
        {formData.role === "TEACHER" ? (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-[100px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-teal-500/5 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
          </>
        ) : (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[100px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-violet-500/5 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
          </>
        )}
        
        <div className="max-w-md text-center relative z-10">
          {formData.role === "TEACHER" ? (
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-3xl mb-4 shadow-xl shadow-emerald-500/20 animate-pulse">
                <ShieldCheck className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-black text-white tracking-tight">Empower Young Minds</h2>
              <p className="text-lg text-slate-400 font-medium leading-relaxed">
                Join our counseling community, track students mental health, and provide customized learning paths.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-tr from-indigo-600 to-violet-500 text-white rounded-3xl mb-4 shadow-xl shadow-indigo-500/20 animate-bounce">
                <GraduationCap className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-black text-white tracking-tight">Start Your Adventure</h2>
              <p className="text-lg text-slate-400 font-medium leading-relaxed">
                Unlock custom mental health quizzes, master exciting lessons, and earn stars along the way!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Form Side */}
      <div className="flex flex-col justify-center items-center p-8 md:p-16 bg-slate-950 relative overflow-hidden">
        
        {/* Glow Blobs behind form */}
        <div className="absolute top-[20%] right-[-20%] w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[90px]" />
        
        <div className="w-full max-w-md relative z-10">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-extrabold text-sm mb-10 transition-colors uppercase tracking-wider"
          >
            ← Back to Home
          </Link>
          
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Create Account</h1>
          <p className="text-slate-400 font-semibold text-sm mb-8">Join ATHAR to get started today!</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Role Toggle Switch */}
            <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "STUDENT" })}
                className={`flex-1 py-3 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
                  formData.role === "STUDENT" 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                Student
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "TEACHER" })}
                className={`flex-1 py-3 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
                  formData.role === "TEACHER" 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                Psychologist
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-950/40 border border-red-900/50 text-red-400 font-bold rounded-xl text-center backdrop-blur-sm animate-in fade-in">
                {error}
              </div>
            )}

            <div className="space-y-5">
              {/* Full Name input */}
              <div className="relative group">
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3.5 pt-6 rounded-2xl bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all duration-300 peer placeholder-transparent font-medium"
                  placeholder="Full Name"
                  id="fullName"
                />
                <label
                  htmlFor="fullName"
                  className="absolute left-4 top-2 text-xs font-bold text-indigo-400 transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-400 pointer-events-none flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Full Name
                </label>
              </div>

              {/* Username input */}
              <div className="relative group">
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-3.5 pt-6 rounded-2xl bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all duration-300 peer placeholder-transparent font-medium"
                  placeholder="Username"
                  id="username"
                />
                <label
                  htmlFor="username"
                  className="absolute left-4 top-2 text-xs font-bold text-indigo-400 transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-400 pointer-events-none flex items-center gap-2"
                >
                  <UserCircle className="w-4 h-4" />
                  Username
                </label>
              </div>

              {/* Email input */}
              <div className="relative group">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 pt-6 rounded-2xl bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all duration-300 peer placeholder-transparent font-medium"
                  placeholder="Email Address"
                  id="email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-2 text-xs font-bold text-indigo-400 transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-400 pointer-events-none flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
              </div>

              {/* Password input */}
              <div className="relative group">
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3.5 pt-6 rounded-2xl bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all duration-300 peer placeholder-transparent font-medium"
                  placeholder="Password"
                  id="password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 top-2 text-xs font-bold text-indigo-400 transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-400 pointer-events-none flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Password
                </label>
              </div>

              {/* Psychologist Passkey input */}
              {formData.role === "TEACHER" && (
                <div className="relative group animate-in slide-in-from-top-4 duration-300">
                  <input
                    type="password"
                    required
                    value={formData.passkey}
                    onChange={(e) => setFormData({ ...formData, passkey: e.target.value })}
                    className="w-full px-4 py-3.5 pt-6 rounded-2xl bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all duration-300 peer placeholder-transparent font-medium"
                    placeholder="Psychologist Passkey"
                    id="passkey"
                  />
                  <label
                    htmlFor="passkey"
                    className="absolute left-4 top-2 text-xs font-bold text-indigo-400 transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-400 pointer-events-none flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Psychologist Passkey
                  </label>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black text-white shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center relative overflow-hidden group ${
                loading 
                  ? "bg-slate-700 text-slate-500" 
                  : "bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-500 hover:to-violet-400 shadow-indigo-600/20"
              }`}
            >
              {/* Shimmer effect */}
              {!loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              )}
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {loading ? "Creating Account..." : "Join Now!"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400 text-sm font-semibold">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-400 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mb-4" />
        <p className="text-lg font-bold">Preparing registration form...</p>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
