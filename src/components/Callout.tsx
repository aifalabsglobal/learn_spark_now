import React from 'react';
import { Lightbulb, Info, AlertTriangle, CheckCircle } from 'lucide-react';

type CalloutType = 'info' | 'tip' | 'warning' | 'success';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = {
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      text: 'text-blue-200',
      icon: <Info className="text-blue-400 shrink-0" size={20} />,
      titleColor: 'text-blue-100'
    },
    tip: {
      bg: 'bg-spark/10',
      border: 'border-spark/20',
      text: 'text-orange-100', // Spark accent is orange-ish
      icon: <Lightbulb className="text-spark shrink-0" size={20} />,
      titleColor: 'text-spark-light'
    },
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20',
      text: 'text-yellow-100',
      icon: <AlertTriangle className="text-yellow-400 shrink-0" size={20} />,
      titleColor: 'text-yellow-100'
    },
    success: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      text: 'text-green-100',
      icon: <CheckCircle className="text-green-400 shrink-0" size={20} />,
      titleColor: 'text-green-100'
    }
  };

  const style = styles[type];

  return (
    <div className={`my-6 p-4 rounded-xl border ${style.bg} ${style.border} flex gap-3`}>
      <div className="mt-0.5">{style.icon}</div>
      <div className="flex-1">
        {title && <h4 className={`font-bold text-sm mb-1 ${style.titleColor}`}>{title}</h4>}
        <div className={`text-sm leading-relaxed ${style.text}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
