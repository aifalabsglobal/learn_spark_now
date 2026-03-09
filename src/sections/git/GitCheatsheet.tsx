import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function GitCheatsheet() {
  return (
    <section id="git-cheatsheet" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-git bg-git/10 px-3 py-1 rounded-full uppercase tracking-wider">Reference</span>
        <div className="h-px flex-1 bg-gradient-to-r from-git/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Git Cheat Sheet</h2>

      <Callout type="info" title="Quick reference">
        Daily workflow: status, add, commit, pull, push. Use branches for features; merge or open a PR when ready. Config and undo commands are below.
      </Callout>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
          <h4 className="text-sm font-bold text-git-light mb-2">Daily basics</h4>
          <ul className="text-xs text-slate-400 space-y-1 font-mono">
            <li>git status</li>
            <li>git add . / git add &lt;file&gt;</li>
            <li>git commit -m "message"</li>
            <li>git pull origin main</li>
            <li>git push origin main</li>
          </ul>
        </div>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
          <h4 className="text-sm font-bold text-git-light mb-2">Branches</h4>
          <ul className="text-xs text-slate-400 space-y-1 font-mono">
            <li>git branch / git branch -a</li>
            <li>git checkout -b &lt;branch&gt;</li>
            <li>git merge &lt;branch&gt;</li>
            <li>git log --oneline -10</li>
          </ul>
        </div>
      </div>

      <CodeBlock
        title="Quick reference"
        code={`# Config (once per machine)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes in a file
git checkout -- <file>
# or: git restore <file>`}
        language="bash"
      />
    </section>
  );
}
