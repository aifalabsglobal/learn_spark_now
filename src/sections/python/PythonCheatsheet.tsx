import CodeBlock from '../../components/CodeBlock';

export default function PythonCheatsheet() {
  return (
    <section id="python-cheatsheet" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-python bg-python/10 px-3 py-1 rounded-full uppercase tracking-wider">Reference</span>
        <div className="h-px flex-1 bg-gradient-to-r from-python/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Python Cheat Sheet</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
          <h4 className="text-sm font-bold text-python-light mb-2">Built-ins</h4>
          <ul className="text-xs text-slate-400 space-y-1 font-mono">
            <li>len(), range(), sum(), min(), max()</li>
            <li>sorted(), reversed(), enumerate(), zip()</li>
            <li>type(), isinstance(), str(), int(), float()</li>
          </ul>
        </div>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
          <h4 className="text-sm font-bold text-python-light mb-2">String methods</h4>
          <ul className="text-xs text-slate-400 space-y-1 font-mono">
            <li>.split(), .join(), .strip()</li>
            <li>.lower(), .upper(), .replace()</li>
            <li>f&quot;{'{name}'} is {'{age}'}&quot;</li>
          </ul>
        </div>
      </div>

      <CodeBlock
        title="Quick reference"
        code={`# List methods: .append(), .extend(), .pop(), .insert(), .remove()
# Dict: .keys(), .values(), .items()
# Useful: collections.defaultdict, itertools, json.loads/dumps`}
      />
    </section>
  );
}
