
'use client'

import React from 'react';
import { Search, ShieldCheck, User, LogOut } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onToggleAdmin: () => void;
  currentView: 'user' | 'admin';
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, onToggleAdmin, currentView }) => {
  const handleLogoClick = () => {
    setSearchQuery('');
    if (currentView === 'admin') {
      onToggleAdmin();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-md">
      <div className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={handleLogoClick}>
          <div className="bg-teal-700 p-2.5 rounded-xl shadow-lg shadow-teal-100">
            <span className="text-white font-black text-2xl italic leading-none">I</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-teal-900 leading-none hidden md:block tracking-tight">
              IndiaJobNotifications.com
            </h1>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1 hidden md:block">Daily Career Updates</span>
          </div>
        </div>

        <div className="flex-grow max-w-2xl relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-3 border-2 border-slate-100 rounded-2xl bg-slate-50 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all text-sm font-bold text-slate-900 placeholder:text-slate-400 shadow-inner"
            placeholder="Search jobs, boards, or qualifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Admin button only shown if current view is admin (as Exit Console) */}
        {currentView === 'admin' ? (
          <button 
            onClick={onToggleAdmin}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all active:scale-95 shadow-lg bg-amber-100 text-amber-700 hover:bg-amber-200 shadow-amber-100"
          >
            <LogOut size={16} />
            <span className="hidden lg:inline">Exit Console</span>
          </button>
        ) : (
          /* Empty div to preserve header layout spacing if needed */
          <div className="w-10 lg:w-40 invisible"></div>
        )}
      </div>
    </header>
  );
};

export default Header;
