
import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Settings, Briefcase, Database, AlertCircle, Check, X as CloseIcon, Loader2 } from 'lucide-react';
import { Job, MasterData } from '../../types';
import JobForm from './JobForm';
import MasterDataForm from './MasterDataForm';
import { supabase } from '../../lib/supabase';

interface AdminPanelProps {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  masterData: MasterData;
  setMasterData: (data: MasterData) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ jobs, setJobs, masterData, setMasterData }) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'master'>('jobs');
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Utility to format YYYY-MM-DD to DD-MM-YYYY
  const formatDate = (dateStr: string) => {
    if (!dateStr || !dateStr.includes('-')) return dateStr;
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  const handleDeleteJob = async (id: string) => {
    setIsProcessing(true);
    try {
      const { error } = await supabase.from('jobs').delete().eq('id', id);
      if (!error) {
        setJobs(jobs.filter(j => j.id !== id));
      } else {
        alert('Error deleting job: ' + error.message);
      }
    } finally {
      setIsProcessing(false);
      setDeleteConfirmId(null);
    }
  };

  const handleSaveJob = async (job: Job) => {
    setIsProcessing(true);
    try {
      const { error } = await supabase.from('jobs').upsert(job);
      if (!error) {
        const exists = jobs.find(j => j.id === job.id);
        if (exists) {
          setJobs(jobs.map(j => j.id === job.id ? { ...job } : j));
        } else {
          setJobs([{ ...job }, ...jobs]);
        }
        setShowForm(false);
        setEditingJob(null);
      } else {
        alert('Error saving job: ' + error.message);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreateNew = () => {
    setEditingJob(null);
    setShowForm(true);
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-8">
      {isProcessing && (
        <div className="fixed top-24 right-8 z-[300] bg-white px-6 py-4 rounded-2xl shadow-2xl border border-teal-100 flex items-center gap-3 animate-in slide-in-from-right-10">
          <Loader2 className="w-5 h-5 text-teal-600 animate-spin" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Syncing DB...</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Admin Console</h1>
          <p className="text-slate-500 font-medium mt-1">Control center for job listings and site taxonomy</p>
        </div>

        <div className="flex bg-slate-200/50 p-1.5 rounded-2xl border border-slate-200">
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all ${
              activeTab === 'jobs' 
                ? 'bg-white shadow-xl text-teal-700' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Briefcase size={18} />
            Listings
          </button>
          <button 
            onClick={() => setActiveTab('master')}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all ${
              activeTab === 'master' 
                ? 'bg-white shadow-xl text-teal-700' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Database size={18} />
            Categories
          </button>
        </div>
      </div>

      {activeTab === 'jobs' && (
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-4">
              <div className="bg-teal-100 p-3 rounded-2xl text-teal-600">
                <Settings size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-800">Job Inventory</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{jobs.length} total entries</p>
              </div>
            </div>
            <button 
              onClick={handleCreateNew}
              className="bg-teal-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-teal-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-teal-100"
            >
              <Plus size={20} />
              Create Job
            </button>
          </div>

          <div className="overflow-x-auto">
            {jobs.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-slate-300">
                <AlertCircle size={48} className="mb-4 opacity-20" />
                <p className="text-lg font-bold">No jobs available in database</p>
                <p className="text-sm">Click 'Create Job' to add your first notification.</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5">Board & Date</th>
                    <th className="px-8 py-5">Position</th>
                    <th className="px-8 py-5">Location</th>
                    <th className="px-8 py-5 text-right">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-teal-50/30 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="font-black text-slate-900 group-hover:text-teal-700 transition-colors">{job.board}</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-1">Post Date: {formatDate(job.postDate)}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="font-bold text-slate-700 max-w-md truncate text-sm leading-relaxed">{job.positionName}</div>
                        <div className="flex gap-1 mt-2">
                           {job.eligibility.slice(0, 2).map((e, idx) => (
                             <span key={idx} className="text-[9px] font-black bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 uppercase">{e}</span>
                           ))}
                           {job.eligibility.length > 2 && <span className="text-[9px] font-black text-slate-400">+{job.eligibility.length - 2} more</span>}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-xs font-black uppercase tracking-wide text-slate-500">{job.location}</td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-3 h-10">
                          {deleteConfirmId === job.id ? (
                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2">
                              <span className="text-[10px] font-black uppercase text-red-500">Confirm?</span>
                              <button 
                                onClick={() => handleDeleteJob(job.id)}
                                disabled={isProcessing}
                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all disabled:opacity-50"
                                title="Confirm Delete"
                              >
                                <Check size={16} />
                              </button>
                              <button 
                                onClick={() => setDeleteConfirmId(null)}
                                className="p-2 bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 transition-all"
                                title="Cancel"
                              >
                                <CloseIcon size={16} />
                              </button>
                            </div>
                          ) : (
                            <>
                              <button 
                                onClick={() => { setEditingJob(job); setShowForm(true); }}
                                className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-blue-100"
                                title="Edit Listing"
                              >
                                <Edit3 size={18} />
                              </button>
                              <button 
                                onClick={() => setDeleteConfirmId(job.id)}
                                className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                                title="Delete Listing"
                              >
                                <Trash2 size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {activeTab === 'master' && (
        <MasterDataForm 
          masterData={masterData} 
          setMasterData={setMasterData} 
        />
      )}

      {showForm && (
        <JobForm 
          job={editingJob} 
          masterData={masterData}
          onSave={handleSaveJob} 
          onCancel={() => { setShowForm(false); setEditingJob(null); }} 
        />
      )}
    </div>
  );
};

export default AdminPanel;
