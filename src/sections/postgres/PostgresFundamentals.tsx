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
        <strong>SQL</strong> (Structured Query Language) is the standard way to talk to databases: ask questions (queries), add or change data, and define tables. <strong>PostgreSQL</strong> is a powerful, open-source database that supports SQL and is used by millions of apps worldwide.
      </Callout>

      <div id="postgres-what-is-sql" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          What is SQL?
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li><strong className="text-slate-300">Declarative</strong> — you describe <em>what</em> you want (e.g. “all users who signed up this month”), not how to compute it.</li>
            <li><strong className="text-slate-300">Tables & rows</strong> — data lives in tables; you SELECT, INSERT, UPDATE, DELETE rows.</li>
            <li><strong className="text-slate-300">Portable</strong> — core SQL works across PostgreSQL, MySQL, SQL Server, SQLite, and more.</li>
          </ul>
        </div>
      </div>

      <div id="postgres-why-postgres" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          Why PostgreSQL?
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li><strong className="text-slate-300">ACID</strong> — transactions are reliable (Atomicity, Consistency, Isolation, Durability).</li>
            <li><strong className="text-slate-300">Rich types</strong> — JSON/JSONB, arrays, UUID, full-text search, GIS (PostGIS).</li>
            <li><strong className="text-slate-300">Open source</strong> — free, community-driven, runs everywhere (local, cloud, Docker).</li>
          </ul>
        </div>
      </div>

      <div id="postgres-install" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          Install PostgreSQL
        </h3>
        <p className="text-slate-400 text-sm mb-4">Download from <a href="https://www.postgresql.org/download/" className="text-postgres-light hover:underline">postgresql.org</a> or use a package manager. Docker option:</p>
        <CodeBlock
          title="Run PostgreSQL in Docker"
          code={`docker run -d --name pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:16`}
          language="bash"
        />
        <p className="text-slate-400 text-sm mt-2">Then connect with the <code className="text-slate-300">psql</code> CLI or any SQL client (DBeaver, pgAdmin, VS Code extension).</p>
      </div>

      <div id="postgres-first-query" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          Your First Query
        </h3>
        <p className="text-slate-400 text-sm mb-4">PostgreSQL comes with a few built-in catalogs. Try this in <code className="text-slate-300">psql</code>:</p>
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
