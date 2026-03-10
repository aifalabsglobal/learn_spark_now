import Callout from '../../components/Callout';

export default function KafkaAssignments() {
  const assignments = [
    { week: 1, title: 'Event Modeling', desc: 'Design events and schemas for e-commerce (order_created, payment_processed, etc.).' },
    { week: 1, title: 'Streaming Use Cases', desc: 'Architecture diagrams for banking fraud, Uber, Netflix, stock trading, IoT.' },
    { week: 2, title: 'Partition Strategy', desc: 'Design for 10M events/min: partition count, consumer groups, replication factor.' },
    { week: 4, title: 'Order Pipeline', desc: 'Producer → Kafka → Notification consumer; simulate 1000 orders.' },
    { week: 6, title: 'Failure Simulation', desc: 'Stop a broker, observe leader election, verify consumer behavior.' },
  ];

  return (
    <section id="kafka-assignments" className="mb-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xs font-bold text-kafka bg-kafka/10 px-3 py-1 rounded-full uppercase tracking-wider">Labs</span>
        <div className="h-px flex-1 bg-gradient-to-r from-kafka/30 to-transparent" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-6">Kafka Course Assignments</h2>
      <Callout type="info" title="Hands-on">
        Complete these assignments as you go through the 8-week curriculum. Total duration: <strong>6–8 weeks (60–80 hours)</strong>.
      </Callout>
      <div className="space-y-3 mt-6">
        {assignments.map((a, i) => (
          <div key={i} className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-4 flex items-start gap-3">
            <span className="text-xs font-bold text-kafka bg-kafka/10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">W{a.week}</span>
            <div>
              <h4 className="text-sm font-bold text-white">{a.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{a.desc}</p>
            </div>
          </div>
        ))}
</div>
    </section>
  );
}
