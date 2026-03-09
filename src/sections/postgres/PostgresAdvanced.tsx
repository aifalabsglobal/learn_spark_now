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
        <strong>Transactions</strong> group several changes into one unit: either all succeed or all are rolled back. <strong>CTEs</strong> and <strong>window functions</strong> let you write complex queries in a clear, step-by-step way.
      </Callout>

      <div id="postgres-transactions" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          Transactions
        </h3>
        <CodeBlock
          title="BEGIN / COMMIT / ROLLBACK"
          code={`BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
  -- If anything fails, ROLLBACK; otherwise:
COMMIT;`}
          language="bash"
        />
        <p className="text-slate-400 text-sm mt-2">In most clients, each statement runs in its own transaction (auto-commit). Use <code className="text-slate-300">BEGIN</code> when you need multiple statements to succeed or fail together.</p>
      </div>

      <div id="postgres-cte" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          CTEs (Common Table Expressions)
        </h3>
        <p className="text-slate-400 text-sm mb-4">A CTE is a named subquery you can reference later in the same statement. Makes complex queries easier to read.</p>
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
        <p className="text-slate-400 text-sm mb-4">Window functions compute a value per row based on a “window” of rows (e.g. previous rows, or partition). They do not collapse rows like GROUP BY.</p>
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
