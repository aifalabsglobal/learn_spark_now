export default function DockerAssignments() {
  const labs = [
    { week: 1, title: 'Use Case Analysis', desc: 'Document Docker benefits for microservices, CI/CD, and local dev.' },
    { week: 2, title: 'Dockerfile Lab', desc: 'Build a Dockerfile for a small app (Python/Node). Use multi-stage build.' },
    { week: 3, title: 'First Container', desc: 'Run Nginx and a custom app; practice docker run, logs, exec.' },
    { week: 4, title: 'Compose Stack', desc: 'Three-tier app: web + DB + Redis with docker-compose.yml.' },
    { week: 5, title: 'Networking', desc: 'Custom network; two containers talking via service name.' },
    { week: 6, title: 'Production-Ready Image', desc: 'Multi-stage build, non-root user, HEALTHCHECK, .dockerignore.' },
  ];

  return (
    <section id="docker-assignments" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-docker bg-docker/10 px-3 py-1 rounded-full uppercase tracking-wider">Labs</span>
        <div className="h-px flex-1 bg-gradient-to-r from-docker/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-6">Docker Course Assignments</h2>
      <div className="space-y-4">
        {labs.map((a) => (
          <div
            key={a.week}
            className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:border-docker/30 transition-colors"
          >
            <span className="text-xs font-bold text-docker bg-docker/10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">W{a.week}</span>
            <div>
              <h4 className="text-sm font-bold text-white">{a.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
