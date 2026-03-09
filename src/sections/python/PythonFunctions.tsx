import CodeBlock from '../../components/CodeBlock';

export default function PythonFunctions() {
  return (
    <section id="python-functions" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-python bg-python/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 4</span>
        <div className="h-px flex-1 bg-gradient-to-r from-python/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Functions &amp; Modules</h2>

      <div id="python-def" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          Defining Functions
        </h3>
        <CodeBlock
          title="def, return, default args"
          code={`def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Alice")           # "Hello, Alice!"
greet("Bob", "Hi")       # "Hi, Bob!"

# *args and **kwargs
def log(*args, **kwargs):
    print(args, kwargs)`}
        />
      </div>

      <div id="python-modules" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          Modules &amp; import
        </h3>
        <CodeBlock
          title="Import"
          code={`import math
print(math.sqrt(16))

from math import sqrt, pi
from os import path as os_path

# Your own module: save as mymodule.py, then
# import mymodule
# mymodule.my_function()`}
        />
      </div>
    </section>
  );
}
