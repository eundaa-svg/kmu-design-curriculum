import type { Department } from '../../types';

const metalCraft: Department = {
  id: 'metal-craft',
  name: '금속공예학과',
  shortName: '금속공예',
  icon: '💍',
  description: '금속 소재를 바탕으로 장신구와 오브제를 창작하는 조형예술의 전문가를 양성합니다.',
  educationGoal: '금속 소재에 대한 깊은 이해를 바탕으로 전통 공예 기법과 현대적 기술을 융합하여 창의적인 금속 조형물과 장신구를 제작하는 능력을 배양합니다.',
  totalRequiredCredits: 130,
  courses: [
    // 1학년 1학기
    { id: 'mc-s-team', name: 'S-TEAM Class', nameEng: 'S-TEAM Class', year: 1, semester: 1, category: 'required', credits: 1, theory: 0, practice: 1, isCapstone: false, prerequisite: null, description: '신입생을 대상으로 대학 이해, 학부(과)에 대한 이해, 상담과 검사를 실시하며 강의 후반부에는 실제 교내 다양한 비교과 활동에 참여하는 수업으로 구성됩니다.', tags: ['인문', '소통', '글로벌', '창의', '전문'], note: 'P/N 필수' },
    { id: 'mc-basic-craft', name: '기초공예', nameEng: 'Basic Craft', year: 1, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '다양한 공예 재료와 기법을 실습하며 공예 제작의 기초적인 능력을 습득합니다.', tags: ['창의', '전문'] },
    { id: 'mc-drawing', name: '드로잉과표현', nameEng: 'Drawing and Expression', year: 1, semester: 1, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '금속공예 작품 제작을 위한 드로잉과 스케치 능력을 기르고 아이디어를 시각화하는 방법을 학습합니다.', tags: ['창의'] },
    { id: 'mc-metal-intro', name: '금속공예개론', nameEng: 'Introduction to Metal Craft', year: 1, semester: 1, category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '금속공예의 역사와 개념, 주요 기법과 재료에 대해 개론적으로 이해합니다.', tags: ['인문', '소통'] },
    // 1학년 2학기
    { id: 'mc-basic-metal', name: '기초금속공예', nameEng: 'Basic Metal Craft', year: 1, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '금속 소재 가공의 기본 기법인 판금, 단조, 납땜 등을 실습하며 금속 조형의 기초를 습득합니다.', tags: ['창의', '전문'] },
    { id: 'mc-craft-history', name: '공예사', nameEng: 'History of Craft', year: 1, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '동서양 공예의 역사적 흐름을 이해하고 공예의 사회적·문화적 맥락을 탐구합니다.', tags: ['인문'] },
    { id: 'mc-design-method', name: '디자인방법론', nameEng: 'Design Methodology', year: 1, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '디자인 프로세스와 방법론을 이해하고 창의적인 문제 해결 능력을 기릅니다.', tags: ['창의'] },
    // 2학년 1학기
    { id: 'mc-jewelry1', name: '주얼리디자인I', nameEng: 'Jewelry Design I', year: 2, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '주얼리 디자인의 기본 원리를 이해하고 링, 브로치, 목걸이 등 기본적인 장신구를 디자인하고 제작합니다.', tags: ['창의', '전문'] },
    { id: 'mc-forging', name: '단조와성형', nameEng: 'Forging and Forming', year: 2, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '금속을 단조, 성형하는 다양한 기법을 심화 학습하고 복잡한 형태의 금속 조형물을 제작합니다.', tags: ['창의', '전문'] },
    { id: 'mc-material-study', name: '소재연구', nameEng: 'Material Study', year: 2, semester: 1, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '금속을 비롯한 다양한 소재의 특성과 가공 방법을 이해하고 소재 활용의 가능성을 탐구합니다.', tags: ['창의', '전문'] },
    { id: 'mc-casting1', name: '주조기법I', nameEng: 'Casting Techniques I', year: 2, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '금속 주조의 기본 원리와 왁스 주조 기법을 학습하고, 이를 활용한 장신구와 오브제를 제작합니다.', tags: ['창의', '전문'] },
    // 2학년 2학기
    { id: 'mc-jewelry2', name: '주얼리디자인II', nameEng: 'Jewelry Design II', year: 2, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '주얼리디자인I을 심화하여 복잡한 구조와 스톤 세팅을 포함한 고급 주얼리를 디자인하고 제작합니다.', tags: ['창의', '전문'] },
    { id: 'mc-surface-treatment', name: '표면처리기법', nameEng: 'Surface Treatment Techniques', year: 2, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '에칭, 도금, 산화, 에나멜 등 금속 표면을 처리하는 다양한 기법을 학습하고 작품 제작에 응용합니다.', tags: ['창의', '전문'] },
    { id: 'mc-casting2', name: '주조기법II', nameEng: 'Casting Techniques II', year: 2, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '주조기법I을 심화하여 다양한 주조 방법과 복잡한 형태의 주물 제작을 학습합니다.', tags: ['창의', '전문'] },
    { id: 'mc-digital-fabrication', name: '디지털제작', nameEng: 'Digital Fabrication for Metal', year: 2, semester: 2, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: 'CAD 소프트웨어와 3D 프린팅, CNC 가공 등 디지털 제작 기술을 활용한 금속공예 제작을 탐구합니다.', tags: ['창의', '전문'] },
    // 3학년 1학기
    { id: 'mc-object-design1', name: '오브제디자인I', nameEng: 'Object Design I', year: 3, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '예술성과 기능성을 겸비한 금속 오브제를 디자인하고 제작하는 능력을 기릅니다.', tags: ['창의', '전문'] },
    { id: 'mc-wearable', name: '웨어러블아트', nameEng: 'Wearable Art', year: 3, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '신체와의 관계를 탐구하는 예술적 장신구와 웨어러블 오브제를 제작합니다.', tags: ['창의', '전문'] },
    { id: 'mc-stone-setting', name: '스톤세팅과보석학', nameEng: 'Stone Setting and Gemology', year: 3, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '보석의 종류와 특성을 이해하고, 다양한 스톤 세팅 기법을 학습하여 보석과 금속이 결합된 작품을 제작합니다.', tags: ['전문'] },
    // 3학년 2학기
    { id: 'mc-object-design2', name: '오브제디자인II', nameEng: 'Object Design II', year: 3, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '오브제디자인I을 심화하여 사회적·개념적 맥락에서의 금속 오브제 작품을 제작합니다.', tags: ['창의', '전문'] },
    { id: 'mc-brand-jewelry', name: '브랜드주얼리', nameEng: 'Brand Jewelry', year: 3, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '주얼리 브랜드의 아이덴티티를 구축하고 컬렉션을 기획하는 능력을 기릅니다.', tags: ['소통', '창의', '전문'] },
    { id: 'mc-mixed-media', name: '복합소재공예', nameEng: 'Mixed Media Craft', year: 3, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '금속과 목재, 플라스틱, 섬유 등 다양한 소재를 결합한 복합 소재 작품을 제작합니다.', tags: ['창의', '전문'] },
    // 3-4학년 공통
    { id: 'mc-portfolio', name: '포트폴리오와커리어', nameEng: 'Portfolio and Career', year: 3, yearMax: 4, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '졸업 후 진로를 탐색하고 취업과 창업을 위한 포트폴리오 제작과 커리어 계획을 수립합니다.', tags: ['인문', '소통', '글로벌', '전문'] },
    // 4학년
    { id: 'mc-capstone1', name: '졸업작품I(캡스톤디자인)', nameEng: 'Graduation Work I (Capstone Design)', year: 4, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: true, prerequisite: null, description: '4년간의 학습을 종합하여 졸업 작품의 컨셉을 설정하고 제작 계획을 수립합니다.', tags: ['인문', '소통', '창의', '전문'] },
    { id: 'mc-exhibition', name: '전시기획', nameEng: 'Exhibition Planning', year: 4, semester: 1, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '전시 기획의 개념과 방법을 이해하고 졸업 전시를 위한 작품 전시 계획을 수립합니다.', tags: ['소통', '창의'] },
    { id: 'mc-capstone2', name: '졸업작품II(캡스톤디자인)', nameEng: 'Graduation Work II (Capstone Design)', year: 4, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: true, prerequisite: null, description: '졸업작품I에 이어 작품을 완성하고 졸업전시를 개최합니다.', tags: ['인문', '소통', '창의', '전문'] },
    // 전학기
    { id: 'mc-seminar', name: '사제동행세미나', nameEng: 'Seminar in Special Topics', year: 1, yearMax: 4, semester: 0, category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '교수-학생간의 대면관계를 통하여 학생의 지적호기심을 유발시키고 학생 상호간 관계를 활성화합니다.', tags: ['인문', '소통', '글로벌', '창의', '전문'], note: 'P/N 필수' },
  ]
};

export default metalCraft;
