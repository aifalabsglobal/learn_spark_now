import { DiagramBlock } from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

export default function KafkaProduction() {
  return (
    <section id="kafka-production" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-kafka bg-kafka/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 8</span>
        <div className="h-px flex-1 bg-gradient-to-r from-kafka/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Production Architecture</h2>

      <Callout type="info" title="In Plain English">
        In production, Kafka is the <strong>event backbone</strong>: microservices publish and subscribe; stream processors (Flink, Spark, Kafka Streams) transform and load into data lakes, warehouses, and ML pipelines. Add Schema Registry, monitoring, and multi-region replication for scale and reliability.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Real production pipelines combine Kafka with <strong className="text-slate-300">Flink</strong>, <strong className="text-slate-300">Spark</strong>, data lakes, warehouses, and ML models.
      </p>

      <DiagramBlock title="Example production architecture">
{`Microservices
     ↓
Kafka (event backbone)
     ↓
Stream processing (Flink / Spark)
     ↓
Real-time analytics · Data lake · Warehouse · ML`}
      </DiagramBlock>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
          <h4 className="text-sm font-bold text-kafka-light mb-2">Typical components</h4>
          <ul className="text-xs text-slate-400 space-y-1">
            <li>Schema Registry (Avro/JSON)</li>
            <li>Kafka Connect (connectors)</li>
            <li>Monitoring (lag, throughput, latency)</li>
            <li>Multi-region / MirrorMaker for DR</li>
          </ul>
        </div>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4">
          <h4 className="text-sm font-bold text-kafka-light mb-2">FAANG-style roles</h4>
          <p className="text-xs text-slate-400">This course targets <strong className="text-slate-300">Streaming Data Engineer</strong>, <strong className="text-slate-300">Platform Engineer</strong>, and <strong className="text-slate-300">Distributed Systems</strong> interviews where Kafka is commonly discussed.</p>
        </div>
        <EnhancementBox title="Production — enhancements" items={[
          'Design a topic strategy for a multi-tenant SaaS (one topic per tenant vs shared with key).',
          'List monitoring metrics: lag, throughput, broker disk; try Kafka JMX or Prometheus exporter.',
          'Read about Kafka vs Flink/Spark Streaming for stateful processing and exactly-once.',
        ]} />
      </div>
    </section>
  );
}
