import CodeBlock from '../../components/CodeBlock';

export default function PythonFileIO() {
  return (
    <section id="python-file-io" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-python bg-python/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 6</span>
        <div className="h-px flex-1 bg-gradient-to-r from-python/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">File I/O &amp; Exceptions</h2>

      <div id="python-files" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          Reading &amp; Writing Files
        </h3>
        <CodeBlock
          title="open, read, write"
          code={`# Read
with open("data.txt", "r") as f:
    content = f.read()
# or: for line in f:

# Write
with open("out.txt", "w") as f:
    f.write("Hello\\n")

# Append: open(..., "a")`}
        />
      </div>

      <div id="python-exceptions" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-python rounded-full" />
          try / except
        </h3>
        <CodeBlock
          title="Exception handling"
          code={`try:
    result = int("not a number")
except ValueError as e:
    print(f"Invalid: {e}")
except Exception as e:
    print(f"Error: {e}")
else:
    print("Success")
finally:
    print("Cleanup")`}
        />
      </div>
    </section>
  );
}
