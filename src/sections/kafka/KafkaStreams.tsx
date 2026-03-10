import { DiagramBlock } from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

export default function KafkaStreams() {
  return (
    <section id="kafka-streams" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-kafka bg-kafka/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 7</span>
        <div className="h-px flex-1 bg-gradient-to-r from-kafka/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Kafka Streams</h2>

      <Callout type="info" title="In Plain English">
        <strong>Kafka Streams</strong> is a lightweight Java library (and Kafka Streams API in other ecosystems) for stream processing: read from Kafka, apply map/filter/join/aggregate/window operations, and write results back to Kafka. Use it for real-time aggregations and joins without a separate cluster.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Stream processing operations: <code className="text-slate-300">map</code>, <code className="text-slate-300">filter</code>, <code className="text-slate-300">join</code>, <code className="text-slate-300">aggregate</code>, <code className="text-slate-300">window</code>.
      </p>

      <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-bold text-kafka-light mb-2">Example use case</h4>
        <p className="text-xs text-slate-400">Count orders per minute.</p>
        <DiagramBlock title="Pipeline">
{`orders topic
   ↓
stream processor (aggregate by 1-min window)
   ↓
order_metrics topic`}
        </DiagramBlock>
      </div>

      <p className="text-slate-500 text-xs">
        Kafka Streams is a lightweight library for building stream processing applications that read from and write to Kafka. It integrates with the Kafka ecosystem (Flink, Spark) for more complex pipelines.
      </p>
      <EnhancementBox title="Kafka Streams — enhancements" items={[
        'Build a simple Streams app: read from a topic, filter or map, write to another topic.',
        'Use KStream-KTable join or groupBy and count; run with a local Kafka and verify output.',
        'Explore exactly-once semantics (processing.guarantee=exactly_once_v2) and state stores.',
      ]} />
    </section>
  );
}
