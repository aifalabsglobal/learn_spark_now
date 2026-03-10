import CodeBlock, { DiagramBlock } from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

export default function DatabricksDelta() {
  return (
    <section id="databricks-delta" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-databricks bg-databricks/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 4</span>
        <div className="h-px flex-1 bg-gradient-to-r from-databricks/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Delta Lake</h2>

      <Callout type="info" title="👋 In Plain English">
        <strong>Delta Lake</strong> is storage for your tables that adds <strong>ACID</strong> (transactions, no partial writes), <strong>time travel</strong> (query past versions), and <strong>optimizations</strong> (OPTIMIZE, Z-ORDER). Your data still lives in cloud object storage (S3, ADLS); Delta is the format on top.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Write and read with the standard Spark DataFrame API using format &quot;delta&quot;. Use OPTIMIZE to compact small files and Z-ORDER to cluster by key columns for faster filters and joins.
      </p>

      <div id="databricks-delta-basics" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          Delta basics
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Read and write using the same Spark DataFrame API. Use <code className="text-slate-300">delta</code> format or the <code className="text-slate-300">DeltaTable</code> API. Tables can be managed (Databricks owns the files) or external (you specify the path).
        </p>
        <CodeBlock
          title="Write and read Delta"
          code={`# Write as Delta (managed or external)
df.write.format("delta").mode("overwrite").saveAsTable("catalog.schema.my_table")
# Or to a path
df.write.format("delta").mode("overwrite").save("/path/on/cloud/my_table")

# Read
spark.read.table("catalog.schema.my_table")
spark.read.format("delta").load("/path/on/cloud/my_table")`}
          language="python"
        />
      </div>

      <div id="databricks-delta-optimize" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          OPTIMIZE &amp; Z-ORDER
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Over time, small files accumulate. <strong className="text-slate-300">OPTIMIZE</strong> compacts files; <strong className="text-slate-300">Z-ORDER</strong> clusters data by columns to speed up filters and joins.
        </p>
        <CodeBlock
          title="Optimize a Delta table"
          code={`from delta.tables import DeltaTable

DeltaTable.forName(spark, "catalog.schema.my_table") \\
  .optimize() \\
  .executeZOrderBy("date", "user_id")`}
          language="python"
        />
      </div>

      <DiagramBlock title="Delta table layout">
{`Table: catalog.schema.events
├── _delta_log/     (transaction log, ACID)
├── part-00000.parquet
├── part-00001.parquet
└── ... (after OPTIMIZE: fewer, larger files)`}
      </DiagramBlock>
      <EnhancementBox title="Delta Lake — enhancements" items={[
        'Create a Delta table (df.write.format("delta").save(...) or CREATE TABLE), then run OPTIMIZE and VACUUM.',
        'Use time travel: SELECT * FROM table VERSION AS OF 0 or TIMESTAMP AS OF "timestamp".',
        'Try Z-ORDER BY on a frequently filtered column and compare query time before/after.',
      ]} />
    </section>
  );
}
