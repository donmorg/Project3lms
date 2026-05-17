import Link from "next/link";
import { BookOpen, Users, Star, ArrowRight, GraduationCap, Brain, Compass, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden relative font-sans">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '3s' }} />
      <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      {/* Modern Floating Header */}
      <header className="sticky top-0 z-50 w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-slate-900/60 backdrop-blur-md border border-slate-800/80 px-6 py-3 rounded-2xl shadow-lg">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-400 bg-clip-text text-transparent">
              ATHAR
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-sm font-bold text-slate-300 hover:text-white px-4 py-2 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950/80 border border-indigo-800/40 text-indigo-300 font-bold text-sm mb-8 animate-bounce shadow-inner">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Learning Made Simple & Fun!</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white mb-6 leading-[1.1] max-w-4xl mx-auto">
            The Future of <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">Learning</span> is Here
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            A modern, high-fidelity platform designed for young minds to grow, explore, and succeed with interactive lessons, psychological support, and engaging quizzes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-2xl font-extrabold text-lg transition-all transform hover:scale-105 shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-2xl font-bold text-lg transition-all flex items-center justify-center"
            >
              Explore Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Student Card */}
          <div className="p-10 rounded-[2.5rem] bg-gradient-to-b from-indigo-950/40 to-indigo-900/10 border border-indigo-500/20 text-white shadow-2xl relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
              <Compass className="w-64 h-64 text-indigo-400" />
            </div>
            
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-8 shadow-inner">
              <Brain className="w-8 h-8" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">For Students 🎒</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Explore exciting lessons, watch high-quality videos, and earn stars by completing interactive quizzes!
            </p>
            
            <ul className="space-y-4 mb-10 text-slate-300 font-medium">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 text-sm font-bold">✓</span>
                Fun Video & PDF Lessons
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 text-sm font-bold">✓</span>
                Interactive Gamified Quizzes
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 text-sm font-bold">✓</span>
                Track Stars & Leaderboard Goals
              </li>
            </ul>
            
            <Link 
              href="/register?role=STUDENT" 
              className="inline-flex items-center gap-2 py-3.5 px-6 bg-white hover:bg-slate-100 text-slate-950 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              I'm a Student
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>
          </div>

          {/* Psychologist Card */}
          <div className="p-10 rounded-[2.5rem] bg-gradient-to-b from-slate-900/40 to-slate-900/10 border border-slate-800 text-white shadow-2xl relative overflow-hidden group hover:border-slate-700 transition-all duration-300">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
              <Users className="w-64 h-64 text-emerald-400" />
            </div>
            
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-8 shadow-inner">
              <BookOpen className="w-8 h-8" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">For Psychologists 📚</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Manage student profile statistics, upload learning content, and monitor mental health reports with ease.
            </p>
            
            <ul className="space-y-4 mb-10 text-slate-300 font-medium">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-sm font-bold">✓</span>
                Upload PDF & Lesson Material
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-sm font-bold">✓</span>
                Build Custom Interactive Quizzes
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-sm font-bold">✓</span>
                Comprehensive Mental Health Analytics
              </li>
            </ul>
            
            <Link 
              href="/register?role=TEACHER" 
              className="inline-flex items-center gap-2 py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-950/20"
            >
              I'm a Psychologist
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 px-6 text-center text-slate-500 text-sm font-semibold relative z-10 max-w-7xl mx-auto">
        <p>© {new Date().getFullYear()} ATHAR. Modern Educational and psychological Support Platform. All rights reserved.</p>
      </footer>
    </main>
  );
}
