import { DiagramBlock } from '../../components/CodeBlock';

export default function KafkaArchitecture() {
  return (
    <section id="kafka-architecture" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-kafka bg-kafka/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 2</span>
        <div className="h-px flex-1 bg-gradient-to-r from-kafka/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Kafka Architecture</h2>

      <div id="kafka-core-components" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Core Components
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          A Kafka cluster consists of: <strong className="text-slate-300">Producer</strong>, <strong className="text-slate-300">Topic</strong>, <strong className="text-slate-300">Partition</strong>, <strong className="text-slate-300">Broker</strong>, <strong className="text-slate-300">Consumer</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-kafka-light mb-2">Broker</h4>
            <p className="text-xs text-slate-400">Kafka server node. A cluster runs multiple brokers (e.g. Broker1, Broker2, Broker3).</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-kafka-light mb-2">Topic</h4>
            <p className="text-xs text-slate-400">Logical stream of events. Examples: orders, payments, clickstream, logs.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-kafka-light mb-2">Partition</h4>
            <p className="text-xs text-slate-400">Used for scalability and parallelism. A topic can have multiple partitions (e.g. partition 0, 1, 2, 3).</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-kafka-light mb-2">Producer / Consumer</h4>
            <p className="text-xs text-slate-400">Producers write to topics; consumers read from topics (often in consumer groups).</p>
          </div>
        </div>

        <DiagramBlock title="Topic with partitions">
{`orders topic
├── partition 0
├── partition 1
├── partition 2
└── partition 3`}
        </DiagramBlock>
      </div>

      <div id="kafka-partition-strategy" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Assignment 3 — Partition Strategy
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Design a partition strategy for <strong className="text-slate-300">10 million events per minute</strong>. Consider:
        </p>
        <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
          <li>Partition count</li>
          <li>Consumer groups</li>
          <li>Replication factor</li>
        </ul>
        <p className="text-slate-500 text-xs mt-2">Explain your reasoning in a short write-up.</p>
      </div>
    </section>
  );
}
