import Callout from '../../components/Callout';

export default function DatabricksAssignments() {
  const assignments = [
    { part: 1, title: 'Workspace & first notebook', desc: 'Create a cluster, run spark.range(10).show(), and take a screenshot.' },
    { part: 2, title: 'Delta read/write', desc: 'Write a DataFrame to a Delta table and read it back; run OPTIMIZE once.' },
    { part: 3, title: 'SQL query & dashboard', desc: 'Create a SQL warehouse, run a query on a Delta table, add one visualization to a dashboard.' },
    { part: 5, title: 'MLflow run', desc: 'Log one training run with params and metrics; view it in the Experiments UI.' },
    { part: 6, title: 'Scheduled job', desc: 'Create a job with one notebook task and a daily schedule; trigger one run manually.' },
    { part: 8, title: 'Mini project', desc: 'Complete at least one of the three mini projects (ingest CSV, daily aggregation, or MLflow experiment).' },
  ];

  return (
    <section id="databricks-assignments" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-databricks bg-databricks/10 px-3 py-1 rounded-full uppercase tracking-wider">Assignments</span>
        <div className="h-px flex-1 bg-gradient-to-r from-databricks/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-6">Databricks Course Assignments</h2>
      <Callout type="info" title="Hands-on">
        Complete these as you go through the course. They mirror the Spark course pattern: fundamentals first, then SQL/Delta, ML, jobs, and a small project.
      </Callout>
      <div className="space-y-3 mt-6">
        {assignments.map((a, i) => (
          <div key={i} className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 flex items-start gap-3">
            <span className="text-xs font-bold text-databricks bg-databricks/10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">P{a.part}</span>
            <div>
              <h4 className="text-sm font-bold text-white">{a.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
