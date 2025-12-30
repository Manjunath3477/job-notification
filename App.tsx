
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import UserView from './components/UserView';
import AdminPanel from './components/Admin/AdminPanel';
import { Job, MasterData, ViewType } from './types';
import { INITIAL_JOBS, INITIAL_MASTER_DATA } from './constants';
import { ShieldAlert, Lock, KeyRound, Loader2, Mail } from 'lucide-react';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('user');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const keySequence = useRef<string[]>([]);
  const lastKeyTime = useRef<number>(0);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [masterData, setMasterData] = useState<MasterData>(INITIAL_MASTER_DATA);
  const [searchQuery, setSearchQuery] = useState('');

  // Authentication State Listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setView('admin');
        setShowPasswordPrompt(false);
      } else {
        setView('user');
      }
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setView('admin');
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Initial Data Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Jobs
        const { data: jobsData, error: jobsError } = await supabase
          .from('jobs')
          .select('*')
          .order('postDate', { ascending: false });

        if (!jobsError && jobsData && jobsData.length > 0) {
          setJobs(jobsData);
        } else if (!jobsError && jobsData?.length === 0) {
          setJobs(INITIAL_JOBS);
          await supabase.from('jobs').insert(INITIAL_JOBS);
        }

        // 2. Fetch Master Data
        const { data: masterConfig, error: masterError } = await supabase
          .from('master_configs')
          .select('*')
          .single();

        if (!masterError && masterConfig) {
          setMasterData({
            boards: masterConfig.boards,
            locations: masterConfig.locations,
            eligibilities: masterConfig.eligibilities
          });
        }
      } catch (err) {
        console.error('Database connection error:', err);
      }
    };

    fetchData();
  }, []);

  const handleMasterUpdate = async (updateAction: MasterData | ((prev: MasterData) => MasterData)) => {
    setMasterData(prev => {
      const next = typeof updateAction === 'function' ? updateAction(prev) : updateAction;
      supabase.from('master_configs').upsert({ id: 1, ...next }).then(({ error }) => {
        if (error) console.error("Failed to sync categories:", error.message);
      });
      return next;
    });
  };

  const handleJobUpdate = (updatedJobs: Job[]) => {
    setJobs(updatedJobs);
  };

  // Secret sequence listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (view === 'admin' || showPasswordPrompt || isLocked) return;
      const now = Date.now();
      if (now - lastKeyTime.current > 2000) keySequence.current = [];
      lastKeyTime.current = now;
      keySequence.current.push(e.key);
      const sequence = keySequence.current.join('');
      if (sequence.endsWith(')&(')) {
        setShowPasswordPrompt(true);
        keySequence.current = [];
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, showPasswordPrompt, isLocked]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('user');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsAuthenticating(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message === 'Invalid login credentials' 
        ? 'Authentication failed: Invalid credentials.' 
        : error.message);
      setIsAuthenticating(false);
    } else {
      setIsAuthenticating(false);
      setEmail('');
      setPassword('');
      setShowPasswordPrompt(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
        <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Verifying Secure Session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onToggleAdmin={handleLogout}
        currentView={view}
      />
      
      <main className="flex-grow flex flex-col bg-[#f1f5f9]">
        {view === 'user' ? (
          <UserView 
            jobs={jobs} 
            masterData={masterData} 
            searchQuery={searchQuery} 
          />
        ) : (
          <AdminPanel 
            jobs={jobs} 
            setJobs={handleJobUpdate} 
            masterData={masterData} 
            setMasterData={handleMasterUpdate}
          />
        )}
      </main>

      {showPasswordPrompt && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300">
            <div className="p-8 bg-slate-900 text-white flex flex-col items-center text-center">
              <div className="bg-teal-500 p-4 rounded-3xl mb-4 shadow-lg shadow-teal-500/20">
                <Lock size={32} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-widest">Admin Portal</h2>
              <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-tighter">Identity Verification Required</p>
            </div>
            
            <form onSubmit={handleLogin} className="p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Admin Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-300">
                    <Mail size={18} />
                  </div>
                  <input 
                    autoFocus
                    type="email"
                    required
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-black text-slate-900 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Secure Key</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-300">
                    <KeyRound size={18} />
                  </div>
                  <input 
                    type="password"
                    required
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-black text-slate-900 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-3 bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 text-[11px] font-black uppercase animate-in slide-in-from-bottom-2">
                  <ShieldAlert size={16} />
                  {errorMsg}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => { setShowPasswordPrompt(false); setEmail(''); setPassword(''); setErrorMsg(''); }}
                  className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isAuthenticating}
                  className="flex-[2] py-4 bg-teal-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-teal-700 shadow-xl shadow-teal-100 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isAuthenticating ? <Loader2 size={16} className="animate-spin" /> : 'Sign In'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="bg-slate-900 text-white py-10 text-center text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-bold text-teal-400 mb-2">IndiaJobNotifications.com Portal</p>
          <p className="text-slate-400">Serving job seekers across India with the latest updates.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
