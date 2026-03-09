import CodeBlock, { InfoTable } from '../components/CodeBlock';

export default function Cheatsheet() {
  return (
    <section id="cheatsheet" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-spark bg-spark/10 px-3 py-1 rounded-full uppercase tracking-wider">Reference</span>
        <div className="h-px flex-1 bg-gradient-to-r from-spark/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-2 gradient-text">Cheatsheet</h2>
      <p className="text-slate-400 text-sm mb-8">Quick copy-paste reference for PySpark (Windows paths).</p>

      {/* Session */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-spark rounded-full" />
          SparkSession &amp; Context
        </h3>
        <CodeBlock
          title="Start session (local)"
          code={`from pyspark.sql import SparkSession
spark = SparkSession.builder.appName("MyApp").master("local[*]").getOrCreate()
# RDD: sc = spark.sparkContext`}
        />
      </div>

      {/* Read / Write */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-spark rounded-full" />
          Read &amp; Write (DataFrame)
        </h3>
        <InfoTable
          headers={['Operation', 'Code']}
          rows={[
            ['CSV', 'spark.read.option("header",True).option("inferSchema",True).csv("C:/data/file.csv")'],
            ['JSON', 'spark.read.option("multiLine",True).json("C:/data/file.json")'],
            ['Parquet', 'spark.read.parquet("C:/data/")'],
            ['JDBC', 'spark.read.format("jdbc").option("url","...").option("dbtable","t").load()'],
            ['Write Parquet', 'df.write.mode("overwrite").partitionBy("col").parquet("C:/data/out/")'],
            ['Write CSV', 'df.write.mode("overwrite").option("header",True).csv("C:/data/out/")'],
          ]}
        />
      </div>

      {/* DataFrame ops */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-spark rounded-full" />
          DataFrame — Select, Filter, Join, Agg
        </h3>
        <CodeBlock
          title="Common operations"
          code={`from pyspark.sql.functions import col, count, sum, avg

df.select("a", "b", col("c") * 2)
df.filter(col("x") > 10)
df.withColumn("new", col("a") + col("b"))
df.withColumnRenamed("old", "new")
df.drop("col")
df.orderBy(col("x").desc())
df.groupBy("key").agg(count("*"), sum("amt"), avg("amt"))
df1.join(df2, df1.k == df2.k, "left")
df.na.fill(0).na.drop()`}
        />
      </div>

      {/* RDD */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-spark rounded-full" />
          RDD — Create, Transform, Action
        </h3>
        <InfoTable
          headers={['Type', 'Examples']}
          rows={[
            ['Create', 'sc.parallelize([1,2,3])  |  sc.textFile("C:/data/file.txt")'],
            ['Transform', 'map, filter, flatMap, distinct, reduceByKey, groupByKey, join'],
            ['Action', 'collect(), count(), first(), take(n), saveAsTextFile(path)'],
            ['Cache', 'rdd.cache()  |  rdd.persist(StorageLevel.MEMORY_AND_DISK)'],
          ]}
        />
      </div>

      {/* Streaming */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-spark rounded-full" />
          Structured Streaming
        </h3>
        <CodeBlock
          title="Read stream → transform → write stream"
          code={`# Read
df = spark.readStream.format("kafka")\\
  .option("kafka.bootstrap.servers","localhost:9092")\\
  .option("subscribe","topic").load()

# Transform (same DataFrame API)
from pyspark.sql.functions import window
df2 = df.withWatermark("ts", "10 min").groupBy(window(col("ts"), "5 min")).count()

# Write
q = df2.writeStream.outputMode("update").format("console")\\
  .option("checkpointLocation","C:/spark_data/ck").start()
q.awaitTermination()`}
        />
        <InfoTable
          headers={['Output mode', 'Use when']}
          rows={[
            ['append', 'Only new rows (e.g. file sink)'],
            ['update', 'Only updated rows (console, some sinks)'],
            ['complete', 'Full result table each time (aggregations)'],
          ]}
        />
      </div>

      {/* Config */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-spark rounded-full" />
          Config (common)
        </h3>
        <InfoTable
          headers={['Config', 'Example / Meaning']}
          rows={[
            ['spark.executor.memory', '"8g"'],
            ['spark.driver.memory', '"4g"'],
            ['spark.sql.shuffle.partitions', '200'],
            ['spark.sql.adaptive.enabled', 'true'],
            ['spark.sql.autoBroadcastJoinThreshold', '"50m"'],
          ]}
        />
      </div>

      {/* Paths & CLI */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-spark rounded-full" />
          Windows Paths &amp; CLI
        </h3>
        <InfoTable
          headers={['What', 'Example']}
          rows={[
            ['Data path', 'C:/data/file.csv  (Python accepts forward slash)'],
            ['Streaming output', 'C:/spark_data/output/'],
            ['Checkpoint', 'C:/spark_data/checkpoint/query1'],
            ['Run script', 'python script.py'],
            ['Spark shell', 'pyspark  |  spark-shell'],
            ['Submit job', 'spark-submit script.py'],
          ]}
        />
      </div>

      {/* One-liners */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-spark rounded-full" />
          Handy one-liners
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-1">
          <div><span className="text-slate-500"># schema</span> df.printSchema()</div>
          <div><span className="text-slate-500"># sample</span> df.show(5)</div>
          <div><span className="text-slate-500"># count</span> df.count()</div>
          <div><span className="text-slate-500"># distinct</span> df.select("col").distinct()</div>
          <div><span className="text-slate-500"># explain</span> df.explain("formatted")</div>
          <div><span className="text-slate-500"># broadcast</span> from pyspark.sql.functions import broadcast; df.join(broadcast(small), "key")</div>
          <div><span className="text-slate-500"># repartition</span> df.repartition(8)  |  df.coalesce(1)</div>
        </div>
      </div>
    </section>
  );
}
