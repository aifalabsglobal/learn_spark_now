import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

export default function PythonFileIO() {
  return (
    <section id="python-file-io" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-python bg-python/10 px-3 py-1 rounded-full uppercase tracking-wider">Part 6</span>
        <div className="h-px flex-1 bg-gradient-to-r from-python/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">File I/O &amp; Exceptions</h2>

      <Callout type="info" title="In Plain English">
        Use <strong>open()</strong> with a <strong>with</strong> block so the file is closed automatically. Use <strong>try/except</strong> to handle errors; <strong>else</strong> runs when no exception occurs, <strong>finally</strong> always runs for cleanup.
      </Callout>

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
          language="python"
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
          language="python"
        />
        <EnhancementBox title="File I/O & exceptions — enhancements" items={[
          'Read a CSV with open() and split lines; parse into a list of dicts (headers as keys).',
          'Write a function that reads a file and returns its lines; use try/except for FileNotFoundError.',
          'Use with open() for both read and write in one script; add finally to log "Done" even on error.',
        ]} />
      </div>
    </section>
  );
}
