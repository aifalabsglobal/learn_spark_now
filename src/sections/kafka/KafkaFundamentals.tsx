import { DiagramBlock } from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

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

      <p className="text-slate-400 text-sm mb-6">
        Apache Kafka is a distributed event streaming platform originally built at LinkedIn and now used by thousands of companies for real-time data pipelines, activity tracking, log aggregation, and stream processing. Understanding <strong className="text-slate-300">why</strong> it exists and <strong className="text-slate-300">when</strong> to use it is the foundation for the rest of the course.
      </p>

      <div id="kafka-why-exists" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Why Kafka Exists
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Before event streaming, most systems used <strong className="text-slate-300">batch ETL</strong> or <strong className="text-slate-300">direct point-to-point</strong> messaging. Data was extracted on a schedule (e.g. nightly), transformed, and loaded into a warehouse. Applications often talked directly to databases or to each other via REST or message queues. That led to several problems at scale.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-kafka-light mb-2">Traditional system (problems)</h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li><strong className="text-slate-300">High latency</strong> — Batch ETL runs on a schedule (hourly, daily), so data is never real-time. Decisions based on &quot;last night&apos;s load&quot; can&apos;t react to what&apos;s happening now.</li>
            <li><strong className="text-slate-300">Tight coupling</strong> — Apps talk directly to the database or to each other. Adding a new consumer (e.g. a fraud-detection service that needs every order) means changing the pipeline, redeploying producers, or giving every service direct DB access.</li>
            <li><strong className="text-slate-300">Scaling difficulty</strong> — Databases become bottlenecks when many services read and write. Replication and sharding help but don’t solve the fundamental mismatch: databases are for &quot;current state&quot;, not for high-throughput streams of events.</li>
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
          <strong className="text-slate-300">Benefits of streaming:</strong> Events are written once to a log; many consumers can read at their own pace (asynchronous processing). Producers and consumers scale independently. The log is replicated for fault tolerance. New consumers can join without changing producers — true decoupling.
        </p>
      </div>

      <div id="kafka-event-modeling" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Assignment 1 — Event Modeling
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Before writing code, you need to design your events. <strong className="text-slate-300">Event modeling</strong> means deciding what happened (the event name), what data it carries (the schema), and how it relates to other events. For an e-commerce system, orders and payments are natural events; the goal is to make them clear, consistent, and easy for multiple teams to consume.
        </p>
        <p className="text-slate-400 text-sm mb-4">
          Design events for an <strong className="text-slate-300">e-commerce system</strong>. For each event, define its name, key fields, and when it is produced (e.g. &quot;when the user clicks Place Order&quot;). Create at least the four events below and give a short schema for each.
        </p>
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-kafka-light mb-2">Events to define</h4>
          <ul className="text-xs text-slate-400 space-y-1">
            <li><code className="text-slate-300">order_created</code> — Fired when the customer submits an order.</li>
            <li><code className="text-slate-300">payment_processed</code> — Fired when payment is confirmed (card, wallet, etc.).</li>
            <li><code className="text-slate-300">shipment_dispatched</code> — Fired when the order leaves the warehouse.</li>
            <li><code className="text-slate-300">delivery_completed</code> — Fired when the delivery is marked complete.</li>
          </ul>
          <h4 className="text-sm font-bold text-kafka-light mt-3 mb-2">Example schema: order_created</h4>
          <p className="text-xs text-slate-400 mb-2">Include enough fields for analytics, fulfillment, and downstream services. Use a unique <code className="text-slate-300">order_id</code> as the Kafka message key so all events for the same order go to the same partition.</p>
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
          For each domain below, think about <strong className="text-slate-300">what events</strong> are produced, <strong className="text-slate-300">who consumes them</strong>, and <strong className="text-slate-300">why streaming</strong> beats batch. Your deliverable: a short explanation and an <strong className="text-slate-300">architecture diagram</strong> (producers → topics → consumers) for at least two of the five.
        </p>
        <ul className="text-sm text-slate-400 space-y-2 list-decimal list-inside">
          <li><strong className="text-slate-300">Banking fraud detection</strong> — Transactions as events; real-time rules and ML models consume the stream to block or flag suspicious activity.</li>
          <li><strong className="text-slate-300">Uber ride tracking</strong> — Location and status events; drivers, riders, and pricing services consume the same stream.</li>
          <li><strong className="text-slate-300">Netflix viewing analytics</strong> — Play, pause, and completion events; recommendations and analytics pipelines read the stream.</li>
          <li><strong className="text-slate-300">Stock trading systems</strong> — Trades and quotes as events; risk, reporting, and market data consumers need low-latency, ordered streams.</li>
          <li><strong className="text-slate-300">IoT monitoring</strong> — Sensor readings as events; alerting, dashboards, and batch storage consume from the same topics.</li>
        </ul>
        <EnhancementBox title="Kafka fundamentals — enhancements" items={[
          'Sketch an event schema for order_created (fields, types, key) and explain why order_id as key helps ordering.',
          'Draw a simple diagram: one producer → one topic → two consumers (e.g. analytics and notifications).',
          'Read the Apache Kafka introduction on kafka.apache.org and note the three main APIs (Producer, Consumer, Streams).',
        ]} />
      </div>
    </section>
  );
}
