import { useState, useMemo } from 'react';
import { 
  Sparkles, ArrowRight, User, Mail, Printer, RotateCcw, 
  Send, Target, ShieldCheck, Search, Zap, CheckCircle2 
} from 'lucide-react';

// --- DATABASE 30 DOMANDE ---
const questions = [
  { id: 1, text: "Pensare a come sarà il mio futuro professionale", dim: "Concern" },
  { id: 2, text: "Capire che le scelte di oggi danno forma al mio domani", dim: "Concern" },
  { id: 3, text: "Prepararmi per le sfide che prevedo di incontrare", dim: "Concern" },
  { id: 4, text: "Riflettere sugli obiettivi di carriera che voglio raggiungere", dim: "Concern" },
  { id: 5, text: "Pianificare i passi necessari per realizzare i miei progetti", dim: "Concern" },
  { id: 6, text: "Mantenere le mie competenze aggiornate", dim: "Concern" },
  { id: 7, text: "Anticipare i possibili cambiamenti nel mio settore", dim: "Concern" },
  { id: 8, text: "Mantenere un atteggiamento positivo davanti agli imprevisti", dim: "Control" },
  { id: 9, text: "Prendere decisioni in autonomia sul mio percorso", dim: "Control" },
  { id: 10, text: "Assumermi la responsabilità delle mie azioni", dim: "Control" },
  { id: 11, text: "Difendere ciò in cui credo a livello professionale", dim: "Control" },
  { id: 12, text: "Contare principalmente sulle mie forze per avanzare", dim: "Control" },
  { id: 13, text: "Fare ciò che ritengo giusto per la mia crescita", dim: "Control" },
  { id: 14, text: "Gestire bene il mio tempo e le mie priorità", dim: "Control" },
  { id: 15, text: "Non lasciarmi influenzare troppo dalle opinioni altrui", dim: "Control" },
  { id: 16, text: "Esplorare con curiosità l'ambiente lavorativo intorno a me", dim: "Curiosity" },
  { id: 17, text: "Cercare costantemente opportunità per crescere", dim: "Curiosity" },
  { id: 18, text: "Esaminare diverse opzioni prima di decidere", dim: "Curiosity" },
  { id: 19, text: "Interessarmi a modi nuovi di svolgere il mio lavoro", dim: "Curiosity" },
  { id: 20, text: "Analizzare i problemi professionali per capirne le cause", dim: "Curiosity" },
  { id: 21, text: "Lasciarmi incuriosire da settori diversi dal mio", dim: "Curiosity" },
  { id: 22, text: "Fare domande su nuove professioni emergenti", dim: "Curiosity" },
  { id: 23, text: "Osservare come le persone di successo gestiscono la carriera", dim: "Curiosity" },
  { id: 24, text: "Portare a termine i compiti in modo efficace", dim: "Confidence" },
  { id: 25, text: "Avere cura nel fare bene le cose puntando all'eccellenza", dim: "Confidence" },
  { id: 26, text: "Imparare rapidamente nuove abilità necessarie", dim: "Confidence" },
  { id: 27, text: "Lavorare al massimo delle mie potenzialità", dim: "Confidence" },
  { id: 28, text: "Superare gli ostacoli che incontro sul cammino", dim: "Confidence" },
  { id: 29, text: "Risolvere problemi complessi con determinazione", dim: "Confidence" },
  { id: 30, text: "Avere fiducia nella mia capacità di gestire i cambiamenti", dim: "Confidence" }
];

const dimensions: any = {
  Concern: { title: "Interesse (Concern)", icon: <Target className="w-8 h-8" />, color: "#701a75" },
  Control: { title: "Controllo (Control)", icon: <ShieldCheck className="w-8 h-8" />, color: "#86198f" },
  Curiosity: { title: "Curiosità (Curiosity)", icon: <Search className="w-8 h-8" />, color: "#a21caf" },
  Confidence: { title: "Fiducia (Confidence)", icon: <Zap className="w-8 h-8" />, color: "#4a044e" }
};

export default function CareerAdaptabilityApp() {
  const [step, setStep] = useState<'welcome' | 'user-info' | 'test' | 'result'>('welcome');
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ Concern: 0, Control: 0, Curiosity: 0, Confidence: 0 });

  const handleAnswer = (val: number) => {
    const dim = questions[currentIdx].dim;
    setScores(prev => ({ ...prev, [dim]: prev[dim] + val }));
    if (currentIdx < questions.length - 1) setCurrentIdx(currentIdx + 1);
    else setStep('result');
  };

  const dominant = useMemo(() => {
    return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  }, [scores, step]);

  return (
    <div className="min-h-screen bg-[#FDFBFE] flex items-center justify-center p-4 sm:p-8 font-sans antialiased text-slate-800">
      
      {/* CSS PER LA STAMPA: Nasconde i bottoni nel PDF */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .main-container { box-shadow: none !important; border: none !important; width: 100% !important; max-width: 100% !important; }
        }
      `}</style>

      <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-purple-100 overflow-hidden main-container">
        <div className="p-8 sm:p-12">
          
          {step === 'welcome' && (
            <div className="text-center space-y-8 py-6">
              <div className="w-20 h-20 bg-purple-900 rounded-3xl flex items-center justify-center mx-auto shadow-xl rotate-6">
                <Sparkles className="text-white" size={40} />
              </div>
              <h1 className="text-4xl font-black text-purple-950 uppercase tracking-tight">Career Adaptability</h1>
              <p className="text-slate-500 text-lg italic">Scopri quanto sei pronto a navigare nel mercato del lavoro di oggi.</p>
              <button onClick={() => setStep('user-info')} className="w-full bg-purple-950 text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3">
                Inizia l'Analisi <ArrowRight />
              </button>
            </div>
          )}

          {step === 'user-info' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-purple-950">Benvenuto</h2>
                <p className="text-slate-500">Inserisci i tuoi dati per personalizzare il report.</p>
              </div>
              <div className="space-y-4">
                <input type="text" placeholder="Nome completo" className="w-full p-5 bg-purple-50 rounded-2xl outline-none" value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} />
                <input type="email" placeholder="Email" className="w-full p-5 bg-purple-50 rounded-2xl outline-none" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} />
              </div>
              <button disabled={!userData.name || !userData.email} onClick={() => setStep('test')} className="w-full bg-purple-950 text-white py-5 rounded-2xl font-bold text-xl disabled:opacity-50">
                Vai al Test
              </button>
            </div>
          )}

          {step === 'test' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center text-xs font-black text-purple-400 tracking-widest uppercase">
                <span>Passo {currentIdx + 1} / 30</span>
                <span>{Math.round((currentIdx/30)*100)}%</span>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-purple-700 uppercase italic">Quanto ti senti capace di...</p>
                <h2 className="text-2xl font-bold text-purple-950 leading-tight">{questions[currentIdx].text}?</h2>
              </div>
              <div className="grid gap-3">
                {["Per nulla capace", "Poco capace", "Molto capace", "Estremamente capace"].map((label, i) => (
                  <button key={i} onClick={() => handleAnswer(i + 1)} className="w-full text-left p-5 border-2 border-slate-50 rounded-2xl hover:border-purple-500 hover:bg-purple-50 font-bold transition-all">
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'result' && (
            <div className="flex flex-col space-y-10">
              <header className="text-center space-y-2">
                <div className="flex justify-center mb-2"><CheckCircle2 className="text-purple-900" size={48}/></div>
                <h1 className="text-3xl font-black text-purple-950">Analisi di {userData.name}</h1>
              </header>

              <div className="w-full p-10 rounded-[2.5rem] bg-purple-50 border border-purple-100 flex flex-col items-center text-center space-y-6">
                <div className="p-4 bg-white rounded-2xl shadow-sm text-purple-900">
                  {dimensions[dominant].icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black italic text-purple-950">
                    Il tuo Superpotere: {dimensions[dominant].title}
                  </h3>
                  <p className="text-lg leading-relaxed text-purple-900/80 font-medium">
                    {userData.name}, la tua analisi rivela una risorsa preziosa. In un mercato del lavoro che cambia continuamente, la tua capacità di <strong>{dimensions[dominant].title}</strong> ti permette di non subire il futuro, ma di guidarlo. 
                    <br /><br />
                    Continua a coltivare questa attitudine: è la tua bussola migliore.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {Object.keys(dimensions).map((key) => (
                  <div key={key} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                    <div className="text-[10px] font-black text-purple-400 uppercase mb-1">{dimensions[key].title}</div>
                    <div className="text-2xl font-black text-purple-950">{Math.round((scores[key]/30)*100)}%</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 no-print">
                <button onClick={() => window.print()} className="flex-1 bg-purple-950 text-white p-6 rounded-2xl font-bold flex items-center justify-center gap-3">
                  <Printer size={22} /> Scarica Report (PDF)
                </button>
                <button onClick={() => window.location.href = `mailto:${userData.email}?subject=Report Carriera&body=Ciao ${userData.name}, ecco i tuoi risultati.`} className="flex-1 bg-white border-2 border-purple-100 text-purple-900 p-6 rounded-2xl font-bold flex items-center justify-center gap-3">
                  <Send size={22} /> Invia via Email
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}