import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function DockerCompose() {
  return (
    <section id="docker-compose" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-docker bg-docker/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 4</span>
        <div className="h-px flex-1 bg-gradient-to-r from-docker/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Docker Compose</h2>

      <Callout type="info" title="👋 In Plain English">
        Compose lets you define and run <strong>multi-container</strong> apps in one file. Instead of multiple <code>docker run</code> commands, you describe services (app, database, cache) in <code>docker-compose.yml</code> and start everything with <code>docker compose up</code>.
      </Callout>

      <div id="docker-compose-basics" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Compose File Basics
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Define <strong className="text-slate-300">services</strong>, <strong className="text-slate-300">networks</strong>, and <strong className="text-slate-300">volumes</strong>. Services can depend on each other with <code className="text-slate-300">depends_on</code>.
        </p>
        <CodeBlock
          title="docker-compose.yml — web + Redis"
          code={`services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      REDIS_URL: redis://redis:6379
    depends_on:
      - redis

  redis:
    image: redis:alpine
    volumes:
      - redis_data:/data

volumes:
  redis_data:`}
          language="yaml"
        />
      </div>

      <div id="docker-compose-commands" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Compose Commands
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
          <ul className="text-sm text-slate-400 space-y-2">
            <li><code className="text-docker-light">docker compose up -d</code> — Start all services in background</li>
            <li><code className="text-docker-light">docker compose down</code> — Stop and remove containers (and optionally volumes)</li>
            <li><code className="text-docker-light">docker compose logs -f web</code> — Follow logs for service <code>web</code></li>
            <li><code className="text-docker-light">docker compose ps</code> — List services and status</li>
          </ul>
        </div>
      </div>

      <div id="docker-compose-assignment" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Assignment — Three-Tier App
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Create a <code className="text-slate-300">docker-compose.yml</code> with: a <strong className="text-slate-300">web</strong> app (e.g. Node or Python), a <strong className="text-slate-300">database</strong> (PostgreSQL or MySQL), and a <strong className="text-slate-300">cache</strong> (Redis). Use <code>depends_on</code> and a custom network. Run and verify all three services.
        </p>
      </div>
    </section>
  );
}
