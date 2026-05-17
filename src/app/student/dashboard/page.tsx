import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Star, BookOpen, Clock, Trophy, ArrowRight, Sparkles, Flame, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function StudentDashboard() {
  const session = await auth();
  const studentId = (session?.user as any)?.id;

  // Fetch stats for dashboard
  let progressCount = 0;
  let recentLessons: any[] = [];
  
  try {
    progressCount = await prisma.lessonProgress.count({
      where: { studentId, status: "COMPLETED" },
    });

    recentLessons = await prisma.lesson.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.error("Prisma query failed, falling back to mock stats:", e);
  }

  const userName = session?.user?.name || "Student";

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* Welcome Banner */}
      <div className="relative p-10 rounded-[3rem] bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 text-white overflow-hidden shadow-2xl shadow-indigo-600/10 border border-white/10">
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-indigo-100 font-bold text-xs uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>Athar Academy</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
              Welcome back, {userName}! 🌟
            </h1>
            <p className="text-indigo-100 text-lg opacity-90 font-medium max-w-xl leading-relaxed">
              Your learning path is ready. Explore new video modules, earn star points, and master custom quizzes!
            </p>
          </div>
          
          <div className="mt-10 flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 px-6 py-3.5 rounded-2xl flex items-center shadow-lg">
              <Trophy className="w-5.5 h-5.5 mr-2.5 text-amber-300" />
              <span className="font-extrabold text-sm tracking-wide">{progressCount} Lessons Completed</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 px-6 py-3.5 rounded-2xl flex items-center shadow-lg">
              <Star className="w-5.5 h-5.5 mr-2.5 text-amber-300 fill-amber-300" />
              <span className="font-extrabold text-sm tracking-wide">120 Star Points</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 px-6 py-3.5 rounded-2xl flex items-center shadow-lg">
              <Flame className="w-5.5 h-5.5 mr-2.5 text-rose-400 fill-rose-400" />
              <span className="font-extrabold text-sm tracking-wide">3 Day Streak!</span>
            </div>
          </div>
        </div>
        
        {/* Glowing Blobs */}
        <div className="absolute top-[-50%] right-[-20%] w-[350px] h-[350px] bg-indigo-400/25 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[250px] h-[250px] bg-violet-400/20 rounded-full blur-[60px] pointer-events-none" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Continue Learning Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <span>Jump Back In</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </h2>
            <Link 
              href="/student/lessons" 
              className="text-sm font-black text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1 group"
            >
              See All Lessons 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {recentLessons.length > 0 ? (
              recentLessons.map((lesson) => (
                <Link 
                  key={lesson.id} 
                  href={`/student/lessons/${lesson.id}`}
                  className="group bg-white p-6 rounded-[2.5rem] border border-gray-100 hover:border-indigo-200/60 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-inner ${
                      lesson.type === "VIDEO" ? "bg-red-50 border border-red-100 text-red-500" :
                      lesson.type === "PDF" ? "bg-blue-50 border border-blue-100 text-blue-500" : "bg-emerald-50 border border-emerald-100 text-emerald-500"
                    }`}>
                      {lesson.type === "VIDEO" ? <Clock className="w-5.5 h-5.5" /> : <BookOpen className="w-5.5 h-5.5" />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors tracking-tight leading-snug">{lesson.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-6">{lesson.description}</p>
                  </div>
                  <div className="flex items-center justify-between text-indigo-600 font-extrabold text-sm border-t border-gray-50 pt-4 mt-auto">
                    <span>Open Lesson</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-2 p-12 text-center bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 mb-4">
                  <BookOpen className="w-8 h-8" />
                </div>
                <p className="text-gray-900 font-extrabold text-lg mb-1">No lessons available yet</p>
                <p className="text-gray-500 text-sm max-w-xs">Your psychologists are uploading lessons now. Please check back shortly!</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Space */}
        <div className="space-y-8">
          
          {/* Daily Challenge Card */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-8 rounded-[2.5rem] border border-amber-100/80 shadow-lg shadow-amber-500/5 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl" />
            
            <h3 className="text-lg font-black text-amber-900 mb-3 flex items-center">
              <Star className="w-5.5 h-5.5 mr-2 fill-amber-500 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
              Daily Challenge
            </h3>
            <p className="text-amber-800 font-bold text-sm leading-relaxed mb-6">Complete 2 learning quizzes today to earn the special "Fast Learner" badge!</p>
            
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-between mb-3 border border-amber-200/50">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Quizzes Completed</span>
              <span className="text-sm font-black text-amber-950">0 / 2</span>
            </div>
            
            <div className="w-full bg-amber-200/60 h-2.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-full w-[10%] rounded-full transition-all duration-500" />
            </div>
          </div>

          {/* Leaderboard Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
            <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight flex items-center justify-between">
              <span>Leaderboard</span>
              <Trophy className="w-5.5 h-5.5 text-amber-400" />
            </h3>
            
            <div className="space-y-5">
              {[
                { name: "Ahmed", points: 1250, badge: "🥇", color: "bg-amber-50 text-amber-600 border border-amber-100" },
                { name: "Sara", points: 1100, badge: "🥈", color: "bg-slate-50 text-slate-600 border border-slate-100" },
                { name: "Youssef", points: 950, badge: "🥉", color: "bg-orange-50 text-orange-600 border border-orange-100" }
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${user.color}`}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-800">{user.name}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{i + 1}st Place</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm text-gray-900">{user.points} pts</p>
                    <p className="text-xs">{user.badge}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
