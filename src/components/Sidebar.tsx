import { useState } from 'react';
import {
  Flame, Cpu, Database, Radio, Brain, Gauge,
  FolderKanban, ChevronDown, ChevronRight, Menu, X,
  Zap
} from 'lucide-react';

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
];

interface SidebarProps {
  activeSection: string;
}

export default function Sidebar({ activeSection }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(navItems.map(n => n.id))
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
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
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-spark to-spark-light flex items-center justify-center pulse-spark">
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
        {navItems.map((item) => (
          <div key={item.id} className="mb-1">
            <button
              onClick={() => {
                toggleSection(item.id);
                scrollTo(item.id);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-sm font-medium transition-all ${
                isParentActive(item)
                  ? 'text-spark-light bg-spark/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className={isParentActive(item) ? 'text-spark-light' : 'text-slate-500'}>
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
                        ? 'text-spark-light bg-spark/10 font-medium'
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
          Basics → Advanced · 7 Parts · 5 Projects
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
