
import React, { useState } from 'react';
import { SERVICES } from '../constants';

interface BookingModalProps {
  serviceId: string | null;
  remainingVisits: number;
  onClose: () => void;
  onConfirm: (booking: { serviceId: string, date: string, workerCount: number, description: string }) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ serviceId, remainingVisits, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    date: '',
    workerCount: 1,
    description: ''
  });

  const selectedService = SERVICES.find(s => s.id === serviceId) || SERVICES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      serviceId: serviceId || 'general',
      ...formData
    });
  };

  const isExtraCharge = formData.workerCount > remainingVisits;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      <div className="relative w-full max-w-xl bg-slate-900 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] overflow-hidden animate-in zoom-in duration-300 border border-white/5">
        <div className="p-10 border-b border-white/5 flex justify-between items-center bg-slate-800/50">
          <div>
            <h2 className="text-3xl font-black text-white mb-2">طلب خدمة {selectedService.title}</h2>
            <p className="text-slate-400 font-bold text-base">نحن نوفر اليد العاملة الاحترافية لمنزلك.</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-slate-700 text-slate-400 transition-colors text-2xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-base font-black text-slate-300 mb-3">التاريخ المفضل</label>
              <input 
                required
                type="date" 
                className="w-full px-5 py-4 bg-slate-800 border-2 border-white/5 rounded-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-slate-700 transition-all color-scheme-dark"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                style={{ colorScheme: 'dark' }}
              />
            </div>

            <div>
              <label className="block text-base font-black text-slate-300 mb-3">عدد العمال المطلوبين</label>
              <div className="flex items-center space-x-4 space-x-reverse">
                <input 
                  type="number" 
                  min="1" 
                  max="5"
                  className="w-24 px-5 py-4 bg-slate-800 border-2 border-white/5 rounded-2xl font-black text-white text-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-slate-700 transition-all"
                  value={formData.workerCount}
                  onChange={e => setFormData({...formData, workerCount: parseInt(e.target.value)})}
                />
                <div className="text-xs text-slate-500 font-bold">
                  <p>العامل الواحد = 1 زيارة (6 سا).</p>
                  <p className="text-blue-400">هذا الحجز يستهلك <span className="text-lg font-black">{formData.workerCount} زيارة</span>.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-base font-black text-slate-300 mb-3">وصف العمل بالتفصيل</label>
            <textarea 
              rows={4}
              required
              placeholder="مثلاً: إصلاح تسرب مياه في المطبخ وتركيب صنبور جديد..."
              className="w-full px-6 py-4 bg-slate-800 border-2 border-white/5 rounded-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-slate-700 transition-all resize-none placeholder-slate-600"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div className="p-5 bg-blue-900/20 rounded-3xl border border-blue-500/20 flex items-start space-x-4 space-x-reverse">
            <span className="text-2xl mt-1">💡</span>
            <p className="text-sm text-blue-300 leading-relaxed font-bold">
              تذكير هام: أنت مسؤول عن توفير كافة المواد الضرورية (أنابيب، سيراميك، أسلاك، صبغة.. إلخ). نحن نوفر اليد العاملة والخبرة فقط!
            </p>
          </div>

          {isExtraCharge && (
            <div className="p-5 bg-amber-900/20 rounded-3xl border border-amber-500/20 flex items-start space-x-4 space-x-reverse">
              <span className="text-2xl mt-1">⚠️</span>
              <p className="text-sm text-amber-300 leading-relaxed font-bold">
                لديك {remainingVisits} زيارة متبقية فقط. هذا الحجز يتجاوز رصيدك الحالي. سيتم احتساب تكلفة الزيارات الإضافية بشكل منفصل.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-5 text-slate-400 font-black text-lg hover:bg-slate-800 transition-colors rounded-2xl border border-white/5"
            >
              إلغاء
            </button>
            <button 
              type="submit"
              className="flex-1 py-5 bg-blue-600 text-white font-black text-xl rounded-2xl hover:bg-blue-500 shadow-2xl shadow-blue-900/40 transition-all active:scale-95"
            >
              تأكيد الطلب
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
