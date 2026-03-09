import CodeBlock from '../../components/CodeBlock';

export default function PythonControlFlow() {
  return (
    <section id="python-control-flow" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-python bg-python/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 2</span>
        <div className="h-px flex-1 bg-gradient-to-r from-python/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Control Flow</h2>

      <div id="python-if-else" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          if / elif / else
        </h3>
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
        />
      </div>

      <div id="python-comprehensions" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          List / Dict Comprehensions
        </h3>
        <CodeBlock
          title="Comprehensions"
          code={`squares = [x ** 2 for x in range(5)]   # [0, 1, 4, 9, 16]
evens = [x for x in range(10) if x % 2 == 0]

# dict comprehension
d = {k: k * 2 for k in ["a", "b", "c"]}`}
        />
      </div>
    </section>
  );
}
