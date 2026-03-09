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

      <Callout type="info" title="👋 In Plain English">
        Spark is a tool that helps computers work on <strong>huge amounts of information</strong> (like millions of names, numbers, or records) really fast by using many computers at once — like having lots of friends help you sort a giant pile of toys instead of doing it alone!
      </Callout>
      <p className="text-slate-500 text-xs mb-6">
        <strong>Windows users:</strong> All code examples in this guide use Windows-style paths (e.g. <code className="text-slate-400">C:/data/file.csv</code>). Python accepts forward slashes on Windows, so you can copy and run them as-is. Create folders like <code className="text-slate-400">C:\data</code> and <code className="text-slate-400">C:\spark_data</code> if needed.
      </p>

      {/* What is Spark */}
      <div id="what-is-spark" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          What is Apache Spark?
        </h3>
        <p className="text-slate-300 mb-2 leading-relaxed">
          Apache Spark is a <span className="text-spark-light font-semibold">unified analytics engine</span> for large-scale data processing. It provides high-level APIs in Java, Scala, Python, and R, and an optimized engine that supports general computation graphs.
        </p>
        <p className="text-slate-400 text-sm mb-4 italic">
          In simple words: Spark is like a super-fast team that can read, sort, and count huge piles of data using many computers at the same time. You can talk to it in Python, Java, or other languages.
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
        <p className="text-slate-400 text-sm mb-4">
          Why do people use Spark? Because it&apos;s <strong className="text-slate-300">faster</strong> (it keeps data in memory instead of writing to disk every step), <strong className="text-slate-300">easier</strong> to use than older tools, and can do real-time streaming and machine learning too!
        </p>

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
          Installation & Setup (Windows)
        </h3>

        <p className="text-slate-400 text-sm mb-4">
          Follow these steps in order. Use <strong className="text-slate-300">PowerShell</strong> or <strong className="text-slate-300">Command Prompt</strong> (right-click Start → Terminal or search &quot;PowerShell&quot;). Each step is explained so you know what you&apos;re doing.
        </p>

        <div className="space-y-4 mb-6">
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-spark-light mb-1">Step 1 — Install Java</h4>
            <p className="text-xs text-slate-400">Spark needs Java to run. Open PowerShell and run <code className="text-slate-300">winget install OpenJDK.JDK.11</code> (if you have Winget). Or download the JDK from <a href="https://adoptium.net/" className="text-spark hover:underline" target="_blank" rel="noopener noreferrer">adoptium.net</a> or <a href="https://www.oracle.com/java/technologies/downloads/" className="text-spark hover:underline" target="_blank" rel="noopener noreferrer">oracle.com</a>, run the installer, and note where it installed (e.g. <code className="text-slate-300">C:\Program Files\Eclipse Adoptium\jdk-11.x.x</code>). You&apos;ll need this path for <code className="text-slate-300">JAVA_HOME</code> later.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-spark-light mb-1">Step 2 — Download and Install Spark</h4>
            <p className="text-xs text-slate-400">Download the Spark archive from <a href="https://spark.apache.org/downloads.html" className="text-spark hover:underline" target="_blank" rel="noopener noreferrer">spark.apache.org/downloads</a> (choose &quot;Pre-built for Apache Hadoop 3&quot;). You get a <code className="text-slate-300">.tgz</code> file — right-click → Extract (or use 7-Zip). Move the extracted folder to <code className="text-slate-300">C:\spark</code> so the full path is <code className="text-slate-300">C:\spark\bin\spark-shell.cmd</code>. Or use the PowerShell commands below to download and extract.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-spark-light mb-1">Step 3 — Set Environment Variables</h4>
            <p className="text-xs text-slate-400">Windows needs to know where Spark and Java live. Press <strong>Win + X</strong> → <strong>System</strong> → <strong>Advanced system settings</strong> → <strong>Environment Variables</strong>. Under &quot;System variables&quot; click <strong>New</strong>: add <code className="text-slate-300">SPARK_HOME</code> = <code className="text-slate-300">C:\spark</code> (or your Spark folder). Add <code className="text-slate-300">JAVA_HOME</code> = your JDK folder (e.g. <code className="text-slate-300">C:\Program Files\Eclipse Adoptium\jdk-11.0.21.9-hotspot</code>). Edit <code className="text-slate-300">Path</code> and add <code className="text-slate-300">%SPARK_HOME%\bin</code>. Click OK, then <strong>close and reopen</strong> PowerShell so the new variables are loaded.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-spark-light mb-1">Step 4 — Install PySpark (Python)</h4>
            <p className="text-xs text-slate-400">Install Python from <a href="https://www.python.org/downloads/" className="text-spark hover:underline" target="_blank" rel="noopener noreferrer">python.org</a> if you don&apos;t have it (check &quot;Add Python to PATH&quot;). Open a <strong>new</strong> PowerShell and run <code className="text-slate-300">pip install pyspark</code>. This installs the Python library that talks to Spark so you can write Spark code in Python.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-spark-light mb-1">Step 5 — Verify Installation</h4>
            <p className="text-xs text-slate-400">In a new PowerShell window run <code className="text-slate-300">spark-shell</code> (Scala) or <code className="text-slate-300">pyspark</code> (Python). You should see the Spark logo and a prompt. Type <code className="text-slate-300">:quit</code> in spark-shell or <code className="text-slate-300">exit()</code> in pyspark to exit. Run <code className="text-slate-300">spark-submit --version</code> to see the version. If you get &quot;not recognized&quot;, the PATH or SPARK_HOME is wrong — double-check Step 3 and restart the terminal.</p>
          </div>
        </div>

        <CodeBlock
          language="powershell"
          title="PowerShell: Install Java and download Spark"
          code={`# Step 1: Install Java (Windows Package Manager)
winget install OpenJDK.JDK.11

# Step 2: Download Spark and extract to C:\\spark (run in PowerShell)
$sparkUrl = "https://downloads.apache.org/spark/spark-3.5.0/spark-3.5.0-bin-hadoop3.tgz"
$out = "$env:USERPROFILE\\Downloads\\spark-3.5.0-bin-hadoop3.tgz"
Invoke-WebRequest -Uri $sparkUrl -OutFile $out -UseBasicParsing
# Extract: use 7-Zip (Install-Module -Name 7Zip4Powershell) or Windows 10+ built-in:
tar -xzf $out -C $env:USERPROFILE\\Downloads
Move-Item "$env:USERPROFILE\\Downloads\\spark-3.5.0-bin-hadoop3" C:\\spark`}
        />
        <CodeBlock
          language="powershell"
          title="PowerShell: Set variables for this session (optional, until you set them in System)"
          code={`# Use your actual paths! Then add C:\\spark\\bin to PATH in Environment Variables (Step 3 above)
$env:SPARK_HOME = "C:\\spark"
$env:JAVA_HOME = "C:\\Program Files\\Eclipse Adoptium\\jdk-11.0.21.9-hotspot"   # or your JDK path
$env:Path += ";$env:SPARK_HOME\\bin"`}
        />
        <CodeBlock
          language="powershell"
          title="Step 4 & 5: Install PySpark and verify (PowerShell)"
          code={`# Step 4: Install PySpark (Python must be installed and in PATH)
pip install pyspark

# Step 5: Check that Spark works (open a NEW PowerShell after setting env vars)
spark-shell          # Scala — type :quit to exit
pyspark              # Python — type exit() to exit
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
          A <span className="font-bold text-white">SparkSession</span> is like the captain of a ship. It&apos;s the entry point that controls everything your application does. You always start by creating one!
        </Callout>
        <p className="text-slate-400 text-sm mb-4">
          In the code below: we (1) say &quot;Start Spark!&quot;, (2) make a small table with names and ages, (3) show it on the screen. That&apos;s your first Spark program!
        </p>

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
