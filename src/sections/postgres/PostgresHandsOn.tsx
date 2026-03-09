import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function PostgresHandsOn() {
  return (
    <section id="postgres-handson" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-postgres bg-postgres/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 5</span>
        <div className="h-px flex-1 bg-gradient-to-r from-postgres/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Hands-On: psql and Sample Database</h2>

      <Callout type="info" title="👋 In Plain English">
        <strong>psql</strong> is the command-line client for PostgreSQL. You type SQL and run it; you can also load a sample database and practice queries on real-looking data.
      </Callout>

      <div id="postgres-psql" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          Connect with psql
        </h3>
        <CodeBlock
          title="Connect to local PostgreSQL"
          code={`psql -U postgres -h localhost -d postgres
# Or if you use a password:
# PGPASSWORD=postgres psql -U postgres -h localhost`}
          language="bash"
        />
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mt-4">
          <h4 className="text-sm font-bold text-postgres-light mb-2">Useful psql commands</h4>
          <ul className="text-xs text-slate-400 space-y-1 font-mono">
            <li><code className="text-slate-300">\l</code> — list databases</li>
            <li><code className="text-slate-300">\c dbname</code> — connect to database</li>
            <li><code className="text-slate-300">\dt</code> — list tables</li>
            <li><code className="text-slate-300">\d table_name</code> — describe table</li>
            <li><code className="text-slate-300">\q</code> — quit</li>
          </ul>
        </div>
      </div>

      <div id="postgres-sample-db" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          Load Sample Data
        </h3>
        <p className="text-slate-400 text-sm mb-4">PostgreSQL has a demo database you can download: <a href="https://www.postgresql.org/docs/current/tutorial-populate.html" className="text-postgres-light hover:underline">tutorial</a>, or use <strong>pagila</strong> / <strong>dvdrental</strong> for a small movie-rental schema.</p>
        <CodeBlock
          title="Create and populate a tiny table"
          code={`CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT, price NUMERIC(10,2));
INSERT INTO products (name, price) VALUES ('Widget', 9.99), ('Gadget', 19.99);
SELECT * FROM products;`}
          language="bash"
        />
      </div>

      <div id="postgres-assignment" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          Mini Assignment
        </h3>
        <p className="text-slate-400 text-sm mb-4">Using the <code className="text-slate-300">products</code> table above (or any sample DB):</p>
        <ul className="text-sm text-slate-400 space-y-2 list-decimal list-inside">
          <li>Write a query that returns the product with the highest price.</li>
          <li>Add a <code className="text-slate-300">category</code> column and update one row.</li>
          <li>Write a query using <code className="text-slate-300">GROUP BY category</code> with <code className="text-slate-300">COUNT</code> and <code className="text-slate-300">AVG(price)</code>.</li>
        </ul>
      </div>
    </section>
  );
}
