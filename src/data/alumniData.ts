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
]

export default alumniData
