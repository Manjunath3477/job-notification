'use client'

import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Shield,
  Award,
  Users,
  Clock,
  ChevronRight,
  Heart
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Latest Jobs', href: '#jobs' },
    { name: 'UPSC Jobs', href: '#' },
    { name: 'SSC Jobs', href: '#' },
    { name: 'Railway Jobs', href: '#' },
    { name: 'Banking Jobs', href: '#' },
    { name: 'State PSC', href: '#' },
  ];

  const resources = [
    { name: 'Exam Calendar', href: '#' },
    { name: 'Syllabus', href: '#' },
    { name: 'Admit Cards', href: '#' },
    { name: 'Results', href: '#' },
    { name: 'Answer Keys', href: '#' },
  ];

  const trustBadges = [
    { icon: <Shield className="w-5 h-5" />, label: 'Verified Jobs' },
    { icon: <Clock className="w-5 h-5" />, label: 'Daily Updates' },
    { icon: <Users className="w-5 h-5" />, label: '50K+ Users' },
    { icon: <Award className="w-5 h-5" />, label: 'Trusted Source' },
  ];

  return (
    <footer className="bg-slate-900 text-white mt-12">
      {/* Trust Badges Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-12 h-12 rounded-xl bg-teal-600/20 flex items-center justify-center text-teal-400">
                  {badge.icon}
                </div>
                <span className="text-sm font-bold text-slate-300">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-600 p-2 rounded-xl">
                <span className="text-white font-black text-xl italic">I</span>
              </div>
              <div>
                <h3 className="font-black text-lg">IndiaJobNotifications</h3>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">.com</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Your trusted source for government job notifications across India. We aggregate and verify job postings from official sources.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={18} />, href: '#', color: 'hover:bg-blue-600' },
                { icon: <Twitter size={18} />, href: '#', color: 'hover:bg-sky-500' },
                { icon: <Instagram size={18} />, href: '#', color: 'hover:bg-pink-600' },
                { icon: <Youtube size={18} />, href: '#', color: 'hover:bg-red-600' },
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href}
                  className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 ${social.color} hover:text-white transition-all`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider mb-4 text-teal-400">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm flex items-center gap-2 group transition-colors"
                  >
                    <ChevronRight size={14} className="text-slate-600 group-hover:text-teal-400 transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider mb-4 text-teal-400">Resources</h4>
            <ul className="space-y-3">
              {resources.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm flex items-center gap-2 group transition-colors"
                  >
                    <ChevronRight size={14} className="text-slate-600 group-hover:text-teal-400 transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider mb-4 text-teal-400">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:contact@indiajobnotifications.com" className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors">
                  <Mail size={18} className="mt-0.5 text-teal-500" />
                  <span className="text-sm">contact@indiajobnotifications.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-slate-400">
                  <MapPin size={18} className="mt-0.5 text-teal-500" />
                  <span className="text-sm">New Delhi, India</span>
                </div>
              </li>
            </ul>

            {/* Newsletter Mini */}
            <div className="mt-6 p-4 bg-slate-800/50 rounded-2xl">
              <p className="text-xs text-slate-400 mb-3">Subscribe for daily updates</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
                />
                <button className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg transition-colors">
                  <Mail size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              © {currentYear} IndiaJobNotifications.com. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Disclaimer</a>
            </div>
            <p className="text-slate-600 text-xs flex items-center gap-1">
              Made with <Heart size={12} className="text-red-500 fill-red-500" /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
