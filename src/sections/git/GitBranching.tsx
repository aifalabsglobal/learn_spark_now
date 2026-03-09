import CodeBlock from '../../components/CodeBlock';
import { DiagramBlock } from '../../components/CodeBlock';

export default function GitBranching() {
  return (
    <section id="git-branching" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-git bg-git/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 2</span>
        <div className="h-px flex-1 bg-gradient-to-r from-git/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Branching & Merging</h2>

      <div id="git-branches" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          Why Branches?
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Branches let you work on a feature or fix in isolation. When ready, you <strong className="text-slate-300">merge</strong> back into <code className="text-slate-300">main</code> (or another branch).
        </p>
        <DiagramBlock title="Simple branch flow">
{`main     ----A----B--------M---  (merge)
              \\       /
feature        C-----D`}
        </DiagramBlock>
      </div>

      <div id="git-branch-commands" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          Branch Commands
        </h3>
        <CodeBlock
          title="Create and switch branch"
          code={`git branch feature/login      # create branch
git checkout feature/login  # switch to it
# or in one step:
git checkout -b feature/login

# list branches
git branch -a`}
          language="bash"
        />
        <p className="text-slate-500 text-xs mt-2">Modern Git also supports <code className="text-slate-400">git switch -c feature/login</code> and <code className="text-slate-400">git restore</code> for clearer semantics.</p>
      </div>

      <div id="git-merge" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          Merge
        </h3>
        <CodeBlock
          title="Merge a branch into current"
          code={`git checkout main
git merge feature/login    # merge feature into main
git branch -d feature/login  # delete branch after merge`}
          language="bash"
        />
      </div>
    </section>
  );
}
