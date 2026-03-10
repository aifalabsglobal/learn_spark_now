import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

export default function DockerHandsOn() {
  return (
    <section id="docker-handson" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-docker bg-docker/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 3</span>
        <div className="h-px flex-1 bg-gradient-to-r from-docker/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Hands-on: Install & Run</h2>

      <Callout type="info" title="👋 In Plain English">
        You’ll install Docker, run a pre-built image (e.g. Nginx), build your own image from a Dockerfile, and use basic commands to inspect containers and view logs. This gives you a repeatable dev and run environment.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Follow the steps in order: install Docker and confirm it works with <code className="text-slate-300">hello-world</code>, run a real service (Nginx) with port mapping, then build a custom image from a Dockerfile and run it. Finish by inspecting running containers, viewing logs, and (optionally) opening a shell inside a container.
      </p>

      <div id="docker-install" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Step 1 — Install Docker
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Install <strong className="text-slate-300">Docker Desktop</strong> (Windows/Mac) or <strong className="text-slate-300">Docker Engine</strong> (Linux). Then verify:
        </p>
        <CodeBlock title="Verify installation" code="docker --version\ndocker run hello-world" language="bash" />
      </div>

      <div id="docker-run-first" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Step 2 — Run Your First Container
        </h3>
        <CodeBlock
          title="Run Nginx (detached, port 8080 → 80)"
          code="docker run -d --name my-nginx -p 8080:80 nginx:alpine"
          language="bash"
        />
        <p className="text-slate-400 text-sm mt-4">
          Open <code className="text-slate-300">http://localhost:8080</code> — you should see the Nginx welcome page.
        </p>
      </div>

      <div id="docker-build-image" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Step 3 — Build Your Own Image
        </h3>
        <p className="text-slate-400 text-sm mb-4">Create a folder with a simple app and Dockerfile:</p>
        <CodeBlock
          title="Dockerfile"
          code={`FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]`}
          language="dockerfile"
        />
        <CodeBlock title="Build and run" code="docker build -t my-node-app .\ndocker run -d -p 3000:3000 my-node-app" language="bash" />
      </div>

      <div id="docker-logs-inspect" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-docker rounded-full" />
          Step 4 — Inspect & Logs
        </h3>
        <CodeBlock
          title="Useful commands"
          code={`docker ps -a          # All containers (including stopped)
docker logs <container>  # View logs
docker exec -it <id> sh  # Shell into running container
docker system df        # Disk usage`}
          language="bash"
        />
        <EnhancementBox title="Hands-on — enhancements" items={[
          'Install Docker (Desktop or Engine), run docker run hello-world and docker ps -a.',
          'Build the sample Dockerfile in the section; run the container and verify the output.',
          'Use docker exec -it <container> sh to shell into a running container and list files.',
        ]} />
      </div>
    </section>
  );
}
