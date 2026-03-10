import CodeBlock, { DiagramBlock, InfoTable } from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

export default function PythonFundamentals() {
  return (
    <section id="python-fundamentals" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-python bg-python/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 1</span>
        <div className="h-px flex-1 bg-gradient-to-r from-python/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Python Fundamentals</h2>

      <Callout type="info" title="👋 In Plain English">
        Python is a <strong>general-purpose programming language</strong> that reads like plain English. It&apos;s used for web apps, data science, automation, and scripting. You write less code to do more, and it has a huge ecosystem of libraries — like having a friendly assistant who understands simple instructions and can do almost anything you ask!
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Python is one of the most popular languages for beginners and professionals alike. Its clear syntax and rich standard library make it ideal for quick scripts, while frameworks like Django and Flask power web apps, and pandas and scikit-learn dominate data science and ML. This section covers what Python is, why choose it, how to install it (step-by-step), your first program, and basic types and variables.
      </p>

      {/* What is Python / Why Python */}
      <div id="python-what-is" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          What is Python? Why Python?
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-python-light mb-2">Step-by-step: Understanding Python</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li><strong className="text-slate-300">What it is:</strong> Python is an interpreted, high-level language. You write readable code; the interpreter runs it line by line (or byte-compiled) without a separate compile step.</li>
            <li><strong className="text-slate-300">Readability:</strong> Indentation defines blocks (no curly braces). The language avoids cryptic symbols — code reads like structured English, which makes it easy to learn and maintain.</li>
            <li><strong className="text-slate-300">Versatile:</strong> Same language for web (Django, Flask), data (pandas, NumPy), ML (scikit-learn, TensorFlow), automation, and DevOps. One language across many domains.</li>
            <li><strong className="text-slate-300">Ecosystem:</strong> PyPI hosts hundreds of thousands of packages. <code className="text-slate-300">pip install</code> gets you libraries for almost any task.</li>
          </ul>
        </div>

        <InfoTable
          headers={['Aspect', 'Python', 'Java / C++']}
          rows={[
            ['Syntax', 'Indentation-based, minimal punctuation', 'Braces, semicolons, explicit types'],
            ['Execution', 'Interpreted (run immediately)', 'Compiled to bytecode / machine code'],
            ['Typing', 'Dynamic (types inferred at runtime)', 'Static (declare types)'],
            ['Learning curve', 'Gentle; great for beginners', 'Steeper; more boilerplate'],
            ['Use cases', 'Scripts, data, web, automation, ML', 'Systems, enterprise, performance-critical'],
          ]}
        />

        <Callout type="tip" title="Simple Analogy">
          Python is like writing a recipe in plain English: &quot;Take the eggs, mix with flour, then bake.&quot; Other languages often feel more like filling out a strict form with exact codes for every step. Python lets you focus on <em>what</em> you want, not the low-level details.
        </Callout>
      </div>

      {/* Installation */}
      <div id="python-install" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          Installation & Setup
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Follow these steps in order. Use <strong className="text-slate-300">PowerShell</strong> or <strong className="text-slate-300">Command Prompt</strong> on Windows, or Terminal on macOS/Linux. After installation, always open a <strong>new</strong> terminal so your PATH is updated.
        </p>

        <div className="space-y-6 mb-6">
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-5">
            <h4 className="text-sm font-bold text-python-light mb-2">Step 1 — Download Python (Windows)</h4>
            <ul className="text-xs text-slate-400 space-y-2 list-decimal list-inside">
              <li>Go to <a href="https://www.python.org/downloads/" className="text-python hover:underline" target="_blank" rel="noopener noreferrer">python.org/downloads</a>. Click the yellow button to download the latest <strong>Python 3.x</strong> for Windows.</li>
              <li>Run the installer. On the first screen, <strong>check the box</strong> that says <strong>&quot;Add python.exe to PATH&quot;</strong>. Then click <strong>Install Now</strong>.</li>
              <li>When done, click &quot;Close.&quot; Open a <strong>new</strong> PowerShell or Command Prompt and type <code className="text-slate-300">python --version</code>. You should see something like <code className="text-slate-300">Python 3.12.x</code>.</li>
            </ul>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-5">
            <h4 className="text-sm font-bold text-python-light mb-2">Step 2 — Verify pip</h4>
            <ul className="text-xs text-slate-400 space-y-2 list-decimal list-inside">
              <li><code className="text-slate-300">pip</code> is Python&apos;s package installer. It usually comes with Python. In a new terminal, type <code className="text-slate-300">pip --version</code>. You should see the pip version and the Python it belongs to.</li>
              <li>If you need to install a library later, you&apos;ll use <code className="text-slate-300">pip install &lt;package&gt;</code> (e.g. <code className="text-slate-300">pip install pandas</code>).</li>
            </ul>
          </div>
        </div>

        <CodeBlock
          title="Check installation (any OS)"
          code={`# Windows (PowerShell or CMD)
python --version
pip --version

# macOS / Linux (often python3 and pip3)
python3 --version
pip3 --version`}
          language="bash"
        />
      </div>

      {/* First Program */}
      <div id="python-first-program" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          First Program
        </h3>
        <Callout type="info" title="The classic first step">
          Every programmer starts by printing <span className="font-bold text-white">Hello, World!</span> — it confirms that your setup works and that you can run code. Then you add variables: names that hold values. Python figures out the type for you; you don&apos;t have to declare it.
        </Callout>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-python-light mb-2">How to run this on your machine</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li>Create a folder for your scripts, e.g. <code className="text-slate-300">C:\python_scripts</code> or <code className="text-slate-300">~/python_scripts</code>.</li>
            <li>Open Notepad or VS Code. Copy the code from the block below and save the file as <code className="text-slate-300">hello.py</code> in that folder.</li>
            <li>Open a terminal. Go to the folder: <code className="text-slate-300">cd C:\python_scripts</code> (Windows) or <code className="text-slate-300">cd ~/python_scripts</code> (macOS/Linux).</li>
            <li>Run the script: <code className="text-slate-300">python hello.py</code> (or <code className="text-slate-300">python3 hello.py</code> on macOS/Linux). You should see the output printed.</li>
          </ul>
        </div>

        <CodeBlock
          title="hello.py"
          code={`# Your first Python program
print("Hello, World!")

# Variables and types (Python infers the type)
name = "Alice"
age = 30
height = 5.9
is_student = True

print(name, age)  # Alice 30`}
          language="python"
        />
        <EnhancementBox title="Fundamentals — enhancements" items={[
          'Use an f-string: print(f"Hello, {name}! You are {age} years old.") and run again.',
          'Try the interactive REPL: type python (or python3) in the terminal with no file, then type print(2 + 3) and press Enter.',
          'Create a second variable favorite_color and print it together with name.',
        ]} />
      </div>

      {/* Variables & Types */}
      <div id="python-variables-types" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          Variables &amp; Basic Types
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Every value in Python has a type. You don&apos;t declare the type; assigning a value binds the name to that value and type. The main built-in types you&apos;ll use daily are numbers (<code className="text-slate-300">int</code>, <code className="text-slate-300">float</code>), strings (<code className="text-slate-300">str</code>), booleans (<code className="text-slate-300">bool</code>), and <code className="text-slate-300">None</code> for &quot;no value.&quot; Later you&apos;ll use collections: list, dict, set, tuple.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-python-light mb-2">Step-by-step: Working with types</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside">
            <li><strong className="text-slate-300">int, float:</strong> Integers and floating-point numbers. Division <code className="text-slate-300">/</code> always returns float; use <code className="text-slate-300">//</code> for integer division, <code className="text-slate-300">%</code> for remainder.</li>
            <li><strong className="text-slate-300">str:</strong> Strings with single or double quotes. Use f-strings for formatting: <code className="text-slate-300">f&quot;Hello, {name}&quot;</code>. Use <code className="text-slate-300">len(s)</code> for length.</li>
            <li><strong className="text-slate-300">bool:</strong> <code className="text-slate-300">True</code> or <code className="text-slate-300">False</code>. Used in conditions and logical expressions (<code className="text-slate-300">and</code>, <code className="text-slate-300">or</code>, <code className="text-slate-300">not</code>).</li>
            <li><strong className="text-slate-300">None:</strong> Represents the absence of a value. Often used as a default or to indicate &quot;not set.&quot;</li>
          </ul>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { title: 'int', desc: 'Whole numbers: 0, 42, -7' },
            { title: 'float', desc: 'Decimals: 3.14, -0.5' },
            { title: 'str', desc: "Text: 'hello', \"world\"" },
            { title: 'bool', desc: 'True or False' },
          ].map((item, i) => (
            <div key={i} className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
              <h4 className="text-sm font-bold text-python-light mb-1">{item.title}</h4>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
