import CodeBlock, { DiagramBlock, InfoTable } from '../components/CodeBlock';
import Callout from '../components/Callout';

export default function Fundamentals() {
  return (
    <section id="fundamentals" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-spark bg-spark/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 1</span>
        <div className="h-px flex-1 bg-gradient-to-r from-spark/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8 gradient-text">Fundamentals</h2>

      {/* What is Spark */}
      <div id="what-is-spark" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          What is Apache Spark?
        </h3>
        <p className="text-slate-300 mb-4 leading-relaxed">
          Apache Spark is a <span className="text-spark-light font-semibold">unified analytics engine</span> for large-scale data processing. It provides high-level APIs in Java, Scala, Python, and R, and an optimized engine that supports general computation graphs.
        </p>

        <DiagramBlock title="Traditional MapReduce vs Spark">
{`MapReduce:  Disk → Map → Disk → Reduce → Disk  (SLOW - multiple disk I/O)
Spark:      Memory → Transform → Memory → Action → Output (100x FASTER)`}
        </DiagramBlock>

        <Callout type="tip" title="Simple Analogy">
          Imagine you're cooking. <span className="font-bold text-white">MapReduce</span> is like writing down the state of your dish on a piece of paper after every single step (chopping, sautéing, etc.). <span className="font-bold text-white">Spark</span> keeps everything in memory (in your head) and only writes it down when the dish is fully cooked. This makes Spark much faster!
        </Callout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            { label: 'Speed', value: '100x', desc: 'Faster than MapReduce' },
            { label: 'Languages', value: '4+', desc: 'Java, Scala, Python, R' },
            { label: 'Components', value: '5', desc: 'Core, SQL, Streaming, ML, Graph' },
          ].map((s, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-spark-light mb-1">{s.value}</div>
              <div className="text-sm font-semibold text-white mb-1">{s.label}</div>
              <div className="text-xs text-slate-400">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Spark */}
      <div id="why-spark" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Why Spark?
        </h3>

        <InfoTable
          headers={['Feature', 'MapReduce', 'Apache Spark']}
          rows={[
            ['Speed', 'Slow (Disk I/O)', '100x Faster (In-Memory)'],
            ['Ease of Use', 'Complex', 'Simple APIs'],
            ['Real-time', 'No', 'Yes (Streaming)'],
            ['Machine Learning', 'Limited', 'MLlib Built-in'],
            ['Graph Processing', 'No', 'GraphX Built-in'],
            ['Languages', 'Java', 'Java, Scala, Python, R'],
          ]}
        />
      </div>

      {/* Installation */}
      <div id="installation" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Installation & Setup
        </h3>

        <CodeBlock
          language="bash"
          title="Installation Steps"
          code={`# Step 1: Install Java
sudo apt-get install openjdk-11-jdk

# Step 2: Install Spark
wget https://downloads.apache.org/spark/spark-3.5.0/spark-3.5.0-bin-hadoop3.tgz
tar -xzf spark-3.5.0-bin-hadoop3.tgz
mv spark-3.5.0-bin-hadoop3 /opt/spark

# Step 3: Set Environment Variables
export SPARK_HOME=/opt/spark
export PATH=$SPARK_HOME/bin:$PATH

# Step 4: Install PySpark (Python)
pip install pyspark

# Step 5: Verify Installation
spark-shell          # Scala Shell
pyspark              # Python Shell
spark-submit --version`}
        />
      </div>

      {/* First App */}
      <div id="first-app" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          First Spark Application
        </h3>

        <Callout type="info" title="The Captain of the Ship">
          A <span className="font-bold text-white">SparkSession</span> is like the captain of a ship. It's the entry point that controls everything your application does. You always start by creating one!
        </Callout>

        <CodeBlock
          title="hello_spark.py"
          code={`from pyspark.sql import SparkSession

# STEP 1: Create a SparkSession (Entry Point)
# SparkSession is the single entry point to all Spark functionality
spark = SparkSession.builder \\
    .appName("MyFirstSparkApp") \\
    .master("local[*]") \\
    .getOrCreate()

# STEP 2: Create Data
data = [("Alice", 34), ("Bob", 45), ("Charlie", 29)]
columns = ["Name", "Age"]

# STEP 3: Create DataFrame
df = spark.createDataFrame(data, columns)

# STEP 4: Perform Operations
df.show()
# +-------+---+
# |   Name|Age|
# +-------+---+
# |  Alice| 34|
# |    Bob| 45|
# |Charlie| 29|
# +-------+---+

df.printSchema()
# root
#  |-- Name: string (nullable = true)
#  |-- Age: long (nullable = true)

# STEP 5: Stop SparkSession
spark.stop()`}
        />
      </div>
    </section>
  );
}
