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
        You <strong>SELECT</strong> columns <strong>FROM</strong> a table, optionally <strong>WHERE</strong> some condition is true. To combine data from multiple tables, you use <strong>JOIN</strong>.
      </Callout>

      <div id="postgres-select-where" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          SELECT and WHERE
        </h3>
        <CodeBlock
          title="Basic query"
          code={`SELECT id, name, email FROM users WHERE created_at >= '2024-01-01';`}
          language="bash"
        />
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mt-4">
          <ul className="text-xs text-slate-400 space-y-1">
            <li><code className="text-slate-300">SELECT *</code> — all columns</li>
            <li><code className="text-slate-300">DISTINCT</code> — unique rows</li>
            <li><code className="text-slate-300">ORDER BY col ASC/DESC</code> — sort</li>
            <li><code className="text-slate-300">LIMIT n OFFSET m</code> — pagination</li>
          </ul>
        </div>
      </div>

      <div id="postgres-joins" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          JOINs
        </h3>
        <p className="text-slate-400 text-sm mb-4">Combine rows from two tables by matching a key (e.g. <code className="text-slate-300">user_id</code>).</p>
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
            <li><strong className="text-slate-300">INNER JOIN</strong> — only rows that match in both tables</li>
            <li><strong className="text-slate-300">LEFT JOIN</strong> — all from left + matches from right (NULL if no match)</li>
            <li><strong className="text-slate-300">RIGHT JOIN</strong> — all from right + matches from left</li>
            <li><strong className="text-slate-300">FULL OUTER JOIN</strong> — all rows from both, NULLs where no match</li>
          </ul>
        </div>
      </div>

      <div id="postgres-aggregations" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          GROUP BY and Aggregations
        </h3>
        <p className="text-slate-400 text-sm mb-4">Summarize data with <code className="text-slate-300">COUNT</code>, <code className="text-slate-300">SUM</code>, <code className="text-slate-300">AVG</code>, <code className="text-slate-300">MIN</code>, <code className="text-slate-300">MAX</code>. Use <code className="text-slate-300">GROUP BY</code> to group rows; non-aggregated columns in SELECT must appear in GROUP BY.</p>
        <CodeBlock
          title="Count orders per user"
          code={`SELECT user_id, COUNT(*) AS order_count, SUM(amount) AS total_spent
FROM orders
GROUP BY user_id
HAVING COUNT(*) >= 2
ORDER BY total_spent DESC;`}
          language="bash"
        />
        <p className="text-slate-400 text-sm mt-2"><code className="text-slate-300">HAVING</code> filters after grouping (like WHERE for aggregates).</p>
      </div>
    </section>
  );
}
