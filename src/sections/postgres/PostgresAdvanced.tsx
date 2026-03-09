import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function PostgresAdvanced() {
  return (
    <section id="postgres-advanced" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-postgres bg-postgres/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 4</span>
        <div className="h-px flex-1 bg-gradient-to-r from-postgres/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Advanced SQL: Transactions, CTEs, Windows</h2>

      <Callout type="info" title="👋 In Plain English">
        <strong>Transactions</strong> group several changes into one unit: either all succeed or all are rolled back. <strong>CTEs</strong> and <strong>window functions</strong> let you write complex queries in a clear, step-by-step way without nesting subqueries or losing row-level detail.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        This section covers three powerful features: transactions for multi-statement consistency, CTEs (WITH clauses) for readable multi-step queries, and window functions for per-row calculations over a “window” of rows (e.g. running totals, row numbers per group) without collapsing rows like GROUP BY.
      </p>

      <div id="postgres-transactions" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          Transactions
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          A transaction is a sequence of one or more statements that succeed or fail together. You start with <code className="text-slate-300">BEGIN</code>, run your statements, then <code className="text-slate-300">COMMIT</code> (make changes permanent) or <code className="text-slate-300">ROLLBACK</code> (undo everything since BEGIN). In many clients, each statement runs in its own transaction (auto-commit) unless you explicitly begin a transaction. Use explicit transactions when you need multiple statements to be atomic (e.g. debit one account and credit another).
        </p>
        <CodeBlock
          title="BEGIN / COMMIT / ROLLBACK"
          code={`BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
  -- If anything fails, ROLLBACK; otherwise:
COMMIT;`}
          language="bash"
        />
      </div>

      <div id="postgres-cte" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          CTEs (Common Table Expressions)
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          A CTE is a named subquery defined in a <code className="text-slate-300">WITH</code> clause that you can reference in the main query (and in later CTEs in the same WITH list). CTEs make complex logic easier to read and maintain: instead of nested subqueries, you build the result step by step. You can have multiple CTEs separated by commas; later CTes can reference earlier ones. Use <code className="text-slate-300">WITH ... AS</code> for one-off “temporary” result sets that exist only for that statement.
        </p>
        <CodeBlock
          title="WITH ... AS"
          code={`WITH top_customers AS (
  SELECT user_id, SUM(amount) AS total
  FROM orders
  GROUP BY user_id
  ORDER BY total DESC
  LIMIT 10
)
SELECT u.name, tc.total
FROM top_customers tc
JOIN users u ON u.id = tc.user_id;`}
          language="bash"
        />
      </div>

      <div id="postgres-window-functions" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          Window Functions
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Window functions compute a value for each row based on a “window” of rows — e.g. all rows in the same partition, or all rows from the start of the partition up to the current row. They do <strong className="text-slate-300">not</strong> collapse rows like GROUP BY; every row stays, and you get an extra column (e.g. row number, running total). <code className="text-slate-300">PARTITION BY</code> defines the group; <code className="text-slate-300">ORDER BY</code> defines the order within the partition (and the default frame for running-window functions). Common functions: <code className="text-slate-300">ROW_NUMBER()</code>, <code className="text-slate-300">RANK()</code>, <code className="text-slate-300">SUM() ... OVER (...)</code>, <code className="text-slate-300">LAG()</code> / <code className="text-slate-300">LEAD()</code>.
        </p>
        <CodeBlock
          title="ROW_NUMBER, RANK, running total"
          code={`SELECT
  id,
  user_id,
  amount,
  ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at) AS order_num,
  SUM(amount) OVER (PARTITION BY user_id ORDER BY created_at) AS running_total
FROM orders;`}
          language="bash"
        />
      </div>
    </section>
  );
}
