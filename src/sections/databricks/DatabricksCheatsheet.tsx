import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function DatabricksCheatsheet() {
  return (
    <section id="databricks-cheatsheet" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-databricks bg-databricks/10 px-3 py-1 rounded-full uppercase tracking-wider">Reference</span>
        <div className="h-px flex-1 bg-gradient-to-r from-databricks/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Databricks Quick Reference</h2>
      <Callout type="info" title="Quick reference">
        Copy-paste snippets for Spark in notebooks, Delta OPTIMIZE, MLflow logging, and Unity Catalog naming.
      </Callout>
      <p className="text-slate-400 text-sm mb-8">Use these in notebooks and SQL for common platform tasks.</p>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-5 bg-databricks rounded-full" />
            <span className="text-sm font-semibold text-white">Notebook: Spark</span>
          </div>
          <CodeBlock
            code={`# spark is pre-injected
df = spark.read.table("catalog.schema.my_table")
df.write.format("delta").mode("overwrite").saveAsTable("catalog.schema.out")`}
            language="python"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-5 bg-databricks rounded-full" />
            <span className="text-sm font-semibold text-white">Delta OPTIMIZE</span>
          </div>
          <CodeBlock
            code={`from delta.tables import DeltaTable
DeltaTable.forName(spark, "catalog.schema.t").optimize().executeZOrderBy("col1")`}
            language="python"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-5 bg-databricks rounded-full" />
            <span className="text-sm font-semibold text-white">MLflow</span>
          </div>
          <CodeBlock
            code={`import mlflow
mlflow.set_experiment("/Users/you@company.com/exp")
with mlflow.start_run():
    mlflow.log_param("x", 1)
    mlflow.log_metric("accuracy", 0.95)
    mlflow.sklearn.log_model(model, "model")`}
            language="python"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-5 bg-databricks rounded-full" />
            <span className="text-sm font-semibold text-white">Unity Catalog</span>
          </div>
          <div className="text-xs text-slate-400 space-y-1">
            <div>Three-level: <code className="text-slate-300">catalog.schema.table</code></div>
            <div>Managed table: Databricks manages path. External: you specify location.</div>
          </div>
        </div>
      </div>
</section>
  );
}
