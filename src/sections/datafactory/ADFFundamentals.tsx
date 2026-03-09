import { DiagramBlock } from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function ADFFundamentals() {
  return (
    <section id="adf-fundamentals" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-adf bg-adf/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 1</span>
        <div className="h-px flex-1 bg-gradient-to-r from-adf/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">What is Azure Data Factory?</h2>

      <Callout type="info" title="Microsoft Learn">
        Content in this course is aligned with{' '}
        <a href="https://learn.microsoft.com/en-us/azure/data-factory/introduction" target="_blank" rel="noopener noreferrer" className="text-adf-light underline hover:no-underline">
          Introduction to Azure Data Factory
        </a>{' '}
        and{' '}
        <a href="https://learn.microsoft.com/en-us/training/modules/intro-to-azure-data-factory/" target="_blank" rel="noopener noreferrer" className="text-adf-light underline hover:no-underline">
          Introduction to Azure Data Factory (training module)
        </a>{' '}
        on Microsoft Learn.
      </Callout>

      <Callout type="info" title="In Plain English">
        Azure Data Factory is a <strong>cloud ETL/ELT service</strong> that moves and transforms data at scale. You connect sources (databases, files, APIs), define pipelines (copy, transform, orchestrate), and load data into warehouses or lakes — all without managing servers.
      </Callout>

      <div id="adf-why-exists" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          Why Azure Data Factory Exists
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Raw data in relational, non-relational, and file stores doesn’t provide context for analysts or decision makers. Big data needs a service that <strong className="text-slate-300">orchestrates and operationalizes</strong> processes to refine raw data into actionable insights.
        </p>
        <p className="text-slate-400 text-sm mb-4">
          Azure Data Factory is a <strong className="text-slate-300">managed cloud service</strong> for complex hybrid <strong className="text-slate-300">ETL</strong> (Extract, Transform, Load), <strong className="text-slate-300">ELT</strong>, and data integration projects.
        </p>

        <DiagramBlock title="ETL vs ELT">
{`ETL: Extract → Transform → Load
  (transform before loading; good for cleaning/standardizing)

ELT: Extract → Load → Transform
  (load raw first, transform in destination; good for scale)`}
        </DiagramBlock>
      </div>

      <div id="adf-features" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          Key Features (from Microsoft Learn)
        </h3>
        <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
          <li><strong className="text-slate-300">Data compression</strong> during copy to optimize bandwidth.</li>
          <li><strong className="text-slate-300">Broad connectivity</strong> to many data sources and sinks.</li>
          <li><strong className="text-slate-300">Custom event triggers</strong> to run pipelines when events occur.</li>
          <li><strong className="text-slate-300">Data preview and validation</strong> in copy activities.</li>
          <li><strong className="text-slate-300">Customizable data flows</strong> and integrated security (e.g. Entra ID, RBAC).</li>
        </ul>
      </div>

      <div id="adf-how-it-works" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          How It Works
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Data Factory provides an end-to-end platform: <strong className="text-slate-300">Connect and collect</strong> (ingest from disparate sources), <strong className="text-slate-300">Transform and enrich</strong> (mapping data flows, HDInsight, Databricks), <strong className="text-slate-300">CI/CD and publish</strong> (Azure DevOps, GitHub), and <strong className="text-slate-300">Monitor</strong> (Azure Monitor, health panels).
        </p>
      </div>
    </section>
  );
}
