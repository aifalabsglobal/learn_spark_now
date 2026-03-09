import { DiagramBlock } from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function DatabricksFundamentals() {
  return (
    <section id="databricks-fundamentals" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-databricks bg-databricks/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 1</span>
        <div className="h-px flex-1 bg-gradient-to-r from-databricks/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Databricks Fundamentals</h2>

      <Callout type="info" title="👋 In Plain English">
        Databricks is a <strong>cloud platform</strong> that runs Apache Spark and more — without you having to install or manage servers. Think of it like &quot;Spark as a service&quot;: you write notebooks or jobs, and Databricks handles clusters, storage, and security so you can focus on data and ML.
      </Callout>

      <div id="databricks-what-is" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          What is Databricks?
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-databricks-light mb-2">Step-by-step: Understanding the platform</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li><strong className="text-slate-300">Unified analytics:</strong> One place for data engineering, SQL analytics, and machine learning — all built on Apache Spark.</li>
            <li><strong className="text-slate-300">Managed Spark:</strong> Clusters are created and scaled for you; you just run notebooks or submit jobs.</li>
            <li><strong className="text-slate-300">Lakehouse:</strong> Combines data lake (cheap storage) with warehouse features (ACID, SQL, governance) via Delta Lake.</li>
            <li><strong className="text-slate-300">Who uses it:</strong> Data engineers, analysts, and ML engineers use Databricks for ETL, dashboards, and model training.</li>
          </ul>
        </div>

        <DiagramBlock title="Databricks in the stack">
{`Your code (notebooks, jobs)
        │
        ▼
┌─────────────────────┐
│     Databricks      │  (orchestration, UI, security)
│  - Workspace        │
│  - Jobs / Workflows │
└─────────┬───────────┘
          │
   ┌──────┼──────┐
   ▼      ▼      ▼
 Spark  Delta  MLflow
 (compute) (storage) (ML)`}
        </DiagramBlock>
      </div>

      <div id="databricks-why" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          Why Databricks?
        </h3>
        <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
          <li><strong className="text-slate-300">No cluster ops:</strong> Auto-scaling, auto-termination; you pay for compute only when it runs.</li>
          <li><strong className="text-slate-300">Same Spark APIs:</strong> PySpark and Spark SQL work as in the Spark course — skills transfer directly.</li>
          <li><strong className="text-slate-300">Delta Lake:</strong> ACID tables, time travel, and optimizations on top of object storage.</li>
          <li><strong className="text-slate-300">MLflow:</strong> Experiment tracking, model registry, and deployment built in.</li>
        </ul>
      </div>

      <div id="databricks-signup" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          Get Started (Free Tier)
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Sign up at <strong className="text-slate-300">databricks.com</strong> and create a workspace (e.g. community or trial). You get a URL like <code className="text-slate-300">https://your-workspace.cloud.databricks.com</code>. From there you can create clusters, notebooks, and SQL warehouses — no credit card required for community edition.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
          <h4 className="text-sm font-bold text-databricks-light mb-2">Quick checklist</h4>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>Create a workspace (trial or community)</li>
            <li>Create a cluster (single node is fine for learning)</li>
            <li>Create a notebook, attach the cluster, run <code className="text-slate-300">spark.range(10).show()</code></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
