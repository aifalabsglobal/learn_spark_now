import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import { DiagramBlock } from '../../components/CodeBlock';

export default function KafkaProducersConsumers() {
  return (
    <section id="kafka-producers-consumers" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-kafka bg-kafka/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 4</span>
        <div className="h-px flex-1 bg-gradient-to-r from-kafka/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Producers and Consumers</h2>

      <Callout type="info" title="In Plain English">
        <strong>Producers</strong> send messages to topics; <strong>consumers</strong> read from topics, often in a group so each partition is processed by one consumer. Partition is chosen by key (same key → same partition) or round-robin when no key is set.
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Use the Kafka client library for your language (e.g. kafka-python) to create a producer and consumer. Call send() with topic and payload; call poll() or iterate in a loop to consume. Flush the producer before exit to ensure all messages are delivered.
      </p>

      <div id="kafka-producer-workflow" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Producer Workflow
        </h3>
        <DiagramBlock title="Flow">
{`Application
   ↓
Kafka Producer API
   ↓
Topic partition`}
        </DiagramBlock>
        <p className="text-slate-400 text-sm mt-4">
          Partition is chosen by: <strong className="text-slate-300">key hashing</strong>, <strong className="text-slate-300">round robin</strong> (no key), or a <strong className="text-slate-300">custom partitioner</strong>.
        </p>
      </div>

      <div id="kafka-python-producer" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Python Producer Example
        </h3>
        <p className="text-slate-400 text-sm mb-4">Install: <code className="text-slate-300">pip install kafka-python</code></p>
        <CodeBlock
          title="Producer"
          code={`from kafka import KafkaProducer

producer = KafkaProducer(bootstrap_servers='localhost:9092')

producer.send('orders', b'order123')
producer.flush()`}
          language="python"
        />
      </div>

      <div id="kafka-python-consumer" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Python Consumer Example
        </h3>
        <CodeBlock
          title="Consumer"
          code={`from kafka import KafkaConsumer

consumer = KafkaConsumer('orders', bootstrap_servers='localhost:9092')

for msg in consumer:
    print(msg.value)`}
          language="python"
        />
      </div>

      <div id="kafka-order-pipeline-assignment" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Assignment — Build Order Pipeline
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          System: <strong className="text-slate-300">Order Service → Kafka → Notification Service</strong>.
        </p>
        <ul className="text-sm text-slate-400 space-y-1 list-decimal list-inside">
          <li>Write a producer that sends order events.</li>
          <li>Write a consumer that sends notifications (e.g. log or email).</li>
          <li>Simulate 1000 orders and verify end-to-end.</li>
        </ul>
</div>
    </section>
  );
}
