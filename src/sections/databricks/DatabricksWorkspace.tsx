import CodeBlock, { DiagramBlock } from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function DatabricksWorkspace() {
  return (
    <section id="databricks-workspace" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-databricks bg-databricks/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 2</span>
        <div className="h-px flex-1 bg-gradient-to-r from-databricks/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Workspace &amp; Notebooks</h2>

      <Callout type="info" title="👋 In Plain English">
        The <strong>workspace</strong> is your project folder in the cloud. <strong>Notebooks</strong> are where you write and run code (Python, SQL, etc.). A <strong>cluster</strong> is the set of machines that run your code — you pick the size and Databricks starts and stops it for you.
      </Callout>

      <div id="databricks-clusters" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          Clusters
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          A <strong className="text-slate-300">cluster</strong> is a group of VMs that run the Spark driver and executors. You choose: runtime version (Spark + Scala), node type, and min/max workers for autoscaling. Use &quot;Single node&quot; for small experiments to save cost.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-databricks-light mb-2">Key settings</h4>
          <ul className="text-xs text-slate-400 space-y-1">
            <li><strong className="text-slate-300">Cluster mode:</strong> Standard (shared), High concurrency (SQL), or Single node</li>
            <li><strong className="text-slate-300">Autoscaling:</strong> Min and max workers; scale to zero when idle (serverless in some regions)</li>
            <li><strong className="text-slate-300">Auto-termination:</strong> Idle timeout so the cluster stops when not in use</li>
          </ul>
        </div>
      </div>

      <div id="databricks-notebooks" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          Notebooks
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Notebooks support Python, SQL, Scala, and R. Attach a cluster to run cells. <code className="text-slate-300">spark</code> is pre-injected — no need to create a SparkSession.
        </p>
        <CodeBlock
          title="First notebook cell (Python)"
          code={`# spark is already available
df = spark.range(100)
df.selectExpr("id", "id * 2 as doubled").show(5)`}
          language="python"
        />
        <DiagramBlock title="Notebook → Cluster flow">
{`Notebook (browser)
    │ Run cell
    ▼
Driver (on cluster)
    │ Schedule tasks
    ▼
Executors (workers)
    │ Return results
    ▼
Notebook (output)`}
        </DiagramBlock>
      </div>

      <div id="databricks-repos" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-databricks rounded-full" />
          Repos &amp; Git
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Connect a Git repo (GitHub, GitLab, etc.) to sync notebooks and scripts. Use <strong className="text-slate-300">Repos</strong> in the workspace to clone, branch, and run CI/CD from the same UI.
        </p>
      </div>
    </section>
  );
}
