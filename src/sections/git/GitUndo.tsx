import CodeBlock from '../../components/CodeBlock';

export default function GitUndo() {
  return (
    <section id="git-undo" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-git bg-git/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 4</span>
        <div className="h-px flex-1 bg-gradient-to-r from-git/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Undo &amp; Clean Up</h2>

      <div id="git-reset-revert" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          Reset vs Revert
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <ul className="text-xs text-slate-400 space-y-2">
            <li><strong className="text-slate-300">git reset --soft HEAD~1</strong> — undo last commit, keep changes staged</li>
            <li><strong className="text-slate-300">git reset --mixed HEAD~1</strong> — undo last commit, keep changes in working dir (default)</li>
            <li><strong className="text-slate-300">git reset --hard HEAD~1</strong> — undo last commit and discard changes (destructive)</li>
            <li><strong className="text-slate-300">git revert &lt;commit&gt;</strong> — create a new commit that undoes a previous one (safe for shared branches)</li>
          </ul>
        </div>
      </div>

      <div id="git-stash" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          Stash
        </h3>
        <p className="text-slate-400 text-sm mb-4">Temporarily save uncommitted changes so you can switch branches or pull.</p>
        <CodeBlock
          title="Stash and restore"
          code={`git stash              # save changes
git stash list
git checkout other-branch
# ... do work ...
git checkout main
git stash pop            # apply and remove from stash`}
          language="bash"
        />
      </div>

      <div id="git-ignore" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          .gitignore
        </h3>
        <p className="text-slate-400 text-sm mb-4">Ignore files you never want to commit (build output, env files, IDE config).</p>
        <CodeBlock
          title=".gitignore example"
          code={`node_modules/
.env
*.log
dist/
.DS_Store`}
          language="bash"
        />
      </div>
    </section>
  );
}
