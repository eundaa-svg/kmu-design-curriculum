// src/data/departments/aiDesign.ts
// AI디자인학과 — 2025 국민대학교 기준
// * 교과과정 중 1학년 과목만 2025학년도에 개설

import type { Department } from '../../types'

const aiDesign: Department = {
  id: 'ai-design',
  name: 'AI디자인학과',
  shortName: 'AI디자인',
  nameEng: 'AI Design',
  description:
    'AI 기술을 활용하여 디자인 대상이 되는 제품, 서비스, 콘텐츠, 사회를 디자인하는 융합적 성격을 가지는 학과이다. 데이터와 AI 시스템을 이해한 상태에서 사용자의 문화를 기반으로 문제 해결 디자인 접근을 한다.',
  educationGoal:
    '미래 디자이너의 기본 능력으로 요구되는 데이터 기반 디자인과 사용자 중심 디자인을 배우고, 기본디자인 역량과 창의력을 갖추고 미래기술 및 미래 환경을 통찰할 수 있는 능력을 키워나다.',
  concentrationAreas: [
    { name: '디자인기초', description: '디지털드로잉, 제품디자인, 인터랙션디자인, AI서비스디자인' },
    { name: '이론', description: '기초디자인, 디자인사고, 역사와윤리, 컨텍스트, 정보디자인 등' },
    { name: '응용', description: '빅데이터, 파이썬, IoT, AI아트, 스마트스페이스, 생성디자인 등' },
    { name: '창의력', description: 'S-TEAM, 다빈치스튜디오, 상상스튜디오' },
    { name: '전문성', description: '디자인데이터분석, 제품서비스시스템, AI어도시, 포트폴리오 등' },
    { name: '스튜디오', description: 'AI디자인스튜디오, 캡스톤디자인' },
  ],
  subMajors: [],
  notices: [
    '교과과정 중 1학년 과목만 2025학년도에 개설 (필수지정 과목은 반드시 이수하여야 함)',
    'S-TEAM Class, 사제동행세미나 중 하나 필수',
    '현장실습은 현장실습 학점 인정 등에 관한 규정에 따라 전공 또는 일반선택으로 인정 가능',
    '부전공: 전공과목 중 18학점 이상 이수',
    '다전공: 전공선택(필수 지정 과목 포함) 최소 이수학점 이상. 단, S-TEAM Class·사제동행세미나는 이수하지 않아도 다전공 이수 가능',
  ],
  courses: [
    // ===== 1학년 1학기 — 기초교양 =====
    { id: 'ai-101', name: '글쓰기', nameEng: 'Writing', year: 1, semester: 1, categoryType: '기초교양', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '', tags: [], note: '' },
    { id: 'ai-102', name: 'College English I, II', nameEng: 'College English I, II', year: 1, semester: 1, categoryType: '기초교양', category: 'elective', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '', tags: [], note: '택1' },
    { id: 'ai-103', name: '컴퓨터프로그래밍1', nameEng: 'Computer Programming 1', year: 1, semester: 1, categoryType: '기초교양', category: 'elective', credits: 3, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '', tags: [], note: '' },

    // ===== 1학년 1학기 — 전공선택 =====
    { id: 'ai-104', name: 'S-TEAM Class', nameEng: 'S-TEAM Class', year: 1, semester: 1, categoryType: '전공선택', category: 'elective', credits: 1, theory: 0, practice: 1, isCapstone: false, isRequired: true, prerequisite: null, description: '신입생을 대상으로 대학 이해, 학부(과)에 대한 이해, 상담과 검사를 실시한다.', tags: ['인문소통', '글로벌', '창의융합', '전문'], note: '필수(P/N), 사제동행세미나와 택1' },
    { id: 'ai-105', name: '디지털드로잉', nameEng: 'Digital Drawing', year: 1, semester: 1, categoryType: '전공선택', category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: true, prerequisite: null, description: '디지털 기법을 활용하여 미래디자인 아이디어를 표현하고 발전시킴으로써 아이디어 표현 능력을 함양한다.', tags: ['전문'], note: '필수', concentration: '디자인기초' },
    { id: 'ai-106', name: '기초디자인1', nameEng: 'Basic Design 1', year: 1, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 0, practice: 4, isCapstone: false, isRequired: false, prerequisite: null, description: '디자인의 형태, 색상, 질감 등 조형의 기본 요소를 바탕으로 변화, 통일, 비율, 운동, 강조, 점증, 대칭 등 조형미의 표현의 기본 원리를 이용하여 창작하는 디자인 능력을 교육한다.', tags: ['창의융합'], note: '', concentration: '이론' },
    { id: 'ai-107', name: '디자인사고', nameEng: 'Design Thinking', year: 1, semester: 1, categoryType: '전공선택', category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: true, prerequisite: null, description: '디자인 과정에서 디자이너가 활용하는 창의적인 전략을 익힌다.', tags: ['인문', '창의융합'], note: '필수', concentration: '이론' },
    { id: 'ai-108', name: '빅데이터와인공지능', nameEng: 'Big Data and AI', year: 1, semester: 1, categoryType: '전공선택', category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: true, prerequisite: null, description: '빅데이터와 인공지능에 대한 기본적인 개념 및 이론을 학습하고, 활용 가능한 동향에 대해 알아보고 탐구하여 기초 역량을 강화한다.', tags: ['전문'], note: '필수', concentration: '응용' },

    // ===== 1학년 2학기 — 기초교양 =====
    { id: 'ai-109', name: 'English Conversation I, II (Advanced)', nameEng: 'English Conversation I, II (Advanced)', year: 1, semester: 2, categoryType: '기초교양', category: 'elective', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '', tags: [], note: '택1' },
    { id: 'ai-110', name: '컴퓨터프로그래밍2', nameEng: 'Computer Programming 2', year: 1, semester: 2, categoryType: '기초교양', category: 'elective', credits: 3, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '', tags: [], note: '' },

    // ===== 1학년 2학기 — 전공선택 =====
    { id: 'ai-111', name: '기초디자인2', nameEng: 'Basic Design 2', year: 1, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 0, practice: 4, isCapstone: false, isRequired: false, prerequisite: null, description: '기초디자인1을 바탕으로 기초 조형 이론과 실습 사례를 통한 조형의 요소, 조형의 원리, 조형의 응용 등을 학습한다.', tags: ['창의융합'], note: '', concentration: '이론' },
    { id: 'ai-112', name: '제품디자인', nameEng: 'Product Design', year: 1, semester: 2, categoryType: '전공선택', category: 'required', credits: 2, theory: 0, practice: 3, isCapstone: false, isRequired: true, prerequisite: null, description: '사용자경험에 대한 이해를 기반으로 제품디자인의 원리, 조형요소, 제품 기획, 제품 디자인 프로세스를 학습하여 제품디자인의 기초 기술들을 학습하여 디자인할 수 있는 능력을 함양한다.', tags: ['전문'], note: '필수', concentration: '디자인기초' },
    { id: 'ai-113', name: '디자인역사와윤리', nameEng: 'Design History and Ethics', year: 1, semester: 2, categoryType: '전공선택', category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: true, prerequisite: null, description: '디자인의 역사와 발전 단계를 교육하며, 디자인으로 야기되는 사회적 윤리에 대해 논의하고 의견을 나누며 방법을 탐구한다.', tags: ['인문', '글로벌'], note: '필수', concentration: '이론' },
    { id: 'ai-114', name: '디자인을위한파이썬', nameEng: 'Python for Design', year: 1, semester: 2, categoryType: '전공선택', category: 'required', credits: 3, theory: 0, practice: 4, isCapstone: false, isRequired: true, prerequisite: null, description: '파이썬, R 등 프로그래밍 언어를 통해 디자인 방법론 및 통계학 기반으로 데이터를 활용하여 디자인을 분석하는 방법을 학습한다.', tags: ['전문'], note: '필수', concentration: '응용' },
    { id: 'ai-115', name: '다빈치스튜디오', nameEng: 'Davinci Studio', year: 1, semester: 2, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '미래 산업의 창조화라 일컫는 상상력과 창의력 함양을 위한 최·복합화 교육을 실시한다.', tags: ['창의융합'], note: '', concentration: '창의력' },

    // ===== 2학년 1학기 =====
    { id: 'ai-201', name: '디자인과컨텍스트', nameEng: 'Design and Context', year: 2, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '사용자가 디자인 환경에서 다양한 플랫폼의 특정 기능과 상호 작용하는 것을 선호하는 이유와 방법에 대해 연구한다.', tags: ['인문', '창의융합'], note: '', concentration: '이론' },
    { id: 'ai-202', name: 'IoT디자인', nameEng: 'IOT Design', year: 2, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '사용자에 대한 데이터를 학습하고 분석한 다음 통제 기능을 사용하여 학습한 데이터를 사용자에게 쉽게 제공하기 위한 디자인을 개발한다.', tags: ['전문'], note: '', concentration: '응용' },
    { id: 'ai-203', name: '인터랙션디자인1', nameEng: 'Interaction Design 1', year: 2, semester: 1, categoryType: '전공선택', category: 'required', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: true, prerequisite: null, description: '인간이 제품이나 서비스를 사용하면서 상호 간 작용이 용이하도록 디자인하는 방법을 연구한다.', tags: ['전문'], note: '필수', concentration: '디자인기초' },
    { id: 'ai-204', name: '디자인데이터분석', nameEng: 'Design Data Analysis', year: 2, semester: 1, categoryType: '전공선택', category: 'required', credits: 2, theory: 0, practice: 3, isCapstone: false, isRequired: true, prerequisite: null, description: '디자인 관련 비즈니스 의사결정에 적용할 정보를 찾기 위한 데이터 정리, 변환, 모델링(Modeling) 과정을 익힌다.', tags: ['전문'], note: '필수', concentration: '전문성' },
    { id: 'ai-205', name: 'AI와아트', nameEng: 'AI and Art', year: 2, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '인공지능을 활용하여 아트에 적용된 기술 사례를 탐구하고, 구현하는 방법을 익힌다.', tags: ['인문', '창의융합', '전문'], note: '', concentration: '응용' },

    // ===== 2학년 2학기 =====
    { id: 'ai-206', name: '정보디자인', nameEng: 'Information Design', year: 2, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '복잡하거나 구조화되지 않은 데이터를 시각적으로 표현하여 그 의미를 명확하고 분명하게 보일 수 있는 방법을 학습한다.', tags: ['전문'], note: '', concentration: '이론' },
    { id: 'ai-207', name: 'AI와스마트스페이스', nameEng: 'AI and Smart Space', year: 2, semester: 2, categoryType: '전공선택', category: 'required', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: true, prerequisite: null, description: '사람과 기술 활성화된 시스템이 지능적인 생태계에서 상호작용하는 물리적 환경과 디지털 환경의 변화를 이해한다.', tags: ['전문'], note: '필수', concentration: '응용' },
    { id: 'ai-208', name: '인터랙션디자인2', nameEng: 'Interaction Design 2', year: 2, semester: 2, categoryType: '전공선택', category: 'required', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: true, prerequisite: null, description: '인터랙션디자인1의 연고 과목으로, 인공지능과 사용자 경험 측면의 인터랙션에 대한 사려 있는 이해를 통해 미래 인터랙션 디자인의 전문적 지식을 함양한다.', tags: ['전문'], note: '필수', concentration: '디자인기초' },
    { id: 'ai-209', name: '비즈니스디자인', nameEng: 'Business Design', year: 2, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '마케팅 관점에서 기업, 브랜드의 가치를 부여할 수 있는 우수한 디자인 방법을 탐구한다.', tags: ['소통', '전문'], note: '', concentration: '응용' },
    { id: 'ai-210', name: '상상스튜디오', nameEng: 'Imagination Studio', year: 2, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '상상력과 아이디어의 전개를 교육하고, 디자인의 영역을 확장할 수 있는 창조적 디자인 방법을 익힌다.', tags: ['창의융합'], note: '', concentration: '창의력' },

    // ===== 3학년 1학기 =====
    { id: 'ai-301', name: 'AI와서비스디자인1', nameEng: 'AI and Service Design 1', year: 3, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '서비스 제공자와 사용자간의 상호작용을 고려하여 이체적인 과정과 시스템을 디자인하는 과정을 익힌다.', tags: ['전문'], note: '', concentration: '디자인기초' },
    { id: 'ai-302', name: '음악과사운드UX', nameEng: 'Music and Sound UX', year: 3, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '인간의 오감 중 청각으로 사용자의 경험을 커뮤니케이션하여 디자인할 수 있는 기술을 익힌다.', tags: ['인문', '전문'], note: '', concentration: '응용' },
    { id: 'ai-303', name: 'AI디자인스튜디오1', nameEng: 'AI Design Studio 1', year: 3, semester: 1, categoryType: '전공선택', category: 'required', credits: 3, theory: 0, practice: 4, isCapstone: false, isRequired: true, prerequisite: null, description: '전부 과정 및 주요 글로벌 기업들과 협업으로 다양한 인공지능 프로젝트를 경험하여 실무 능력을 함양한다. 각자에게 적합한 세부 전공분야의 진로를 탐색하며 전공에 대한 지식뿐 아니라 졸업 및 졸업 후 진로를 계획하고 구체화한다.', tags: ['소통', '창의융합', '전문'], note: '필수', concentration: '스튜디오' },
    { id: 'ai-304', name: '모바일프로토타이핑', nameEng: 'Mobile Prototyping', year: 3, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '모바일 환경의 사용자의 기초적인 요구를 최대한 반영한 모형 개발을 계획, 설계, 구축하며, 시험 및 검토를 통하여 실제 시스템 개발에 반영할 사항을 도출하는 방법을 학습한다.', tags: ['전문'], note: '', concentration: '전문성' },
    { id: 'ai-305', name: '게임스토리텔링', nameEng: 'Game Storytelling', year: 3, semester: 1, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '미디어에서 일어나는 이야기특성 기반으로 상호작용적인 게임 이야기의 특징을 탐색하고 표현 방법을 학습하며, 게임 시나리오 작성법을 학습한다.', tags: ['인문', '글로벌', '창의융합'], note: '', concentration: '이론' },
    { id: 'ai-306', name: '제품서비스시스템', nameEng: 'Product Service System', year: 3, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 0, practice: 4, isCapstone: false, isRequired: false, prerequisite: null, description: '제품의 유형과 무형의 서비스를 이체적으로 탐색하고 설계하여 고객에게 차별화된 가치를 제공하는 방법을 함양한다.', tags: ['글로벌', '창의융합', '전문'], note: '', concentration: '전문성' },

    // ===== 3학년 2학기 =====
    { id: 'ai-307', name: '생성디자인', nameEng: 'Generative Design', year: 3, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '미래의 환경에서 가장 효율적인 디자인을 생성하고 찾아내는 디자인 프로세스를 학습하여 인공지능 관련 기술 활용에 대해 이해한다.', tags: ['전문'], note: '', concentration: '응용' },
    { id: 'ai-308', name: 'AI와서비스디자인2', nameEng: 'AI and Service Design 2', year: 3, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: 'AI와서비스디자인1의 연고 과목으로, 전통적인 서비스를 접목하거나 새서비스 모델을 개발하여 새로운 부가가치를 창출하는 디자인영역을 학습한다.', tags: ['전문'], note: '', concentration: '디자인기초' },
    { id: 'ai-309', name: '브레인인터페이스', nameEng: 'Brain Interface', year: 3, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '뇌 신경세포들의 활동을 시공간적으로 정밀하게 측정할 수 있는 기기와 신경 신호를 읽을 수 있는 관련 기술의 활용에 대해 이해한다.', tags: ['전문'], note: '', concentration: '응용' },
    { id: 'ai-310', name: 'AI디자인스튜디오2', nameEng: 'AI Design Studio 2', year: 3, semester: 2, categoryType: '전공선택', category: 'required', credits: 3, theory: 0, practice: 4, isCapstone: false, isRequired: true, prerequisite: null, description: 'AI디자인스튜디오1의 연고 과목으로, 프로젝트 연구 목표 해결을 종합 및 제시한다.', tags: ['소통', '창의융합', '전문'], note: '필수', concentration: '스튜디오' },
    { id: 'ai-311', name: 'XR디자인', nameEng: 'XR Design', year: 3, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 0, practice: 4, isCapstone: false, isRequired: false, prerequisite: null, description: 'XR 산업의 기술 분류에 따라 XR 콘텐츠 디자인과 구현 기술을 익히고, XR 기반의 실무화 콘텐츠 디자인 프로세스를 학습한다.', tags: ['글로벌', '창의융합', '전문'], note: '', concentration: '전문성' },
    { id: 'ai-312', name: 'AI와도시', nameEng: 'AI and City', year: 3, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '스마트스페이스, 스마트 도시의 개념을 이해하고, 지능적 생태계에서 상호작용하는 물리적 환경 및 디지털 환경에 대해 이해할 수 있도록 한다. AI로 인해 변화되는 도시의 모습을 예측하고, 사용자경험 기반의 도시 생태계를 이루는 서비스를 기획할 수 있도록 한다.', tags: ['인문', '글로벌', '전문'], note: '', concentration: '전문성' },

    // ===== 4학년 1학기 =====
    { id: 'ai-401', name: 'AI디자인포트폴리오', nameEng: 'AI Design Portfolio', year: 4, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '최복합 시대에서 요구되는 인재임을 증명하는 프레젠테이션 특성과 기법을 학습하고, 스튜디오 실무 경험 및 전 단계의 중기과정 결과물을 기반으로 정리 및 발표하여 프레젠테이션 능력을 함양한다.', tags: ['소통'], note: '', concentration: '전문성' },
    { id: 'ai-402', name: '디지털트윈과메타버스', nameEng: 'Digital Twin and Metaverse', year: 4, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '메타버스 산업 및 디지털트윈 기술 동향을 이해하고, 산업의 발전에서 활용되고 있는 다양한 사례와 실제 경험을 통해 서비스 및 콘텐츠 개발에 대한 전문적 지식을 함양한다.', tags: ['전문'], note: '', concentration: '이론' },
    { id: 'ai-403', name: '디자인창업과지식재산권', nameEng: 'Design Startups and Intellectual Property', year: 4, semester: 1, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '특허, 디자인 등록권, 디자인 창작권 등 디자인을 이용함에 있어 디자인의 보호와 이용을 법적으로 보장할 수 있는 사례와 방법을 익힌다.', tags: ['글로벌', '전문'], note: '', concentration: '이론' },
    { id: 'ai-404', name: '캡스톤디자인1', nameEng: 'Capstone Design 1', year: 4, semester: 1, categoryType: '전공선택', category: 'required', credits: 3, theory: 0, practice: 4, isCapstone: true, isRequired: true, prerequisite: null, description: '산업현장에서 부딪칠 수 있는 문제들을 해결할 수 있는 능력을 길러주기 위해 졸업논문 대신 작품의 기획, 설계, 제시하는 전 과정을 경험하게 하는 교육과정이다.', tags: ['소통', '창의융합', '전문'], note: '필수, 캡스톤', concentration: '스튜디오' },

    // ===== 4학년 2학기 =====
    { id: 'ai-405', name: '로보스틱이론과실습', nameEng: 'Robotics Theory and Practice', year: 4, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '로봇의 물리적인 모습을 구성하는 기계적이고 전기적인 장치의 하드웨어, 소프트웨어, 그리고 자동화 시스템을 실제 설계하여 원리와 방법 익힌다.', tags: ['전문'], note: '', concentration: '응용' },
    { id: 'ai-406', name: '연구방법론', nameEng: 'Research Methodology', year: 4, semester: 2, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '인공지능 관련 산업 및 4차산업 분야에서의 연구 역량을 함양하기 위해 연구를 수행하는 과정을 다루며, 문제 설정, 연구설계, 자료수집 및 분석방법 등 전반적인 연구 프로세스에 대해 이해할 수 있도록 한다.', tags: ['소통', '전문'], note: '', concentration: '이론' },
    { id: 'ai-407', name: '미래사회와AI', nameEng: 'Future Society and AI', year: 4, semester: 2, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '인공지능 발전으로 인한 미래 사회변화에 대해 능동적 전략을 이해하고, 인공지능 관련 전망산업과 미래 사회변화에 대처하기 위한 다양한 주제를 학습한다.', tags: ['인문', '글로벌', '전문'], note: '', concentration: '이론' },
    { id: 'ai-408', name: '캡스톤디자인2', nameEng: 'Capstone Design 2', year: 4, semester: 2, categoryType: '전공선택', category: 'required', credits: 3, theory: 0, practice: 4, isCapstone: true, isRequired: true, prerequisite: null, description: '캡스톤디자인1의 연고 과목으로, 산업현장의 요구에 맞는 실질적 종합 설계 능력을 함양한다.', tags: ['소통', '창의융합', '전문'], note: '필수, 캡스톤', concentration: '스튜디오' },

    // ===== 1~4학년 공통 =====
    { id: 'ai-500', name: '사제동행세미나', nameEng: 'Seminar in Special Topics', year: 1, semester: 1, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: true, prerequisite: null, description: '교수-학생간의 대면관계를 통하여 학생의 지적 호기심을 유발시키고 학생 상호간 동료(선·후배) 관계를 활성화함을 목적으로 한다.', tags: ['인문소통', '글로벌', '창의융합', '전문'], note: '필수(P/N), 1~4학년 선택기, S-TEAM Class와 택1', availableYears: [1, 2, 3, 4] },
  ],
}

export default aiDesign
