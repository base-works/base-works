
import React, { useState, useEffect } from 'react';
import { 
  Hammer, 
  Settings, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  ChevronRight,
  MessageSquare,
  Mail,
  ArrowRight
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="font-black text-2xl tracking-tighter">BASE <span className="text-red-600">WORKS</span></div>
      <a href="#contact" className="bg-black text-white px-6 py-2 text-sm font-bold uppercase tracking-widest hover:bg-red-600 transition-colors">
        Start The Build
      </a>
    </div>
  </nav>
);

const Hero = () => (
  <section className="min-h-screen flex flex-col justify-center px-6 pt-20">
    <div className="max-w-7xl mx-auto w-full">
      <h1 className="text-huge font-black tracking-tighter mb-8">
        WE BUILD.<br />
        <span className="text-red-600">YOU CREATE.</span>
      </h1>
      <p className="text-2xl md:text-3xl font-light max-w-2xl text-gray-600 leading-tight">
        You make the content. <br />
        We build the machine that sells it.
      </p>
      <div className="mt-12">
        <a href="#what-we-do" className="inline-flex items-center gap-2 text-black font-bold uppercase tracking-widest group">
          See the system <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </a>
      </div>
    </div>
  </section>
);

const ServiceCard = ({ icon: Icon, title, desc, step }: { icon: any, title: string, desc: string, step: string }) => (
  <div className="p-8 border border-gray-100 hover:border-red-600 transition-colors group relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 text-gray-100 font-black text-6xl group-hover:text-red-50 transition-colors">
      {step}
    </div>
    <div className="bg-gray-50 p-4 inline-block mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{title}</h3>
    <p className="text-gray-600 leading-relaxed font-medium">
      {desc}
    </p>
  </div>
);

const WhatWeDo = () => (
  <section id="what-we-do" className="py-24 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-sm font-black tracking-[0.3em] uppercase mb-16 text-gray-400">What We Do</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <ServiceCard 
          step="01"
          icon={Hammer} 
          title="The Build" 
          desc="We set up your digital shop. We build the system to sell your products. You do not need to know tech. We handle it." 
        />
        <ServiceCard 
          step="02"
          icon={Settings} 
          title="The Work" 
          desc="We run the system every day. We fix problems. We make updates. We stay in the background. You get the credit." 
        />
        <ServiceCard 
          step="03"
          icon={TrendingUp} 
          title="The Deal" 
          desc="We do not charge a starting fee. We agree on a fair percentage of every sale. We only make money when you make money." 
        />
      </div>
    </div>
  </section>
);

const Principles = () => (
  <section className="py-32 px-6 bg-black text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px]" />
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <h2 className="text-huge font-black tracking-tighter mb-12">
        WE ARE <span className="text-red-600 italic">SHADOW</span> OPERATORS.
      </h2>
      <div className="space-y-6 text-xl md:text-2xl font-light text-gray-400">
        <p>We are the team you do not see.</p>
        <p>We do the heavy lifting.</p>
        <p className="text-white font-bold">We earn trust by doing the work.</p>
        <p>We build systems that grow over time.</p>
      </div>
    </div>
  </section>
);

const ConsultantAI = () => {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const analyzeProject = async () => {
    if (!niche || niche.length < 3) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am a content creator in the "${niche}" niche. As Base Works, describe exactly what "machine" (digital infrastructure) you would build for me to sell my products. Keep it brief, professional, and slightly mysterious. Use short, punchy sentences.`,
        config: {
          systemInstruction: "You are the strategist for Base Works, a shadow agency that builds digital shops for creators. Your tone is silent, professional, and results-oriented. You use terms like 'The Machine', 'Shadow Ops', and 'Silent Growth'.",
        }
      });
      setResult(response.text || "Connection failed. Try again.");
    } catch (error) {
      console.error(error);
      setResult("Base Works is currently offline. Reach out directly via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-8 md:p-12 mt-24 border border-gray-200">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-black mb-4 uppercase">Test the Machine</h3>
        <p className="text-gray-600 mb-8">Input your niche to see how we'd build your infrastructure.</p>
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. Fitness Coaching, Digital Art, Finance"
            className="flex-1 bg-white border-2 border-black px-6 py-4 text-lg outline-none focus:border-red-600 transition-colors"
          />
          <button 
            onClick={analyzeProject}
            disabled={loading}
            className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-red-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Zap className="animate-spin w-5 h-5" /> : 'Run Audit'}
          </button>
        </div>
        
        {result && (
          <div className="mt-8 p-6 bg-white border-l-4 border-red-600 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Shadow Ops Briefing:</div>
            <p className="text-lg leading-relaxed text-gray-800 italic">"{result}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Contact = () => (
  <section id="contact" className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 uppercase">
            Start The <span className="text-red-600">Build.</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            If you are ready to work, contact us. We don't do pitch decks. We do results.
          </p>
        </div>
        <div className="space-y-12">
          <div className="group">
            <h4 className="text-sm font-black tracking-widest uppercase text-gray-400 mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" /> WhatsApp
            </h4>
            <a 
              href="https://wa.me/2347083652671" 
              className="text-2xl md:text-4xl font-bold hover:text-red-600 transition-colors break-all"
            >
              +234 7083652671
            </a>
          </div>
          <div className="group">
            <h4 className="text-sm font-black tracking-widest uppercase text-gray-400 mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </h4>
            <a 
              href="mailto:baseworks.official@gmail.com" 
              className="text-2xl md:text-4xl font-bold hover:text-red-600 transition-colors break-all"
            >
              baseworks.official@gmail.com
            </a>
          </div>
        </div>
      </div>
      
      <ConsultantAI />
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 px-6 bg-black text-white">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/10 pt-12">
      <div className="text-center md:text-left">
        <h3 className="text-3xl font-black tracking-tighter mb-1">BASE WORKS</h3>
        <p className="text-red-600 font-bold uppercase tracking-widest text-sm">Solid. Silent. Profitable.</p>
      </div>
      <div className="text-gray-500 text-sm">
        © {new Date().getFullYear()} Base Works. All rights reserved. Built for creators.
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen selection:bg-red-600 selection:text-white">
      <Navbar />
      <Hero />
      <WhatWeDo />
      <Principles />
      <Contact />
      <Footer />
    </div>
  );
}
