const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const navItems = [
  ["lecture.html", "기본강의"],
  ["exam-map.html", "시험지도"],
  ["archive.html", "기출정리"],
  ["practice.html", "문제풀이"],
  ["law.html", "이해하기"],
  ["frequency.html", "출제빈도"],
  ["strategy.html", "과목전략"],
  ["drill.html", "실전평가"],
  ["plan.html", "회독계획"],
];

const introPages = [
  {
    slug: "lecture-intro-exam",
    title: "보상관리사 시험에 도전하는 여러분께",
    eyebrow: "머리말",
    lead: "보상관리사 시험은 부동산을 둘러싼 민법적 권리와 의무, 국토와 건축에 관한 법률, 토지보상 제도 등 다양한 법령과 제도를 바탕으로 출제됩니다.",
    sections: [
      {
        title: "보상관리사 시험에 도전하는 여러분께",
        paragraphs: [
          "시험에서 다루는 기본 개념들은 일상에서 부동산을 거래하거나 상속을 진행할 때, 혹은 국가ㆍ지자체의 개발사업에 참여할 때 매우 중요한 지식이 됩니다.",
          "이 교재는 이러한 지식을 처음 접하는 중학생과 고등학생, 나아가 법학에 익숙하지 않은 성인까지 누구나 이해할 수 있도록 친절하게 설명하는 것을 목표로 하고 있습니다.",
        ],
      },
      {
        title: "공부를 시작하기에 앞서",
        paragraphs: [
          "보상관리사 시험 공부는 단순히 법률 용어를 외우는 과정이 아닙니다. 부동산 권리관계와 공익사업의 보상절차가 실제 생활에서 어떤 의미를 갖는지 이해하는 과정입니다.",
        ],
      },
      {
        title: "학습의 이유와 목표 설정",
        paragraphs: [
          "부동산 거래나 상속, 공익사업으로 인한 토지보상 등은 언젠가 우리 모두에게 닥칠 수 있는 일들입니다.",
          "시험을 준비하는 과정에서 물권ㆍ상속의 기본 구조, 국토계획의 체계, 건축과 국유재산의 관리, 농지와 산지의 보전, 그리고 손실보상의 원칙을 이해한다면 삶 속에서도 현명한 판단을 내릴 수 있습니다.",
          "이를 염두에 두고 스스로 ‘왜 공부하는가?’를 질문하며, 시험 합격이라는 단기 목표와 실제 생활에서의 활용이라는 장기 목표를 함께 설정해 보세요.",
        ],
      },
      {
        title: "교재의 구성과 활용법",
        paragraphs: [
          "이 책은 민법(물권ㆍ상속), 부동산 관계법규, 토지보상법규의 세 영역으로 구성되어 있습니다.",
          "각 장마다 기본 개념을 먼저 설명하고, 사례와 삽화를 통해 이해를 돕습니다. 이어서 기출문제를 분석하여 출제 경향을 살펴보고, 비슷한 유형의 연습문제를 풀어보면서 실력을 다질 수 있도록 하였습니다.",
          "본문 중간의 ‘한눈에 보는 정리’ 코너는 중요한 내용을 요약해 두었으니 복습할 때 활용해 보세요.",
        ],
      },
      {
        title: "기출문제의 중요성",
        paragraphs: [
          "기출문제는 시험에서 무엇을 중요하게 보는지 알려주는 가장 확실한 자료입니다.",
          "예를 들어, 2022년 시험에서는 부동산에 대한 개념부터 물권변동과 등기의 효력, 점유와 취득시효 등 기본적인 물권법 지식이 반복적으로 출제되었습니다.",
          "또한 2018년 시험에서도 가등기의 효력, 취득시효, 공유ㆍ합유 등 핵심 개념이 강조되었습니다. 기출문제를 꼼꼼히 분석하면서 자신이 약한 부분을 찾아보는 것이 합격의 지름길입니다.",
        ],
      },
    ],
  },
  {
    slug: "lecture-intro-study",
    title: "학습 방법 및 조언",
    eyebrow: "머리말",
    lead: "법률 공부는 처음 접하면 어렵게 느껴질 수 있습니다. 그러나 기본 개념을 차근차근 쌓아가면 논리적인 사고력과 문제 해결 능력이 함께 향상됩니다.",
    sections: [
      {
        title: "핵심 개념 이해",
        paragraphs: [
          "용어 하나하나의 뜻을 정확히 이해하고, 관련 조문을 함께 읽어보세요. 어려운 법률 용어는 본문에서 쉽게 풀어 설명합니다.",
        ],
      },
      {
        title: "사례 중심 학습",
        paragraphs: [
          "실제 사례나 판례를 통해 개념이 어떻게 적용되는지를 생각해 보세요.",
          "책에서 제공하는 예제 외에도 일상에서 접하는 뉴스나 사례를 법적으로 해석해 보는 습관을 들이면 도움이 됩니다.",
        ],
      },
      {
        title: "주기적 복습과 정리",
        paragraphs: [
          "공부한 내용을 바로 정리하고, 일정 주기마다 반복해서 복습하세요.",
          "‘핵심 정리’ 표와 연습문제 풀이를 반복하면 기억에 오래 남습니다.",
        ],
      },
      {
        title: "체계적 문제 풀이",
        paragraphs: [
          "기출문제를 풀 때 단순히 정답만 확인하지 말고, 왜 틀렸는지, 어떤 조문이 적용되었는지 꼼꼼히 분석하세요.",
        ],
      },
      {
        title: "마치는 말",
        paragraphs: [
          "법률 공부는 처음 접하면 어렵게 느껴질 수 있습니다. 그러나 기본 개념을 차근차근 쌓아가다 보면 어느새 논리적인 사고력과 문제 해결 능력이 함께 향상되는 것을 느낄 수 있습니다.",
          "여러분이 이 책과 함께 보상관리사 시험을 준비하는 여정이 단순히 시험 합격을 넘어, 법과 부동산을 이해하는 탄탄한 기반을 만드는 시간이 되기를 바랍니다.",
        ],
      },
    ],
  },
];

const parts = [
  {
    slug: "civil",
    hub: "lecture-civil.html",
    title: "제1부 민법: 물권과 상속",
    shortTitle: "민법",
    subject: "민법",
    lead: "민법은 보상대상 토지와 물건의 권리자를 판단하는 기본 언어입니다. 물권과 채권을 구분하고, 등기와 점유, 공유관계와 상속관계를 보상절차에 연결해 읽는 것이 핵심입니다.",
    examFocus: ["물권변동과 등기 필요 여부", "점유와 취득시효의 요건", "공유ㆍ합유ㆍ총유의 관리와 처분", "상속인 범위와 상속재산분할"],
    lessons: [
      "민법 기초와 법의 분류",
      "민법의 체계와 기본 원칙",
      "물권과 채권의 구분, 물건의 종류",
      "물권의 유형과 내용",
      "소유권ㆍ점유권의 개념과 기능",
      "용익물권: 지상권, 지역권, 전세권 등",
      "담보물권: 유치권, 질권, 저당권과 가등기의 효력",
      "물권의 변동과 등기",
      "부동산 물권의 설정ㆍ변경ㆍ소멸과 등기 제도",
      "등기의 종류, 절차와 공신력",
      "물권 취득시효와 점유",
      "점유취득시효, 등기부취득시효의 요건과 효과",
      "선의ㆍ악의 점유 및 필요비ㆍ유익비의 상환",
      "공유, 합유, 총유",
      "공유지분의 관리ㆍ처분 및 분할",
      "합유ㆍ총유의 개념과 차이점",
      "상속법",
      "상속의 의의와 효력, 상속인의 범위",
      "법정상속분과 유류분, 유언 상속",
      "상속재산분할과 상속포기ㆍ한정승인 절차",
      "부동산 상속 등기의 방법과 유의점",
    ],
  },
  {
    slug: "real-estate",
    hub: "lecture-real-estate.html",
    title: "제2부 부동산 관계법규",
    shortTitle: "부동산관계법규",
    subject: "부동산관계법규",
    lead: "부동산관계법규는 토지의 이용 가능성과 제한을 읽는 과목입니다. 보상평가와 협의 과정에서 용도지역, 허가, 공시, 농지와 산지 제한이 어떻게 작동하는지 확인해야 합니다.",
    examFocus: ["용도지역ㆍ지구ㆍ구역의 규제 비교", "개발행위허가와 도시ㆍ군계획시설사업", "건축허가와 대지ㆍ도로 기준", "농지전용과 산지전용의 허가 체계"],
    lessons: [
      "국토의 계획 및 이용에 관한 법률",
      "국토계획 체계와 도시ㆍ군 계획",
      "용도지역ㆍ지구ㆍ구역의 종류와 규제",
      "개발행위허가와 도시ㆍ군계획시설사업",
      "국유재산법",
      "국유재산의 유형과 관리",
      "사용ㆍ대부, 무상사용, 매각 절차와 제한",
      "건축법",
      "건축물의 정의와 건축행위",
      "건축허가ㆍ신고, 대지와 도로, 용적률ㆍ건폐율 등 건축 기준",
      "부동산공시법",
      "지적제도와 토지ㆍ건물등기 제도의 개요",
      "부동산가격공시 및 감정평가 제도",
      "실거래가 신고와 공시제도의 활용",
      "농지법",
      "농지의 정의와 농지 소유ㆍ이용 요건",
      "농지전용허가, 농업진흥지역과 농지보전부담금",
      "농지의 임대차 및 전용에 관한 규제",
      "산지관리법: 산지보전관리규정",
      "산지의 구분과 보전관리 기본원칙",
      "산지전용허가ㆍ신고, 보전협력금 및 복구 명령",
      "산지관리계획과 산지보전관리구역의 지정ㆍ규제",
    ],
  },
  {
    slug: "compensation-law",
    hub: "lecture-compensation-law.html",
    title: "제3부 토지보상법규",
    shortTitle: "토지보상법규",
    subject: "토지보상법규",
    lead: "토지보상법규는 공익사업이 토지와 물건을 취득하거나 사용하는 절차와 손실보상 기준을 정리하는 과목입니다. 절차 순서, 권리자 범위, 보상항목, 불복절차를 함께 보아야 합니다.",
    examFocus: ["공익사업과 사업인정 절차", "보상계획 공고와 협의 절차", "재결과 수용개시일의 효과", "손실보상 기준과 권리구제"],
    lessons: [
      "토지보상법의 기초",
      "토지보상법의 목적과 기본원칙",
      "공익사업 범위와 사업인정 절차",
      "보상 절차",
      "사전조사와 보상계획 공고, 협의절차",
      "재결 신청ㆍ재결서 송달, 수용개시일과 권리 변동",
      "손실보상 기준과 산정",
      "토지ㆍ건물ㆍ입목 등 보상 대상과 평가 기준",
      "영업손실, 이주대책, 잔여지 보상",
      "환매권과 사용보상",
      "쟁송과 권리구제",
      "이의신청, 행정심판, 행정소송",
      "보상금 증액청구와 재결의 취소 소송",
      "분쟁 조정 사례와 판례 해설",
    ],
  },
  {
    slug: "practice-guide",
    hub: "lecture-practice-guide.html",
    title: "제4부 기출문제 해설과 연습문제",
    shortTitle: "기출ㆍ연습",
    subject: "기출문제 해설과 연습문제",
    lead: "기출문제와 연습문제는 기본강의에서 배운 개념이 실제 선택지로 어떻게 바뀌는지 확인하는 단계입니다. 단원별 복습과 모의고사를 통해 속도와 정확도를 함께 끌어올립니다.",
    examFocus: ["기출 선택지의 변형 패턴", "단원별 복습문제", "오답 해설 정리", "모의고사 시간 관리"],
    lessons: ["기출문제 해설과 연습문제", "물권ㆍ상속, 각 법규별 기출문제 수록과 상세 해설", "단원별 복습문제 및 모의고사"],
  },
  {
    slug: "appendix",
    hub: "lecture-appendix.html",
    title: "부록",
    shortTitle: "부록",
    subject: "부록",
    lead: "부록은 마지막 회독 때 가장 자주 펼치는 참고자료입니다. 주요 법령 전문, 개정 연혁, 용어정리, 법령별 비교표, 시험 준비 체크리스트를 한곳에서 확인하도록 구성합니다.",
    examFocus: ["법령 전문과 개정 연혁", "핵심 용어 정리", "법령별 비교표", "시험 준비 체크리스트"],
    lessons: ["부록", "주요 법령 전문 및 개정 연혁", "용어정리, 법령별 비교표, 시험 준비 체크리스트"],
  },
];

const lessonPages = [];
for (const part of parts) {
  part.lessons = part.lessons.map((title, index) => {
    const lesson = buildLesson(part, title, index);
    lessonPages.push(lesson);
    return lesson;
  });
}

writePage("lecture.html", renderLectureHome());
for (const page of introPages) writePage(`${page.slug}.html`, renderIntroPage(page));
for (const part of parts) writePage(part.hub, renderPartHub(part));
for (const lesson of lessonPages) writePage(`${lesson.slug}.html`, renderLessonPage(lesson));

console.log(JSON.stringify({ generated: 1 + introPages.length + parts.length + lessonPages.length }, null, 2));

function buildLesson(part, title, index) {
  const slug = `lecture-${part.slug}-${String(index + 1).padStart(2, "0")}`;
  return {
    slug,
    title,
    part,
    index,
    eyebrow: part.title,
    lead: makeLead(part, title),
    detailSections: makeDetailSections(part, title),
    concepts: makeConcepts(part, title),
    examPoints: makeExamPoints(part, title),
    practice: makePractice(part, title),
  };
}

function makeLead(part, title) {
  if (part.slug === "civil" && title === "민법 기초와 법의 분류") {
    return "민법 기초와 법의 분류는 민법이 어떤 생활관계를 다루는 법인지, 공법과 사법은 어떻게 구분되는지, 민법의 전체 체계와 기본 원칙은 무엇인지를 잡는 도입 단원입니다.";
  }
  if (part.slug === "practice-guide") {
    return `${title}에서는 기본강의에서 익힌 개념을 실제 문항으로 확인합니다. 정답만 맞히는 것이 아니라 왜 다른 선택지가 틀렸는지까지 정리하는 것이 목표입니다.`;
  }
  if (part.slug === "appendix") {
    return `${title}은 시험 직전 확인용 자료입니다. 조문, 용어, 비교표, 체크리스트를 짧게 반복해 암기 빈틈을 줄이는 데 초점을 둡니다.`;
  }
  return `${title}${topicParticle(title)} ${part.shortTitle}에서 보상관리사 1차 선택지로 자주 변형되는 기본 단원입니다. 개념의 정의, 요건, 효과를 구분하고 보상 실무에서 어떤 판단 자료로 쓰이는지 연결해 봅니다.`;
}

function makeDetailSections(part, title) {
  if (part.slug !== "civil" || title !== "민법 기초와 법의 분류") return null;
  return [
    {
      title: "1. 민법의 의의",
      paragraphs: [
        "민법은 개인과 개인 사이의 사적 생활관계를 규율하는 기본 법률입니다. 여기에는 부동산 매매, 임대차, 손해배상, 가족관계, 상속처럼 일상생활에서 반복적으로 발생하는 권리와 의무가 포함됩니다.",
        "보상관리사 시험에서는 민법을 단순한 이론 과목으로 보지 말고, 토지와 건물의 권리자, 점유자, 임차인, 상속인, 담보권자를 가려내는 기준으로 이해해야 합니다.",
      ],
      items: [
        "민법의 중심 관심: 사인 상호 간의 재산관계와 가족관계",
        "보상실무 연결: 누가 보상대상자인지, 어떤 권리가 우선하는지 판단하는 기초",
      ],
    },
    {
      title: "2. 법의 분류: 공법과 사법",
      paragraphs: [
        "법은 크게 공법과 사법으로 나누어 볼 수 있습니다. 공법은 국가나 지방자치단체 같은 공권력과 국민 사이의 관계를 규율하고, 사법은 개인과 개인 사이의 대등한 생활관계를 규율합니다.",
        "헌법, 형법, 행정법, 토지보상법은 공법적 성격이 강하고, 민법과 상법은 사법의 대표 영역입니다. 다만 실제 보상사건에서는 공법과 사법이 함께 작동합니다.",
      ],
      items: [
        "공법: 국가 권력 작용, 인허가, 수용, 재결, 행정소송",
        "사법: 소유권, 점유, 계약, 임대차, 상속, 담보권",
        "시험 포인트: 토지보상법 절차는 공법, 보상대상 권리 판단은 민법 지식과 연결",
      ],
    },
    {
      title: "3. 민법의 체계",
      paragraphs: [
        "우리 민법은 총칙, 물권, 채권, 친족, 상속의 5편 체계로 구성됩니다. 총칙은 민법 전반에 공통되는 원칙을 다루고, 물권과 채권은 재산관계를, 친족과 상속은 가족관계를 다룹니다.",
      ],
      items: [
        "총칙: 권리능력, 의사표시, 법률행위, 기간 등 공통 규정",
        "물권: 물건을 직접 지배하는 권리와 그 변동",
        "채권: 특정인에게 일정한 행위를 청구하는 권리",
        "친족: 혼인, 부모와 자녀, 후견, 부양 등 가족관계",
        "상속: 사망한 사람의 재산 승계와 분할",
      ],
    },
    {
      title: "4. 민법의 기본 원칙",
      paragraphs: [
        "근대 민법은 소유권 절대의 원칙, 사적 자치의 원칙, 자기 책임의 원칙을 기본 출발점으로 삼습니다. 다만 현대사회에서는 공공복리와 약자 보호를 위해 이 원칙들이 일정하게 수정됩니다.",
      ],
      items: [
        "소유권 절대의 원칙: 소유자는 법률의 제한 안에서 물건을 사용, 수익, 처분할 수 있음",
        "공공복리에 의한 제한: 국토계획법, 환경법, 토지보상법 등 특별법이 소유권 행사를 제한할 수 있음",
        "사적 자치의 원칙: 계약 체결과 권리 변동은 원칙적으로 당사자의 자유로운 의사에 맡김",
        "계약 자유의 수정: 임대차보호법, 소비자보호 법제 등은 약자를 보호하기 위해 강행규정을 둠",
        "자기 책임의 원칙: 고의 또는 과실로 타인에게 손해를 준 경우 책임을 지는 것이 원칙",
        "무과실 책임의 확대: 제조물책임, 환경오염 등 일정 분야에서는 과실이 없어도 책임이 인정될 수 있음",
      ],
    },
    {
      title: "5. 민법상 권리의 분류",
      paragraphs: [
        "민법상 권리는 크게 재산권과 신분권으로 나눌 수 있습니다. 재산권은 다시 물권과 채권으로 나뉘며, 이 구분은 보상관리사 시험에서 매우 자주 묻는 기본 틀입니다.",
      ],
      items: [
        "물권: 특정 물건을 직접 지배하는 배타적 권리. 소유권, 점유권, 지상권, 전세권, 저당권 등이 포함됨",
        "채권: 특정인에게 일정한 행위를 요구할 수 있는 상대적 권리. 매매대금청구권, 임대차상 청구권 등이 포함됨",
        "신분권: 혼인, 친족, 양자, 상속 등 가족관계에서 발생하는 권리와 의무",
        "핵심 비교: 물권은 모든 사람에게 주장할 수 있는 절대권이고, 채권은 특정 상대방에게 주장하는 상대권",
      ],
    },
    {
      title: "6. 보상관리사 시험과의 연결",
      paragraphs: [
        "공익사업으로 토지가 편입되면 토지보상법이라는 공법 절차가 작동하지만, 보상금을 누구에게 지급할지 판단할 때는 민법의 권리관계가 필요합니다.",
        "예를 들어 등기명의자, 실제 점유자, 상속인, 공유자, 저당권자, 전세권자, 임차인 사이의 권리관계를 구분해야 보상절차에서 분쟁을 줄일 수 있습니다.",
      ],
      items: [
        "소유권 제한과 정당보상은 토지보상법과 민법이 만나는 지점",
        "물권과 채권 구분은 보상대상자와 관계인 판단의 출발점",
        "상속관계는 사망한 토지소유자의 보상금 귀속 문제와 직접 연결",
        "등기와 점유는 권리자 확인과 취득시효 주장 판단에 중요",
      ],
    },
  ];
}

function makeConcepts(part, title) {
  if (part.slug === "civil" && title === "민법 기초와 법의 분류") {
    return [
      "민법은 사적 생활관계, 즉 개인 사이의 재산관계와 가족관계를 규율합니다.",
      "공법은 국가와 국민의 관계를, 사법은 개인과 개인의 관계를 다룹니다.",
      "민법은 총칙, 물권, 채권, 친족, 상속의 5편 체계로 구성됩니다.",
      "근대 민법의 3대 원칙은 소유권 절대, 사적 자치, 자기 책임입니다.",
      "재산권은 물권과 채권으로 나뉘며, 물권은 배타적 지배권, 채권은 특정인에 대한 청구권입니다.",
    ];
  }
  const shared = [
    `${title}의 법률상 위치와 핵심 용어를 먼저 확인합니다.`,
    "정의, 요건, 효과를 나누어 읽으면 선택지의 말바꾸기에 흔들리지 않습니다.",
    "보상 실무에서는 권리자 확인, 이용상황 판단, 절차 진행 가능성으로 연결됩니다.",
  ];
  if (title.includes("등기")) shared.push("등기는 권리변동의 공시 기능과 제3자 대항 문제를 함께 봅니다.");
  if (title.includes("상속")) shared.push("상속은 가족관계, 상속분, 포기ㆍ한정승인, 등기 정리를 함께 확인해야 합니다.");
  if (title.includes("농지")) shared.push("농지는 소유 제한, 이용 제한, 전용허가, 부담금 체계를 구분해야 합니다.");
  if (title.includes("산지")) shared.push("산지는 보전산지 여부, 전용허가, 복구의무, 보전협력금을 함께 정리합니다.");
  if (title.includes("재결") || title.includes("쟁송") || title.includes("소송")) shared.push("불복절차는 기간, 상대방, 청구취지를 정확히 구분하는 것이 중요합니다.");
  return shared;
}

function makeExamPoints(part, title) {
  if (part.slug === "civil" && title === "민법 기초와 법의 분류") {
    return [
      "공법과 사법을 구분하고, 토지보상법은 공법 절차이나 권리자 판단에는 민법이 필요하다는 점을 기억합니다.",
      "민법 5편 체계를 순서대로 암기합니다. 총칙, 물권, 채권, 친족, 상속입니다.",
      "소유권 절대의 원칙은 공공복리에 의해 제한될 수 있고, 토지보상법은 그 대표적인 특별법입니다.",
      "물권과 채권의 차이는 배타성, 절대성, 공시 필요성으로 비교합니다.",
      "시험 선택지는 법률명은 맞게 쓰고 성격이나 효과를 바꾸는 방식으로 출제될 수 있습니다.",
    ];
  }
  if (part.slug === "civil") {
    return [
      "물권과 채권을 바꾸어 쓰는 선택지를 먼저 제거합니다.",
      "등기 필요 여부와 점유 요건은 원칙과 예외를 표로 정리합니다.",
      "상속 문제는 상속개시, 상속인, 상속분, 등기 순서로 읽습니다.",
    ];
  }
  if (part.slug === "real-estate") {
    return [
      "법률명은 맞지만 주체, 허가권자, 효과를 바꾼 선택지를 주의합니다.",
      "용도지역ㆍ건축기준ㆍ공시제도는 정의와 계산 기준을 함께 확인합니다.",
      "농지와 산지는 전용허가, 제한구역, 부담금 또는 복구의무를 비교합니다.",
    ];
  }
  if (part.slug === "compensation-law") {
    return [
      "절차형 문제는 사전조사, 보상계획, 협의, 재결, 수용개시일 순서로 정리합니다.",
      "토지소유자, 관계인, 사업시행자, 수용위원회의 역할을 구분합니다.",
      "손실보상 항목은 토지, 물건, 영업, 이주, 잔여지, 환매권으로 나누어 봅니다.",
    ];
  }
  if (part.slug === "practice-guide") {
    return [
      "기출 선택지를 그대로 외우기보다 틀린 이유를 한 줄로 적습니다.",
      "단원별 복습문제는 같은 개념을 다른 사례로 바꾸어 다시 풉니다.",
      "모의고사는 시간 배분과 과목별 약점 확인용으로 사용합니다.",
    ];
  }
  return [
    "개정 연혁은 시행일과 적용 대상을 함께 표시합니다.",
    "용어정리는 비슷한 단어를 비교표로 묶어 암기합니다.",
    "체크리스트는 시험 전날 확인할 최소 항목만 남깁니다.",
  ];
}

function makePractice(part, title) {
  if (part.slug === "civil" && title === "민법 기초와 법의 분류") {
    return [
      "공법과 사법의 예를 각각 3개씩 적어 봅니다.",
      "민법 5편 체계를 보지 않고 순서대로 써 봅니다.",
      "소유권 절대, 사적 자치, 자기 책임의 원칙을 한 문장씩 설명합니다.",
      "물권과 채권의 차이를 ‘상대방’, ‘대상’, ‘공시’라는 단어를 넣어 비교합니다.",
      "토지보상 사례에서 민법 지식이 필요한 순간을 보상대상자, 관계인, 상속인, 담보권자 중 하나로 분류합니다.",
    ];
  }
  if (part.slug === "practice-guide") {
    return ["문제풀이 페이지에서 같은 과목 필터로 10문항을 풉니다.", "틀린 선택지를 기본강의 페이지 제목과 연결합니다.", "다음 회독 때 같은 유형을 다시 풀어 정답 근거를 말로 설명합니다."];
  }
  if (part.slug === "appendix") {
    return ["관련 법령 링크를 열어 최신 조문 제목을 확인합니다.", "용어를 세 줄 이하로 직접 다시 씁니다.", "비교표에서 헷갈리는 항목만 표시합니다."];
  }
  return [`${title}의 핵심 키워드를 5개만 뽑아 적습니다.`, "기출 또는 예상문제에서 같은 키워드가 들어간 선택지를 찾아 표시합니다.", "정답 근거를 조문, 판례, 절차 중 하나로 분류합니다."];
}

function renderLectureHome() {
  const partCards = parts
    .map(
      (part) => `
          <a class="lecture-card" href="${part.hub}">
            <span>${part.title}</span>
            <h3>${part.shortTitle}</h3>
            <p>${part.lead}</p>
          </a>`
    )
    .join("");
  const introCards = introPages
    .map(
      (page) => `
          <a class="lecture-card compact" href="${page.slug}.html">
            <span>${page.eyebrow}</span>
            <h3>${page.title}</h3>
            <p>${page.lead}</p>
          </a>`
    )
    .join("");

  return layout({
    title: "기본강의 | 보상관리사 기출분석",
    description: "보상관리사 1차 민법, 부동산관계법규, 토지보상법규와 기출해설, 부록을 단원별 강의 페이지로 정리한 기본강의 허브",
    current: "lecture.html",
    body: `
      <main id="top">
        <section class="section lecture-hero" aria-labelledby="lecture-title">
          <p class="eyebrow">Basic Lecture</p>
          <h1 id="lecture-title">보상관리사 기본강의</h1>
          <p class="hero-text">1차 세 과목을 교재 목차처럼 나누고, 각 단원을 별도 페이지로 열어 볼 수 있게 구성했습니다. 먼저 머리말을 읽고 과목별 강의로 들어가면 흐름이 자연스럽습니다.</p>
          <div class="hero-actions">
            <a class="button primary" href="lecture-civil.html">민법 강의</a>
            <a class="button secondary" href="practice-first.html">1차 문제풀이</a>
          </div>
        </section>
        <section class="section" aria-labelledby="preface-title">
          <div class="section-heading">
            <p class="eyebrow">Preface</p>
            <h2 id="preface-title">머리말</h2>
            <p>시험 구조와 학습 방법을 먼저 정리한 뒤 각 과목 강의로 넘어갑니다.</p>
          </div>
          <div class="lecture-grid two">${introCards}</div>
        </section>
        <section class="section muted-band" aria-labelledby="parts-title">
          <div class="section-heading">
            <p class="eyebrow">Course Map</p>
            <h2 id="parts-title">강의 목차</h2>
            <p>민법, 부동산관계법규, 토지보상법규, 기출문제, 부록을 각각 별도 페이지 묶음으로 구성했습니다.</p>
          </div>
          <div class="lecture-grid">${partCards}</div>
        </section>
      </main>`,
  });
}

function renderIntroPage(page) {
  return layout({
    title: `${page.title} | 기본강의`,
    description: page.lead,
    current: "lecture.html",
    body: `
      <main id="top">
        <section class="section page-section lesson-page">
          ${breadcrumb([["lecture.html", "기본강의"], [null, page.title]])}
          <p class="eyebrow">${page.eyebrow}</p>
          <h1>${page.title}</h1>
          <p class="hero-text">${page.lead}</p>
          <div class="lesson-layout">
            <article class="lesson-main">
              ${page.sections ? renderIntroSections(page.sections) : `${renderBlock("핵심 안내", page.points)}${renderBlock("학습 체크리스트", page.checklist)}`}
            </article>
            <aside class="lesson-aside">
              <h2>다음 이동</h2>
              <a href="lecture-civil.html">민법 기본강의</a>
              <a href="lecture-real-estate.html">부동산관계법규 기본강의</a>
              <a href="lecture-compensation-law.html">토지보상법규 기본강의</a>
            </aside>
          </div>
        </section>
      </main>`,
  });
}

function renderIntroSections(sections) {
  return sections
    .map(
      (section) => `<section class="lesson-block preface-block">
                <h2>${section.title}</h2>
                ${(section.paragraphs || []).map((paragraph) => `<p>${paragraph}</p>`).join("")}
                ${section.items ? `<ul class="lecture-list">${section.items.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
              </section>`
    )
    .join("");
}

function renderPartHub(part) {
  const lessonCards = part.lessons
    .map(
      (lesson) => `
          <a class="lecture-card lesson-link" href="${lesson.slug}.html">
            <span>${String(lesson.index + 1).padStart(2, "0")}</span>
            <h3>${lesson.title}</h3>
            <p>${lesson.lead}</p>
          </a>`
    )
    .join("");
  return layout({
    title: `${part.title} | 기본강의`,
    description: part.lead,
    current: "lecture.html",
    body: `
      <main id="top">
        <section class="section page-section">
          ${breadcrumb([["lecture.html", "기본강의"], [null, part.title]])}
          <p class="eyebrow">${part.subject}</p>
          <h1>${part.title}</h1>
          <p class="hero-text">${part.lead}</p>
          <div class="lecture-summary-band">
            ${part.examFocus.map((item) => `<span>${item}</span>`).join("")}
          </div>
        </section>
        <section class="section" aria-labelledby="toc-${part.slug}">
          <div class="section-heading">
            <p class="eyebrow">Table of Contents</p>
            <h2 id="toc-${part.slug}">단원별 강의</h2>
            <p>각 항목을 클릭하면 해당 강의 페이지로 이동합니다.</p>
          </div>
          <div class="lecture-grid three">${lessonCards}</div>
        </section>
      </main>`,
  });
}

function renderLessonPage(lesson) {
  const siblings = lesson.part.lessons;
  const prev = siblings[lesson.index - 1];
  const next = siblings[lesson.index + 1];
  return layout({
    title: `${lesson.title} | ${lesson.part.shortTitle}`,
    description: lesson.lead,
    current: "lecture.html",
    body: `
      <main id="top">
        <section class="section page-section lesson-page">
          ${breadcrumb([["lecture.html", "기본강의"], [lesson.part.hub, lesson.part.title], [null, lesson.title]])}
          <p class="eyebrow">${lesson.eyebrow}</p>
          <h1>${lesson.title}</h1>
          <p class="hero-text">${lesson.lead}</p>
          <div class="lesson-layout">
            <article class="lesson-main">
              ${lesson.detailSections ? renderIntroSections(lesson.detailSections) : ""}
              ${renderBlock("핵심 개념", lesson.concepts)}
              ${renderBlock("시험 포인트", lesson.examPoints)}
              ${renderBlock("복습 방법", lesson.practice)}
              <section class="lesson-block">
                <h2>연결 학습</h2>
                <p>이 단원을 읽은 뒤에는 문제풀이 페이지에서 같은 과목을 선택해 5문항 이상 풀어 보세요. 정답보다 중요한 것은 선택지마다 근거를 붙이는 연습입니다.</p>
                <div class="inline-actions">
                  <a class="button primary" href="practice-first.html">1차 문제풀이</a>
                  <a class="button secondary" href="${lesson.part.hub}">목차로 돌아가기</a>
                </div>
              </section>
            </article>
            <aside class="lesson-aside">
              <h2>${lesson.part.shortTitle} 목차</h2>
              ${siblings
                .map((item) => `<a href="${item.slug}.html"${item.slug === lesson.slug ? ' aria-current="page"' : ""}>${String(item.index + 1).padStart(2, "0")} ${item.title}</a>`)
                .join("")}
            </aside>
          </div>
          <nav class="lesson-nav" aria-label="이전 다음 강의">
            ${prev ? `<a href="${prev.slug}.html">이전: ${prev.title}</a>` : `<span></span>`}
            ${next ? `<a href="${next.slug}.html">다음: ${next.title}</a>` : `<a href="${lesson.part.hub}">목차로 돌아가기</a>`}
          </nav>
        </section>
      </main>`,
  });
}

function layout({ title, description, current, body }) {
  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    ${header(current)}
    ${body}
    <footer class="footer">
      <p>보상관리사 기본강의는 기출분석, 예상문제, 법령 이해하기 페이지와 함께 회독하도록 구성했습니다.</p>
      <p><a href="lecture.html">기본강의 홈</a> · <a href="practice.html">문제풀이</a> · <a href="law.html">토지보상법 이해하기</a></p>
    </footer>
  </body>
</html>
`;
}

function header(current) {
  return `<header class="topbar">
      <a class="brand" href="index.html" aria-label="보상관리사 기출분석 홈">
        <span class="brand-mark" aria-hidden="true">補</span>
        <span>보상관리사 기출분석</span>
      </a>
      <nav class="nav" aria-label="주요 메뉴">
        ${navItems.map(([href, label]) => `<a href="${href}"${href === current ? ' aria-current="page"' : ""}>${label}</a>`).join("\n        ")}
      </nav>
    </header>`;
}

function breadcrumb(items) {
  return `<nav class="breadcrumb" aria-label="현재 위치">${items
    .map(([href, label]) => (href ? `<a href="${href}">${label}</a>` : `<span>${label}</span>`))
    .join("<span>/</span>")}</nav>`;
}

function renderBlock(title, items) {
  return `<section class="lesson-block">
                <h2>${title}</h2>
                <ul class="lecture-list">
                  ${items.map((item) => `<li>${item}</li>`).join("")}
                </ul>
              </section>`;
}

function writePage(file, html) {
  fs.writeFileSync(path.join(root, file), html, "utf8");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function topicParticle(text) {
  const chars = [...String(text).trim()];
  for (let index = chars.length - 1; index >= 0; index -= 1) {
    const code = chars[index].charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) return (code - 0xac00) % 28 === 0 ? "는" : "은";
  }
  return "은";
}
