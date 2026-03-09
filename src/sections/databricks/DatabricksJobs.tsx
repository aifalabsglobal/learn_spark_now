import { DiagramBlock } from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function DatabricksJobs() {
  return (
    <section id="databricks-jobs" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-databricks bg-databricks/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 6</span>
        <div className="h-px flex-1 bg-gradient-to-r from-databricks/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Jobs &amp; Workflows</h2>

      <Callout type="info" title="👋 In Plain English">
        <strong>Jobs</strong> run your notebooks or scripts on a schedule or trigger. A <strong className="text-slate-300">workflow</strong> can have multiple tasks (e.g. ingest → transform → train) with dependencies, so the next task runs only after the previous one succeeds — like a pipeline.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Create a job in the Workflows UI, add tasks (notebook, JAR, or Python script), set a cluster per task or use a job cluster. Use task dependencies to chain ingest, transform, and load steps. Schedule with cron or trigger via API.
      </p>

      <div id="databricks-job-basics" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          Creating a job
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          In the Workflows UI, create a job and add tasks: run a notebook, run a JAR, or run a Python script. Each task can use a different cluster or a job cluster (created for the run, then torn down). Set a schedule (cron) or trigger via API.
        </p>
      </div>

      <div id="databricks-workflow-deps" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          Task dependencies
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Chain tasks: e.g. Task B depends on Task A. When A completes successfully, B runs. Use this for ETL: load raw data → run Spark job → refresh dashboard. You can also pass parameters or output paths between tasks.
        </p>
        <DiagramBlock title="Simple workflow">
{`[Schedule]
    │
    ▼
Task 1: Ingest (notebook)
    │ success
    ▼
Task 2: Transform (notebook)
    │ success
    ▼
Task 3: Notify (e.g. Slack)`}
        </DiagramBlock>
      </div>
    </section>
  );
}
