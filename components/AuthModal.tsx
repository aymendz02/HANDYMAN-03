
import React, { useEffect, useState } from 'react';

interface AuthModalProps {
  onClose: () => void;
  onGoogleSuccess: (response: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onGoogleSuccess }) => {
  const [googleError, setGoogleError] = useState(false);

  useEffect(() => {
    const google = (window as any).google;
    if (google) {
      try {
        google.accounts.id.initialize({
          // NOTE: Replace this with a real Client ID from Google Cloud Console
          client_id: "847291402831-placeholder.apps.googleusercontent.com", 
          callback: onGoogleSuccess,
          auto_select: false,
        });
        google.accounts.id.renderButton(
          document.getElementById("googleBtn"),
          { theme: "outline", size: "large", width: 320, text: "signin_with", shape: "pill" }
        );
      } catch (err) {
        console.error("Google Auth Init Error:", err);
        setGoogleError(true);
      }
    }
  }, [onGoogleSuccess]);

  // This simulates the response we get from Google for testing purposes
  const handleDemoLogin = () => {
    const mockToken = "header." + btoa(JSON.stringify({
      email: "test@dz-handyman.com",
      name: "مستخدم تجريبي",
      picture: ""
    })) + ".signature";
    
    onGoogleSuccess({ credential: mockToken });
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-white/10 animate-in zoom-in duration-300">
        <div className="p-10 text-center">
          <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
            🔐
          </div>
          <h2 className="text-3xl font-black text-white mb-2">تسجيل دخول آمن</h2>
          <p className="text-slate-400 font-bold mb-8">استخدم حسابك في جوجل للوصول إلى خدماتنا فوراً.</p>

          <div className="space-y-6 flex flex-col items-center">
            {/* Real Google Button Container */}
            <div id="googleBtn" className="w-full flex justify-center"></div>

            {googleError && (
              <p className="text-red-400 text-xs font-bold">عذراً، معرف جوجل غير مفعل حالياً.</p>
            )}

            <div className="w-full flex items-center py-2">
              <div className="flex-grow h-px bg-slate-800"></div>
              <span className="px-4 text-slate-600 text-xs font-bold uppercase tracking-widest">اختبار الوظائف</span>
              <div className="flex-grow h-px bg-slate-800"></div>
            </div>

            <button 
              onClick={handleDemoLogin}
              className="w-full px-6 py-4 bg-slate-800 text-white rounded-full font-black text-lg hover:bg-slate-700 transition-all border border-white/5 flex items-center justify-center space-x-3 space-x-reverse"
            >
              <span>🚀</span>
              <span>دخول تجريبي (لتجربة الموقع)</span>
            </button>
            
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
              ملاحظة: زر جوجل يتطلب "Client ID" حقيقي من لوحة تحكم جوجل لإزالة خطأ الـ Authorization.
            </p>
          </div>

          <button onClick={onClose} className="mt-8 text-slate-500 font-bold hover:text-white transition-colors">إغلاق</button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
