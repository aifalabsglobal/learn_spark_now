import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

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

      <p className="text-slate-400 text-sm mb-6">
        The <strong className="text-slate-300">Copy activity</strong> is the primary way to move data between stores in Azure Data Factory. It runs on an <strong className="text-slate-300">integration runtime (IR)</strong> and supports 170+ connectors. You configure source and sink datasets, optional column mapping and transformations, and formats (delimited, Parquet, JSON, etc.). This section explains what Copy does, where it runs, which formats and scenarios are supported, and how to configure it in a pipeline.
      </p>

      <div id="adf-copy-basics" className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          What Copy Activity Does
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          The Copy activity reads data from a <strong className="text-slate-300">source</strong> data store and writes it to a <strong className="text-slate-300">sink</strong> data store. Source and sink can be on-premises, in Azure, or in another cloud (e.g. AWS S3, Google BigQuery). Copy runs on an <strong className="text-slate-300">integration runtime</strong>: use a <strong className="text-slate-300">self-hosted IR</strong> when the source or sink is on-premises or in a network that Azure cannot reach directly; use the <strong className="text-slate-300">Azure IR</strong> when both source and sink are publicly reachable (e.g. Azure Blob to Azure SQL Database).
        </p>
        <p className="text-slate-400 text-sm mb-4">
          The service that runs the Copy activity: reads from the source (using the connector and format you specify), performs serialization/deserialization, compression/decompression, and column mapping as configured, then writes to the sink. If you use a self-hosted IR, the machine hosting the IR must have network access to both source and sink. Copy supports parallelism (multiple partitions) to speed up large transfers; you can tune degree of parallelism and data integration units (DIUs) for Azure IR.
        </p>
      </div>

      <div id="adf-copy-formats" className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          Supported Formats and Scenarios
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Supported file formats include XML, Parquet, ORC, JSON, Avro, delimited text (CSV, TSV), Excel, and binary. You can copy files <strong className="text-slate-300">as-is</strong> between file stores (binary copy, no serialization) for maximum speed, or parse and write a specific format — for example copy Gzip-compressed CSV from Blob to a SQL table (decompressing and parsing on the fly), or copy from an on-premises Oracle table to Data Lake Gen2 as Parquet. Format conversion (e.g. CSV to Parquet) is configured in the source and sink dataset settings; Copy handles the conversion during the move.
        </p>
      </div>

      <div id="adf-copy-config" className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          Configuration
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          To use Copy you: (1) create a <strong className="text-slate-300">pipeline</strong> and add a Copy activity, (2) create <strong className="text-slate-300">datasets</strong> for source and sink (pointing to the actual store path or table and format), (3) create <strong className="text-slate-300">linked services</strong> for both stores (connection details and authentication). In the Copy activity you select the source and sink datasets, choose the integration runtime, and optionally set column mapping, fault tolerance, and performance settings. You can author pipelines in the Azure portal (Copy Data tool or Data Factory UI), or via ARM templates, REST API, PowerShell, or the Azure Data Factory SDK (e.g. Python, .NET).
        </p>
        <EnhancementBox title="Copy activity — enhancements" items={[
          'In Azure Portal, create a practice pipeline with one Copy activity (e.g. Blob → Blob or sample data).',
          'Try the Copy Data tool wizard and note how it creates linked services, datasets, and the pipeline for you.',
          'Read the "Supported data stores and formats" doc for Copy activity and list three source/sink pairs you might use.',
        ]} />
      </div>
    </section>
  );
}
