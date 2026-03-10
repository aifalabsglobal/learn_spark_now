import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import EnhancementBox from '../../components/EnhancementBox';

export default function KafkaHandsOn() {
  return (
    <section id="kafka-handson" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-kafka bg-kafka/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 3</span>
        <div className="h-px flex-1 bg-gradient-to-r from-kafka/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Installing & Running Kafka (Docker)</h2>

      <Callout type="info" title="👋 In Plain English">
        You’ll run Kafka and Zookeeper in Docker, create a topic, then produce and consume messages from the command line. Once this works, you can switch to writing producers and consumers in code (e.g. Python or Java).
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Kafka traditionally depends on Zookeeper for cluster coordination (in newer Kafka versions, KRaft mode can replace Zookeeper). For local learning, running both in Docker is the fastest way to get a working cluster. Follow the steps below in order: install Docker, start the stack, verify, create a topic, then produce and consume messages.
      </p>

      <div id="kafka-docker-install" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Step 1 — Install Docker
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Install Docker Desktop (or the Docker engine on Linux) from the official site. Ensure the Docker daemon is running and that you can run <code className="text-slate-300">docker</code> from a terminal. This lab uses <code className="text-slate-300">docker-compose</code> to start Zookeeper and Kafka together.
        </p>
        <CodeBlock title="Verify Docker" code="docker --version" language="bash" />
      </div>

      <div id="kafka-docker-start" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Step 2 — Start Kafka
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Create a file <code className="text-slate-300">docker-compose.yml</code> in a folder (e.g. <code className="text-slate-300">kafka-lab</code>) with the content below. Zookeeper runs on port 2181; Kafka advertises itself on <code className="text-slate-300">localhost:9092</code> so your host can connect. <code className="text-slate-300">KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1</code> is fine for a single-broker dev setup.
        </p>
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
        <p className="text-slate-400 text-sm mt-2">Kafka and Zookeeper start in the background. Use <code className="text-slate-300">docker-compose logs -f kafka</code> to watch the broker log until it is ready.</p>
      </div>

      <div id="kafka-verify" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Step 3 — Verify Kafka
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Confirm both containers are running. You should see <code className="text-slate-300">zookeeper</code> and <code className="text-slate-300">kafka</code> (or similar names) with status &quot;Up&quot;. If Kafka exits, check Zookeeper is up first and that port 9092 is not in use.
        </p>
        <CodeBlock title="Check containers" code="docker ps" language="bash" />
      </div>

      <div id="kafka-create-topic" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Step 4 — Create Topic
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Run the Kafka topic script inside the Kafka container (or use a local Confluent install). Create a topic named <code className="text-slate-300">orders</code> with 3 partitions and replication factor 1 (single broker). For production you’d use a higher replication factor.
        </p>
        <CodeBlock
          title="Create topic 'orders' (from host or inside Kafka container)"
          code={`kafka-topics.sh \\
--create \\
--topic orders \\
--bootstrap-server localhost:9092 \\
--partitions 3 \\
--replication-factor 1`}
          language="bash"
        />
        <p className="text-slate-400 text-sm mt-2">Run this from the host if you have Kafka tools on PATH, or run <code className="text-slate-300">docker exec -it &lt;kafka-container-name&gt; bash</code> and then run the same command inside the container with <code className="text-slate-300">--bootstrap-server localhost:9092</code>.</p>
      </div>

      <div id="kafka-produce" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Step 5 — Produce Messages
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Start the console producer. Each line you type and press Enter is sent as one message to the <code className="text-slate-300">orders</code> topic. Without a key, messages are round-robined across partitions. Try a few lines (e.g. <code className="text-slate-300">order_1</code>, <code className="text-slate-300">order_2</code>, <code className="text-slate-300">order_3</code>), then leave it running and open a second terminal for the consumer.
        </p>
        <CodeBlock
          title="Start console producer"
          code={`kafka-console-producer.sh \\
--topic orders \\
--bootstrap-server localhost:9092`}
          language="bash"
        />
      </div>

      <div id="kafka-consume" className="mb-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Step 6 — Consume Messages
        </h3>
        <p className="text-slate-400 text-sm mb-4">
          Start the console consumer with <code className="text-slate-300">--from-beginning</code> to read all messages in the topic from the start. You should see the lines you produced. Without <code className="text-slate-300">--from-beginning</code>, the consumer only sees new messages from the time it starts. Use Ctrl+C to stop the consumer.
        </p>
        <CodeBlock
          title="Start console consumer (from beginning)"
          code={`kafka-console-consumer.sh \\
--topic orders \\
--from-beginning \\
--bootstrap-server localhost:9092`}
          language="bash"
        />
        <EnhancementBox title="Hands-on — enhancements" items={[
          'Run Kafka in Docker (or Confluent), create a topic, produce and consume with console tools.',
          'Produce 100 messages with a key; consume with --from-beginning and check partition distribution.',
          'Use kafka-topics.sh --describe to see partition count, replication, and leader distribution.',
        ]} />
      </div>
    </section>
  );
}
