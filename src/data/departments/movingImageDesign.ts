// src/data/departments/movingImageDesign.ts
// 영상디자인학과 — 2025 국민대학교 기준

import type { Department } from '../../types'

const movingImageDesign: Department = {
  id: 'moving-image-design',
  name: '영상디자인학과',
  shortName: '영상디자인',
  nameEng: 'Moving Image Design',
  description:
    '문화-기술-디자인이 융합된 고부가가치 엔터테인먼트문화를 선도하고, 디자인 사회적 책임과 윤리를 실천하는 창의적 인재 양성을 목표로 한다.',
  educationGoal:
    '디지털영상특수효과-VFX, 3D애니메이션, 모션그래픽, 영상관계, 뮤직비디오 등의 영상콘텐츠 연구와 첨단기술 기반의 뉴미디어엔터테인먼트분야, 이벤트디자인에 대한 사려 있고 체계적인 전문 교육을 제공한다.',
  concentrationAreas: [
    { name: '매체이론', description: '미술사, 디자인사, 영상미디어 역사, 문화론' },
    { name: '콘텐츠제작', description: '엔터테인먼트디자인 스튜디오 영역' },
    { name: '라이브액션', description: '비디오워크숍, 포스트프로덕션, 다큐멘터리' },
    { name: '뉴미디어엔터테인먼트', description: '뉴미디어디자인, 리얼타임엔진, 그래픽디자인온미디어, AI' },
    { name: '모션그래픽스', description: '모션디자인 영역' },
    { name: '드로잉애니메이션', description: '드로잉, 2D애니메이션, 캐릭터, 콘셉트아트' },
    { name: '3D CGI', description: '3D모델링, 캐릭터애니메이션, 라이트스케이프와이펙스' },
  ],
  subMajors: [],
  notices: [
    '2025학년도의 기준 (필수지정 과목은 반드시 이수하여야 함)',
    'S-TEAM Class, 사제동행세미나 중 하나 필수',
    '현장실습은 현장실습 학점 인정 등에 관한 규정에 따라 전공 또는 일반선택으로 인정 가능',
    '부전공: 전공과목 중 18학점 이상 이수',
    '다전공: 전공선택(필수 지정 과목 포함) 최소 이수학점 이상. 단, S-TEAM Class·사제동행세미나는 이수하지 않아도 다전공 이수 가능',
  ],
  courses: [
    // ===== 1학년 1학기 — 기초교양 =====
    { id: 'mi-101', name: '글쓰기', nameEng: 'Writing', year: 1, semester: 1, categoryType: '기초교양', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '', tags: [], note: '' },
    { id: 'mi-102', name: 'College English I, II', nameEng: 'College English I, II', year: 1, semester: 1, categoryType: '기초교양', category: 'elective', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '', tags: [], note: '택1' },
    { id: 'mi-103', name: '컴퓨터프로그래밍1', nameEng: 'Computer Programming 1', year: 1, semester: 1, categoryType: '기초교양', category: 'elective', credits: 3, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '', tags: [], note: '' },

    // ===== 1학년 1학기 — 전공선택 =====
    { id: 'mi-104', name: 'S-TEAM Class', nameEng: 'S-TEAM Class', year: 1, semester: 1, categoryType: '전공선택', category: 'elective', credits: 1, theory: 1, practice: 0, isCapstone: false, isRequired: true, prerequisite: null, description: '신입생을 대상으로 대학 이해, 학부(과)에 대한 이해, 상담과 검사를 실시한다.', tags: ['인문소통', '글로벌', '창의융합', '전문'], note: '필수(P/N), 사제동행세미나와 택1' },
    { id: 'mi-105', name: '기초모션디자인', nameEng: 'Basic Motion Design', year: 1, semester: 1, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '이미지, 문자, 소리를 움직임을 통해 전기적으로 구성하는 기초적인 기법과 전문 모션 소프트웨어의 효과적 활용법을 익히는 것을 목표로 한다.', tags: ['창의융합', '전문'], note: '', concentration: '모션그래픽스' },
    { id: 'mi-106', name: '기초영상디자인실습', nameEng: 'Basic Moving Image Design Practice', year: 1, semester: 1, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '영상디자인 입문에 필요한 전통 영상매체(사진, 그래픽스, 비디오 등)에 대한 기초 지식을 제공하고, 실습을 통해 표현하는 과정을 학습한다.', tags: ['소통', '글로벌', '창의융합', '전문'], note: '', concentration: '콘텐츠제작' },
    { id: 'mi-107', name: '디자인과문화', nameEng: 'Design and Culture', year: 1, semester: 1, categoryType: '전공선택', category: 'required', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: true, prerequisite: null, description: '문화를 주체적으로 관찰하고 분석하여 디자인프로세스에 적용하는 문화교차적 탐구스터디로, 일상의 디자인가치를 체험하고 문화적 의미를 도출하는 문화해석자·창조자로서 디자이너의 기본적 의식을 계발한다.', tags: ['인문소통'], note: '필수', concentration: '콘텐츠제작' },
    { id: 'mi-108', name: '디지털드로잉', nameEng: 'Digital Drawing', year: 1, semester: 1, categoryType: '전공선택', category: 'required', credits: 2, theory: 0, practice: 4, isCapstone: false, isRequired: true, prerequisite: null, description: '영상디자인 구현 기초에 필요한 기초적인 2D 프로그램(Adobe CC-Photoshop, Illustrator 등)을 익히고 이를 실무에 적용하는 방법에 대해 학습한다.', tags: ['창의융합', '전문'], note: '필수', concentration: '드로잉애니메이션' },

    // ===== 1학년 2학기 — 기초교양 =====
    { id: 'mi-109', name: 'English Conversation I, II (Advanced)', nameEng: 'English Conversation I, II (Advanced)', year: 1, semester: 2, categoryType: '기초교양', category: 'elective', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '', tags: [], note: '택1' },
    { id: 'mi-110', name: '컴퓨터프로그래밍2', nameEng: 'Computer Programming 2', year: 1, semester: 2, categoryType: '기초교양', category: 'elective', credits: 3, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '', tags: [], note: '' },

    // ===== 1학년 2학기 — 전공선택 =====
    { id: 'mi-111', name: '기초비디오워크숍', nameEng: 'Basic Video Workshop', year: 1, semester: 2, categoryType: '전공선택', category: 'required', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: true, prerequisite: null, description: '디지털비디오의 메커니즘을 이해하고, ENG 비디오카메라를 이용한 촬영, 비선 및 조명 등에 대한 기초적 지식과 기술을 연마하여 창의적 표현 매체로서의 활용법을 탐구한다.', tags: ['창의융합', '전문'], note: '필수', concentration: '라이브액션' },
    { id: 'mi-112', name: '기초애니메이션', nameEng: 'Introduction to Animation', year: 1, semester: 2, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '애니메이션의 기본 원리를 이해하고, 앞으로 전시하는 다양한 기법을 실험하여 영상콘텐츠 창작에 있어서 표현 가능성을 확장한다.', tags: ['창의융합', '전문'], note: '', concentration: '드로잉애니메이션' },
    { id: 'mi-113', name: '디지털모델링', nameEng: 'Digital Modeling', year: 1, semester: 2, categoryType: '전공선택', category: 'required', credits: 2, theory: 0, practice: 4, isCapstone: false, isRequired: true, prerequisite: null, description: 'Autodesk Maya 및 Blender를 이용하여 3D 그래픽 기본 작업-모델링 및 기초 애니메이트-를 학습한다.', tags: ['창의융합', '전문'], note: '필수', concentration: '3D CGI' },
    { id: 'mi-114', name: '사운드디자인', nameEng: 'Basic Sound Design', year: 1, semester: 2, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '소리의 특성을 이해하고 영상콘텐츠 제작에 사운드와 비주얼의 전기적 관계를 실험하여 다양한 영상매체가 필요로 하는 고품질의 사운드디자인 개발 및 전반 하드웨어, 소프트웨어에 대한 전문 지식과 기술 연마를 목표로 한다.', tags: ['창의융합', '전문'], note: '', concentration: '콘텐츠제작' },
    { id: 'mi-115', name: '스토리텔링연구', nameEng: 'Storytelling Theory', year: 1, semester: 2, categoryType: '전공선택', category: 'required', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: true, prerequisite: null, description: '영상문법의 내적 기초가 되는 스토리 개발 및 내러티브 구성법을 연구하여 감성적, 직관적 사적에 호응하는 스토리텔링 기반의 영화, 애니메이션, 게임, 광고 등 전반 영상콘텐츠 창작의 터를 닦는다.', tags: ['인문소통'], note: '필수', concentration: '콘텐츠제작' },

    // ===== 2학년 1학기 =====
    { id: 'mi-201', name: '3D애셋과룩개발', nameEng: '3D Asset and Look Development', year: 2, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '3D 애니메이션을 위한 캐릭터, 배경, 소도구 등의 모델링과 색상을 위한 기능을 익히는 동시에 조화로운 표현을 만들어 보고, 질감과 형태를 표현하는 기능을 익힌다.', tags: ['창의융합', '전문'], note: '', concentration: '3D CGI' },
    { id: 'mi-202', name: '고급비디오워크숍', nameEng: 'Advanced Video Workshop', year: 2, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '기초비디오워크숍에서의 향상된 디지털비디오에 대한 이해를 바탕으로, 영화 및 방송 규격의 영상콘텐츠 제작에 필요한 전반 전문 지식 및 기술을 연마한다.', tags: ['창의융합', '전문'], note: '', concentration: '라이브액션' },
    { id: 'mi-203', name: '그래픽디자인온미디어I', nameEng: 'Graphic Design on Media I', year: 2, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '정보 전달 및 소통을 위한 커뮤니케이션디자인의 중심이 되는 타이포그래피를 익혀서 이를 영상미디어를 활용한 효과적인 커뮤니케이션 방법론 개발에 적용한다.', tags: ['인문', '글로벌', '창의융합', '전문'], note: '', concentration: '뉴미디어엔터테인먼트' },
    { id: 'mi-204', name: '뉴미디어디자인I', nameEng: 'New Media Design I', year: 2, semester: 1, categoryType: '전공선택', category: 'required', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: true, prerequisite: null, description: '테크놀로지의 발전과 활용에 따라 변화되는 개념과 장르가 이렇게 확장, 심화, 갱신되는가를 고찰하고, 매체 기술의 전반적인 이론 함양을 목표로 한다. Epic Games의 Unreal Engine을 기초적으로 활용하는 방법을 학습한다.', tags: ['창의융합', '전문'], note: '필수', concentration: '뉴미디어엔터테인먼트' },
    { id: 'mi-205', name: '세계미술사', nameEng: 'History of World Art', year: 2, semester: 1, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '동서양의 미술의 흐름을 고찰하여 창의적 디자인사고를 계발하고 폭넓은 문화의식으로 지향하는 지성을 함양을 목표로 한다.', tags: ['인문소통'], note: '', concentration: '매체이론' },
    { id: 'mi-206', name: '엔터테인먼트디자인I:레거시미디어-캡스톤디자인', nameEng: 'Entertainment Design I: Legacy Media - Capstone Design', year: 2, semester: 1, categoryType: '전공선택', category: 'required', credits: 3, theory: 3, practice: 1, isCapstone: true, isRequired: true, prerequisite: null, description: '고전적 영상의 전시시스템을 이해하고, 영상매체에 적합한 콘텐츠를 발굴·창작하여 라이브액션, 드로잉·3D 애니메이션, 모션그래픽스, 뉴미디어, 영상물 등 다양한 작업의 제작방식을 통해 전시아카이브를 구축하는 다양한 방법론을 개발한다.', tags: ['소통', '창의융합', '전문'], note: '필수, 캡스톤', concentration: '콘텐츠제작' },
    { id: 'mi-207', name: '캐릭터디자인', nameEng: 'Character Design', year: 2, semester: 1, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '수집, 수업, 디자인, 교육 등 폭넓은 매체에 활용 가능한 창의캐릭터를 개발하고, 다양한 상품과 서비스에 응용하는 능력을 배양한다.', tags: ['창의융합', '전문'], note: '', concentration: '드로잉애니메이션' },

    // ===== 2학년 2학기 =====
    { id: 'mi-208', name: '3D캐릭터애니메이션', nameEng: '3D Character Animation', year: 2, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '3D애니메이션을 위한 캐릭터의 골격구조를 역학적으로 이해하고, 이를 바탕으로 움직임의 구조를 인지하기 위한 기능을 익혀서 캐릭터의 성격, 감정, 상황 등을 연출할 수 있도록 한다.', tags: ['창의융합', '전문'], note: '', concentration: '3D CGI' },
    { id: 'mi-209', name: '고급포스트프로덕션', nameEng: 'Advanced Post Production', year: 2, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '고급편집기법 및 DI, 마스터링 등 포스트프로덕션 단계의 전반 이론 및 기술을 사람하여 영상의 완성 작업을 결합하는 능력을 배양하며, Blackmagic Design Davinci Resolve를 이용하는 고급 기술을 익힌다.', tags: ['창의융합', '전문'], note: '', concentration: '라이브액션' },
    { id: 'mi-210', name: '그래픽디자인온미디어II', nameEng: 'Graphic Design on Media II', year: 2, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '그래픽디자인, 타이포그래피, 브랜딩, 이미지메이킹 등 정보 전달 및 소통을 위한 커뮤니케이션디자인의 전문 역량을 익혀서 이를 영상미디어를 활용한 효과적인 커뮤니케이션 방법론 개발에 적용한다.', tags: ['인문', '글로벌', '창의융합', '전문'], note: '', concentration: '뉴미디어엔터테인먼트' },
    { id: 'mi-211', name: '뉴미디어디자인II', nameEng: 'New Media Design II', year: 2, semester: 2, categoryType: '전공선택', category: 'required', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: true, prerequisite: null, description: '선형적 시간성에서 벗어난 인터랙티브 미디어 컨트롤의 기술적인 이해를 바탕으로 디지털 미디어 작품을 만들어 보는 실습과목으로, Epic Games의 Unreal Engine을 전문적으로 활용하는 방법을 학습한다.', tags: ['창의융합', '전문'], note: '필수', concentration: '뉴미디어엔터테인먼트' },
    { id: 'mi-212', name: '세계디자인사', nameEng: 'History of World Design', year: 2, semester: 2, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '시각커뮤니케이션디자인, 프로덕트디자인, 공예 등 다양한 디자인 분야의 역사를 고찰하여 진보적인 디자인문화 형성을 위한 디자이너의 사회적 책임의식으로 고취한다.', tags: ['인문소통', '글로벌'], note: '', concentration: '매체이론' },
    { id: 'mi-213', name: '엔터테인먼트디자인II:익스팬디드시네마-캡스톤디자인', nameEng: 'Entertainment Design II: Expanded Cinema - Capstone Design', year: 2, semester: 2, categoryType: '전공선택', category: 'required', credits: 3, theory: 3, practice: 1, isCapstone: true, isRequired: true, prerequisite: null, description: '사각의 프레임 너머로 눈이 확장되어온 시네마의 역사를 연대기적으로 이해해보고, 이러한 특성을 사해석하여 다양한 작업의 제작방식을 통해 실제 영상작품으로 제작하는 워크숍을 진행한다.', tags: ['소통', '창의융합'], note: '필수, 캡스톤', concentration: '콘텐츠제작' },
    { id: 'mi-214', name: '콘셉트아트', nameEng: 'Concept Art', year: 2, semester: 2, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '영화, 애니메이션, 게임 등에 활용 가능한 창의 캐릭터, 코스튬, 세트 디자인 등을 드로잉, 3D 모델링, 스컬팅과 같은 다양한 기법과 매체를 통해 개발한다.', tags: ['창의융합', '전문'], note: '', concentration: '드로잉애니메이션' },

    // ===== 3학년 1학기 =====
    { id: 'mi-301', name: '3D라이트와이펙스', nameEng: '3D Light and FX', year: 3, semester: 1, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '3D 애니메이션을 위한 라이트(조명)을 조성하여 사실적 분위기를 연출하는 기능을 익히고, 물, 불, 구름 등의 자연현상과 여러 효과들을 시뮬레이션하는 기능을 익혀서 다양한 특수효과들을 표현할 수 있도록 한다.', tags: ['창의융합', '전문'], note: '', concentration: '3D CGI' },
    { id: 'mi-302', name: '리얼타임엔진프로젝트I:시네마', nameEng: 'Realtime Engine Project I: Cinema', year: 3, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '뉴미디어디자인I,II를 통해 학습한 리얼타임 렌더링의 핵심기술을 영상의 실질적인 영상으로 적용하는 기술적인 방법에 대해 학습하고, 이를 프로덕션을 통해 구현하는 워크숍을 진행한다.', tags: ['인문', '창의융합'], note: '', concentration: '뉴미디어엔터테인먼트' },
    { id: 'mi-303', name: '고급라이브액션프로젝트', nameEng: 'Advanced Liveaction Project', year: 3, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '기초, 고급 과정을 통해 학습한 라이브액션 관련 지식 및 기술을 대응하여 빠른 속도의 라이브액션 영상(단편영화, 뮤직비디오, CF, 패션필름 등)을 제작한다.', tags: ['소통', '글로벌', '창의융합', '전문'], note: '', concentration: '라이브액션' },
    { id: 'mi-304', name: '고급모션디자인', nameEng: 'Advanced Motion Design', year: 3, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '기초모션디자인을 비롯한 일련의 영상디자인관련 영역들의 익혀서 지식과 기술을 사람하고 최화하여, 영화 오프닝타이틀·사운드이펙트스, Station ID, CF, 뮤직비디오 등 연산 기준의 고품질 모션디자인을 제작한다.', tags: ['창의융합', '전문'], note: '', concentration: '모션그래픽스' },
    { id: 'mi-305', name: '고급애니메이션', nameEng: 'Advanced Animation', year: 3, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '기초애니메이션 과정에서 익힌 기본적인 이론 및 기술을 바탕으로, 스톱모션애니메이션, 셀애니메이션, 컷아웃애니메이션, 디지털애니메이션 등 다양한 형식의 작품을 제작하고 새로운 애니메이션 기법을 개발한다.', tags: ['창의융합', '전문'], note: '', concentration: '드로잉애니메이션' },
    { id: 'mi-306', name: '영상미디어의역사', nameEng: 'History of Motion Pictures and Media Art', year: 3, semester: 1, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '영상매체의 역사를 고찰하고, 현대 영상엔터테인먼트산업의 문화적 의미를 진단하여 디자인개발의 근간이 되는 전통적 가치의 함양을 목표로 한다.', tags: ['인문소통', '글로벌'], note: '', concentration: '매체이론' },
    { id: 'mi-307', name: '엔터테인먼트디자인III:실감미디어-캡스톤디자인', nameEng: 'Entertainment Design III: Immersive Media - Capstone Design', year: 3, semester: 1, categoryType: '전공선택', category: 'required', credits: 3, theory: 3, practice: 1, isCapstone: true, isRequired: true, prerequisite: null, description: '엔터테인먼트디자인I,II를 포함한 전공 역량들의 익힌 작업 역량에 대한 전문 지식과 기술을 창의적 작업 언어 및 커뮤니케이션 전략으로 개발하여, 이를 장소 특정 성을 기반한 다양한 실감미디어 플랫폼에 적용하는 방법론을 학습하는 워크숍을 진행한다.', tags: ['소통', '창의융합', '전문'], note: '필수, 캡스톤', concentration: '콘텐츠제작' },

    // ===== 3학년 2학기 =====
    { id: 'mi-308', name: '4D모션디자인', nameEng: '4D Motion Design', year: 3, semester: 2, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: 'Maxon Cinema4D 소프트웨어를 전문적으로 활용하는 방법을 학습하여, 이를 실제 뮤직비디오, OAP, CF, 패션필름 등에 구현되는 고급 모션그래픽 작품에 활용하도록 한다.', tags: ['창의융합', '전문'], note: '', concentration: '모션그래픽스' },
    { id: 'mi-309', name: '리얼타임엔진프로젝트II:XR&메타버스', nameEng: 'Realtime Engine Project II: XR & Metaverse', year: 3, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '가상·증강현실을 중심으로 그 역사, 이론부터 단계별로 배워 나가는 선택학습의 실현한 후, 게임엔진을 이용하여 메타버스 공간을 디자인하고 구현하는 기술적인 방법론을 학습한다.', tags: ['인문', '창의융합'], note: '', concentration: '뉴미디어엔터테인먼트' },
    { id: 'mi-310', name: 'AI와인류I', nameEng: 'AI & Humanity I', year: 3, semester: 2, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '인공지능과 소통하는 방법 중 하나인 \'프롬프트 엔지니어링\'에 대한 기초적인 학습을 하는 것을 목적으로 하며, 인공지능에 대한 의식을 높히는 훈련을 목적으로 한다.', tags: ['인문소통'], note: '', concentration: '뉴미디어엔터테인먼트' },
    { id: 'mi-311', name: '다큐멘터리', nameEng: 'Documentary', year: 3, semester: 2, categoryType: '전공선택', category: 'required', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: true, prerequisite: null, description: '다큐멘터리의 기본적인 이론을 익힌고, 이를 바탕으로 시각주체 다큐멘터리로부터 방송을 위한 교육 다큐멘터리, 엔터테인먼트 등 다양한 장르와 형식의 다큐멘터리를 연구하고 제작한다.', tags: ['인문소통'], note: '필수', concentration: '라이브액션' },
    { id: 'mi-312', name: '엔터테인먼트문화론', nameEng: 'Media Culture Study', year: 3, semester: 2, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '현대 사회의 핵심적 문화산업으로서의 엔터테인먼트산업이 추구해야할 문화적 가치를 주체적 시각에서 조망하고, 문화해석·창조자로서 디자이너의 사회적 책임과 역할에 대하여 성찰한다.', tags: ['인문소통', '글로벌'], note: '', concentration: '매체이론' },
    { id: 'mi-313', name: '졸업작품연구', nameEng: 'Thesis Study', year: 3, semester: 2, categoryType: '전공선택', category: 'required', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: true, prerequisite: null, description: '자신의 전공성과 연구내용, 사회적 합당성 및 미래지향성, 디자인스릴 등을 기반으로 졸업 연구의 방향을 결정하고, 구체적인 전략을 수립하는 프리프로덕션 과정을 수행한다.', tags: ['인문소통'], note: '필수', concentration: '콘텐츠제작' },

    // ===== 4학년 1학기 =====
    { id: 'mi-401', name: '3D단편프로젝트', nameEng: '3D Short Animation Project', year: 4, semester: 1, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '3D 단편 애니메이션의 기획, 제작, 프리뷰를 거쳐 완성함으로써 3D 애니메이션 제작의 전과정을 경험하도록 한다.', tags: ['창의융합', '전문'], note: '', concentration: '3D CGI' },
    { id: 'mi-402', name: '엔터테인먼트스튜디오I-캡스톤디자인', nameEng: 'Entertainment Studio I - Capstone Design', year: 4, semester: 1, categoryType: '전공선택', category: 'required', credits: 3, theory: 2, practice: 1, isCapstone: true, isRequired: true, prerequisite: null, description: '졸업 작품 제작을 통해 엔터테인먼트의 개념의 지향하는 모든 표현형식과 매체 개발의 가능성을 실험하는 통합한 단계의 작업이다.', tags: ['인문소통', '창의융합'], note: '필수, 캡스톤', concentration: '콘텐츠제작' },
    { id: 'mi-403', name: 'AI와인류II', nameEng: 'AI & Humanity II', year: 4, semester: 1, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '인공지능과 소통하는 방법 중 하나인 \'프롬프트 엔지니어링\'에 대한 전문적인 학습을 하는 것을 목적으로 하며, Midjourney, Dall-E, Stable Diffusion, Runway ML 등 관련 프로그램의 활용법을 익혀 작품을 제작하는 워크숍을 진행한다.', tags: ['인문소통'], note: '', concentration: '뉴미디어엔터테인먼트' },

    // ===== 4학년 2학기 =====
    { id: 'mi-404', name: '엔터테인먼트스튜디오II-캡스톤디자인', nameEng: 'Entertainment Studio II - Capstone Design', year: 4, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 2, practice: 1, isCapstone: true, isRequired: false, prerequisite: null, description: '졸업 작품 제작을 통해 엔터테인먼트의 개념의 지향하는 모든 표현형식과 매체 개발의 가능성을 실험하는 통합한 단계의 작업이다.', tags: ['인문소통', '창의융합'], note: '캡스톤', concentration: '콘텐츠제작' },

    // ===== 1~4학년 공통 =====
    { id: 'mi-500', name: '사제동행세미나', nameEng: 'Seminar in Special Topics', year: 1, semester: 1, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: true, prerequisite: null, description: '교수-학생간의 대면관계를 통하여 학생의 지적 호기심을 유발시키고 학생 상호간 동료(선·후배) 관계를 활성화함을 목적으로 한다.', tags: ['인문소통', '글로벌', '창의융합', '전문'], note: '필수(P/N), 1~4학년 선택기, S-TEAM Class와 택1', availableYears: [1, 2, 3, 4] },
  ],
}

export default movingImageDesign
