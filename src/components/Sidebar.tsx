import { useState, useEffect } from 'react';
import {
  Flame, Cpu, Database, Radio, Brain, Gauge,
  FolderKanban, ChevronDown, ChevronRight, Menu, X,
  Zap, Trophy, ClipboardList, MessageCircle, Server, Terminal, Layers, Shield, BarChart3
} from 'lucide-react';
import { logger } from '../utils/logger';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: { id: string; label: string }[];
}

const navItems: NavItem[] = [
  {
    id: 'fundamentals',
    label: 'Fundamentals',
    icon: <Flame size={16} />,
    children: [
      { id: 'what-is-spark', label: 'What is Spark?' },
      { id: 'why-spark', label: 'Why Spark?' },
      { id: 'installation', label: 'Installation & Setup' },
      { id: 'first-app', label: 'First Application' },
    ],
  },
  {
    id: 'architecture',
    label: 'Core Architecture',
    icon: <Cpu size={16} />,
    children: [
      { id: 'arch-diagram', label: 'Architecture Diagram' },
      { id: 'rdd', label: 'RDD Basics' },
      { id: 'transformations', label: 'Transformations vs Actions' },
      { id: 'dag', label: 'DAG & Lazy Evaluation' },
      { id: 'caching', label: 'Persistence & Caching' },
      { id: 'broadcast', label: 'Broadcast & Accumulators' },
    ],
  },
  {
    id: 'spark-sql',
    label: 'Spark SQL & DataFrames',
    icon: <Database size={16} />,
    children: [
      { id: 'dataframes', label: 'Creating DataFrames' },
      { id: 'df-operations', label: 'DataFrame Operations' },
      { id: 'aggregations', label: 'Aggregations' },
      { id: 'window-functions', label: 'Window Functions' },
      { id: 'joins', label: 'Joins' },
      { id: 'sql-queries', label: 'SQL Queries' },
      { id: 'udfs', label: 'UDFs' },
      { id: 'writing-data', label: 'Writing Data' },
    ],
  },
  {
    id: 'streaming',
    label: 'Spark Streaming',
    icon: <Radio size={16} />,
    children: [
      { id: 'streaming-concepts', label: 'Streaming Concepts' },
      { id: 'streaming-checkpoint', label: 'Checkpointing & Exactly-Once' },
      { id: 'kafka-source', label: 'Kafka Integration' },
      { id: 'windowed-agg', label: 'Windowed Aggregations' },
      { id: 'streaming-sinks', label: 'Output Sinks' },
    ],
  },
  {
    id: 'mllib',
    label: 'MLlib (Machine Learning)',
    icon: <Brain size={16} />,
    children: [
      { id: 'ml-pipeline', label: 'ML Pipeline Concepts' },
      { id: 'feature-eng', label: 'Feature Engineering' },
      { id: 'classification', label: 'Classification' },
      { id: 'hyperparameter', label: 'Hyperparameter Tuning' },
    ],
  },
  {
    id: 'performance',
    label: 'Performance Tuning',
    icon: <Gauge size={16} />,
    children: [
      { id: 'spark-config', label: 'Configuration Tuning' },
      { id: 'optimization', label: 'Optimization Techniques' },
      { id: 'data-skew', label: 'Data Skew Handling' },
      { id: 'broadcast-join', label: 'Broadcast Join' },
    ],
  },
  {
    id: 'projects',
    label: '5 Real-Time Projects',
    icon: <FolderKanban size={16} />,
    children: [
      { id: 'project-1', label: '1. E-Commerce Analytics' },
      { id: 'project-2', label: '2. Log Analysis' },
      { id: 'project-3', label: '3. Customer 360 ETL' },
      { id: 'project-4', label: '4. Fraud Detection' },
      { id: 'project-5', label: '5. Movie Recommendations' },
    ],
  },
  {
    id: 'assignments',
    label: 'Gamified Assignments',
    icon: <Trophy size={16} />,
    children: [
      { id: 'assignments', label: 'Overview & scoreboard' },
      { id: 'a1', label: 'A1–A3: Fundamentals' },
      { id: 'a4', label: 'A4–A5: Architecture' },
      { id: 'a6', label: 'A6–A8: Spark SQL' },
      { id: 'a9', label: 'A9–A10: Streaming' },
      { id: 'a11', label: 'A11–A14: ML & Perf' },
      { id: 'a15', label: 'A15–A18: Projects' },
    ],
  },
  {
    id: 'cheatsheet',
    label: 'Cheatsheet',
    icon: <ClipboardList size={16} />,
  },
];

const kafkaNavItems: NavItem[] = [
  { id: 'kafka-fundamentals', label: 'Week 1: Fundamentals', icon: <Flame size={16} />, children: [
    { id: 'kafka-why-exists', label: 'Why Kafka Exists' },
    { id: 'kafka-event-modeling', label: 'Event Modeling' },
    { id: 'kafka-use-cases', label: 'Use Case Analysis' },
  ]},
  { id: 'kafka-architecture', label: 'Week 2: Architecture', icon: <Server size={16} />, children: [
    { id: 'kafka-core-components', label: 'Core Components' },
    { id: 'kafka-partition-strategy', label: 'Partition Strategy' },
  ]},
  { id: 'kafka-handson', label: 'Week 3: Hands-on (Docker)', icon: <Terminal size={16} />, children: [
    { id: 'kafka-docker-install', label: 'Install Docker' },
    { id: 'kafka-create-topic', label: 'Create Topic' },
    { id: 'kafka-produce', label: 'Produce / Consume' },
  ]},
  { id: 'kafka-producers-consumers', label: 'Week 4: Producers & Consumers', icon: <Radio size={16} />, children: [
    { id: 'kafka-python-producer', label: 'Python Producer' },
    { id: 'kafka-python-consumer', label: 'Python Consumer' },
    { id: 'kafka-order-pipeline-assignment', label: 'Order Pipeline Lab' },
  ]},
  { id: 'kafka-internals', label: 'Week 5: Internals', icon: <Database size={16} /> },
  { id: 'kafka-replication', label: 'Week 6: Replication', icon: <Shield size={16} />, children: [
    { id: 'kafka-failure-simulation', label: 'Failure Simulation' },
  ]},
  { id: 'kafka-streams', label: 'Week 7: Kafka Streams', icon: <Layers size={16} /> },
  { id: 'kafka-production', label: 'Week 8: Production', icon: <BarChart3 size={16} /> },
  { id: 'kafka-assignments', label: 'Labs & Assignments', icon: <Trophy size={16} /> },
  { id: 'kafka-interview', label: '100 Interview Questions', icon: <MessageCircle size={16} /> },
];

export type Course = 'spark' | 'kafka';

interface SidebarProps {
  activeSection: string;
  course?: Course;
}

export default function Sidebar({ activeSection, course = 'spark' }: SidebarProps) {
  const items = course === 'kafka' ? kafkaNavItems : navItems;
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    () => new Set(items.map(n => n.id))
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  // Reset expanded sections when switching course
  useEffect(() => {
    setExpandedSections(new Set(items.map(n => n.id)));
  }, [course]);

  // Log component mount
  useEffect(() => {
    logger.componentMount('Sidebar');
    return () => logger.componentUnmount('Sidebar');
  }, []);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      const action = next.has(id) ? 'expanded' : 'collapsed';
      logger.debug(`Section ${action}: ${id}`);
      return next;
    });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      logger.navigate('Sidebar', `scrollTo: ${id}`);
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    } else {
      logger.warn(`Section element not found: ${id}`);
    }
  };

  const isActive = (id: string) => activeSection === id;
  const isParentActive = (item: NavItem) => {
    return item.children?.some(c => c.id === activeSection) || item.id === activeSection;
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${course === 'kafka' ? 'bg-gradient-to-br from-kafka to-kafka-light' : 'bg-gradient-to-br from-spark to-spark-light pulse-spark'}`}>
            <Zap size={20} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight inline-flex items-center">
              <span className="text-[#2563eb]">ai</span>
              <span className="text-slate-100">fa</span>
            </span>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Complete Guide</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll py-3 px-3">
        {items.map((item) => (
          <div key={item.id} className="mb-1">
            <button
              onClick={() => {
                toggleSection(item.id);
                scrollTo(item.id);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-sm font-medium transition-all ${
                isParentActive(item)
                  ? course === 'kafka' ? 'text-kafka-light bg-kafka/10' : 'text-spark-light bg-spark/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className={isParentActive(item) ? (course === 'kafka' ? 'text-kafka-light' : 'text-spark-light') : 'text-slate-500'}>
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {item.children && (
                <span className="text-slate-500">
                  {expandedSections.has(item.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </span>
              )}
            </button>

            {item.children && expandedSections.has(item.id) && (
              <div className="ml-5 mt-0.5 pl-3 border-l border-slate-700/50">
                {item.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => scrollTo(child.id)}
                    className={`w-full text-left px-3 py-1.5 text-xs rounded-md transition-all ${
                      isActive(child.id)
                        ? course === 'kafka' ? 'text-kafka-light bg-kafka/10 font-medium' : 'text-spark-light bg-spark/10 font-medium'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                    }`}
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="text-[10px] text-slate-500 text-center">
          {course === 'kafka' ? '8 Weeks · 100 Interview Qs' : 'Basics → Advanced · 7 Parts · 5 Projects'}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg glass text-slate-300 hover:text-white"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-slate-900 border-r border-slate-700/50 z-40 transition-transform lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
