import CodeBlock from '../../components/CodeBlock';

export default function GitRemote() {
  return (
    <section id="git-remote" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-git bg-git/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 3</span>
        <div className="h-px flex-1 bg-gradient-to-r from-git/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Remote &amp; Collaboration</h2>

      <div id="git-remote-basics" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          Add a Remote
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          A <strong className="text-slate-300">remote</strong> is a copy of the repo on a server (e.g. GitHub, GitLab). You push your commits and pull others&apos; changes.
        </p>
        <CodeBlock
          title="Clone or add remote"
          code={`# Clone an existing repo (creates origin by default)
git clone https://github.com/user/repo.git
cd repo

# Or add remote to an existing local repo
git remote add origin https://github.com/user/repo.git
git push -u origin main`}
          language="bash"
        />
      </div>

      <div id="git-push-pull" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          Push, Pull, Fetch
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <ul className="text-xs text-slate-400 space-y-2">
            <li><code className="text-slate-300">git push origin main</code> — send your commits to the remote</li>
            <li><code className="text-slate-300">git pull origin main</code> — fetch and merge remote changes (fetch + merge)</li>
            <li><code className="text-slate-300">git fetch origin</code> — download remote updates without merging</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
