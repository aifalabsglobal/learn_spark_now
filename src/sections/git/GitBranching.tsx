import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import { DiagramBlock } from '../../components/CodeBlock';

export default function GitBranching() {
  return (
    <section id="git-branching" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-git bg-git/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 2</span>
        <div className="h-px flex-1 bg-gradient-to-r from-git/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Branching & Merging</h2>

      <Callout type="info" title="👋 In Plain English">
        A <strong>branch</strong> is a separate line of development. You create one for a feature or fix, make commits there, then <strong>merge</strong> it back into <code>main</code> (or another branch) when it’s ready. That keeps the main line stable while you experiment.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Branches are lightweight pointers to commits. Creating a branch doesn’t copy the repo — it just starts a new pointer. You commit on the branch; when you merge, Git combines the histories. This section explains why branches matter, the essential branch commands, and how to merge (including handling merge conflicts in the next part).
      </p>

      <div id="git-branches" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          Why Branches?
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Branches let you work on a feature or fix in isolation so that unfinished work doesn’t break <code className="text-slate-300">main</code>. Each developer (or each task) can have a branch; when the work is tested and reviewed, you <strong className="text-slate-300">merge</strong> the branch into <code className="text-slate-300">main</code> (or into a release branch). The default branch is usually <code className="text-slate-300">main</code> or <code className="text-slate-300">master</code>; feature branches are often named <code className="text-slate-300">feature/login</code>, <code className="text-slate-300">fix/header-bug</code>, etc.
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
        <p className="text-slate-400 text-sm mb-4">
          <code className="text-slate-300">git branch &lt;name&gt;</code> creates a branch at the current commit; <code className="text-slate-300">git checkout &lt;name&gt;</code> switches to it. The one-liner <code className="text-slate-300">git checkout -b feature/login</code> creates and switches in one step. Use <code className="text-slate-300">git branch -a</code> to list all branches (including remote-tracking). Modern Git also offers <code className="text-slate-300">git switch -c feature/login</code> and <code className="text-slate-300">git restore</code> for clearer semantics (switch for branches, restore for files).
        </p>
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
      </div>

      <div id="git-merge" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          Merge
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          To bring a branch’s changes into another (e.g. <code className="text-slate-300">feature/login</code> into <code className="text-slate-300">main</code>), switch to the target branch and run <code className="text-slate-300">git merge &lt;branch&gt;</code>. Git creates a merge commit if the histories have diverged (or a fast-forward if one branch is strictly ahead). After a successful merge, you can delete the feature branch with <code className="text-slate-300">git branch -d feature/login</code> to keep the branch list tidy.
        </p>
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
