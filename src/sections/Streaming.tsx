import CodeBlock, { DiagramBlock } from '../components/CodeBlock';
import Callout from '../components/Callout';
import { DataFlowInfographic } from '../components/InfographicCard';

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
      <DataFlowInfographic />

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

        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mt-4">
          <h4 className="text-sm font-bold text-spark-light mb-2">Step-by-step: Structured Streaming</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li><strong className="text-slate-300">Read stream:</strong> Use <code className="text-slate-300">spark.readStream.format("socket")</code>, <code className="text-slate-300">"kafka"</code>, or file source. Set options (host/port, topic, path). You get a streaming DataFrame.</li>
            <li><strong className="text-slate-300">Transform:</strong> Use the same DataFrame API (select, filter, groupBy, etc.). Spark builds an incremental plan and updates the result table on each trigger.</li>
            <li><strong className="text-slate-300">Write stream:</strong> <code className="text-slate-300">df.writeStream.outputMode("append"|"complete"|"update").format("console"|"parquet"|"kafka").trigger(...).start()</code>. Use <code className="text-slate-300">checkpointLocation</code> for fault tolerance.</li>
            <li><strong className="text-slate-300">Run:</strong> <code className="text-slate-300">query.awaitTermination()</code> keeps the app running. Output mode decides what gets written each trigger (see boxes below).</li>
          </ul>
        </div>
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

        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-spark-light mb-2">How to run the socket example on Windows</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li><strong className="text-slate-300">Terminal 1 — socket server:</strong> Install <strong>ncat</strong> (from Nmap: nmap.org) or use a small Python script that listens on port 9999 and sends each line you type. Run it first so port 9999 is open.</li>
            <li><strong className="text-slate-300">Terminal 2 — Spark app:</strong> Save the code below as <code className="text-slate-300">streaming_wordcount.py</code>, then run <code className="text-slate-300">python streaming_wordcount.py</code>. It will read from localhost:9999 and print word counts every 5 seconds.</li>
            <li><strong className="text-slate-300">Send data:</strong> In Terminal 1, type lines of text and press Enter. Each line is one stream record. Watch word counts update in Terminal 2. Stop with Ctrl+C in both.</li>
          </ul>
        </div>
        <CodeBlock
          title="Optional: minimal socket server (run in a separate terminal to send lines to port 9999)"
          code={`# socket_server.py — run: python socket_server.py
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
s.bind(("localhost", 9999))
s.listen(1)
print("Listening on 9999. Type lines and press Enter. Ctrl+C to stop.")
conn, _ = s.accept()
try:
    while True:
        line = input("> ")
        conn.send((line + "\\n").encode())
except (KeyboardInterrupt, BrokenPipeError):
    pass
conn.close()`}
        />

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

      {/* Checkpointing & semantics */}
      <div id="streaming-checkpoint" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Checkpointing &amp; Exactly-Once Semantics
        </h3>
        <Callout type="info" title="Why checkpointing matters">
          <strong>Checkpoint location</strong> stores progress (offsets, state) so if your app restarts, Spark can resume from the last committed batch instead of reprocessing or skipping data. For file and Kafka sinks, using a checkpoint gives you <strong>exactly-once</strong> writes: each record is written once, even after failures and restarts.
        </Callout>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mt-4">
          <h4 className="text-sm font-bold text-spark-light mb-2">Step-by-step: Checkpointing and semantics</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li><strong className="text-slate-300">Set checkpoint:</strong> Always set <code className="text-slate-300">.option("checkpointLocation", "C:/spark_data/checkpoint/your_query_name")</code> for production. Use a unique path per query. Spark writes metadata and state there after each committed batch.</li>
            <li><strong className="text-slate-300">Recovery:</strong> If the driver restarts, start the same query with the same checkpoint path. Spark will read the checkpoint and continue from the last offset. Do not reuse a checkpoint for a different query or schema.</li>
            <li><strong className="text-slate-300">Exactly-once:</strong> With checkpoint, the engine commits offsets only after the sink has written a batch. So each micro-batch is processed and written once. Without checkpoint, restarts can cause duplicate or missing output (at-least-once or at-most-once depending on sink).</li>
          </ul>
        </div>
      </div>

      {/* Kafka */}
      <div id="kafka-source" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Kafka Integration
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-spark-light mb-2">Step-by-step: Reading from Kafka</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li><strong className="text-slate-300">Connect:</strong> <code className="text-slate-300">spark.readStream.format("kafka")</code> with <code className="text-slate-300">kafka.bootstrap.servers</code> (e.g. localhost:9092) and <code className="text-slate-300">subscribe</code> (topic name). Use <code className="text-slate-300">startingOffsets</code> = &quot;latest&quot; or &quot;earliest&quot;.</li>
            <li><strong className="text-slate-300">Schema:</strong> Kafka returns columns <code className="text-slate-300">key</code>, <code className="text-slate-300">value</code> (binary), <code className="text-slate-300">timestamp</code>, <code className="text-slate-300">topic</code>, <code className="text-slate-300">partition</code>, <code className="text-slate-300">offset</code>. Cast <code className="text-slate-300">value</code> to string and parse JSON with <code className="text-slate-300">from_json(value, schema)</code>.</li>
            <li>For writing to Kafka, use <code className="text-slate-300">writeStream.format("kafka")</code> with <code className="text-slate-300">topic</code> and put key/value columns in the DataFrame. Set <code className="text-slate-300">checkpointLocation</code> for recovery.</li>
          </ul>
        </div>
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
        <p className="text-slate-400 text-sm mb-2">
          <strong className="text-slate-300">In plain English:</strong> With streaming data, we often want to count or sum over &quot;windows&quot; of time — e.g. &quot;how many clicks in the last 5 minutes?&quot; <strong>Tumbling window</strong> = non-overlapping chunks (5 min, then next 5 min). <strong>Sliding window</strong> = overlapping (e.g. every 5 minutes we look at the last 10 minutes).
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-spark-light mb-2">Step-by-step: Windowed aggregations</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li><strong className="text-slate-300">Watermark:</strong> Call <code className="text-slate-300">.withWatermark("timestamp", "10 minutes")</code> so Spark can drop old state. Required for append output with aggregation; the delay (e.g. 10 min) must be at least as large as the late data you accept.</li>
            <li><strong className="text-slate-300">Tumbling:</strong> <code className="text-slate-300">window(col("timestamp"), "5 minutes")</code> — fixed 5-minute non-overlapping windows. Group by this window + other columns, then agg.</li>
            <li><strong className="text-slate-300">Sliding:</strong> <code className="text-slate-300">window(col("timestamp"), "10 minutes", "5 minutes")</code> — 10-minute window that slides every 5 minutes. Use for moving averages or rolling counts.</li>
          </ul>
        </div>

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
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-spark-light mb-2">Step-by-step: Output sinks</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li><strong className="text-slate-300">Console:</strong> <code className="text-slate-300">.format("console")</code> — prints to driver stdout. Good for debugging. Use <code className="text-slate-300">outputMode("update")</code> or <code className="text-slate-300">"complete"</code>.</li>
            <li><strong className="text-slate-300">File (Parquet):</strong> <code className="text-slate-300">.format("parquet").option("path", "C:/spark_data/output/...").option("checkpointLocation", "C:/spark_data/checkpoint/...")</code>. Append mode. PartitionBy optional.</li>
            <li><strong className="text-slate-300">Kafka:</strong> DataFrame must have <code className="text-slate-300">key</code> and <code className="text-slate-300">value</code> columns (e.g. from <code className="text-slate-300">to_json(struct("*"))</code>). Set <code className="text-slate-300">checkpointLocation</code>.</li>
            <li><strong className="text-slate-300">foreachBatch:</strong> Pass a function <code className="text-slate-300">(batch_df, batch_id) =&gt; ...</code> to write each micro-batch (e.g. to JDBC or custom logic). Gives full control per batch.</li>
          </ul>
        </div>
        <CodeBlock
          title="Writing to Various Sinks"
          code={`# Console Sink
q1 = windowed_counts.writeStream \\
    .outputMode("update") \\
    .format("console") \\
    .option("truncate", "false") \\
    .start()

# File Sink (Parquet) — Windows: use C:/ paths
q2 = events.writeStream \\
    .outputMode("append") \\
    .format("parquet") \\
    .option("path", "C:/spark_data/output/events") \\
    .option("checkpointLocation", "C:/spark_data/checkpoint/events") \\
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
    .option("checkpointLocation", "C:/spark_data/checkpoint/kafka") \\
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
    .option("checkpointLocation", "C:/spark_data/checkpoint/jdbc") \\
    .start()

spark.streams.awaitAnyTermination()`}
        />
</div>
    </section>
  );
}
