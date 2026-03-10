import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function DatabricksML() {
  return (
    <section id="databricks-ml" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-databricks bg-databricks/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 5</span>
        <div className="h-px flex-1 bg-gradient-to-r from-databricks/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">ML &amp; MLflow</h2>

      <Callout type="info" title="👋 In Plain English">
        <strong>MLflow</strong> is built into Databricks. You log experiments (parameters, metrics, artifacts), compare runs, and register models. <strong className="text-slate-300">Databricks AutoML</strong> can train baseline models from a table with minimal code — useful for quick prototypes.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Set an experiment, start a run, log params and metrics, and log the model. Use the Experiments UI to compare runs and promote models to the Model Registry. AutoML is available from the ML menu for classification and regression on tabular data.
      </p>

      <div id="databricks-mlflow" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          MLflow tracking
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          In a notebook, use <code className="text-slate-300">mlflow.set_experiment()</code> and <code className="text-slate-300">mlflow.log_param</code> / <code className="text-slate-300">log_metric</code> / <code className="text-slate-300">log_model</code>. The Databricks UI shows experiments, runs, and registered models.
        </p>
        <CodeBlock
          title="Log a run with MLflow"
          code={`import mlflow
from sklearn.ensemble import RandomForestClassifier

mlflow.set_experiment("/Users/you@company.com/my_experiment")
with mlflow.start_run():
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X_train, y_train)
    mlflow.log_param("n_estimators", 100)
    mlflow.log_metric("accuracy", accuracy_score(y_test, model.predict(X_test)))
    mlflow.sklearn.log_model(model, "model")`}
          language="python"
        />
      </div>

      <div id="databricks-automl" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          AutoML
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          From the ML menu, create an AutoML experiment: point to a Delta table and target column. Databricks trains multiple models (classification/regression), ranks them, and generates a notebook with the best pipeline. Good for baselines and feature exploration.
        </p>
</div>
    </section>
  );
}
