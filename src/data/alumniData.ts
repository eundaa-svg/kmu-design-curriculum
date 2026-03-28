export interface Alumni {
  id: string
  name: string
  departmentId: string
  departmentName: string
  admissionYear: number
  graduationYear: number
  gpa: number
  company: string
  location: string
  department: string
  position: string
  jobDescription: string
  joinDate: string
  jobType: string
  activities: string[]
  certifications: string[]
  languageScore: string
  selfIntro: string
  companyTip: string
  messageToJuniors: string
  tags: string[]
}

const alumniData: Alumni[] = [
  {
    id: 'alumni-001',
    name: '정다혜',
    departmentId: 'spatial-design',
    departmentName: '공간디자인학과',
    admissionYear: 2012,
    graduationYear: 2017,
    gpa: 3.35,
    company: '프리랜서 (웹툰작가)',
    location: '서울',
    department: '웹툰',
    position: '웹툰작가',
    jobDescription: '웹툰 작품 제작',
    joinDate: '2025.01',
    jobType: '창업 · 프리랜서',
    activities: [
      '페스티벌 디자인 프리젠터 (2014 글로벌개더링코리아)',
      '한국공간코디네이션디자인대전 동상 수상',
      '한국공간디자인대전 입선 수상',
      '국민대·서울대·홍익대·이화여대 미대연합전시 2회 전시 작가 참여',
      '영상 제작 동아리 모션 참여',
      '프로그래밍 아트 스터디 보이드 참여',
      '프리클 스타트업 창업활동 (UX 디자이너)',
      '남성복 브랜드 마일로 런칭 (크리에이티브 디렉터)',
    ],
    certifications: [],
    languageScore: 'OPIc IH',
    selfIntro:
      '학부시절, 다양한 분야에 도전했던 경험을 강점으로 어필했습니다. 낯선 분야이거나 처음 접하는 일도 긍정적인 자세로 시작하면 좋은 결과를 만들어낼 수 있다는 자신감과 리더십을 강점으로 어필했습니다. 취준 시즌에는 새로운 스펙이나 경험을 쌓기보다는 기존에 쌓아둔 경험들을 주제순으로, 시간순으로 정리했고 남들에게 어떤 식으로 표현할지 다듬었습니다. 정리한 내용을 바탕으로 틈틈이 혼자 모의 면접 연습을 했고, 당당한 태도로 말하는 습관을 들인 덕에 대부분의 기업 면접 당시 좋은 반응을 얻었습니다.',
    companyTip:
      '롯데그룹 스펙태클 인턴 전형으로 입사하게 되었습니다. 기존 다른 기업 공채 준비를 2시즌 해보았기 때문에 따로 면접준비는 하지 않았고, 지원 기업이 속한 업종 분석과 트렌드, 경쟁사 사례 분석에 중점을 두고 준비했습니다. 디자인 직무뿐만 아니라 업종 자체에 대한 열정을 어필하고자 경쟁사 매장도 면접 전에 직접 방문해보기도 했습니다.',
    messageToJuniors:
      '무슨 상황이든지 간에 주도적인 자세로 업무에 임하는 리더라는 점을 어필하는 것이 제일 좋습니다. 자소서에서도 면접장에서도 당당한 태도가 자연스럽게 보여지는 것이 좋습니다. 단, 당당한 태도에 걸맞는 경험 기반의 근거가 있어야 하겠지요. 주체적으로 업무에 임하는 자세, 전공에 대한 열정, 본인이 지원하는 분야 전체에 대한 사전분석과 열정적인 자세만 갖춘다면 좋은 결과를 얻을 수 있을 것입니다.',
    tags: ['웹툰', 'UX디자인', '크리에이티브디렉터', '스타트업', '공간디자인'],
  },
  {
    id: 'alumni-002',
    name: '서한별',
    departmentId: 'spatial-design',
    departmentName: '공간디자인학과',
    admissionYear: 2017,
    graduationYear: 2022,
    gpa: 0,
    company: '삼성전자판매',
    location: '서울시 강남구',
    department: '스토어디자인그룹',
    position: '주임/프로',
    jobDescription: '스토어디자인',
    joinDate: '2022.08',
    jobType: '대기업',
    activities: [
      '복지관 리모델링 봉사',
      'K-Hunting 추천채용 지원프로그램 수료',
      '취업교과목 수료',
      '동문초청 릴레이특강 참여 (롯데GRS 디자인)',
    ],
    certifications: [],
    languageScore: '토익스피킹 180 (Lv.6)',
    selfIntro:
      '자기소개서는 미리 작성해두고, 자신이 하고자 하는 분야와 직무를 확실히 생각해두는 것이 가장 중요한 것 같다. 이를 먼저 생각해두면 취업하는 데 있어 필요한 역량이나 자격증, 스펙 등을 쌓을 수 있어 기업에 지원할 때 좋다. 또한 대기업 같은 경우 영어 회화 점수를 보는 곳이 대부분이라 졸업하기 이전에 미리 시험을 치르고 목표 점수를 얻는 게 좋다. 졸업하고 나서 하려면 다른 부분에 힘쓸 시간이 없다.',
    companyTip:
      '자기소개서를 쓸 때 너무 생각을 많이 하면 안 되는 것 같다. 내가 읽기 어렵고 읽히지 않는 글은 다른 사람에게는 더욱 읽히기 힘들다. 힘을 빼고 자연스럽게 잘 읽히도록 쓰는 것이 좋다. 면접 전에 실기테스트가 있었고, 실기테스트를 기반으로 실무진 면접과 임원진 면접을 각각 15분 정도씩 봤다.',
    messageToJuniors:
      '입사 지원할 때 너무 생각을 많이 하고 어렵게 생각하지 말라고 말하고 싶다. 지원하는 데는 비용이 들지 않는다. 최대한 많이 지원해보고 이를 토대로 경험을 쌓는 것이 좋은 태도인 것 같다. 또한 학교에서 하는 취업 프로그램을 해보는 것이 좋다. 나 또한 학교에서 하는 모의면접 프로그램을 신청해서 실제 면접을 보기 전에 모의면접을 치르고 갔는데, 실제로 도움이 많이 됐다.',
    tags: ['스토어디자인', '삼성', '대기업', '공간디자인', '리테일'],
  },
  {
    id: 'alumni-004',
    name: '류해찬',
    departmentId: 'industrial-design',
    departmentName: '공업디자인학과',
    admissionYear: 2017,
    graduationYear: 2024,
    gpa: 3.9,
    company: 'LG전자',
    location: '서초 R&D센터',
    department: '디자인경영센터 BS 디자인연구소',
    position: '연구원',
    jobDescription: 'Product Design',
    joinDate: '2024.01',
    jobType: '대기업',
    activities: [
      '중소기업, 스타트업, 중견제조업, 디자인 에이전시 등에서 인턴 디자이너 근무',
      'SNS 디자인 프로젝트 아카이빙을 통한 외주 작업 다수 경험',
      'LG전자 CAMPUS RECRUITING 채용상담 참여',
      '하계 취업연계 인턴십 프로그램 수료',
      '취창업역량과전략 교과목 수료',
      '취창업과 진로설계 교과목 수료',
    ],
    certifications: [],
    languageScore: 'OPIc IH',
    selfIntro:
      '지원하고자 하는 제품 디자인 직무에 핏한 경험을 중심으로 자기소개서에 어필했으며, 구체적으로 어떤 역할이 가능하고 어떤 일에 기여할 수 있는지 자세하게 내용을 담고자 했습니다. 3학년 과정이 끝난 이후 디자인 직무 특성상 인턴십 경험이나 공모전 수상 내역 등의 필요성을 잘 인지하고, 1년 동안 취업 활동을 미리 한다는 생각으로 보다 체계적으로 계획을 수립했습니다.',
    companyTip:
      '디자인 직무에서는 포트폴리오가 모든 서류 중에서 가장 중요하기 때문에 무엇보다도 저의 강점을 잘 어필할 수 있도록 포트폴리오를 구성하고자 했습니다. 가장 만족도가 높은 프로젝트들로 30페이지 이내로(각 프로젝트당 5페이지 내외) 컴팩트하게 구성했고, 자기소개서-포트폴리오-면접의 흐름에 알맞도록 일체감 있게 내용을 작성했습니다.',
    messageToJuniors:
      '취업 활동에는 스스로 준비되는 것도 중요하지만 결국 현직에서 근무하고 있는 선배들로부터 얻을 수 있는 정보가 가장 도움이 됩니다. 특히 디자인 직무는 대기업에 재직 중인 종사자들의 취업 정보를 얻기 어렵기 때문에 주변 네트워크를 잘 활용하는 것이 가장 중요하지 않을까 싶습니다. 저 또한 선배들로부터 많은 도움을 얻은 입장에서, 같은 고민을 가지고 있을 후배들에게 도움이 되고 싶습니다.',
    tags: ['제품디자인', 'LG전자', '대기업', '공업디자인', '포트폴리오', '인턴십'],
  },
]

export default alumniData
