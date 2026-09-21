(() => {
  'use strict';
  const sections = [...document.querySelectorAll('.lesson')];
  const stepLinks = [...document.querySelectorAll('.steps a')];
  const previous = document.getElementById('prev');
  const next = document.getElementById('next');
  const sources = document.getElementById('sources');
  let current = 0;
  let choice = '';
  const setText = (id, text) => { document.getElementById(id).textContent = text; };
  const setPressed = (selector, selected) => {
    document.querySelectorAll(selector).forEach(button => button.setAttribute('aria-pressed', String(button === selected)));
  };
  function showStep(index, focus = false) {
    current = Math.max(0, Math.min(sections.length - 1, index));
    sections.forEach((section, i) => { section.hidden = i !== current; });
    stepLinks.forEach((link, i) => {
      if (i === current) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    previous.disabled = current === 0;
    next.disabled = current === sections.length - 1;
    setText('sc', `${current + 1} / ${sections.length}`);
    if (focus) {
      document.getElementById(`title-s${current}`).focus({ preventScroll: true });
      window.scrollTo({ top: Math.max(0, document.querySelector('main').getBoundingClientRect().top + window.scrollY - document.querySelector('.steps').getBoundingClientRect().height - 20), behavior: 'instant' });
    }
  }
  function readHash(focus = false) {
    const hash = location.hash.slice(1);
    const index = sections.findIndex(section => section.id === hash);
    if (index >= 0) showStep(index, focus);
    else if (!hash) showStep(0, focus);
    if (hash.startsWith('src-') || hash === 'sources') sources.open = true;
  }
  function goTo(index) {
    const target = Math.max(0, Math.min(sections.length - 1, index));
    if (location.hash === `#s${target}`) showStep(target, true);
    else { location.hash = `s${target}`; }
  }
  document.documentElement.classList.add('js');
  showStep(0);
  readHash();
  window.addEventListener('hashchange', () => readHash(true));
  previous.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  stepLinks.forEach((link, i) => link.addEventListener('click', event => { event.preventDefault(); goTo(i); }));
  document.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target.closest('input,textarea,select,button,a,summary,[contenteditable="true"]')) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(current + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(current - 1); }
  });
  document.querySelectorAll('a[href^="#src-"]').forEach(link => link.addEventListener('click', () => { sources.open = true; }));

  const purposes = {
    belief: ['믿음의 기준', '이 이론을 사실로 받아들일 근거가 충분한가?', '아름다움이 좋은 단서를 주더라도, 그것만으로 경험적 지지를 대신할 수는 없습니다. 예측의 성공과 경쟁 설명, 반대 증거를 함께 따져야 합니다.'],
    understanding: ['이해의 기준', '이 설명은 관계와 추론을 더 잘 파악하게 하는가?', '내용과 표현 방식이 잘 맞으면 무엇이 왜 일어나는지 생각하기 쉬워질 수 있습니다. 그러나 이해하기 쉬운 설명이라는 사실이 곧 그 설명이 참이라는 보장은 아닙니다.'],
    pursuit: ['탐구의 기준', '불확실해도 시간과 자원을 들여 더 알아볼 가치가 있는가?', '새로운 질문과 예측을 만드는 설명은 아직 확인되지 않았어도 연구할 수 있습니다. 그때는 검사할 가능성, 다른 연구 기회, 투입할 자원도 함께 따져야 합니다.']
  };
  document.querySelectorAll('[data-purpose]').forEach(button => button.addEventListener('click', () => {
    setPressed('[data-purpose]', button);
    const [label, title, body] = purposes[button.dataset.purpose];
    setText('purpose-label', label); setText('purpose-title', title); setText('purpose-body', body);
  }));
  const years = {
    1928: ['전자에 대한 상대론적 방정식', '전자를 설명하는 방정식에 음의 에너지 해도 나타났습니다. 그 해를 어떻게 물리적으로 해석할지가 과제로 남았습니다.', '수학적 해석의 문제'],
    1931: ['전자와 질량은 같고, 전하는 반대인 입자', '디랙은 음의 에너지 상태의 빈자리를 양성자로 해석하던 견해를 수정하고, 새로운 반전자(anti-electron)를 제안했습니다.', '아직 발견되지 않은 입자의 예측'],
    1932: ['앤더슨의 우주선 관측에서 양전자를 발견', '양전자는 전자와 같은 질량을 가지며 양전하를 띠는 입자입니다. 입자의 존재는 수학적 매력에 관한 판단과 구별되는 관측의 대상이 되었습니다.', '예측과 연결되는 경험적 발견']
  };
  document.querySelectorAll('[data-year]').forEach(button => button.addEventListener('click', () => {
    setPressed('[data-year]', button);
    const [result, detail, status] = years[button.dataset.year];
    setText('dirac-result', result); setText('dirac-detail', detail); setText('dirac-status', status);
    const diagram = {1928: ['양자역학', '+', '특수상대론'], 1931: ['전자 e⁻', '↔', '반전자 e⁺'], 1932: ['양전하의 궤적', '+', '작은 입자 질량']}[button.dataset.year];
    ['relation-left', 'relation-sign', 'relation-right'].forEach((id, i) => setText(id, diagram[i]));
    document.getElementById('relation-right').style.borderStyle = button.dataset.year === '1931' ? 'dashed' : 'solid';
  }));
  const falls = {
    slow: ['느린 돌이 빠른 돌을 붙잡는다면', 'H 하나보다 느려야 한다', 'L이 혼자서는 더 느리게 떨어지고, 함께 묶으면 H를 늦춘다고 가정하면 두 돌의 묶음은 H보다 느려야 합니다.'],
    fast: ['묶음 전체의 무게를 적용한다면', 'H 하나보다 빨라야 한다', 'H와 L을 합친 묶음은 H 하나보다 무겁습니다. 무거울수록 빠르다는 기준을 묶음에 적용하면, 이번에는 더 빨라야 합니다. 두 설명이 충돌합니다.']
  };
  document.querySelectorAll('[data-fall]').forEach(button => button.addEventListener('click', () => {
    setPressed('[data-fall]', button);
    const [label, result, explanation] = falls[button.dataset.fall];
    setText('fall-label', label); setText('fall-result', result); setText('fall-explanation', explanation);
    document.querySelector('.fall-result').style.background = button.dataset.fall === 'fast' ? 'var(--rust-bg)' : 'var(--teal-bg)';
  }));
  const darwin = {
    whale: ['큰 변화의 가능성을 상상하기', '물에서 먹이를 얻는 동물', '수중 생활에 유리한 변이 · 여러 세대에 걸친 자연선택', '수중 생활에 더 적응한 형태', '다윈은 먹이가 충분하고 더 잘 적응한 경쟁자가 없다는 조건 아래, 헤엄치며 먹이를 잡는 곰에서 출발해 고래처럼 수중 생활에 적응한 형태를 상상했습니다.'],
    eye: ['작은 변화가 이어질 가능성을 상상하기', '빛을 구별하는 단순한 기관', '각 단계에서 유용할 수 있는 차이 · 여러 세대에 걸친 자연선택', '더 복잡한 시각 기관', '완성된 눈이 한 번에 나타나야 한다고 상상하는 대신, 중간 단계도 생존에 도움이 될 수 있다면 점진적 변화가 가능하다는 논증을 따라갑니다.']
  };
  document.querySelectorAll('[data-darwin]').forEach(button => button.addEventListener('click', () => {
    setPressed('[data-darwin]', button);
    const values = darwin[button.dataset.darwin];
    ['darwin-topic', 'darwin-start', 'darwin-process', 'darwin-end', 'darwin-caption'].forEach((id, i) => setText(id, values[i]));
  }));
  const responses = {
    A: 'A를 선택했습니다. 아름다움 이외에 어떤 설명의 장점이 있습니까? 어느 범위까지 시험하고, 어떤 결과가 누적되면 우선순위를 바꾸겠습니까?',
    B: 'B를 선택했습니다. 신호가 없다는 판단은 어떤 관측 범위와 가정에 기대고 있습니까? 대안은 무엇이며, 어떤 새 근거가 나오면 이 이론에 다시 투자하겠습니까?'
  };
  document.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
    choice = button.dataset.choice; setPressed('[data-choice]', button);
    setText('choice-response', responses[choice]); document.getElementById('download-answer').disabled = false;
  }));
  document.getElementById('download-answer').addEventListener('click', () => {
    if (!choice) return;
    const text = `W03 · 과학기술과 문명\n이론 선택: 아름다움과 증거\n\n선택: ${choice}. ${choice === 'A' ? '가능성에 더 투자한다' : '다른 설명에 무게를 옮긴다'}\n\n이유와 사례:\n${document.getElementById('reason').value.trim() || '(미작성)'}\n\n선택을 바꿀 조건:\n${document.getElementById('condition').value.trim() || '(미작성)'}\n\n더 연구할 가치가 있다는 것과, 참일 가능성이 높다는 것은 같은가?\n`;
    const url = URL.createObjectURL(new Blob(['\uFEFF', text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'W03_이론선택_토론.txt';
    document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
})();
