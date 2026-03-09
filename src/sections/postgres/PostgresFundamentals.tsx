import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function PostgresFundamentals() {
  return (
    <section id="postgres-fundamentals" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-postgres bg-postgres/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 1</span>
        <div className="h-px flex-1 bg-gradient-to-r from-postgres/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">SQL & PostgreSQL Fundamentals</h2>

      <Callout type="info" title="👋 In Plain English">
        <strong>SQL</strong> (Structured Query Language) is the standard way to talk to databases: you ask questions (queries), add or change data, and define tables. <strong>PostgreSQL</strong> is a powerful, open-source database that supports SQL and is used by millions of apps worldwide — from startups to large enterprises.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        This part covers what SQL is, why PostgreSQL is a strong choice for both transactional and analytical workloads, how to install it (including Docker), and how to run your first query. Once you finish this, you’ll be ready for SELECT, JOINs, and DDL in the next sections.
      </p>

      <div id="postgres-what-is-sql" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          What is SQL?
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          SQL is a <strong className="text-slate-300">declarative</strong> language: you describe <em>what</em> you want (e.g. “all users who signed up this month”), and the database figures out <em>how</em> to compute it. Data is organized in <strong className="text-slate-300">tables</strong> (rows and columns); you use statements like SELECT, INSERT, UPDATE, and DELETE to read and modify that data. SQL is <strong className="text-slate-300">portable</strong> — core syntax works across PostgreSQL, MySQL, SQL Server, SQLite, and many others, so learning it once pays off everywhere.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li><strong className="text-slate-300">Declarative</strong> — You specify the result set (e.g. “rows where status = ’active’”), not the algorithm. The optimizer chooses indexes and execution plans.</li>
            <li><strong className="text-slate-300">Tables & rows</strong> — Data lives in tables; you SELECT, INSERT, UPDATE, DELETE rows. Schemas define columns, types, and constraints.</li>
            <li><strong className="text-slate-300">Portable</strong> — Core SQL (SELECT, WHERE, JOIN, GROUP BY, etc.) is standardized; dialect differences exist but the ideas transfer.</li>
          </ul>
        </div>
      </div>

      <div id="postgres-why-postgres" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          Why PostgreSQL?
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          PostgreSQL is a robust, feature-rich open-source relational database. It supports full <strong className="text-slate-300">ACID</strong> transactions, so your data stays consistent even under concurrency and failures. It also offers rich data types (JSON/JSONB, arrays, UUID, full-text search, and with PostGIS, geographic data), making it suitable for both classic CRUD apps and modern workloads that mix structured and semi-structured data.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li><strong className="text-slate-300">ACID</strong> — Transactions are Atomic (all or nothing), Consistent (rules preserved), Isolated (concurrent transactions don’t see each other’s uncommitted state), and Durable (committed data survives crashes).</li>
            <li><strong className="text-slate-300">Rich types</strong> — JSON/JSONB for documents, arrays, UUID, full-text search, and with PostGIS extension, GIS. You can model complex data without leaving the database.</li>
            <li><strong className="text-slate-300">Open source</strong> — Free to use, with a strong community and permissive license. Runs on your laptop, on-prem servers, or in the cloud (AWS RDS, Azure, GCP, etc.).</li>
          </ul>
        </div>
      </div>

      <div id="postgres-install" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          Install PostgreSQL
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          You can install PostgreSQL natively from <a href="https://www.postgresql.org/download/" className="text-postgres-light hover:underline">postgresql.org</a> or your package manager (e.g. <code className="text-slate-300">apt install postgresql</code> on Ubuntu, Homebrew on macOS). For a quick, isolated setup, running PostgreSQL in <strong className="text-slate-300">Docker</strong> is often the easiest: no system-wide install, and you can tear it down when done.
        </p>
        <CodeBlock
          title="Run PostgreSQL in Docker"
          code={`docker run -d --name pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:16`}
          language="bash"
        />
        <p className="text-slate-400 text-sm mt-2">
          <code className="text-slate-300">-d</code> runs the container in the background. <code className="text-slate-300">-e POSTGRES_PASSWORD=postgres</code> sets the password for the default <code className="text-slate-300">postgres</code> user. <code className="text-slate-300">-p 5432:5432</code> exposes port 5432 so you can connect from your machine. After the container starts, connect with the <code className="text-slate-300">psql</code> CLI (if installed) or any SQL client (DBeaver, pgAdmin, or a VS Code extension).
        </p>
      </div>

      <div id="postgres-first-query" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          Your First Query
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          PostgreSQL stores metadata (databases, tables, roles) in system catalogs. The <code className="text-slate-300">pg_database</code> catalog lists all databases. In the <code className="text-slate-300">psql</code> client you can use the shortcut <code className="text-slate-300">\l</code> to list databases; the equivalent in raw SQL is below. Run it to confirm your connection works.
        </p>
        <CodeBlock
          title="List databases"
          code={`-- In psql: \\l  or in SQL:
SELECT datname FROM pg_database WHERE datistemplate = false;`}
          language="bash"
        />
      </div>
    </section>
  );
}
