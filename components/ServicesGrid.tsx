
import React from 'react';
import { SERVICES } from '../constants';

interface ServicesGridProps {
  onBook: (id: string) => void;
  limit?: number; // Kept for prop interface, but functionally ignored if desired
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ onBook, limit }) => {
  // Show all services as requested
  const displayServices = SERVICES;

  return (
    <section className="py-24 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-white mb-6">خدماتنا الشاملة</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            من الإصلاحات البسيطة إلى الترميمات الكبرى، فريقنا جاهز لكل التحديات. 
            <span className="block mt-2 text-blue-400 font-bold underline decoration-blue-400/20 underline-offset-8">ملاحظة: السلعة عليك، والخدمة علينا!</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayServices.map((service, idx) => (
            <div 
              key={service.id} 
              className={`group p-8 rounded-[2.5rem] border border-white/5 bg-slate-800/50 hover:bg-slate-800 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-500 flex flex-col items-center text-center animate-fade-up`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-blue-600 transition-all shadow-inner">
                {service.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors">{service.title}</h3>
              <p className="text-slate-400 text-base font-medium mb-8 leading-relaxed flex-grow">
                {service.description}
              </p>
              <button 
                onClick={() => onBook(service.id)}
                className="w-full py-3 bg-slate-900/50 border-2 border-white/5 text-blue-400 font-bold rounded-2xl group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm"
              >
                احجز الآن
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
