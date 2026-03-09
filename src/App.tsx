import { useState, useEffect, useRef } from 'react';
import {
  Zap, BookOpen, ArrowUp, Flame, Cpu, Database, Radio,
  Brain, Gauge, FolderKanban, ChevronRight
} from 'lucide-react';
import { logger } from './utils/logger';
import Sidebar from './components/Sidebar';
import Fundamentals from './sections/Fundamentals';
import Architecture from './sections/Architecture';
import SparkSQL from './sections/SparkSQL';
import Streaming from './sections/Streaming';
import { MLlib, Performance } from './sections/MLlibAndPerformance';
import Projects from './sections/Projects';

const ALL_SECTION_IDS = [
  'fundamentals', 'what-is-spark', 'why-spark', 'installation', 'first-app',
  'architecture', 'arch-diagram', 'rdd', 'transformations', 'dag', 'caching', 'broadcast',
  'spark-sql', 'dataframes', 'df-operations', 'aggregations', 'window-functions', 'joins', 'sql-queries', 'udfs', 'writing-data',
  'streaming', 'streaming-concepts', 'kafka-source', 'windowed-agg', 'streaming-sinks',
  'mllib', 'ml-pipeline', 'feature-eng', 'classification', 'hyperparameter',
  'performance', 'spark-config', 'optimization', 'data-skew', 'broadcast-join',
  'projects', 'project-1', 'project-2', 'project-3', 'project-4', 'project-5',
];

function App() {
  const [activeSection, setActiveSection] = useState('fundamentals');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Log component mount and cleanup
  useEffect(() => {
    logger.componentMount('App');
    return () => logger.componentUnmount('App');
  }, []);

  // Log when active section changes
  useEffect(() => {
    if (activeSection !== 'fundamentals') {
      logger.navigate('App', `section: ${activeSection}`);
    }
  }, [activeSection]);

  // Tip for students
  useEffect(() => {
    logger.concept(
      'Console Logging',
      'All user interactions are being logged to the console. Open DevTools (F12) → Console to see them. This helps you understand how the app works!'
    );
  }, []);

  useEffect(() {
    const main = mainRef.current;
    if (!main) return;

    const handleScroll = () => {
      setShowScrollTop(main.scrollTop > 400);

      // Compute progress
      const scrollPct = main.scrollTop / (main.scrollHeight - main.clientHeight);
      setProgress(Math.min(scrollPct * 100, 100));

      // Find active section
      let currentSection = ALL_SECTION_IDS[0];
      for (const id of ALL_SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check relative to main container
          if (rect.top <= 150) {
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    main.addEventListener('scroll', handleScroll);
    return () => main.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { id: 'fundamentals', label: 'Fundamentals', icon: <Flame size={18} />, color: 'from-orange-500 to-red-500' },
    { id: 'architecture', label: 'Architecture', icon: <Cpu size={18} />, color: 'from-blue-500 to-cyan-500' },
    { id: 'spark-sql', label: 'Spark SQL', icon: <Database size={18} />, color: 'from-green-500 to-emerald-500' },
    { id: 'streaming', label: 'Streaming', icon: <Radio size={18} />, color: 'from-purple-500 to-pink-500' },
    { id: 'mllib', label: 'MLlib', icon: <Brain size={18} />, color: 'from-yellow-500 to-amber-500' },
    { id: 'performance', label: 'Tuning', icon: <Gauge size={18} />, color: 'from-red-500 to-rose-500' },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={18} />, color: 'from-indigo-500 to-violet-500' },
  ];

  return (
    <div className="h-screen flex bg-slate-950 text-slate-200 overflow-hidden">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-spark to-spark-light transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Sidebar */}
      <Sidebar activeSection={activeSection} />

      {/* Main Content */}
      <div ref={mainRef} className="flex-1 lg:ml-64 overflow-y-auto scroll-smooth" style={{ scrollPaddingTop: '80px' }}>
        {/* Hero */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
          <div className="absolute top-0 right-0 w-96 h-96 bg-spark/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />

          <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-spark to-spark-light flex items-center justify-center pulse-spark">
                <Zap size={28} className="text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700/50 flex items-center gap-1.5">
                  <BookOpen size={12} />
                  Complete Guide
                </span>
                <span className="text-xs font-medium text-spark bg-spark/10 px-3 py-1 rounded-full border border-spark/20">
                  v3.5
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              Apache <span className="gradient-text">Spark</span><br />
              <span className="text-2xl md:text-4xl font-bold text-slate-400">The Easy Guide</span>
            </h1>

            <p className="text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed">
              The easiest way to learn Apache Spark. We use simple analogies and interactive examples to take you from zero to hero, covering everything from fundamentals to 5 real-world projects.
            </p>

            {/* Quick Links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    const el = document.getElementById(link.id);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-800/50 border border-slate-700/30 hover:border-spark/30 hover:bg-slate-800 transition-all"
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center text-white opacity-80 group-hover:opacity-100 transition-opacity`}>
                    {link.icon}
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 group-hover:text-white transition-colors">{link.label}</span>
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-10">
              {[
                { val: '7', label: 'Parts' },
                { val: '5', label: 'Projects' },
                { val: '100+', label: 'Code Examples' },
                { val: '4', label: 'Languages' },
              ].map((stat, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-spark-light">{stat.val}</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Table of Contents Card */}
        <div className="max-w-5xl mx-auto px-6 -mt-4 mb-16">
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-spark" />
              Table of Contents
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
              {[
                { num: '1', title: 'Fundamentals', id: 'fundamentals', sub: 'What is Spark, Setup, First App' },
                { num: '2', title: 'Core Architecture', id: 'architecture', sub: 'RDDs, DAG, Caching, Broadcasts' },
                { num: '3', title: 'Spark SQL & DataFrames', id: 'spark-sql', sub: 'Operations, Joins, Windows, UDFs' },
                { num: '4', title: 'Spark Streaming', id: 'streaming', sub: 'Kafka, Windows, Output Sinks' },
                { num: '5', title: 'MLlib', id: 'mllib', sub: 'Pipelines, Feature Eng, Tuning' },
                { num: '6', title: 'Performance Tuning', id: 'performance', sub: 'Config, Optimization, Skew' },
                { num: '7', title: '5 Real-Time Projects', id: 'projects', sub: 'E-Commerce, Logs, Fraud, ML' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    const el = document.getElementById(item.id);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="group flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-slate-700/30 transition-all text-left"
                >
                  <span className="text-xs font-bold text-spark bg-spark/10 w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                    {item.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-200 group-hover:text-white flex items-center gap-1">
                      {item.title}
                      <ChevronRight size={12} className="text-slate-500 group-hover:text-spark transition-colors" />
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{item.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <main className="max-w-5xl mx-auto px-6 pb-20">
          <Fundamentals />
          <Architecture />
          <SparkSQL />
          <Streaming />
          <MLlib />
          <Performance />
          <Projects />

          {/* Summary */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs font-bold text-spark bg-spark/10 px-3 py-1 rounded-full uppercase tracking-wider">Summary</span>
              <div className="h-px flex-1 bg-gradient-to-r from-spark/30 to-transparent" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-6 gradient-text">Quick Reference</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-5">
                <h4 className="text-sm font-bold text-spark-light mb-3">Core Concepts</h4>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {[
                    'SparkSession — Entry point for all functionality',
                    'RDD — Low-level distributed dataset',
                    'DataFrame — Structured data with schema',
                    'Transformation — Lazy operation (map, filter, join)',
                    'Action — Triggers execution (collect, count, save)',
                    'DAG — Execution plan from transformations',
                    'Catalyst — Query optimizer for Spark SQL',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2"><span className="text-spark">›</span>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-5">
                <h4 className="text-sm font-bold text-spark-light mb-3">Components</h4>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {[
                    'Spark Core — RDDs, scheduling, memory management',
                    'Spark SQL — DataFrames, SQL queries, Hive',
                    'Spark Streaming — Real-time data processing',
                    'MLlib — Machine learning library',
                    'GraphX — Graph processing (Scala only)',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2"><span className="text-spark">›</span>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-5">
                <h4 className="text-sm font-bold text-spark-light mb-3">Best Practices</h4>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {[
                    'Use DataFrames over RDDs (Catalyst optimizer)',
                    'Use Parquet file format (columnar, compressed)',
                    'Partition data by frequently filtered columns',
                    'Cache/persist DataFrames used multiple times',
                    'Use broadcast joins for small tables',
                    'Avoid UDFs when built-in functions exist',
                    'Use Pandas UDFs over Python UDFs',
                    'Enable Adaptive Query Execution (AQE)',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2"><span className="text-spark">›</span>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-5">
                <h4 className="text-sm font-bold text-spark-light mb-3">5 Projects Covered</h4>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {[
                    '1. E-Commerce Analytics Pipeline (Streaming + Kafka)',
                    '2. Log Analysis & Monitoring (Streaming + Alerting)',
                    '3. Customer 360 ETL (Batch + Multi-source)',
                    '4. Fraud Detection System (Streaming + Rules)',
                    '5. Movie Recommendation Engine (ML + ALS)',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2"><span className="text-spark">›</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-10 border-t border-slate-800">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap size={18} className="text-spark" />
              <span className="text-sm font-bold text-white">Apache Spark Complete Guide</span>
            </div>
            <p className="text-xs text-slate-500">
              From Fundamentals to Advanced · 7 Parts · 5 Production-Grade Projects
            </p>
          </footer>
        </main>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-spark hover:bg-spark-dark text-white shadow-lg shadow-spark/20 transition-all z-30 animate-fade-in-up"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

export default App;
