// 기존 import 구문을 모두 지우고 이 아래 내용을 붙여넣으세요.
const { useState, useEffect, useMemo } = React;
const { 
  History, 
  User, 
  BookOpen, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Info, 
  Quote, 
  Zap, 
  RefreshCw, 
  ArrowRightLeft, 
  CircleDot, 
  Layers 
} = lucide;

// 그 아래의 실제 React 컴포넌트 코드(예: const App = ... )는 그대로 두시면 됩니다.
// --- 이미지 폴백 컴포넌트 (오류 방지) ---
const ImageWithFallback = ({ src, alt, className }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`${className} bg-gradient-to-br from-indigo-100 to-slate-200 flex items-center justify-center`}>
        <User className="w-16 h-16 text-slate-300" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={() => setError(true)} 
    />
  );
};

// --- 1. 초대칭 시각화 가이드 (인포그래픽) ---
const SUSYInfographic = () => {
  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden border border-indigo-500/30">
      <div className="absolute top-0 right-0 p-8 opacity-10 animate-pulse">
        <Zap size={160} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-400/30">
            <RefreshCw className="text-indigo-400 animate-spin-slow" size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tight">초대칭(SUSY) 시각적 가이드</h2>
            <p className="text-indigo-300 text-sm font-medium uppercase tracking-widest text-opacity-70">The Mirror of the Universe</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
            <div className="flex justify-between items-center mb-10 px-4">
              <div className="text-center">
                <div className="text-emerald-400 font-bold text-xs mb-1 uppercase tracking-tighter">Matter (Fermions)</div>
                <div className="text-[10px] text-slate-400">Spin 1/2, 3/2</div>
              </div>
              <ArrowRightLeft className="text-indigo-500/50" size={20} />
              <div className="text-center">
                <div className="text-pink-400 font-bold text-xs mb-1 uppercase tracking-tighter">Force (Bosons)</div>
                <div className="text-[10px] text-slate-400">Spin 0, 1, 2</div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-black shadow-[0_0_15px_rgba(16,185,129,0.2)]">q</div>
                  <span className="text-sm font-bold">Quark</span>
                </div>
                <div className="h-px flex-grow mx-4 bg-gradient-to-r from-emerald-500/20 via-indigo-500/40 to-pink-500/20"></div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-pink-300 italic">S-Quark</span>
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/50 flex items-center justify-center text-pink-400 font-black shadow-[0_0_15px_rgba(236,72,153,0.2)]">sq</div>
                </div>
              </div>

              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-black">e</div>
                  <span className="text-sm font-bold">Electron</span>
                </div>
                <div className="h-px flex-grow mx-4 bg-gradient-to-r from-emerald-500/20 via-indigo-500/40 to-pink-500/20"></div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-pink-300 italic">Selectron</span>
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/50 flex items-center justify-center text-pink-400 font-black">se</div>
                </div>
              </div>

              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-black italic">γ</div>
                  <span className="text-sm font-bold">Photon</span>
                </div>
                <div className="h-px flex-grow mx-4 bg-gradient-to-r from-blue-500/20 via-indigo-500/40 to-purple-500/20"></div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-purple-300 italic">Photino</span>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-400 font-black">ph</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-6 rounded-r-2xl">
              <h4 className="text-xl font-bold mb-2 text-indigo-300">왜 이 이론이 필요한가?</h4>
              <p className="text-slate-300 leading-relaxed text-sm">
                표준 모형은 힉스 입자의 질량이 왜 그렇게 가벼운지(계층성 문제) 완벽히 설명하지 못합니다. 초대칭은 모든 입자에 '그림자 짝(Superpartner)'을 설정하여, 양자 계산에서 서로의 에너지를 상쇄시켜 질량을 안정화합니다.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-indigo-500/50 transition-colors">
                <div className="text-indigo-400 font-black text-xl mb-1 tracking-tighter">Mirror</div>
                <p className="text-[10px] text-slate-400 leading-tight">보손과 페르미온을 연결하는 우주의 거울 대칭</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-indigo-500/50 transition-colors">
                <div className="text-indigo-400 font-black text-xl mb-1 tracking-tighter">WIMP</div>
                <p className="text-[10px] text-slate-400 leading-tight">가장 가벼운 초대칭 입자(LSP)는 암흑 물질 후보</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 2. 메인 애플리케이션 ---
const App = () => {
  const [activeTab, setActiveTab] = useState('intro');

  const perspectives = [
    {
      name: "John Ellis",
      status: "Positive",
      role: "CERN Senior Theorist",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/John_Ellis_CERN.jpg",
      quote: "초대칭은 암흑 물질 문제를 해결하고 대통일 이론으로 가는 가장 우아한 길이다.",
      view: "LHC에서 발견되지 않은 것은 질량 스케일이 예상보다 높기 때문일 뿐이다. 초대칭은 여전히 입자 물리학의 가장 강력한 패러다임이다.",
      reference: "Paper: 'Supersymmetry and the Higgs' (2012)"
    },
    {
      name: "Nima Arkani-Hamed",
      status: "Alternative",
      role: "IAS Professor",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Nima_Arkani-Hamed_2017.jpg",
      quote: "우리는 '자연스러움'에 대한 정의를 다시 생각해야 할지도 모른다.",
      view: "기존의 'Naturalness' 개념이 틀렸을 수 있다. '분할 초대칭(Split SUSY)' 이론을 통해 실험 결과와 이론 사이의 간극을 설명하고자 한다.",
      reference: "Paper: 'Split Supersymmetry' (2004)"
    },
    {
      name: "Sabine Hossenfelder",
      status: "Critical",
      role: "Theoretical Physicist & Author",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Sabine_Hossenfelder_2017.jpg",
      quote: "물리학은 미학적 편향(Aesthetic Bias) 때문에 길을 잃었다.",
      view: "수학적 '아름다움'이나 '우아함'이 진리를 보장하지 않는다. 데이터가 지지하지 않는 이론을 수십 년간 고수하는 것은 과학적이지 않다.",
      reference: "Book: 'Lost in Math' (2018)"
    },
    {
      name: "Peter Woit",
      status: "Critical",
      role: "Columbia University Math Professor",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/07/Peter_Woit.jpg",
      quote: "틀렸다고 말할 수조차 없는(Not Even Wrong) 상태에 이르렀다.",
      view: "초대칭과 끈이론은 실험적 검증이 불가능한 구조로 도망치고 있다. 이는 물리학의 위기이지 진보가 아니다.",
      reference: "Book: 'Not Even Wrong' (2006)"
    },
    {
      name: "Mikhail Shifman",
      status: "Skeptical",
      role: "University of Minnesota Professor",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Mikhail_Shifman_2017.jpg",
      quote: "입자 물리학은 위기에 처해 있으며, 우리는 이를 인정해야 한다.",
      view: "30년 넘게 공들여온 초대칭 연구가 LHC의 결과로 인해 거대한 벽에 부딪혔다. 새로운 사고의 전환이 필요한 시점이다.",
      reference: "Article: 'Reflection on the crisis in particle physics' (2012)"
    }
  ];

  const timelineData = [
    { year: "1971", title: "최초의 4D 초대칭", scientists: "Golfand & Likhtman", description: "포앙카레 대수를 확장한 최초의 수식화.", reference: "JETP Lett. 13 (1971)" },
    { year: "1974", title: "Wess-Zumino 모델", scientists: "J. Wess & B. Zumino", description: "4차원 초대칭 장론의 기초 정립.", reference: "Nucl. Phys. B70 (1974)" },
    { year: "1981", title: "MSSM 모델", scientists: "Dimopoulos & Georgi", description: "표준 모형의 직접적인 초대칭 확장 모델.", reference: "Nucl. Phys. B193 (1981)" },
    { year: "1981", title: "계층성 문제 해결", scientists: "Edward Witten", description: "초대칭이 힉스 질량을 어떻게 보호하는지 증명.", reference: "Nucl. Phys. B188 (1981)" },
    { year: "2012", title: "LHC 실험의 한계", scientists: "CERN", description: "힉스 입자 발견 성공, 그러나 초대칭 입자 발견 실패.", reference: "CERN-LHC-2012" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-12 text-center pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-xs font-black text-indigo-600 uppercase tracking-widest mb-6">
            <CircleDot size={14} className="animate-pulse" /> Advanced Physics Research
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Supersymmetry</span> Debate
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            우주의 근본 대칭성을 향한 수십 년간의 여정. 학술적 엄밀성을 바탕으로 정리한 타임라인과 석학들의 엇갈린 시선.
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <nav className="bg-white/80 backdrop-blur-md p-1.5 rounded-[2rem] shadow-xl border border-slate-200 flex space-x-1 overflow-x-auto">
            {[
              { id: 'intro', label: '기초 & 시각화', icon: Info },
              { id: 'timeline', label: '역사 타임라인', icon: History },
              { id: 'perspectives', label: '과학자별 입장', icon: User }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 md:px-8 py-3 rounded-2xl font-black transition-all duration-300 whitespace-nowrap ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <main className="transition-all duration-500 min-h-[500px]">
          
          {activeTab === 'intro' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <SUSYInfographic />
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-600">
                    <Layers className="text-indigo-400" /> 핵심 동기: 계층성 문제
                  </h4>
                  <div className="text-slate-600 text-sm leading-relaxed">
                    양자 역학적으로 힉스 입자의 질량은 플랑크 질량(10<sup>19</sup> GeV) 근처여야 하지만, 실제 관측값은 125 GeV에 불과합니다. 초대칭은 입자 쌍의 상쇄 효과를 통해 이 거대한 차이를 자연스럽게 메워줍니다.
                  </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-600">
                    <Zap className="text-purple-400" /> 우주론적 연결: 암흑 물질
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    대부분의 초대칭 모델에서 '가장 가벼운 초대칭 입자(LSP)'는 붕괴하지 않고 안정적입니다. 이는 빛을 내지 않으면서 중력적 영향만 주는 암흑 물질의 특성과 완벽하게 일치합니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-5 md:before:left-1/2 before:w-1 before:bg-slate-200 animate-in fade-in duration-500">
              {timelineData.map((item, index) => (
                <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center justify-between md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-indigo-600 text-white shadow-xl z-10 mb-4 md:mb-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <History className="w-4 h-4" />
                  </div>
                  <div className="w-full md:w-[45%] bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group-hover:-translate-y-1">
                    <span className="inline-block px-4 py-1 mb-4 text-[10px] font-black text-indigo-600 bg-indigo-50 rounded-full tracking-widest uppercase">{item.year}</span>
                    <h3 className="text-2xl font-black mb-2 tracking-tight">{item.title}</h3>
                    <p className="text-sm font-bold text-slate-400 mb-4">{item.scientists}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{item.description}</p>
                    <div className="flex items-center text-[11px] font-mono text-slate-400 p-3 bg-slate-50 rounded-2xl border border-slate-100 italic">
                      <BookOpen size={12} className="mr-2 text-indigo-400" /> {item.reference}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'perspectives' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {perspectives.map((person, index) => (
                <div key={index} className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col">
                  <div className="relative h-72 overflow-hidden bg-slate-100">
                    <ImageWithFallback 
                      src={person.image} 
                      alt={person.name}
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className={`absolute top-6 right-6 p-3 rounded-2xl bg-white/90 backdrop-blur shadow-xl`}>
                      {person.status === 'Positive' ? <CheckCircle2 className="text-emerald-500" size={24} /> : 
                       person.status === 'Critical' ? <XCircle className="text-rose-500" size={24} /> : 
                       <AlertCircle className="text-amber-500" size={24} />}
                    </div>
                    <div className="absolute bottom-8 left-8 text-white pr-4">
                      <h3 className="text-2xl font-black tracking-tight leading-tight">{person.name}</h3>
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1 opacity-90">{person.role}</p>
                    </div>
                  </div>
                  
                  <div className="p-10 flex-grow space-y-6">
                    <div className="relative">
                      <Quote className="absolute -top-6 -left-6 w-12 h-12 text-indigo-50 -z-10 opacity-60" />
                      <p className="text-slate-800 font-bold italic text-lg leading-snug">
                        "{person.quote}"
                      </p>
                    </div>
                    
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {person.view}
                    </p>
                  </div>

                  <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 mt-auto">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">Academic Source</span>
                      <div className="flex items-center text-[10px] font-mono font-bold text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                        <BookOpen size={10} className="mr-1.5" />
                        {person.reference}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Final Insight Section */}
        <section className="mt-24 mb-32 relative">
          <div className="bg-slate-900 rounded-[3.5rem] p-12 md:p-20 text-white overflow-hidden shadow-3xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(79,70,229,0.15),transparent)]"></div>
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">물리학의 미래: 우아함인가, 실증인가?</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 opacity-90">
                초대칭은 자연이 가질 수 있는 가장 완벽한 수학적 아름다움을 제시했습니다. 그러나 자연이 반드시 우리의 '아름다움'에 대한 기준을 따를 필요는 없습니다. 
                차세대 입자 가속기와 우주 망원경이 보내올 데이터가 이 수십 년간의 논쟁에 마침표를 찍어줄 것입니다.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["#LHC", "#BeyondStandardModel", "#Supersymmetry", "#DarkMatter"].map(tag => (
                  <span key={tag} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-indigo-300 tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.4);
        }
        ::-webkit-scrollbar {
          height: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default App;
