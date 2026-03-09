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

      <p className="text-slate-400 text-sm mb-6">
        Whether you work alone or on a team, Git is the standard way to manage source code and other text-based assets. This section explains what Git is, how to install it, how to create your first repository, and the essential commands you’ll use every day.
      </p>

      <div id="git-what-is" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          What is Git?
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Git was created by Linus Torvalds for Linux kernel development. It is <strong className="text-slate-300">distributed</strong>: every developer has a full copy of the project history, so you can work offline and merge later. It tracks <strong className="text-slate-300">who</strong> changed <strong className="text-slate-300">what</strong>, <strong className="text-slate-300">when</strong>, and <strong className="text-slate-300">why</strong> (via commit messages). Branches let you try ideas or fix bugs without touching the main line; merge and pull requests are how teams combine and review work.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li><strong className="text-slate-300">Distributed</strong> — No single “central” copy is required. Each clone has the full history; you push and pull to sync with remotes (e.g. GitHub, GitLab).</li>
            <li><strong className="text-slate-300">Tracks changes</strong> — Every commit records a snapshot and a message. You can revert, compare, or blame line-by-line.</li>
            <li><strong className="text-slate-300">Branches</strong> — Lightweight pointers to commits. Create a branch for a feature or fix, commit there, then merge back when ready.</li>
            <li><strong className="text-slate-300">Merge &amp; collaborate</strong> — Pull requests (or merge requests) let teammates review code before it’s merged into the main branch.</li>
          </ul>
        </div>
      </div>

      <div id="git-install" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          Install Git
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Download the official installer from <a href="https://git-scm.com" className="text-git-light hover:underline">git-scm.com</a>, or use your package manager (e.g. <code className="text-slate-300">winget install Git.Git</code> on Windows, <code className="text-slate-300">brew install git</code> on macOS). After installation, open a new terminal and verify that Git is available.
        </p>
        <CodeBlock title="Check installation" code="git --version" language="bash" />
      </div>

      <div id="git-first-repo" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          First Repository
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          A Git <strong className="text-slate-300">repository</strong> is a folder that Git tracks. You create one with <code className="text-slate-300">git init</code>. Files are untracked until you <code className="text-slate-300">git add</code> them; <code className="text-slate-300">git commit</code> saves a snapshot of the staged files with a message. Below: create a folder, initialize a repo, add a README, and make your first commit.
        </p>
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
        <p className="text-slate-400 text-sm mt-2">
          <code className="text-slate-300">git status</code> shows which files are staged (green) or untracked (red). Always write a clear commit message so you and others can understand the change later.
        </p>
      </div>

      <div id="git-basic-commands" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          Essential Commands
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          These four commands are the backbone of daily Git workflow. Use them until they’re second nature; then branching, merging, and remote sync will build on the same ideas.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
          <ul className="text-xs text-slate-400 space-y-2">
            <li><code className="text-slate-300">git status</code> — See which files are modified, staged, or untracked. Run it often.</li>
            <li><code className="text-slate-300">git add &lt;file&gt;</code> or <code className="text-slate-300">git add .</code> — Stage changes for the next commit. Only staged changes are included in <code className="text-slate-300">git commit</code>.</li>
            <li><code className="text-slate-300">git commit -m "message"</code> — Save a snapshot of the staged files with a short message. Use present tense and be specific (e.g. “Add login validation” not “Updates”).</li>
            <li><code className="text-slate-300">git log</code> — View commit history (hash, author, date, message). Use <code className="text-slate-300">git log --oneline</code> for a compact view.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
