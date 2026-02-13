
import React, { useState } from 'react';
import { PlanDetails } from '../types';

interface PaymentModalProps {
  plan: PlanDetails;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ plan, onClose, onSuccess }) => {
  const [cardType, setCardType] = useState<'cib' | 'dahabia'>('cib');
  const [processing, setProcessing] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [formData, setFormData] = useState({ number: '', name: '', expiry: '', cvv: '', otp: '' });

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    // محاكاة إرسال OTP كما في الواقع
    setTimeout(() => {
      setProcessing(false);
      setOtpStep(true);
    }, 2000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative w-full max-w-xl bg-slate-900 rounded-[3rem] shadow-2xl border border-white/10 animate-in slide-in-from-bottom-10 duration-500 overflow-hidden">
        
        {processing ? (
          <div className="p-20 text-center space-y-8">
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_30px_rgba(59,130,246,0.3)]"></div>
            <div>
              <h3 className="text-2xl font-black text-white mb-2">جاري تأمين العملية...</h3>
              <p className="text-slate-400 font-bold">يرجى الانتظار، نحن نتواصل مع خادم البنك.</p>
            </div>
          </div>
        ) : otpStep ? (
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl shadow-inner">📱</div>
            <h2 className="text-3xl font-black text-white mb-4">رمز التحقق (OTP)</h2>
            <p className="text-slate-400 font-bold mb-10">تم إرسال رمز إلى هاتفك المرتبط ببطاقة {cardType === 'cib' ? 'CIB' : 'الذهبية'}.</p>
            <form onSubmit={handleVerifyOtp} className="space-y-8">
              <input 
                required
                type="text"
                maxLength={6}
                placeholder="0 0 0 0 0 0"
                className="w-full px-8 py-5 bg-slate-800 border-2 border-blue-500/30 rounded-2xl font-black text-white text-3xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-center tracking-[1rem]"
                value={formData.otp}
                onChange={e => setFormData({...formData, otp: e.target.value})}
              />
              <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black text-xl rounded-2xl hover:bg-blue-500 shadow-2xl">تأكيد الدفع</button>
            </form>
          </div>
        ) : (
          <div className="p-10">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black text-white">بوابة الدفع SATIM</h2>
              <div className="text-left bg-slate-950 px-4 py-2 rounded-xl border border-white/5">
                <p className="text-slate-500 font-bold text-[10px] uppercase">الإجمالي</p>
                <p className="text-xl font-black text-blue-400">{plan.price.toLocaleString()} د.ج</p>
              </div>
            </div>

            <div className="flex gap-4 mb-10">
              <button onClick={() => setCardType('cib')} className={`flex-1 p-5 rounded-2xl border-2 transition-all flex items-center justify-center space-x-3 space-x-reverse ${cardType === 'cib' ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-slate-800/50'}`}>
                <img src="https://satim.dz/wp-content/uploads/2021/04/Logo-CIB-SATIM-1.png" className="h-6" alt="CIB" />
                <span className="font-black text-white">CIB</span>
              </button>
              <button onClick={() => setCardType('dahabia')} className={`flex-1 p-5 rounded-2xl border-2 transition-all flex items-center justify-center space-x-3 space-x-reverse ${cardType === 'dahabia' ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 bg-slate-800/50'}`}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Algeria_Post_Logo.png" className="h-6" alt="Dahabia" />
                <span className="font-black text-white">الذهبية</span>
              </button>
            </div>

            <form onSubmit={handlePay} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 mr-2">رقم البطاقة</label>
                <input required type="text" placeholder="6074 XXXX XXXX XXXX" className="w-full px-6 py-4 bg-slate-800 border-2 border-white/5 rounded-2xl font-black text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all tracking-widest" value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-400 mr-2">تاريخ الانتهاء</label>
                  <input required type="text" placeholder="MM/YY" className="w-full px-6 py-4 bg-slate-800 border-2 border-white/5 rounded-2xl font-black text-white text-center" value={formData.expiry} onChange={e => setFormData({...formData, expiry: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-400 mr-2">رمز CVV</label>
                  <input required type="password" maxLength={3} placeholder="***" className="w-full px-6 py-4 bg-slate-800 border-2 border-white/5 rounded-2xl font-black text-white text-center" value={formData.cvv} onChange={e => setFormData({...formData, cvv: e.target.value})} />
                </div>
              </div>

              <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black text-xl rounded-2xl hover:bg-blue-500 shadow-2xl mt-4">الاستمرار للدفع</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
