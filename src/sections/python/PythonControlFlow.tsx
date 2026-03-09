import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function PythonControlFlow() {
  return (
    <section id="python-control-flow" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-python bg-python/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 2</span>
        <div className="h-px flex-1 bg-gradient-to-r from-python/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Control Flow</h2>

      <Callout type="info" title="👋 In Plain English">
        <strong>Control flow</strong> is how your program decides what to do next: <strong>if/elif/else</strong> for branching, <strong>for</strong> and <strong>while</strong> for loops, and <strong>comprehensions</strong> for building lists and dicts in one expression.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Python uses indentation (spaces or tabs) to define blocks; no curly braces. Conditionals run one branch based on truthiness; loops iterate over sequences or repeat until a condition is false. Comprehensions are a concise way to build lists (or dicts/sets) from iterables.
      </p>

      <div id="python-if-else" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          if / elif / else
        </h3>
        <p className="text-slate-400 text-sm mb-4">Execute different code based on conditions. <code className="text-slate-300">elif</code> is “else if”; only one branch runs. Use <code className="text-slate-300">else</code> for the default case.</p>
        <CodeBlock
          title="Conditionals"
          code={`age = 18
if age < 13:
    print("child")
elif age < 20:
    print("teen")
else:
    print("adult")`}
        />
      </div>

      <div id="python-loops" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          Loops
        </h3>
        <p className="text-slate-400 text-sm mb-4"><code className="text-slate-300">for</code> iterates over a sequence (e.g. <code className="text-slate-300">range(5)</code>, a list). <code className="text-slate-300">while</code> repeats until the condition is false. Use <code className="text-slate-300">break</code> to exit early, <code className="text-slate-300">continue</code> to skip to the next iteration.</p>
        <CodeBlock
          title="for and while"
          code={`# for loop
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

for item in ["a", "b", "c"]:
    print(item)

# while loop
n = 0
while n < 3:
    print(n)
    n += 1`}
          language="python"
        />
      </div>

      <div id="python-comprehensions" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          List / Dict Comprehensions
        </h3>
        <p className="text-slate-400 text-sm mb-4">A comprehension builds a list (or dict/set) in one expression: <code className="text-slate-300">[expr for item in iterable]</code> or with a filter <code className="text-slate-300">[expr for item in iterable if condition]</code>. Dict comprehensions use <code className="text-slate-300">{k: v for ...}</code>.</p>
        <CodeBlock
          title="Comprehensions"
          code={`squares = [x ** 2 for x in range(5)]   # [0, 1, 4, 9, 16]
evens = [x for x in range(10) if x % 2 == 0]

# dict comprehension
d = {k: k * 2 for k in ["a", "b", "c"]}`}
          language="python"
        />
      </div>
    </section>
  );
}
