
'use client'

import React from 'react';

interface AdSpaceProps {
  type: 'banner' | 'sidebar';
  label?: string;
  className?: string;
}

const AdSpace: React.FC<AdSpaceProps> = ({ type, label = 'ADVERTISEMENT', className = '' }) => {
  const styles = {
    banner: 'w-full h-32 md:h-40 bg-white border border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-slate-400 shadow-sm overflow-hidden',
    sidebar: 'w-48 h-[min(800px,85vh)] bg-white border border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-400 shadow-sm overflow-hidden'
  };

  return (
    <div className={`${styles[type]} ${className} relative group hover:border-teal-400 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-500 cursor-pointer`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
        <svg width="100%" height="100%">
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="absolute top-4 inset-x-0 text-center">
        <span className="text-[9px] font-black tracking-[0.4em] uppercase text-slate-300 group-hover:text-teal-500 transition-colors duration-300">{label}</span>
      </div>
      
      <div className="flex flex-col items-center justify-center p-8 text-center relative z-10">
        <div className="w-16 h-16 rounded-[2rem] bg-slate-50 border border-slate-100 shadow-inner mb-6 flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
          <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center">
             <div className="w-2 h-2 bg-teal-500 rounded-full animate-ping"></div>
          </div>
        </div>
        <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-tight group-hover:text-teal-600 transition-colors">Premium Ad Unit</p>
        <p className="text-[9px] text-slate-400 mt-2 font-bold italic tracking-tighter">Space Available for Rent</p>
      </div>

      <div className="absolute bottom-6 inset-x-0 text-center px-4">
        <button className="py-2 px-6 bg-slate-900 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 text-[9px] font-black uppercase tracking-widest">
          Book Now
        </button>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-4 right-4 w-1 h-1 bg-slate-200 rounded-full group-hover:bg-teal-400 transition-colors"></div>
      <div className="absolute top-4 left-4 w-1 h-1 bg-slate-200 rounded-full group-hover:bg-teal-400 transition-colors"></div>
      <div className="absolute bottom-4 right-4 w-1 h-1 bg-slate-200 rounded-full group-hover:bg-teal-400 transition-colors"></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-slate-200 rounded-full group-hover:bg-teal-400 transition-colors"></div>
    </div>
  );
};

export default AdSpace;
