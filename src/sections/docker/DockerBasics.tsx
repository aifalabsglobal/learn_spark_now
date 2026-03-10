import { DiagramBlock } from '../../components/CodeBlock';
import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

export default function DockerBasics() {
  return (
    <section id="docker-basics" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-docker bg-docker/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 2</span>
        <div className="h-px flex-1 bg-gradient-to-r from-docker/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Images, Containers & Dockerfile</h2>

      <Callout type="info" title="👋 In Plain English">
        An <strong>image</strong> is a read-only template built in layers (base OS, runtime, your app). A <strong>container</strong> is a running instance of that image. You can run many containers from the same image. A <strong>Dockerfile</strong> is the recipe that builds the image.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        This section clarifies the difference between images and containers, shows how to write a Dockerfile (FROM, COPY, RUN, CMD), and lists the essential Docker commands you’ll use daily: build, run, ps, images, stop, rm.
      </p>

      <div id="docker-images-containers" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Images vs Containers
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          An <strong className="text-slate-300">image</strong> is built from layers: typically a base OS (e.g. Alpine, Ubuntu), then runtime and dependencies, then your code. Images are immutable; you don’t edit them — you build a new version. A <strong className="text-slate-300">container</strong> is a running instance of an image: it has a writable layer on top of the image (for any changes at runtime) and an isolated process space. You can start many containers from the same image; each has its own state and lifecycle.
        </p>
        <DiagramBlock title="Image → Container">
{`Image (nginx:alpine)
  ├── Layer 3: your config
  ├── Layer 2: nginx app
  └── Layer 1: Alpine Linux

docker run nginx:alpine  →  Container A (running)
docker run nginx:alpine  →  Container B (running)`}
        </DiagramBlock>
      </div>

      <div id="docker-dockerfile" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Writing a Dockerfile
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          A Dockerfile is a text file of instructions. Key ones: <code className="text-slate-300">FROM</code> (base image — always first), <code className="text-slate-300">WORKDIR</code> (working directory inside the container), <code className="text-slate-300">COPY</code> or <code className="text-slate-300">ADD</code> (copy files from host), <code className="text-slate-300">RUN</code> (run a command during build, e.g. install packages), <code className="text-slate-300">EXPOSE</code> (document which port the app uses), and <code className="text-slate-300">CMD</code> or <code className="text-slate-300">ENTRYPOINT</code> (default command when the container starts). Order matters: put rarely changing steps first so layer cache is reused.
        </p>
        <CodeBlock
          title="Example: Python app Dockerfile"
          code={`FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "app.py"]`}
          language="bash"
        />
      </div>

      <div id="docker-commands" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Essential Commands
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Build images from a Dockerfile in the current directory; run containers from an image with optional port mapping (<code className="text-slate-300">-p host:container</code>) and detached mode (<code className="text-slate-300">-d</code>). Use <code className="text-slate-300">docker ps</code> to see running containers and <code className="text-slate-300">docker images</code> to list images. Stop and remove containers when done to free resources.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 overflow-x-auto">
          <table className="spark-table w-full text-sm">
            <thead>
              <tr>
                <th>Command</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>docker build -t myapp .</code></td><td>Build image from Dockerfile in current dir; tag as <code>myapp</code></td></tr>
              <tr><td><code>docker run -d -p 8080:80 nginx</code></td><td>Run container in background; map host 8080 to container 80</td></tr>
              <tr><td><code>docker ps</code></td><td>List running containers (use <code>-a</code> for all)</td></tr>
              <tr><td><code>docker images</code></td><td>List images</td></tr>
              <tr><td><code>docker stop &lt;id&gt;</code></td><td>Stop a container gracefully</td></tr>
              <tr><td><code>docker rm &lt;id&gt;</code></td><td>Remove a stopped container</td></tr>
            </tbody>
          </table>
        </div>
        <EnhancementBox title="Docker basics — enhancements" items={[
          'Write a minimal Dockerfile (FROM alpine, CMD echo hello) and build and run it.',
          'Run nginx with -p 8080:80 and open localhost:8080 in a browser; then docker stop and docker rm.',
          'Use docker images and docker rmi to remove an unused image; try docker system prune -a (careful).',
        ]} />
      </div>
    </section>
  );
}
