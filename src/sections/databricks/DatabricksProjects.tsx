import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

export default function DatabricksProjects() {
  return (
    <section id="databricks-projects" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-databricks bg-databricks/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 8</span>
        <div className="h-px flex-1 bg-gradient-to-r from-databricks/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Mini Projects</h2>
      <p className="text-slate-400 mb-4 text-sm">Short projects that tie together workspace, Delta, SQL, and jobs — matching the Spark course project style.</p>
      <Callout type="info" title="👋 In Plain English">
        These are <strong>hands-on exercises</strong>: ingest data into Delta, run Spark and SQL, then schedule a job. Each project is small enough to do in one sitting but uses real Databricks features.
      </Callout>

      <div id="databricks-project-1" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          Project 1: Ingest CSV to Delta
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Upload a CSV to DBFS or cloud storage, read it in a notebook, write as a Delta table in Unity Catalog. Run OPTIMIZE and query the table from a SQL query. Deliverable: one notebook + one SQL query.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-databricks-light mb-2">Steps</h4>
          <ul className="text-xs text-slate-400 space-y-1 list-decimal list-inside">
            <li>Create cluster and notebook; read CSV with <code className="text-slate-300">spark.read.csv(...)</code></li>
            <li>Write with <code className="text-slate-300">df.write.format("delta").saveAsTable("catalog.schema.my_table")</code></li>
            <li>In SQL, run SELECT and optionally build a simple dashboard widget</li>
          </ul>
        </div>
      </div>

      <div id="databricks-project-2" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          Project 2: Scheduled daily aggregation
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Create a notebook that reads from a Delta table, aggregates by day (e.g. counts, sums), and writes to an aggregate table. Schedule it as a job to run daily. Use task dependencies if you add an &quot;ingest&quot; step first.
        </p>
        <CodeBlock
          title="Notebook: daily rollup"
          code={`# Read source Delta table
from pyspark.sql.functions import count, countDistinct
daily = spark.read.table("catalog.schema.events") \\
  .groupBy("date") \\
  .agg(count("*").alias("events"), countDistinct("user_id").alias("users"))
daily.write.format("delta").mode("overwrite").saveAsTable("catalog.schema.daily_metrics")`}
          language="python"
        />
      </div>

      <div id="databricks-project-3" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          Project 3: MLflow experiment
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Train a simple classifier (e.g. sklearn or Spark MLlib) on a Delta table, log parameters and metrics with MLflow, and register the best model. Open the experiment in the UI and compare runs.
        </p>
        <EnhancementBox title="Projects — enhancements" items={[
          'Complete the ingest project: read from a source, write to Delta, add OPTIMIZE and a simple query.',
          'Build the aggregation project with window functions or groupBy; persist to Delta.',
          'Run the MLflow project: train, log, register; then load the model and run a batch prediction.',
        ]} />
      </div>
    </section>
  );
}
