import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function DatabricksSQL() {
  return (
    <section id="databricks-sql" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-databricks bg-databricks/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 3</span>
        <div className="h-px flex-1 bg-gradient-to-r from-databricks/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Databricks SQL</h2>

      <Callout type="info" title="👋 In Plain English">
        <strong>Databricks SQL</strong> lets analysts run SQL queries and build dashboards without writing Spark code. You create a &quot;SQL warehouse&quot; (a managed Spark cluster for SQL), then write queries and visualize results in dashboards — similar to a cloud data warehouse experience.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        SQL warehouses run on the same Delta tables as your Spark workloads. Create queries and dashboards in the SQL workspace; reference tables with the three-level name catalog.schema.table when using Unity Catalog.
      </p>

      <div id="databricks-sql-warehouse" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          SQL Warehouse
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          A <strong className="text-slate-300">SQL warehouse</strong> is a serverless or classic cluster dedicated to SQL. You can scale it (size, min/max clusters) and set auto-stop. Queries run on the same Delta tables and views as your Spark jobs — one lakehouse, multiple interfaces.
        </p>
      </div>

      <div id="databricks-sql-queries" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          Queries &amp; Dashboards
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          In the SQL workspace you create <strong className="text-slate-300">queries</strong> (saved SQL) and <strong className="text-slate-300">dashboards</strong> (visualizations from query results). Use the catalog (Unity Catalog) to reference tables: <code className="text-slate-300">catalog.schema.table</code>.
        </p>
        <CodeBlock
          title="Example SQL (in a query or notebook)"
          code={`SELECT
  date_trunc('day', event_time) AS day,
  count(*) AS events,
  count(DISTINCT user_id) AS users
FROM catalog.schema.events
WHERE event_time >= current_date() - INTERVAL 7 DAYS
GROUP BY 1
ORDER BY 1`}
          language="sql"
        />
</div>
    </section>
  );
}
