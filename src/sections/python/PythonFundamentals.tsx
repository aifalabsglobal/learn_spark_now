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

      <p className="text-slate-400 text-sm mb-6">
        Python is one of the most popular languages for beginners and professionals alike. Its clear syntax and rich standard library make it ideal for quick scripts, while frameworks like Django and Flask power web apps, and pandas and scikit-learn dominate data science and ML. This section covers why Python, how to install it, your first program, and basic types and variables.
      </p>

      <div id="python-what-is" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          Why Python?
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Python prioritizes readability: indentation defines blocks (no curly braces), and the language avoids cryptic symbols. That makes it easy to learn and to maintain. It is also versatile — the same language is used for web backends (Django, Flask), data analysis (pandas, NumPy), machine learning (scikit-learn, TensorFlow), and automation (scripts, APIs). Because it is interpreted, you can run code immediately without a compile step and use the REPL for quick experiments.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li><strong className="text-slate-300">Readable</strong> — Clean syntax, fewer braces; great for beginners and for code reviews. &quot;Code is read more often than it is written.&quot;</li>
            <li><strong className="text-slate-300">Versatile</strong> — Web (Django, Flask), data (pandas, NumPy), ML (scikit-learn), automation, DevOps. One language across many domains.</li>
            <li><strong className="text-slate-300">Interpreted</strong> — Run code without a separate compile step; use the REPL (<code className="text-slate-300">python</code> or <code className="text-slate-300">ipython</code>) for quick experiments and debugging.</li>
          </ul>
        </div>
      </div>

      <div id="python-install" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          Install Python
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Download the latest 3.x installer from <a href="https://www.python.org/downloads/" className="text-python-light hover:underline">python.org</a>, or use a version manager like <code className="text-slate-300">pyenv</code> (macOS/Linux) or your system package manager. On Windows, the installer can add Python to PATH — check that option. Verify the installation from a new terminal so the updated PATH is picked up.
        </p>
        <CodeBlock title="Check installation" code={`python --version
# or: python3 --version`} language="bash" />
      </div>

      <div id="python-first-program" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          First Program
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          The classic first step is to print a message. Then try variables: assign a value to a name and use it. Python infers types — you don&apos;t declare <code className="text-slate-300">int</code> or <code className="text-slate-300">str</code>; the interpreter figures it out from the value. Use descriptive names (e.g. <code className="text-slate-300">user_name</code>, <code className="text-slate-300">order_count</code>) and follow PEP 8 style (lowercase with underscores).
        </p>
        <CodeBlock
          title="Hello, World!"
          code={`print("Hello, World!")

# Variables and types
name = "Alice"
age = 30
height = 5.9
is_student = True`}
          language="bash"
        />
      </div>

      <div id="python-variables-types" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          Variables &amp; Basic Types
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Every value in Python has a type. You don&apos;t declare the type; assigning a value binds the name to that value and type. The main built-in types you&apos;ll use daily are numbers (<code className="text-slate-300">int</code>, <code className="text-slate-300">float</code>), strings (<code className="text-slate-300">str</code>), booleans (<code className="text-slate-300">bool</code>), and <code className="text-slate-300">None</code> for &quot;no value.&quot; Later you&apos;ll use collections: list, dict, set, tuple.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
          <ul className="text-xs text-slate-400 space-y-2">
            <li><code className="text-slate-300">int</code>, <code className="text-slate-300">float</code> — Integers and floating-point numbers. Division <code className="text-slate-300">/</code> always returns float; use <code className="text-slate-300">//</code> for integer division.</li>
            <li><code className="text-slate-300">str</code> — Strings, with single or double quotes. Use f-strings for formatting: <code className="text-slate-300">f&quot;Hello, {name}&quot;</code>.</li>
            <li><code className="text-slate-300">bool</code> — <code className="text-slate-300">True</code> or <code className="text-slate-300">False</code>. Used in conditions and logical expressions.</li>
            <li><code className="text-slate-300">None</code> — Represents the absence of a value. Often used as a default or to indicate &quot;not set.&quot;</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
