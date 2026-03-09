import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function GitFundamentals() {
  return (
    <section id="git-fundamentals" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-git bg-git/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 1</span>
        <div className="h-px flex-1 bg-gradient-to-r from-git/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Git Fundamentals</h2>

      <Callout type="info" title="👋 In Plain English">
        Git is a <strong>version control system</strong> — it tracks changes to your files over time so you can undo mistakes, work on different features in parallel (branches), and collaborate with others without overwriting each other&apos;s work.
      </Callout>

      <div id="git-what-is" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          What is Git?
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li><strong className="text-slate-300">Distributed</strong> — every developer has a full copy of the history.</li>
            <li><strong className="text-slate-300">Tracks changes</strong> — who changed what, when, and why (commit messages).</li>
            <li><strong className="text-slate-300">Branches</strong> — work on features or fixes without affecting the main code.</li>
            <li><strong className="text-slate-300">Merge &amp; collaborate</strong> — combine work via pull requests, code review.</li>
          </ul>
        </div>
      </div>

      <div id="git-install" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          Install Git
        </h3>
        <p className="text-slate-400 text-sm mb-4">Download from <a href="https://git-scm.com" className="text-git-light hover:underline">git-scm.com</a> or use your package manager. Verify:</p>
        <CodeBlock title="Check installation" code="git --version" language="bash" />
      </div>

      <div id="git-first-repo" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          First Repository
        </h3>
        <p className="text-slate-400 text-sm mb-4">Create a folder and turn it into a Git repo. Then add and commit a file.</p>
        <CodeBlock
          title="Init, add, commit"
          code={`mkdir my-project && cd my-project
git init
echo "# My Project" > README.md
git add README.md
git status
git commit -m "Initial commit: add README"`}
          language="bash"
        />
      </div>

      <div id="git-basic-commands" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          Essential Commands
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
          <ul className="text-xs text-slate-400 space-y-2">
            <li><code className="text-slate-300">git status</code> — see modified/untracked files</li>
            <li><code className="text-slate-300">git add &lt;file&gt;</code> or <code className="text-slate-300">git add .</code> — stage changes</li>
            <li><code className="text-slate-300">git commit -m "message"</code> — save a snapshot</li>
            <li><code className="text-slate-300">git log</code> — view commit history</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
