import type { Department } from '../../types';

const visualDesign: Department = {
  id: 'visual-design',
  name: '시각디자인학과',
  shortName: '시각디자인',
  icon: '🎨',
  description: '시각적 커뮤니케이션을 통해 사회와 문화에 기여하는 창의적인 시각디자이너를 양성합니다.',
  educationGoal: '타이포그래피, 그래픽, 브랜드, 모션, 경험디자인 등 다양한 시각디자인 영역에서 전문성을 갖추고, 디지털 환경과 인쇄 매체를 아우르는 통합적 디자인 역량을 배양합니다.',
  totalRequiredCredits: 130,
  courses: [
    // 1학년 1학기
    { id: 'vd-s-team', name: 'S-TEAM Class', nameEng: 'S-TEAM Class', year: 1, semester: 1, category: 'required', credits: 1, theory: 0, practice: 1, isCapstone: false, prerequisite: null, description: '신입생을 대상으로 대학 이해, 학부(과)에 대한 이해, 상담과 검사를 실시하며 강의 후반부에는 실제 교내 다양한 비교과 활동에 참여하는 수업으로 구성됩니다.', tags: ['인문', '소통', '글로벌', '창의', '전문'], note: 'P/N 필수' },
    { id: 'vd-2d-digital', name: '2D디지털그래픽스', nameEng: '2D Digital Graphics', year: 1, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '포토샵, 일러스트레이터 등 2D 디지털 그래픽 도구를 활용하여 비주얼 표현의 기초를 학습합니다.', tags: ['창의', '전문'] },
    { id: 'vd-basic-design', name: '기초디자인', nameEng: 'Basic Design', year: 1, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '조형의 기본 원리와 요소를 이해하고 점, 선, 면, 색채, 질감 등의 조형 요소를 활용한 평면 디자인의 기초를 학습합니다.', tags: ['소통', '창의'] },
    { id: 'vd-drawing', name: '드로잉', nameEng: 'Drawing', year: 1, semester: 1, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '다양한 드로잉 기법을 통해 관찰력과 표현력을 기르고 디자인의 기초적 시각화 능력을 함양합니다.', tags: ['창의'] },
    { id: 'vd-typography1', name: '타이포그래피I', nameEng: 'Typography I', year: 1, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '타이포그래피의 역사와 원리를 이해하고, 서체의 특성과 활용 방법을 학습하며 기초적인 활자 조판 능력을 습득합니다.', tags: ['창의', '전문'] },
    // 1학년 2학기
    { id: 'vd-3d-digital', name: '3D디지털그래픽스', nameEng: '3D Digital Graphics', year: 1, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '3D 모델링 및 렌더링 소프트웨어를 활용하여 입체적 시각 표현의 기초를 학습합니다.', tags: ['창의', '전문'] },
    { id: 'vd-media-design1', name: '미디어디자인I', nameEng: 'Media Design I', year: 1, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '다양한 미디어 환경에서의 디자인 원리와 방법을 학습하고, 디지털 매체를 활용한 기초 미디어 디자인을 실습합니다.', tags: ['소통', '창의', '전문'], note: 'P/N' },
    // 전학기
    { id: 'vd-seminar', name: '사제동행세미나', nameEng: 'Seminar in Special Topics', year: 1, yearMax: 4, semester: 0, category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '교수-학생간의 대면관계를 통하여 학생의 지적호기심을 유발시키고 학생 상호간(동료·선후배) 관계를 활성화함을 목적으로 합니다.', tags: ['인문', '소통', '글로벌', '창의', '전문'], note: 'P/N 필수' },
    // 2학년 1학기
    { id: 'vd-graphic1', name: '그래픽디자인I', nameEng: 'Graphic Design I', year: 2, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '그래픽디자인의 원리와 방법론을 이해하고 포스터, 리플렛 등 인쇄 매체를 중심으로 한 그래픽 디자인 제작 능력을 기릅니다.', tags: ['창의', '전문'] },
    { id: 'vd-writing1', name: '디자인과글쓰기I', nameEng: 'Design and Writing I', year: 2, semester: 1, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '디자인 개념과 프로세스를 글로 표현하는 능력을 기르고, 디자인 비평과 분석 방법을 학습합니다.', tags: ['인문', '소통'] },
    { id: 'vd-typography2', name: '타이포그래피II', nameEng: 'Typography II', year: 2, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: 'vd-typography1', description: '타이포그래피I을 바탕으로 편집디자인, 정보디자인 등에서의 타이포그래피 활용을 심화합니다.', tags: ['창의', '전문'] },
    { id: 'vd-media-design2', name: '미디어디자인II', nameEng: 'Media Design II', year: 2, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '다양한 디지털 미디어 플랫폼에서의 디자인 원리를 심화하고 인터랙티브 미디어 디자인을 학습합니다.', tags: ['소통', '창의', '전문'] },
    { id: 'vd-design-history', name: '디자인사', nameEng: 'History of Design', year: 2, semester: 1, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '근현대 디자인의 역사적 흐름을 이해하고 디자인의 사회적·문화적 맥락을 탐구합니다.', tags: ['인문'] },
    // 2학년 2학기
    { id: 'vd-graphic2', name: '그래픽디자인II', nameEng: 'Graphic Design II', year: 2, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '그래픽디자인I을 심화하여 복잡한 그래픽 시스템과 아이덴티티 디자인을 학습합니다.', tags: ['창의', '전문'] },
    { id: 'vd-writing2', name: '디자인과글쓰기II', nameEng: 'Design and Writing II', year: 2, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '디자인 리서치와 논문 작성 방법을 학습하고 디자인 프로젝트의 개념과 방향성을 문서화하는 능력을 기릅니다.', tags: ['인문', '소통'] },
    { id: 'vd-type-content', name: '타입과컨텐츠', nameEng: 'Type and Contents', year: 2, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '텍스트와 이미지가 결합된 콘텐츠 디자인을 실험하고 다양한 매체에서의 타이포그래피 표현을 탐구합니다.', tags: ['창의', '전문'] },
    { id: 'vd-motion1', name: '모션그래픽I', nameEng: 'Motion Graphic I', year: 2, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '영상과 그래픽의 결합을 통해 모션 그래픽의 기본 원리와 제작 방법을 학습합니다.', tags: ['창의', '전문'] },
    // 3학년 1학기
    { id: 'vd-workshop1', name: '시각디자인워크숍I', nameEng: 'Visual Design Workshop I', year: 3, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '특정 주제를 중심으로 시각디자인 프로세스를 집중적으로 경험하는 워크숍 형태의 수업입니다.', tags: ['창의', '전문'] },
    { id: 'vd-design-theory', name: '디자인론', nameEng: 'Theory of Design', year: 3, semester: 1, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '디자인의 철학적, 미학적 이론을 탐구하고 현대 디자인의 개념과 방향성을 비판적으로 분석합니다.', tags: ['인문', '창의'] },
    { id: 'vd-type-media', name: '타입과미디어', nameEng: 'Type and Media', year: 3, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '디지털 미디어 환경에서의 타이포그래피를 실험하고 미디어 특성에 맞는 타입 디자인을 연구합니다.', tags: ['창의', '전문'] },
    { id: 'vd-experience1', name: '경험디자인I', nameEng: 'Experience Design I', year: 3, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '사용자 경험을 중심으로 한 인터랙션 디자인의 원리를 학습하고 디지털 서비스 디자인을 경험합니다.', tags: ['소통', '창의', '전문'] },
    { id: 'vd-motion2', name: '모션그래픽II', nameEng: 'Motion Graphic II', year: 3, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '모션그래픽I을 심화하여 타이틀 시퀀스, 광고 영상 등 복잡한 모션 디자인 프로젝트를 진행합니다.', tags: ['창의', '전문'] },
    { id: 'vd-illustration1', name: '일러스트레이션I', nameEng: 'Illustration I', year: 3, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '다양한 일러스트레이션 기법과 스타일을 탐구하고 출판, 광고, 디지털 미디어를 위한 일러스트레이션을 제작합니다.', tags: ['창의', '전문'] },
    // 3학년 2학기
    { id: 'vd-workshop2', name: '시각디자인워크숍II', nameEng: 'Visual Design Workshop II', year: 3, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '시각디자인워크숍I에 이어 사회적·문화적 이슈를 주제로 한 시각디자인 프로젝트를 심화 진행합니다.', tags: ['창의', '전문'] },
    { id: 'vd-hybrid-imaging', name: '하이브리드이미징', nameEng: 'Hybrid Imaging', year: 3, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '사진, 디지털 그래픽, 일러스트레이션 등 다양한 이미지 매체를 혼합하여 새로운 시각 언어를 탐구합니다.', tags: ['창의', '전문'] },
    { id: 'vd-strategy1', name: '디자인전략I', nameEng: 'Design Strategy I', year: 3, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '디자인 경영과 전략의 관점에서 디자인의 역할을 이해하고 브랜드와 비즈니스를 위한 디자인 전략을 수립합니다.', tags: ['인문', '소통'] },
    { id: 'vd-brand1', name: '브랜드디자인I', nameEng: 'Brand Design I', year: 3, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '브랜드 아이덴티티의 개념을 이해하고, 로고, 컬러, 타이포그래피 등 브랜드 요소를 통합한 아이덴티티 시스템을 디자인합니다.', tags: ['소통', '창의', '전문'] },
    { id: 'vd-experience2', name: '경험디자인II', nameEng: 'Experience Design II', year: 3, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '경험디자인I을 심화하여 복잡한 사용자 여정과 서비스 생태계를 디자인하는 프로젝트를 진행합니다.', tags: ['소통', '창의', '전문'] },
    { id: 'vd-illustration2', name: '일러스트레이션II', nameEng: 'Illustration II', year: 3, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '일러스트레이션I을 심화하여 개인적인 작품 세계를 구축하고 다양한 매체와 협업하는 일러스트레이션 프로젝트를 진행합니다.', tags: ['창의', '전문'] },
    { id: 'vd-advertising1', name: '광고디자인I', nameEng: 'Advertising Design I', year: 3, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '광고 커뮤니케이션의 원리와 크리에이티브 전략을 이해하고, 다양한 매체를 위한 광고 디자인을 제작합니다.', tags: ['소통', '창의', '전문'] },
    // 4학년 1학기
    { id: 'vd-brand2', name: '브랜드디자인II', nameEng: 'Brand Design II', year: 4, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '브랜드디자인I을 심화하여 복잡한 브랜드 생태계와 멀티 브랜드 시스템을 디자인합니다.', tags: ['소통', '창의', '전문'] },
    { id: 'vd-advertising2', name: '광고디자인II', nameEng: 'Advertising Design II', year: 4, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '통합 마케팅 커뮤니케이션의 관점에서 브랜드 캠페인을 기획하고 다양한 채널을 아우르는 광고 디자인을 제작합니다.', tags: ['소통', '창의', '전문'] },
    { id: 'vd-capstone1', name: '캡스톤디자인스튜디오I', nameEng: 'Capstone Design Studio I', year: 4, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: true, prerequisite: null, description: '졸업 프로젝트를 준비하는 과정으로, 스스로 주제를 설정하고 리서치, 컨셉, 디자인 개발의 전 과정을 자율적으로 진행합니다.', tags: ['인문', '소통', '창의', '전문'] },
    { id: 'vd-strategy2', name: '디자인전략II', nameEng: 'Design Strategy II', year: 4, semester: 1, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '디자인전략I을 심화하여 실제 기업 및 기관과의 협업을 통한 디자인 전략 프로젝트를 진행합니다.', tags: ['인문', '소통'] },
    // 4학년 2학기
    { id: 'vd-capstone2', name: '캡스톤디자인스튜디오II', nameEng: 'Capstone Design Studio II', year: 4, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: true, prerequisite: null, description: '캡스톤디자인스튜디오I에 이어 졸업 작품을 완성하고 졸업전시를 진행합니다.', tags: ['인문', '소통', '창의', '전문'] },
    // 디자인프랙티컴 (인턴십)
    { id: 'vd-practicum1', name: '디자인프랙티컴I', nameEng: 'Design Practicum I', year: 3, yearMax: 4, semester: 1, category: 'elective', credits: 3, theory: 0, practice: 3, isCapstone: false, prerequisite: null, description: '디자인 회사, 광고 대행사, 기업 디자인실 등에서의 현장 실습을 통해 실무 경험을 쌓습니다.', tags: ['소통', '글로벌', '전문'] },
    { id: 'vd-practicum2', name: '디자인프랙티컴II', nameEng: 'Design Practicum II', year: 3, yearMax: 4, semester: 2, category: 'elective', credits: 3, theory: 0, practice: 3, isCapstone: false, prerequisite: null, description: '디자인프랙티컴I에 이어 보다 심화된 현장 실습 경험을 통해 실무 역량을 강화합니다.', tags: ['소통', '글로벌', '전문'] },
  ]
};

export default visualDesign;
