import React from 'react';

interface HeroSectionProps {
  totalJobs: number;
  totalBoards: number;
  onSubscribeClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ totalJobs, totalBoards, onSubscribeClick }) => {
  return (
    <section style={{ background: '#f8f9fa', borderRadius: '8px', padding: '32px', marginBottom: '24px', border: '1px solid #e0e0e0' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#222', marginBottom: '12px' }}>
        India Job Notifications
      </h1>
      <p style={{ fontSize: '1rem', color: '#444', marginBottom: '20px' }}>
        Find the latest government jobs in India. Simple, fast, and always up-to-date.
      </p>
      <div style={{ display: 'flex', gap: '32px', marginBottom: '20px' }}>
        <div>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#1976d2' }}>{totalJobs}</span>
          <span style={{ marginLeft: '8px', color: '#555' }}>Active Jobs</span>
        </div>
        <div>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#388e3c' }}>{totalBoards}</span>
          <span style={{ marginLeft: '8px', color: '#555' }}>Boards</span>
        </div>
      </div>
      <button 
        onClick={onSubscribeClick}
        style={{ padding: '10px 24px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Get Job Alerts
      </button>
    </section>
  );
};

export default HeroSection;
