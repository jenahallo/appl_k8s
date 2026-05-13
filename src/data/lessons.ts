export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  intro: string;
  principle: string;
  practicalExample: string;
  yaml: string;
  commands: string[];
  summary: string;
  quiz: QuizQuestion[];
};

export const lessons: Lesson[] = [
  {
    id: 'k8s-intro',
    title: 'Co je Kubernetes a proč se používá',
    intro: 'Kubernetes je platforma pro orchestraci kontejnerů. Pomáhá automaticky nasazovat, škálovat a obnovovat aplikace.',
    principle: 'Místo ručního spouštění jednotlivých kontejnerů popíšeš požadovaný stav aplikace a Kubernetes se postará o jeho dosažení.',
    practicalExample: 'E-shop běží ve 3 kopiích aplikace. Když jedna kopie spadne, Kubernetes ji automaticky nahradí.',
    yaml: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: shop-app\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: shop\n  template:\n    metadata:\n      labels:\n        app: shop\n    spec:\n      containers:\n      - name: shop\n        image: nginx:stable`,
    commands: ['kubectl get deployments', 'kubectl describe deployment shop-app'],
    summary: 'Kubernetes drží aplikaci ve stabilním stavu a zjednodušuje provoz.',
    quiz: [{ question: 'Hlavní přínos Kubernetes je:', options: ['Ruční správa serverů', 'Automatizace provozu kontejnerů', 'Náhrada Gitu'], correctIndex: 1, explanation: 'Kubernetes automatizuje nasazení, škálování a obnovu.' }]
  },
  {
    id: 'core-objects', title: 'Cluster, Node, Pod, Container', intro: 'Základní stavební prvky Kubernetes.', principle: 'Cluster je skupina strojů. Node je jeden stroj. Pod je jednotka nasazení s jedním nebo více kontejnery.', practicalExample: 'Web + sidecar logger běží spolu v jednom Podu.', yaml: `apiVersion: v1\nkind: Pod\nmetadata:\n  name: web-pod\nspec:\n  containers:\n  - name: web\n    image: nginx\n  - name: logger\n    image: busybox\n    command: ['sh','-c','tail -f /var/log/nginx/access.log']`, commands: ['kubectl get nodes', 'kubectl get pods -o wide'], summary: 'Pod je nejmenší plánovatelná jednotka v Kubernetes.', quiz: [{ question: 'Kde běží Pod?', options: ['V Namespace', 'Na Node', 'V Service'], correctIndex: 1, explanation: 'Scheduler umisťuje Pody na Node.' }]
  },
  {
    id:'workload-network', title:'Deployment, ReplicaSet, Service', intro:'Objekty pro běh aplikace a síť.', principle:'Deployment řídí verze a počet replik, ReplicaSet zajišťuje jejich počet, Service dává stabilní přístup.', practicalExample:'Frontend běží ve 2 replikách, Service je zpřístupní pod jednou adresou.', yaml:`apiVersion: v1\nkind: Service\nmetadata:\n  name: frontend-svc\nspec:\n  selector:\n    app: frontend\n  ports:\n  - port: 80\n    targetPort: 8080`, commands:['kubectl get rs','kubectl get svc','kubectl scale deployment frontend --replicas=4'], summary:'Service směruje provoz na Pody podle labelů.', quiz:[{question:'Co poskytuje stabilní endpoint?',options:['Pod','Service','ConfigMap'],correctIndex:1,explanation:'Service abstrahuje měnící se IP adresy Podů.'}]
  },
  {
    id:'config-storage',title:'ConfigMap, Secret, Volume',intro:'Oddělení konfigurace, citlivých dat a perzistence.',principle:'ConfigMap pro ne-citlivá data, Secret pro hesla/tokeny, Volume pro data mimo životnost kontejneru.',practicalExample:'Aplikace načítá URL API z ConfigMap a heslo DB ze Secret.',yaml:`apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: app-config\ndata:\n  API_URL: https://api.example.local`,commands:['kubectl get configmap','kubectl get secret','kubectl describe pod web-pod'],summary:'Nekóduj konfiguraci přímo do image.',quiz:[{question:'Kam patří hesla?',options:['ConfigMap','Secret','Service'],correctIndex:1,explanation:'Secret je určený pro citlivá data.'}]
  },
  {
    id:'namespace-ingress-kubectl-troubleshoot',title:'Namespace, Ingress, kubectl a troubleshooting',intro:'Organizace prostředí, vstupní provoz a diagnostika.',principle:'Namespace odděluje týmy/prostředí. Ingress směruje HTTP(S). kubectl pomáhá rychle odhalit problémy.',practicalExample:'Tým A má namespace team-a, Ingress posílá /shop na shop service.',yaml:`apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: app-ingress\nspec:\n  rules:\n  - host: szkoleni.local\n    http:\n      paths:\n      - path: /shop\n        pathType: Prefix\n        backend:\n          service:\n            name: shop-svc\n            port:\n              number: 80`,commands:['kubectl get ns','kubectl get ingress','kubectl logs deploy/shop-app','kubectl describe pod <pod-name>'],summary:'Při troubleshooting začni: get -> describe -> logs -> events.',quiz:[{question:'Jaký je typický první krok při problému?',options:['Smazat cluster','kubectl get + describe','Restartovat počítač'],correctIndex:1,explanation:'Nejprve zjisti aktuální stav objektů a události.'}]
  }
];
