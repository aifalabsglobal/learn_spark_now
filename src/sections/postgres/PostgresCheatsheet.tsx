import Callout from '../../components/Callout';

export default function PostgresCheatsheet() {
  return (
    <section id="postgres-cheatsheet" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-postgres bg-postgres/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 6</span>
        <div className="h-px flex-1 bg-gradient-to-r from-postgres/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">PostgreSQL & SQL Cheatsheet</h2>

      <Callout type="info" title="Quick reference">
        Keep this page open while writing SQL. Covers the most common clauses and functions.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Clause order in a SELECT is fixed: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT. Use DML for insert/update/delete; DDL for tables and indexes; wrap multi-statement changes in BEGIN/COMMIT for transactions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-5">
          <h4 className="text-sm font-bold text-postgres-light mb-3">Query clauses (order matters)</h4>
          <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
            <li>SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT</li>
          </ul>
          <h4 className="text-sm font-bold text-postgres-light mt-4 mb-2">DML</h4>
          <ul className="space-y-1 text-xs text-slate-400">
            <li><code className="text-slate-300">INSERT INTO t (a,b) VALUES (1,2);</code></li>
            <li><code className="text-slate-300">UPDATE t SET a=1 WHERE b=2;</code></li>
            <li><code className="text-slate-300">DELETE FROM t WHERE id=1;</code></li>
          </ul>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-5">
          <h4 className="text-sm font-bold text-postgres-light mb-3">Aggregates & filters</h4>
          <ul className="space-y-1 text-xs text-slate-400">
            <li>COUNT(*), SUM(col), AVG(col), MIN(col), MAX(col)</li>
            <li>WHERE = filter rows before GROUP BY</li>
            <li>HAVING = filter groups after aggregation</li>
          </ul>
          <h4 className="text-sm font-bold text-postgres-light mt-4 mb-2">Joins</h4>
          <ul className="space-y-1 text-xs text-slate-400">
            <li>INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN</li>
            <li>ON condition (e.g. a.id = b.a_id)</li>
          </ul>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-5">
          <h4 className="text-sm font-bold text-postgres-light mb-3">DDL</h4>
          <ul className="space-y-1 text-xs text-slate-400">
            <li>CREATE TABLE, ALTER TABLE, DROP TABLE</li>
            <li>CREATE INDEX idx ON t(col);</li>
            <li>PRIMARY KEY, UNIQUE, NOT NULL, CHECK, REFERENCES</li>
          </ul>
        </div>

        <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-5">
          <h4 className="text-sm font-bold text-postgres-light mb-3">Transactions & advanced</h4>
          <ul className="space-y-1 text-xs text-slate-400">
            <li>BEGIN; ... COMMIT; / ROLLBACK;</li>
            <li>WITH cte AS (SELECT ...) SELECT * FROM cte;</li>
            <li>ROW_NUMBER() OVER (PARTITION BY x ORDER BY y)</li>
          </ul>
        </div>
      </div>

      <p className="text-slate-500 text-xs">
        For full syntax, see <a href="https://www.postgresql.org/docs/current/sql-commands.html" className="text-postgres-light hover:underline">PostgreSQL SQL command reference</a>.
      </p>
</section>
  );
}
