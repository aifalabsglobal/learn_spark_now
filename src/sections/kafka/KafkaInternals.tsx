import { DiagramBlock } from '../../components/CodeBlock';

export default function KafkaInternals() {
  return (
    <section id="kafka-internals" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-kafka bg-kafka/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 5</span>
        <div className="h-px flex-1 bg-gradient-to-r from-kafka/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Kafka Internals</h2>

      <p className="text-slate-400 text-sm mb-6">
        Kafka works as a <strong className="text-slate-300">distributed commit log</strong>. Data is stored sequentially for high throughput.
      </p>

      <DiagramBlock title="Storage structure">
{`Topic
   ↓
Partition
   ↓
Log segments (e.g. 000000000.log, 000000001.log)`}
      </DiagramBlock>

      <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mt-6">
        <h4 className="text-sm font-bold text-kafka-light mb-2">Why Kafka is fast</h4>
        <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
          <li><strong className="text-slate-300">Sequential disk writes</strong> — appending is much faster than random I/O.</li>
          <li><strong className="text-slate-300">OS page cache</strong> — brokers rely on the OS to cache hot data in memory.</li>
          <li><strong className="text-slate-300">Zero-copy transfer</strong> — sendfile() avoids copying data to user space.</li>
        </ul>
        <p className="text-slate-500 text-xs mt-2">These mechanisms enable <strong className="text-slate-400">millions of messages per second</strong> throughput.</p>
      </div>
    </section>
  );
}
