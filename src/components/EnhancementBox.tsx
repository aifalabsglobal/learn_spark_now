import { Lightbulb } from 'lucide-react';

interface EnhancementBoxProps {
  title?: string;
  items: string[];
}

export default function EnhancementBox({ title = 'Possible enhancements', items }: EnhancementBoxProps) {
  return (
    <div className="my-6 rounded-xl border border-amber-500/20 bg-amber-950/20 p-4">
      <h4 className="text-sm font-bold text-amber-400 mb-2 flex items-center gap-2">
        <Lightbulb size={16} />
        {title}
      </h4>
      <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
