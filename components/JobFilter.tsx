
'use client'

import React from 'react';
import { Filter, Zap, MapPin, GraduationCap, RotateCcw } from 'lucide-react';
import { MasterData } from '@/types';

interface JobFilterProps {
  filters: { board: string; location: string; eligibility: string };
  setFilters: React.Dispatch<React.SetStateAction<{ board: string; location: string; eligibility: string }>>;
  masterData: MasterData;
}

const JobFilter: React.FC<JobFilterProps> = ({ filters, setFilters, masterData }) => {
  const handleReset = () => {
    setFilters({
      board: 'All Boards',
      location: 'All Locations',
      eligibility: 'All Degrees'
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="flex-shrink-0">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Filter Hub</h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Discover Jobs</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
        {/* Recruitment Board */}
        <div className="relative">
          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 flex items-center gap-1 px-1">
            <Zap size={10} className="text-amber-500 fill-amber-500" />
            Recruitment Board
          </label>
          <select 
            value={filters.board}
            onChange={(e) => setFilters(f => ({ ...f, board: e.target.value }))}
            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 appearance-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          >
            <option>All Boards</option>
            {masterData.boards.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <div className="absolute right-3 top-[32px] pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>

        {/* Job Location */}
        <div className="relative">
          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 flex items-center gap-1 px-1">
            <MapPin size={10} className="text-red-500 fill-red-500" />
            Job Location
          </label>
          <select 
            value={filters.location}
            onChange={(e) => setFilters(f => ({ ...f, location: e.target.value }))}
            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 appearance-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          >
            <option>All Locations</option>
            {masterData.locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <div className="absolute right-3 top-[32px] pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>

        {/* Qualification */}
        <div className="relative">
          <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 flex items-center gap-1 px-1">
            <GraduationCap size={10} className="text-teal-600" />
            Qualification
          </label>
          <select 
            value={filters.eligibility}
            onChange={(e) => setFilters(f => ({ ...f, eligibility: e.target.value }))}
            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 appearance-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          >
            <option>All Degrees</option>
            {masterData.eligibilities.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
          <div className="absolute right-3 top-[32px] pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      <button 
        onClick={handleReset}
        className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-slate-800 transition-colors shrink-0"
      >
        <RotateCcw size={14} />
        Reset
      </button>
    </div>
  );
};

export default JobFilter;
