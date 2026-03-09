import { DiagramBlock } from '../../components/CodeBlock';
import Callout from '../../components/Callout';

export default function KafkaReplication() {
  return (
    <section id="kafka-replication" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-kafka bg-kafka/10 px-3 py-1 rounded-full uppercase tracking-wider">Week 6</span>
        <div className="h-px flex-1 bg-gradient-to-r from-kafka/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Replication & Fault Tolerance</h2>

      <Callout type="info" title="In Plain English">
        Each partition has one <strong>leader</strong> (handles reads and writes) and one or more <strong>followers</strong> that replicate the log. If the leader fails, a follower is elected leader so the cluster stays available without data loss (when replication factor is 2 or more).
      </Callout>

      <p className="text-slate-400 text-sm mb-6">
        Each partition has a <strong className="text-slate-300">leader</strong> and one or more <strong className="text-slate-300">followers</strong>. The leader handles reads and writes; followers replicate the log.
      </p>

      <DiagramBlock title="Partition 0 replication">
{`Partition 0
├── Leader  → Broker 1 (handles reads & writes)
├── Follower → Broker 2
└── Follower → Broker 3`}
      </DiagramBlock>

      <div id="kafka-failure-simulation" className="mt-12">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-kafka rounded-full" />
          Assignment — Failure Simulation
        </h3>
        <ul className="text-sm text-slate-400 space-y-1 list-decimal list-inside">
          <li>Stop one broker in your Docker cluster.</li>
          <li>Observe leader election (check logs or describe topic).</li>
          <li>Verify consumers continue reading without data loss.</li>
        </ul>
      </div>
    </section>
  );
}
