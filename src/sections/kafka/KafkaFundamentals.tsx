import { DiagramBlock } from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function KafkaFundamentals() {
  return (
    <section id="kafka-fundamentals" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-kafka bg-kafka/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 1</span>
        <div className="h-px flex-1 bg-gradient-to-r from-kafka/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Event Streaming Fundamentals</h2>

      <Callout type="info" title="👋 In Plain English">
        Kafka is a system that lets applications send and receive <strong>streams of events</strong> (like &quot;order placed&quot;, &quot;payment done&quot;) in real time. Many programs can read the same stream without blocking each other — like a live news feed that many people can watch at once.
      </Callout>

      <div id="kafka-why-exists" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Why Kafka Exists
        </h3>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-kafka-light mb-2">Traditional system (problems)</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li><strong className="text-slate-300">High latency</strong> — batch ETL runs on a schedule, so data is never real-time.</li>
            <li><strong className="text-slate-300">Tight coupling</strong> — apps talk directly to the database; adding a new consumer means changing the pipeline.</li>
            <li><strong className="text-slate-300">Scaling difficulty</strong> — databases become bottlenecks when many services read/write.</li>
          </ul>
        </div>

        <DiagramBlock title="Traditional vs Streaming">
{`Traditional:
Application → Database → Batch ETL → Analytics
(high latency, tight coupling)

Streaming with Kafka:
Application
   ↓
Kafka
   ↓
Multiple consumers (async, scalable, fault-tolerant)`}
        </DiagramBlock>

        <p className="text-slate-400 text-sm mt-4">
          <strong className="text-slate-300">Benefits of streaming:</strong> asynchronous processing, independent scaling of producers and consumers, fault tolerance via replicated logs, and decoupling so new consumers can join without changing producers.
        </p>
      </div>

      <div id="kafka-event-modeling" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Assignment 1 — Event Modeling
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Design events for an <strong className="text-slate-300">e-commerce system</strong>. Create events and define their schema.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-kafka-light mb-2">Events to define</h4>
          <ul className="text-xs text-slate-400 space-y-1">
            <li><code className="text-slate-300">order_created</code></li>
            <li><code className="text-slate-300">payment_processed</code></li>
            <li><code className="text-slate-300">shipment_dispatched</code></li>
            <li><code className="text-slate-300">delivery_completed</code></li>
          </ul>
          <h4 className="text-sm font-bold text-kafka-light mt-3 mb-2">Example schema: order_created</h4>
          <pre className="text-xs text-slate-400 font-mono bg-slate-900/50 p-3 rounded">
{`order_id
user_id
items
amount
timestamp`}
          </pre>
        </div>
      </div>

      <div id="kafka-use-cases" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Assignment 2 — Streaming Use Case Analysis
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Explain how streaming works for these domains. Deliverable: <strong className="text-slate-300">architecture diagrams</strong>.
        </p>
        <ul className="text-sm text-slate-400 space-y-2 list-decimal list-inside">
          <li>Banking fraud detection</li>
          <li>Uber ride tracking</li>
          <li>Netflix viewing analytics</li>
          <li>Stock trading systems</li>
          <li>IoT monitoring</li>
        </ul>
      </div>
    </section>
  );
}
