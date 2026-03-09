import CodeBlock, { DiagramBlock } from '../components/CodeBlock';
import Callout from '../components/Callout';

export function MLlib() {
  return (
    <section id="mllib" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-spark bg-spark/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 5</span>
        <div className="h-px flex-1 bg-gradient-to-r from-spark/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8 gradient-text">MLlib (Machine Learning)</h2>

      <Callout type="info" title="👋 In Plain English">
        <strong>Machine learning</strong> means teaching the computer to find patterns in data and make predictions — like &quot;is this email spam?&quot; or &quot;what movie might this user like?&quot; <strong>MLlib</strong> is Spark&apos;s toolbox for doing this on huge datasets. A <strong>pipeline</strong> is a recipe: first prepare the data (transformers), then train a model (estimator), then use it to predict!
      </Callout>

      <div id="ml-pipeline" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          ML Pipeline Concepts
        </h3>

        <DiagramBlock title="Spark ML Pipeline Flow">
{`Raw Data → [Transformer] → [Transformer] → [Estimator] → Model
            StringIndexer   VectorAssembler  RandomForest

Transformer: Transforms one DataFrame to another (adds columns)
Estimator:   Algorithm that fits on data to produce a Model
Pipeline:    Chain of Transformers and Estimators`}
        </DiagramBlock>

        <p className="text-slate-400 text-sm mt-4 mb-2">
          <strong className="text-slate-300">Plain English:</strong> A <strong>Transformer</strong> changes your data (e.g. turn words into numbers). An <strong>Estimator</strong> learns from data and gives you a model (like a decision tree or a recommendation model). A <strong>Pipeline</strong> chains them: step 1 transform, step 2 transform, step 3 train model — all in one go!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 mb-6">
          <div className="bg-blue-950/20 border border-blue-500/20 rounded-xl p-4">
            <h4 className="text-sm font-bold text-blue-400 mb-1">Transformer</h4>
            <p className="text-xs text-slate-400">Converts DataFrame to DataFrame. E.g., StringIndexer, VectorAssembler. Like a step that prepares the ingredients.</p>
          </div>
          <div className="bg-green-950/20 border border-green-500/20 rounded-xl p-4">
            <h4 className="text-sm font-bold text-green-400 mb-1">Estimator</h4>
            <p className="text-xs text-slate-400">Algorithm that fits data to produce a Model. E.g., RandomForest, ALS. Like the chef that learns and creates the recipe.</p>
          </div>
          <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-4">
            <h4 className="text-sm font-bold text-purple-400 mb-1">Pipeline</h4>
            <p className="text-xs text-slate-400">Chain of stages (Transformers + Estimators) executed in sequence. The full recipe from raw data to predictions!</p>
          </div>
        </div>
      </div>

      <div id="feature-eng" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Feature Engineering
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          <strong className="text-slate-300">In plain English:</strong> <strong>Feature engineering</strong> means turning your raw data into numbers and shapes the model can use. For example: turn &quot;Engineering&quot; / &quot;Marketing&quot; into 0 and 1, scale numbers so they&apos;re in a similar range, or combine several columns into one &quot;feature vector.&quot; Good features = better predictions!
        </p>
        <CodeBlock
          title="Feature Engineering Tools"
          code={`from pyspark.ml.feature import *

# StringIndexer: Categorical string → numeric index
indexer = StringIndexer(inputCol="department", outputCol="dept_index")

# OneHotEncoder: Numeric index → binary vector
encoder = OneHotEncoder(inputCol="dept_index", outputCol="dept_vec")

# VectorAssembler: Combine multiple columns → single feature vector
assembler = VectorAssembler(
    inputCols=["age", "salary", "dept_vec", "years_experience"],
    outputCol="features"
)

# StandardScaler: Normalize features
scaler = StandardScaler(inputCol="features", outputCol="scaled_features")

# Tokenizer: Split text into words
tokenizer = Tokenizer(inputCol="text", outputCol="words")

# HashingTF + IDF: Text feature extraction
hashingTF = HashingTF(inputCol="words", outputCol="raw_features", numFeatures=10000)
idf = IDF(inputCol="raw_features", outputCol="tfidf_features")

# Bucketizer: Bin continuous values
bucketizer = Bucketizer(
    splits=[0, 30, 50, 70, 100],
    inputCol="age", outputCol="age_bucket"
)`}
        />
      </div>

      <div id="classification" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Classification Example
        </h3>
        <CodeBlock
          title="Complete Classification Pipeline"
          code={`from pyspark.ml import Pipeline
from pyspark.ml.classification import RandomForestClassifier
from pyspark.ml.evaluation import MulticlassClassificationEvaluator

# Load and split data (Windows: use C:/ path)
data = spark.read.csv("C:/data/data.csv", header=True, inferSchema=True)
train, test = data.randomSplit([0.8, 0.2], seed=42)

# Create pipeline
pipeline = Pipeline(stages=[
    StringIndexer(inputCol="category", outputCol="label"),
    StringIndexer(inputCol="department", outputCol="dept_index"),
    OneHotEncoder(inputCol="dept_index", outputCol="dept_vec"),
    VectorAssembler(inputCols=["age", "salary", "dept_vec"], outputCol="features"),
    StandardScaler(inputCol="features", outputCol="scaled_features"),
    RandomForestClassifier(
        featuresCol="scaled_features",
        labelCol="label",
        numTrees=100,
        maxDepth=5
    )
])

# Train model
model = pipeline.fit(train)

# Predict & Evaluate
predictions = model.transform(test)

evaluator = MulticlassClassificationEvaluator(
    labelCol="label", predictionCol="prediction", metricName="accuracy"
)
accuracy = evaluator.evaluate(predictions)
print(f"Accuracy: {accuracy:.4f}")`}
        />
      </div>

      <div id="hyperparameter" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Hyperparameter Tuning
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          <strong className="text-slate-300">Plain English:</strong> <strong>Hyperparameters</strong> are knobs you turn before training (e.g. &quot;how many trees?&quot; or &quot;how deep?&quot;). <strong>Tuning</strong> means trying different combinations and picking the one that works best — like testing different amounts of sugar in a recipe until it tastes just right!
        </p>
        <CodeBlock
          title="Cross-Validation & Grid Search"
          code={`from pyspark.ml.tuning import ParamGridBuilder, CrossValidator

# Parameter Grid
paramGrid = ParamGridBuilder() \\
    .addGrid(pipeline.getStages()[-1].numTrees, [50, 100, 200]) \\
    .addGrid(pipeline.getStages()[-1].maxDepth, [3, 5, 7, 10]) \\
    .addGrid(pipeline.getStages()[-1].minInstancesPerNode, [1, 5, 10]) \\
    .build()

# Cross Validator
crossval = CrossValidator(
    estimator=pipeline,
    estimatorParamMaps=paramGrid,
    evaluator=evaluator,
    numFolds=5,
    parallelism=4
)

# Fit and get best model
cv_model = crossval.fit(train)
best_model = cv_model.bestModel
print(f"Best accuracy: {evaluator.evaluate(cv_model.transform(test)):.4f}")

# Save/Load model (Windows: use C:/ path)
model.save("C:/data/models/my_model")
# loaded_model = PipelineModel.load("C:/data/models/my_model")`}
        />
      </div>
    </section>
  );
}

export function Performance() {
  return (
    <section id="performance" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-spark bg-spark/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 6</span>
        <div className="h-px flex-1 bg-gradient-to-r from-spark/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8 gradient-text">Performance Tuning</h2>

      <Callout type="info" title="👋 In Plain English">
        <strong>Performance tuning</strong> means making your Spark job run faster and use memory better. You can give each worker more memory, use more workers, turn on &quot;adaptive&quot; features so Spark fixes slow parts by itself, and avoid moving data around too much (e.g. broadcast small tables instead of shuffling). Think of it like organizing a team so everyone has enough space and no one is waiting for someone else!
      </Callout>

      <div id="spark-config" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Configuration Tuning
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          <strong className="text-slate-300">Simple words:</strong> These settings tell Spark how much memory to use per worker, how many workers, how many partitions to use for shuffles, and whether to use smart optimizations (adaptive execution). Bigger data or heavier jobs usually need more memory and more partitions.
        </p>
        <CodeBlock
          title="Spark Configuration"
          code={`spark = SparkSession.builder \\
    .appName("OptimizedApp") \\
    .config("spark.executor.memory", "8g") \\
    .config("spark.executor.cores", "4") \\
    .config("spark.executor.instances", "10") \\
    .config("spark.driver.memory", "4g") \\
    .config("spark.sql.shuffle.partitions", "200") \\
    .config("spark.sql.adaptive.enabled", "true") \\
    .config("spark.sql.adaptive.coalescePartitions.enabled", "true") \\
    .config("spark.serializer", "org.apache.spark.serializer.KryoSerializer") \\
    .config("spark.sql.autoBroadcastJoinThreshold", "50m") \\
    .config("spark.dynamicAllocation.enabled", "true") \\
    .config("spark.dynamicAllocation.minExecutors", "2") \\
    .config("spark.dynamicAllocation.maxExecutors", "20") \\
    .getOrCreate()`}
        />
      </div>

      <div id="optimization" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Optimization Techniques
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { t: 'Partitioning', items: ['repartition(n): Increase/decrease partitions (shuffle)', 'coalesce(n): Decrease partitions (no shuffle)', 'Rule: 2-4x number of cores'] },
            { t: 'Data Skew Handling', items: ['Salting: Add random prefix to skewed keys', 'Broadcast join for small tables', 'Adaptive Query Execution (AQE)'] },
            { t: 'Caching', items: ['Cache frequently used DataFrames', 'Use appropriate StorageLevel', 'Unpersist when no longer needed'] },
            { t: 'Avoid Shuffles', items: ['Use reduceByKey instead of groupByKey', 'Use broadcast joins for small tables', 'Partition data by join keys'] },
            { t: 'File Format', items: ['Use Parquet/ORC (columnar, compressed)', 'Partition files by filtered columns', 'Use bucketing for frequent joins'] },
            { t: 'Query Optimization', items: ['Filter as early as possible (predicate pushdown)', 'Select only needed columns (column pruning)', 'Use built-in functions over UDFs'] },
          ].map((opt, i) => (
            <div key={i} className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-5">
              <h4 className="text-sm font-bold text-spark-light mb-3">{opt.t}</h4>
              <ul className="space-y-1.5">
                {opt.items.map((item, j) => (
                  <li key={j} className="text-xs text-slate-400 flex gap-2">
                    <span className="text-spark mt-0.5">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div id="data-skew" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Data Skew Handling (Salting)
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          <strong className="text-slate-300">In plain English:</strong> <strong>Data skew</strong> means one or two keys have way more data than others — so one worker does most of the work and others sit idle. <strong>Salting</strong> is a trick: we add a random number to the key so that big key gets split into many smaller keys and spread across workers. After the join we can combine the pieces back.
        </p>
        <CodeBlock
          title="Salting Technique for Data Skew"
          code={`from pyspark.sql.functions import rand, concat, lit, col

# Problem: One key has disproportionately more data
# Solution: Add random salt to distribute the skewed key
SALT_FACTOR = 10

# Salt the skewed DataFrame
df_salted = df.withColumn("salt", (rand() * SALT_FACTOR).cast("int")) \\
              .withColumn("salted_key", concat(col("key"), lit("_"), col("salt")))

# Salt the lookup DataFrame (replicate)
salts = spark.range(SALT_FACTOR).withColumnRenamed("id", "salt")
lookup_salted = lookup_df.crossJoin(salts) \\
    .withColumn("salted_key", concat(col("key"), lit("_"), col("salt")))

# Join on salted key (evenly distributed!)
result = df_salted.join(lookup_salted, "salted_key", "inner")`}
        />
      </div>

      <div id="broadcast-join" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Broadcast Join & Explain Plan
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          <strong className="text-slate-300">Kid-friendly:</strong> When one table is small (e.g. a list of country codes), instead of moving huge amounts of data around, we <strong>broadcast</strong> the small table — send one copy to every worker. Then each worker can do the join locally. <strong>Explain plan</strong> shows you how Spark will run your query so you can spot slow parts.
        </p>
        <CodeBlock
          title="Broadcast Join & Debugging"
          code={`from pyspark.sql.functions import broadcast

# When one table is small (< 10MB by default)
# Broadcast it to all executors to avoid shuffle (Windows: use C:/ paths)
small_df = spark.read.csv("C:/data/small_lookup.csv", header=True)
large_df = spark.read.parquet("C:/data/large_data.parquet")

# Explicit broadcast hint
result = large_df.join(broadcast(small_df), "key", "inner")

# View execution plan for debugging
df.explain()             # Simple plan
df.explain(True)         # Extended plan
df.explain("formatted")  # Formatted plan`}
        />
      </div>
    </section>
  );
}
