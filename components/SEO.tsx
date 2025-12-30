
'use client'

import React, { useEffect, useMemo } from 'react';
import { Job } from '@/types';

interface SEOProps {
  jobs: Job[];
  filters: { board: string; location: string; eligibility: string };
  searchQuery: string;
}

const SEO: React.FC<SEOProps> = ({ jobs, filters, searchQuery }) => {
  // Enhanced Title Strategy: Mix user context with high-ranking keywords
  const title = useMemo(() => {
    const base = "India Job Notifications";
    if (searchQuery) return `${searchQuery} Jobs & Latest Alerts | ${base}`;
    
    let context = "";
    if (filters.board !== 'All Boards') context = `${filters.board} `;
    if (filters.location !== 'All Locations') context += `Jobs in ${filters.location} `;
    if (filters.eligibility !== 'All Degrees') context += `for ${filters.eligibility} `;
    
    if (!context) return `${base} | Latest Govt Jobs, Sarkari Result & Latest Job Alerts 2024`;
    return `Latest ${context.trim()} Notification 2024 | ${base}`;
  }, [searchQuery, filters.board, filters.location, filters.eligibility]);

  // Enhanced Description Strategy: Dynamic, keyword-rich, and high CTR
  const description = useMemo(() => {
    const keywords = "jobs, notifications, india jobs, job notifications, latest job alerts, latest jobs, government jobs";
    if (jobs.length > 0) {
      const latestJob = jobs[0];
      return `New ${latestJob.board} Notification: Apply for ${latestJob.positionName}. We provide the fastest ${keywords} and recruitment updates. Deadine: ${latestJob.lastDate}. Explore all vacancies now.`;
    }
    return `Discover the best portal for ${keywords}. Get instant India job notifications, government job alerts, and the latest recruitment news daily. Trusted by thousands of job seekers across India.`;
  }, [jobs]);

  // Advanced JSON-LD: Using ItemList to wrap JobPostings for better SERP visibility
  const jsonLd = useMemo(() => {
    const jobListItems = jobs.slice(0, 15).map((job, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@context": "https://schema.org/",
        "@type": "JobPosting",
        "title": job.positionName,
        "description": `${job.positionName} vacancy at ${job.board}. Requirement: ${job.eligibility.join(', ')}. Find more latest jobs and India job notifications at our portal.`,
        "identifier": {
          "@type": "PropertyValue",
          "name": job.board,
          "value": job.id
        },
        "datePosted": job.postDate,
        "validThrough": job.lastDate,
        "employmentType": "FULL_TIME",
        "hiringOrganization": {
          "@type": "Organization",
          "name": job.board,
          "logo": "https://indiajobnotifications.com/logo.png"
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": job.location,
            "addressRegion": job.location,
            "addressCountry": "IN"
          }
        }
      }
    }));

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": title,
      "description": description,
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": jobs.length,
        "itemListElement": jobListItems
      }
    };
  }, [jobs, title, description]);

  useEffect(() => {
    // Update Document Title
    document.title = title;

    // Update Meta Description with high precision
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update Meta Keywords - focusing on the user's requested high-value terms
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    const dynamicKeywords = [
      "jobs", "notifications", "india jobs", "job notifications", 
      "latest job alerts", "latest jobs", "government jobs", 
      "india job notifications", filters.board, filters.location, 
      "sarkari result", "recruitment 2024"
    ].filter(k => k && k !== 'All Boards' && k !== 'All Locations').join(', ');
    metaKeywords.setAttribute('content', dynamicKeywords);

    // Inject/Update JSON-LD script block
    let scriptTag = document.getElementById('seo-json-ld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'seo-json-ld';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLd);

    // Update Canonical to prevent duplicate content issues
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + window.location.pathname);

    // OG Title & Twitter Title syncing
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const twTitle = document.querySelector('meta[property="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);

  }, [title, description, jsonLd, filters]);

  return null;
};

export default SEO;
