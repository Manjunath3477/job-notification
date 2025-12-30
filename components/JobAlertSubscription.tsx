import React, { useState } from 'react';
import { Bell, Mail, CheckCircle, X, Send, Sparkles } from 'lucide-react';

interface JobAlertSubscriptionProps {
  isOpen: boolean;
  onClose: () => void;
}

const JobAlertSubscription: React.FC<JobAlertSubscriptionProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call - replace with actual subscription logic
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors z-10"
        >
          <X size={16} className="text-slate-500" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 px-8 py-10 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400/20 rounded-full blur-2xl" />
              
              <div className="relative">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2">Get Job Alerts</h2>
                <p className="text-teal-100 text-sm">
                  Never miss a government job opportunity!
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="px-8 py-8">
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-600">Daily digest of new job postings</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-600">Alerts for jobs matching your profile</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-600">Last date reminders before deadlines</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="relative mb-4">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-slate-100 rounded-2xl bg-slate-50 focus:bg-white focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all text-sm font-medium"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Subscribe for Free
                    </>
                  )}
                </button>
              </form>

              <p className="text-[11px] text-slate-400 text-center mt-4">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="px-8 py-16 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">You're All Set! 🎉</h2>
            <p className="text-slate-500 mb-6">
              We'll send job alerts to <span className="font-bold text-slate-700">{email}</span>
            </p>
            <button
              onClick={onClose}
              className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
            >
              Start Browsing Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Inline subscription banner for embedding in page
export const JobAlertBanner: React.FC<{ onSubscribeClick: () => void }> = ({ onSubscribeClick }) => {
  return (
    <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="hidden md:flex w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl items-center justify-center shrink-0">
            <Bell className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-black mb-1">Never Miss a Job Update!</h3>
            <p className="text-teal-100 text-sm">Get daily alerts for new government jobs delivered to your inbox.</p>
          </div>
        </div>
        
        <button
          onClick={onSubscribeClick}
          className="bg-white text-teal-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-teal-50 transition-all shadow-lg hover:shadow-xl shrink-0 flex items-center gap-2"
        >
          <Mail size={18} />
          Subscribe Free
        </button>
      </div>
    </div>
  );
};

export default JobAlertSubscription;
