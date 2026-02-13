
import React from 'react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="relative pt-40 pb-24 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 -z-10 w-1/3 h-1/2 bg-blue-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 -z-10 w-1/3 h-1/2 bg-indigo-600/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="text-center lg:text-right animate-slide-right">
          <span className="inline-block px-5 py-2 mb-8 text-sm font-bold tracking-wide text-blue-400 uppercase bg-blue-400/10 rounded-full border border-blue-400/20 shadow-lg shadow-blue-400/5">
            خدماتنا متوفرة في 58 ولاية
          </span>
          <h1 className="text-6xl lg:text-7xl font-black text-white leading-[1.2] mb-8">
            عامل محترف، <br />
            <span className="text-blue-500">بلمسة واحدة.</span>
          </h1>
          <p className="text-xl lg:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto lg:mr-0 leading-relaxed font-medium">
            أنت توفر السلعة، ونحن نوفر اليد العاملة المؤهلة. سباكة، كهرباء، بناء، وأكثر—كل ذلك بنظام اشتراك سنوي شفاف ومريح.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
            <button 
              onClick={onGetStarted}
              className="group w-full sm:w-auto px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-500 transition-all shadow-2xl shadow-blue-900/40 hover:-translate-y-1 active:translate-y-0 relative overflow-hidden"
            >
              <span className="relative z-10">ابدأ الآن - اختر باقتك</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <div className="flex items-center space-x-4 space-x-reverse text-slate-400">
              <div className="flex -space-x-3 space-x-reverse">
                {[1, 2, 3, 4].map(i => (
                  <img 
                    key={i} 
                    src={`https://picsum.photos/seed/${i + 50}/100/100`} 
                    className="w-12 h-12 rounded-full border-4 border-slate-900 shadow-xl" 
                    alt="Customer" 
                  />
                ))}
              </div>
              <span className="font-bold text-lg text-slate-300">+1200 زبون في الجزائر</span>
            </div>
          </div>
        </div>

        <div className="relative group animate-fade-up">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 ease-out border-8 border-slate-800/50 group-hover:border-blue-500/30 group-hover:scale-[1.02]">
            <img 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80" 
              alt="Handyman" 
              className="w-full h-auto object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="absolute -top-10 -right-10 bg-slate-800 p-6 rounded-[2rem] shadow-2xl border border-white/5 hidden md:block animate-bounce-slow">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 text-2xl shadow-inner">
                ⚡
              </div>
              <div>
                <p className="font-black text-white text-lg">خدمة سريعة</p>
                <p className="text-sm text-slate-500 font-bold text-right">خلال 24 ساعة</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -left-10 bg-blue-600 p-6 rounded-[2rem] shadow-2xl text-white hidden md:block">
            <p className="text-4xl font-black">2024</p>
            <p className="text-sm font-bold opacity-80">أفضل خدمة منزلية</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
