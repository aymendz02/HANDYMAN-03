
import React, { useState, useRef, useEffect } from 'react';
import { getHandymanAdvice } from '../services/gemini';
import { SERVICES } from '../constants';

interface AIAssistantProps {
  onAutoBook?: (booking: { serviceId: string, date: string, workerCount: number, description: string }) => void;
  isLoggedIn: boolean;
  isPaid: boolean;
  userName?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onAutoBook, isLoggedIn, isPaid, userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: `مرحباً${userName ? ` يا ${userName}` : ''}! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [bookingStep, setBookingStep] = useState<'idle' | 'phone' | 'address' | 'date' | 'confirm'>('idle');
  const [tempBooking, setTempBooking] = useState({
    serviceId: '',
    phone: '',
    address: '',
    date: '',
    description: ''
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addAssistantMessage = (content: string) => {
    setMessages(prev => [...prev, { role: 'assistant', content }]);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);

    if (bookingStep !== 'idle') {
      processBookingStep(userMsg);
      return;
    }

    setIsLoading(true);
    try {
      const data = await getHandymanAdvice(userMsg, messages.slice(-4));
      addAssistantMessage(data.reply);

      if (data.intent === 'booking_init' && data.suggestedServiceId) {
        if (!isLoggedIn) {
          addAssistantMessage("يرجى تسجيل الدخول أولاً لتتمكن من الحجز.");
        } else if (!isPaid) {
          addAssistantMessage("عذراً، يجب عليك تفعيل اشتراكك السنوي أولاً لتتمكن من حجز العمال.");
        } else {
          setTempBooking(prev => ({ ...prev, serviceId: data.suggestedServiceId, description: userMsg }));
          setBookingStep('phone');
          setTimeout(() => addAssistantMessage(`حسناً يا ${userName || 'أخي'}، للبدء في حجز الحرفي، ممكن رقم هاتفك للتواصل؟`), 500);
        }
      }
    } catch (error) {
      addAssistantMessage("عذراً، أواجه مشكلة تقنية بسيطة. هل يمكنك إعادة كتابة طلبك؟");
    } finally {
      setIsLoading(false);
    }
  };

  const processBookingStep = (val: string) => {
    switch (bookingStep) {
      case 'phone':
        setTempBooking(prev => ({ ...prev, phone: val }));
        setBookingStep('address');
        addAssistantMessage("تمام. وأين يقع العنوان الذي سنرسل إليه العامل؟");
        break;
      case 'address':
        setTempBooking(prev => ({ ...prev, address: val }));
        setBookingStep('date');
        addAssistantMessage("ممتاز. في أي تاريخ تريد أن يأتي العامل؟ (مثلاً: 2024-12-05)");
        break;
      case 'date':
        setTempBooking(prev => ({ ...prev, date: val }));
        setBookingStep('confirm');
        const serviceName = SERVICES.find(s => s.id === tempBooking.serviceId)?.title || "خدمة عامة";
        addAssistantMessage(`حسناً، سنقوم بحجز ${serviceName} في تاريخ ${val}. هل تؤكد الطلب؟ (نعم/لا)`);
        break;
      case 'confirm':
        if (val.includes('نعم') || val.includes('أوك') || val.includes('صح')) {
          if (onAutoBook) {
            onAutoBook({
              serviceId: tempBooking.serviceId,
              date: tempBooking.date,
              workerCount: 1,
              description: `طلب عبر المساعد: ${tempBooking.description}. العنوان: ${tempBooking.address}. هاتف: ${tempBooking.phone}`
            });
          }
          addAssistantMessage("تم الحجز بنجاح! يمكنك رؤية الموعد في لوحة التحكم. هل هناك شيء آخر تحتاج للمساعدة فيه؟");
          setBookingStep('idle');
        } else {
          addAssistantMessage("تم إلغاء الحجز كما طلبت. هل تريد مني شرح خدماتنا الأخرى؟");
          setBookingStep('idle');
        }
        break;
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[60] flex flex-col items-start">
      {isOpen && (
        <div className="w-[22rem] sm:w-[26rem] bg-slate-800 rounded-[2.5rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden mb-6 flex flex-col h-[550px] animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out">
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center border-b border-white/5">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg relative">
                🤖
                <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
              </div>
              <div>
                <p className="font-black text-base">مساعد {userName || 'Handyman'}</p>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">ذكاء اصطناعي نشط</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors">
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-900/50 scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm leading-relaxed font-bold shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tl-none' 
                    : 'bg-slate-800 border border-white/5 text-slate-200 rounded-tr-none'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-end">
                <div className="bg-slate-800 border border-white/5 p-4 rounded-[1.5rem] rounded-tr-none shadow-sm flex items-center space-x-2 space-x-reverse">
                  <div className="flex space-x-1 space-x-reverse">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/5 bg-slate-900">
            <div className="flex space-x-2 space-x-reverse">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={bookingStep !== 'idle' ? "اكتب ردك هنا..." : "اسألني أي شيء عن صيانة منزلك..."}
                className="flex-grow px-5 py-3 bg-slate-800 rounded-2xl text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all border border-white/5 focus:bg-slate-700 placeholder-slate-500"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-blue-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-blue-500 disabled:opacity-50 shadow-lg transition-all active:scale-90"
              >
                ➔
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-slate-800 text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl hover:bg-blue-600 transition-all hover:scale-110 active:scale-95 group relative border border-white/5"
      >
        {isOpen ? <span className="text-2xl">✕</span> : <span className="text-3xl">🤖</span>}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-[11px] font-black border-4 border-slate-900 shadow-lg">1</span>
        )}
      </button>
    </div>
  );
};

export default AIAssistant;
