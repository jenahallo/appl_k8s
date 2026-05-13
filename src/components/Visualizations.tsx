export function ClusterViz() {
  return <div className="grid md:grid-cols-2 gap-4">
    <svg viewBox="0 0 380 220" className="w-full bg-white rounded-xl p-3 shadow-sm">
      <rect x="10" y="10" width="360" height="200" rx="12" fill="#eef2ff" stroke="#93c5fd"/>
      <text x="20" y="30" fontSize="14" fontWeight="bold">Cluster</text>
      <rect x="30" y="50" width="150" height="140" rx="10" fill="#fff" stroke="#60a5fa"/><text x="40" y="70">Node A</text>
      <rect x="50" y="85" width="110" height="40" rx="8" fill="#dbeafe"/><text x="60" y="108">Pod 1 → C1</text>
      <rect x="50" y="135" width="110" height="40" rx="8" fill="#dbeafe"/><text x="60" y="158">Pod 2 → C2</text>
      <rect x="200" y="50" width="150" height="140" rx="10" fill="#fff" stroke="#60a5fa"/><text x="210" y="70">Node B</text>
      <rect x="220" y="100" width="110" height="40" rx="8" fill="#dbeafe"/><text x="230" y="123">Pod 3 → C3</text>
    </svg>
    <svg viewBox="0 0 380 220" className="w-full bg-white rounded-xl p-3 shadow-sm">
      <text x="20" y="30" fontWeight="bold">Service & Scaling</text>
      <rect x="30" y="45" width="120" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b"/><text x="50" y="69">Service</text>
      <line x1="150" y1="65" x2="230" y2="65" stroke="#334155"/><line x1="150" y1="65" x2="230" y2="115" stroke="#334155"/><line x1="150" y1="65" x2="230" y2="165" stroke="#334155"/>
      {[65,115,165].map((y,i)=><g key={i}><rect x="230" y={y-20} width="120" height="40" rx="8" fill="#dbeafe" stroke="#3b82f6"/><text x="260" y={y+4}>Pod {i+1}</text></g>)}
      <text x="30" y="210" fontSize="12">Deployment scale: 1 → 3 repliky</text>
    </svg>
  </div>
}
