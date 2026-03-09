import CodeBlock, { DiagramBlock } from '../components/CodeBlock';
import Callout from '../components/Callout';

export default function Streaming() {
  return (
    <section id="streaming" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-spark bg-spark/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 4</span>
        <div className="h-px flex-1 bg-gradient-to-r from-spark/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8 gradient-text">Spark Streaming</h2>

      <Callout type="info" title="👋 In Plain English">
        <strong>Streaming</strong> means working with data that keeps coming in over time — like live scores in a game, or messages in a chat. Spark lets you run the same kind of queries (count, sum, filter) on this &quot;never-ending&quot; data, and get updated results every few seconds or minutes!
      </Callout>

      {/* Concepts */}
      <div id="streaming-concepts" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Structured Streaming Concepts
        </h3>

        <Callout type="info" title="The Infinite Table (Kid-Friendly)">
          Imagine a table that never ends. New data just keeps getting added to the bottom of the spreadsheet — like a scoreboard that updates every time someone scores. That is <span className="font-bold text-white">Structured Streaming</span>! Spark treats this live data like a normal table, but one that keeps growing.
        </Callout>

        <DiagramBlock title="Structured Streaming Model">
{`     New data arrives
          │
          ▼
┌───────────────────────────┐
│ Unbounded Input Table     │  ← Data arriving over time
└────────────┬──────────────┘
             │
       [Query/Transform]
             │
             ▼
┌───────────────────────────┐
│ Result Table              │  ← Updated with each trigger
└────────────┬──────────────┘
             │
       [Output Sink]
             │
    ┌────────┼────────┐
    ▼        ▼        ▼
 Console   File     Kafka/DB`}
        </DiagramBlock>

        <p className="text-slate-400 text-sm mt-4 mb-2">
          <strong className="text-slate-300">Output modes in plain English:</strong> <strong>Append</strong> = only show new rows. <strong>Complete</strong> = show the whole result table each time (like rewriting the whole scoreboard). <strong>Update</strong> = only show rows that changed.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
          <div className="bg-green-950/20 border border-green-500/20 rounded-xl p-4">
            <h4 className="text-sm font-bold text-green-400 mb-1">Append Mode</h4>
            <p className="text-xs text-slate-400">Only new rows added to result table are output. Like adding new lines to a list.</p>
          </div>
          <div className="bg-blue-950/20 border border-blue-500/20 rounded-xl p-4">
            <h4 className="text-sm font-bold text-blue-400 mb-1">Complete Mode</h4>
            <p className="text-xs text-slate-400">Entire result table is output after every trigger. Like printing the whole scoreboard again.</p>
          </div>
          <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-4">
            <h4 className="text-sm font-bold text-purple-400 mb-1">Update Mode</h4>
            <p className="text-xs text-slate-400">Only rows that were updated are output. Like only showing the scores that changed.</p>
          </div>
        </div>

        <CodeBlock
          title="Basic Streaming — Word Count from Socket"
          code={`from pyspark.sql import SparkSession
from pyspark.sql.functions import *

spark = SparkSession.builder.appName("StructuredStreaming").getOrCreate()

# Read from socket
lines = spark.readStream \\
    .format("socket") \\
    .option("host", "localhost") \\
    .option("port", 9999) \\
    .load()

# Word count on streaming data
words = lines.select(explode(split(col("value"), " ")).alias("word"))
word_counts = words.groupBy("word").count()

query = word_counts.writeStream \\
    .outputMode("complete") \\
    .format("console") \\
    .trigger(processingTime="5 seconds") \\
    .start()

query.awaitTermination()`}
        />
      </div>

      {/* Kafka */}
      <div id="kafka-source" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Kafka Integration
        </h3>
        <CodeBlock
          title="Reading from Kafka"
          code={`# Read streaming data from Kafka
kafka_df = spark.readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "localhost:9092") \\
    .option("subscribe", "my_topic") \\
    .option("startingOffsets", "latest") \\
    .load()

# Parse Kafka messages (key and value are binary)
parsed = kafka_df.select(
    col("key").cast("string"),
    col("value").cast("string"),
    col("timestamp"),
    col("topic"),
    col("partition"),
    col("offset")
)

# Parse JSON values
schema = StructType([
    StructField("user_id", StringType()),
    StructField("action", StringType()),
    StructField("timestamp", TimestampType()),
    StructField("amount", DoubleType()),
])

events = parsed.select(
    from_json(col("value"), schema).alias("data")
).select("data.*")`}
        />
      </div>

      {/* Windowed Aggregations */}
      <div id="windowed-agg" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Windowed Aggregations
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          <strong className="text-slate-300">In plain English:</strong> With streaming data, we often want to count or sum over &quot;windows&quot; of time — e.g. &quot;how many clicks in the last 5 minutes?&quot; <strong>Tumbling window</strong> = non-overlapping chunks (5 min, then next 5 min). <strong>Sliding window</strong> = overlapping (e.g. every 5 minutes we look at the last 10 minutes).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-4">
            <h4 className="text-sm font-bold text-blue-400 mb-2">Tumbling Window</h4>
            <p className="text-xs text-slate-400 mb-2">Non-overlapping, fixed-size windows</p>
            <div className="font-mono text-[10px] text-slate-500">
              |--W1--|--W2--|--W3--|--W4--|
            </div>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-4">
            <h4 className="text-sm font-bold text-purple-400 mb-2">Sliding Window</h4>
            <p className="text-xs text-slate-400 mb-2">Overlapping windows with slide interval</p>
            <div className="font-mono text-[10px] text-slate-500">
              |----W1----|<br />
              &nbsp;&nbsp;&nbsp;|----W2----|<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|----W3----|
            </div>
          </div>
        </div>

        <CodeBlock
          title="Windowed Aggregations"
          code={`# Tumbling Window (non-overlapping)
windowed_counts = events \\
    .withWatermark("timestamp", "10 minutes") \\
    .groupBy(
        window(col("timestamp"), "5 minutes"),  # 5-minute windows
        col("action")
    ) \\
    .agg(
        count("*").alias("count"),
        sum("amount").alias("total_amount")
    )

# Sliding Window (overlapping)
sliding_counts = events \\
    .withWatermark("timestamp", "10 minutes") \\
    .groupBy(
        window(col("timestamp"), "10 minutes", "5 minutes"),
        col("action")
    ) \\
    .count()`}
        />
      </div>

      {/* Sinks */}
      <div id="streaming-sinks" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Output Sinks
        </h3>
        <CodeBlock
          title="Writing to Various Sinks"
          code={`# Console Sink
q1 = windowed_counts.writeStream \\
    .outputMode("update") \\
    .format("console") \\
    .option("truncate", "false") \\
    .start()

# File Sink (Parquet)
q2 = events.writeStream \\
    .outputMode("append") \\
    .format("parquet") \\
    .option("path", "output/events") \\
    .option("checkpointLocation", "checkpoint/events") \\
    .partitionBy("action") \\
    .trigger(processingTime="1 minute") \\
    .start()

# Kafka Sink
q3 = events.select(
    col("user_id").alias("key"),
    to_json(struct("*")).alias("value")
).writeStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "localhost:9092") \\
    .option("topic", "output_topic") \\
    .option("checkpointLocation", "checkpoint/kafka") \\
    .start()

# ForeachBatch Sink (custom processing per micro-batch)
def process_batch(batch_df, batch_id):
    print(f"Batch {batch_id}: {batch_df.count()} rows")
    batch_df.write.format("jdbc") \\
        .option("url", "jdbc:mysql://localhost:3306/mydb") \\
        .option("dbtable", "streaming_output") \\
        .mode("append").save()

q4 = events.writeStream \\
    .foreachBatch(process_batch) \\
    .option("checkpointLocation", "checkpoint/jdbc") \\
    .start()

spark.streams.awaitAnyTermination()`}
        />
      </div>
    </section>
  );
}
