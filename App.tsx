
import React, { useState, useEffect } from 'react';
import { SERVICES, PLANS } from './constants';
import { SubscriptionPlan, UserState, Booking } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import PricingTable from './components/PricingTable';
import Dashboard from './components/Dashboard';
import AIAssistant from './components/AIAssistant';
import BookingModal from './components/BookingModal';
import AuthModal from './components/AuthModal';
import PaymentModal from './components/PaymentModal';
import ProfileSetupModal from './components/ProfileSetupModal';

const STORAGE_KEY = 'handyman_algeria_pro_v2';

const App: React.FC = () => {
  const [user, setUser] = useState<UserState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      isLoggedIn: false,
      isSetupComplete: false,
      isPaid: false,
      totalVisitsUsed: 0,
      remainingVisits: 0,
      bookings: []
    };
  });

  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'pricing' | 'dashboard'>('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<SubscriptionPlan | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const decodeJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("JWT Decode Error:", e);
      return null;
    }
  };

  const handleGoogleSuccess = (response: any) => {
    const profile = decodeJwt(response.credential);
    if (profile) {
      // Check if this user already exists in storage with a setup name
      const saved = localStorage.getItem(STORAGE_KEY);
      const existingUser = saved ? JSON.parse(saved) : null;
      
      const isAlreadySetup = existingUser && existingUser.email === profile.email && existingUser.isSetupComplete;

      setUser(prev => ({
        ...prev,
        isLoggedIn: true,
        email: profile.email,
        authProvider: 'google',
        name: isAlreadySetup ? existingUser.name : profile.name 
      }));

      setIsAuthOpen(false);
      
      if (!isAlreadySetup) {
        setIsSetupOpen(true);
      } else {
        if (pendingPlan) setIsPaymentOpen(true);
        else setActiveTab('dashboard');
      }
    }
  };

  const handleCompleteSetup = (chosenName: string) => {
    setUser(prev => ({
      ...prev,
      name: chosenName,
      isSetupComplete: true
    }));
    setIsSetupOpen(false);
    if (pendingPlan) setIsPaymentOpen(true);
    else setActiveTab('dashboard');
  };

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    setPendingPlan(plan);
    if (!user.isLoggedIn) setIsAuthOpen(true);
    else if (!user.isSetupComplete) setIsSetupOpen(true);
    else setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    if (pendingPlan) {
      setUser(prev => ({
        ...prev,
        plan: pendingPlan,
        isPaid: true,
        remainingVisits: PLANS[pendingPlan].freeVisits
      }));
      setIsPaymentOpen(false);
      setPendingPlan(null);
      setActiveTab('dashboard');
    }
  };

  const handleBookService = (serviceId: string) => {
    if (!user.isPaid) {
      setActiveTab('pricing');
      alert('يرجى الاشتراك في باقة أولاً لتتمكن من حجز العمال.');
      return;
    }
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const confirmBooking = (bookingData: Omit<Booking, 'id' | 'status'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'قيد الانتظار'
    };
    setUser(prev => ({
      ...prev,
      totalVisitsUsed: prev.totalVisitsUsed + bookingData.workerCount,
      remainingVisits: Math.max(0, prev.remainingVisits - bookingData.workerCount),
      bookings: [newBooking, ...prev.bookings]
    }));
    setIsBookingOpen(false);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    if (window.confirm('هل تريد تسجيل الخروج؟')) {
      setUser({
        isLoggedIn: false,
        isSetupComplete: false,
        isPaid: false,
        totalVisitsUsed: 0,
        remainingVisits: 0,
        bookings: []
      });
      localStorage.removeItem(STORAGE_KEY);
      setActiveTab('home');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col antialiased">
      <Navbar 
        isLoggedIn={user.isLoggedIn} 
        userName={user.name}
        onNavChange={setActiveTab} 
        activeTab={activeTab}
        onLogin={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-grow">
        {activeTab === 'home' && (
          <div className="space-y-4">
            <Hero onGetStarted={() => setActiveTab('pricing')} />
            <ServicesGrid onBook={handleBookService} />
            <PricingTable onSelectPlan={handleSelectPlan} />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="pt-24"><ServicesGrid onBook={handleBookService} /></div>
        )}

        {activeTab === 'pricing' && (
          <div className="pt-24"><PricingTable onSelectPlan={handleSelectPlan} /></div>
        )}

        {activeTab === 'dashboard' && user.isLoggedIn && (
          <div className="pt-24"><Dashboard user={user} onBookNew={() => setActiveTab('services')} /></div>
        )}
      </main>

      <AIAssistant 
        isLoggedIn={user.isLoggedIn} 
        isPaid={user.isPaid}
        userName={user.name}
        onAutoBook={confirmBooking} 
      />
      
      {isAuthOpen && (
        <AuthModal 
          onClose={() => setIsAuthOpen(false)} 
          onGoogleSuccess={handleGoogleSuccess} 
        />
      )}

      {isSetupOpen && <ProfileSetupModal onComplete={handleCompleteSetup} />}

      {isPaymentOpen && pendingPlan && (
        <PaymentModal 
          plan={PLANS[pendingPlan]} 
          onClose={() => setIsPaymentOpen(false)} 
          onSuccess={handlePaymentSuccess} 
        />
      )}

      {isBookingOpen && (
        <BookingModal 
          serviceId={selectedServiceId} 
          onClose={() => setIsBookingOpen(false)}
          onConfirm={confirmBooking}
          remainingVisits={user.remainingVisits}
        />
      )}
    </div>
  );
};

export default App;
