import React from 'react';
import { Briefcase, MapPin, GraduationCap, Clock, Flame } from 'lucide-react';

interface QuickStatsBarProps {
  stats: {
    totalJobs: number;
    newToday: number;
    closingSoon: number;
    topLocations: string[];
  };
}

const QuickStatsBar: React.FC<QuickStatsBarProps> = ({ stats }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Total Jobs */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">{stats.totalJobs}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Jobs</div>
          </div>
        </div>

        <div className="hidden sm:block w-px h-10 bg-slate-100" />

        {/* New Today */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center relative">
            <Flame className="w-5 h-5 text-green-600" />
            {stats.newToday > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-[8px] font-black rounded-full flex items-center justify-center">
                {stats.newToday}
              </span>
            )}
          </div>
          <div>
            <div className="text-xl font-black text-green-600">{stats.newToday}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">New Today</div>
          </div>
        </div>

        <div className="hidden sm:block w-px h-10 bg-slate-100" />

        {/* Closing Soon */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="text-xl font-black text-amber-600">{stats.closingSoon}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Closing Soon</div>
          </div>
        </div>

        <div className="hidden lg:block w-px h-10 bg-slate-100" />

        {/* Top Locations */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Top Locations</div>
            <div className="flex gap-1.5">
              {stats.topLocations.slice(0, 4).map((loc, idx) => (
                <span 
                  key={idx}
                  className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
                >
                  {loc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStatsBar;
