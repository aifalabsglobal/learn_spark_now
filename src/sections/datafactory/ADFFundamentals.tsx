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

      <Callout type="info" title="👋 In Plain English">
        Azure Data Factory is a <strong>cloud ETL/ELT service</strong> that moves and transforms data at scale. You connect sources (databases, files, APIs), define pipelines (copy, transform, orchestrate), and load data into warehouses or lakes — all without managing servers.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Raw data in relational databases, data lakes, and file stores rarely gives analysts and decision-makers the context they need. Azure Data Factory (ADF) is Microsoft’s managed service for building and running ETL/ELT and data integration workflows in the cloud. You define <strong className="text-slate-300">pipelines</strong> (sequences of activities), connect to 170+ connectors, and run on a schedule or in response to events.
      </p>

      <div id="adf-why-exists" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          Why Azure Data Factory Exists
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Data lives in many places: on-prem SQL Server, Azure Blob, Salesforce, REST APIs. Turning that raw data into actionable insights requires <strong className="text-slate-300">orchestration</strong> (when to run what) and <strong className="text-slate-300">operationalization</strong> (monitoring, retries, alerting). Doing this with custom scripts or legacy tools is brittle and hard to scale. ADF provides a managed, serverless platform so you can focus on the logic, not the infrastructure.
        </p>
        <p className="text-slate-400 text-sm mb-4">
          Azure Data Factory is built for complex hybrid <strong className="text-slate-300">ETL</strong> (Extract, Transform, Load) and <strong className="text-slate-300">ELT</strong> (Extract, Load, Transform) projects. You choose whether to transform before loading (ETL) or load raw first and transform in the destination (ELT); ADF supports both patterns with a wide set of activities and connectors.
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
        <p className="text-slate-400 text-sm mb-4">
          ADF offers data movement at scale, built-in compression and parallelism, and tight integration with other Azure services (Synapse, Databricks, HDInsight). You get visibility into pipeline runs, data preview and validation in copy activities, and security via Entra ID and role-based access control.
        </p>
        <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
          <li><strong className="text-slate-300">Data compression</strong> during copy to reduce bandwidth and cost.</li>
          <li><strong className="text-slate-300">Broad connectivity</strong> — 170+ connectors to databases, file stores, SaaS apps, and APIs.</li>
          <li><strong className="text-slate-300">Custom event triggers</strong> to run pipelines when blobs appear, events fire, or on a schedule.</li>
          <li><strong className="text-slate-300">Data preview and validation</strong> in copy activities so you can verify before full load.</li>
          <li><strong className="text-slate-300">Customizable data flows</strong> (mapping data flows) and integrated security (Entra ID, RBAC, managed identities).</li>
        </ul>
      </div>

      <div id="adf-how-it-works" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-adf rounded-full" />
          How It Works
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          ADF is organized around four capabilities: <strong className="text-slate-300">Connect and collect</strong> (ingest from disparate sources using linked services and datasets), <strong className="text-slate-300">Transform and enrich</strong> (mapping data flows, or external compute like Azure Databricks and HDInsight), <strong className="text-slate-300">CI/CD and publish</strong> (integrate with Azure DevOps and GitHub for versioned pipeline deployment), and <strong className="text-slate-300">Monitor</strong> (Azure Monitor, health panels, and run history). In the next sections we’ll cover pipelines, activities, and the Copy activity in detail.
        </p>
</div>
    </section>
  );
}
