import Callout from '../../components/Callout';

export default function ADFCopyActivity() {
  return (
    <section id="adf-copy-activity" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-adf bg-adf/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 4</span>
        <div className="h-px flex-1 bg-gradient-to-r from-adf/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Copy Activity</h2>

      <Callout type="info" title="Microsoft Learn">
        <a href="https://learn.microsoft.com/en-us/azure/data-factory/copy-activity-overview" target="_blank" rel="noopener noreferrer" className="text-adf-light underline hover:no-underline">
          Copy activity in Azure Data Factory and Azure Synapse Analytics
        </a>
      </Callout>

      <div id="adf-copy-basics" className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          What Copy Activity Does
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          The <strong className="text-slate-300">Copy activity</strong> copies data between data stores (on-premises and cloud). After copying, you can use other activities to transform and analyze. Copy runs on an <strong className="text-slate-300">integration runtime</strong>: use <strong className="text-slate-300">self-hosted IR</strong> for on-premises or network-restricted sources; use <strong className="text-slate-300">Azure IR</strong> when both source and sink are publicly reachable.
        </p>
        <p className="text-slate-400 text-sm mb-4">
          The service that runs Copy: reads from source, performs serialization/deserialization, compression, column mapping as configured, and writes to the sink. If self-hosted IR is used, both source and sink must be reachable from the machine hosting the IR.
        </p>
      </div>

      <div id="adf-copy-formats" className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          Supported Formats and Scenarios
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Supported file formats include XML, Parquet, ORC, JSON, Avro, delimited text, Excel, binary. You can copy files <strong className="text-slate-300">as-is</strong> between file stores (no serialization), or parse/generate specific formats — e.g. copy Gzip CSV from Blob to SQL, or decompress on-the-fly from on-premises to Data Lake Gen2.
        </p>
      </div>

      <div id="adf-copy-config" className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          Configuration
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          To use Copy you: (1) create a pipeline with a Copy activity, (2) create datasets for source and sink, (3) create linked services for both stores. You can use the Azure portal (Copy Data tool or Data Factory UI), ARM templates, REST, PowerShell, Python, or .NET SDK.
        </p>
      </div>
    </section>
  );
}
