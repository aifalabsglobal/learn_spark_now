import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function PythonFundamentals() {
  return (
    <section id="python-fundamentals" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-python bg-python/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 1</span>
        <div className="h-px flex-1 bg-gradient-to-r from-python/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Python Fundamentals</h2>

      <Callout type="info" title="👋 In Plain English">
        Python is a <strong>general-purpose programming language</strong> that reads like plain English. It&apos;s used for web apps, data science, automation, and scripting. You write less code to do more, and it has a huge ecosystem of libraries.
      </Callout>

      <div id="python-what-is" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          Why Python?
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li><strong className="text-slate-300">Readable</strong> — clean syntax, fewer braces; great for beginners.</li>
            <li><strong className="text-slate-300">Versatile</strong> — web (Django, Flask), data (pandas, NumPy), ML (scikit-learn), automation.</li>
            <li><strong className="text-slate-300">Interpreted</strong> — run code without a separate compile step; REPL for quick experiments.</li>
          </ul>
        </div>
      </div>

      <div id="python-install" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          Install Python
        </h3>
        <p className="text-slate-400 text-sm mb-4">Download from <a href="https://www.python.org/downloads/" className="text-python-light hover:underline">python.org</a> or use <code className="text-slate-300">pyenv</code> / your package manager. Verify:</p>
        <CodeBlock title="Check installation" code={`python --version
# or: python3 --version`} language="bash" />
      </div>

      <div id="python-first-program" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          First Program
        </h3>
        <CodeBlock
          title="Hello, World!"
          code={`print("Hello, World!")

# Variables and types
name = "Alice"
age = 30
height = 5.9
is_student = True`}
        />
      </div>

      <div id="python-variables-types" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          Variables &amp; Basic Types
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
          <ul className="text-xs text-slate-400 space-y-2">
            <li><code className="text-slate-300">int</code>, <code className="text-slate-300">float</code> — numbers</li>
            <li><code className="text-slate-300">str</code> — strings (single or double quotes)</li>
            <li><code className="text-slate-300">bool</code> — <code className="text-slate-300">True</code> / <code className="text-slate-300">False</code></li>
            <li><code className="text-slate-300">None</code> — absence of value</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
