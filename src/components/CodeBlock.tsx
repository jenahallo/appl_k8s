export const CodeBlock = ({ code, language }: { code: string; language: string }) => (
  <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-sm"><code>{`# ${language}\n${code}`}</code></pre>
);
