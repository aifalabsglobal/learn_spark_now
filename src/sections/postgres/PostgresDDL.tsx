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
        <strong>DDL</strong> (Data Definition Language) is how you create and change the structure of your data: tables, columns, indexes, and rules (constraints) so the database keeps data valid.
      </Callout>

      <div id="postgres-create-table" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          CREATE TABLE
        </h3>
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
            <li><code className="text-slate-300">BIGSERIAL</code> — auto-incrementing integer</li>
            <li><code className="text-slate-300">PRIMARY KEY</code> — unique identifier</li>
            <li><code className="text-slate-300">REFERENCES</code> — foreign key to another table</li>
            <li><code className="text-slate-300">CHECK</code> — condition on column values</li>
          </ul>
        </div>
      </div>

      <div id="postgres-indexes" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          Indexes
        </h3>
        <p className="text-slate-400 text-sm mb-4">Indexes speed up <code className="text-slate-300">WHERE</code>, <code className="text-slate-300">JOIN</code>, and <code className="text-slate-300">ORDER BY</code>. Create them on columns you filter or sort by often.</p>
        <CodeBlock
          title="Create indexes"
          code={`CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE UNIQUE INDEX idx_users_email ON users(email);`}
          language="bash"
        />
        <p className="text-slate-400 text-sm mt-2">Primary keys and UNIQUE constraints get indexes automatically.</p>
      </div>

      <div id="postgres-alter" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          ALTER TABLE
        </h3>
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
