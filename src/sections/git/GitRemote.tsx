import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function GitRemote() {
  return (
    <section id="git-remote" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-git bg-git/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 3</span>
        <div className="h-px flex-1 bg-gradient-to-r from-git/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Remote &amp; Collaboration</h2>

      <Callout type="info" title="👋 In Plain English">
        A <strong>remote</strong> is a reference to another copy of your repo, usually on a server (GitHub, GitLab, etc.). You <strong>push</strong> your commits to the remote and <strong>pull</strong> (or <strong>fetch</strong>) others&apos; changes so everyone stays in sync.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Git is distributed: your local repo is full and can work offline. To collaborate, you add a remote (often named <code className="text-slate-300">origin</code>) that points to the shared repo. <code className="text-slate-300">git push</code> uploads your branches and commits; <code className="text-slate-300">git pull</code> fetches and merges remote changes into your current branch; <code className="text-slate-300">git fetch</code> only downloads updates so you can inspect or merge later.
      </p>

      <div id="git-remote-basics" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          Add a Remote
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          If you start from a server repo, <code className="text-slate-300">git clone &lt;url&gt;</code> creates a local copy and adds a remote named <code className="text-slate-300">origin</code> pointing to that URL. If you created the repo locally first, add the remote with <code className="text-slate-300">git remote add origin &lt;url&gt;</code>, then push your main branch with <code className="text-slate-300">git push -u origin main</code>. The <code className="text-slate-300">-u</code> sets the upstream so future <code className="text-slate-300">git push</code> and <code className="text-slate-300">git pull</code> know which remote branch to use.
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
        <p className="text-slate-400 text-sm mb-4">
          <strong className="text-slate-300">push</strong> sends your commits to the remote branch; the remote must accept them (e.g. no force-push rules). <strong className="text-slate-300">pull</strong> is shorthand for fetch plus merge of the current branch’s upstream; use it to update your branch with remote changes. <strong className="text-slate-300">fetch</strong> only downloads new commits and updates remote-tracking branches (e.g. <code className="text-slate-300">origin/main</code>) so you can merge or rebase when you choose.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <ul className="text-xs text-slate-400 space-y-2">
            <li><code className="text-slate-300">git push origin main</code> — Send your commits on <code>main</code> to <code>origin</code>. Use <code>-u origin main</code> once to set upstream.</li>
            <li><code className="text-slate-300">git pull origin main</code> — Fetch from <code>origin</code> and merge <code>origin/main</code> into your current branch.</li>
            <li><code className="text-slate-300">git fetch origin</code> — Download remote branches and commits; update <code>origin/main</code> etc. No merge; you merge or rebase manually.</li>
          </ul>
        </div>
</div>
    </section>
  );
}
