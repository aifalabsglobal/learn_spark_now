import { DiagramBlock } from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

export default function ADFConcepts() {
  return (
    <section id="adf-concepts" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-adf bg-adf/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 2</span>
        <div className="h-px flex-1 bg-gradient-to-r from-adf/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Top-Level Concepts</h2>

      <Callout type="info" title="Microsoft Learn">
        Per <a href="https://learn.microsoft.com/en-us/azure/data-factory/introduction#top-level-concepts" target="_blank" rel="noopener noreferrer" className="text-adf-light underline hover:no-underline">Microsoft Learn</a>, an Azure Data Factory instance is composed of pipelines, activities, datasets, linked services, integration runtime, triggers, and parameters. Understanding these is required before building pipelines.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        An Azure Data Factory instance is the top-level resource in your subscription. Inside it you create <strong className="text-slate-300">pipelines</strong> (which group <strong className="text-slate-300">activities</strong>), <strong className="text-slate-300">datasets</strong> (which point to data in stores), and <strong className="text-slate-300">linked services</strong> (which hold connection and auth details). Pipelines run on an <strong className="text-slate-300">integration runtime</strong> and are started by <strong className="text-slate-300">triggers</strong> or manually. This section defines each concept and how they relate.
      </p>

      <div id="adf-pipeline" className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          Pipeline
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          A <strong className="text-slate-300">pipeline</strong> is a logical grouping of activities that together perform a unit of work (e.g. “copy from Blob to SQL and then run a stored procedure”). You manage and deploy the pipeline as a single set; activities inside can run sequentially, in parallel, or conditional on the outcome of previous activities. There is a soft limit of about 120 activities per pipeline; for very large workflows, split into multiple pipelines and chain them.
        </p>
      </div>

      <div id="adf-activity" className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          Activity
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          An <strong className="text-slate-300">activity</strong> is a single processing step. Data Factory groups them into: <strong className="text-slate-300">data movement</strong> (e.g. Copy activity), <strong className="text-slate-300">data transformation</strong> (Mapping Data Flow, Hive, Databricks, stored procedure, etc.), and <strong className="text-slate-300">control flow</strong> (ForEach, If Condition, Lookup, Wait, Until). Each activity can have input and output datasets (for data activities) or no datasets (for control activities). Activities are connected so that output of one can be input or condition for the next.
        </p>
      </div>

      <div id="adf-datasets-linked" className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          Datasets and Linked Services
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          <strong className="text-slate-300">Datasets</strong> represent the structure of data in a store (e.g. a table name, file path, or folder). They reference a <strong className="text-slate-300">linked service</strong> for the connection and add structure (schema, format) and optional parameters (e.g. dynamic path). <strong className="text-slate-300">Linked services</strong> are like connection strings: they define how Data Factory connects to a data store (Azure Storage, SQL Server, REST API, etc.) or a compute resource (e.g. Azure Databricks, HDInsight). One linked service can be used by many datasets.
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
          The <strong className="text-slate-300">Integration Runtime (IR)</strong> is the compute bridge between the pipeline and the linked services. Use <strong className="text-slate-300">Azure IR</strong> when source and sink are in Azure or publicly reachable; use <strong className="text-slate-300">self-hosted IR</strong> when you need to reach on-premises or network-restricted sources. <strong className="text-slate-300">Triggers</strong> start pipeline runs: schedule (cron), event (e.g. blob created), or manual. <strong className="text-slate-300">Parameters</strong> and <strong className="text-slate-300">variables</strong> let you pass configuration (e.g. environment, table name) and hold temporary values between activities.
        </p>
        <EnhancementBox title="Concepts — enhancements" items={[
          'In ADF UI, create a linked service (e.g. Azure Blob), a dataset pointing to a path, and a pipeline with one activity.',
          'Add a schedule trigger to your pipeline and run it once manually; check the run history.',
          'Read the Microsoft Learn module on pipelines, activities, datasets, and linked services.',
        ]} />
      </div>
    </section>
  );
}
