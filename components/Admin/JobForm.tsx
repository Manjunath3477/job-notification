
import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, Info } from 'lucide-react';
import { Job, MasterData } from '../../types';

interface JobFormProps {
  job: Job | null;
  masterData: MasterData;
  onSave: (job: Job) => void;
  onCancel: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ job, masterData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Job>({
    id: '',
    postDate: new Date().toISOString().split('T')[0],
    board: '',
    positionName: '',
    eligibility: [],
    location: '',
    pdfUrl: '',
    lastDate: '',
    applyUrl: ''
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (job) {
      setFormData({ ...job });
    } else {
      setFormData(prev => ({
        ...prev,
        board: masterData.boards[0] || '',
        location: masterData.locations[0] || ''
      }));
    }
  }, [job, masterData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.board) { setError('Please select a Recruitment Board'); return; }
    if (!formData.location) { setError('Please select a Job Location'); return; }
    if (!formData.positionName) { setError('Position name is required'); return; }

    const finalJob = { ...formData };
    if (!finalJob.id) {
      finalJob.id = `job-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }

    onSave(finalJob);
  };

  const toggleEligibility = (el: string) => {
    setFormData(prev => ({
      ...prev,
      eligibility: prev.eligibility.includes(el)
        ? prev.eligibility.filter(item => item !== el)
        : [...prev.eligibility, el]
    }));
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-white rounded-[3.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300 border border-slate-200">
        
        {/* Header */}
        <div className="p-8 md:p-12 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-8 bg-teal-600 rounded-full"></span>
              {job ? 'Edit Notification' : 'New Notification'}
            </h3>
            <p className="text-[11px] font-black text-teal-600 uppercase tracking-[0.3em] mt-2 ml-5">Live Database Access</p>
          </div>
          <button 
            onClick={onCancel} 
            type="button" 
            className="p-5 bg-white border-2 border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 rounded-3xl transition-all shadow-sm active:scale-90 hover:rotate-90"
          >
            <X size={28} strokeWidth={3} />
          </button>
        </div>

        {/* Scrollable Form Content */}
        {/* Added large pb-40 to ensure dropdowns have "logical" space to open downwards */}
        <form onSubmit={handleSubmit} className="p-8 md:p-12 overflow-y-auto flex-grow space-y-10 scrollbar-thin pb-40">
          {error && (
            <div className="bg-red-50 border-2 border-red-100 text-red-600 px-8 py-6 rounded-[2rem] flex items-center gap-4 text-sm font-black animate-in slide-in-from-top-4">
              <AlertCircle size={24} strokeWidth={3} />
              {error}
            </div>
          )}

          {/* Section 1: Board & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] px-2 flex items-center gap-2">
                <Info size={12} className="text-teal-500" />
                Recruitment Board
              </label>
              <div className="relative group">
                <select 
                  required
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-6 py-5 text-sm font-black text-slate-900 focus:ring-8 focus:ring-teal-500/5 focus:border-teal-500 focus:bg-white outline-none transition-all cursor-pointer shadow-sm appearance-none"
                  value={formData.board}
                  onChange={e => setFormData(prev => ({ ...prev, board: e.target.value }))}
                >
                  <option value="" disabled>Select Organization</option>
                  {masterData.boards.map(b => <option key={b} value={b} className="font-bold py-2">{b}</option>)}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] px-2">Post Date</label>
              <input 
                type="date"
                required
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-6 py-5 text-sm font-black text-slate-900 focus:ring-8 focus:ring-teal-500/5 focus:border-teal-500 focus:bg-white outline-none transition-all shadow-sm"
                value={formData.postDate}
                onChange={e => setFormData(prev => ({ ...prev, postDate: e.target.value }))}
              />
            </div>
          </div>

          {/* Section 2: Position */}
          <div className="space-y-3">
            <label className="block text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] px-2">Job Position / Full Title</label>
            <textarea 
              required
              rows={3}
              placeholder="Ex: recruitment for Assistant Manager Grade-A 2024..."
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-[2rem] px-8 py-6 text-sm font-black text-slate-900 focus:ring-8 focus:ring-teal-500/5 focus:border-teal-500 focus:bg-white outline-none transition-all shadow-sm resize-none placeholder:text-slate-300 placeholder:italic"
              value={formData.positionName}
              onChange={e => setFormData(prev => ({ ...prev, positionName: e.target.value }))}
            />
          </div>

          {/* Section 3: Eligibility */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="block text-[11px] font-black uppercase text-slate-400 tracking-[0.2em]">Required Eligibility</label>
              <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-2 py-0.5 rounded">Multiple Select</span>
            </div>
            <div className="flex flex-wrap gap-3 p-8 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] shadow-inner">
              {masterData.eligibilities.length === 0 ? (
                <p className="text-xs font-bold text-slate-400 italic">No eligibility tags found. Manage categories first.</p>
              ) : (
                masterData.eligibilities.map(el => (
                  <button
                    type="button"
                    key={el}
                    onClick={() => toggleEligibility(el)}
                    className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase transition-all border-2 ${
                      formData.eligibility.includes(el)
                        ? 'bg-teal-600 border-teal-600 text-white shadow-xl shadow-teal-100 scale-105 rotate-1'
                        : 'bg-white border-slate-200 text-slate-400 hover:border-teal-300 hover:text-teal-600'
                    }`}
                  >
                    {el}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Section 4: Location & Last Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] px-2">Job Location</label>
              <div className="relative group">
                <select 
                  required
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-6 py-5 text-sm font-black text-slate-900 focus:ring-8 focus:ring-teal-500/5 focus:border-teal-500 focus:bg-white outline-none transition-all cursor-pointer shadow-sm appearance-none"
                  value={formData.location}
                  onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                >
                  <option value="" disabled>Select State/Region</option>
                  {masterData.locations.map(l => <option key={l} value={l} className="font-bold py-2">{l}</option>)}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] px-2 text-red-500">Application Deadline</label>
              <input 
                type="date"
                required
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-6 py-5 text-sm font-black text-slate-900 focus:ring-8 focus:ring-red-500/5 focus:border-red-500 focus:bg-white outline-none transition-all shadow-sm"
                value={formData.lastDate}
                onChange={e => setFormData(prev => ({ ...prev, lastDate: e.target.value }))}
              />
            </div>
          </div>

          {/* Section 5: URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] px-2">Official PDF Link</label>
              <input 
                type="text"
                required
                placeholder="https://..."
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-6 py-5 text-sm font-black text-slate-900 focus:ring-8 focus:ring-teal-500/5 focus:border-teal-500 focus:bg-white outline-none transition-all shadow-sm"
                value={formData.pdfUrl}
                onChange={e => setFormData(prev => ({ ...prev, pdfUrl: e.target.value }))}
              />
            </div>
            <div className="space-y-3">
              <label className="block text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] px-2">Direct Apply URL</label>
              <input 
                type="text"
                required
                placeholder="https://..."
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-6 py-5 text-sm font-black text-slate-900 focus:ring-8 focus:ring-teal-500/5 focus:border-teal-500 focus:bg-white outline-none transition-all shadow-sm"
                value={formData.applyUrl}
                onChange={e => setFormData(prev => ({ ...prev, applyUrl: e.target.value }))}
              />
            </div>
          </div>

          {/* Action Button - Floating within the scrollable content for easy access */}
          <div className="pt-10">
            <button 
              type="submit"
              className="w-full bg-teal-900 text-white font-black uppercase tracking-[0.4em] text-sm py-8 rounded-[2.5rem] hover:bg-teal-950 active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(13,148,136,0.3)] group"
            >
              <Save size={24} className="group-hover:scale-110 transition-transform" strokeWidth={3} />
              {job ? 'Confirm Update' : 'Publish to Portal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
