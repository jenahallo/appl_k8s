import { useState } from 'react';
import { QuizQuestion } from '../data/lessons';

export function QuizCard({ q, onDone }: { q: QuizQuestion; onDone: (ok: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);

  return <div className="border rounded-xl p-4 bg-white shadow-sm">
    <h4 className="font-semibold mb-3">{q.question}</h4>
    <div className="space-y-2">
      {q.options.map((opt, i) => (
        <button key={opt} onClick={() => !locked && setPicked(i)} className={`block w-full text-left px-3 py-2 rounded-lg border ${picked === i ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}>
          {opt}
        </button>
      ))}
    </div>
    <button disabled={picked === null || locked} onClick={() => { setLocked(true); onDone(picked === q.correctIndex); }} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50">Vyhodnotit</button>
    {locked && <p className="mt-3 text-sm"><strong>{picked === q.correctIndex ? 'Správně.' : 'Nesprávně.'}</strong> {q.explanation}</p>}
  </div>;
}
