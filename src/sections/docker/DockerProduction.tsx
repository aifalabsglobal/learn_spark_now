import Callout from '../../components/Callout';

export default function DockerProduction() {
  return (
    <section id="docker-production" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-docker bg-docker/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 6</span>
        <div className="h-px flex-1 bg-gradient-to-r from-docker/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Production & Best Practices</h2>

      <Callout type="tip" title="Production checklist">
        Use specific image tags (not <code>latest</code>), run as non-root, scan images for vulnerabilities, limit memory/CPU, and use secrets management (e.g. Docker secrets, env files not in repo).
      </Callout>

      <div id="docker-best-practices" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Best Practices
        </h3>
        <ul className="text-sm text-slate-400 space-y-2">
          <li><strong className="text-slate-300">Multi-stage builds</strong> — Build in one stage, copy only the artifact to a slim final image (smaller, fewer CVEs).</li>
          <li><strong className="text-slate-300">.dockerignore</strong> — Exclude <code>node_modules</code>, <code>.git</code>, and local env files to speed builds and reduce image size.</li>
          <li><strong className="text-slate-300">One process per container</strong> — Keeps containers easy to scale and debug.</li>
          <li><strong className="text-slate-300">Health checks</strong> — Use <code>HEALTHCHECK</code> in Dockerfile or <code>healthcheck</code> in Compose so orchestrators know when the app is ready.</li>
        </ul>
      </div>

      <div id="docker-orchestration" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Beyond Docker: Orchestration
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          For production at scale, you typically run containers on <strong className="text-slate-300">Kubernetes</strong>, <strong className="text-slate-300">ECS</strong>, or <strong className="text-slate-300">Swarm</strong>. They handle scheduling, scaling, rolling updates, and self-healing. Docker and Compose are the foundation; orchestration is the next step.
        </p>
      </div>
    </section>
  );
}
