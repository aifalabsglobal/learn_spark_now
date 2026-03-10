import { ExternalLink } from 'lucide-react';
import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

const LEARN_LINKS = [
  { title: 'Introduction to Azure Data Factory', url: 'https://learn.microsoft.com/en-us/azure/data-factory/introduction' },
  { title: 'Intro to Azure Data Factory (training module)', url: 'https://learn.microsoft.com/en-us/training/modules/intro-to-azure-data-factory/' },
  { title: 'Pipelines and activities', url: 'https://learn.microsoft.com/en-us/azure/data-factory/concepts-pipelines-activities' },
  { title: 'Copy activity overview', url: 'https://learn.microsoft.com/en-us/azure/data-factory/copy-activity-overview' },
  { title: 'Integration runtime', url: 'https://learn.microsoft.com/en-us/azure/data-factory/concepts-integration-runtime' },
  { title: 'Datasets and linked services', url: 'https://learn.microsoft.com/en-us/azure/data-factory/concepts-datasets-linked-services' },
  { title: 'Transform data in ADF', url: 'https://learn.microsoft.com/en-us/azure/data-factory/transform-data' },
  { title: 'Quickstart: Create data factory (portal)', url: 'https://learn.microsoft.com/en-us/azure/data-factory/quickstart-create-data-factory-portal' },
  { title: 'Quickstart: Copy Data tool', url: 'https://learn.microsoft.com/en-us/azure/data-factory/quickstart-hello-world-copy-data-tool' },
  { title: 'Data Factory tutorials', url: 'https://learn.microsoft.com/en-us/azure/data-factory/data-factory-tutorials' },
  { title: 'Data Factory in Microsoft Fabric', url: 'https://learn.microsoft.com/en-us/fabric/data-factory/' },
];

export default function ADFResources() {
  return (
    <section id="adf-resources" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-adf bg-adf/10 px-3 py-1 rounded-full uppercase tracking-wider">Resources</span>
        <div className="h-px flex-1 bg-gradient-to-r from-adf/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-6">Microsoft Learn — Azure Data Factory</h2>
      <Callout type="info" title="Official resources">
        Use these Microsoft Learn links to go deeper on pipelines, Copy activity, integration runtimes, datasets, and transformations. Start with the introduction and quickstart, then explore Copy and transform tutorials.
      </Callout>
      <p className="text-slate-400 text-sm mb-6">
        Deepen your learning with official documentation and tutorials on Microsoft Learn.
      </p>
      <ul className="space-y-3">
        {LEARN_LINKS.map((link, i) => (
          <li key={i}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-adf-light hover:text-adf font-medium"
            >
              <ExternalLink size={14} />
              {link.title}
            </a>
          </li>
        ))}
      </ul>
      <EnhancementBox title="Resources — next steps" items={[
        'Complete at least one Microsoft Learn module and note the key concepts (pipelines, Copy, IR).',
        'Follow the "Copy data from Blob to SQL" tutorial end-to-end in the Azure portal.',
        'Bookmark the ADF connector list and identify connectors for your current or target data sources.',
      ]} />
    </section>
  );
}
