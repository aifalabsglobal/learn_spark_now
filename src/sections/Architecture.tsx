import CodeBlock, { DiagramBlock, InfoTable } from '../components/CodeBlock';
import Callout from '../components/Callout';

export default function Architecture() {
  return (
    <section id="architecture" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-spark bg-spark/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 2</span>
        <div className="h-px flex-1 bg-gradient-to-r from-spark/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8 gradient-text">Core Architecture</h2>

      <Callout type="info" title="👋 In Plain English">
        Think of Spark like a <strong>team doing a big project</strong>: the <strong>Driver</strong> is the boss who gives instructions, the <strong>Cluster Manager</strong> assigns who does what, and the <strong>Executors</strong> are the workers on different computers doing the actual work. Tasks are the small jobs each worker gets.
      </Callout>

      {/* Architecture Diagram */}
      <div id="arch-diagram" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Spark Architecture Diagram
        </h3>
        <DiagramBlock title="Spark Cluster Architecture">
{`┌─────────────────────────────────────────────────────────┐
│                    DRIVER PROGRAM                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │           SparkContext / SparkSession              │  │
│  └───────────────────────────────────────────────────┘  │
│              │                    │                      │
│     ┌────────▼────────┐  ┌──────▼─────────┐            │
│     │  DAG Scheduler  │  │ Task Scheduler  │            │
│     └─────────────────┘  └────────────────┘            │
└────────────│─────────────────────│──────────────────────┘
             │                     │
    ┌────────▼───────────────┐     │
    │    CLUSTER MANAGER     │◀────┘
    │  (YARN/Mesos/K8s)      │
    └────────┬───────────────┘
             │
    ┌────────▼─────────────────────────────────────────┐
    │                  WORKER NODES                     │
    │  ┌──────────────┐  ┌──────────────┐              │
    │  │  Executor 1  │  │  Executor 2  │              │
    │  │ ┌────┐┌────┐ │  │ ┌────┐┌────┐ │              │
    │  │ │Task││Task│ │  │ │Task││Task│ │              │
    │  │ └────┘└────┘ │  │ └────┘└────┘ │              │
    │  │ Cache/Memory │  │ Cache/Memory │              │
    │  └──────────────┘  └──────────────┘              │
    └──────────────────────────────────────────────────┘`}
        </DiagramBlock>

        <p className="text-slate-400 text-sm mt-4">
          <strong className="text-slate-300">Simple words:</strong> Driver = the brain that runs your code. Cluster Manager = the person who hands out computers. Executors = the computers doing the work. Tasks = the small chores each computer does.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          {[
            { title: 'Driver', desc: 'Runs the main program, creates SparkContext, and coordinates work. Like the boss!' },
            { title: 'Cluster Manager', desc: 'Allocates resources across cluster (YARN, Mesos, K8s). Decides which computer does what.' },
            { title: 'Executors', desc: 'Run tasks and store data in memory/disk on worker nodes. The workers!' },
            { title: 'Tasks', desc: 'Individual units of work sent to executors. One small job per worker.' },
          ].map((item, i) => (
            <div key={i} className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
              <h4 className="text-sm font-bold text-spark-light mb-1">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RDD */}
      <div id="rdd" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          RDD (Resilient Distributed Dataset)
        </h3>
        <Callout type="tip" title="In Plain English: What is an RDD?">
          An <strong>RDD</strong> is like a <strong>list of stuff split across many computers</strong>. &quot;Resilient&quot; means if one computer fails, Spark can rebuild the list. &quot;Distributed&quot; means the list is spread out so many computers can work on it at once.
        </Callout>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-4">
          {['Immutable', 'Distributed', 'Resilient', 'Lazy', 'Partitioned'].map((prop, i) => (
            <div key={i} className="bg-spark/10 border border-spark/20 rounded-lg px-3 py-2 text-center text-xs font-medium text-spark-light">
              {prop}
            </div>
          ))}
        </div>

        <CodeBlock
          title="Creating RDDs"
          code={`from pyspark import SparkContext

sc = SparkContext("local[*]", "RDD_Basics")

# Method 1: From a collection (Parallelizing)
rdd1 = sc.parallelize([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

# Method 2: From external file (Windows: use C:/ or file:///)
rdd2 = sc.textFile("C:/data/file.txt")           # Windows local path
rdd3 = sc.textFile("hdfs://path/to/file.txt")   # HDFS cluster
rdd4 = sc.textFile("s3://bucket/data.csv")      # Cloud storage

# Method 3: From another RDD (Transformation)
rdd5 = rdd1.map(lambda x: x * 2)

# RDD Properties
print(f"Number of partitions: {rdd1.getNumPartitions()}")
print(f"Data in partitions: {rdd1.glom().collect()}")
# Example: [[1, 2, 3], [4, 5, 6], [7, 8, 9, 10]]`}
        />
      </div>

      {/* Transformations vs Actions */}
      <div id="transformations" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Transformations vs Actions
        </h3>

        <Callout type="tip" title="Lazy Evaluation — In Plain English">
          Think of <span className="font-bold text-white">Transformations</span> like a waiter taking your order (writing it down but not cooking yet). <span className="font-bold text-white">Actions</span> are when you say &quot;I&apos;m ready to eat,&quot; and the kitchen actually starts cooking! Spark waits until you need a result before it does the work — that way it can plan the fastest way.
        </Callout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-950/30 border border-blue-500/20 rounded-xl p-5">
            <h4 className="text-sm font-bold text-blue-400 mb-3">Transformations (Lazy)</h4>
            <p className="text-xs text-slate-400 mb-3">Return new RDD, NOT executed immediately. Build a DAG.</p>
            <div className="space-y-1">
              <div className="text-xs text-slate-300"><span className="text-blue-400 font-mono">Narrow:</span> map, filter, flatMap, mapPartitions, union</div>
              <div className="text-xs text-slate-300"><span className="text-blue-400 font-mono">Wide:</span> groupByKey, reduceByKey, sortByKey, join, distinct</div>
            </div>
          </div>
          <div className="bg-green-950/30 border border-green-500/20 rounded-xl p-5">
            <h4 className="text-sm font-bold text-green-400 mb-3">Actions (Eager)</h4>
            <p className="text-xs text-slate-400 mb-3">Trigger execution of the DAG. Return results or write to storage.</p>
            <div className="text-xs text-slate-300">collect, count, first, take, reduce, foreach, saveAsTextFile, countByKey, takeSample, takeOrdered, aggregate</div>
          </div>
        </div>

        <CodeBlock
          title="Transformations & Actions Examples"
          code={`rdd = sc.parallelize([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

# --- Narrow Transformations (no shuffle) ---
squared = rdd.map(lambda x: x ** 2)        # [1, 4, 9, 16, 25, ...]
evens = rdd.filter(lambda x: x % 2 == 0)   # [2, 4, 6, 8, 10]

sentences = sc.parallelize(["hello world", "foo bar"])
words = sentences.flatMap(lambda s: s.split(" "))  # ["hello","world","foo","bar"]

# --- Wide Transformations (shuffle required) ---
pairs = sc.parallelize([("a", 1), ("b", 2), ("a", 3)])
summed = pairs.reduceByKey(lambda a, b: a + b)     # [("a", 4), ("b", 2)]

rdd_x = sc.parallelize([("a", 1), ("b", 2)])
rdd_y = sc.parallelize([("a", 3), ("b", 4)])
joined = rdd_x.join(rdd_y)     # [("a", (1, 3)), ("b", (2, 4))]

unique = sc.parallelize([1, 1, 2, 2, 3]).distinct()  # [1, 2, 3]

# --- Actions (trigger computation) ---
result = squared.collect()      # [1, 4, 9, 16, 25, ...]
print(rdd.count())              # 10
print(rdd.first())              # 1
print(rdd.take(3))              # [1, 2, 3]
total = rdd.reduce(lambda a, b: a + b)  # 55

# aggregate: complex aggregation
sum_count = rdd.aggregate(
    (0, 0),
    lambda acc, val: (acc[0] + val, acc[1] + 1),
    lambda a1, a2: (a1[0] + a2[0], a1[1] + a2[1])
)
average = sum_count[0] / sum_count[1]  # 5.5`}
        />
      </div>

      {/* DAG */}
      <div id="dag" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          DAG & Lazy Evaluation
        </h3>

        <DiagramBlock title="DAG Execution Flow">
{`textFile → flatMap → map  ──SHUFFLE──→  reduceByKey → filter → collect
|________Stage 0_________|              |________Stage 1_________|

Each Stage contains Tasks (one per partition)`}
        </DiagramBlock>

        <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-5 mt-4">
          <h4 className="text-sm font-bold text-white mb-3">Benefits of Lazy Evaluation</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { t: 'Optimization', d: 'Spark can optimize the entire computation plan before executing' },
              { t: 'Efficiency', d: 'Unnecessary computations are avoided entirely' },
              { t: 'Pipelining', d: 'Multiple operations can be combined into a single data pass' },
              { t: 'Fault Tolerance', d: 'Lineage graph allows recomputation on failure' },
            ].map((item, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-spark mt-0.5">●</span>
                <div>
                  <span className="text-xs font-bold text-white">{item.t}: </span>
                  <span className="text-xs text-slate-400">{item.d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CodeBlock
          title="Lazy Evaluation in Action"
          code={`rdd = sc.parallelize(range(1000000))

# Without lazy evaluation, 3 intermediate datasets would be created
# With Spark, this is optimized into a SINGLE PASS
result = rdd.map(lambda x: x * 2) \\
             .filter(lambda x: x > 100) \\
             .map(lambda x: x + 1) \\
             .take(10)  # Only processes enough data to get 10 results!`}
        />
      </div>

      {/* Caching */}
      <div id="caching" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Persistence & Caching
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          <strong className="text-slate-300">In plain English:</strong> Caching means &quot;save this data so we don&apos;t have to compute it again.&quot; Like putting your favorite toys in a box by your bed so you don&apos;t have to go to the closet every time. Spark can save in memory (super fast) or on disk (slower but safer).
        </p>

        <InfoTable
          headers={['Storage Level', 'Memory', 'Disk', 'Serialized', 'Replicas']}
          rows={[
            ['MEMORY_ONLY', '✅', '❌', '❌', '1'],
            ['MEMORY_AND_DISK', '✅', '✅', '❌', '1'],
            ['MEMORY_ONLY_SER', '✅', '❌', '✅', '1'],
            ['MEMORY_AND_DISK_SER', '✅', '✅', '✅', '1'],
            ['DISK_ONLY', '❌', '✅', '✅', '1'],
            ['MEMORY_ONLY_2', '✅', '❌', '❌', '2'],
            ['OFF_HEAP', 'Off-Heap', '❌', '✅', '1'],
          ]}
        />

        <CodeBlock
          title="Caching Example"
          code={`from pyspark import StorageLevel

rdd = sc.parallelize(range(1000000))
processed = rdd.map(lambda x: x * 2).filter(lambda x: x > 500)

# Cache in memory (default: MEMORY_ONLY for RDDs)
processed.cache()

# Or explicitly set storage level
processed.persist(StorageLevel.MEMORY_AND_DISK)

# First action: computes and caches
count1 = processed.count()   # Computed from scratch

# Second action: reads from cache (much faster!)
count2 = processed.reduce(lambda a, b: a + b)

# Remove from cache when done
processed.unpersist()`}
        />
      </div>

      {/* Broadcast & Accumulators */}
      <div id="broadcast" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Broadcast Variables & Accumulators
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          <strong className="text-slate-300">Plain English:</strong> <strong>Broadcast</strong> = copy one piece of info (like a cheat sheet) to every worker once, so they don&apos;t keep asking for it. <strong>Accumulator</strong> = a shared counter or total that every worker can add to (e.g. &quot;how many errors did we see?&quot;).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-purple-950/30 border border-purple-500/20 rounded-xl p-5">
            <h4 className="text-sm font-bold text-purple-400 mb-2">Broadcast Variables</h4>
            <p className="text-xs text-slate-400">Read-only shared variable sent to all workers <em>once</em>. Perfect for large lookup tables. Like giving every worker the same copy of a rulebook.</p>
          </div>
          <div className="bg-yellow-950/30 border border-yellow-500/20 rounded-xl p-5">
            <h4 className="text-sm font-bold text-yellow-400 mb-2">Accumulators</h4>
            <p className="text-xs text-slate-400">Write-only shared variables for aggregating info across tasks. Only the driver reads the value. Like a shared jar everyone drops coins into.</p>
          </div>
        </div>

        <CodeBlock
          title="Broadcast Variables"
          code={`# Send a read-only variable to all worker nodes (once)
lookup_table = {"US": "United States", "UK": "United Kingdom", 
                "IN": "India", "DE": "Germany"}

# Without broadcast: sent with EVERY task (N times)
# With broadcast: sent to each worker ONCE
broadcast_lookup = sc.broadcast(lookup_table)

rdd = sc.parallelize([("Alice", "US"), ("Bob", "UK"), ("Charlie", "IN")])
result = rdd.map(lambda x: (x[0], broadcast_lookup.value[x[1]]))
print(result.collect())
# [("Alice", "United States"), ("Bob", "United Kingdom"), ("Charlie", "India")]

broadcast_lookup.destroy()`}
        />

        <CodeBlock
          title="Accumulators"
          code={`# Write-only shared variables for aggregating information
error_count = sc.accumulator(0)
total_records = sc.accumulator(0)

def process_line(line):
    global error_count, total_records
    total_records += 1
    try:
        return int(line)
    except:
        error_count += 1
        return 0

rdd = sc.parallelize(["1", "2", "abc", "4", "xyz", "6"])
result = rdd.map(process_line).collect()

print(f"Total records: {total_records.value}")   # 6
print(f"Error count: {error_count.value}")       # 2`}
        />
      </div>
    </section>
  );
}
