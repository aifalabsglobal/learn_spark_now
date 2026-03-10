import Callout from '../../components/Callout';

export default function DatabricksSecurity() {
  return (
    <section id="databricks-security" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-databricks bg-databricks/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 7</span>
        <div className="h-px flex-1 bg-gradient-to-r from-databricks/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Security &amp; Unity Catalog</h2>

      <Callout type="info" title="👋 In Plain English">
        <strong>Unity Catalog</strong> is Databricks&apos; way to manage data access. You have <strong className="text-slate-300">catalogs</strong> (top-level), <strong className="text-slate-300">schemas</strong> (folders inside a catalog), and <strong className="text-slate-300">tables/views</strong>. Permissions are granted on these objects so only the right users and service principals can read or write.
      </Callout>

      <div id="databricks-unity-catalog" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          Unity Catalog hierarchy
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Three-level namespace: <code className="text-slate-300">catalog.schema.table</code>. Example: <code className="text-slate-300">main.default.events</code>. Grant <code className="text-slate-300">SELECT</code>, <code className="text-slate-300">MODIFY</code>, <code className="text-slate-300">USE SCHEMA</code>, etc. to groups or users. Table metadata and file access are enforced by the catalog — no direct S3/ADLS keys needed for users.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
          <h4 className="text-sm font-bold text-databricks-light mb-2">Key ideas</h4>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>Central place for all tables and views (Delta and others)</li>
            <li>Row and column-level security available</li>
            <li>Audit logs for who accessed what</li>
          </ul>
        </div>
</div>
    </section>
  );
}
