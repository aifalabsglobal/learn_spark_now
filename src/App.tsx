import { useState, useEffect, useRef } from 'react';
import {
  Zap, BookOpen, ArrowUp, Flame, Cpu, Database, Radio,
  Brain, Gauge, FolderKanban, ChevronRight, ChevronDown, Layers
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
import {
  GitFundamentals, GitBranching, GitRemote, GitUndo, GitCollaboration, GitCheatsheet,
} from './sections/git';
import {
  DockerFundamentals, DockerBasics, DockerHandsOn, DockerCompose,
  DockerNetworkingVolumes, DockerProduction, DockerAssignments,
} from './sections/docker';
import {
  ADFFundamentals, ADFConcepts, ADFPipelinesActivities, ADFCopyActivity, ADFResources,
} from './sections/datafactory';
import {
  PythonFundamentals, PythonControlFlow, PythonDataStructures, PythonFunctions,
  PythonOOP, PythonFileIO, PythonCheatsheet,
} from './sections/python';
import {
  PostgresFundamentals, PostgresSQLBasics, PostgresDDL, PostgresAdvanced,
  PostgresHandsOn, PostgresCheatsheet,
} from './sections/postgres';

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

const ADF_SECTION_IDS = [
  'adf-fundamentals', 'adf-why-exists', 'adf-features', 'adf-how-it-works',
  'adf-concepts', 'adf-pipeline', 'adf-activity', 'adf-datasets-linked', 'adf-ir-triggers',
  'adf-pipelines-activities', 'adf-overview', 'adf-data-movement', 'adf-data-transformation', 'adf-control-flow',
  'adf-copy-activity', 'adf-copy-basics', 'adf-copy-formats', 'adf-copy-config',
  'adf-resources',
];

const GIT_SECTION_IDS = [
  'git-fundamentals', 'git-what-is', 'git-install', 'git-first-repo', 'git-basic-commands',
  'git-branching', 'git-branches', 'git-branch-commands', 'git-merge',
  'git-remote', 'git-remote-basics', 'git-push-pull',
  'git-undo', 'git-reset-revert', 'git-stash', 'git-ignore',
  'git-collaboration', 'git-pr-workflow', 'git-merge-conflicts',
  'git-cheatsheet',
];

const DOCKER_SECTION_IDS = [
  'docker-fundamentals', 'docker-why-exists', 'docker-core-concepts', 'docker-use-cases',
  'docker-basics', 'docker-images-containers', 'docker-dockerfile', 'docker-commands',
  'docker-handson', 'docker-install', 'docker-run-first', 'docker-build-image', 'docker-logs-inspect',
  'docker-compose', 'docker-compose-basics', 'docker-compose-commands', 'docker-compose-assignment',
  'docker-networking-volumes', 'docker-networking', 'docker-volumes',
  'docker-production', 'docker-best-practices', 'docker-orchestration',
  'docker-assignments',
];

const PYTHON_SECTION_IDS = [
  'python-fundamentals', 'python-what-is', 'python-install', 'python-first-program', 'python-variables-types',
  'python-control-flow', 'python-if-else', 'python-loops', 'python-comprehensions',
  'python-data-structures', 'python-lists', 'python-dicts-sets', 'python-tuples',
  'python-functions', 'python-def', 'python-modules',
  'python-oop', 'python-classes', 'python-inheritance',
  'python-file-io', 'python-files', 'python-exceptions',
  'python-cheatsheet',
];

const POSTGRES_SECTION_IDS = [
  'postgres-fundamentals', 'postgres-what-is-sql', 'postgres-why-postgres', 'postgres-install', 'postgres-first-query',
  'postgres-sql-basics', 'postgres-select-where', 'postgres-joins', 'postgres-aggregations',
  'postgres-ddl', 'postgres-create-table', 'postgres-indexes', 'postgres-alter',
  'postgres-advanced', 'postgres-transactions', 'postgres-cte', 'postgres-window-functions',
  'postgres-handson', 'postgres-psql', 'postgres-sample-db', 'postgres-assignment',
  'postgres-cheatsheet',
];

const DATABRICKS_SECTION_IDS = [
  'databricks-fundamentals', 'databricks-what-is', 'databricks-why', 'databricks-signup',
  'databricks-workspace', 'databricks-clusters', 'databricks-notebooks', 'databricks-repos',
  'databricks-sql', 'databricks-sql-warehouse', 'databricks-sql-queries',
  'databricks-delta', 'databricks-delta-basics', 'databricks-delta-optimize',
  'databricks-ml', 'databricks-mlflow', 'databricks-automl',
  'databricks-jobs', 'databricks-job-basics', 'databricks-workflow-deps',
  'databricks-security', 'databricks-unity-catalog',
  'databricks-projects', 'databricks-project-1', 'databricks-project-2', 'databricks-project-3',
  'databricks-assignments', 'databricks-cheatsheet',
];

function App() {
  const [course, setCourse] = useState<Course>('spark');
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('fundamentals');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const courseDropdownRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const ALL_SECTION_IDS = course === 'python' ? PYTHON_SECTION_IDS : course === 'postgres' ? POSTGRES_SECTION_IDS : course === 'git' ? GIT_SECTION_IDS : course === 'kafka' ? KAFKA_SECTION_IDS : course === 'datafactory' ? ADF_SECTION_IDS : course === 'docker' ? DOCKER_SECTION_IDS : course === 'databricks' ? DATABRICKS_SECTION_IDS : SPARK_SECTION_IDS;

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
    setActiveSection(c === 'python' ? 'python-fundamentals' : c === 'postgres' ? 'postgres-fundamentals' : c === 'docker' ? 'docker-fundamentals' : c === 'git' ? 'git-fundamentals' : c === 'kafka' ? 'kafka-fundamentals' : c === 'datafactory' ? 'adf-fundamentals' : c === 'databricks' ? 'databricks-fundamentals' : 'fundamentals');
    setCourseDropdownOpen(false);
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close course dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (courseDropdownRef.current && !courseDropdownRef.current.contains(e.target as Node)) {
        setCourseDropdownOpen(false);
      }
    };
    if (courseDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [courseDropdownOpen]);

  const quickLinks = course === 'postgres' ? [
    { id: 'postgres-fundamentals', label: 'Fundamentals', icon: <Flame size={18} />, color: 'from-postgres to-postgres-light' },
    { id: 'postgres-sql-basics', label: 'SQL Basics', icon: <Database size={18} />, color: 'from-blue-500 to-cyan-500' },
    { id: 'postgres-ddl', label: 'DDL', icon: <Layers size={18} />, color: 'from-green-500 to-emerald-500' },
    { id: 'postgres-advanced', label: 'Advanced SQL', icon: <Brain size={18} />, color: 'from-purple-500 to-pink-500' },
    { id: 'postgres-handson', label: 'Hands-On', icon: <Radio size={18} />, color: 'from-yellow-500 to-amber-500' },
    { id: 'postgres-cheatsheet', label: 'Cheatsheet', icon: <FolderKanban size={18} />, color: 'from-indigo-500 to-violet-500' },
  ] : course === 'python' ? [
    { id: 'python-fundamentals', label: 'Fundamentals', icon: <Flame size={18} />, color: 'from-orange-500 to-red-500' },
    { id: 'python-control-flow', label: 'Control Flow', icon: <Database size={18} />, color: 'from-blue-500 to-cyan-500' },
    { id: 'python-data-structures', label: 'Data Structures', icon: <Layers size={18} />, color: 'from-green-500 to-emerald-500' },
    { id: 'python-functions', label: 'Functions', icon: <Radio size={18} />, color: 'from-purple-500 to-pink-500' },
    { id: 'python-oop', label: 'OOP', icon: <Brain size={18} />, color: 'from-yellow-500 to-amber-500' },
    { id: 'python-file-io', label: 'File I/O', icon: <Gauge size={18} />, color: 'from-red-500 to-rose-500' },
    { id: 'python-cheatsheet', label: 'Cheat Sheet', icon: <FolderKanban size={18} />, color: 'from-indigo-500 to-violet-500' },
  ] : course === 'datafactory' ? [
    { id: 'adf-fundamentals', label: 'Fundamentals', icon: <Flame size={18} />, color: 'from-blue-500 to-cyan-500' },
    { id: 'adf-concepts', label: 'Concepts', icon: <Database size={18} />, color: 'from-indigo-500 to-blue-500' },
    { id: 'adf-pipelines-activities', label: 'Pipelines', icon: <FolderKanban size={18} />, color: 'from-cyan-500 to-teal-500' },
    { id: 'adf-copy-activity', label: 'Copy Activity', icon: <Radio size={18} />, color: 'from-teal-500 to-emerald-500' },
    { id: 'adf-resources', label: 'Microsoft Learn', icon: <BookOpen size={18} />, color: 'from-adf to-adf-light' },
  ] : course === 'git' ? [
    { id: 'git-fundamentals', label: 'Fundamentals', icon: <Flame size={18} />, color: 'from-orange-500 to-red-500' },
    { id: 'git-branching', label: 'Branching', icon: <Database size={18} />, color: 'from-blue-500 to-cyan-500' },
    { id: 'git-remote', label: 'Remote', icon: <Radio size={18} />, color: 'from-green-500 to-emerald-500' },
    { id: 'git-undo', label: 'Undo & Stash', icon: <Gauge size={18} />, color: 'from-purple-500 to-pink-500' },
    { id: 'git-collaboration', label: 'Collaboration', icon: <Brain size={18} />, color: 'from-yellow-500 to-amber-500' },
    { id: 'git-cheatsheet', label: 'Cheat Sheet', icon: <FolderKanban size={18} />, color: 'from-indigo-500 to-violet-500' },
  ] : course === 'spark' ? [
    { id: 'fundamentals', label: 'Fundamentals', icon: <Flame size={18} />, color: 'from-orange-500 to-red-500' },
    { id: 'architecture', label: 'Architecture', icon: <Cpu size={18} />, color: 'from-blue-500 to-cyan-500' },
    { id: 'spark-sql', label: 'Spark SQL', icon: <Database size={18} />, color: 'from-green-500 to-emerald-500' },
    { id: 'streaming', label: 'Streaming', icon: <Radio size={18} />, color: 'from-purple-500 to-pink-500' },
    { id: 'mllib', label: 'MLlib', icon: <Brain size={18} />, color: 'from-yellow-500 to-amber-500' },
    { id: 'performance', label: 'Tuning', icon: <Gauge size={18} />, color: 'from-red-500 to-rose-500' },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={18} />, color: 'from-indigo-500 to-violet-500' },
  ] : course === 'kafka' ? [
    { id: 'kafka-fundamentals', label: 'Fundamentals', icon: <Flame size={18} />, color: 'from-orange-500 to-red-500' },
    { id: 'kafka-architecture', label: 'Architecture', icon: <Database size={18} />, color: 'from-blue-500 to-cyan-500' },
    { id: 'kafka-handson', label: 'Hands-on', icon: <Radio size={18} />, color: 'from-green-500 to-emerald-500' },
    { id: 'kafka-producers-consumers', label: 'Producers & Consumers', icon: <Radio size={18} />, color: 'from-purple-500 to-pink-500' },
    { id: 'kafka-internals', label: 'Internals', icon: <Cpu size={18} />, color: 'from-yellow-500 to-amber-500' },
    { id: 'kafka-streams', label: 'Kafka Streams', icon: <Gauge size={18} />, color: 'from-teal-500 to-cyan-500' },
    { id: 'kafka-production', label: 'Production', icon: <FolderKanban size={18} />, color: 'from-indigo-500 to-violet-500' },
    { id: 'kafka-interview', label: '100 Interview Qs', icon: <Brain size={18} />, color: 'from-rose-500 to-pink-500' },
  ] : course === 'docker' ? [
    { id: 'docker-fundamentals', label: 'Fundamentals', icon: <Flame size={18} />, color: 'from-orange-500 to-red-500' },
    { id: 'docker-basics', label: 'Basics', icon: <Database size={18} />, color: 'from-blue-500 to-cyan-500' },
    { id: 'docker-handson', label: 'Hands-on', icon: <Radio size={18} />, color: 'from-green-500 to-emerald-500' },
    { id: 'docker-compose', label: 'Compose', icon: <Layers size={18} />, color: 'from-purple-500 to-pink-500' },
    { id: 'docker-networking-volumes', label: 'Networking & Volumes', icon: <Cpu size={18} />, color: 'from-yellow-500 to-amber-500' },
    { id: 'docker-production', label: 'Production', icon: <FolderKanban size={18} />, color: 'from-indigo-500 to-violet-500' },
    { id: 'docker-assignments', label: 'Assignments', icon: <Brain size={18} />, color: 'from-rose-500 to-pink-500' },
  ] : course === 'databricks' ? [
    { id: 'databricks-fundamentals', label: 'Fundamentals', icon: <Flame size={18} />, color: 'from-orange-500 to-red-500' },
    { id: 'databricks-workspace', label: 'Workspace', icon: <Database size={18} />, color: 'from-blue-500 to-cyan-500' },
    { id: 'databricks-sql', label: 'Databricks SQL', icon: <Radio size={18} />, color: 'from-green-500 to-emerald-500' },
    { id: 'databricks-delta', label: 'Delta Lake', icon: <Layers size={18} />, color: 'from-purple-500 to-pink-500' },
    { id: 'databricks-ml', label: 'ML & MLflow', icon: <Brain size={18} />, color: 'from-yellow-500 to-amber-500' },
    { id: 'databricks-jobs', label: 'Jobs', icon: <Gauge size={18} />, color: 'from-red-500 to-rose-500' },
    { id: 'databricks-security', label: 'Security', icon: <FolderKanban size={18} />, color: 'from-indigo-500 to-violet-500' },
    { id: 'databricks-projects', label: 'Projects', icon: <Cpu size={18} />, color: 'from-teal-500 to-cyan-500' },
    { id: 'databricks-cheatsheet', label: 'Cheatsheet', icon: <FolderKanban size={18} />, color: 'from-rose-500 to-pink-500' },
  ] : [
    { id: 'git-fundamentals', label: 'Fundamentals', icon: <Flame size={18} />, color: 'from-orange-500 to-red-500' },
    { id: 'git-branching', label: 'Branching', icon: <Database size={18} />, color: 'from-blue-500 to-cyan-500' },
    { id: 'git-remote', label: 'Remote', icon: <Radio size={18} />, color: 'from-green-500 to-emerald-500' },
    { id: 'git-undo', label: 'Undo & Stash', icon: <Gauge size={18} />, color: 'from-purple-500 to-pink-500' },
    { id: 'git-collaboration', label: 'Collaboration', icon: <Brain size={18} />, color: 'from-yellow-500 to-amber-500' },
    { id: 'git-cheatsheet', label: 'Cheatsheet', icon: <FolderKanban size={18} />, color: 'from-indigo-500 to-violet-500' },
  ];

  return (
    <div className="h-screen flex bg-slate-950 text-slate-200 overflow-hidden">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-slate-800">
        <div
          className={`h-full transition-all duration-300 ${course === 'python' ? 'bg-gradient-to-r from-python to-python-light' : course === 'postgres' ? 'bg-gradient-to-r from-postgres to-postgres-light' : course === 'docker' ? 'bg-gradient-to-r from-docker to-docker-light' : course === 'git' ? 'bg-gradient-to-r from-git to-git-light' : course === 'kafka' ? 'bg-gradient-to-r from-kafka to-kafka-light' : course === 'datafactory' ? 'bg-gradient-to-r from-adf to-adf-light' : course === 'databricks' ? 'bg-gradient-to-r from-databricks to-databricks-light' : 'bg-gradient-to-r from-spark to-spark-light'}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Course switcher — fixed at top, always visible */}
      <div className="fixed top-1.5 left-4 right-4 z-40 flex justify-center sm:justify-end lg:left-auto lg:right-6 lg:pl-[17rem]">
        <div ref={courseDropdownRef} className="relative">
          <button
            onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all bg-slate-800 border-2 shadow-lg hover:bg-slate-700 ${
              course === 'python' ? 'text-python-light border-python/50' : course === 'postgres' ? 'text-postgres-light border-postgres/50' : course === 'docker' ? 'text-docker-light border-docker/50' : course === 'git' ? 'text-git-light border-git/50' : course === 'kafka' ? 'text-kafka-light border-kafka/50' : course === 'datafactory' ? 'text-adf-light border-adf/50' : course === 'databricks' ? 'text-databricks-light border-databricks/50' : 'text-spark-light border-spark/50'
            }`}
          >
            <Zap size={18} className="shrink-0" />
            <span className="hidden sm:inline">Course:</span>
            {course === 'python' ? 'Python' : course === 'postgres' ? 'PostgreSQL & SQL' : course === 'docker' ? 'Docker' : course === 'git' ? 'Git' : course === 'datafactory' ? 'Azure Data Factory' : course === 'databricks' ? 'Databricks' : course === 'spark' ? 'Apache Spark' : 'Apache Kafka'}
            <ChevronDown size={18} className={`shrink-0 transition-transform ${courseDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {courseDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 min-w-[11rem] rounded-lg bg-slate-800 border-2 border-slate-600 shadow-xl overflow-hidden z-50">
              <button onClick={() => switchCourse('spark')} className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-left transition-colors ${course === 'spark' ? 'bg-spark/20 text-spark-light' : 'text-slate-300 hover:bg-slate-700'}`}><Zap size={16} className="shrink-0 text-spark" />Apache Spark</button>
              <button onClick={() => switchCourse('kafka')} className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-left transition-colors ${course === 'kafka' ? 'bg-kafka/20 text-kafka-light' : 'text-slate-300 hover:bg-slate-700'}`}><Zap size={16} className="shrink-0 text-kafka" />Apache Kafka</button>
              <button onClick={() => switchCourse('docker')} className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-left transition-colors ${course === 'docker' ? 'bg-docker/20 text-docker-light' : 'text-slate-300 hover:bg-slate-700'}`}><Zap size={16} className="shrink-0 text-docker" />Docker</button>
              <button onClick={() => switchCourse('databricks')} className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-left transition-colors ${course === 'databricks' ? 'bg-databricks/20 text-databricks-light' : 'text-slate-300 hover:bg-slate-700'}`}><Zap size={16} className="shrink-0 text-databricks" />Databricks</button>
              <button onClick={() => switchCourse('datafactory')} className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-left transition-colors ${course === 'datafactory' ? 'bg-adf/20 text-adf-light' : 'text-slate-300 hover:bg-slate-700'}`}><Zap size={16} className="shrink-0 text-adf" />Azure Data Factory</button>
              <button onClick={() => switchCourse('git')} className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-left transition-colors ${course === 'git' ? 'bg-git/20 text-git-light' : 'text-slate-300 hover:bg-slate-700'}`}><Zap size={16} className="shrink-0 text-git" />Git</button>
              <button onClick={() => switchCourse('python')} className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-left transition-colors ${course === 'python' ? 'bg-python/20 text-python-light' : 'text-slate-300 hover:bg-slate-700'}`}><Zap size={16} className="shrink-0 text-python" />Python</button>
              <button onClick={() => switchCourse('postgres')} className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-left transition-colors ${course === 'postgres' ? 'bg-postgres/20 text-postgres-light' : 'text-slate-300 hover:bg-slate-700'}`}><Zap size={16} className="shrink-0 text-postgres" />PostgreSQL &amp; SQL</button>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar activeSection={activeSection} course={course} />

      {/* Main Content */}
      <div ref={mainRef} className="flex-1 lg:ml-64 overflow-y-auto scroll-smooth pt-14" style={{ scrollPaddingTop: '80px' }}>
        {/* Hero */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
          <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] ${course === 'python' ? 'bg-python/5' : course === 'postgres' ? 'bg-postgres/5' : course === 'docker' ? 'bg-docker/5' : course === 'git' ? 'bg-git/5' : course === 'kafka' ? 'bg-kafka/5' : course === 'datafactory' ? 'bg-adf/5' : course === 'databricks' ? 'bg-databricks/5' : 'bg-spark/5'}`} />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />

          <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24">
            {/* Hero top row: icon + badges */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${course === 'python' ? 'bg-gradient-to-br from-python to-python-light' : course === 'postgres' ? 'bg-gradient-to-br from-postgres to-postgres-light' : course === 'docker' ? 'bg-gradient-to-br from-docker to-docker-light' : course === 'git' ? 'bg-gradient-to-br from-git to-git-light' : course === 'kafka' ? 'bg-gradient-to-br from-kafka to-kafka-light' : course === 'datafactory' ? 'bg-gradient-to-br from-adf to-adf-light' : course === 'databricks' ? 'bg-gradient-to-br from-databricks to-databricks-light' : 'bg-gradient-to-br from-spark to-spark-light pulse-spark'}`}>
                <Zap size={28} className="text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700/50 flex items-center gap-1.5">
                  <BookOpen size={12} />
                  Complete Guide
                </span>
                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${course === 'python' ? 'text-python bg-python/10 border-python/20' : course === 'postgres' ? 'text-postgres bg-postgres/10 border-postgres/20' : course === 'git' ? 'text-git bg-git/10 border-git/20' : course === 'kafka' ? 'text-kafka bg-kafka/10 border-kafka/20' : course === 'datafactory' ? 'text-adf bg-adf/10 border-adf/20' : course === 'databricks' ? 'text-databricks bg-databricks/10 border-databricks/20' : 'text-spark bg-spark/10 border-spark/20'}`}>
                  {course === 'python' ? '6 Parts' : course === 'postgres' ? '6 Parts' : course === 'git' ? '5 Parts' : course === 'kafka' ? '6–8 weeks' : course === 'datafactory' ? '4 weeks' : course === 'databricks' ? '10 Parts' : 'v3.5'}
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              {course === 'python' ? (
                <>Python<br />
                <span className="text-2xl md:text-4xl font-bold text-slate-400">Programming Fundamentals</span></>
              ) : course === 'postgres' ? (
                <>PostgreSQL &amp; <span className="text-postgres-light">SQL</span><br />
                <span className="text-2xl md:text-4xl font-bold text-slate-400">Databases &amp; Queries</span></>
              ) : course === 'docker' ? (
                <>Docker<br />
                <span className="text-2xl md:text-4xl font-bold text-slate-400">Containers &amp; DevOps</span></>
              ) : course === 'git' ? (
                <>Git<br />
                <span className="text-2xl md:text-4xl font-bold text-slate-400">Version Control &amp; Collaboration</span></>
              ) : course === 'kafka' ? (
                <>Apache <span className="text-kafka-light">Kafka</span><br />
                <span className="text-2xl md:text-4xl font-bold text-slate-400">Streaming &amp; Event-Driven Mastery</span></>
              ) : course === 'datafactory' ? (
                <>Azure <span className="text-adf-light">Data Factory</span><br />
                <span className="text-2xl md:text-4xl font-bold text-slate-400">ETL, ELT &amp; Data Integration</span></>
              ) : course === 'databricks' ? (
                <>Databricks<br />
                <span className="text-2xl md:text-4xl font-bold text-slate-400">Lakehouse Platform &amp; Spark</span></>
              ) : (
                <>Apache <span className="gradient-text">Spark</span><br />
                <span className="text-2xl md:text-4xl font-bold text-slate-400">The Easy Guide</span></>
              )}
            </h1>

            <p className="text-lg text-slate-400 max-w-2xl mb-4 leading-relaxed">
              {course === 'python'
                ? 'From variables and control flow to data structures, functions, classes, file I/O, and exceptions. The language that powers data science, automation, and web backends.'
                : course === 'postgres'
                ? 'From SQL basics (SELECT, WHERE, JOINs, GROUP BY) to DDL (tables, indexes, constraints), transactions, CTEs, window functions, and hands-on with psql. Plus a cheatsheet.'
                : course === 'docker'
                ? 'From images and containers to Dockerfile, Docker Compose, networking, volumes, and production best practices. Hands-on labs included.'
                : course === 'git'
                ? 'Learn version control from the ground up: init, commit, branch, merge, remote, push/pull, undo, stash, and collaboration with pull requests and merge conflicts.'
                : course === 'kafka'
                ? 'Structured Kafka course with step-by-step labs and 100 FAANG-style interview questions for Streaming Data Engineer, Platform Engineer, and Distributed Systems roles.'
                : course === 'datafactory'
                ? 'Learn Azure Data Factory with content aligned to Microsoft Learn: ETL/ELT, pipelines, activities, Copy activity, and integration runtimes.'
                : course === 'databricks'
                ? 'Learn the Databricks platform: workspace, notebooks, clusters, Delta Lake, Databricks SQL, MLflow, jobs, and Unity Catalog. Same Spark APIs as the Spark course — now managed in the cloud.'
                : 'The easiest way to learn Apache Spark. We use simple analogies and interactive examples to take you from zero to hero, covering everything from fundamentals to 5 real-world projects.'}
            </p>
            <p className="text-sm text-slate-500 max-w-2xl mb-10">
              {course === 'python'
                ? 'Six parts: fundamentals, control flow, data structures (list, dict, set, tuple), functions & modules, OOP, file I/O & exceptions. Plus a cheat sheet.'
                : course === 'postgres'
                ? 'Six parts: SQL & Postgres fundamentals, SELECT/WHERE/JOINs, DDL & indexes, transactions & CTEs & windows, hands-on psql, and cheatsheet.'
                : course === 'docker'
                ? 'Six weeks: fundamentals, images & Dockerfile, hands-on run/build, Compose, networking & volumes, production. Plus lab assignments.'
                : course === 'git'
                ? 'Five parts: fundamentals, branching & merge, remote & push/pull, undo & stash & .gitignore, and collaboration (PR workflow, merge conflicts). Plus a cheat sheet.'
                : course === 'kafka'
                ? 'Covers event streaming fundamentals, Kafka architecture, Docker hands-on, producers & consumers, internals, replication, Kafka Streams, production design, and 100 interview Q&amp;As.'
                : course === 'datafactory'
                ? 'Content from Microsoft Learn: Introduction to Azure Data Factory, pipelines and activities, Copy activity, and official tutorials.'
                : course === 'databricks'
                ? 'Ten parts: fundamentals, workspace &amp; notebooks, Databricks SQL, Delta Lake, ML &amp; MLflow, jobs &amp; workflows, security &amp; Unity Catalog, mini projects, assignments, and cheatsheet.'
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
              {(course === 'python' ? [
                { val: '6', label: 'Parts' },
                { val: '7', label: 'Sections' },
                { val: '1', label: 'Cheat Sheet' },
              ] : course === 'postgres' ? [
                { val: '6', label: 'Parts' },
                { val: 'SQL', label: 'Standard' },
                { val: '1', label: 'Cheatsheet' },
              ] : course === 'docker' ? [
                { val: '6', label: 'Weeks' },
                { val: '7', label: 'Sections' },
                { val: '6', label: 'Labs' },
              ] : course === 'git' ? [
                { val: '5', label: 'Parts' },
                { val: '6', label: 'Sections' },
                { val: '1', label: 'Cheat Sheet' },
              ] : course === 'kafka' ? [
                { val: '8', label: 'Weeks' },
                { val: '100', label: 'Interview Qs' },
                { val: '5', label: 'Labs' },
                { val: '60–80', label: 'Hours' },
              ] : course === 'datafactory' ? [
                { val: '4', label: 'Weeks' },
                { val: 'Microsoft', label: 'Learn' },
                { val: 'ETL/ELT', label: 'Pipelines' },
                { val: '170+', label: 'Connectors' },
              ] : course === 'databricks' ? [
                { val: '10', label: 'Parts' },
                { val: '3', label: 'Mini Projects' },
                { val: 'Delta', label: 'Lake' },
                { val: 'MLflow', label: 'Built-in' },
              ] : [
                { val: '7', label: 'Parts' },
                { val: '5', label: 'Projects' },
                { val: '100+', label: 'Code Examples' },
                { val: '4', label: 'Languages' },
              ]).map((stat, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <span className={`text-2xl font-black ${course === 'python' ? 'text-python-light' : course === 'postgres' ? 'text-postgres-light' : course === 'docker' ? 'text-docker-light' : course === 'git' ? 'text-git-light' : course === 'kafka' ? 'text-kafka-light' : course === 'datafactory' ? 'text-adf-light' : course === 'databricks' ? 'text-databricks-light' : 'text-spark-light'}`}>{stat.val}</span>
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
              <BookOpen size={16} className={course === 'python' ? 'text-python' : course === 'postgres' ? 'text-postgres' : course === 'docker' ? 'text-docker' : course === 'git' ? 'text-git' : course === 'kafka' ? 'text-kafka' : course === 'datafactory' ? 'text-adf' : course === 'databricks' ? 'text-databricks' : 'text-spark'} />
              Table of Contents
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
              {(course === 'python' ? [
                { num: '1', title: 'Fundamentals', id: 'python-fundamentals', sub: 'Why Python, install, first program' },
                { num: '2', title: 'Control Flow', id: 'python-control-flow', sub: 'if/elif/else, loops, comprehensions' },
                { num: '3', title: 'Data Structures', id: 'python-data-structures', sub: 'Lists, dicts, sets, tuples' },
                { num: '4', title: 'Functions & Modules', id: 'python-functions', sub: 'def, return, import' },
                { num: '5', title: 'Classes & OOP', id: 'python-oop', sub: 'class, __init__, inheritance' },
                { num: '6', title: 'File I/O & Exceptions', id: 'python-file-io', sub: 'open, read/write, try/except' },
                { num: '7', title: 'Cheat Sheet', id: 'python-cheatsheet', sub: 'Quick reference' },
              ] : course === 'postgres' ? [
                { num: '1', title: 'Fundamentals', id: 'postgres-fundamentals', sub: 'What is SQL, why Postgres, install' },
                { num: '2', title: 'SQL Basics', id: 'postgres-sql-basics', sub: 'SELECT, WHERE, JOINs, GROUP BY' },
                { num: '3', title: 'DDL', id: 'postgres-ddl', sub: 'CREATE TABLE, indexes, constraints' },
                { num: '4', title: 'Advanced SQL', id: 'postgres-advanced', sub: 'Transactions, CTEs, window functions' },
                { num: '5', title: 'Hands-On', id: 'postgres-handson', sub: 'psql, sample DB, mini assignment' },
                { num: '6', title: 'Cheatsheet', id: 'postgres-cheatsheet', sub: 'Quick reference' },
              ] : course === 'docker' ? [
                { num: '1', title: 'Week 1: Fundamentals', id: 'docker-fundamentals', sub: 'Why Docker, containers vs VMs' },
                { num: '2', title: 'Week 2: Basics', id: 'docker-basics', sub: 'Images, Dockerfile, commands' },
                { num: '3', title: 'Week 3: Hands-on', id: 'docker-handson', sub: 'Install, run, build image' },
                { num: '4', title: 'Week 4: Compose', id: 'docker-compose', sub: 'Multi-container apps' },
                { num: '5', title: 'Week 5: Networking & Volumes', id: 'docker-networking-volumes', sub: 'Networks, persistence' },
                { num: '6', title: 'Week 6: Production', id: 'docker-production', sub: 'Best practices, orchestration' },
                { num: '7', title: 'Assignments', id: 'docker-assignments', sub: 'Labs' },
              ] : course === 'datafactory' ? [
                { num: '1', title: 'Week 1: Fundamentals', id: 'adf-fundamentals', sub: 'What is ADF, ETL/ELT, features' },
                { num: '2', title: 'Week 2: Concepts', id: 'adf-concepts', sub: 'Pipeline, activity, datasets, IR' },
                { num: '3', title: 'Week 3: Pipelines & Activities', id: 'adf-pipelines-activities', sub: 'Movement, transformation, control flow' },
                { num: '4', title: 'Week 4: Copy Activity', id: 'adf-copy-activity', sub: 'Copy activity, formats, config' },
                { num: '5', title: 'Microsoft Learn', id: 'adf-resources', sub: 'Official docs and tutorials' },
              ] : course === 'git' ? [
                { num: '1', title: 'Fundamentals', id: 'git-fundamentals', sub: 'What is Git, install, first repo' },
                { num: '2', title: 'Branching & Merge', id: 'git-branching', sub: 'Branches, merge' },
                { num: '3', title: 'Remote', id: 'git-remote', sub: 'Push, pull, fetch' },
                { num: '4', title: 'Undo & Clean Up', id: 'git-undo', sub: 'Reset, revert, stash, .gitignore' },
                { num: '5', title: 'Collaboration', id: 'git-collaboration', sub: 'PR workflow, merge conflicts' },
                { num: '6', title: 'Cheat Sheet', id: 'git-cheatsheet', sub: 'Quick reference' },
              ] : course === 'kafka' ? [
                { num: '1', title: 'Week 1: Fundamentals', id: 'kafka-fundamentals', sub: 'Event streaming, modeling, use cases' },
                { num: '2', title: 'Week 2: Architecture', id: 'kafka-architecture', sub: 'Broker, topic, partition' },
                { num: '3', title: 'Week 3: Hands-on', id: 'kafka-handson', sub: 'Docker, create topic, produce/consume' },
                { num: '4', title: 'Week 4: Producers & Consumers', id: 'kafka-producers-consumers', sub: 'Python, order pipeline' },
                { num: '5', title: 'Week 5: Internals', id: 'kafka-internals', sub: 'Commit log, zero-copy' },
                { num: '6', title: 'Week 6: Replication', id: 'kafka-replication', sub: 'Leader, ISR, failure simulation' },
                { num: '7', title: 'Week 7: Kafka Streams', id: 'kafka-streams', sub: 'Map, filter, join, window' },
                { num: '8', title: 'Week 8: Production', id: 'kafka-production', sub: 'Flink, Spark, data lake' },
                { num: '9', title: 'Labs & 100 Interview Qs', id: 'kafka-assignments', sub: 'FAANG-style questions' },
              ] : course === 'databricks' ? [
                { num: '1', title: 'Fundamentals', id: 'databricks-fundamentals', sub: 'What is Databricks, get started' },
                { num: '2', title: 'Workspace & Notebooks', id: 'databricks-workspace', sub: 'Clusters, notebooks, repos' },
                { num: '3', title: 'Databricks SQL', id: 'databricks-sql', sub: 'SQL warehouse, dashboards' },
                { num: '4', title: 'Delta Lake', id: 'databricks-delta', sub: 'ACID, OPTIMIZE, Z-ORDER' },
                { num: '5', title: 'ML & MLflow', id: 'databricks-ml', sub: 'Experiments, AutoML' },
                { num: '6', title: 'Jobs & Workflows', id: 'databricks-jobs', sub: 'Scheduling, task deps' },
                { num: '7', title: 'Security & Unity Catalog', id: 'databricks-security', sub: 'Governance' },
                { num: '8', title: 'Mini Projects', id: 'databricks-projects', sub: 'Ingest, aggregate, MLflow' },
                { num: '9', title: 'Assignments', id: 'databricks-assignments', sub: 'Hands-on tasks' },
                { num: '10', title: 'Cheatsheet', id: 'databricks-cheatsheet', sub: 'Quick reference' },
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
                  <span className={`text-xs font-bold w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${course === 'python' ? 'text-python bg-python/10' : course === 'postgres' ? 'text-postgres bg-postgres/10' : course === 'docker' ? 'text-docker bg-docker/10' : course === 'git' ? 'text-git bg-git/10' : course === 'kafka' ? 'text-kafka bg-kafka/10' : course === 'datafactory' ? 'text-adf bg-adf/10' : course === 'databricks' ? 'text-databricks bg-databricks/10' : 'text-spark bg-spark/10'}`}>
                    {item.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-200 group-hover:text-white flex items-center gap-1">
                      {item.title}
                      <ChevronRight size={12} className={course === 'python' ? 'text-slate-500 group-hover:text-python transition-colors' : course === 'postgres' ? 'text-slate-500 group-hover:text-postgres transition-colors' : course === 'docker' ? 'text-slate-500 group-hover:text-docker transition-colors' : course === 'git' ? 'text-slate-500 group-hover:text-git transition-colors' : course === 'kafka' ? 'text-slate-500 group-hover:text-kafka transition-colors' : course === 'datafactory' ? 'text-slate-500 group-hover:text-adf transition-colors' : course === 'databricks' ? 'text-slate-500 group-hover:text-databricks transition-colors' : 'text-slate-500 group-hover:text-spark transition-colors'} />
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
          {course === 'python' ? (
            <>
              <PythonFundamentals />
              <PythonControlFlow />
              <PythonDataStructures />
              <PythonFunctions />
              <PythonOOP />
              <PythonFileIO />
              <PythonCheatsheet />
            </>
          ) : course === 'postgres' ? (
            <>
              <PostgresFundamentals />
              <PostgresSQLBasics />
              <PostgresDDL />
              <PostgresAdvanced />
              <PostgresHandsOn />
              <PostgresCheatsheet />
            </>
          ) : course === 'datafactory' ? (
            <>
              <ADFFundamentals />
              <ADFConcepts />
              <ADFPipelinesActivities />
              <ADFCopyActivity />
              <ADFResources />
            </>
          ) : course === 'docker' ? (
            <>
              <DockerFundamentals />
              <DockerBasics />
              <DockerHandsOn />
              <DockerCompose />
              <DockerNetworkingVolumes />
              <DockerProduction />
              <DockerAssignments />
            </>
          ) : course === 'kafka' ? (
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
          ) : course === 'git' ? (
            <>
              <GitFundamentals />
              <GitBranching />
              <GitRemote />
              <GitUndo />
              <GitCollaboration />
              <GitCheatsheet />
            </>
          ) : course === 'databricks' ? (
            <>
              <DatabricksFundamentals />
              <DatabricksWorkspace />
              <DatabricksSQL />
              <DatabricksDelta />
              <DatabricksML />
              <DatabricksJobs />
              <DatabricksSecurity />
              <DatabricksProjects />
              <DatabricksAssignments />
              <DatabricksCheatsheet />
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
              <Zap size={18} className={course === 'python' ? 'text-python' : course === 'postgres' ? 'text-postgres' : course === 'docker' ? 'text-docker' : course === 'git' ? 'text-git' : course === 'kafka' ? 'text-kafka' : course === 'datafactory' ? 'text-adf' : course === 'databricks' ? 'text-databricks' : 'text-spark'} />
              <span className="text-sm font-bold text-white">
                {course === 'python' ? 'Python, Git, Kafka & Spark Complete Guides' : course === 'postgres' ? 'PostgreSQL & SQL Complete Guide' : course === 'docker' ? 'Docker Complete Guide' : course === 'git' ? 'Git, Kafka & Spark Complete Guides' : course === 'kafka' ? 'Apache Kafka & Spark Complete Guides' : course === 'datafactory' ? 'Azure Data Factory · Microsoft Learn' : course === 'databricks' ? 'Databricks Platform Guide' : 'Apache Spark Complete Guide'}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {course === 'python' ? 'Python: 6 Parts · Fundamentals, Control Flow, Data Structures, Functions, OOP, File I/O · Cheat Sheet' : course === 'postgres' ? 'PostgreSQL & SQL: 6 Parts · SELECT, JOINs, DDL, Transactions, CTEs, Windows · Cheatsheet' : course === 'docker' ? '6 Weeks · Images, Containers, Compose, Networking · Labs' : course === 'git' ? 'Git: 5 Parts · Branching, Remote, Undo, Collaboration · Cheat Sheet' : course === 'kafka' ? 'Kafka: 8 weeks · 100 Interview Qs · Labs with Docker' : course === 'datafactory' ? 'Content from Microsoft Learn · ETL/ELT · Pipelines · Copy Activity' : course === 'databricks' ? '10 Parts · Delta Lake · MLflow · Jobs · Unity Catalog · Mini Projects' : 'From Fundamentals to Advanced · 7 Parts · 5 Projects · Gamified Assignments (18 tasks, 7 badges)'}
            </p>
          </footer>
        </main>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 rounded-full text-white shadow-lg transition-all z-30 animate-fade-in-up ${course === 'python' ? 'bg-python hover:bg-python-dark' : course === 'postgres' ? 'bg-postgres hover:bg-postgres-dark' : course === 'kafka' ? 'bg-kafka hover:bg-kafka-dark' : course === 'datafactory' ? 'bg-adf hover:bg-adf-dark' : course === 'databricks' ? 'bg-databricks hover:bg-databricks-dark' : course === 'docker' ? 'bg-docker hover:bg-docker-dark' : course === 'git' ? 'bg-git hover:bg-git-dark' : 'bg-spark hover:bg-spark-dark shadow-spark/20'}`}
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

export default App;
