import { useState, useEffect, useRef } from 'react';
import {
  Zap, BookOpen, ArrowUp, Flame, Cpu, Database, Radio,
  Brain, Gauge, FolderKanban, ChevronRight
} from 'lucide-react';
import { logger } from './utils/logger';
import Sidebar, { type Course } from './components/Sidebar';
import Fundamentals from './sections/Fundamentals';
import Architecture from './sections/Architecture';
import SparkSQL from './sections/SparkSQL';
import Streaming from './sections/Streaming';
import { MLlib, Performance } from './sections/MLlibAndPerformance';
import Projects from './sections/Projects';
import Assignments from './sections/Assignments';
import Cheatsheet from './sections/Cheatsheet';
import {
  KafkaFundamentals, KafkaArchitecture, KafkaHandsOn, KafkaProducersConsumers,
  KafkaInternals, KafkaReplication, KafkaStreams, KafkaProduction,
  KafkaAssignments, KafkaInterview,
} from './sections/kafka';

const SPARK_SECTION_IDS = [
  'fundamentals', 'what-is-spark', 'why-spark', 'installation', 'first-app',
  'architecture', 'arch-diagram', 'rdd', 'transformations', 'dag', 'caching', 'broadcast',
  'spark-sql', 'dataframes', 'df-operations', 'aggregations', 'window-functions', 'joins', 'sql-queries', 'udfs', 'writing-data',
  'streaming', 'streaming-concepts', 'streaming-checkpoint', 'kafka-source', 'windowed-agg', 'streaming-sinks',
  'mllib', 'ml-pipeline', 'feature-eng', 'classification', 'hyperparameter',
  'performance', 'spark-config', 'optimization', 'data-skew', 'broadcast-join',
  'projects', 'project-1', 'project-2', 'project-3', 'project-4', 'project-5',
  'assignments', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10', 'a11', 'a12', 'a13', 'a14', 'a15', 'a16', 'a17', 'a18',
  'cheatsheet',
];

const KAFKA_SECTION_IDS = [
  'kafka-fundamentals', 'kafka-why-exists', 'kafka-event-modeling', 'kafka-use-cases',
  'kafka-architecture', 'kafka-core-components', 'kafka-partition-strategy',
  'kafka-handson', 'kafka-docker-install', 'kafka-docker-start', 'kafka-verify', 'kafka-create-topic', 'kafka-produce', 'kafka-consume',
  'kafka-producers-consumers', 'kafka-producer-workflow', 'kafka-python-producer', 'kafka-python-consumer', 'kafka-order-pipeline-assignment',
  'kafka-internals', 'kafka-replication', 'kafka-failure-simulation',
  'kafka-streams', 'kafka-production', 'kafka-assignments', 'kafka-interview',
];

function App() {
  const [course, setCourse] = useState<Course>('spark');
  const [activeSection, setActiveSection] = useState('fundamentals');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const ALL_SECTION_IDS = course === 'kafka' ? KAFKA_SECTION_IDS : SPARK_SECTION_IDS;

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

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const handleScroll = () => {
      setShowScrollTop(main.scrollTop > 400);

      // Compute progress
      const scrollPct = main.scrollTop / (main.scrollHeight - main.clientHeight);
      setProgress(Math.min(scrollPct * 100, 100));

      // Find active section (use first ID of current course)
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
  }, [course]);

  const scrollToTop = () => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchCourse = (c: Course) => {
    setCourse(c);
    setActiveSection(c === 'kafka' ? 'kafka-fundamentals' : 'fundamentals');
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = course === 'spark' ? [
    { id: 'fundamentals', label: 'Fundamentals', icon: <Flame size={18} />, color: 'from-orange-500 to-red-500' },
    { id: 'architecture', label: 'Architecture', icon: <Cpu size={18} />, color: 'from-blue-500 to-cyan-500' },
    { id: 'spark-sql', label: 'Spark SQL', icon: <Database size={18} />, color: 'from-green-500 to-emerald-500' },
    { id: 'streaming', label: 'Streaming', icon: <Radio size={18} />, color: 'from-purple-500 to-pink-500' },
    { id: 'mllib', label: 'MLlib', icon: <Brain size={18} />, color: 'from-yellow-500 to-amber-500' },
    { id: 'performance', label: 'Tuning', icon: <Gauge size={18} />, color: 'from-red-500 to-rose-500' },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={18} />, color: 'from-indigo-500 to-violet-500' },
  ] : [
    { id: 'kafka-fundamentals', label: 'Fundamentals', icon: <Flame size={18} />, color: 'from-orange-500 to-red-500' },
    { id: 'kafka-architecture', label: 'Architecture', icon: <Database size={18} />, color: 'from-blue-500 to-cyan-500' },
    { id: 'kafka-handson', label: 'Hands-on', icon: <Radio size={18} />, color: 'from-green-500 to-emerald-500' },
    { id: 'kafka-producers-consumers', label: 'Producers & Consumers', icon: <Radio size={18} />, color: 'from-purple-500 to-pink-500' },
    { id: 'kafka-internals', label: 'Internals', icon: <Cpu size={18} />, color: 'from-yellow-500 to-amber-500' },
    { id: 'kafka-streams', label: 'Kafka Streams', icon: <Gauge size={18} />, color: 'from-teal-500 to-cyan-500' },
    { id: 'kafka-production', label: 'Production', icon: <FolderKanban size={18} />, color: 'from-indigo-500 to-violet-500' },
    { id: 'kafka-interview', label: '100 Interview Qs', icon: <Brain size={18} />, color: 'from-rose-500 to-pink-500' },
  ];

  return (
    <div className="h-screen flex bg-slate-950 text-slate-200 overflow-hidden">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-slate-800">
        <div
          className={`h-full transition-all duration-300 ${course === 'kafka' ? 'bg-gradient-to-r from-kafka to-kafka-light' : 'bg-gradient-to-r from-spark to-spark-light'}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Course switcher — always visible at top */}
      <div className="fixed top-1 left-0 right-0 z-40 flex justify-center lg:justify-end lg:pr-4 lg:pl-[17rem]">
        <div className="flex gap-1 rounded-lg bg-slate-800/90 border border-slate-700/80 p-1 shadow-lg backdrop-blur-sm">
          <button
            onClick={() => switchCourse('spark')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${course === 'spark' ? 'bg-spark text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
          >
            Spark
          </button>
          <button
            onClick={() => switchCourse('kafka')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${course === 'kafka' ? 'bg-kafka text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
          >
            Kafka
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar activeSection={activeSection} course={course} />

      {/* Main Content */}
      <div ref={mainRef} className="flex-1 lg:ml-64 overflow-y-auto scroll-smooth pt-10" style={{ scrollPaddingTop: '80px' }}>
        {/* Hero */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] ${course === 'kafka' ? 'bg-kafka/5' : 'bg-spark/5'}`} />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />

          <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${course === 'kafka' ? 'bg-gradient-to-br from-kafka to-kafka-light' : 'bg-gradient-to-br from-spark to-spark-light pulse-spark'}`}>
                <Zap size={28} className="text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700/50 flex items-center gap-1.5">
                  <BookOpen size={12} />
                  Complete Guide
                </span>
                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${course === 'kafka' ? 'text-kafka bg-kafka/10 border-kafka/20' : 'text-spark bg-spark/10 border-spark/20'}`}>
                  {course === 'kafka' ? '6–8 weeks' : 'v3.5'}
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              {course === 'kafka' ? (
                <>Apache <span className="text-kafka-light">Kafka</span><br />
                <span className="text-2xl md:text-4xl font-bold text-slate-400">Streaming &amp; Event-Driven Mastery</span></>
              ) : (
                <>Apache <span className="gradient-text">Spark</span><br />
                <span className="text-2xl md:text-4xl font-bold text-slate-400">The Easy Guide</span></>
              )}
            </h1>

            <p className="text-lg text-slate-400 max-w-2xl mb-4 leading-relaxed">
              {course === 'kafka'
                ? 'Structured Kafka course with step-by-step labs and 100 FAANG-style interview questions for Streaming Data Engineer, Platform Engineer, and Distributed Systems roles.'
                : 'The easiest way to learn Apache Spark. We use simple analogies and interactive examples to take you from zero to hero, covering everything from fundamentals to 5 real-world projects.'}
            </p>
            <p className="text-sm text-slate-500 max-w-2xl mb-10">
              {course === 'kafka'
                ? 'Covers event streaming fundamentals, Kafka architecture, Docker hands-on, producers & consumers, internals, replication, Kafka Streams, production design, and 100 interview Q&amp;As.'
                : <>Every section includes <strong className="text-slate-400">&quot;In Plain English&quot;</strong> explanations — so even kids can follow along! Look for the 👋 callouts and short &quot;simple words&quot; notes under each topic.</>}
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
              {(course === 'kafka' ? [
                { val: '8', label: 'Weeks' },
                { val: '100', label: 'Interview Qs' },
                { val: '5', label: 'Labs' },
                { val: '60–80', label: 'Hours' },
              ] : [
                { val: '7', label: 'Parts' },
                { val: '5', label: 'Projects' },
                { val: '100+', label: 'Code Examples' },
                { val: '4', label: 'Languages' },
              ]).map((stat, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <span className={`text-2xl font-black ${course === 'kafka' ? 'text-kafka-light' : 'text-spark-light'}`}>{stat.val}</span>
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
              <BookOpen size={16} className={course === 'kafka' ? 'text-kafka' : 'text-spark'} />
              Table of Contents
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
              {(course === 'kafka' ? [
                { num: '1', title: 'Week 1: Fundamentals', id: 'kafka-fundamentals', sub: 'Event streaming, modeling, use cases' },
                { num: '2', title: 'Week 2: Architecture', id: 'kafka-architecture', sub: 'Broker, topic, partition' },
                { num: '3', title: 'Week 3: Hands-on', id: 'kafka-handson', sub: 'Docker, create topic, produce/consume' },
                { num: '4', title: 'Week 4: Producers & Consumers', id: 'kafka-producers-consumers', sub: 'Python, order pipeline' },
                { num: '5', title: 'Week 5: Internals', id: 'kafka-internals', sub: 'Commit log, zero-copy' },
                { num: '6', title: 'Week 6: Replication', id: 'kafka-replication', sub: 'Leader, ISR, failure simulation' },
                { num: '7', title: 'Week 7: Kafka Streams', id: 'kafka-streams', sub: 'Map, filter, join, window' },
                { num: '8', title: 'Week 8: Production', id: 'kafka-production', sub: 'Flink, Spark, data lake' },
                { num: '9', title: 'Labs & 100 Interview Qs', id: 'kafka-assignments', sub: 'FAANG-style questions' },
              ] : [
                { num: '1', title: 'Fundamentals', id: 'fundamentals', sub: 'What is Spark, Setup, First App' },
                { num: '2', title: 'Core Architecture', id: 'architecture', sub: 'RDDs, DAG, Caching, Broadcasts' },
                { num: '3', title: 'Spark SQL & DataFrames', id: 'spark-sql', sub: 'Operations, Joins, Windows, UDFs' },
                { num: '4', title: 'Spark Streaming', id: 'streaming', sub: 'Kafka, Windows, Output Sinks' },
                { num: '5', title: 'MLlib', id: 'mllib', sub: 'Pipelines, Feature Eng, Tuning' },
                { num: '6', title: 'Performance Tuning', id: 'performance', sub: 'Config, Optimization, Skew' },
                { num: '7', title: '5 Real-Time Projects', id: 'projects', sub: 'E-Commerce, Logs, Fraud, ML' },
                { num: '8', title: 'Gamified Assignments', id: 'assignments', sub: '18 tasks, badges, 1000+ pts' },
                { num: '9', title: 'Cheatsheet', id: 'cheatsheet', sub: 'PySpark quick reference' },
              ]).map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    const el = document.getElementById(item.id);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="group flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-slate-700/30 transition-all text-left"
                >
                  <span className={`text-xs font-bold w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${course === 'kafka' ? 'text-kafka bg-kafka/10' : 'text-spark bg-spark/10'}`}>
                    {item.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-200 group-hover:text-white flex items-center gap-1">
                      {item.title}
                      <ChevronRight size={12} className={course === 'kafka' ? 'text-slate-500 group-hover:text-kafka transition-colors' : 'text-slate-500 group-hover:text-spark transition-colors'} />
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
          {course === 'kafka' ? (
            <>
              <KafkaFundamentals />
              <KafkaArchitecture />
              <KafkaHandsOn />
              <KafkaProducersConsumers />
              <KafkaInternals />
              <KafkaReplication />
              <KafkaStreams />
              <KafkaProduction />
              <KafkaAssignments />
              <KafkaInterview />
            </>
          ) : (
            <>
              <Fundamentals />
              <Architecture />
              <SparkSQL />
              <Streaming />
              <MLlib />
              <Performance />
              <Projects />
              <Assignments />
              <Cheatsheet />
            </>
          )}

          {/* Summary (Spark only) */}
          {course === 'spark' && (
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
          )}

          {/* Footer */}
          <footer className="text-center py-10 border-t border-slate-800">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap size={18} className={course === 'kafka' ? 'text-kafka' : 'text-spark'} />
              <span className="text-sm font-bold text-white">
                {course === 'kafka' ? 'Apache Kafka & Spark Complete Guides' : 'Apache Spark Complete Guide'}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {course === 'kafka' ? 'Kafka: 8 weeks · 100 Interview Qs · Labs with Docker' : 'From Fundamentals to Advanced · 7 Parts · 5 Projects · Gamified Assignments (18 tasks, 7 badges)'}
            </p>
          </footer>
        </main>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 rounded-full text-white shadow-lg transition-all z-30 animate-fade-in-up ${course === 'kafka' ? 'bg-kafka hover:bg-kafka-dark' : 'bg-spark hover:bg-spark-dark shadow-spark/20'}`}
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

export default App;
