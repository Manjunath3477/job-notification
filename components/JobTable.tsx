
'use client'

import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, ChevronRight, Flame, Clock, Users, Bookmark, BookmarkCheck } from 'lucide-react';
import { Job } from '@/types';

interface JobTableProps {
  jobs: Job[];
}

const JobTable: React.FC<JobTableProps> = ({ jobs }) => {
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('savedJobs');
    if (!stored) return;
    try {
      setSavedJobIds(JSON.parse(stored));
    } catch (err) {
      console.warn('Failed to parse saved jobs from storage', err);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('savedJobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  const toggleJobSave = (jobId: string) => {
    setSavedJobIds(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const handleQuickApply = (url: string) => {
    if (typeof window === 'undefined') return;
    window.open(url, '_blank', 'noopener');
  };

  const isJobSaved = (jobId: string) => savedJobIds.includes(jobId);

  // Utility to format YYYY-MM-DD to DD-MM-YYYY
  const formatDate = (dateStr: string) => {
    if (!dateStr || !dateStr.includes('-')) return dateStr;
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  // Check if job is new (posted within last 3 days)
  const isNewJob = (postDate: string) => {
    const posted = new Date(postDate);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  };

  // Check if deadline is approaching (within 5 days)
  const isClosingSoon = (lastDate: string) => {
    const deadline = new Date(lastDate);
    const now = new Date();
    const diffDays = Math.floor((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 5;
  };

  // Calculate days remaining
  const getDaysRemaining = (lastDate: string) => {
    const deadline = new Date(lastDate);
    const now = new Date();
    const diffDays = Math.floor((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (jobs.length === 0) {
    return (
      <div className="p-16 text-center text-slate-400">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-xl font-black text-slate-600 tracking-tight">No notifications found.</p>
        <p className="text-sm mt-2 font-medium">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:block w-full overflow-hidden border-x border-slate-100">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="bg-teal-900 text-white text-[11px] font-black uppercase tracking-wider">
              <th className="px-2 py-6 border-r border-white/10 w-[11%] text-center">Post Date</th>
              <th className="px-4 py-6 border-r border-white/10 w-[10%]">Board</th>
              <th className="px-5 py-6 border-r border-white/10 w-[20%]">Position Name</th>
              <th className="px-4 py-6 border-r border-white/10 w-[16%]">Eligibility</th>
              <th className="px-3 py-6 border-r border-white/10 w-[11%]">Location</th>
              <th className="px-2 py-6 border-r border-white/10 w-[10%] text-center">Notice</th>
              <th className="px-2 py-6 border-r border-white/10 w-[11%] text-center">Deadline</th>
              <th className="px-2 py-6 w-[11%] text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs.map((job, index) => {
              const isNew = isNewJob(job.postDate);
              const closingSoon = isClosingSoon(job.lastDate);
              const daysLeft = getDaysRemaining(job.lastDate);
              
              return (
              <tr 
                key={job.id} 
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'} ${closingSoon ? 'border-l-4 border-l-amber-400' : ''} hover:bg-teal-50/50 transition-all group text-[13px]`}
              >
                <td className="px-2 py-6 font-bold text-slate-500 border-r border-slate-100 text-center">
                  <div className="flex flex-col items-center gap-1">
                    {formatDate(job.postDate)}
                    {isNew && (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                        <Flame size={10} className="fill-green-500" />
                        New
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-6 font-black text-teal-800 border-r border-slate-100 uppercase tracking-tighter">
                  {job.board}
                </td>
                <td className="px-5 py-6 font-bold text-slate-900 border-r border-slate-100 leading-relaxed break-words text-[14px]">
                  <div className="flex flex-col gap-1">
                    {job.positionName}
                    {job.vacancies && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                        <Users size={12} />
                        {job.vacancies} Vacancies
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-6 border-r border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {job.eligibility.map((el, idx) => (
                      <span key={idx} className="bg-white text-slate-600 text-[11px] font-black uppercase px-2 py-0.5 rounded border border-slate-200 shadow-sm">
                        {el}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-6 text-[13px] font-black uppercase text-slate-500 border-r border-slate-100">
                  {job.location}
                </td>
                <td className="px-2 py-6 border-r border-slate-100 text-center">
                  <a href={job.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-teal-600 hover:text-teal-800 font-black uppercase transition-colors text-[13px]">
                    <ExternalLink size={14} strokeWidth={3} />
                    PDF
                  </a>
                </td>
                <td className="px-2 py-6 border-r border-slate-100 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className={`text-[13px] font-black ${closingSoon ? 'text-amber-600' : 'text-red-500'}`}>
                      {formatDate(job.lastDate)}
                    </span>
                    {closingSoon && daysLeft >= 0 && (
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-[9px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse">
                        <Clock size={10} />
                        {daysLeft === 0 ? 'Today!' : `${daysLeft}d left`}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-2 py-6 text-center">
                  <a 
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-teal-700 text-white text-[11px] font-black uppercase px-4 py-3 rounded-xl inline-flex items-center justify-center gap-1 hover:bg-teal-800 shadow-md hover:shadow-teal-200 transition-all active:scale-95 w-full max-w-[120px]"
                  >
                    Apply
                    <ChevronRight size={14} strokeWidth={3} />
                  </a>
                </td>
              </tr>
            );})}
          </tbody>
        </table>
      </div>

      {/* Tablet/Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {jobs.map((job) => {
          const isNew = isNewJob(job.postDate);
          const closingSoon = isClosingSoon(job.lastDate);
          const daysLeft = getDaysRemaining(job.lastDate);

          return (
            <MobileJobCard
              key={job.id}
              job={job}
              isNew={isNew}
              closingSoon={closingSoon}
              daysLeft={daysLeft}
              formatDate={formatDate}
              isSaved={isJobSaved(job.id)}
              onToggleSave={() => toggleJobSave(job.id)}
              onQuickApply={() => handleQuickApply(job.applyUrl)}
            />
          );
        })}
      </div>
    </>
  );
};

interface MobileJobCardProps {
  job: Job;
  isNew: boolean;
  closingSoon: boolean;
  daysLeft: number;
  formatDate: (date: string) => string;
  isSaved: boolean;
  onToggleSave: () => void;
  onQuickApply: () => void;
}

const MobileJobCard: React.FC<MobileJobCardProps> = ({
  job,
  isNew,
  closingSoon,
  daysLeft,
  formatDate,
  isSaved,
  onToggleSave,
  onQuickApply
}) => {
  const [offset, setOffset] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const startXRef = useRef(0);
  const maxOffset = 120;
  const triggerThreshold = 70;

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    startXRef.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const delta = event.touches[0].clientX - startXRef.current;
    setOffset(Math.max(-maxOffset, Math.min(maxOffset, delta)));
  };

  const handleTouchEnd = () => {
    if (offset > triggerThreshold) {
      const willSave = !isSaved;
      onToggleSave();
      setFeedback(willSave ? 'Saved for later' : 'Removed from saved');
    } else if (offset < -triggerThreshold) {
      onQuickApply();
      setFeedback('Opening apply page...');
    }
    setOffset(0);
  };

  useEffect(() => {
    if (!feedback) return;
    const id = window.setTimeout(() => setFeedback(null), 1600);
    return () => window.clearTimeout(id);
  }, [feedback]);

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-sm border border-slate-100">
      <div className="absolute inset-0 flex items-stretch pointer-events-none">
        <div className="flex-1 flex items-center gap-2 pl-4 bg-emerald-50 text-emerald-600 font-black text-[11px] uppercase tracking-widest">
          <BookmarkCheck size={16} />
          Save
        </div>
        <div className="flex-1 flex items-center justify-end gap-2 pr-4 bg-indigo-50 text-indigo-600 font-black text-[11px] uppercase tracking-widest">
          Quick Apply
          <ChevronRight size={16} />
        </div>
      </div>

      <div
        className={`relative p-6 bg-white touch-pan-y transition-transform ${closingSoon ? 'border-l-4 border-l-amber-400' : ''}`}
        style={{ transform: `translateX(${offset}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => setOffset(0)}
      >
        {feedback && (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-black px-4 py-1 rounded-full shadow-lg">
            {feedback}
          </div>
        )}

        <button
          type="button"
          onClick={onToggleSave}
          className={`absolute top-4 right-4 flex items-center gap-1 text-[11px] font-black uppercase px-3 py-1 rounded-full shadow ${isSaved ? 'bg-emerald-100 text-emerald-700 shadow-emerald-100' : 'bg-slate-100 text-slate-500 shadow-slate-100'}`}
          aria-label={isSaved ? 'Remove from saved jobs' : 'Save job for later'}
        >
          {isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
          {isSaved ? 'Saved' : 'Save'}
        </button>

        <div className="flex justify-between items-start mb-4 pr-16">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">
              {formatDate(job.postDate)}
            </span>
            {isNew && (
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-black uppercase px-2 py-1 rounded-full">
                <Flame size={12} className="fill-green-500" />
                New
              </span>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className={`text-[12px] font-black uppercase px-3 py-1 rounded-full border ${closingSoon ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
              Deadline: {formatDate(job.lastDate)}
            </span>
            {closingSoon && daysLeft >= 0 && (
              <span className="text-[10px] font-bold text-amber-600 animate-pulse">
                ⚡ {daysLeft === 0 ? 'Last day to apply!' : `Only ${daysLeft} days left!`}
              </span>
            )}
          </div>
        </div>

        <h3 className="text-lg font-black text-teal-900 mb-1 uppercase tracking-tight">{job.board}</h3>
        <p className="text-lg font-bold text-slate-900 leading-snug mb-2">{job.positionName}</p>

        {job.vacancies && (
          <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">
            <Users size={14} />
            <span className="font-bold">{job.vacancies}</span> Vacancies
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {job.eligibility.map((el, idx) => (
            <span key={idx} className="bg-white text-slate-500 text-[12px] font-black uppercase px-2.5 py-1 rounded-lg border border-slate-200 shadow-sm">
              {el}
            </span>
          ))}
          <span className="bg-teal-50 text-teal-700 text-[12px] font-black uppercase px-2.5 py-1 rounded-lg border border-teal-100">
            {job.location}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <a
            href={job.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 bg-white border-2 border-slate-100 rounded-2xl text-[13px] font-black uppercase text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
          >
            <ExternalLink size={16} strokeWidth={3} />
            Official PDF
          </a>
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`py-3.5 rounded-2xl text-[13px] font-black uppercase flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg ${closingSoon ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-100 animate-pulse' : 'bg-teal-700 hover:bg-teal-800 text-white shadow-teal-100'}`}
          >
            Apply Now
            <ChevronRight size={16} strokeWidth={3} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobTable;
