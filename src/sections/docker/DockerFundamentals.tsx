import { DiagramBlock } from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function DockerFundamentals() {
  return (
    <section id="docker-fundamentals" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-docker bg-docker/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 1</span>
        <div className="h-px flex-1 bg-gradient-to-r from-docker/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Docker Fundamentals</h2>

      <Callout type="info" title="👋 In Plain English">
        Docker lets you package an application and everything it needs (code, runtime, libraries) into a <strong>container</strong> — a lightweight, portable box that runs the same way on your laptop, a server, or the cloud. &quot;It works on my machine&quot; becomes &quot;it works everywhere.&quot;
      </Callout>

      <div id="docker-why-exists" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Why Docker Exists
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-docker-light mb-2">Without containers (problems)</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li><strong className="text-slate-300">Environment drift</strong> — &quot;Works on my machine&quot; because dev and prod differ.</li>
            <li><strong className="text-slate-300">Dependency conflicts</strong> — Different apps need different library versions on the same server.</li>
            <li><strong className="text-slate-300">Slow onboarding</strong> — New devs spend hours installing and configuring tools.</li>
          </ul>
        </div>

        <DiagramBlock title="Containers vs Virtual Machines">
{`VMs: App → Guest OS → Hypervisor → Host OS → Hardware
(heavy: full OS per VM)

Containers: App → Container runtime (Docker) → Host OS → Hardware
(lightweight: shared kernel, isolated processes)`}
        </DiagramBlock>

        <p className="text-slate-400 text-sm mt-4">
          <strong className="text-slate-300">Benefits:</strong> consistent environments, fast startup, easy scaling, and portability across clouds and on-prem.
        </p>
      </div>

      <div id="docker-core-concepts" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Core Concepts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-docker-light mb-2">Image</h4>
            <p className="text-xs text-slate-400">A read-only template: OS layer + app + dependencies. Built from a Dockerfile or pulled from a registry (Docker Hub).</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-docker-light mb-2">Container</h4>
            <p className="text-xs text-slate-400">A running instance of an image. Isolated process(es) with their own filesystem, network, and resource limits.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-docker-light mb-2">Dockerfile</h4>
            <p className="text-xs text-slate-400">A text file with instructions (FROM, RUN, COPY, CMD) to build an image. Like a recipe for your app.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-docker-light mb-2">Registry</h4>
            <p className="text-xs text-slate-400">Storage for images. Docker Hub is the default public registry; you can use private registries (ECR, GCR, Harbor).</p>
          </div>
        </div>
      </div>

      <div id="docker-use-cases" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Assignment 1 — Use Case Analysis
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Explain how Docker helps in these scenarios. Deliverable: <strong className="text-slate-300">short write-up or diagram</strong>.
        </p>
        <ul className="text-sm text-slate-400 space-y-2 list-decimal list-inside">
          <li>Microservices deployment (10+ services)</li>
          <li>CI/CD pipelines (build once, run anywhere)</li>
          <li>Local development (matching production)</li>
          <li>Legacy app isolation on a shared server</li>
        </ul>
      </div>
    </section>
  );
}
