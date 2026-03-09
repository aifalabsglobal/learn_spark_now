import { DiagramBlock } from '../../components/CodeBlock';
import CodeBlock from '../../components/CodeBlock';

export default function DockerBasics() {
  return (
    <section id="docker-basics" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-docker bg-docker/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 2</span>
        <div className="h-px flex-1 bg-gradient-to-r from-docker/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Images, Containers & Dockerfile</h2>

      <div id="docker-images-containers" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Images vs Containers
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          An <strong className="text-slate-300">image</strong> is built from layers (base OS, installs, your code). A <strong className="text-slate-300">container</strong> is a running instance; you can start many containers from the same image.
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
          Key instructions: <code className="text-slate-300">FROM</code> (base image), <code className="text-slate-300">WORKDIR</code>, <code className="text-slate-300">COPY</code>/<code className="text-slate-300">ADD</code>, <code className="text-slate-300">RUN</code>, <code className="text-slate-300">EXPOSE</code>, <code className="text-slate-300">CMD</code> or <code className="text-slate-300">ENTRYPOINT</code>.
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
          language="dockerfile"
        />
      </div>

      <div id="docker-commands" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Essential Commands
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 overflow-x-auto">
          <table className="spark-table w-full text-sm">
            <thead>
              <tr>
                <th>Command</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>docker build -t myapp .</code></td><td>Build image from Dockerfile</td></tr>
              <tr><td><code>docker run -d -p 8080:80 nginx</code></td><td>Run container (detached, port map)</td></tr>
              <tr><td><code>docker ps</code></td><td>List running containers</td></tr>
              <tr><td><code>docker images</code></td><td>List images</td></tr>
              <tr><td><code>docker stop &lt;id&gt;</code></td><td>Stop a container</td></tr>
              <tr><td><code>docker rm &lt;id&gt;</code></td><td>Remove container</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
