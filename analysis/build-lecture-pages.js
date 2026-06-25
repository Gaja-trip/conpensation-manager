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
    title: "보상관리사 시험의 구성과 과목별 출제 경향",
    eyebrow: "머리말",
    lead: "보상관리사 시험의 큰 틀과 1차 과목별 출제 흐름을 먼저 이해하면 각 단원을 왜 공부하는지 분명해집니다.",
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
    title: "학습 방법 안내 및 교재 활용법",
    eyebrow: "머리말",
    lead: "기본 개념, 사례, 기출문제, 복습표를 어떤 순서로 활용할지 정리해 회독 효율을 높이는 안내 페이지입니다.",
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
    groups: [
      {
        title: "법률행위",
        children: ["권리변동의 의의와 원인", "법률행위의 의의 및 종류"],
      },
      {
        title: "민법 기초와 법의 분류",
        children: ["민법의 체계와 기본 원칙", "물권과 채권의 구분, 물건의 종류"],
      },
      {
        title: "물권의 유형과 내용",
        children: ["소유권ㆍ점유권의 개념과 기능", "용익물권: 지상권, 지역권, 전세권 등", "담보물권: 유치권, 질권, 저당권과 가등기의 효력"],
      },
      {
        title: "물권의 변동과 등기",
        children: ["부동산 물권의 설정ㆍ변경ㆍ소멸과 등기 제도", "등기의 종류, 절차와 공신력"],
      },
      {
        title: "물권 취득시효와 점유",
        children: ["점유취득시효, 등기부취득시효의 요건과 효과", "선의ㆍ악의 점유 및 필요비ㆍ유익비의 상환"],
      },
      {
        title: "공유, 합유, 총유",
        children: ["공유지분의 관리ㆍ처분 및 분할", "합유ㆍ총유의 개념과 차이점"],
      },
      {
        title: "상속법",
        children: ["상속의 의의와 효력, 상속인의 범위", "법정상속분과 유류분, 유언 상속", "상속재산분할과 상속포기ㆍ한정승인 절차", "부동산 상속 등기의 방법과 유의점"],
      },
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
    groups: [
      {
        title: "국토의 계획 및 이용에 관한 법률",
        children: ["국토계획 체계와 도시ㆍ군 계획", "용도지역ㆍ지구ㆍ구역의 종류와 규제", "개발행위허가와 도시ㆍ군계획시설사업"],
      },
      {
        title: "국유재산법",
        children: ["국유재산의 유형과 관리", "사용ㆍ대부, 무상사용, 매각 절차와 제한"],
      },
      {
        title: "건축법",
        children: ["건축물의 정의와 건축행위", "건축허가ㆍ신고, 대지와 도로, 용적률ㆍ건폐율 등 건축 기준"],
      },
      {
        title: "부동산공시법",
        children: ["지적제도와 토지ㆍ건물등기 제도의 개요", "부동산가격공시 및 감정평가 제도", "실거래가 신고와 공시제도의 활용"],
      },
      {
        title: "농지법",
        children: ["농지의 정의와 농지 소유ㆍ이용 요건", "농지전용허가, 농업진흥지역과 농지보전부담금", "농지의 임대차 및 전용에 관한 규제"],
      },
      {
        title: "산지관리법: 산지보전관리규정",
        children: ["산지의 구분과 보전관리 기본원칙", "산지전용허가ㆍ신고, 보전협력금 및 복구 명령", "산지관리계획과 산지보전관리구역의 지정ㆍ규제"],
      },
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
    groups: [
      {
        title: "토지보상법의 기초",
        children: ["토지보상법의 목적과 기본원칙", "공익사업 범위와 사업인정 절차"],
      },
      {
        title: "보상 절차",
        children: ["사전조사와 보상계획 공고, 협의절차", "재결 신청ㆍ재결서 송달, 수용개시일과 권리 변동"],
      },
      {
        title: "손실보상 기준과 산정",
        children: ["토지ㆍ건물ㆍ입목 등 보상 대상과 평가 기준", "영업손실, 이주대책, 잔여지 보상", "환매권과 사용보상"],
      },
      {
        title: "쟁송과 권리구제",
        children: ["이의신청, 행정심판, 행정소송", "보상금 증액청구와 재결의 취소 소송", "분쟁 조정 사례와 판례 해설"],
      },
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
    groups: [
      {
        title: "기출문제 해설과 연습문제",
        children: ["물권ㆍ상속, 각 법규별 기출문제 수록과 상세 해설", "단원별 복습문제 및 모의고사"],
      },
    ],
  },
  {
    slug: "appendix",
    hub: "lecture-appendix.html",
    title: "부록",
    shortTitle: "부록",
    subject: "부록",
    lead: "부록은 마지막 회독 때 가장 자주 펼치는 참고자료입니다. 주요 법령 전문, 개정 연혁, 용어정리, 법령별 비교표, 시험 준비 체크리스트를 한곳에서 확인하도록 구성합니다.",
    examFocus: ["법령 전문과 개정 연혁", "핵심 용어 정리", "법령별 비교표", "시험 준비 체크리스트"],
    groups: [
      {
        title: "부록",
        children: ["주요 법령 전문 및 개정 연혁", "용어정리, 법령별 비교표, 시험 준비 체크리스트"],
      },
    ],
  },
];

const lessonPages = [];
for (const part of parts) {
  let lessonIndex = 0;
  part.groups = part.groups.map((group, groupIndex) => {
    const groupItems = [group.title, ...(group.children || [])];
    const lessons = groupItems.map((title, itemIndex) => {
      const lesson = buildLesson(part, {
        title,
        index: lessonIndex,
        groupIndex,
        groupTitle: group.title,
        groupChildren: group.children || [],
        isGroupParent: itemIndex === 0,
      });
      lessonIndex += 1;
      lessonPages.push(lesson);
      return lesson;
    });
    return { ...group, index: groupIndex, lessons };
  });
  part.lessons = part.groups.flatMap((group) => group.lessons);
}

writePage("lecture.html", renderLectureHome());
for (const page of introPages) writePage(`${page.slug}.html`, renderIntroPage(page));
for (const part of parts) writePage(part.hub, renderPartHub(part));
for (const lesson of lessonPages) writePage(`${lesson.slug}.html`, renderLessonPage(lesson));

console.log(JSON.stringify({ generated: 1 + introPages.length + parts.length + lessonPages.length }, null, 2));

function buildLesson(part, item) {
  const { title, index, groupIndex, groupTitle, groupChildren, isGroupParent } = item;
  const slug = `lecture-${part.slug}-${String(index + 1).padStart(2, "0")}`;
  return {
    slug,
    title,
    part,
    index,
    groupIndex,
    groupTitle,
    groupChildren,
    isGroupParent,
    eyebrow: part.title,
    lead: makeLead(part, title),
    detailSections: makeDetailSections(part, title),
    concepts: makeConcepts(part, title),
    examPoints: makeExamPoints(part, title),
    practice: makePractice(part, title),
  };
}

function makeLead(part, title) {
  if (part.slug === "civil" && title === "법률행위") {
    return "법률행위는 권리가 왜 생기고, 어떻게 바뀌며, 언제 사라지는지를 이해한 뒤 당사자의 의사표시로 이루어지는 권리변동을 공부하는 민법 총칙의 출발 단원입니다.";
  }
  if (part.slug === "civil" && title === "권리변동의 의의와 원인") {
    return "권리변동의 의의와 원인은 법률행위를 배우기 전에 먼저 잡아야 할 기초입니다. 권리의 발생, 변경, 소멸을 사례로 나누어 이해합니다.";
  }
  if (part.slug === "civil" && title === "법률행위의 의의 및 종류") {
    return "법률행위의 의의 및 종류는 사람의 의사표시가 법률효과를 만드는 구조와 단독행위, 계약, 합동행위의 차이를 정리하는 단원입니다.";
  }
  if (part.slug === "civil" && title === "민법 기초와 법의 분류") {
    return "민법 기초와 법의 분류는 민법이 어떤 생활관계를 다루는 법인지, 공법과 사법은 어떻게 구분되는지, 민법의 전체 체계와 기본 원칙은 무엇인지를 잡는 도입 단원입니다.";
  }
  if (part.slug === "civil" && title === "물권의 유형과 내용") {
    return "물권의 유형과 내용은 점유권, 소유권, 용익물권, 담보물권을 한눈에 구분하고 각 권리가 보상절차에서 어떤 의미를 갖는지 이해하는 핵심 단원입니다.";
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
  if (part.slug !== "civil") return null;
  if (title === "법률행위") {
    return [
      {
        title: "1. 권리변동을 먼저 이해하기",
        paragraphs: [
          "법률행위를 공부하기 전에 먼저 권리변동을 이해해야 합니다. 민법은 결국 누가 어떤 권리를 가지는지, 그 권리가 어떻게 바뀌는지, 언제 없어지는지를 정리하는 법이기 때문입니다.",
          "권리변동이란 권리가 새로 생기거나, 권리의 내용이나 주체가 바뀌거나, 기존 권리가 없어지는 것을 말합니다. 이 흐름을 잡으면 매매, 증여, 상속, 변제, 시효취득 같은 개념이 훨씬 쉽게 연결됩니다.",
        ],
        image: {
          src: "assets/legal-act-rights-change.png",
          alt: "법률행위와 권리변동의 의의, 원인, 사례, 시험 포인트를 정리한 인포그래픽",
          caption: "권리변동은 '권리의 발생, 변경, 소멸'을 먼저 보고, 그 원인이 법률행위인지 법률규정인지 나누어 이해하면 쉽습니다.",
        },
        table: {
          headers: ["구분", "뜻", "쉬운 예시"],
          rows: [
            ["권리의 발생", "없던 권리가 새로 생기는 것", "매매로 소유권을 취득하거나, 상속으로 권리를 취득하는 경우"],
            ["권리의 변경", "권리의 주체, 내용, 범위가 달라지는 것", "채권자가 바뀌거나, 저당권의 담보 범위가 변경되는 경우"],
            ["권리의 소멸", "기존 권리가 없어지는 것", "채무 변제로 채권이 소멸하거나, 담보권이 말소되는 경우"],
          ],
        },
      },
      {
        title: "2. 권리변동의 원인",
        paragraphs: [
          "권리변동의 원인은 크게 두 갈래로 나눌 수 있습니다. 하나는 사람이 의사표시를 해서 권리를 움직이는 경우이고, 다른 하나는 당사자의 의사와 무관하게 법이 정한 요건이 충족되어 권리가 움직이는 경우입니다.",
          "법률행위는 첫 번째 갈래에 해당합니다. 즉, 법률행위는 권리변동을 일으키는 여러 원인 중에서 사람의 의사표시를 중심으로 하는 원인입니다.",
        ],
        table: {
          headers: ["원인", "핵심 구조", "대표 사례"],
          rows: [
            ["법률행위", "당사자의 의사표시에 따라 권리변동 발생", "매매, 증여, 임대차, 전세권 설정, 저당권 설정, 유언"],
            ["법률규정ㆍ기타 법률사실", "법이 정한 요건이 충족되면 권리변동 발생", "상속, 시효취득, 변제, 목적물 멸실, 판결, 공용수용"],
          ],
        },
      },
      {
        title: "3. 사례로 보는 권리변동",
        paragraphs: [
          "추상적인 용어는 사례로 바꾸어 보면 금방 정리됩니다. 시험에서는 보통 사례를 주고 어떤 권리변동이 일어났는지, 그 원인이 법률행위인지 법률규정인지 묻는 방식으로 변형됩니다.",
        ],
        items: [
          "아파트 매매: 매도인에서 매수인으로 소유권이 이전되므로 권리의 발생ㆍ이전이 문제됩니다.",
          "전세권 설정: 세입자가 부동산을 사용ㆍ수익할 수 있는 전세권을 취득하므로 새로운 물권이 발생합니다.",
          "채무 변제: 돈을 갚으면 채권이 없어지므로 권리의 소멸입니다.",
          "상속: 사망이라는 법률사실에 따라 상속인에게 권리가 이전되므로 법률규정에 의한 권리변동입니다.",
          "장기간 점유: 법이 정한 기간과 요건을 갖추면 시효취득이 가능하므로 법률규정에 의한 권리취득입니다.",
        ],
      },
      {
        title: "4. 법률행위의 의의 및 종류로 연결",
        paragraphs: [
          "권리변동의 전체 그림을 본 뒤 법률행위를 공부하면 범위가 선명해집니다. 법률행위는 권리변동의 원인 중에서도 사람의 의사표시에 기초해 법률효과가 발생하는 행위입니다.",
          "따라서 법률행위 단원에서는 의사표시가 어떤 법률효과를 만들 수 있는지, 그 행위가 단독행위인지 계약인지, 재산행위인지 신분행위인지 구분하는 것이 핵심입니다.",
        ],
        items: [
          "단독행위: 한 사람의 의사표시만으로 성립하는 행위. 유언, 취소, 해제, 채무면제 등이 대표 예입니다.",
          "계약: 서로 대립하는 두 개 이상의 의사표시가 합치되어 성립하는 행위. 매매, 증여, 임대차가 대표 예입니다.",
          "합동행위: 같은 방향의 여러 의사표시가 모여 성립하는 행위. 사단법인 설립행위처럼 공동 목적을 향합니다.",
          "시험 포인트: 권리변동 전체 원인 중 법률행위만 따로 떼어, 의사표시와 법률효과의 연결 구조를 묻습니다.",
        ],
      },
    ];
  }
  if (title === "권리변동의 의의와 원인") {
    return [
      {
        title: "1. 권리변동의 의의",
        paragraphs: [
          "권리변동이란 권리가 새로 생기거나, 기존 권리의 내용이 달라지거나, 권리가 없어지는 것을 말합니다. 민법 문제를 풀 때는 먼저 '어떤 권리가 움직였는가?'를 찾으면 구조가 단순해집니다.",
          "권리변동은 발생, 변경, 소멸의 세 가지 틀로 정리합니다. 이 세 단어는 법률행위뿐 아니라 물권변동, 채권소멸, 상속, 시효취득 문제를 읽을 때도 반복해서 쓰입니다.",
        ],
        image: {
          src: "assets/legal-act-rights-change.png",
          alt: "권리변동의 발생, 변경, 소멸과 법률행위 및 법률규정에 의한 원인을 정리한 이미지",
          caption: "권리변동은 '발생ㆍ변경ㆍ소멸'과 '법률행위ㆍ법률규정' 두 축으로 나누어 보면 기억하기 쉽습니다.",
        },
      },
      {
        title: "2. 권리변동의 원인",
        paragraphs: [
          "권리변동은 원인에 따라 법률행위에 의한 권리변동과 법률규정 또는 기타 법률사실에 의한 권리변동으로 나뉩니다. 법률행위는 사람의 의사표시가 중심이고, 법률규정은 법이 정한 요건 충족이 중심입니다.",
        ],
        table: {
          headers: ["구분", "중심 기준", "예시"],
          rows: [
            ["법률행위", "사람의 의사표시", "매매, 증여, 임대차, 전세권 설정, 저당권 설정, 유언"],
            ["법률규정", "법이 정한 요건 충족", "상속, 시효취득, 변제, 목적물 멸실, 판결, 공용수용"],
          ],
        },
      },
      {
        title: "3. 시험에서 읽는 순서",
        paragraphs: [
          "시험에서는 지문이 길어도 읽는 순서는 단순합니다. 권리가 생겼는지, 바뀌었는지, 없어졌는지 먼저 판단하고, 그 원인이 의사표시인지 법률규정인지 확인합니다.",
        ],
        items: [
          "1단계: 움직인 권리가 소유권, 채권, 전세권, 저당권 중 무엇인지 찾습니다.",
          "2단계: 권리의 발생, 변경, 소멸 중 어디에 해당하는지 표시합니다.",
          "3단계: 그 원인이 매매ㆍ증여 같은 법률행위인지, 상속ㆍ시효취득 같은 법률규정인지 구분합니다.",
          "4단계: 부동산 물권이면 등기까지 필요한지 연결합니다.",
        ],
      },
    ];
  }
  if (title === "법률행위의 의의 및 종류") {
    return [
      {
        title: "1. 법률행위의 의의",
        paragraphs: [
          "법률행위란 일정한 법률효과를 발생시키려는 사람의 의사표시를 핵심 요소로 하는 법률요건입니다. 쉽게 말하면, 사람이 '권리를 만들거나 바꾸거나 없애겠다'는 의사를 표시하고 법이 그 의사에 효과를 인정하는 구조입니다.",
          "매매계약을 체결하면 소유권 이전과 대금지급이라는 효과가 문제되고, 채무면제를 하면 채권이 소멸하는 효과가 문제됩니다. 이처럼 법률행위는 권리변동의 원인 중 하나입니다.",
        ],
      },
      {
        title: "2. 법률행위의 종류",
        paragraphs: [
          "법률행위는 분류 기준에 따라 여러 가지로 나뉩니다. 시험에서는 명칭보다 효과와 구조를 보고 구분하는 문제가 자주 나옵니다.",
        ],
        table: {
          headers: ["분류", "의미", "예시"],
          rows: [
            ["단독행위", "한 사람의 의사표시만으로 성립", "유언, 취소, 해제, 채무면제"],
            ["계약", "서로 대립하는 의사표시의 합치로 성립", "매매, 증여, 임대차"],
            ["합동행위", "같은 방향의 여러 의사표시가 모여 성립", "사단법인 설립행위"],
            ["재산행위", "재산상 권리변동을 목적으로 함", "매매, 저당권 설정, 채권양도"],
            ["신분행위", "가족관계나 신분관계를 목적으로 함", "혼인, 입양, 유언"],
          ],
        },
      },
      {
        title: "3. 권리변동과 연결해 기억하기",
        paragraphs: [
          "법률행위는 독립된 암기 단원이 아니라 권리변동의 한 원인입니다. 따라서 법률행위의 종류를 볼 때마다 그 행위가 권리를 발생시키는지, 변경시키는지, 소멸시키는지 함께 표시해 두면 좋습니다.",
        ],
        items: [
          "매매: 매수인에게 소유권 취득의 원인이 되고, 매도인에게 대금채권이 발생합니다.",
          "저당권 설정계약: 채권자를 위해 담보물권이 발생합니다.",
          "채무면제: 채권자의 단독행위로 채권이 소멸합니다.",
          "해제: 계약관계를 소급적으로 정리하는 효과가 문제됩니다.",
        ],
      },
    ];
  }
  if (title === "물권의 유형과 내용") {
    return [
      {
        title: "1. 물권의 큰 그림",
        paragraphs: [
          "물권은 특정 물건을 직접 지배할 수 있는 권리입니다. 채권이 특정 사람에게 무엇을 해 달라고 청구하는 권리라면, 물권은 물건 자체를 지배하고 그 지배를 다른 사람에게도 주장할 수 있는 권리입니다.",
          "보상관리사 시험에서는 물권의 이름을 외우는 것보다 각 물권이 무엇을 지배하는지, 어떤 방식으로 공시되는지, 보상절차에서 권리자로 고려되는지를 연결해서 이해해야 합니다.",
        ],
        table: {
          headers: ["구분", "대표 권리", "쉽게 말하면", "시험 키워드"],
          rows: [
            ["기본 물권", "점유권", "실제로 물건을 지배하는 상태를 보호", "자주점유, 타주점유, 점유보호청구"],
            ["완전 물권", "소유권", "물건을 사용, 수익, 처분할 수 있는 가장 넓은 권리", "반환청구, 방해제거, 공공복리 제한"],
            ["용익물권", "지상권, 지역권, 전세권", "남의 물건을 일정 목적에 맞게 사용하고 이익을 얻는 권리", "사용ㆍ수익, 등기, 존속기간"],
            ["담보물권", "유치권, 질권, 저당권", "빚을 갚게 하거나 우선변제를 받기 위한 권리", "유치, 점유 이전, 등기, 우선변제"],
          ],
        },
      },
      {
        title: "2. 물권법정주의와 공시",
        paragraphs: [
          "민법 제185조는 물권의 종류와 내용을 법률 또는 관습법으로만 정할 수 있다고 봅니다. 당사자가 계약으로 새로운 이름의 물권을 마음대로 만들 수 없다는 뜻입니다.",
          "물권은 모든 사람에게 주장될 수 있으므로 외부에서 권리관계를 알 수 있어야 합니다. 그래서 부동산은 등기, 동산은 점유가 중요한 공시수단이 됩니다.",
        ],
        items: [
          "물권법정주의: 법률이나 관습법에 없는 새로운 물권은 임의로 만들 수 없습니다.",
          "부동산 공시: 소유권, 저당권, 전세권, 지상권 등은 등기로 외부에 표시합니다.",
          "동산 공시: 동산은 점유 이전이 권리 변동을 드러내는 기본 방식입니다.",
          "등기의 공신력 주의: 우리 법은 원칙적으로 등기부가 틀렸을 때 그 등기만 믿은 사람을 항상 보호하지는 않습니다.",
        ],
      },
      {
        title: "3. 소유권과 점유권",
        paragraphs: [
          "소유권은 물건을 법률의 범위 안에서 사용, 수익, 처분할 수 있는 가장 포괄적인 권리입니다. 반면 점유권은 소유자인지와 별개로 물건을 사실상 지배하는 상태를 법이 보호하는 제도입니다.",
          "예를 들어 임차인은 집의 소유자는 아니지만 실제로 집을 사용하고 있으므로 점유자가 될 수 있습니다. 따라서 소유권과 점유권은 같은 사람에게 있을 수도 있고, 서로 다른 사람에게 나뉘어 있을 수도 있습니다.",
        ],
        table: {
          headers: ["비교", "소유권", "점유권"],
          rows: [
            ["핵심 의미", "물건에 대한 가장 넓은 법률상 지배권", "물건을 사실상 지배하는 상태의 보호"],
            ["주요 권능", "사용, 수익, 처분", "점유보호청구, 과실수취, 비용상환"],
            ["대표 쟁점", "소유물반환청구, 방해제거청구, 공용수용", "자주점유, 타주점유, 선의ㆍ악의 점유"],
            ["보상 연결", "토지ㆍ건물 보상금의 기본 귀속자 판단", "현실 이용자, 임차인, 취득시효 주장 검토"],
          ],
        },
      },
      {
        title: "4. 용익물권: 남의 물건을 사용하는 권리",
        paragraphs: [
          "용익물권은 타인의 물건을 일정한 목적에 따라 사용하고 수익할 수 있는 제한물권입니다. 소유권 전체를 가져오는 것이 아니라 필요한 범위만큼 타인의 소유권 행사를 제한합니다.",
          "지상권, 지역권, 전세권은 모두 남의 부동산을 이용한다는 점에서 비슷하지만, 이용 목적과 권리 구조가 다릅니다.",
        ],
        table: {
          headers: ["권리", "무엇을 위한 권리인가", "핵심 요건", "구분 포인트"],
          rows: [
            ["지상권", "타인의 토지 위에 건물, 공작물, 수목을 소유하기 위한 토지 사용권", "설정계약과 등기", "토지 위의 건물ㆍ공작물 소유 목적"],
            ["지역권", "자기 토지의 편익을 위해 타인의 토지를 이용하는 권리", "요역지와 승역지, 설정계약과 등기", "통행, 배수처럼 두 토지 사이의 이용관계"],
            ["전세권", "전세금을 지급하고 타인의 부동산을 사용ㆍ수익하며 전세금 반환을 담보받는 권리", "전세권 설정계약, 전세금, 등기", "용익물권이면서 전세금 우선변제라는 담보적 성격도 가짐"],
          ],
        },
      },
      {
        title: "5. 담보물권: 채권을 안전하게 만드는 권리",
        paragraphs: [
          "담보물권은 채무자가 돈을 갚지 않을 때 채권자가 목적물에서 우선적으로 변제를 받을 수 있도록 하는 권리입니다. 핵심은 물건의 사용가치가 아니라 교환가치, 즉 팔아서 돈으로 바꿀 수 있는 가치입니다.",
          "유치권, 질권, 저당권은 모두 담보 목적이 있지만 성립 방식이 다릅니다. 특히 저당권은 목적물을 채권자에게 넘기지 않고도 등기로 담보를 설정한다는 점이 중요합니다.",
        ],
        table: {
          headers: ["권리", "성립 모습", "목적물", "시험 포인트"],
          rows: [
            ["유치권", "물건과 관련된 채권을 가진 사람이 그 물건을 점유하고 반환을 거절", "타인의 물건 또는 유가증권", "법정담보물권, 견련성, 적법한 점유"],
            ["질권", "채무자 등이 제공한 동산이나 권리를 채권자가 점유", "동산, 재산권", "약정담보물권, 목적물 인도 필요"],
            ["저당권", "부동산 등을 넘기지 않고 등기로 담보 설정", "부동산, 지상권, 전세권 등", "점유 이전 없음, 등기 필요, 우선변제"],
            ["가등기", "장래 본등기의 순위를 보전하기 위한 예비등기", "소유권이전청구권 등", "독자적 물권이 아니라 순위보전 또는 담보 기능으로 이해"],
          ],
        },
      },
      {
        title: "6. 보상관리사 관점의 정리",
        paragraphs: [
          "공익사업으로 토지가 편입되면 소유권자는 보상금의 기본 대상자가 됩니다. 그러나 등기부상 권리자, 실제 점유자, 전세권자, 저당권자, 임차인 등이 얽혀 있으면 보상절차에서 관계인 판단이 필요합니다.",
          "따라서 물권 단원은 민법 이론이면서 동시에 토지보상법규를 읽기 위한 지도입니다. 권리의 종류를 파악하면 보상대상, 협의 상대방, 배당 또는 권리소멸 문제를 더 정확히 이해할 수 있습니다.",
        ],
        items: [
          "문제를 읽을 때는 먼저 권리의 이름을 찾고, 그 권리가 소유권인지 점유인지 용익물권인지 담보물권인지 분류합니다.",
          "다음으로 등기나 점유처럼 공시가 필요한 권리인지 확인합니다.",
          "마지막으로 그 권리가 보상금 귀속, 사용ㆍ수익 제한, 우선변제, 권리소멸 중 어디에 영향을 주는지 연결합니다.",
        ],
      },
    ];
  }
  if (title !== "민법 기초와 법의 분류") return null;
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
  if (part.slug === "civil" && title === "법률행위") {
    return [
      "권리변동은 권리의 발생, 변경, 소멸을 말합니다.",
      "권리변동의 원인은 법률행위와 법률규정ㆍ기타 법률사실로 나눌 수 있습니다.",
      "법률행위는 사람의 의사표시에 기초해 법률효과가 발생하는 권리변동 원인입니다.",
      "매매, 증여, 임대차, 전세권 설정, 저당권 설정은 대표적인 법률행위입니다.",
      "상속, 시효취득, 변제, 목적물 멸실, 판결, 공용수용은 법률규정 또는 기타 법률사실에 의한 권리변동으로 봅니다.",
    ];
  }
  if (part.slug === "civil" && title === "권리변동의 의의와 원인") {
    return [
      "권리변동은 권리가 새로 생기거나, 내용이 바뀌거나, 없어지는 현상입니다.",
      "권리의 발생, 변경, 소멸을 먼저 구분하면 사례형 지문이 쉬워집니다.",
      "권리변동의 원인은 의사표시 중심의 법률행위와 법률요건 충족 중심의 법률규정으로 나뉩니다.",
      "부동산 권리변동은 원인만 보지 말고 등기 같은 공시수단까지 함께 확인합니다.",
    ];
  }
  if (part.slug === "civil" && title === "법률행위의 의의 및 종류") {
    return [
      "법률행위는 의사표시를 핵심으로 하는 법률요건입니다.",
      "법률행위는 권리의 발생, 변경, 소멸이라는 법률효과를 목적으로 합니다.",
      "단독행위는 한 사람의 의사표시, 계약은 서로 대립하는 의사표시의 합치, 합동행위는 같은 방향의 의사표시 결합으로 성립합니다.",
      "법률행위의 종류는 이름보다 의사표시 구조와 법률효과를 기준으로 구분합니다.",
    ];
  }
  if (part.slug === "civil" && title === "민법 기초와 법의 분류") {
    return [
      "민법은 사적 생활관계, 즉 개인 사이의 재산관계와 가족관계를 규율합니다.",
      "공법은 국가와 국민의 관계를, 사법은 개인과 개인의 관계를 다룹니다.",
      "민법은 총칙, 물권, 채권, 친족, 상속의 5편 체계로 구성됩니다.",
      "근대 민법의 3대 원칙은 소유권 절대, 사적 자치, 자기 책임입니다.",
      "재산권은 물권과 채권으로 나뉘며, 물권은 배타적 지배권, 채권은 특정인에 대한 청구권입니다.",
    ];
  }
  if (part.slug === "civil" && title === "물권의 유형과 내용") {
    return [
      "물권은 특정 물건을 직접 지배하고 누구에게나 주장할 수 있는 절대권입니다.",
      "민법상 대표 물권은 점유권, 소유권, 지상권, 지역권, 전세권, 유치권, 질권, 저당권입니다.",
      "소유권은 사용, 수익, 처분을 모두 포함하는 가장 포괄적인 권리입니다.",
      "용익물권은 타인의 물건을 사용ㆍ수익하는 권리이고, 담보물권은 채권의 변제를 확보하는 권리입니다.",
      "부동산 물권은 등기, 동산 물권은 점유를 통해 외부에 권리관계를 드러냅니다.",
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
  if (part.slug === "civil" && title === "법률행위") {
    return [
      "법률행위 문제는 권리변동 전체 그림에서 출발해야 합니다.",
      "권리의 발생, 변경, 소멸 중 어디에 해당하는지 먼저 표시합니다.",
      "법률행위에 의한 변동인지, 법률규정에 의한 변동인지 구분합니다.",
      "법률행위는 당사자의 의사표시가 핵심이라는 점을 기억합니다.",
      "부동산 권리변동 사례에서는 매매계약만으로 끝내지 말고 등기 필요 여부까지 연결합니다.",
    ];
  }
  if (part.slug === "civil" && title === "권리변동의 의의와 원인") {
    return [
      "발생은 없던 권리가 생기는 것, 변경은 주체ㆍ내용ㆍ범위가 달라지는 것, 소멸은 권리가 없어지는 것입니다.",
      "상속과 시효취득은 당사자 의사표시보다 법률규정의 요건 충족을 중심으로 봅니다.",
      "변제는 채권을 소멸시키는 대표 사례로 정리합니다.",
      "공용수용은 공법상 절차이지만 소유권 변동과 보상금 귀속을 함께 묻는 방식으로 나올 수 있습니다.",
    ];
  }
  if (part.slug === "civil" && title === "법률행위의 의의 및 종류") {
    return [
      "단독행위, 계약, 합동행위의 차이는 의사표시가 몇 개이고 어떤 방향인지로 구분합니다.",
      "유언은 단독행위이면서 사후에 효과가 발생하는 행위입니다.",
      "매매와 증여는 계약이고, 채무면제는 단독행위입니다.",
      "재산행위와 신분행위는 권리변동의 대상이 재산관계인지 가족관계인지로 구분합니다.",
    ];
  }
  if (part.slug === "civil" && title === "민법 기초와 법의 분류") {
    return [
      "공법과 사법을 구분하고, 토지보상법은 공법 절차이나 권리자 판단에는 민법이 필요하다는 점을 기억합니다.",
      "민법 5편 체계를 순서대로 암기합니다. 총칙, 물권, 채권, 친족, 상속입니다.",
      "소유권 절대의 원칙은 공공복리에 의해 제한될 수 있고, 토지보상법은 그 대표적인 특별법입니다.",
      "물권과 채권의 차이는 배타성, 절대성, 공시 필요성으로 비교합니다.",
      "시험 선택지는 법률명은 맞게 쓰고 성격이나 효과를 바꾸는 방식으로 출제될 수 있습니다.",
    ];
  }
  if (part.slug === "civil" && title === "물권의 유형과 내용") {
    return [
      "물권법정주의는 새로운 물권을 계약만으로 만들 수 없다는 뜻입니다.",
      "점유권과 소유권을 구분합니다. 점유자는 실제 지배자이고, 소유자는 법률상 가장 넓은 지배권자입니다.",
      "지상권은 건물ㆍ공작물ㆍ수목 소유, 지역권은 요역지 편익, 전세권은 전세금과 사용ㆍ수익을 중심으로 구분합니다.",
      "유치권은 점유와 견련성, 질권은 목적물 인도, 저당권은 등기와 우선변제가 핵심입니다.",
      "가등기는 독자적인 물권으로 보기보다 본등기의 순위보전 또는 담보 기능으로 이해합니다.",
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
  if (part.slug === "civil" && title === "법률행위") {
    return [
      "매매, 상속, 변제, 시효취득, 저당권 설정을 권리의 발생ㆍ변경ㆍ소멸로 분류합니다.",
      "각 사례가 법률행위에 의한 권리변동인지 법률규정에 의한 권리변동인지 표시합니다.",
      "첨부 이미지를 보고 권리변동의 원인을 두 갈래로 다시 설명해 봅니다.",
      "부동산 매매 사례에서 계약, 등기, 소유권 이전을 순서대로 적어 봅니다.",
    ];
  }
  if (part.slug === "civil" && title === "권리변동의 의의와 원인") {
    return [
      "권리의 발생, 변경, 소멸 예시를 각각 3개씩 적어 봅니다.",
      "법률행위에 의한 권리변동과 법률규정에 의한 권리변동을 표로 비교합니다.",
      "보상사례에서 소유권이 언제, 어떤 원인으로 변동되는지 찾아봅니다.",
    ];
  }
  if (part.slug === "civil" && title === "법률행위의 의의 및 종류") {
    return [
      "단독행위, 계약, 합동행위의 예를 각각 2개씩 적어 봅니다.",
      "매매, 유언, 채무면제, 사단법인 설립행위를 의사표시 구조로 구분합니다.",
      "각 법률행위가 권리의 발생, 변경, 소멸 중 어떤 효과와 연결되는지 표시합니다.",
    ];
  }
  if (part.slug === "civil" && title === "민법 기초와 법의 분류") {
    return [
      "공법과 사법의 예를 각각 3개씩 적어 봅니다.",
      "민법 5편 체계를 보지 않고 순서대로 써 봅니다.",
      "소유권 절대, 사적 자치, 자기 책임의 원칙을 한 문장씩 설명합니다.",
      "물권과 채권의 차이를 ‘상대방’, ‘대상’, ‘공시’라는 단어를 넣어 비교합니다.",
      "토지보상 사례에서 민법 지식이 필요한 순간을 보상대상자, 관계인, 상속인, 담보권자 중 하나로 분류합니다.",
    ];
  }
  if (part.slug === "civil" && title === "물권의 유형과 내용") {
    return [
      "점유권, 소유권, 용익물권, 담보물권을 네 칸 표로 나누고 각 칸에 대표 권리를 적습니다.",
      "지상권, 지역권, 전세권의 차이를 ‘목적’, ‘대상’, ‘등기’라는 단어를 넣어 비교합니다.",
      "유치권, 질권, 저당권을 성립 요건 중심으로 한 줄씩 정리합니다.",
      "토지보상 사례를 하나 정해 소유자, 점유자, 전세권자, 저당권자를 각각 표시해 봅니다.",
      "문제풀이에서 물권과 채권을 바꾸어 놓은 선택지를 찾아 오답 이유를 적습니다.",
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
              <h2>머리말 목차</h2>
              ${renderIntroAside(page.slug)}
              <h2 class="aside-section-title">과목 이동</h2>
              <a class="lesson-aside-main" href="lecture-civil.html">제1부 민법</a>
              <a class="lesson-aside-main" href="lecture-real-estate.html">제2부 부동산 관계법규</a>
              <a class="lesson-aside-main" href="lecture-compensation-law.html">제3부 토지보상법규</a>
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
                ${section.image ? renderLessonImage(section.image) : ""}
                ${section.table ? renderLessonTable(section.table) : ""}
                ${section.items ? `<ul class="lecture-list">${section.items.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
              </section>`
    )
    .join("");
}

function renderLessonTable(table) {
  return `<div class="lesson-table-wrap">
                  <table class="lesson-table">
                    <thead>
                      <tr>${table.headers.map((header) => `<th scope="col">${header}</th>`).join("")}</tr>
                    </thead>
                    <tbody>
                      ${table.rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}
                    </tbody>
                  </table>
                </div>`;
}

function renderLessonImage(image) {
  return `<figure class="lesson-figure">
                  <img src="${image.src}" alt="${image.alt}">
                  ${image.caption ? `<figcaption>${image.caption}</figcaption>` : ""}
                </figure>`;
}

function renderIntroAside(currentSlug) {
  return introPages.map((page, index) => `<a class="lesson-aside-main" href="${page.slug}.html"${page.slug === currentSlug ? ' aria-current="page"' : ""}>${index + 1}. ${page.title}</a>`).join("");
}

function renderLessonSummaryBand(group) {
  const items = group.lessons.map((lesson) => lesson.title);
  return `<div class="lecture-summary-band">
            ${items.map((item) => `<span>${item}</span>`).join("")}
          </div>`;
}

function renderSubtopicBlock(group) {
  if (!group || group.lessons.length <= 1) return "";
  return `<section class="lesson-block subtopic-block">
                <h2>이 단원의 세부 목차</h2>
                <p>${group.title} 단원은 아래 항목을 한 흐름으로 묶어 공부합니다. 상위 개념을 먼저 잡고, 하위 주제를 차례로 확인하면 선택지 변형을 더 쉽게 읽을 수 있습니다.</p>
                <ol class="subtopic-list">
                  ${group.lessons
                    .slice(1)
                    .map((lesson) => `<li><a href="${lesson.slug}.html">${lesson.title}</a></li>`)
                    .join("")}
                </ol>
              </section>`;
}

function renderParentBlock(group) {
  if (!group || group.lessons.length <= 1) return "";
  const parent = group.lessons[0];
  return `<section class="lesson-block subtopic-block">
                <h2>상위 단원</h2>
                <p>이 페이지는 <a href="${parent.slug}.html">${parent.title}</a> 단원에 포함됩니다. 오른쪽 목차에서 같은 묶음의 앞뒤 주제를 함께 확인하세요.</p>
              </section>`;
}

function renderGroupedAside(groups, currentLesson) {
  return groups
    .map((group) => {
      const parent = group.lessons[0];
      const children = group.lessons.slice(1);
      return `<div class="lesson-aside-group">
                <a class="lesson-aside-main" href="${parent.slug}.html"${parent.slug === currentLesson.slug ? ' aria-current="page"' : ""}>${String(parent.index + 1).padStart(2, "0")} ${parent.title}</a>
                ${
                  children.length
                    ? `<ul class="lesson-aside-subtopics">
                        ${children
                          .map((lesson) => `<li><a href="${lesson.slug}.html"${lesson.slug === currentLesson.slug ? ' aria-current="page"' : ""}>${lesson.title}</a></li>`)
                          .join("")}
                      </ul>`
                    : ""
                }
              </div>`;
    })
    .join("");
}

function renderPartHub(part) {
  const lessonCards = part.groups
    .map(
      (group) => {
        const parent = group.lessons[0];
        const children = group.lessons.slice(1);
        return `
          <section class="lecture-card lesson-group-card">
            <span>${String(group.index + 1).padStart(2, "0")}</span>
            <h3><a href="${parent.slug}.html">${group.title}</a></h3>
            <p>${parent.lead}</p>
            ${children.length ? `<ul class="lecture-subtopics">${children.map((lesson) => `<li><a href="${lesson.slug}.html">${lesson.title}</a></li>`).join("")}</ul>` : ""}
          </section>`;
      }
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
  const currentGroup = lesson.part.groups[lesson.groupIndex];
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
          ${currentGroup ? renderLessonSummaryBand(currentGroup) : ""}
          <div class="lesson-layout">
            <article class="lesson-main">
              ${lesson.isGroupParent ? renderSubtopicBlock(currentGroup) : renderParentBlock(currentGroup)}
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
              ${renderGroupedAside(lesson.part.groups, lesson)}
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
