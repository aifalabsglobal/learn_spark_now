import { Trophy, Star, Zap, Target, CheckCircle2, Circle, Award, Flame } from 'lucide-react';

type Level = 'beginner' | 'intermediate' | 'advanced' | 'champion';
type Badge = 'first_spark' | 'sql_master' | 'streamer' | 'ml_ninja' | 'perf_guru' | 'project_builder' | 'full_stack';

const LEVEL_CONFIG: Record<Level, { label: string; color: string; points: string; icon: React.ReactNode }> = {
  beginner: { label: 'Beginner', color: 'text-green-400 bg-green-500/20 border-green-500/40', points: '10–25 pts', icon: <Star size={14} /> },
  intermediate: { label: 'Intermediate', color: 'text-blue-400 bg-blue-500/20 border-blue-500/40', points: '30–50 pts', icon: <Zap size={14} /> },
  advanced: { label: 'Advanced', color: 'text-purple-400 bg-purple-500/20 border-purple-500/40', points: '60–80 pts', icon: <Flame size={14} /> },
  champion: { label: 'Champion', color: 'text-amber-400 bg-amber-500/20 border-amber-500/40', points: '100 pts', icon: <Trophy size={14} /> },
};

interface Assignment {
  id: string;
  title: string;
  description: string;
  level: Level;
  points: number;
  badge?: Badge;
  checklist: string[];
}

const ASSIGNMENTS: Assignment[] = [
  // --- Fundamentals ---
  { id: 'a1', title: 'Hello Spark on your machine', description: 'Install Spark (or use a cloud lab), run hello_spark.py, and share a screenshot of the output.', level: 'beginner', points: 15, badge: 'first_spark', checklist: ['Spark / PySpark installed', 'hello_spark.py runs without error', 'Screenshot or log of df.show() output'] },
  { id: 'a2', title: 'Your first DataFrame from a file', description: 'Create a CSV with 5–10 rows (e.g. name, age, city). Read it with Spark, run show(), count(), and printSchema().', level: 'beginner', points: 20, checklist: ['CSV created and path correct', 'read with header + inferSchema', 'show, count, printSchema run successfully'] },
  { id: 'a3', title: 'Cache and compare', description: 'On a DataFrame with at least 1000 rows, run two count() calls: first without cache, then with cache. Note the time for each run.', level: 'beginner', points: 25, checklist: ['Two runs: without cache', 'Two runs: with cache', 'Brief note on timing difference'] },
  // --- Architecture ---
  { id: 'a4', title: 'RDD lineage', description: 'Create an RDD with parallelize, chain map and filter, then call toDebugString() and paste the output. Identify one narrow and one wide dependency in the course material.', level: 'intermediate', points: 30, checklist: ['RDD created with 2+ transformations', 'toDebugString() output saved', 'One narrow and one wide dependency identified'] },
  { id: 'a5', title: 'Broadcast in action', description: 'Create a small lookup table (e.g. country code → name), broadcast it, and use it in a map over a larger RDD/DataFrame. Run the same logic without broadcast and compare stages in the UI.', level: 'intermediate', points: 40, checklist: ['Broadcast variable used in transformation', 'Same logic without broadcast', 'Stage/task comparison noted'] },
  // --- Spark SQL ---
  { id: 'a6', title: 'Six ways to create a DataFrame', description: 'Create the same logical table (e.g. 3 columns, 5 rows) using at least three different methods: from list, from CSV, and from JSON.', level: 'intermediate', points: 35, badge: 'sql_master', checklist: ['From list of tuples + schema', 'From CSV file', 'From JSON file'] },
  { id: 'a7', title: 'Window functions challenge', description: 'Given a table of sales (date, product, amount), add columns: rank within each product by amount, running total per product, and previous row amount using lag().', level: 'intermediate', points: 50, checklist: ['rank() or dense_rank() per product', 'Running total per product', 'lag() for previous amount'] },
  { id: 'a8', title: 'Pandas UDF vs Python UDF', description: 'Write a Python UDF and a Pandas UDF that do the same thing (e.g. categorize a number). Run both on a DataFrame with 10k+ rows and compare execution time.', level: 'advanced', points: 60, checklist: ['Python UDF implemented', 'Pandas UDF implemented', 'Timing comparison (e.g. 2–10x faster)'] },
  // --- Streaming ---
  { id: 'a9', title: 'Socket word count end-to-end', description: 'Run the socket word-count example: start a server on port 9999, run the Spark streaming app, send 5 lines of text, and capture the console output showing word counts.', level: 'intermediate', points: 40, badge: 'streamer', checklist: ['Socket server running', 'Spark streaming job running', 'Word counts printed for your input'] },
  { id: 'a10', title: 'Streaming with checkpoint', description: 'Write a streaming query that writes to Parquet with a checkpoint path. Run it, add some data, stop the app, restart with the same checkpoint, and verify no duplicate or missing data.', level: 'advanced', points: 70, checklist: ['Parquet sink + checkpoint configured', 'Restart from checkpoint successful', 'No duplicate/missing batches'] },
  // --- MLlib ---
  { id: 'a11', title: 'Classification pipeline', description: 'Build a full pipeline: load a dataset (e.g. from CSV), StringIndexer + VectorAssembler + StandardScaler + RandomForest, fit on train, evaluate accuracy on test.', level: 'intermediate', points: 50, badge: 'ml_ninja', checklist: ['Train/test split', 'Pipeline with 3+ stages', 'Accuracy reported'] },
  { id: 'a12', title: 'Hyperparameter tuning', description: 'Use CrossValidator and ParamGridBuilder on your classification pipeline (e.g. numTrees and maxDepth). Report the best params and best accuracy.', level: 'advanced', points: 65, checklist: ['ParamGrid with 2+ params', 'CrossValidator with 3+ folds', 'Best model params and metric'] },
  // --- Performance ---
  { id: 'a13', title: 'Explain plan detective', description: 'Run explain("formatted") on a join query. Identify whether a BroadcastHashJoin or SortMergeJoin is used; change one side to broadcast and show the new plan.', level: 'intermediate', points: 45, badge: 'perf_guru', checklist: ['explain("formatted") captured', 'Join type identified', 'Broadcast hint applied and plan compared'] },
  { id: 'a14', title: 'Salting a skewed join', description: 'Create or use a dataset where one key has most of the rows. Implement salting (add salt column, replicate small table), join, and optionally aggregate. Compare task duration distribution before/after.', level: 'advanced', points: 80, checklist: ['Skewed key identified', 'Salting implemented', 'Task times more balanced'] },
  // --- Projects ---
  { id: 'a15', title: 'Mini E-Commerce pipeline', description: 'Ingest click-like events (e.g. from a file or socket), parse them, and compute at least one metric (e.g. events per minute or per category) with a tumbling window.', level: 'advanced', points: 75, badge: 'project_builder', checklist: ['Streaming source connected', 'Windowed aggregation', 'Output (console or file)'] },
  { id: 'a16', title: 'Customer 360 lite', description: 'Combine two sources (e.g. customers CSV + orders Parquet), compute 3+ metrics per customer (e.g. order count, total spend, last order date), and write to Parquet with partitioning.', level: 'advanced', points: 70, checklist: ['Two sources joined', '3+ metrics per customer', 'Partitioned Parquet output'] },
  { id: 'a17', title: 'Recommendation engine', description: 'Load ratings data, train an ALS model, tune at least one hyperparameter, and output top-5 recommendations for 3 users. Report RMSE on a test set.', level: 'advanced', points: 85, checklist: ['ALS trained', 'Hyperparameter tuned', 'Top-5 per user + RMSE'] },
  { id: 'a18', title: 'Full project: pick one', description: 'Complete one of the five course projects (E-Commerce, Logs, Customer 360, Fraud, or Recommendations) end-to-end on your environment with real or synthetic data.', level: 'champion', points: 100, badge: 'full_stack', checklist: ['Data pipeline runs', 'At least 2 outputs (e.g. console + file)', 'README or short doc on how to run'] },
];

const BADGE_LABELS: Record<Badge, string> = {
  first_spark: 'First Spark',
  sql_master: 'SQL Master',
  streamer: 'Streamer',
  ml_ninja: 'ML Ninja',
  perf_guru: 'Perf Guru',
  project_builder: 'Project Builder',
  full_stack: 'Full Stack',
};

export default function Assignments() {
  return (
    <section id="assignments" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-spark bg-spark/10 px-3 py-1 rounded-full uppercase tracking-wider">Gamified</span>
        <div className="h-px flex-1 bg-gradient-to-r from-spark/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4 gradient-text">Assignments (Gamified)</h2>
      <p className="text-slate-400 text-sm mb-8 max-w-2xl">
        Complete assignments to earn <strong className="text-slate-300">points</strong> and unlock <strong className="text-amber-400">badges</strong>. Track your progress with the checklist for each task. Levels: Beginner → Intermediate → Advanced → Champion. Total possible: <strong className="text-spark-light">1,000+ pts</strong>.
      </p>

      {/* Scoreboard placeholder */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-spark-light">1,000+</div>
          <div className="text-xs text-slate-400">Total points</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">7</div>
          <div className="text-xs text-slate-400">Badges</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white">18</div>
          <div className="text-xs text-slate-400">Assignments</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center">
          <Trophy className="w-8 h-8 mx-auto text-amber-400 mb-1" />
          <div className="text-xs text-slate-400">Champion = 100 pts</div>
        </div>
      </div>

      {/* Assignments list */}
      <div className="space-y-8">
        {ASSIGNMENTS.map((a, idx) => {
          const config = LEVEL_CONFIG[a.level];
          return (
            <div
              key={a.id}
              id={a.id}
              className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-6 hover:border-slate-600/60 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.color}`}>
                  {config.icon}
                  {config.label}
                </span>
                <span className="text-xs font-mono text-slate-500">{a.points} pts</span>
                {a.badge && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Award size={12} />
                    {BADGE_LABELS[a.badge]}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <Target size={18} className="text-spark shrink-0" />
                {idx + 1}. {a.title}
              </h3>
              <p className="text-sm text-slate-400 mb-4">{a.description}</p>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <h4 className="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Checklist (mark when done)</h4>
                <ul className="space-y-2">
                  {a.checklist.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                      <Circle size={16} className="text-slate-500 shrink-0" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Badges summary */}
      <div className="mt-12 p-6 rounded-xl bg-gradient-to-br from-amber-950/30 to-slate-900/50 border border-amber-500/20">
        <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
          <Award size={20} />
          Badges you can earn
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {(Object.entries(BADGE_LABELS) as [Badge, string][]).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Award size={14} className="text-amber-400" />
              </div>
              <span className="text-sm font-medium text-slate-300">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
