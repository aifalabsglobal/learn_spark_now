import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function PythonDataStructures() {
  return (
    <section id="python-data-structures" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-python bg-python/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 3</span>
        <div className="h-px flex-1 bg-gradient-to-r from-python/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Data Structures</h2>

      <Callout type="info" title="In Plain English">
        <strong>Lists</strong> are ordered, mutable sequences. <strong>Dicts</strong> map keys to values. <strong>Sets</strong> are unordered collections of unique items. <strong>Tuples</strong> are immutable ordered pairs or records — useful for multiple return values.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Use indexing and slicing for lists; get/set by key for dicts. Sets remove duplicates. Tuples are hashable and can be unpacked into variables.
      </p>

      <div id="python-lists" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          Lists
        </h3>
        <CodeBlock
          title="List operations"
          code={`nums = [1, 2, 3, 4, 5]
nums.append(6)
nums[0]      # 1
nums[-1]     # 6 (last)
nums[1:4]    # [2, 3, 4] (slicing)
len(nums)
sum(nums)`}
          language="python"
        />
      </div>

      <div id="python-dicts-sets" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          Dictionaries &amp; Sets
        </h3>
        <CodeBlock
          title="dict and set"
          code={`# dict: key -> value
user = {"name": "Alice", "age": 30}
user["name"]
user.get("email", "N/A")

# set: unique, unordered
tags = {"python", "coding", "python"}
# {"python", "coding"}`}
        />
      </div>

      <div id="python-tuples" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          Tuples
        </h3>
        <p className="text-slate-400 text-sm mb-4">Immutable ordered sequence. Often used for multiple return values or fixed records.</p>
        <CodeBlock
          title="Tuples"
          code={`point = (10, 20)
x, y = point

def get_min_max(arr):
    return min(arr), max(arr)
mn, mx = get_min_max([1, 5, 3])`}
          language="python"
        />
      </div>
    </section>
  );
}
