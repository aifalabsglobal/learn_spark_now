import CodeBlock, { DiagramBlock, InfoTable } from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

export default function GitFundamentals() {
  return (
    <section id="git-fundamentals" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-git bg-git/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 1</span>
        <div className="h-px flex-1 bg-gradient-to-r from-git/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Git Fundamentals</h2>

      <Callout type="info" title="👋 In Plain English">
        Git is a <strong>version control system</strong> — it tracks changes to your files over time so you can undo mistakes, work on different features in parallel (branches), and collaborate with others without overwriting each other&apos;s work. Think of it like a time machine for your project: you can go back to any saved moment, or try new ideas in a separate timeline and merge them when ready.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Whether you work alone or on a team, Git is the standard way to manage source code and other text-based assets. This section explains what Git is, how to install it (step-by-step), how to create your first repository, and the essential commands you&apos;ll use every day.
      </p>

      {/* What is Git */}
      <div id="git-what-is" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          What is Git?
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-git-light mb-2">Step-by-step: Understanding Git</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li><strong className="text-slate-300">What it is:</strong> Git was created by Linus Torvalds for Linux kernel development. It tracks who changed what, when, and why (via commit messages). Every change is stored as a snapshot so you can revert or compare.</li>
            <li><strong className="text-slate-300">Distributed:</strong> Every developer has a full copy of the project history. There is no single &quot;central&quot; server required; you push and pull to sync with remotes (e.g. GitHub, GitLab). You can work offline and merge later.</li>
            <li><strong className="text-slate-300">Branches:</strong> Lightweight pointers to commits. Create a branch for a feature or fix, commit there, then merge back when ready. This lets you try ideas without breaking the main line.</li>
            <li><strong className="text-slate-300">Collaboration:</strong> Pull requests (or merge requests) let teammates review code before it&apos;s merged into the main branch. Git handles merging and conflict detection.</li>
          </ul>
        </div>

        <DiagramBlock title="Without Git vs With Git">
{`Without Git:  overwrite files, lose history, hard to collaborate
With Git:    every change saved (commit), branches, push/pull to sync`}
        </DiagramBlock>

        <InfoTable
          headers={['Concept', 'Meaning']}
          rows={[
            ['Repository (repo)', 'A folder that Git tracks; contains the full history'],
            ['Commit', 'A saved snapshot of your files with a message and author'],
            ['Stage (staging)', 'Mark files to be included in the next commit (git add)'],
            ['Branch', 'A movable pointer to a commit; default is usually main or master'],
            ['Remote', 'A copy of the repo elsewhere (e.g. origin on GitHub)'],
          ]}
        />
      </div>

      {/* Installation */}
      <div id="git-install" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          Installation
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Install Git so you can use <code className="text-slate-300">git</code> in the terminal. After installation, open a <strong>new</strong> terminal so the command is available.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-5 mb-4">
          <h4 className="text-sm font-bold text-git-light mb-2">Step 1 — Install (Windows)</h4>
          <ul className="text-xs text-slate-400 space-y-2 list-decimal list-inside">
            <li>Option A: Open PowerShell and run <code className="text-slate-300">winget install Git.Git</code>. Accept the prompt if asked.</li>
            <li>Option B: Go to <a href="https://git-scm.com" className="text-git hover:underline" target="_blank" rel="noopener noreferrer">git-scm.com</a>, download the Windows installer, and run it. Use default options unless you know you need something different.</li>
            <li>Close and reopen your terminal. Type <code className="text-slate-300">git --version</code>. You should see something like <code className="text-slate-300">git version 2.43.x</code>.</li>
          </ul>
        </div>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-5 mb-4">
          <h4 className="text-sm font-bold text-git-light mb-2">Step 2 — Configure your identity (once per machine)</h4>
          <ul className="text-xs text-slate-400 space-y-2 list-decimal list-inside">
            <li>Git needs your name and email for every commit. Run the two commands below (use your real name and email). This is stored locally and used for all repos on this machine until you change it.</li>
          </ul>
        </div>
        <CodeBlock
          title="Verify installation and set identity"
          code={`# Check that Git is installed
git --version

# Set your name and email (required for commits)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"`}
          language="bash"
        />
      </div>

      {/* First Repository */}
      <div id="git-first-repo" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          First Repository
        </h3>
        <Callout type="info" title="Repo = tracked folder">
          A Git <strong>repository</strong> is a folder that Git tracks. You create one with <code className="text-slate-300">git init</code>. Files are <strong>untracked</strong> until you <code className="text-slate-300">git add</code> them; <code className="text-slate-300">git commit</code> saves a snapshot of the staged files with a message.
        </Callout>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-git-light mb-2">How to run this</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li>Open a terminal. Create a new folder: <code className="text-slate-300">mkdir my-project</code> then <code className="text-slate-300">cd my-project</code>.</li>
            <li>Run <code className="text-slate-300">git init</code>. You should see &quot;Initialized empty Git repository.&quot;</li>
            <li>Create a file (e.g. <code className="text-slate-300">echo "# My Project" &gt; README.md</code> on Windows, or create README.md in an editor).</li>
            <li>Run <code className="text-slate-300">git add README.md</code> then <code className="text-slate-300">git commit -m "Initial commit: add README"</code>. You&apos;ve made your first commit!</li>
          </ul>
        </div>
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
        <EnhancementBox title="First repo — enhancements" items={[
          'Add a second file (e.g. main.py or notes.txt), run git add and git commit again.',
          'Run git log and git log --oneline to see your commit history.',
          'Edit README.md, then run git status, git diff, git add ., and git commit -m "Update README".',
        ]} />
      </div>

      {/* Essential Commands */}
      <div id="git-basic-commands" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-git rounded-full" />
          Essential Commands
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          These four commands are the backbone of daily Git workflow. Use them until they&apos;re second nature; then branching, merging, and remote sync will build on the same ideas.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-git-light mb-2">Step-by-step: Daily workflow</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li><code className="text-slate-300">git status</code> — See which files are modified, staged, or untracked. Run it often.</li>
            <li><code className="text-slate-300">git add &lt;file&gt;</code> or <code className="text-slate-300">git add .</code> — Stage changes for the next commit. Only staged changes are included in <code className="text-slate-300">git commit</code>.</li>
            <li><code className="text-slate-300">git commit -m "message"</code> — Save a snapshot of the staged files with a short message. Use present tense and be specific (e.g. &quot;Add login validation&quot; not &quot;Updates&quot;).</li>
            <li><code className="text-slate-300">git log</code> — View commit history (hash, author, date, message). Use <code className="text-slate-300">git log --oneline</code> for a compact view.</li>
          </ul>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { cmd: 'git status', desc: 'See modified, staged, and untracked files' },
            { cmd: 'git add .', desc: 'Stage all changes in current directory' },
            { cmd: 'git commit -m "msg"', desc: 'Save a snapshot with a message' },
            { cmd: 'git log --oneline', desc: 'Short history of commits' },
          ].map((item, i) => (
            <div key={i} className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
              <code className="text-sm font-mono text-git-light">{item.cmd}</code>
              <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
