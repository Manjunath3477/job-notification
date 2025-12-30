'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react';
import AdSpace from '@/components/AdSpace';
import JobFilter from '@/components/JobFilter';
import JobTable from '@/components/JobTable';
import SEO from '@/components/SEO';
import JobAlertSubscription from '@/components/JobAlertSubscription';
import Footer from '@/components/Footer';
import { Job, MasterData } from '@/types';
import { Filter as FilterIcon, ArrowUp } from 'lucide-react';

interface UserViewProps {
  jobs: Job[];
  masterData: MasterData;
  searchQuery: string;
}

const UserView: React.FC<UserViewProps> = ({ jobs, masterData, searchQuery }) => {
  const [filters, setFilters] = useState({
    board: 'All Boards',
    location: 'All Locations',
    eligibility: 'All Degrees'
  });
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = 
        job.positionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.board.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesBoard = filters.board === 'All Boards' || job.board === filters.board;
      const matchesLocation = filters.location === 'All Locations' || job.location === filters.location;
      const matchesEligibility = filters.eligibility === 'All Degrees' || job.eligibility.includes(filters.eligibility);

      return matchesSearch && matchesBoard && matchesLocation && matchesEligibility;
    });
  }, [jobs, searchQuery, filters]);

  // Calculate stats for components
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const fiveDaysFromNow = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newToday = jobs.filter(job => job.postDate >= threeDaysAgo).length;
    const closingSoon = jobs.filter(job => job.lastDate <= fiveDaysFromNow && job.lastDate >= today).length;
    
    // Get top locations
    const locationCounts = jobs.reduce((acc, job) => {
      acc[job.location] = (acc[job.location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const topLocations = Object.entries(locationCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([loc]) => loc);

    return {
      totalJobs: jobs.length,
      newToday,
      closingSoon,
      topLocations
    };
  }, [jobs]);

  return (
    <>
    {/* Subscription Modal */}
    <JobAlertSubscription 
      isOpen={showSubscriptionModal} 
      onClose={() => setShowSubscriptionModal(false)} 
    />

    <div className="max-w-[2400px] mx-auto w-full px-4 md:px-8 py-6 flex flex-col xl:flex-row gap-6 items-start relative min-h-screen">
      {/* SEO Management Layer */}
      <SEO 
        jobs={filteredJobs} 
        filters={filters} 
        searchQuery={searchQuery} 
      />

      {/* Left Sticky Skyscraper Ad - Visible on Large Desktop */}
      <aside className="hidden xl:block shrink-0 sticky top-28 z-20 self-start">
        <AdSpace type="sidebar" label="LEFT PARTNER AD" />
      </aside>

      {/* Main Content */}
      <div className="flex-grow w-full min-w-0">
        <div className="max-w-[1600px] mx-auto space-y-8">
          
          <div id="jobs" className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            {/* Filter Section */}
            <div className="p-6 md:p-10 border-b border-slate-50 bg-slate-50/20">
              <JobFilter 
                filters={filters} 
                setFilters={setFilters} 
                masterData={masterData} 
              />
            </div>

            {/* In-feed Ad for Mobile/Tablet */}
            <div className="xl:hidden px-6 py-4 bg-white">
               <AdSpace type="banner" label="IN-FEED AD UNIT" />
            </div>
            
            {/* Status Header */}
            <div className="px-6 py-6 bg-slate-900 flex items-center justify-between shadow-lg relative z-10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-3 h-3 bg-teal-400 rounded-full animate-ping absolute inset-0"></div>
                  <div className="w-3 h-3 bg-teal-400 rounded-full relative shadow-[0_0_10px_rgba(45,212,191,0.6)]"></div>
                </div>
                <div>
                  <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">Verified Notifications</h2>
                  <p className="text-[8px] font-black text-teal-400 uppercase tracking-widest mt-0.5">Updated Real-Time</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden lg:flex flex-col items-end">
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Database</span>
                   <span className="text-[8px] font-black text-teal-500 uppercase mt-0.5">Status: Secured</span>
                </div>
                <div className="bg-white/5 backdrop-blur-xl text-white text-[12px] font-black px-5 py-2 rounded-xl border border-white/10">
                  {filteredJobs.length} Results
                </div>
              </div>
            </div>

            {/* Table Area */}
            <div className="w-full overflow-hidden bg-white">
              <JobTable jobs={filteredJobs} />
            </div>
          </div>
          
          <div className="w-full flex justify-center">
            <AdSpace type="banner" label="BOTTOM LEADERBOARD" className="max-w-4xl" />
          </div>
          
        </div>
      </div>

      {/* Right Sticky Skyscraper Ad - Visible on Large Desktop */}
      <aside className="hidden xl:block shrink-0 sticky top-28 z-20 self-start">
        <AdSpace type="sidebar" label="RIGHT PARTNER AD" />
      </aside>

      {/* Mobile/Tablet Footer Ads */}
      <div className="xl:hidden w-full flex flex-col gap-6 mt-8 pb-8">
         <AdSpace type="banner" label="MOBILE FOOTER AD" />
      </div>
    </div>
    <Footer />
    </>
  );
};

export default UserView;