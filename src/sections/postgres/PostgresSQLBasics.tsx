import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function PostgresSQLBasics() {
  return (
    <section id="postgres-sql-basics" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-postgres bg-postgres/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 2</span>
        <div className="h-px flex-1 bg-gradient-to-r from-postgres/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">SQL Basics: SELECT, WHERE, JOINs</h2>

      <Callout type="info" title="👋 In Plain English">
        You <strong>SELECT</strong> columns <strong>FROM</strong> a table, optionally <strong>WHERE</strong> some condition is true. To combine data from multiple tables, you use <strong>JOIN</strong>. To summarize data, you use <strong>GROUP BY</strong> and aggregate functions.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        This section covers the core query patterns you’ll use in almost every application: filtering rows with WHERE, sorting and paginating, joining tables to combine related data, and aggregating with GROUP BY and HAVING. Master these and you can handle most read-only SQL needs.
      </p>

      <div id="postgres-select-where" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          SELECT and WHERE
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          <code className="text-slate-300">SELECT</code> lists the columns you want; <code className="text-slate-300">FROM</code> specifies the table. <code className="text-slate-300">WHERE</code> filters rows before they are returned — only rows that satisfy the condition are included. Use <code className="text-slate-300">AND</code>, <code className="text-slate-300">OR</code>, and parentheses to build complex conditions.
        </p>
        <CodeBlock
          title="Basic query"
          code={`SELECT id, name, email FROM users WHERE created_at >= '2024-01-01';`}
          language="bash"
        />
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mt-4">
          <h4 className="text-sm font-bold text-postgres-light mb-2">Useful clauses</h4>
          <ul className="text-xs text-slate-400 space-y-1">
            <li><code className="text-slate-300">SELECT *</code> — return all columns (avoid in production code; list columns explicitly for clarity and stability).</li>
            <li><code className="text-slate-300">DISTINCT</code> — remove duplicate rows (e.g. <code className="text-slate-300">SELECT DISTINCT country FROM users</code>).</li>
            <li><code className="text-slate-300">ORDER BY col ASC/DESC</code> — sort results. Default is ASC; add <code className="text-slate-300">NULLS LAST</code> if needed.</li>
            <li><code className="text-slate-300">LIMIT n OFFSET m</code> — pagination: return at most <code className="text-slate-300">n</code> rows, skip the first <code className="text-slate-300">m</code>. For large offsets, use keyset pagination instead for better performance.</li>
          </ul>
        </div>
      </div>

      <div id="postgres-joins" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          JOINs
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Data is often split across tables (e.g. <code className="text-slate-300">users</code> and <code className="text-slate-300">orders</code>). A <strong className="text-slate-300">JOIN</strong> combines rows from two tables by matching values in a key column (e.g. <code className="text-slate-300">user_id</code>). The <code className="text-slate-300">ON</code> clause defines the join condition; use table aliases (e.g. <code className="text-slate-300">o</code>, <code className="text-slate-300">u</code>) to keep the query readable.
        </p>
        <CodeBlock
          title="INNER JOIN — only matching rows"
          code={`SELECT o.id, o.amount, u.name
FROM orders o
INNER JOIN users u ON u.id = o.user_id
WHERE o.status = 'paid';`}
          language="bash"
        />
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mt-4">
          <h4 className="text-sm font-bold text-postgres-light mb-2">Join types</h4>
          <ul className="text-xs text-slate-400 space-y-1">
            <li><strong className="text-slate-300">INNER JOIN</strong> — Only rows that match in both tables. Orders with no matching user (or users with no orders) are excluded.</li>
            <li><strong className="text-slate-300">LEFT JOIN</strong> — All rows from the left table; matching rows from the right. Where there’s no match, right-side columns are NULL. Use for “all users and their orders (if any)”.</li>
            <li><strong className="text-slate-300">RIGHT JOIN</strong> — All from the right, matches from the left. Less common; often rewritten as LEFT JOIN by swapping tables.</li>
            <li><strong className="text-slate-300">FULL OUTER JOIN</strong> — All rows from both tables; NULLs where there’s no match on either side.</li>
          </ul>
        </div>
      </div>

      <div id="postgres-aggregations" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          GROUP BY and Aggregations
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          To summarize data (counts, sums, averages), use <strong className="text-slate-300">aggregate functions</strong> like <code className="text-slate-300">COUNT</code>, <code className="text-slate-300">SUM</code>, <code className="text-slate-300">AVG</code>, <code className="text-slate-300">MIN</code>, <code className="text-slate-300">MAX</code>. With <code className="text-slate-300">GROUP BY</code>, you get one result row per distinct value of the grouped column(s). Rule: every column in the SELECT list must either be in the GROUP BY or be inside an aggregate function. <code className="text-slate-300">HAVING</code> filters groups after aggregation (like WHERE, but for groups).
        </p>
        <CodeBlock
          title="Count orders per user"
          code={`SELECT user_id, COUNT(*) AS order_count, SUM(amount) AS total_spent
FROM orders
GROUP BY user_id
HAVING COUNT(*) >= 2
ORDER BY total_spent DESC;`}
          language="bash"
        />
        <p className="text-slate-400 text-sm mt-2">
          Here we only keep users with at least 2 orders (<code className="text-slate-300">HAVING COUNT(*) &gt;= 2</code>) and sort by total spend. Use <code className="text-slate-300">HAVING</code> when the filter depends on an aggregate; use <code className="text-slate-300">WHERE</code> when filtering individual rows before grouping.
        </p>
</div>
    </section>
  );
}
