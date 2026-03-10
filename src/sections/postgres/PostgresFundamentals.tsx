import CodeBlock, { DiagramBlock, InfoTable } from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

export default function PostgresFundamentals() {
  return (
    <section id="postgres-fundamentals" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-postgres bg-postgres/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 1</span>
        <div className="h-px flex-1 bg-gradient-to-r from-postgres/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">SQL & PostgreSQL Fundamentals</h2>

      <Callout type="info" title="👋 In Plain English">
        <strong>SQL</strong> (Structured Query Language) is the standard way to talk to databases: you ask questions (queries), add or change data, and define tables. <strong>PostgreSQL</strong> is a powerful, open-source database that supports SQL and is used by millions of apps worldwide — from startups to large enterprises. Think of SQL as the language you use to ask a well-organized filing cabinet for exactly the papers you need.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        This part covers what SQL is, why PostgreSQL is a strong choice for both transactional and analytical workloads, how to install it (step-by-step, including Docker), and how to run your first query. Once you finish this, you&apos;ll be ready for SELECT, JOINs, and DDL in the next sections.
      </p>

      {/* What is SQL */}
      <div id="postgres-what-is-sql" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          What is SQL?
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-postgres-light mb-2">Step-by-step: Understanding SQL</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li><strong className="text-slate-300">Declarative:</strong> You describe <em>what</em> you want (e.g. &quot;all users who signed up this month&quot;), and the database figures out <em>how</em> to compute it. The optimizer chooses indexes and execution plans.</li>
            <li><strong className="text-slate-300">Tables & rows:</strong> Data lives in tables (rows and columns). You use statements like SELECT, INSERT, UPDATE, and DELETE to read and modify that data. Schemas define columns, types, and constraints.</li>
            <li><strong className="text-slate-300">Portable:</strong> Core SQL (SELECT, WHERE, JOIN, GROUP BY, etc.) works across PostgreSQL, MySQL, SQL Server, SQLite, and many others. Learning it once pays off everywhere.</li>
          </ul>
        </div>
        <InfoTable
          headers={['Statement', 'Purpose']}
          rows={[
            ['SELECT', 'Read data from tables (queries)'],
            ['INSERT', 'Add new rows'],
            ['UPDATE', 'Change existing rows'],
            ['DELETE', 'Remove rows'],
            ['CREATE TABLE', 'Define a new table and its columns'],
          ]}
        />
      </div>

      {/* Why PostgreSQL */}
      <div id="postgres-why-postgres" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          Why PostgreSQL?
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          PostgreSQL is a robust, feature-rich open-source relational database. It supports full <strong className="text-slate-300">ACID</strong> transactions, so your data stays consistent even under concurrency and failures. It also offers rich data types (JSON/JSONB, arrays, UUID, full-text search, and with PostGIS, geographic data).
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-postgres-light mb-2">Step-by-step: Why choose Postgres?</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li><strong className="text-slate-300">ACID:</strong> Transactions are Atomic (all or nothing), Consistent (rules preserved), Isolated (concurrent transactions don&apos;t see each other&apos;s uncommitted state), and Durable (committed data survives crashes).</li>
            <li><strong className="text-slate-300">Rich types:</strong> JSON/JSONB for documents, arrays, UUID, full-text search, and with PostGIS extension, GIS. You can model complex data without leaving the database.</li>
            <li><strong className="text-slate-300">Open source:</strong> Free to use, with a strong community and permissive license. Runs on your laptop, on-prem servers, or in the cloud (AWS RDS, Azure, GCP, etc.).</li>
          </ul>
        </div>
      </div>

      {/* Installation */}
      <div id="postgres-install" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          Install PostgreSQL
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          You can install PostgreSQL natively from <a href="https://www.postgresql.org/download/" className="text-postgres-light hover:underline" target="_blank" rel="noopener noreferrer">postgresql.org</a> or your package manager. For a quick, isolated setup, running PostgreSQL in <strong className="text-slate-300">Docker</strong> is often the easiest: no system-wide install, and you can tear it down when done.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-5 mb-4">
          <h4 className="text-sm font-bold text-postgres-light mb-2">Step 1 — Run PostgreSQL in Docker</h4>
          <ul className="text-xs text-slate-400 space-y-2 list-decimal list-inside">
            <li>Ensure Docker is installed and running. Open a terminal.</li>
            <li>Run the command in the code block below. <code className="text-slate-300">-d</code> runs the container in the background. <code className="text-slate-300">-e POSTGRES_PASSWORD=postgres</code> sets the password for the default <code className="text-slate-300">postgres</code> user. <code className="text-slate-300">-p 5432:5432</code> exposes port 5432 so you can connect from your machine.</li>
            <li>Wait a few seconds for the container to start. You can run <code className="text-slate-300">docker ps</code> to see the running container named <code className="text-slate-300">pg</code>.</li>
          </ul>
        </div>
        <CodeBlock
          title="Run PostgreSQL in Docker"
          code={`docker run -d --name pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:16`}
          language="bash"
        />
        <p className="text-slate-400 text-sm mt-2">
          To connect: use the <code className="text-slate-300">psql</code> CLI (if installed on your host), or any SQL client (DBeaver, pgAdmin, or a VS Code extension). Host: <code className="text-slate-300">localhost</code>, port: <code className="text-slate-300">5432</code>, user: <code className="text-slate-300">postgres</code>, password: <code className="text-slate-300">postgres</code>.
        </p>
      </div>

      {/* First Query */}
      <div id="postgres-first-query" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-postgres rounded-full" />
          Your First Query
        </h3>
        <Callout type="info" title="Confirm your connection">
          PostgreSQL stores metadata (databases, tables, roles) in system catalogs. The <code className="text-slate-300">pg_database</code> catalog lists all databases. Running a simple query against it confirms that your connection works.
        </Callout>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-postgres-light mb-2">How to run this</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li>If using Docker: run <code className="text-slate-300">docker exec -it pg psql -U postgres</code> to open the <code className="text-slate-300">psql</code> client inside the container. Or connect from your host with any SQL client to <code className="text-slate-300">localhost:5432</code>.</li>
            <li>In <code className="text-slate-300">psql</code> you can use the shortcut <code className="text-slate-300">\l</code> to list databases. The equivalent in raw SQL is in the code block below.</li>
            <li>Paste the SELECT statement and press Enter. You should see a list of database names (e.g. postgres).</li>
          </ul>
        </div>
        <CodeBlock
          title="List databases"
          code={`-- In psql: \\l  or in SQL:
SELECT datname FROM pg_database WHERE datistemplate = false;`}
          language="python"
        />
        <EnhancementBox title="First query — enhancements" items={[
          'Run SELECT version(); to see your PostgreSQL version.',
          'Create a database: CREATE DATABASE mydb; then connect to it (in psql: \\c mydb).',
          'List tables in the current database: \\dt (in psql) or SELECT * FROM information_schema.tables WHERE table_schema = \'public\';',
        ]} />
      </div>
    </section>
  );
}
