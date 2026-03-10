import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function DockerNetworkingVolumes() {
  return (
    <section id="docker-networking-volumes" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-docker bg-docker/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 5</span>
        <div className="h-px flex-1 bg-gradient-to-r from-docker/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Networking & Volumes</h2>

      <Callout type="info" title="In Plain English">
        Containers on the same <strong>network</strong> can talk by service name. Use <strong>volumes</strong> to persist data so it survives container restarts; use bind mounts in dev for live code sync.
      </Callout>

      <div id="docker-networking" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Docker Networking
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          By default Docker creates a <strong className="text-slate-300">bridge</strong> network. Containers on the same network can reach each other by <strong className="text-slate-300">service name</strong> (e.g. <code className="text-slate-300">redis</code>, <code className="text-slate-300">db</code>). Use <code className="text-slate-300">-p host:container</code> to expose ports to the host.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-docker-light mb-2">bridge (default)</h4>
            <p className="text-xs text-slate-400">Containers get IPs on a private network; port mapping for external access.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-docker-light mb-2">host</h4>
            <p className="text-xs text-slate-400">Container shares host network stack — no isolation, maximum performance.</p>
          </div>
        </div>
        <CodeBlock title="Create and use a custom network" code={`docker network create mynet\ndocker run -d --network mynet --name api my-api\ndocker run -d --network mynet --name worker my-worker`} language="bash" />
      </div>

      <div id="docker-volumes" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Volumes & Persistence
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Container filesystem is <strong className="text-slate-300">ephemeral</strong>. To persist data (databases, uploads), use <strong className="text-slate-300">volumes</strong> or <strong className="text-slate-300">bind mounts</strong>.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-docker-light mb-2">Named volume (recommended)</h4>
          <pre className="text-xs text-slate-400 font-mono">docker run -v mydata:/var/lib/mysql mysql</pre>
          <p className="text-xs text-slate-500 mt-1">Docker manages storage; survives <code>docker rm</code>.</p>
        </div>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
          <h4 className="text-sm font-bold text-docker-light mb-2">Bind mount (dev)</h4>
          <pre className="text-xs text-slate-400 font-mono">docker run -v $(pwd)/src:/app/src my-app</pre>
          <p className="text-xs text-slate-500 mt-1">Host directory mounted into container; live code reload.</p>
        </div>
</div>
    </section>
  );
}
