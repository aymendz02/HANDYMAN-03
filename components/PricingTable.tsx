
import React from 'react';
import { SubscriptionPlan } from '../types';
import { PLANS } from '../constants';

interface PricingTableProps {
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

const PricingTable: React.FC<PricingTableProps> = ({ onSelectPlan }) => {
  const plans = [
    PLANS[SubscriptionPlan.BASIC],
    PLANS[SubscriptionPlan.STANDARD],
    PLANS[SubscriptionPlan.PREMIUM]
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-white mb-6">اشتراكات سنوية مرنة</h2>
          <p className="text-xl text-slate-400 font-medium">اختر الباقة التي تناسب احتياجات منزلك أو مشروعك.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan) => (
            <div 
              key={plan.type}
              className={`relative p-10 rounded-[3rem] bg-slate-900/80 backdrop-blur-xl transition-all hover:-translate-y-4 border-2 ${
                plan.type === SubscriptionPlan.STANDARD ? 'border-blue-500 shadow-2xl shadow-blue-900/30 scale-105 z-10' : 'border-white/5 shadow-xl'
              }`}
            >
              {plan.type === SubscriptionPlan.STANDARD && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-blue-500 text-white text-sm font-black rounded-full shadow-lg">
                  الأكثر طلباً
                </div>
              )}
              
              <div className="mb-10 text-center">
                <h3 className="text-3xl font-black text-white mb-4">{plan.type === 'Basic' ? 'الأساسية' : plan.type === 'Standard' ? 'القياسية' : 'المتميزة'}</h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">{plan.description}</p>
              </div>

              <div className="mb-10 text-center">
                <div className="inline-flex items-baseline bg-slate-950 px-6 py-3 rounded-3xl border border-white/5 shadow-inner">
                  <span className="text-5xl font-black text-white">{plan.price.toLocaleString()}</span>
                  <span className="mr-2 text-slate-400 font-bold">د.ج / سنة</span>
                </div>
              </div>

              <ul className="space-y-5 mb-10">
                <li className="flex items-center space-x-4 space-x-reverse text-slate-200">
                  <span className="w-7 h-7 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm">✓</span>
                  <span className="text-lg font-black">{plan.freeVisits} زيارة مجانية</span>
                </li>
                <li className="flex items-center space-x-4 space-x-reverse text-slate-300">
                  <span className="w-7 h-7 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center text-sm shadow-sm">✓</span>
                  <span className="text-lg font-medium">الزيارة = 6 ساعات عمل</span>
                </li>
                <li className="flex items-center space-x-4 space-x-reverse text-slate-300">
                  <span className="w-7 h-7 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center text-sm shadow-sm">✓</span>
                  <span className="text-lg font-medium">سعر الزيارة الإضافية: {plan.extraVisitPrice} د.ج</span>
                </li>
                <li className="flex items-center space-x-4 space-x-reverse text-slate-500">
                  <span className="w-7 h-7 bg-slate-800 text-slate-500 rounded-xl flex items-center justify-center text-sm italic">!</span>
                  <span className="text-sm font-bold">المواد والسلع يوفرها الزبون</span>
                </li>
              </ul>

              <button 
                onClick={() => onSelectPlan(plan.type)}
                className={`w-full py-5 rounded-2xl font-black text-xl transition-all ${
                  plan.type === SubscriptionPlan.STANDARD 
                    ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-900/40' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                اشترك الآن
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
