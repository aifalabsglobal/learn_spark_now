import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

export default function ADFPipelinesActivities() {
  return (
    <section id="adf-pipelines-activities" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-adf bg-adf/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 3</span>
        <div className="h-px flex-1 bg-gradient-to-r from-adf/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Pipelines and Activities</h2>

      <Callout type="info" title="Microsoft Learn">
        <a href="https://learn.microsoft.com/en-us/azure/data-factory/concepts-pipelines-activities" target="_blank" rel="noopener noreferrer" className="text-adf-light underline hover:no-underline">
          Pipelines and activities in Azure Data Factory and Azure Synapse Analytics
        </a>
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Pipelines contain activities that run in sequence or in parallel. Data movement is done with Copy; transformation uses Data Flow, Databricks, or other compute activities; control flow uses ForEach, If, Lookup, etc. This section summarizes the three activity groups and when to use each.
      </p>

      <div id="adf-overview" className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          Overview
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          A pipeline is a logical grouping of activities that together perform a task — e.g. ingest and clean log data, then run a mapping data flow. You deploy and schedule the <strong className="text-slate-300">pipeline</strong>, not each activity alone. Activities define actions on data (e.g. Copy from SQL Server to Blob; then Data Flow or Databricks to transform and load into Synapse).
        </p>
      </div>

      <div id="adf-data-movement" className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          Data Movement
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          <strong className="text-slate-300">Copy Activity</strong> copies data between supported data stores (Azure Blob, SQL, Cosmos DB, files, REST, and many more). Data from any supported source can be written to any supported sink. See the Microsoft Learn connector table for the full list.
        </p>
      </div>

      <div id="adf-data-transformation" className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          Data Transformation Activities
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Transformation activities run on compute: <strong className="text-slate-300">Mapping Data Flow</strong> (Spark, managed by ADF), <strong className="text-slate-300">Hive, Pig, MapReduce, Spark</strong> (HDInsight), <strong className="text-slate-300">Databricks Notebook/Jar/Python</strong>, <strong className="text-slate-300">Stored Procedure</strong>, <strong className="text-slate-300">Synapse Notebook</strong>, and others.
        </p>
      </div>

      <div id="adf-control-flow" className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          Control Flow Activities
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Control activities orchestrate flow: <strong className="text-slate-300">For Each</strong>, <strong className="text-slate-300">If Condition</strong>, <strong className="text-slate-300">Execute Pipeline</strong>, <strong className="text-slate-300">Lookup</strong>, <strong className="text-slate-300">Get Metadata</strong>, <strong className="text-slate-300">Wait</strong>, <strong className="text-slate-300">Until</strong>, <strong className="text-slate-300">Set/Append Variable</strong>, <strong className="text-slate-300">Validation</strong>, <strong className="text-slate-300">Web/Webhook</strong>, <strong className="text-slate-300">Filter</strong>.
        </p>
        <EnhancementBox title="Pipelines & activities — enhancements" items={[
          'Build a pipeline with a Lookup activity followed by a Copy activity that uses the lookup result.',
          'Add an If Condition to branch on a variable; use Set Variable and Append Variable in the pipeline.',
          'Create a child pipeline and call it with Execute Pipeline; pass parameters and use the output.',
        ]} />
      </div>
    </section>
  );
}
