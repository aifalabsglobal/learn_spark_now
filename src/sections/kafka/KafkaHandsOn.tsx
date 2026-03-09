import CodeBlock from '../../components/CodeBlock';

export default function KafkaHandsOn() {
  return (
    <section id="kafka-handson" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-kafka bg-kafka/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 3</span>
        <div className="h-px flex-1 bg-gradient-to-r from-kafka/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Installing & Running Kafka (Docker)</h2>

      <div id="kafka-docker-install" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Step 1 — Install Docker
        </h3>
        <p className="text-slate-400 text-sm mb-4">Check installation:</p>
        <CodeBlock title="Verify Docker" code="docker --version" language="bash" />
      </div>

      <div id="kafka-docker-start" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Step 2 — Start Kafka
        </h3>
        <p className="text-slate-400 text-sm mb-4">Create <code className="text-slate-300">docker-compose.yml</code> and run:</p>
        <CodeBlock
          title="docker-compose.yml"
          code={`version: '3'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1`}
        />
        <CodeBlock title="Start services" code="docker-compose up -d" language="bash" />
        <p className="text-slate-500 text-xs mt-2">Kafka and Zookeeper will start in the background.</p>
      </div>

      <div id="kafka-verify" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Step 3 — Verify Kafka
        </h3>
        <CodeBlock title="Check containers" code="docker ps" language="bash" />
      </div>

      <div id="kafka-create-topic" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Step 4 — Create Topic
        </h3>
        <p className="text-slate-400 text-sm mb-4">Run inside the Kafka container (or use local kafka-topics script):</p>
        <CodeBlock
          title="Create topic 'orders'"
          code={`kafka-topics.sh \\
--create \\
--topic orders \\
--bootstrap-server localhost:9092 \\
--partitions 3 \\
--replication-factor 1`}
          language="bash"
        />
      </div>

      <div id="kafka-produce" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Step 5 — Produce Messages
        </h3>
        <CodeBlock
          title="Start console producer"
          code={`kafka-console-producer.sh \\
--topic orders \\
--bootstrap-server localhost:9092`}
          language="bash"
        />
        <p className="text-slate-400 text-sm mt-4">Then type and send messages, e.g.: <code className="text-slate-300">order_1</code>, <code className="text-slate-300">order_2</code>, <code className="text-slate-300">order_3</code>.</p>
      </div>

      <div id="kafka-consume" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Step 6 — Consume Messages
        </h3>
        <CodeBlock
          title="Start console consumer (from beginning)"
          code={`kafka-console-consumer.sh \\
--topic orders \\
--from-beginning \\
--bootstrap-server localhost:9092`}
          language="bash"
        />
      </div>
    </section>
  );
}
