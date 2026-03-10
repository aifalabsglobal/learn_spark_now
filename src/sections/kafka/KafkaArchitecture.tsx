import { DiagramBlock } from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

export default function KafkaArchitecture() {
  return (
    <section id="kafka-architecture" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-kafka bg-kafka/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 2</span>
        <div className="h-px flex-1 bg-gradient-to-r from-kafka/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Kafka Architecture</h2>

      <Callout type="info" title="👋 In Plain English">
        Kafka stores events in <strong>topics</strong>. Each topic is split into <strong>partitions</strong> for parallelism. <strong>Producers</strong> write to topics; <strong>consumers</strong> read from them. <strong>Brokers</strong> are the servers that hold the data. Understanding this layout is key to scaling and tuning Kafka.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        A Kafka cluster is made of brokers (servers), each holding part of the topic data. Topics are divided into partitions so that different consumers can read in parallel and throughput can scale. This section explains the core components, how partitions and consumer groups work, and how to think about partition strategy for high throughput.
      </p>

      <div id="kafka-core-components" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Core Components
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Every Kafka deployment has five main concepts: the <strong className="text-slate-300">broker</strong> (the server process), the <strong className="text-slate-300">topic</strong> (a named stream of events), the <strong className="text-slate-300">partition</strong> (a shard of that stream for parallelism and ordering), the <strong className="text-slate-300">producer</strong> (writes events to a topic), and the <strong className="text-slate-300">consumer</strong> (reads events, often as part of a consumer group). Messages in a partition are ordered; across partitions order is not guaranteed unless you use a consistent key.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-kafka-light mb-2">Broker</h4>
            <p className="text-xs text-slate-400">A Kafka server process. A cluster runs multiple brokers (e.g. Broker1, Broker2, Broker3) for fault tolerance and scale. Each partition has one leader broker and zero or more replicas on other brokers.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-kafka-light mb-2">Topic</h4>
            <p className="text-xs text-slate-400">A logical stream of events. Examples: <code className="text-slate-300">orders</code>, <code className="text-slate-300">payments</code>, <code className="text-slate-300">clickstream</code>, <code className="text-slate-300">logs</code>. Producers send to a topic; consumers subscribe to one or more topics.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-kafka-light mb-2">Partition</h4>
            <p className="text-xs text-slate-400">A topic is split into partitions for scalability and parallelism. Each partition is an ordered, immutable log. More partitions allow more concurrent consumers and higher throughput; messages with the same key go to the same partition (when a key is used).</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
            <h4 className="text-sm font-bold text-kafka-light mb-2">Producer / Consumer</h4>
            <p className="text-xs text-slate-400">Producers write messages to a topic (optionally with a key for partitioning). Consumers read from topics, often in a <strong className="text-slate-300">consumer group</strong>: each partition is consumed by only one member of the group, so the group scales with partition count.</p>
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
          For a workload of <strong className="text-slate-300">10 million events per minute</strong>, design a partition strategy. Consider: how many partitions you need (throughput and consumer parallelism), how many consumer groups (and what each group does), and what replication factor (typically 2 or 3 for production). Explain trade-offs: too few partitions limits consumer parallelism; too many increases overhead and latency. Deliverable: a short write-up with your reasoning and a simple diagram if helpful.
        </p>
        <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
          <li><strong className="text-slate-300">Partition count</strong> — Drive by max concurrent consumers and target throughput per partition.</li>
          <li><strong className="text-slate-300">Consumer groups</strong> — One group per logical consumer application; each group gets a copy of the stream.</li>
          <li><strong className="text-slate-300">Replication factor</strong> — At least 2 for durability; 3 is common in production so one broker can fail without losing availability.</li>
        </ul>
        <EnhancementBox title="Architecture — enhancements" items={[
          'Create a topic with 3 partitions and replication factor 1 (or 2 if multi-broker); describe it with kafka-topics.sh.',
          'Produce 10 messages with keys and without; observe how keys map to partitions (same key → same partition).',
          'Run two consumers in the same group and verify each partition is assigned to one consumer.',
        ]} />
      </div>
    </section>
  );
}
