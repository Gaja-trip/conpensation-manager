# 보상관리사 기출분석 웹페이지

2018년부터 2025년까지 보상관리사 기출 확보 현황을 정리하고, 확보된 2018년·2022년 PDF를 문제풀이 형식으로 만든 정적 웹페이지입니다. 1차 민법ㆍ부동산관계법규는 타 자격시험 공통 출제유형을 보상관리사 형식으로 바꾼 예상문제를 함께 제공하고, 공유 페이지와 CBTBank 5년치 기출에서 크롤링한 관련 주제도 별도 문제은행으로 풀 수 있게 구성했습니다.

## 열기

`index.html` 파일을 브라우저에서 열면 됩니다. 각 메뉴는 별도 HTML 페이지로 구성되어 있습니다.

## 구성

- `index.html`: 페이지 구조
- `exam-map.html`: 시험지도
- `archive.html`: 2018~2025 기출 확보 현황
- `practice.html`: 1차ㆍ2차 문제풀이 선택
- `practice-first.html`: 1차 기출ㆍ예상ㆍ사이트크롤링ㆍCBTBank변환 문제풀이와 문항별 답안 해석
- `practice-second.html`: 2차 객관식 문제풀이와 단답ㆍ약술형 연습
- `law.html`: 토지보상법 이해하기 패널과 법령 노트
- `frequency.html`: 반복 출제 주제
- `strategy.html`: 과목별 전략, 오답 신호, 2차 답안 프레임
- `drill.html`: 실전 점검 카드
- `plan.html`: 30일 회독 계획
- `styles.css`: 반응형 스타일
- `question-data.js`: 구조화한 객관식 문제, 주관식 연습 주제, 연도별 확보 현황
- `adapted-question-data.js`: 민법과 부동산관계법규 1차 예상 문제
- `crawled-first-question-data.js`: 공유 페이지 크롤링 해설을 매핑한 1차 문제은행
- `cbtbank-adapted-question-data.js`: CBTBank 5년치 관련 기출 주제를 보상관리사 1차 형식으로 바꾼 75문항 문제은행
- `first-exam-explanations.js`: 2018ㆍ2022년 1차 문항별 해설 데이터
- `law-guide-data.js`: 토지보상법 이해하기 패널과 법령 노트 링크
- `script.js`: 분석 데이터, 탭, 필터, 체크리스트, 문제풀이 인터랙션
- `laws/`: 토지보상법, 시행령, 시행규칙 핵심 조문 노트
- `analysis/extracted/`: PDF, 공유 페이지, CBTBank에서 추출한 분석용 텍스트

## 참고

한국토지보상관리사협회 Q&A에 따르면 협회는 기출문제를 공개하지 않습니다. 따라서 공개 검색으로 원문이 확인되지 않은 2019~2021년, 2023~2025년은 웹페이지에서 미확보 또는 공고만 확인 상태로 표시했습니다.
