import { DiagramBlock } from '../../components/CodeBlock';

export default function ADFConcepts() {
  return (
    <section id="adf-concepts" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-adf bg-adf/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 2</span>
        <div className="h-px flex-1 bg-gradient-to-r from-adf/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Top-Level Concepts</h2>

      <p className="text-slate-400 text-sm mb-6">
        Per <a href="https://learn.microsoft.com/en-us/azure/data-factory/introduction#top-level-concepts" target="_blank" rel="noopener noreferrer" className="text-adf-light underline hover:no-underline">Microsoft Learn</a>, an Azure Data Factory instance is composed of these key components:
      </p>

      <div id="adf-pipeline" className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          Pipeline
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          A <strong className="text-slate-300">pipeline</strong> is a logical grouping of activities that perform a unit of work. You manage and deploy the pipeline as a set; activities can run sequentially or in parallel. (Soft limit: 120 activities per pipeline.)
        </p>
      </div>

      <div id="adf-activity" className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          Activity
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          An <strong className="text-slate-300">activity</strong> is a processing step. Data Factory has three groups: <strong className="text-slate-300">data movement</strong> (e.g. Copy), <strong className="text-slate-300">data transformation</strong> (Data Flow, Hive, Databricks, stored procedure), and <strong className="text-slate-300">control flow</strong> (ForEach, If Condition, Lookup, Wait).
        </p>
      </div>

      <div id="adf-datasets-linked" className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          Datasets and Linked Services
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          <strong className="text-slate-300">Datasets</strong> represent data structures in stores (tables, files, folders) and point to the data used as activity inputs/outputs. <strong className="text-slate-300">Linked services</strong> are like connection strings: they define how Data Factory connects to a data store or compute resource (e.g. Azure Storage, SQL Server, HDInsight).
        </p>
        <DiagramBlock title="Relationship">
{`Pipeline → Activity → Input/Output Datasets
Linked Service → connection to store or compute`}
        </DiagramBlock>
      </div>

      <div id="adf-ir-triggers" className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          Integration Runtime, Triggers, Parameters
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          <strong className="text-slate-300">Integration Runtime (IR)</strong> is the bridge between activities and linked services; it provides the compute environment (Azure IR, self-hosted IR). <strong className="text-slate-300">Triggers</strong> determine when a pipeline run is started (schedule, event, manual). <strong className="text-slate-300">Parameters</strong> and <strong className="text-slate-300">variables</strong> allow you to pass configuration and temporary values through pipelines.
        </p>
      </div>
    </section>
  );
}
