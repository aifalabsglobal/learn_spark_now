import CodeBlock, { DiagramBlock, InfoTable } from '../components/CodeBlock';
import Callout from '../components/Callout';
import { SparkStackInfographic } from '../components/InfographicCard';
import EnhancementBox from '../components/EnhancementBox';

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
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-spark-light mb-2">Step-by-step: Understanding Spark</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li><strong className="text-slate-300">What it is:</strong> Spark is an engine that processes huge amounts of data (millions or billions of rows) by splitting the work across many machines.</li>
            <li><strong className="text-slate-300">Why &quot;unified&quot;:</strong> One tool can do batch processing, SQL, streaming, and machine learning — you don&apos;t need separate systems.</li>
            <li><strong className="text-slate-300">Why it&apos;s fast:</strong> It keeps data in memory instead of writing to disk after every step, so it can be up to 100x faster than older MapReduce-style tools.</li>
            <li><strong className="text-slate-300">Who uses it:</strong> Data engineers and data scientists use Spark to clean, transform, and analyze large datasets (e.g. logs, sales, sensors) on a cluster or on a single machine.</li>
          </ul>
        </div>
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

        <SparkStackInfographic />
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
        <EnhancementBox items={[
          'Try Spark on a cloud provider (Databricks, EMR, or Azure Synapse) with a sample dataset.',
          'Compare run time of a simple job with 1 partition vs 8 partitions (repartition).',
          'Install and run the same hello_spark.py on WSL2 if you use Windows, and compare.',
        ]} />
      </div>

      {/* Why Spark */}
      <div id="why-spark" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Why Spark?
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-spark-light mb-2">Step-by-step: Why choose Spark?</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li><strong className="text-slate-300">Speed:</strong> Data stays in memory between steps, so you avoid slow disk reads/writes. Result: much faster than classic MapReduce.</li>
            <li><strong className="text-slate-300">Ease of use:</strong> You write simple APIs (e.g. filter, groupBy, SQL) instead of low-level map/reduce code.</li>
            <li><strong className="text-slate-300">Real-time:</strong> Streaming lets you process data as it arrives (e.g. live clicks, logs) instead of waiting for a daily batch.</li>
            <li><strong className="text-slate-300">One platform:</strong> Use the same engine for SQL, streaming, and ML (MLlib) instead of stitching multiple tools together.</li>
            <li><strong className="text-slate-300">Languages:</strong> Write in Python, Scala, Java, or R — pick what your team already knows.</li>
          </ul>
        </div>
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
          Follow these steps in order. Use <strong className="text-slate-300">PowerShell</strong> or <strong className="text-slate-300">Command Prompt</strong> (right-click Start → Terminal or search &quot;PowerShell&quot;). Each step has detailed sub-steps so you know exactly what to do.
        </p>

        <div className="space-y-6 mb-6">
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-5">
            <h4 className="text-sm font-bold text-spark-light mb-2">Step 1 — Install Java</h4>
            <p className="text-xs text-slate-400 mb-3">Spark needs Java to run. Choose one option below.</p>
            <ul className="text-xs text-slate-400 space-y-2 list-decimal list-inside">
              <li>Press <strong className="text-slate-300">Win + X</strong>, then click <strong>Terminal</strong> or <strong>Windows PowerShell</strong>.</li>
              <li><strong>Option A (Winget):</strong> Type <code className="text-slate-300 bg-slate-700/50 px-1 rounded">winget install OpenJDK.JDK.11</code> and press Enter. If prompted, type <code className="text-slate-300">Y</code> to accept. Wait until it says &quot;Successfully installed&quot;.</li>
              <li><strong>Option B (Manual):</strong> Go to <a href="https://adoptium.net/" className="text-spark hover:underline" target="_blank" rel="noopener noreferrer">adoptium.net</a>, click <strong>Download</strong>, choose <strong>Windows x64</strong> and <strong>JDK 11 (LTS)</strong>. Run the downloaded <code className="text-slate-300">.msi</code> file. Click <strong>Next</strong> through the wizard; leave the default install path (e.g. <code className="text-slate-300">C:\Program Files\Eclipse Adoptium\jdk-11.x.x-hotspot</code>) and write it down.</li>
              <li>Verify: in a <strong>new</strong> PowerShell window type <code className="text-slate-300">java -version</code>. You should see a version like <code className="text-slate-300">openjdk version &quot;11.0.x&quot;</code>. If you see &quot;not recognized&quot;, Java is not in PATH — use Option B and during install check &quot;Set JAVA_HOME variable&quot; and &quot;Add to PATH&quot;.</li>
            </ul>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-5">
            <h4 className="text-sm font-bold text-spark-light mb-2">Step 2 — Download and Install Spark</h4>
            <ul className="text-xs text-slate-400 space-y-2 list-decimal list-inside">
              <li>Open <a href="https://spark.apache.org/downloads.html" className="text-spark hover:underline" target="_blank" rel="noopener noreferrer">spark.apache.org/downloads</a> in your browser.</li>
              <li>Under &quot;Download Apache Spark&quot;, choose the latest <strong>3.5.x</strong> (or current stable). In the dropdown for &quot;Package type&quot; select <strong>Pre-built for Apache Hadoop 3.3 and later</strong>. Click the <strong>Download Spark</strong> link (e.g. <code className="text-slate-300">spark-3.5.0-bin-hadoop3.tgz</code>).</li>
              <li>Save the file to your <strong>Downloads</strong> folder. It is a large file (300+ MB); download may take a few minutes.</li>
              <li><strong>Extract:</strong> In File Explorer, go to Downloads. Right-click the <code className="text-slate-300">.tgz</code> file. On Windows 11 or recent Windows 10, choose <strong>Extract All</strong>. If you don&apos;t see it, install <a href="https://www.7-zip.org/" className="text-spark hover:underline" target="_blank" rel="noopener noreferrer">7-Zip</a>, then right-click → 7-Zip → Extract to &quot;spark-3.5.0-bin-hadoop3\&quot;.</li>
              <li>You should now have a folder named <code className="text-slate-300">spark-3.5.0-bin-hadoop3</code>. <strong>Rename or move</strong> this folder to <code className="text-slate-300">C:\spark</code>. To do that: create folder <code className="text-slate-300">C:\spark</code> if it doesn&apos;t exist (open C:\, right-click → New → Folder, name it <code className="text-slate-300">spark</code>). Then move the contents of the extracted folder into <code className="text-slate-300">C:\spark</code> so that <code className="text-slate-300">C:\spark\bin\spark-shell.cmd</code> exists.</li>
              <li>Alternatively, run the PowerShell commands in the code block below to download and extract automatically.</li>
            </ul>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-5">
            <h4 className="text-sm font-bold text-spark-light mb-2">Step 3 — Set Environment Variables</h4>
            <ul className="text-xs text-slate-400 space-y-2 list-decimal list-inside">
              <li>Press <strong className="text-slate-300">Win + X</strong>, then click <strong>System</strong> (or open Settings → System → About).</li>
              <li>Click <strong>Advanced system settings</strong> (on the right). In the window that opens, click the <strong>Environment Variables</strong> button at the bottom.</li>
              <li>In the <strong>System variables</strong> section (bottom half), click <strong>New</strong>. Variable name: <code className="text-slate-300">SPARK_HOME</code>. Variable value: <code className="text-slate-300">C:\spark</code> (or the full path where you put Spark). Click <strong>OK</strong>.</li>
              <li>Click <strong>New</strong> again. Variable name: <code className="text-slate-300">JAVA_HOME</code>. Variable value: the folder where Java is installed, e.g. <code className="text-slate-300">C:\Program Files\Eclipse Adoptium\jdk-11.0.21.9-hotspot</code> (use the path you noted in Step 1). Click <strong>OK</strong>.</li>
              <li>In System variables, find the variable named <strong>Path</strong>. Select it and click <strong>Edit</strong>. Click <strong>New</strong> and add: <code className="text-slate-300">%SPARK_HOME%\bin</code>. Click <strong>OK</strong> on all open windows.</li>
              <li><strong>Important:</strong> Close any open PowerShell or Command Prompt windows, then open a <strong>new</strong> one. Environment variables are only loaded when a terminal starts.</li>
            </ul>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-5">
            <h4 className="text-sm font-bold text-spark-light mb-2">Step 4 — Install PySpark (Python)</h4>
            <ul className="text-xs text-slate-400 space-y-2 list-decimal list-inside">
              <li>Check if Python is installed: open a new PowerShell and type <code className="text-slate-300">python --version</code>. If you see <code className="text-slate-300">Python 3.8</code> or higher, skip to the last bullet. If you see &quot;not recognized&quot;, install Python first.</li>
              <li>Go to <a href="https://www.python.org/downloads/" className="text-spark hover:underline" target="_blank" rel="noopener noreferrer">python.org/downloads</a>, download the latest Python 3.x for Windows. Run the installer.</li>
              <li>On the first screen, <strong>check the box</strong> that says <strong>&quot;Add python.exe to PATH&quot;</strong>. Then click <strong>Install Now</strong>. When done, close the installer.</li>
              <li>Open a <strong>new</strong> PowerShell. Type <code className="text-slate-300">pip install pyspark</code> and press Enter. Wait until it says &quot;Successfully installed pyspark&quot;.</li>
            </ul>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-5">
            <h4 className="text-sm font-bold text-spark-light mb-2">Step 5 — Verify Installation</h4>
            <ul className="text-xs text-slate-400 space-y-2 list-decimal list-inside">
              <li>Open a <strong>new</strong> PowerShell (after completing Steps 1–3 at least). Type <code className="text-slate-300">spark-submit --version</code> and press Enter. You should see a few lines with &quot;version 3.5.0&quot; (or your Spark version). If you see &quot;spark-submit is not recognized&quot;, go back to Step 3 and make sure <code className="text-slate-300">%SPARK_HOME%\bin</code> is in Path and you opened a new terminal.</li>
              <li>Type <code className="text-slate-300">spark-shell</code> and press Enter. A Scala prompt should open (you may see the Spark logo and <code className="text-slate-300">scala&gt;</code>). Type <code className="text-slate-300">:quit</code> and press Enter to exit.</li>
              <li>Type <code className="text-slate-300">pyspark</code> and press Enter. A Python prompt should open (you may see <code className="text-slate-300">&gt;&gt;&gt;</code>). Type <code className="text-slate-300">exit()</code> and press Enter to exit.</li>
              <li>If any command fails, check: (1) Did you close and reopen PowerShell after setting environment variables? (2) Is <code className="text-slate-300">C:\spark\bin</code> the folder that contains <code className="text-slate-300">spark-shell.cmd</code>? (3) For <code className="text-slate-300">JAVA_HOME</code> errors, is the path correct and does it contain <code className="text-slate-300">bin\java.exe</code>?</li>
            </ul>
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
        <p className="text-slate-400 text-sm mb-2">
          In the code below: we (1) say &quot;Start Spark!&quot;, (2) make a small table with names and ages, (3) show it on the screen. That&apos;s your first Spark program!
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-spark-light mb-2">How to run this on Windows</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li>Create a folder for your scripts, e.g. <code className="text-slate-300">C:\spark_scripts</code>.</li>
            <li>Open Notepad or VS Code. Copy the code from the block below and save the file as <code className="text-slate-300">hello_spark.py</code> in that folder (choose &quot;All Files&quot; if Notepad adds <code className="text-slate-300">.txt</code>).</li>
            <li>Open PowerShell. Go to the folder: <code className="text-slate-300">cd C:\spark_scripts</code> (or your path).</li>
            <li>Run the script: <code className="text-slate-300">python hello_spark.py</code>. You should see a table with Name and Age printed, then the program exits.</li>
            <li>If you see &quot;No module named pyspark&quot;, run <code className="text-slate-300">pip install pyspark</code> and try again. If you see Java errors, check that <code className="text-slate-300">JAVA_HOME</code> is set (Step 3 in Installation).</li>
          </ul>
        </div>

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
        <EnhancementBox title="Fundamentals & first app — enhancements" items={[
          'Add a second DataFrame (e.g. products) and try a simple join before stopping the session.',
          'Read a small CSV from C:/data/ and run show(), count(), and printSchema().',
          'Time how long count() takes with cache() vs without, on a DataFrame used twice.',
        ]} />
      </div>
    </section>
  );
}
