import CodeBlock from '../components/CodeBlock';
import Callout from '../components/Callout';

export default function SparkSQL() {
  return (
    <section id="spark-sql" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-spark bg-spark/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 3</span>
        <div className="h-px flex-1 bg-gradient-to-r from-spark/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8 gradient-text">Spark SQL & DataFrames</h2>

      <Callout type="info" title="👋 In Plain English">
        <strong>Spark SQL</strong> lets you work with data using tables and columns — like a giant spreadsheet that can live on many computers. You can filter rows (&quot;show me only kids older than 10&quot;), add columns, and run SQL queries, all while Spark does the heavy lifting in the background.
      </Callout>

      {/* Creating DataFrames */}
      <div id="dataframes" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Creating DataFrames
        </h3>
        <Callout type="info" title="What is a DataFrame? (Kid-Friendly)">
          Think of a <span className="font-bold text-white">DataFrame</span> like a super-powered Excel spreadsheet or a table with rows and columns. The cool part: it can be split into pieces and processed by thousands of computers at the same time — like a class project where every row is a student and everyone works on different rows together!
        </Callout>
        <CodeBlock
          title="6 Ways to Create DataFrames"
          code={`from pyspark.sql import SparkSession
from pyspark.sql.types import *

spark = SparkSession.builder \\
    .appName("SparkSQL_Deep_Dive") \\
    .config("spark.sql.adaptive.enabled", "true") \\
    .getOrCreate()

# Method 1: From list of tuples
data = [
    ("Alice", "Engineering", 75000, "2020-01-15"),
    ("Bob", "Marketing", 65000, "2019-06-20"),
    ("Charlie", "Engineering", 80000, "2018-03-10"),
]
schema = StructType([
    StructField("name", StringType(), True),
    StructField("department", StringType(), True),
    StructField("salary", IntegerType(), True),
    StructField("join_date", StringType(), True),
])
df = spark.createDataFrame(data, schema)

# Method 2: From CSV
df_csv = spark.read \\
    .option("header", "true") \\
    .option("inferSchema", "true") \\
    .csv("employees.csv")

# Method 3: From JSON
df_json = spark.read.option("multiLine", "true").json("data.json")

# Method 4: From Parquet (columnar - recommended)
df_parquet = spark.read.parquet("data.parquet")

# Method 5: From database (JDBC)
df_jdbc = spark.read.format("jdbc") \\
    .option("url", "jdbc:mysql://localhost:3306/mydb") \\
    .option("dbtable", "employees") \\
    .option("user", "root") \\
    .option("password", "password") \\
    .load()

# Method 6: From Hive table
# df_hive = spark.sql("SELECT * FROM database.table")`}
        />
      </div>

      {/* DataFrame Operations */}
      <div id="df-operations" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          DataFrame Operations
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          <strong className="text-slate-300">In simple words:</strong> You can <strong>select</strong> columns (pick which columns to show), <strong>filter</strong> rows (keep only rows that match a rule, like &quot;salary &gt; 70000&quot;), <strong>add</strong> new columns (e.g. a bonus column), and <strong>sort</strong> or <strong>drop</strong> columns. Just like editing a spreadsheet!
        </p>
        <CodeBlock
          title="Common DataFrame Operations"
          code={`from pyspark.sql.functions import *

# --- Selection ---
df.select("name", "salary").show()
df.select(col("name"), col("salary") * 1.1).show()

# --- Filtering ---
df.filter(col("salary") > 70000).show()
df.filter((col("department") == "Engineering") & (col("salary") > 75000)).show()
df.where("salary > 70000 AND department = 'Engineering'").show()

# --- Adding/Modifying Columns ---
df = df.withColumn("bonus", col("salary") * 0.1)
df = df.withColumn("join_date", to_date(col("join_date"), "yyyy-MM-dd"))
df = df.withColumn("year_joined", year(col("join_date")))
df = df.withColumn("salary_level", 
    when(col("salary") > 80000, "High")
    .when(col("salary") > 65000, "Medium")
    .otherwise("Low")
)

# --- Renaming & Dropping ---
df = df.withColumnRenamed("name", "employee_name")
df = df.drop("bonus")

# --- Sorting ---
df.orderBy(col("salary").desc()).show()
df.sort(col("department").asc(), col("salary").desc()).show()

# --- Handling Nulls ---
df.na.fill(0, subset=["salary"])
df.na.drop(subset=["name"])
df.na.replace({"Engineering": "Eng"}, subset=["department"])`}
        />
      </div>

      {/* Aggregations */}
      <div id="aggregations" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Aggregations
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          <strong className="text-slate-300">Plain English:</strong> Aggregation means &quot;combine many rows into one summary.&quot; For example: <strong>count</strong> how many people are in each department, <strong>average</strong> their salary, or <strong>sum</strong> total sales. Like asking &quot;How many kids in each class?&quot; or &quot;What&apos;s the total score per team?&quot;
        </p>
        <CodeBlock
          title="Aggregation Operations"
          code={`# Basic aggregations
df.groupBy("department").agg(
    count("*").alias("emp_count"),
    avg("salary").alias("avg_salary"),
    max("salary").alias("max_salary"),
    min("salary").alias("min_salary"),
    sum("salary").alias("total_salary"),
    stddev("salary").alias("std_salary"),
    collect_list("employee_name").alias("employees")
).show()

# Multiple groupBy
df.groupBy("department", "salary_level") \\
  .count() \\
  .orderBy("department", "salary_level") \\
  .show()

# Pivot Table
df.groupBy("department") \\
  .pivot("salary_level", ["Low", "Medium", "High"]) \\
  .agg(count("*")) \\
  .show()
# +------------+---+------+----+
# |  department|Low|Medium|High|
# +------------+---+------+----+
# | Engineering|  0|     1|   2|
# |   Marketing|  0|     2|   0|
# |          HR|  1|     0|   0|
# +------------+---+------+----+`}
        />
      </div>

      {/* Window Functions */}
      <div id="window-functions" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Window Functions
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          <strong className="text-slate-300">In plain English:</strong> Window functions let you answer questions like &quot;What&apos;s my rank in my class?&quot; or &quot;What&apos;s the average salary in my department?&quot; — without squashing all rows into one. You look at a &quot;window&quot; of rows (e.g. all people in the same department) and compute something for each row.
        </p>
        <CodeBlock
          title="Window Functions"
          code={`from pyspark.sql.window import Window

# Define window specifications
dept_window = Window.partitionBy("department").orderBy(col("salary").desc())
salary_window = Window.partitionBy("department")

df_windowed = df \\
    .withColumn("rank", rank().over(dept_window)) \\
    .withColumn("dense_rank", dense_rank().over(dept_window)) \\
    .withColumn("row_number", row_number().over(dept_window)) \\
    .withColumn("dept_avg_salary", avg("salary").over(salary_window)) \\
    .withColumn("salary_diff_from_avg", 
                col("salary") - avg("salary").over(salary_window)) \\
    .withColumn("running_total", 
                sum("salary").over(dept_window.rowsBetween(
                    Window.unboundedPreceding, Window.currentRow))) \\
    .withColumn("prev_salary", lag("salary", 1).over(dept_window)) \\
    .withColumn("next_salary", lead("salary", 1).over(dept_window)) \\
    .withColumn("ntile_4", ntile(4).over(dept_window))

# Top N per group
top2_per_dept = df \\
    .withColumn("rank", rank().over(dept_window)) \\
    .filter(col("rank") <= 2)`}
        />
      </div>

      {/* Joins */}
      <div id="joins" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Joins
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          <strong className="text-slate-300">Kid-friendly:</strong> A <strong>join</strong> is when you combine two tables by matching a column (like student ID). <strong>Inner join</strong> = only keep rows that have a match in both tables. <strong>Left join</strong> = keep everyone from the first table and add info from the second when it matches.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 mb-4">
          {['inner', 'left', 'right', 'full', 'left_semi', 'left_anti', 'cross'].map((j, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700/40 rounded-lg px-2 py-1.5 text-center text-[11px] font-mono text-slate-300">
              {j}
            </div>
          ))}
        </div>

        <CodeBlock
          title="Join Types"
          code={`departments = spark.createDataFrame([
    ("Engineering", "Building A", "John"),
    ("Marketing", "Building B", "Jane"),
    ("HR", "Building C", "Mike"),
    ("Finance", "Building D", "Sara"),
], ["dept_name", "location", "manager"])

# Inner Join (default)
df.join(departments, df.department == departments.dept_name, "inner").show()

# Left Outer Join
df.join(departments, df.department == departments.dept_name, "left").show()

# Left Semi Join (like WHERE EXISTS)
df.join(departments, df.department == departments.dept_name, "left_semi").show()

# Left Anti Join (like WHERE NOT EXISTS)
df.join(departments, df.department == departments.dept_name, "left_anti").show()

# Handle duplicate columns after join
result = df.alias("e").join(
    departments.alias("d"),
    col("e.department") == col("d.dept_name"), "inner"
).select("e.*", "d.location", "d.manager")`}
        />
      </div>

      {/* SQL Queries */}
      <div id="sql-queries" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          SQL Queries
        </h3>
        <CodeBlock
          title="Running SQL on DataFrames"
          code={`# Register DataFrame as temporary view
df.createOrReplaceTempView("employees")

# Run SQL queries
spark.sql("""
    SELECT department,
           COUNT(*) as emp_count,
           AVG(salary) as avg_salary,
           MAX(salary) as max_salary
    FROM employees
    WHERE salary > 60000
    GROUP BY department
    HAVING COUNT(*) > 1
    ORDER BY avg_salary DESC
""").show()

# CTE (Common Table Expression)
spark.sql("""
    WITH dept_stats AS (
        SELECT department,
               AVG(salary) as avg_salary,
               COUNT(*) as emp_count
        FROM employees
        GROUP BY department
    )
    SELECT e.*, d.avg_salary, d.emp_count
    FROM employees e
    JOIN dept_stats d ON e.department = d.department
    WHERE e.salary > d.avg_salary
""").show()`}
        />
      </div>

      {/* UDFs */}
      <div id="udfs" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          UDFs (User Defined Functions)
        </h3>
        <p className="text-slate-400 text-sm mb-2">
          <strong className="text-slate-300">Plain English:</strong> A <strong>UDF</strong> (User Defined Function) is your own rule — like &quot;if salary is high, call it Senior; if medium, call it Mid.&quot; Spark lets you use these on every row. <strong>Pandas UDFs</strong> do the same thing but work on chunks of rows at once, so they&apos;re much faster!
        </p>
        <Callout type="tip" title="Use Pandas UDFs!">
          When you need custom functions, always prefer <span className="font-bold text-white">Pandas UDFs</span> (vectorized) over standard Python UDFs. They process data in batches instead of row-by-row, making them 10x-100x faster!
        </Callout>

        <CodeBlock
          title="Python UDF vs Pandas UDF"
          code={`# Python UDF (slower - serialization overhead)
@udf(returnType=StringType())
def categorize_salary(salary):
    if salary > 80000:
        return "Senior"
    elif salary > 65000:
        return "Mid"
    else:
        return "Junior"

df.withColumn("level", categorize_salary(col("salary"))).show()

# Pandas UDF (vectorized - MUCH faster)
from pyspark.sql.functions import pandas_udf
import pandas as pd

@pandas_udf(DoubleType())
def normalize_salary(salary: pd.Series) -> pd.Series:
    return (salary - salary.mean()) / salary.std()

df.withColumn("normalized", normalize_salary(col("salary"))).show()

# Register UDF for SQL
spark.udf.register("cat_salary", categorize_salary)
spark.sql("SELECT *, cat_salary(salary) as level FROM employees").show()`}
        />
      </div>

      {/* Writing Data */}
      <div id="writing-data" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-spark rounded-full" />
          Writing Data
        </h3>
        <CodeBlock
          title="Output Formats"
          code={`# Write to Parquet (recommended)
df.write \\
    .mode("overwrite") \\
    .partitionBy("department") \\
    .parquet("output/employees.parquet")

# Write to CSV
df.write \\
    .mode("overwrite") \\
    .option("header", "true") \\
    .csv("output/employees.csv")

# Write to JSON
df.write.mode("overwrite").json("output/employees.json")

# Write to single file
df.coalesce(1).write.mode("overwrite").csv("output/single_file.csv")

# Write to database
df.write.format("jdbc") \\
    .option("url", "jdbc:mysql://localhost:3306/mydb") \\
    .option("dbtable", "employees_output") \\
    .mode("overwrite").save()

# Bucketing (for optimized joins)
df.write \\
    .bucketBy(4, "department") \\
    .sortBy("salary") \\
    .saveAsTable("bucketed_employees")`}
        />
      </div>
    </section>
  );
}
