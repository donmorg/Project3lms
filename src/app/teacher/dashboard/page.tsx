import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Users, BookOpen, Star, TrendingUp, Plus, ArrowRight, UserCheck, Sparkles, Activity } from "lucide-react";
import Link from "next/link";

export default async function TeacherDashboard() {
  const session = await auth();
  const teacherId = (session?.user as any)?.id;

  // Fetch stats
  let studentCount = 0;
  let lessonCount = 0;
  let quizCount = 0;
  let recentStudents: any[] = [];

  try {
    studentCount = await prisma.user.count({ where: { role: "STUDENT" } });
    lessonCount = await prisma.lesson.count({ where: { teacherId } });
    quizCount = await prisma.quiz.count({ where: { teacherId } });

    recentStudents = await prisma.user.findMany({
      where: { role: "STUDENT" },
      take: 5,
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.error("Prisma query failed, falling back to mock dashboard stats:", e);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">
      
      {/* Welcome & Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 font-extrabold text-xs uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Psychologist Portal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Welcome Back, Counselor! 🩺</h1>
          <p className="text-gray-500 mt-1 font-medium">Monitor student mental health, manage lessons, and view custom analytics.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/teacher/lessons/new"
            className="px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-600/10 hover:bg-indigo-700 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-5 h-5 shrink-0" />
            Add Lesson
          </Link>
          <Link 
            href="/teacher/quizzes/new"
            className="px-6 py-3.5 bg-white text-gray-700 border border-gray-200 rounded-2xl font-black hover:bg-gray-50 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Star className="w-5 h-5 shrink-0 text-amber-500 fill-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            New Quiz
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Students", value: studentCount, icon: Users, color: "bg-blue-50 border border-blue-100 text-blue-600" },
          { label: "Active Lessons", value: lessonCount, icon: BookOpen, color: "bg-indigo-50 border border-indigo-100 text-indigo-600" },
          { label: "Quizzes Created", value: quizCount, icon: Star, color: "bg-amber-50 border border-amber-100 text-amber-600" },
          { label: "Avg. Performance", value: "84%", icon: TrendingUp, color: "bg-emerald-50 border border-emerald-100 text-emerald-600" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm flex items-center gap-5 hover:shadow-md transition-all duration-300">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.color} shadow-inner`}>
              <stat.icon className="w-6.5 h-6.5 shrink-0" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-black text-gray-900 mt-1 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* New Students Roster */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900 tracking-tight">New Student Registrations</h2>
              <Link href="/teacher/students" className="text-sm font-black text-indigo-600 hover:text-indigo-700 hover:underline">View Full Roster</Link>
            </div>
            <div className="divide-y divide-gray-50">
              {recentStudents.length > 0 ? (
                recentStudents.map((student) => (
                  <div key={student.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black shadow-md shadow-gray-100"
                        style={{ backgroundColor: student.avatarColor || "#6366f1" }}
                      >
                        {student.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-extrabold text-gray-900 text-base">{student.fullName}</p>
                        <p className="text-xs font-medium text-gray-400">Registered on {new Date(student.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Link 
                      href={`/teacher/students/${student.id}`}
                      className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 flex items-center justify-center transition-colors"
                    >
                      <ArrowRight className="w-5 h-5 shrink-0" />
                    </Link>
                  </div>
                ))
              ) : (
                <div className="p-16 text-center flex flex-col items-center justify-center">
                  <UserCheck className="w-14 h-14 text-gray-200 mb-4" />
                  <p className="text-gray-900 font-extrabold text-lg mb-1">No students registered yet</p>
                  <p className="text-gray-400 text-sm max-w-xs">Share your psychologist register link to let students join!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-6">
          
          {/* Class Insights */}
          <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-8 rounded-[2.5rem] border border-slate-800 shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-lg font-black tracking-tight mb-3 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-400 animate-pulse" />
                Counselor Insights
              </h3>
              <p className="text-indigo-200 text-sm leading-relaxed mb-6 font-medium">Your students are most active with mental health reports between 4 PM and 6 PM.</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-indigo-300">
                  <span>Lesson Completion Rate</span>
                  <span className="font-extrabold">72%</span>
                </div>
                <div className="w-full bg-slate-800/80 h-3 rounded-full overflow-hidden border border-slate-700/50">
                  <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full w-[72%] rounded-full" />
                </div>
              </div>
            </div>
            
            <TrendingUp className="absolute -bottom-6 -right-6 w-36 h-36 text-indigo-800/30 opacity-50 group-hover:scale-110 transition-transform pointer-events-none" />
          </div>

          {/* Recent Quizzes Insights */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Recent Submissions</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-400 text-center py-8 font-medium">No recent quiz submissions to review today.</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
