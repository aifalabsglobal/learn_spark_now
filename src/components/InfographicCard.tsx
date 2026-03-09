import { ReactNode } from 'react';

interface InfographicCardProps {
  title?: string;
  caption?: string;
  children: ReactNode;
  className?: string;
}

export default function InfographicCard({ title, caption, children, className = '' }: InfographicCardProps) {
  return (
    <figure className={`my-6 rounded-xl overflow-hidden border border-slate-700/50 bg-slate-800/30 ${className}`}>
      {title && (
        <figcaption className="px-4 py-2 border-b border-slate-700/50 text-sm font-semibold text-spark-light">
          {title}
        </figcaption>
      )}
      <div className="p-4 flex justify-center items-center min-h-[140px] bg-slate-900/50">
        {children}
      </div>
      {caption && (
        <figcaption className="px-4 py-2 text-xs text-slate-500 border-t border-slate-700/50">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Inline SVG: Spark high-level stack (Core, SQL, Streaming, ML, Graph) */
export function SparkStackInfographic() {
  return (
    <InfographicCard title="Spark ecosystem at a glance" caption="Five libraries on top of Spark Core.">
      <svg viewBox="0 0 320 120" className="w-full max-w-md h-auto" aria-hidden>
        <rect x="10" y="50" width="60" height="40" rx="6" fill="#0ea5e9" opacity="0.9" />
        <text x="40" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Core</text>
        <text x="40" y="88" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9">RDD, Scheduler</text>
        <rect x="80" y="50" width="60" height="40" rx="6" fill="#22c55e" opacity="0.9" />
        <text x="110" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">SQL</text>
        <text x="110" y="88" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9">DataFrames</text>
        <rect x="150" y="50" width="60" height="40" rx="6" fill="#a855f7" opacity="0.9" />
        <text x="180" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Streaming</text>
        <text x="180" y="88" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9">Real-time</text>
        <rect x="220" y="50" width="60" height="40" rx="6" fill="#eab308" opacity="0.9" />
        <text x="250" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">MLlib</text>
        <text x="250" y="88" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9">Machine Learning</text>
        <rect x="250" y="50" width="60" height="40" rx="6" fill="#ef4444" opacity="0.9" />
        <text x="280" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">GraphX</text>
        <text x="280" y="88" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9">Graphs</text>
        <rect x="80" y="10" width="160" height="28" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <text x="160" y="28" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">Apache Spark Core Engine</text>
      </svg>
    </InfographicCard>
  );
}

/** Inline SVG: Batch vs streaming flow */
export function DataFlowInfographic() {
  return (
    <InfographicCard title="Batch vs streaming data flow" caption="Batch: one big job. Streaming: continuous micro-batches.">
      <svg viewBox="0 0 300 100" className="w-full max-w-md h-auto" aria-hidden>
        <text x="70" y="22" textAnchor="middle" fill="#94a3b8" fontSize="10">BATCH</text>
        <path d="M 20 35 L 55 35 L 85 35 L 115 35 L 145 35" stroke="#0ea5e9" strokeWidth="2" fill="none" />
        <circle cx="20" cy="35" r="5" fill="#0ea5e9" />
        <circle cx="55" cy="35" r="5" fill="#0ea5e9" />
        <circle cx="85" cy="35" r="5" fill="#0ea5e9" />
        <circle cx="115" cy="35" r="5" fill="#0ea5e9" />
        <circle cx="145" cy="35" r="5" fill="#22c55e" />
        <text x="82" y="55" textAnchor="middle" fill="#64748b" fontSize="8">Read → Transform → Write (once)</text>
        <text x="250" y="22" textAnchor="middle" fill="#94a3b8" fontSize="10">STREAMING</text>
        <path d="M 155 35 L 190 35 L 225 35 L 260 35 L 280 35" stroke="#a855f7" strokeWidth="2" fill="none" strokeDasharray="4 2" />
        <circle cx="155" cy="35" r="5" fill="#a855f7" />
        <circle cx="190" cy="35" r="5" fill="#a855f7" />
        <circle cx="225" cy="35" r="5" fill="#a855f7" />
        <circle cx="260" cy="35" r="5" fill="#a855f7" />
        <circle cx="280" cy="35" r="5" fill="#22c55e" />
        <text x="217" y="55" textAnchor="middle" fill="#64748b" fontSize="8">Continuous micro-batches</text>
      </svg>
    </InfographicCard>
  );
}
