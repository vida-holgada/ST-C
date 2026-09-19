/* W03 supersymmetry teaching interactions. No external runtime required. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const all = selector => Array.from(document.querySelectorAll(selector));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const steps = ['idea', 'motivation', 'detector', 'evidence', 'history', 'discussion'];
  const names = ['아이디어', '매력의 근거', '실험의 눈', '지금의 결과', '역사와 비교', '판단과 토론'];
  let current = 0;
  function select(group, value) {
    all(`[data-${group}]`).forEach(button => button.setAttribute('aria-pressed', String(button.dataset[group] === value)));
  }
  function showStep(id, scroll = true) {
    const next = steps.indexOf(id);
    if (next < 0) return;
    stopTrack();
    current = next;
    steps.forEach(key => $(key).hidden = key !== id);
    select('step', id);
    $('previous').disabled = current === 0;
    $('next').disabled = current === steps.length - 1;
    $('next').textContent = current === steps.length - 1 ? '마지막 단계' : `${names[current + 1]} →`;
    $('step-counter').textContent = `${String(current + 1).padStart(2, '0')} / 06`;
    if (scroll) {
      document.querySelector('.steps').scrollIntoView({block:'start', behavior:'instant'});
      $(`${id}-title`).focus({preventScroll:true});
    }
  }
  function navigate(id) {
    if (location.hash === `#${id}`) showStep(id);
    else location.hash = id;
  }
  all('[data-step]').forEach(button => button.addEventListener('click', () => navigate(button.dataset.step)));
  $('previous').addEventListener('click', () => current > 0 && navigate(steps[current - 1]));
  $('next').addEventListener('click', () => current < steps.length - 1 && navigate(steps[current + 1]));
  document.addEventListener('keydown', event => {
    if (event.target.closest('input,button,select,textarea,summary,a') || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowRight' && current < 5) { event.preventDefault(); navigate(steps[current + 1]); }
    if (event.key === 'ArrowLeft' && current > 0) { event.preventDefault(); navigate(steps[current - 1]); }
  });
  all('a[href^="#src-"]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    $('references').open = true;
    const reference = $(link.getAttribute('href').slice(1));
    reference.scrollIntoView({block:'center', behavior:'instant'});
    reference.setAttribute('tabindex', '-1');
    reference.focus({preventScroll:true});
  }));
  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    if (steps.includes(id)) showStep(id);
  });
  const particles = {
    electron: {symbol:'e⁻',name:'전자',kind:'페르미온 · 스핀 ½',partner:'ẽ',partnerName:'셀렉트론',partnerKind:'보손 · 스핀 0',fact:'전하가 같은 짝이지만, 스핀과 입자의 종류가 달라집니다.'},
    top: {symbol:'t',name:'톱 쿼크',kind:'페르미온 · 스핀 ½',partner:'t̃',partnerName:'톱 스쿼크',partnerKind:'보손 · 스핀 0',fact:'톱 쿼크의 짝은 톱 스쿼크입니다. 둘 다 전하와 색전하를 가집니다.'},
    gluon: {symbol:'g',name:'글루온',kind:'보손 · 스핀 1',partner:'g̃',partnerName:'글루이노',partnerKind:'페르미온 · 스핀 ½',fact:'강력을 매개하는 보손에도, 페르미온 종류의 짝이 필요합니다.'}
  };
  all('[data-particle]').forEach(button => button.addEventListener('click', () => {
    const p = particles[button.dataset.particle];
    select('particle', button.dataset.particle);
    [['known-symbol',p.symbol],['known-name',p.name],['known-detail',p.kind],['partner-symbol',p.partner],['partner-name',p.partnerName],['partner-detail',p.partnerKind],['pair-fact',p.fact]].forEach(([id,text]) => $(id).textContent = text);
  }));
  all('[data-motive]').forEach(button => button.addEventListener('click', () => {
    select('motive',button.dataset.motive);
    all('.motivation-panel').forEach(panel => panel.hidden = panel.id !== button.dataset.motive);
  }));
  const correction = {
    none:{positive:0,remaining:45,text:'상쇄를 강제하는 관계가 없어 큰 보정이 남을 수 있습니다.'},
    exact:{positive:45,remaining:0,text:'짝의 보정이 대응하여, 높은 에너지에 민감한 항이 상쇄됩니다.'},
    broken:{positive:34,remaining:11,text:'상쇄 관계는 도움이 되지만, 대칭이 깨진 정도에 따른 보정이 남습니다.'}
  };
  all('[data-correction]').forEach(button => button.addEventListener('click', () => {
    const state = correction[button.dataset.correction];
    select('correction',button.dataset.correction);
    $('boson-bar').style.width = `${state.positive}%`;
    $('residual-bar').style.left = `${50-state.remaining}%`;
    $('residual-bar').style.width = `${state.remaining}%`;
    $('correction-status').textContent = state.text;
    $('correction-status').classList.toggle('warm',button.dataset.correction !== 'exact');
  }));
  const SVG = 'http://www.w3.org/2000/svg';
  function el(name,attrs={},text='') {
    const node = document.createElementNS(SVG,name);
    Object.entries(attrs).forEach(([key,value]) => node.setAttribute(key,String(value)));
    if (text) node.textContent = text;
    return node;
  }
  function add(parent,name,attrs,text) {const node=el(name,attrs,text);parent.appendChild(node);return node;}
  const gauge = $('gauge-chart');
  const gx = exponent => 55 + (exponent-2)/15*495;
  const gy = value => 286 - value/65*249;
  const initial = [59,29.6,8.5];
  const sm = [41/10,-19/6,-7], susy = [33/5,1,-3];
  const colors = ['#4f73a3','#ae674a','#397970'];
  // One-loop running, with GUT-normalized U(1), and common 1 TeV SUSY threshold.
  function inverseCoupling(exponent,index,mix) {
    const start=Math.log10(91.1876), threshold=3;
    const below=Math.min(exponent,threshold)-start;
    const above=Math.max(0,exponent-threshold);
    const b=sm[index]*(1-mix)+susy[index]*mix;
    return initial[index]-(sm[index]*below+b*above)*Math.LN10/(2*Math.PI);
  }
  for (let value=0;value<=60;value+=20) {
    add(gauge,'line',{x1:55,y1:gy(value),x2:550,y2:gy(value),stroke:'#e4e7e3'});
    add(gauge,'text',{x:43,y:gy(value)+5,'text-anchor':'end'},String(value));
  }
  for (let exponent=2;exponent<=17;exponent+=3) {
    const x=gx(exponent);
    add(gauge,'line',{x1:x,y1:286,x2:x,y2:292,stroke:'#a4b1b1'});
    add(gauge,'text',{x,y:313,'text-anchor':'middle'},power(exponent));
  }
  add(gauge,'text',{x:55,y:19},'결합 세기의 역수 1/α');
  add(gauge,'text',{x:550,y:340,'text-anchor':'end'},'에너지 (GeV) →');
  const proximity = add(gauge,'ellipse',{cx:gx(16.15),cy:gy(26),rx:27,ry:24,fill:'#edf4f1',stroke:'#90afa2','stroke-dasharray':'3 4',opacity:0});
  const gaugePaths=colors.map(color=>add(gauge,'path',{fill:'none',stroke:color,'stroke-width':3.3}));
  const scanLine=add(gauge,'line',{x1:gx(16),x2:gx(16),y1:30,y2:286,stroke:'#bac4c3','stroke-dasharray':'4 5'});
  const gaugeDots=colors.map(color=>add(gauge,'circle',{r:5,fill:color,stroke:'#fff','stroke-width':2}));
  let gaugeMix=0,gaugeTarget=0,gaugeAnimation=0;
  function power(n) {const superscript={'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻','.':'·'};return '10'+String(n).split('').map(x=>superscript[x]).join('');}
  function drawGauge() {
    gaugePaths.forEach((path,index) => {
      const pts=[];
      for(let i=0;i<=150;i++){const exponent=2+i/10;pts.push(`${i?'L':'M'}${gx(exponent).toFixed(2)},${gy(inverseCoupling(exponent,index,gaugeMix)).toFixed(2)}`);}
      path.setAttribute('d',pts.join(' '));
    });
    const exponent=Number($('gauge-energy').value), x=gx(exponent);
    scanLine.setAttribute('x1',x);scanLine.setAttribute('x2',x);
    gaugeDots.forEach((dot,index)=>{dot.setAttribute('cx',x);dot.setAttribute('cy',gy(inverseCoupling(exponent,index,gaugeMix)));});
    proximity.setAttribute('opacity',gaugeMix);
    $('energy-label').textContent=`${power(exponent)} GeV`;
    $('gauge-energy').setAttribute('aria-valuetext',`10의 ${exponent}승 GeV`);
  }
  all('[data-gauge]').forEach(button => button.addEventListener('click',()=>{
    select('gauge',button.dataset.gauge);
    gaugeTarget=button.dataset.gauge==='susy'?1:0;
    $('gauge-status').textContent=gaugeTarget?'초대칭 확장: 약 10¹⁶ GeV 부근에서 세 결합이 가까워집니다.':'표준모형: 세 결합이 하나의 값으로 모이지 않습니다.';
    cancelAnimationFrame(gaugeAnimation);
    const from=gaugeMix,start=performance.now();
    function frame(now){const t=reducedMotion.matches?1:Math.min((now-start)/500,1);gaugeMix=from+(gaugeTarget-from)*(1-Math.pow(1-t,3));drawGauge();if(t<1)gaugeAnimation=requestAnimationFrame(frame);}
    gaugeAnimation=requestAnimationFrame(frame);
  }));
  $('gauge-energy').addEventListener('input',drawGauge);
  drawGauge();

  const detector=$('detector-chart'), cx=204,cy=175;
  const radius=[24,48,72,96,120,144,168];
  radius.forEach(r=>add(detector,'circle',{cx,cy,r,fill:'none',stroke:'#d9e0dd','stroke-width':1.2}));
  add(detector,'text',{x:22,y:22},'검출층');
  add(detector,'circle',{cx,cy,r:5,fill:'#3c514f'});
  add(detector,'text',{x:cx-11,y:cy+25,'text-anchor':'end'},'충돌점');
  function pos(r){const theta=-.45+r*.0015;return {x:cx+r*Math.cos(theta),y:cy+r*Math.sin(theta)};}
  const charged=add(detector,'path',{fill:'none',stroke:'#397970','stroke-width':4,'stroke-linecap':'round'});
  const neutral=add(detector,'path',{fill:'none',stroke:'#9b9ea3','stroke-dasharray':'5 6','stroke-width':2});
  const pion=add(detector,'path',{fill:'none',stroke:'#ae674a','stroke-width':2.5});
  const hitDots=radius.map(r=>{const p=pos(r);return add(detector,'circle',{cx:p.x,cy:p.y,r:5.8,fill:'#397970',stroke:'white','stroke-width':2});});
  const moving=add(detector,'circle',{r:6.7,fill:'#397970',stroke:'white','stroke-width':2});
  const decayDot=add(detector,'circle',{cx:pos(104).x,cy:pos(104).y,r:6,fill:'#ae674a',stroke:'white','stroke-width':2});
  const trackLegendLine=add(detector,'line',{x1:405,y1:90,x2:429,y2:90,stroke:'#397970','stroke-width':4});
  const trackLegendText=add(detector,'text',{x:440,y:95},'재구성한 궤적');
  const hitLegendDot=add(detector,'circle',{cx:417,cy:124,r:5,fill:'#397970'});
  const hitLegendText=add(detector,'text',{x:440,y:129},'층에 남은 신호');
  const neutralLegend=add(detector,'g');
  add(neutralLegend,'line',{x1:405,y1:171,x2:429,y2:171,stroke:'#9b9ea3','stroke-width':2,'stroke-dasharray':'4 4'});
  add(neutralLegend,'text',{x:440,y:176},'중성 입자');
  add(neutralLegend,'text',{x:405,y:198,'font-size':11},'직접 검출되지 않음');
  add(neutralLegend,'line',{x1:405,y1:226,x2:429,y2:226,stroke:'#ae674a','stroke-width':2.5});
  add(neutralLegend,'text',{x:440,y:231},'낮은 운동량');
  add(neutralLegend,'text',{x:440,y:251},'파이온');
  [trackLegendLine,trackLegendText,hitLegendDot,hitLegendText,neutralLegend].forEach(node=>node.classList.add('detector-key'));
  const compactDetector=window.matchMedia('(max-width:550px)');
  function resizeDetector(){detector.setAttribute('viewBox',compactDetector.matches?'0 0 400 350':'0 0 600 350');}
  compactDetector.addEventListener('change',resizeDetector);resizeDetector();
  const decayLabel=add(detector,'text',{x:cx+87,y:cy+33,'text-anchor':'middle',fill:'#ae674a'},'붕괴');
  let trackKind='long',trackProgress=1,trackAnimation=0,playing=false;
  const timeControl=document.createElement('div');timeControl.className='range-row';
  timeControl.innerHTML='<label for="track-progress">장면 이동</label><input id="track-progress" type="range" min="0" max="100" step="1" value="100"><output class="value" id="track-time" for="track-progress">100%</output>';
  document.querySelector('.diagram-controls').after(timeControl);
  function stopTrack(){if(trackAnimation)cancelAnimationFrame(trackAnimation);trackAnimation=0;playing=false;if($('track-play'))$('track-play').textContent=trackProgress>=1?'다시 재생':'계속 재생';}
  function drawTrack(){
    const end=trackKind==='short'?104:180;
    const progressDistance=trackProgress*180, distance=Math.min(end,progressDistance);
    let path=`M${cx},${cy}`;
    for(let r=2;r<distance;r+=2){const p=pos(r);path+=` L${p.x},${p.y}`;}
    const p=pos(distance);path+=` L${p.x},${p.y}`;charged.setAttribute('d',path);
    const hits=radius.filter(r=>r<=distance).length;
    hitDots.forEach((dot,index)=>dot.setAttribute('opacity',radius[index]<=distance?'1':'.08'));
    const decayed=trackKind==='short' && progressDistance>=end;
    moving.setAttribute('cx',p.x);moving.setAttribute('cy',p.y);moving.setAttribute('opacity',decayed?'0':'1');
    const origin=pos(end),finish=pos(Math.max(end,progressDistance));
    neutral.setAttribute('d',`M${origin.x},${origin.y} L${finish.x},${finish.y}`);
    const span=Math.min((progressDistance-end)/60,1);
    pion.setAttribute('d',`M${origin.x},${origin.y} q${30*span},${6*span} ${20*span},${32*span} q${-10*span},${12*span} ${-27*span},${-3*span}`);
    [neutral,pion,decayDot,decayLabel].forEach(node=>node.setAttribute('opacity',decayed?'1':'0'));
    neutralLegend.setAttribute('opacity',trackKind==='short'?'1':'0');
    const threshold=$('new-tracking').checked?3:7;
    const recognized=hits>=threshold;
    [charged,trackLegendLine].forEach(node=>{node.setAttribute('stroke',recognized?'#397970':'#aab6b4');node.setAttribute('stroke-width',recognized?'4':'2');node.setAttribute('stroke-dasharray',recognized?'none':'4 5');});
    trackLegendText.textContent=recognized?'재구성한 궤적':'경로 (참고 표시)';
    $('hit-count').textContent=`${hits}개`;
    $('track-result').textContent=recognized?'가능':trackProgress<1?'신호 수집 중':'이 기준으로 놓침';
    $('track-status').classList.toggle('warm',!recognized);
    $('track-status').textContent=trackProgress<1?`검출층에 신호가 남는 중입니다. 현재 ${hits}개.`:trackKind==='long'?'일곱 신호를 연결해 입자의 궤적을 재구성합니다.':recognized?'같은 네 신호를 짧은 궤적으로 읽습니다. 신호를 찾았다는 것만으로 초대칭 발견이 되는 것은 아닙니다.':'네 신호는 남아 있지만, 일곱 신호를 요구하는 분석으로는 궤적을 만들지 못합니다.';
    $('track-progress').value=String(Math.round(trackProgress*100));$('track-time').textContent=`${Math.round(trackProgress*100)}%`;
  }
  all('[data-track]').forEach(button=>button.addEventListener('click',()=>{stopTrack();trackKind=button.dataset.track;trackProgress=1;select('track',trackKind);drawTrack();$('track-play').textContent='다시 재생';}));
  $('new-tracking').addEventListener('change',drawTrack);
  $('track-progress').addEventListener('input',()=>{stopTrack();trackProgress=Number($('track-progress').value)/100;drawTrack();$('track-play').textContent=trackProgress>=1?'다시 재생':'계속 재생';});
  $('track-play').addEventListener('click',()=>{
    if(playing){stopTrack();return;}
    if(trackProgress>=1)trackProgress=0;
    playing=true;$('track-play').textContent='일시정지';
    const from=trackProgress,start=performance.now();
    function frame(now){trackProgress=Math.min(1,from+(now-start)/3600);drawTrack();if(trackProgress<1)trackAnimation=requestAnimationFrame(frame);else stopTrack();}
    trackAnimation=requestAnimationFrame(frame);
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopTrack();});
  drawTrack();
  const limits={displaced:{value:199,delta:'0.6',method:'충돌점에서 벗어난 궤적을 찾는 분석'},soft:{value:132,delta:'1.8',method:'낮은 운동량의 렙톤과 궤적을 함께 찾는 분석'}};
  all('[data-limit]').forEach(button=>button.addEventListener('click',()=>{
    const data=limits[button.dataset.limit];select('limit',button.dataset.limit);
    $('limit-number').textContent=data.value;$('limit-method').textContent=data.method;
    $('limit-fill').style.width=`${data.value/3}%`;$('limit-marker').style.left=`${data.value/3}%`;
    $('limit-status').textContent=`질량 차이 ${data.delta} GeV인 힉시노 모형에서, 배제 한계가 ${data.value} GeV까지 이릅니다.`;
    $('limit-graphic').setAttribute('aria-label',`가로축 0에서 300 GeV. 선택한 분석의 질량 한계 ${data.value} GeV`);
  }));
  const questions={yes:'A를 선택했습니다. 연구할 가치가 있다는 판단과 이론이 참이라는 판단에 같은 기준을 쓸 수 있을까요? 실험이 계속 미발견일 때 입장을 바꿀 조건도 정해 보세요.',no:'B를 선택했습니다. 실험이 아직 답하지 못한 여러 이론 중 무엇부터 연구할까요? 아름다움과 단순함을 대신할 선택 기준을 제시해 보세요.'};
  all('[data-choice]').forEach(button=>button.addEventListener('click',()=>{select('choice',button.dataset.choice);$('choice-response').textContent=questions[button.dataset.choice];}));
  const initialStep=location.hash.slice(1);
  showStep(steps.includes(initialStep)?initialStep:'idea',false);
})();
