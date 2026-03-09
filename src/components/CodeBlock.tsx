import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

function highlightPython(code: string): string {
  const lines = code.split('\n');
  return lines.map(line => {
    // Escape HTML
    let hl = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Full-line comments
    if (/^\s*#/.test(hl)) {
      return `<span class="code-comment">${hl}</span>`;
    }

    // Inline comments (but not inside strings)
    hl = hl.replace(/(#[^"'\n]*)$/gm, '<span class="code-comment">$1</span>');

    // Triple-quoted strings
    hl = hl.replace(/("""[\s\S]*?"""|\'\'\'[\s\S]*?\'\'\')/g, '<span class="code-string">$1</span>');

    // Decorators
    hl = hl.replace(/(@\w+)/g, '<span class="code-decorator">$1</span>');

    // Strings (double and single quoted)
    hl = hl.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|f"(?:[^"\\]|\\.)*"|f'(?:[^'\\]|\\.)*')/g, '<span class="code-string">$1</span>');

    // Keywords
    const keywords = ['from', 'import', 'def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or', 'is', 'as', 'with', 'try', 'except', 'finally', 'raise', 'yield', 'lambda', 'pass', 'break', 'continue', 'global', 'True', 'False', 'None', 'async', 'await', 'del'];
    keywords.forEach(kw => {
      const re = new RegExp(`\\b(${kw})\\b`, 'g');
      hl = hl.replace(re, '<span class="code-keyword">$1</span>');
    });

    // Built-in functions
    const builtins = ['print', 'len', 'range', 'int', 'str', 'float', 'list', 'dict', 'set', 'tuple', 'type', 'isinstance', 'sum', 'min', 'max', 'abs', 'round', 'sorted', 'enumerate', 'zip', 'map', 'filter', 'any', 'all', 'open', 'super', 'property', 'staticmethod', 'classmethod'];
    builtins.forEach(fn => {
      const re = new RegExp(`\\b(${fn})\\b(?=\\s*\\()`, 'g');
      hl = hl.replace(re, '<span class="code-builtin">$1</span>');
    });

    // Numbers
    hl = hl.replace(/\b(\d+\.?\d*)\b/g, '<span class="code-number">$1</span>');

    // Function definitions
    hl = hl.replace(/\b(def\s+)(\w+)/g, '$1<span class="code-function">$2</span>');

    // Class definitions
    hl = hl.replace(/\b(class\s+)(\w+)/g, '$1<span class="code-class">$2</span>');

    return hl;
  }).join('\n');
}

function highlightBash(code: string): string {
  const lines = code.split('\n');
  return lines.map(line => {
    let hl = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    if (/^\s*#/.test(hl)) {
      return `<span class="code-comment">${hl}</span>`;
    }

    // Commands (bash + PowerShell)
    const cmds = ['sudo', 'apt-get', 'install', 'wget', 'tar', 'mv', 'export', 'pip', 'spark-shell', 'pyspark', 'spark-submit', 'cd', 'mkdir', 'echo', 'cat', 'Invoke-WebRequest', 'Move-Item', 'Set-Location', 'winget', 'Expand-Archive'];
    cmds.forEach(cmd => {
      const re = new RegExp(`\\b(${cmd})\\b`, 'g');
      hl = hl.replace(re, '<span class="code-keyword">$1</span>');
    });

    hl = hl.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span class="code-string">$1</span>');

    return hl;
  }).join('\n');
}

export default function CodeBlock({ code, language = 'python', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  const highlighted = (language === 'bash' || language === 'powershell') ? highlightBash(code) : highlightPython(code);

  return (
    <div className="rounded-lg overflow-hidden my-4 border border-slate-700/50 group">
      {title && (
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700/50">
          <span className="text-xs font-medium text-slate-400">{title}</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">{language}</span>
          </div>
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-1.5 rounded-md bg-slate-700/50 hover:bg-slate-600/70 text-slate-400 hover:text-slate-200 transition-all opacity-0 group-hover:opacity-100 z-10"
          title="Copy code"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        </button>
        <pre className="bg-[#0d1117] p-4 overflow-x-auto text-[13px] leading-relaxed">
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </div>
    </div>
  );
}

export function DiagramBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="my-4">
      {title && (
        <div className="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">{title}</div>
      )}
      <div className="diagram-box">{children}</div>
    </div>
  );
}

export function InfoTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-4 rounded-lg border border-slate-700/50">
      <table className="spark-table">
        <thead>
          <tr>
            {headers.map((h, i) => <th key={i}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
