
import React from 'react';
import { UserState } from '../types';
import { PLANS, SERVICES } from '../constants';

interface DashboardProps {
  user: UserState;
  onBookNew: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onBookNew }) => {
  if (!user.isLoggedIn || !user.plan) return null;

  const currentPlan = PLANS[user.plan];
  const usagePercentage = (user.totalVisitsUsed / currentPlan.freeVisits) * 100;
  const planArabicName = user.plan === 'Basic' ? 'الأساسية' : user.plan === 'Standard' ? 'القياسية' : 'المتميزة';

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 animate-fade-up">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">مرحباً بك، {user.name}</h1>
          <p className="text-lg text-slate-400 font-bold">أنت مشترك في الباقة <span className="text-blue-400 underline underline-offset-8">{planArabicName}</span></p>
        </div>
        <button 
          onClick={onBookNew}
          className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-xl shadow-2xl shadow-blue-900/40 hover:bg-blue-500 transition-all flex items-center justify-center group"
        >
          <span className="ml-3 text-2xl group-hover:rotate-90 transition-transform">+</span> حجز خدمة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
        <div className="lg:col-span-2 bg-slate-800/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 shadow-2xl animate-fade-up delay-100">
          <h2 className="text-2xl font-black text-white mb-8">استهلاك الزيارات</h2>
          
          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <span className="text-slate-400 font-bold text-lg">التقدم السنوي</span>
              <span className="text-3xl font-black text-white">{user.totalVisitsUsed} <span className="text-base text-slate-500 font-bold">من أصل</span> {currentPlan.freeVisits}</span>
            </div>
            <div className="w-full h-5 bg-slate-900 rounded-full overflow-hidden p-1 shadow-inner border border-white/5">
              <div 
                className="h-full bg-gradient-to-l from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                style={{ width: `${usagePercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-8 bg-blue-600 rounded-[2rem] text-white shadow-2xl shadow-blue-900/30 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
              <p className="text-blue-100 text-base font-bold mb-2 uppercase tracking-widest">الزيارات المتبقية</p>
              <p className="text-6xl font-black">{user.remainingVisits}</p>
              <p className="text-blue-200/80 text-sm mt-4 font-bold">متوفرة للاستخدام الفوري</p>
            </div>
            <div className="p-8 bg-slate-950 rounded-[2rem] text-white shadow-xl relative overflow-hidden border border-white/5 group hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
              <p className="text-slate-400 text-base font-bold mb-2 uppercase tracking-widest">تكلفة الإضافية</p>
              <p className="text-5xl font-black">{currentPlan.extraVisitPrice} <span className="text-xl">د.ج</span></p>
              <p className="text-slate-500 text-sm mt-4 font-bold">لكل زيارة بعد نفاذ الرصيد</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 shadow-2xl flex flex-col animate-fade-up delay-200">
          <h2 className="text-2xl font-black text-white mb-8">معلومات الاشتراك</h2>
          <div className="space-y-6 flex-grow">
            <div className="flex justify-between items-center py-4 border-b border-white/5">
              <span className="text-slate-400 font-bold">نوع الباقة</span>
              <span className="font-black text-blue-400 text-lg">{planArabicName}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/5">
              <span className="text-slate-400 font-bold">الحالة</span>
              <span className="font-black text-green-400 text-lg">نشط</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/5">
              <span className="text-slate-400 font-bold">قيمة العقد</span>
              <span className="font-black text-slate-200 text-lg">{currentPlan.price.toLocaleString()} د.ج</span>
            </div>
          </div>
          <button className="mt-8 w-full py-5 bg-slate-900 text-slate-300 font-black text-lg rounded-2xl border border-white/10 hover:bg-slate-800 transition-all hover:border-blue-500/30">
            ترقية الاشتراك
          </button>
        </div>
      </div>

      <div className="bg-slate-800/40 backdrop-blur-xl rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden animate-fade-up delay-300">
        <div className="p-10 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-2xl font-black text-white">سجل الخدمات</h2>
          <div className="px-4 py-1.5 bg-blue-500/10 text-blue-400 text-xs font-black rounded-full border border-blue-500/20">
            {user.bookings.length} حجز متاح
          </div>
        </div>
        <div className="overflow-x-auto">
          {user.bookings.length === 0 ? (
            <div className="p-20 text-center">
              <p className="text-slate-500 font-bold text-lg mb-4">ليس لديك أي حجوزات بعد.</p>
              <button onClick={onBookNew} className="text-blue-400 font-black hover:underline">احجز أول عامل لك الآن!</button>
            </div>
          ) : (
            <table className="w-full text-right">
              <thead className="bg-slate-950/50 text-slate-500 text-sm uppercase font-black">
                <tr>
                  <th className="px-10 py-5">التاريخ</th>
                  <th className="px-10 py-5">نوع الخدمة</th>
                  <th className="px-10 py-5">عدد العمال</th>
                  <th className="px-10 py-5">الحالة</th>
                  <th className="px-10 py-5 text-left">التفاصيل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {user.bookings.map((job) => {
                  const srv = SERVICES.find(s => s.id === job.serviceId);
                  return (
                    <tr key={job.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-10 py-6 font-bold text-slate-200">{job.date}</td>
                      <td className="px-10 py-6 text-slate-400 font-medium">{srv?.title || 'خدمة عامة'}</td>
                      <td className="px-10 py-6 text-slate-400 font-medium">{job.workerCount} عامل</td>
                      <td className="px-10 py-6">
                        <span className={`px-4 py-1.5 text-xs font-black rounded-full shadow-lg border ${
                          job.status === 'مكتملة' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-left">
                        <button className="text-blue-400 font-black text-sm group-hover:translate-x-[-8px] transition-transform">عرض ←</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
