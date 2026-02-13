
import React, { useState } from 'react';

interface ProfileSetupModalProps {
  onComplete: (name: string) => void;
}

const ProfileSetupModal: React.FC<ProfileSetupModalProps> = ({ onComplete }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length > 2) {
      onComplete(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[115] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"></div>
      <div className="relative w-full max-w-md bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-white/10 animate-in zoom-in duration-500">
        <div className="p-10 text-center">
          <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-xl">
            ✨
          </div>
          <h2 className="text-3xl font-black text-white mb-4">خطوة واحدة أخيرة!</h2>
          <p className="text-slate-400 font-bold mb-10 text-lg">كيف تحب أن نناديك في تطبيقنا؟</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input 
                autoFocus
                required
                type="text" 
                placeholder="مثلاً: أمين، أبو سارة، بن علي..."
                className="w-full px-8 py-5 bg-slate-800 border-2 border-white/5 rounded-2xl font-black text-white text-xl focus:outline-none focus:ring-4 focus:ring-blue-600/20 focus:bg-slate-700 transition-all text-center"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              disabled={name.trim().length < 3}
              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-500 disabled:opacity-30 transition-all shadow-xl shadow-blue-900/40 active:scale-95"
            >
              دخول للتطبيق
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupModal;
