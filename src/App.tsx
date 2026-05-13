import { useMemo, useState } from 'react';
import { lessons } from './data/lessons';
import { CodeBlock } from './components/CodeBlock';
import { ProgressBar } from './components/ProgressBar';
import { QuizCard } from './components/QuizCard';
import { ClusterViz } from './components/Visualizations';

export default function App() {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [score, setScore] = useState(0);
  const lesson = lessons[lessonIndex];
  const progress = useMemo(() => Math.round(((lessonIndex + 1) / lessons.length) * 100), [lessonIndex]);

  return <div className="min-h-screen bg-slate-50 text-slate-800">
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold">Interaktivní Kubernetes školení</h1>
        <p className="text-sm text-slate-600">Pro začátečníky a mírně pokročilé • text + vizualizace + cvičení</p>
        <div className="mt-3"><ProgressBar value={progress} /></div>
      </div>
    </header>
    <main className="max-w-6xl mx-auto p-4 grid lg:grid-cols-[260px_1fr] gap-6">
      <aside className="bg-white rounded-xl p-4 shadow-sm h-fit">
        <h2 className="font-semibold mb-2">Moduly kurzu</h2>
        {lessons.map((l, i) => <button key={l.id} onClick={() => setLessonIndex(i)} className={`block w-full text-left px-3 py-2 rounded-lg mb-1 ${i === lessonIndex ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100'}`}>{i + 1}. {l.title}</button>)}
        <p className="mt-4 text-sm">Skóre: <strong>{score}</strong></p>
      </aside>
      <section className="space-y-4">
        <article className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-bold mb-2">{lesson.title}</h2>
          <p className="mb-2"><strong>Vysvětlení:</strong> {lesson.intro}</p>
          <p className="mb-2"><strong>Princip:</strong> {lesson.principle}</p>
          <p className="mb-3"><strong>Praktický příklad:</strong> {lesson.practicalExample}</p>
          <CodeBlock language="yaml" code={lesson.yaml} />
          <div className="mt-3"><CodeBlock language="kubectl" code={lesson.commands.join('\n')} /></div>
          <p className="mt-3"><strong>Shrnutí:</strong> {lesson.summary}</p>
        </article>
        <ClusterViz />
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Mini test</h3>
          {lesson.quiz.map((q, idx) => <QuizCard key={idx} q={q} onDone={(ok) => ok && setScore((s) => s + 1)} />)}
        </div>
        <div className="flex gap-2">
          <button disabled={lessonIndex === 0} onClick={() => setLessonIndex((i) => i - 1)} className="px-4 py-2 rounded-lg bg-slate-200 disabled:opacity-50">Předchozí</button>
          <button disabled={lessonIndex === lessons.length - 1} onClick={() => setLessonIndex((i) => i + 1)} className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50">Další</button>
        </div>
      </section>
    </main>
  </div>;
}
