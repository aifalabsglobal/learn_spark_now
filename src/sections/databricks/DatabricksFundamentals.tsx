import { DiagramBlock } from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

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

      <p className="text-slate-400 text-sm mb-6">
        Databricks was founded by the creators of Apache Spark and unifies data engineering, SQL analytics, and machine learning in one workspace. You get managed Spark clusters, Delta Lake for reliable storage, and MLflow for experiments and models. This section explains what the platform is, why teams choose it, and how to get started on a free tier.
      </p>

      <div id="databricks-what-is" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          What is Databricks?
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Databricks runs on top of cloud object storage (e.g. AWS S3, Azure Data Lake) and provides a workspace where you create clusters, run notebooks, schedule jobs, and query data with SQL. Under the hood it uses Apache Spark for distributed compute, Delta Lake for ACID tables and time travel, and MLflow for experiment tracking and model registry. Data engineers build ETL pipelines, analysts run SQL and build dashboards, and ML engineers train and deploy models — all in the same environment.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-databricks-light mb-2">Step-by-step: Understanding the platform</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li><strong className="text-slate-300">Unified analytics:</strong> One place for data engineering, SQL analytics, and machine learning — all built on Apache Spark. No context-switching between separate tools.</li>
            <li><strong className="text-slate-300">Managed Spark:</strong> Clusters are created and scaled for you; you attach a cluster to a notebook or job and run code. Auto-termination and spot instances reduce cost.</li>
            <li><strong className="text-slate-300">Lakehouse:</strong> Combines data lake (cheap, scalable storage) with warehouse features (ACID transactions, SQL, governance) via Delta Lake. One copy of data for both batch and streaming.</li>
            <li><strong className="text-slate-300">Who uses it:</strong> Data engineers (ETL, Delta), analysts (SQL warehouses, dashboards), and ML engineers (MLflow, AutoML) use Databricks in the same workspace.</li>
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
        <p className="text-slate-400 text-sm mb-4">
          Running Spark yourself means managing clusters, versions, security, and storage. Databricks removes that burden: you get auto-scaling, auto-termination, and a single pane for code, data, and ML. Your existing Spark skills (PySpark, Spark SQL) transfer directly — the APIs are the same. Delta Lake adds reliability and performance on top of object storage; MLflow is built in for experiment tracking and model registry.
        </p>
        <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
          <li><strong className="text-slate-300">No cluster ops:</strong> Auto-scaling, auto-termination; you pay for compute only when it runs. Use spot or photon for lower cost.</li>
          <li><strong className="text-slate-300">Same Spark APIs:</strong> PySpark and Spark SQL work as in the Spark course — skills transfer directly. No relearning.</li>
          <li><strong className="text-slate-300">Delta Lake:</strong> ACID tables, time travel, and optimizations (OPTIMIZE, Z-ORDER) on top of object storage. No more small-file problems.</li>
          <li><strong className="text-slate-300">MLflow:</strong> Experiment tracking, model registry, and deployment built in. Log metrics, compare runs, and promote models to staging/production.</li>
        </ul>
      </div>

      <div id="databricks-signup" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          Get Started (Free Tier)
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Sign up at <strong className="text-slate-300">databricks.com</strong> and create a workspace (e.g. community edition or trial). You get a URL like <code className="text-slate-300">https://your-workspace.cloud.databricks.com</code>. From there you can create clusters (single-node is fine for learning), notebooks, and SQL warehouses. The community edition does not require a credit card; the trial gives full features for a limited time.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
          <h4 className="text-sm font-bold text-databricks-light mb-2">Quick checklist</h4>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>Create a workspace (trial or community)</li>
            <li>Create a cluster (single node is fine for learning); wait until it is running</li>
            <li>Create a notebook, attach the cluster, and run <code className="text-slate-300">spark.range(10).show()</code> to confirm Spark is available</li>
          </ul>
        </div>
        <EnhancementBox title="Databricks fundamentals — enhancements" items={[
          'Sign up at databricks.com (community or trial), create a workspace, and note the URL.',
          'Create a cluster and a notebook; run spark.range(10).show() and df = spark.read.csv(...) with a sample file.',
          'Compare the notebook experience to local PySpark: same APIs, but no install — everything runs in the cloud.',
        ]} />
      </div>
    </section>
  );
}
