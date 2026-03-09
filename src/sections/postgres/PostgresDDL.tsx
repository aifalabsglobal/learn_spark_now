import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function PostgresDDL() {
  return (
    <section id="postgres-ddl" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-postgres bg-postgres/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 3</span>
        <div className="h-px flex-1 bg-gradient-to-r from-postgres/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">DDL: Tables, Indexes, Constraints</h2>

      <Callout type="info" title="👋 In Plain English">
        <strong>DDL</strong> (Data Definition Language) is how you create and change the structure of your data: tables, columns, indexes, and rules (constraints) so the database keeps data valid and queries fast.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Before you can INSERT or SELECT, you need tables. DDL defines those tables (columns, types, defaults), enforces rules with constraints (primary key, unique, foreign key, check), and adds indexes to speed up filters and joins. This section covers CREATE TABLE, indexes, and ALTER TABLE with enough detail to design a small schema.
      </p>

      <div id="postgres-create-table" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          CREATE TABLE
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Use <code className="text-slate-300">CREATE TABLE</code> to define a new table: name, columns with data types, and optional constraints. <code className="text-slate-300">BIGSERIAL</code> is an auto-incrementing 64-bit integer (PostgreSQL creates a sequence behind the scenes). <code className="text-slate-300">PRIMARY KEY</code> enforces uniqueness and creates an index; <code className="text-slate-300">REFERENCES</code> adds a foreign key so <code className="text-slate-300">orders.user_id</code> must exist in <code className="text-slate-300">users.id</code>. <code className="text-slate-300">CHECK</code> ensures values satisfy a condition (e.g. non-negative amount).
        </p>
        <CodeBlock
          title="Example table with constraints"
          code={`CREATE TABLE users (
  id         BIGSERIAL PRIMARY KEY,
  email      VARCHAR(255) NOT NULL UNIQUE,
  name       VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orders (
  id        BIGSERIAL PRIMARY KEY,
  user_id   BIGINT NOT NULL REFERENCES users(id),
  amount    NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
  status    VARCHAR(20) DEFAULT 'pending'
);`}
          language="bash"
        />
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mt-4">
          <ul className="text-xs text-slate-400 space-y-1">
            <li><code className="text-slate-300">BIGSERIAL</code> — Auto-incrementing integer; use SERIAL for 32-bit. The sequence is created automatically.</li>
            <li><code className="text-slate-300">PRIMARY KEY</code> — Unique identifier for the row; implies UNIQUE and NOT NULL and creates an index.</li>
            <li><code className="text-slate-300">REFERENCES</code> — Foreign key: values in this column must exist in the referenced table and column. Ensures referential integrity.</li>
            <li><code className="text-slate-300">CHECK</code> — Boolean expression that every row must satisfy. Use for domain rules (e.g. amount &gt;= 0, status in a list).</li>
          </ul>
        </div>
      </div>

      <div id="postgres-indexes" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          Indexes
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Indexes speed up <code className="text-slate-300">WHERE</code>, <code className="text-slate-300">JOIN</code>, and <code className="text-slate-300">ORDER BY</code> by allowing the database to find or sort rows without scanning the whole table. Create indexes on columns you filter or join on often. Primary key and UNIQUE constraints get indexes automatically; add more for foreign keys and frequently filtered or sorted columns. Too many indexes slow down writes (every INSERT/UPDATE must update indexes), so add them based on real query patterns.
        </p>
        <CodeBlock
          title="Create indexes"
          code={`CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE UNIQUE INDEX idx_users_email ON users(email);`}
          language="bash"
        />
        <p className="text-slate-400 text-sm mt-2">Primary keys and UNIQUE constraints already create indexes; the unique index on <code className="text-slate-300">email</code> is redundant if you have <code className="text-slate-300">UNIQUE</code> on that column — it’s shown here as an example of <code className="text-slate-300">CREATE UNIQUE INDEX</code>.</p>
      </div>

      <div id="postgres-alter" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          ALTER TABLE
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Use <code className="text-slate-300">ALTER TABLE</code> to add or drop columns, add or drop constraints, or change column types (when safe). Adding a nullable column is cheap; adding a NOT NULL column with a default may rewrite the table depending on the PostgreSQL version. The example adds a <code className="text-slate-300">phone</code> column and a CHECK constraint that validates email format with a regex.
        </p>
        <CodeBlock
          title="Add column, add constraint"
          code={`ALTER TABLE users ADD COLUMN phone VARCHAR(20);
ALTER TABLE users ADD CONSTRAINT chk_email_format
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z]{2,}$');`}
          language="bash"
        />
      </div>
    </section>
  );
}
