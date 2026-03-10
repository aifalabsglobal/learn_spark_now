import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

export default function GitCollaboration() {
  return (
    <section id="git-collaboration" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-git bg-git/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 5</span>
        <div className="h-px flex-1 bg-gradient-to-r from-git/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Collaboration Workflow</h2>

      <Callout type="tip" title="Best practice">
        Use a <strong>branch per feature/fix</strong>, then open a <strong>Pull Request (PR)</strong> or <strong>Merge Request (MR)</strong> on GitHub/GitLab for code review before merging into <code className="text-slate-300">main</code>.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Push your branch, open a PR to main, get review, then merge. If someone else changed the same files, you may get merge conflicts; resolve the markers in the file, then add and commit to complete the merge.
      </p>

      <div id="git-pr-workflow" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          Pull Request Flow
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
          <ol className="text-xs text-slate-400 space-y-2 list-decimal list-inside">
            <li>Create branch: <code className="text-slate-300">git checkout -b feature/my-feature</code></li>
            <li>Make changes, commit, push: <code className="text-slate-300">git push -u origin feature/my-feature</code></li>
            <li>On GitHub/GitLab: open Pull Request from your branch to <code className="text-slate-300">main</code></li>
            <li>After review and approval, merge the PR (squash or merge commit per team preference)</li>
            <li>Pull latest <code className="text-slate-300">main</code> and delete the feature branch locally/remotely</li>
          </ol>
        </div>
      </div>

      <div id="git-merge-conflicts" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          Merge Conflicts
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          When two branches change the same lines, Git can&apos;t auto-merge. You must open the conflicted files, fix the <code className="text-slate-300">&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> / <code className="text-slate-300">=======</code> / <code className="text-slate-300">&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code> markers, then <code className="text-slate-300">git add</code> and <code className="text-slate-300">git commit</code> (or complete the merge/rebase).
        </p>
        <EnhancementBox title="Collaboration — enhancements" items={[
          'Push a feature branch, open a PR to main on GitHub, and merge it (or practice with a teammate).',
          'Intentionally create a merge conflict: edit the same line on two branches, then merge and resolve.',
          'Review a PR: check the diff, leave a comment, and merge (or request changes).',
        ]} />
      </div>
    </section>
  );
}
