import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const SECTIONS = [
  { title: 'Kafka Fundamentals (20)', ids: Array.from({ length: 20 }, (_, i) => i + 1) },
  { title: 'Kafka Internals (20)', ids: Array.from({ length: 20 }, (_, i) => 21 + i) },
  { title: 'Producers (15)', ids: Array.from({ length: 15 }, (_, i) => 41 + i) },
  { title: 'Consumers (15)', ids: Array.from({ length: 15 }, (_, i) => 56 + i) },
  { title: 'Streaming & Processing (15)', ids: Array.from({ length: 15 }, (_, i) => 71 + i) },
  { title: 'Architecture & Design (15)', ids: Array.from({ length: 15 }, (_, i) => 86 + i) },
];

const QUESTIONS: Record<number, string> = {
  1: 'What is Kafka?',
  2: 'Why was Kafka created?',
  3: 'What problems does Kafka solve?',
  4: 'Difference between queue and stream?',
  5: 'What is a topic?',
  6: 'What is a partition?',
  7: 'What is a broker?',
  8: 'What is a producer?',
  9: 'What is a consumer?',
  10: 'What is a consumer group?',
  11: 'What is an offset?',
  12: 'What is message ordering in Kafka?',
  13: 'What is retention policy?',
  14: 'What is log compaction?',
  15: 'What is Kafka throughput?',
  16: 'Why is Kafka fast?',
  17: 'Difference between Kafka and RabbitMQ?',
  18: 'Difference between Kafka and Pulsar?',
  19: 'When should Kafka not be used?',
  20: 'What is event-driven architecture?',
  21: 'How does Kafka store data?',
  22: 'What is Kafka commit log?',
  23: 'What are segment files?',
  24: 'What is zero-copy transfer?',
  25: 'What is page cache?',
  26: 'How does Kafka achieve high throughput?',
  27: 'What is leader election?',
  28: 'What is ISR (in-sync replica)?',
  29: 'What happens if leader fails?',
  30: 'What is unclean leader election?',
  31: 'How does replication work?',
  32: 'What is min.insync.replicas?',
  33: 'What happens when ISR shrinks?',
  34: 'What is controller broker?',
  35: 'What is Zookeeper used for?',
  36: 'What is KRaft mode?',
  37: 'How does Kafka maintain ordering?',
  38: 'What is partition rebalancing?',
  39: 'What is consumer lag?',
  40: 'How to monitor Kafka health?',
  41: 'What is producer batching?',
  42: 'What is linger.ms?',
  43: 'What is batch.size?',
  44: 'What is compression in Kafka?',
  45: 'What is idempotent producer?',
  46: 'What is producer acks?',
  47: 'Difference between acks=0, 1, all?',
  48: 'What is retry mechanism?',
  49: 'What is producer partitioning strategy?',
  50: 'What is custom partitioner?',
  51: 'How to ensure ordering?',
  52: 'How to ensure durability?',
  53: 'What is producer buffer memory?',
  54: 'What is record accumulator?',
  55: 'What is transactional producer?',
  56: 'How do consumers read messages?',
  57: 'What is auto commit?',
  58: 'What is manual commit?',
  59: 'What is rebalance?',
  60: 'What triggers rebalance?',
  61: 'What is sticky assignor?',
  62: 'What is range assignor?',
  63: 'What is cooperative rebalance?',
  64: 'What is consumer lag?',
  65: 'How to scale consumers?',
  66: 'What happens if consumer crashes?',
  67: 'What is max.poll.interval?',
  68: 'What is fetch.min.bytes?',
  69: 'What is poll loop?',
  70: 'How to process messages safely?',
  71: 'What is Kafka Streams?',
  72: 'Difference between Kafka Streams and Spark Streaming?',
  73: 'What is windowing?',
  74: 'What is tumbling window?',
  75: 'What is sliding window?',
  76: 'What is stream join?',
  77: 'What is state store?',
  78: 'What is changelog topic?',
  79: 'What is exactly-once semantics?',
  80: 'What is at-least-once processing?',
  81: 'What is at-most-once processing?',
  82: 'What is event time vs processing time?',
  83: 'What is watermark?',
  84: 'What is stream-table join?',
  85: 'What is stream-stream join?',
  86: 'How to design Kafka for 1M events/sec?',
  87: 'How to design Kafka for global scale?',
  88: 'How many partitions should a topic have?',
  89: 'How to handle schema evolution?',
  90: 'What is schema registry?',
  91: 'How to secure Kafka?',
  92: 'How to monitor Kafka cluster?',
  93: 'How to tune Kafka performance?',
  94: 'How to scale Kafka cluster?',
  95: 'What is MirrorMaker?',
  96: 'How to replicate across regions?',
  97: 'What is event sourcing?',
  98: 'What is CQRS architecture?',
  99: 'How to build real-time ML pipeline with Kafka?',
  100: 'Design Uber ride event streaming system.',
};

export default function KafkaInterview() {
  const [openSection, setOpenSection] = useState<string | null>(SECTIONS[0].title);

  return (
    <section id="kafka-interview" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-kafka bg-kafka/10 px-3 py-1 rounded-full uppercase tracking-wider">FAANG Prep</span>
        <div className="h-px flex-1 bg-gradient-to-r from-kafka/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">100 Kafka Interview Questions</h2>
      <p className="text-slate-400 text-sm mb-6">
        Commonly asked by <strong className="text-slate-300">Uber, Netflix, LinkedIn, Amazon, Databricks, Confluent</strong> for Streaming Data Engineer / Platform Engineer / Distributed Systems roles.
      </p>

      <div className="space-y-2">
        {SECTIONS.map((sec) => (
          <div key={sec.title} className="bg-slate-800/40 border border-slate-700/40 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenSection(openSection === sec.title ? null : sec.title)}
              className="w-full flex items-center gap-2 px-4 py-3 text-left text-sm font-medium text-slate-200 hover:bg-slate-700/30 transition-colors"
            >
              {openSection === sec.title ? <ChevronDown size={16} className="text-kafka" /> : <ChevronRight size={16} className="text-slate-500" />}
              {sec.title}
            </button>
            {openSection === sec.title && (
              <div className="px-4 pb-4 pt-0 border-t border-slate-700/50">
                <ol className="list-decimal list-inside text-xs text-slate-400 space-y-1.5 mt-2">
                  {sec.ids.map((n) => (
                    <li key={n} className="pl-1">
                      <span className="text-slate-300">{QUESTIONS[n] ?? `Q${n}`}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
</div>
    </section>
  );
}
