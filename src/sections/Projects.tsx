import CodeBlock, { DiagramBlock } from '../components/CodeBlock';

export default function Projects() {
  return (
    <section id="projects" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-spark bg-spark/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 7</span>
        <div className="h-px flex-1 bg-gradient-to-r from-spark/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4 gradient-text">5 Real-Time Projects</h2>
      <p className="text-slate-400 mb-10 text-sm">Production-grade projects demonstrating different Spark capabilities — streaming, batch ETL, ML, and more.</p>

      {/* Project 1 */}
      <div id="project-1" className="mb-16">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg shrink-0">1</div>
          <div>
            <h3 className="text-xl font-bold text-white">Real-Time E-Commerce Analytics Pipeline</h3>
            <p className="text-sm text-slate-400 mt-1">Process real-time clickstream and order data to generate live dashboards, detect anomalies, and compute metrics.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {['Kafka', 'Structured Streaming', 'Windowed Aggregations', 'PostgreSQL', 'Anomaly Detection'].map((t, i) => (
            <span key={i} className="text-[10px] font-medium text-red-300 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">{t}</span>
          ))}
        </div>

        <DiagramBlock title="Architecture">
{`Web App (Clicks, Orders, Views)
        │
        ▼
   ┌─────────┐
   │  Kafka   │  (Message Broker)
   └────┬────┘
        │
        ▼
┌───────────────────┐
│  Spark Structured │
│    Streaming      │
└───────┬───────────┘
        │
   ┌────┼────┐
   ▼    ▼    ▼
Dashboard DB  Alerts`}
        </DiagramBlock>

        <CodeBlock
          title="E-Commerce Analytics — Core Pipeline"
          code={`from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import *

spark = SparkSession.builder \\
    .appName("EcommerceAnalytics") \\
    .config("spark.sql.shuffle.partitions", "20") \\
    .config("spark.sql.adaptive.enabled", "true") \\
    .getOrCreate()

# Define schemas
clickstream_schema = StructType([
    StructField("user_id", StringType()),
    StructField("session_id", StringType()),
    StructField("action", StringType()),     # view, click, add_to_cart
    StructField("product_id", StringType()),
    StructField("category", StringType()),
    StructField("timestamp", TimestampType()),
    StructField("device", StringType()),
])

# Read from Kafka
clickstream_raw = spark.readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "localhost:9092") \\
    .option("subscribe", "clickstream") \\
    .option("startingOffsets", "latest") \\
    .load()

# Parse and transform
clickstream = clickstream_raw \\
    .select(from_json(col("value").cast("string"), clickstream_schema).alias("data")) \\
    .select("data.*") \\
    .withWatermark("timestamp", "10 minutes")

# Metric 1: Active Users per 5-minute window
active_users = clickstream \\
    .groupBy(window(col("timestamp"), "5 minutes"), col("device")) \\
    .agg(
        countDistinct("user_id").alias("active_users"),
        count("*").alias("total_events"),
        countDistinct("session_id").alias("active_sessions")
    )

# Metric 2: Funnel Analysis (views → add_to_cart → purchase)
funnel = clickstream \\
    .groupBy(window(col("timestamp"), "10 minutes"), col("category")) \\
    .agg(
        sum(when(col("action") == "view", 1).otherwise(0)).alias("views"),
        sum(when(col("action") == "add_to_cart", 1).otherwise(0)).alias("cart_adds"),
        sum(when(col("action") == "click", 1).otherwise(0)).alias("clicks")
    ) \\
    .withColumn("view_to_cart_rate", 
                round(col("cart_adds") / col("views") * 100, 2))

# Metric 3: Trending Products (sliding window)
trending = clickstream \\
    .filter(col("action").isin("view", "add_to_cart")) \\
    .groupBy(
        window(col("timestamp"), "15 minutes", "5 minutes"),
        col("product_id")
    ) \\
    .agg(
        count("*").alias("interactions"),
        countDistinct("user_id").alias("unique_users")
    ) \\
    .withColumn("trend_score", col("interactions") * 0.4 + col("unique_users") * 0.6)

# Anomaly Detection via foreachBatch
def detect_anomalies(batch_df, batch_id):
    if batch_df.count() == 0:
        return
    stats = batch_df.agg(
        avg("total_events").alias("avg"),
        stddev("total_events").alias("std")
    ).collect()[0]
    if stats["std"] and stats["avg"]:
        threshold = stats["avg"] + 3 * stats["std"]
        anomalies = batch_df.filter(col("total_events") > threshold)
        if anomalies.count() > 0:
            print(f"ANOMALY DETECTED in batch {batch_id}!")

# Start streaming queries
q1 = active_users.writeStream \\
    .outputMode("update").format("console") \\
    .trigger(processingTime="30 seconds").start()

q2 = active_users.writeStream \\
    .foreachBatch(detect_anomalies) \\
    .trigger(processingTime="1 minute").start()

spark.streams.awaitAnyTermination()`}
        />
      </div>

      {/* Project 2 */}
      <div id="project-2" className="mb-16">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shrink-0">2</div>
          <div>
            <h3 className="text-xl font-bold text-white">Log Analysis & Monitoring System</h3>
            <p className="text-sm text-slate-400 mt-1">Parse server logs in real-time, detect errors, compute response time metrics, and trigger alerts.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {['Regex Parsing', 'Error Rate Monitoring', 'Response Time P50/P95/P99', 'DDoS Detection', 'Alerting'].map((t, i) => (
            <span key={i} className="text-[10px] font-medium text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">{t}</span>
          ))}
        </div>

        <CodeBlock
          title="Log Analysis — Real-Time Monitoring"
          code={`# Read raw logs from Kafka
raw_logs = spark.readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "localhost:9092") \\
    .option("subscribe", "server_logs") \\
    .load() \\
    .select(col("value").cast("string").alias("raw_log"))

# Parse Apache Combined Log Format with regex
log_pattern = r'^(\\S+) \\S+ \\S+ \\[(.+?)\\] "(\\S+) (\\S+) (\\S+)" (\\d{3}) (\\d+|-)'

parsed_logs = raw_logs \\
    .select(
        regexp_extract("raw_log", log_pattern, 1).alias("ip_address"),
        regexp_extract("raw_log", log_pattern, 3).alias("method"),
        regexp_extract("raw_log", log_pattern, 4).alias("endpoint"),
        regexp_extract("raw_log", log_pattern, 6).cast("int").alias("status_code"),
        regexp_extract("raw_log", log_pattern, 7).cast("long").alias("content_size"),
    ) \\
    .withColumn("status_category", 
        when(col("status_code").between(200, 299), "2xx_success")
        .when(col("status_code").between(400, 499), "4xx_client_error")
        .when(col("status_code").between(500, 599), "5xx_server_error")
        .otherwise("other")
    ) \\
    .withColumn("is_error", col("status_code") >= 400) \\
    .withColumn("timestamp", current_timestamp()) \\
    .withWatermark("timestamp", "5 minutes")

# Request Rate & Error Rate per minute
request_metrics = parsed_logs \\
    .groupBy(window(col("timestamp"), "1 minute"), col("status_category")) \\
    .agg(count("*").alias("request_count"))

# DDoS Detection: too many requests from single IP
ddos_detection = parsed_logs \\
    .groupBy(window(col("timestamp"), "1 minute"), col("ip_address")) \\
    .agg(count("*").alias("request_count")) \\
    .filter(col("request_count") > 1000)

# Alert System
def check_and_alert(batch_df, batch_id):
    if batch_df.count() == 0:
        return
    for row in batch_df.collect():
        if row["request_count"] > 1000:
            print(f"POTENTIAL DDoS from {row['ip_address']}: "
                  f"{row['request_count']} requests/min")

q_ddos = ddos_detection.writeStream \\
    .foreachBatch(check_and_alert) \\
    .trigger(processingTime="30 seconds") \\
    .start()`}
        />
      </div>

      {/* Project 3 */}
      <div id="project-3" className="mb-16">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shrink-0">3</div>
          <div>
            <h3 className="text-xl font-bold text-white">Customer 360 — Batch ETL Pipeline</h3>
            <p className="text-sm text-slate-400 mt-1">Build comprehensive customer profiles by integrating data from multiple sources with RFM segmentation.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {['Multi-Source ETL', 'Feature Engineering', 'RFM Segmentation', 'Data Quality Checks', 'Parquet Output'].map((t, i) => (
            <span key={i} className="text-[10px] font-medium text-green-300 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">{t}</span>
          ))}
        </div>

        <CodeBlock
          title="Customer 360 — ETL Pipeline"
          code={`from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.window import Window

spark = SparkSession.builder \\
    .appName("Customer360ETL") \\
    .config("spark.sql.adaptive.enabled", "true") \\
    .getOrCreate()

# Extract from multiple sources
customers = spark.read.format("jdbc") \\
    .option("url", "jdbc:mysql://localhost:3306/ecommerce") \\
    .option("dbtable", "customers").load()

orders = spark.read.parquet("s3a://data-lake/orders/")

# Transform — Clean & Enrich
customers_clean = customers \\
    .withColumn("full_name", concat_ws(" ", col("first_name"), col("last_name"))) \\
    .withColumn("age", floor(datediff(current_date(), col("dob")) / 365.25)) \\
    .withColumn("age_group",
        when(col("age") < 25, "18-24")
        .when(col("age") < 35, "25-34")
        .when(col("age") < 45, "35-44")
        .otherwise("45+"))

# Feature Engineering — Order Metrics
order_features = orders \\
    .groupBy("customer_id") \\
    .agg(
        count("order_id").alias("total_orders"),
        sum("total_amount").alias("total_spend"),
        avg("total_amount").alias("avg_order_value"),
        max("order_date").alias("last_order_date"),
        countDistinct("product_id").alias("unique_products"),
    ) \\
    .withColumn("days_since_last_order", 
                datediff(current_date(), col("last_order_date")))

# RFM Segmentation
rfm = order_features.select(
    "customer_id", "days_since_last_order", "total_orders", "total_spend")

rfm_scored = rfm \\
    .withColumn("R_score", ntile(5).over(
        Window.orderBy(col("days_since_last_order").asc()))) \\
    .withColumn("F_score", ntile(5).over(
        Window.orderBy(col("total_orders").desc()))) \\
    .withColumn("M_score", ntile(5).over(
        Window.orderBy(col("total_spend").desc()))) \\
    .withColumn("RFM_score", col("R_score") + col("F_score") + col("M_score")) \\
    .withColumn("customer_segment",
        when(col("RFM_score") >= 13, "Champions")
        .when(col("RFM_score") >= 10, "Loyal Customers")
        .when(col("RFM_score") >= 7, "Potential Loyalists")
        .when(col("RFM_score") >= 5, "At Risk")
        .otherwise("Lost"))

# Build Customer 360 Profile
customer_360 = customers_clean \\
    .join(order_features, "customer_id", "left") \\
    .join(rfm_scored.select("customer_id", "RFM_score", "customer_segment"), 
          "customer_id", "left") \\
    .withColumn("customer_value_tier",
        when(col("total_spend") > 500, "Platinum")
        .when(col("total_spend") > 200, "Gold")
        .when(col("total_spend") > 50, "Silver")
        .otherwise("Bronze")) \\
    .withColumn("churn_risk",
        when(col("days_since_last_order") > 180, "High")
        .when(col("days_since_last_order") > 90, "Medium")
        .otherwise("Low"))

# Load — Write to Data Lake
customer_360.write \\
    .mode("overwrite") \\
    .partitionBy("country", "customer_segment") \\
    .parquet("output/customer_360/")`}
        />
      </div>

      {/* Project 4 */}
      <div id="project-4" className="mb-16">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg shrink-0">4</div>
          <div>
            <h3 className="text-xl font-bold text-white">Real-Time Fraud Detection System</h3>
            <p className="text-sm text-slate-400 mt-1">Detect fraudulent transactions in real-time using rule-based checks and velocity analysis.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {['Rule Engine', 'Velocity Checks', 'Risk Scoring', 'Multi-tier Alerting', 'Kafka Integration'].map((t, i) => (
            <span key={i} className="text-[10px] font-medium text-yellow-300 bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 rounded-full">{t}</span>
          ))}
        </div>

        <DiagramBlock title="Architecture">
{`Payment Gateway → Kafka → Spark Streaming
                              │
                         ┌────┼────┐
                         ▼    ▼    ▼
                     Approve Review Block & Alert`}
        </DiagramBlock>

        <CodeBlock
          title="Fraud Detection — Rule-Based Scoring"
          code={`from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import *

spark = SparkSession.builder.appName("FraudDetection").getOrCreate()

# Read transactions from Kafka
transactions = spark.readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "localhost:9092") \\
    .option("subscribe", "transactions") \\
    .load() \\
    .select(from_json(col("value").cast("string"), transaction_schema).alias("txn")) \\
    .select("txn.*") \\
    .withColumn("event_time", to_timestamp(col("timestamp"))) \\
    .withColumn("hour_of_day", hour(col("event_time"))) \\
    .withWatermark("event_time", "10 minutes")

# Apply Fraud Rules
def apply_fraud_rules(batch_df, batch_id):
    if batch_df.count() == 0:
        return

    # Enrich with customer profiles
    enriched = batch_df.join(customer_profiles, "customer_id", "left") \\
                       .join(broadcast(country_risk), "country_code", "left")

    scored = enriched \\
        .withColumn("fraud_score", lit(0.0)) \\
        .withColumn("fraud_score", col("fraud_score") +
            when(col("amount") > col("avg_txn") * 5, 30.0)
            .when(col("amount") > col("avg_txn") * 3, 15.0)
            .otherwise(0.0)) \\
        .withColumn("fraud_score", col("fraud_score") +
            when(col("risk_score") >= 3.0, 25.0)
            .when(col("risk_score") >= 2.0, 10.0)
            .otherwise(0.0)) \\
        .withColumn("fraud_score", col("fraud_score") +
            when(col("country_code") != col("home_country"), 15.0)
            .otherwise(0.0)) \\
        .withColumn("fraud_score", col("fraud_score") +
            when(col("hour_of_day").between(0, 5), 10.0)
            .otherwise(0.0)) \\
        .withColumn("fraud_score", col("fraud_score") +
            when(col("amount") > 5000, 20.0)
            .when(col("amount") > 1000, 10.0)
            .otherwise(0.0))

    # Classify
    classified = scored.withColumn("fraud_decision",
        when(col("fraud_score") >= 70, "BLOCK")
        .when(col("fraud_score") >= 40, "REVIEW")
        .when(col("fraud_score") >= 20, "MONITOR")
        .otherwise("APPROVE"))

    blocked = classified.filter(col("fraud_decision") == "BLOCK")
    if blocked.count() > 0:
        print(f"BLOCKED {blocked.count()} transactions!")

# Velocity Check — rapid successive transactions
velocity_check = transactions \\
    .groupBy(window(col("event_time"), "5 minutes"), col("customer_id")) \\
    .agg(
        count("*").alias("txn_count_5min"),
        sum("amount").alias("total_amount_5min"),
        countDistinct("country_code").alias("unique_countries")
    ) \\
    .filter(
        (col("txn_count_5min") > 5) |
        (col("unique_countries") > 2) |
        (col("total_amount_5min") > 10000)
    )

# Start queries
q = transactions.writeStream \\
    .foreachBatch(apply_fraud_rules) \\
    .trigger(processingTime="10 seconds") \\
    .start()`}
        />
      </div>

      {/* Project 5 */}
      <div id="project-5" className="mb-16">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shrink-0">5</div>
          <div>
            <h3 className="text-xl font-bold text-white">Movie Recommendation Engine</h3>
            <p className="text-sm text-slate-400 mt-1">Build a complete recommendation system using ALS collaborative filtering with hyperparameter tuning.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {['ALS Collaborative Filtering', 'Content-Based', 'Hybrid Approach', 'Cross-Validation', 'Model Evaluation'].map((t, i) => (
            <span key={i} className="text-[10px] font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full">{t}</span>
          ))}
        </div>

        <CodeBlock
          title="Movie Recommendation — ALS Model"
          code={`from pyspark.ml.recommendation import ALS
from pyspark.ml.evaluation import RegressionEvaluator
from pyspark.ml.tuning import ParamGridBuilder, CrossValidator

# Load ratings data
ratings = spark.read.csv("ratings.csv", header=True, inferSchema=True)
(training, test) = ratings.randomSplit([0.8, 0.2], seed=42)

# Build ALS Model
als = ALS(
    maxIter=15, regParam=0.1, rank=50,
    userCol="user_id", itemCol="movie_id", ratingCol="rating",
    coldStartStrategy="drop", nonnegative=True
)

# Train
als_model = als.fit(training)

# Evaluate
predictions = als_model.transform(test)
evaluator = RegressionEvaluator(
    metricName="rmse", labelCol="rating", predictionCol="prediction")
rmse = evaluator.evaluate(predictions)
print(f"RMSE: {rmse:.4f}")

# Hyperparameter Tuning
paramGrid = ParamGridBuilder() \\
    .addGrid(als.rank, [10, 30, 50]) \\
    .addGrid(als.regParam, [0.01, 0.1, 0.5]) \\
    .addGrid(als.maxIter, [10, 15]) \\
    .build()

crossval = CrossValidator(
    estimator=als, estimatorParamMaps=paramGrid,
    evaluator=evaluator, numFolds=3, parallelism=4)

cv_model = crossval.fit(training)
best_model = cv_model.bestModel

# Generate Top-10 Recommendations for All Users
user_recs = best_model.recommendForAllUsers(10)

# Explode and enrich with movie details
user_recs_detailed = user_recs \\
    .withColumn("rec", explode(col("recommendations"))) \\
    .select(
        col("user_id"),
        col("rec.movie_id").alias("movie_id"),
        col("rec.rating").alias("predicted_rating")
    ) \\
    .join(movies.select("movie_id", "title", "genres"), "movie_id")

# Show recommendations for user 1
user_recs_detailed.filter(col("user_id") == 1) \\
    .orderBy(col("predicted_rating").desc()) \\
    .select("title", "genres", round("predicted_rating", 2).alias("score")) \\
    .show(10, truncate=False)

# Content-Based: Create genre vectors for similarity
from pyspark.ml.feature import VectorAssembler

for genre in genre_list:
    movies = movies.withColumn(
        f"g_{genre}", 
        when(col("genres").contains(genre), 1.0).otherwise(0.0))

assembler = VectorAssembler(
    inputCols=[f"g_{g}" for g in genre_list], outputCol="genre_vector")
movies_vec = assembler.transform(movies)

# Save model
best_model.save("models/als_recommendation_model")
print("Recommendation Engine Complete!")`}
        />
      </div>
    </section>
  );
}
