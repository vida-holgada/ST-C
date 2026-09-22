# 어디에 선을 그을까? · COMPAS 체험

「인공지능과 현대사회」 W04 수업용 한국어 인터랙티브 자료.

## 수업 순서

1. 점과 점수: 500명 격자와 점수별 분포 비교 (원본 graph1, graph2)
2. 기준선: 결과를 숨긴 상태에서 고위험 분류 연습 (graph2a)
3. 가상 결과: 완벽하게 구분할 수 있게 바꾼 결과 (graph3)
4. 실제 결과: 실제 표본에서 정확도 비교 (graph4)
5. 두 오류: 위양성·위음성의 분모와 부담 구별 (graph5)
6. 집단별 기준: 두 문턱과 같은 점수의 대우 비교 (graph6, graph6a)
7. 공통 기준: 하나의 문턱을 함께 적용하고 극단값까지 확인 (graph7)
8. 토론: 선택한 기준 저장, 수치 비교, 이유 정리

화면 오른쪽 위의 **교사용 안내**에 단계별 설명과 오해를 짚는 말을 넣었습니다. 각 단계는 `/#1`부터 `/#8`까지 바로 연결할 수 있습니다. 답과 선택한 기준은 사용 중인 브라우저에만 저장되며 서버로 전송하지 않습니다.

## 데이터와 출처

Karen Hao and Jonathan Stray, “Can You Make AI Fairer than a Judge? Play Our Courtroom Algorithm Game,” *MIT Technology Review*, October 17, 2019.

- [원문](https://www.technologyreview.com/2019/10/17/75285/ai-fairer-than-judge-criminal-risk-assessment-algorithm/)
- [원본 체험 graph4](https://technologyreview.github.io/Fairness/graph4.html)
- 원본 체험의 `data/real_score_bw.csv`에서 점수 × 집단 × 재체포 여부별 인원만 집계했습니다. 원본 500명 표본은 백인 198명, 흑인 302명이며 전체 재체포 기록 있음 230명, 없음 270명입니다.
- 이 저장소에는 원본 스크립트나 개별 CSV 행을 복제하지 않습니다. `data.js`는 비식별 집계값이고 모든 점과 계산은 새로 구현했습니다. 점의 배열 순서는 원본 개인과 대응하지 않습니다.
- 3단계에서는 점수 분포만 유지하고 재체포 여부를 인위적으로 바꿉니다. 다른 데이터 단계에서는 실제 표본의 기록을 사용합니다.
- `k점부터 고위험`은 `score >= k`입니다. 원본 소스의 문턱 `t`와 비교할 때에는 `k=t+1`입니다. 11점부터는 아무도 고위험으로 분류하지 않는 극단값입니다.
- 점수는 확률이 아닙니다. 재체포는 실제 범죄 전체나 유죄와 같지 않으며, 체험의 분류는 실제 판결을 재현하지 않습니다.

## 실행과 검산

빌드나 외부 라이브러리 없이 GitHub Pages로 실행합니다.

```sh
python3 -m http.server 8765
node test-model.cjs
```

`test-model.cjs`는 모든 문턱에서 인원 보존, 분모, 오류의 단조 변화, 가상 100%, 실제 최대 정확도, 집단별 예시와 극단값을 검산합니다.

초기 공개: 2026-09-22.
