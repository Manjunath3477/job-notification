
'use client'

import React, { useState } from 'react';
import { Plus, X, ListPlus, Check } from 'lucide-react';
import { MasterData } from '@/types';

interface MasterDataFormProps {
  masterData: MasterData;
  setMasterData: (data: MasterData | ((prev: MasterData) => MasterData)) => void;
}

const MasterDataForm: React.FC<MasterDataFormProps> = ({ masterData, setMasterData }) => {
  const [newBoard, setNewBoard] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newEligibility, setNewEligibility] = useState('');
  const [confirmRemove, setConfirmRemove] = useState<{ category: string, value: string } | null>(null);

  const addItem = (category: keyof MasterData, value: string, setter: (v: string) => void) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (masterData[category].includes(trimmed)) {
      alert('This entry already exists in the ' + category + ' list.');
      return;
    }
    setMasterData(prev => ({
      ...prev,
      [category]: [...prev[category], trimmed]
    }));
    setter('');
  };

  const removeItem = (category: keyof MasterData, value: string) => {
    setMasterData(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item !== value)
    }));
    setConfirmRemove(null);
  };

  const renderSection = (title: string, category: keyof MasterData, value: string, setter: (v: string) => void) => (
    <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-10 flex flex-col h-full hover:shadow-teal-100 transition-all duration-500">
      <div className="flex items-center gap-5 mb-10">
        <div className="bg-teal-50 p-4 rounded-3xl text-teal-700 shadow-sm">
          <ListPlus size={32} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{masterData[category].length} defined</p>
        </div>
      </div>
      
      <div className="flex gap-3 mb-10">
        <input 
          type="text"
          className="flex-grow bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 text-sm font-black text-slate-900 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white outline-none transition-all placeholder:text-slate-300 shadow-inner"
          placeholder={`Add ${title.toLowerCase()}...`}
          value={value}
          onChange={e => setter(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addItem(category, value, setter);
            }
          }}
        />
        <button 
          onClick={() => addItem(category, value, setter)}
          className="bg-teal-700 text-white p-5 rounded-2xl hover:bg-teal-800 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-teal-100"
          title={`Add ${title}`}
        >
          <Plus size={28} />
        </button>
      </div>

      <div className="flex flex-wrap gap-3 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin">
        {masterData[category].length === 0 ? (
          <p className="text-sm font-bold text-slate-300 italic py-6 text-center w-full">No entries found.</p>
        ) : (
          masterData[category].map(item => (
            <div 
              key={item} 
              className={`flex items-center gap-3 transition-all px-6 py-3.5 rounded-2xl border-2 ${
                confirmRemove?.category === category && confirmRemove?.value === item
                ? 'bg-red-50 border-red-200 scale-105 shadow-xl z-10'
                : 'bg-slate-50 text-slate-900 border-slate-100 hover:border-teal-300 hover:bg-white group'
              }`}
            >
              <span className="text-[11px] font-black uppercase tracking-widest">
                {item}
              </span>
              
              {confirmRemove?.category === category && confirmRemove?.value === item ? (
                <div className="flex items-center gap-2 ml-2">
                  <button 
                    onClick={() => removeItem(category, item)}
                    className="bg-red-600 text-white p-1.5 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                    title="Confirm Remove"
                  >
                    <Check size={14} strokeWidth={4} />
                  </button>
                  <button 
                    onClick={() => setConfirmRemove(null)}
                    className="bg-slate-200 text-slate-600 p-1.5 rounded-lg hover:bg-slate-300 transition-colors shadow-sm"
                    title="Cancel"
                  >
                    <X size={14} strokeWidth={4} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setConfirmRemove({ category, value: item })}
                  className="text-slate-200 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-white"
                  title="Remove Entry"
                >
                  <X size={16} strokeWidth={3} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
      {renderSection('Recruitment Boards', 'boards', newBoard, setNewBoard)}
      {renderSection('Service Locations', 'locations', newLocation, setNewLocation)}
      {renderSection('Eligibility Tags', 'eligibilities', newEligibility, setNewEligibility)}
    </div>
  );
};

export default MasterDataForm;
