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

      <p className="text-slate-400 text-sm mb-6">
        Containers are not virtual machines: they share the host kernel and start in seconds. Docker provides the tooling to build images (from a Dockerfile), run containers, and share images via registries. This section explains why Docker exists, the core concepts, and how they fit together.
      </p>

      <div id="docker-why-exists" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Why Docker Exists
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Without containers, teams often face environment drift (dev vs staging vs prod), dependency conflicts when multiple apps share a server, and slow onboarding as new developers install and configure tools by hand. Docker addresses these by packaging the app and its runtime into a single, reproducible unit — the image — that runs identically anywhere.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-docker-light mb-2">Step-by-step: Why Docker exists</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li><strong className="text-slate-300">Environment drift</strong> — &quot;Works on my machine&quot; because dev and prod have different OS versions, libraries, or config. Debugging becomes a game of guessing differences.</li>
            <li><strong className="text-slate-300">Dependency conflicts</strong> — Different apps need different library versions on the same server. Installing one can break another.</li>
            <li><strong className="text-slate-300">Slow onboarding</strong> — New developers spend hours (or days) installing runtimes, databases, and tools. With Docker, one <code className="text-slate-300">docker compose up</code> can bring the whole stack up.</li>
          </ul>
        </div>

        <DiagramBlock title="Containers vs Virtual Machines">
{`VMs: App → Guest OS → Hypervisor → Host OS → Hardware
(heavy: full OS per VM)

Containers: App → Container runtime (Docker) → Host OS → Hardware
(lightweight: shared kernel, isolated processes)`}
        </DiagramBlock>

        <p className="text-slate-400 text-sm mt-4">
          <strong className="text-slate-300">Benefits:</strong> Consistent environments from dev to prod; fast startup (containers start in seconds); easy scaling (run more copies of the same image); portability across clouds and on-prem. You build once and run anywhere Docker is installed.
        </p>
      </div>

      <div id="docker-core-concepts" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Core Concepts
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Four ideas are enough to get started: <strong className="text-slate-300">image</strong>, <strong className="text-slate-300">container</strong>, <strong className="text-slate-300">Dockerfile</strong>, and <strong className="text-slate-300">registry</strong>. Everything else (networks, volumes, Compose) builds on these.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-docker-light mb-2">Image</h4>
            <p className="text-xs text-slate-400">A read-only template: base OS layer plus your app and dependencies. Built from a Dockerfile or pulled from a registry (e.g. Docker Hub). You can version and reuse images; multiple containers can run from the same image.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-docker-light mb-2">Container</h4>
            <p className="text-xs text-slate-400">A running instance of an image. It has its own filesystem, network namespace, and (optionally) resource limits. When the process inside exits, the container stops; the image remains for reuse.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-docker-light mb-2">Dockerfile</h4>
            <p className="text-xs text-slate-400">A text file with instructions (FROM, RUN, COPY, CMD, etc.) that Docker uses to build an image. Think of it as a recipe: start from a base image, add layers, and define the default command to run.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-docker-light mb-2">Registry</h4>
            <p className="text-xs text-slate-400">Storage and distribution for images. Docker Hub is the default public registry; organizations use private registries (AWS ECR, Google GCR, Azure ACR, or self-hosted Harbor) for proprietary images.</p>
          </div>
        </div>
      </div>

      <div id="docker-use-cases" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Assignment 1 — Use Case Analysis
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          For each scenario below, explain how Docker helps: what you’d containerize, how it improves consistency or scaling, and what the workflow looks like. Deliverable: a <strong className="text-slate-300">short write-up or diagram</strong> for at least two scenarios.
        </p>
        <ul className="text-sm text-slate-400 space-y-2 list-decimal list-inside">
          <li><strong className="text-slate-300">Microservices deployment (10+ services)</strong> — Each service is an image; orchestration (e.g. Kubernetes) runs and scales containers. Same image from CI runs in every environment.</li>
          <li><strong className="text-slate-300">CI/CD pipelines (build once, run anywhere)</strong> — Build the image once in CI; push to a registry; deploy by pulling and running that image in staging and prod. No recompiling per environment.</li>
          <li><strong className="text-slate-300">Local development (matching production)</strong> — Developers run the same stack (app, DB, cache) via Docker Compose. No “works on my machine” — everyone runs the same containers.</li>
          <li><strong className="text-slate-300">Legacy app isolation on a shared server</strong> — Run an old app in a container with its specific runtime and dependencies, without affecting other apps on the same host.</li>
        </ul>
</div>
    </section>
  );
}
