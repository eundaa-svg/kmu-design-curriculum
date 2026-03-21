import type { Department } from '../../types';

const ceramicCraft: Department = {
  id: 'ceramic-craft',
  name: '도자공예학과',
  shortName: '도자공예',
  icon: '🏺',
  description: '흙을 빚고 불로 구워내는 도예의 전통을 계승하고 현대적으로 재해석하는 도예 전문가를 양성합니다.',
  educationGoal: '도자 재료와 기법에 대한 깊은 이해를 바탕으로 전통 도예 기술과 현대적 조형 언어를 융합하여 예술적·실용적 도자 작품을 창작하는 능력을 배양합니다.',
  totalRequiredCredits: 130,
  courses: [
    // 1학년 1학기
    { id: 'cc-s-team', name: 'S-TEAM Class', nameEng: 'S-TEAM Class', year: 1, semester: 1, category: 'required', credits: 1, theory: 0, practice: 1, isCapstone: false, prerequisite: null, description: '신입생을 대상으로 대학 이해, 학부(과)에 대한 이해, 상담과 검사를 실시하며 강의 후반부에는 실제 교내 다양한 비교과 활동에 참여하는 수업으로 구성됩니다.', tags: ['인문', '소통', '글로벌', '창의', '전문'], note: 'P/N 필수' },
    { id: 'cc-intro', name: '도자공예개론', nameEng: 'Introduction to Ceramic Craft', year: 1, semester: 1, category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '도자공예의 역사와 개념, 주요 기법과 재료에 대해 개론적으로 이해합니다.', tags: ['인문', '소통'] },
    { id: 'cc-hand-building', name: '핸드빌딩', nameEng: 'Hand Building', year: 1, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '코일링, 슬래브 등 손으로 직접 형태를 빚는 핸드빌딩 기법의 기초를 학습합니다.', tags: ['창의', '전문'] },
    { id: 'cc-drawing', name: '드로잉과표현', nameEng: 'Drawing and Expression', year: 1, semester: 1, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '도자 작품 제작을 위한 드로잉과 스케치 능력을 기르고 아이디어를 시각화하는 방법을 학습합니다.', tags: ['창의'] },
    // 1학년 2학기
    { id: 'cc-wheel', name: '물레성형', nameEng: 'Wheel Throwing', year: 1, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '물레를 이용한 성형 기법의 기초를 학습하고, 기본적인 그릇 형태를 제작합니다.', tags: ['창의', '전문'] },
    { id: 'cc-glaze1', name: '유약학I', nameEng: 'Glaze Study I', year: 1, semester: 2, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '유약의 종류와 특성, 발색 원리를 이해하고 기본적인 유약 시험을 진행합니다.', tags: ['전문'] },
    { id: 'cc-craft-history', name: '도자사', nameEng: 'History of Ceramics', year: 1, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '동서양 도자사의 흐름을 이해하고 도자공예의 사회적·문화적 맥락을 탐구합니다.', tags: ['인문'] },
    // 2학년 1학기
    { id: 'cc-vessel1', name: '용기디자인I', nameEng: 'Vessel Design I', year: 2, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '기능적이고 심미적인 도자 용기를 디자인하고 제작하는 능력을 기릅니다.', tags: ['창의', '전문'] },
    { id: 'cc-mold', name: '석고형제작', nameEng: 'Plaster Mold Making', year: 2, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '석고 틀을 제작하고 이를 이용한 주입성형 방법을 학습하여 복수 제작이 가능한 도자 작품을 만듭니다.', tags: ['창의', '전문'] },
    { id: 'cc-firing', name: '소성기법', nameEng: 'Firing Techniques', year: 2, semester: 1, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '전기 가마, 가스 가마 등 다양한 소성 방법과 라쿠, 목가마 등 특수 소성 기법을 학습합니다.', tags: ['전문'] },
    { id: 'cc-surface-decoration', name: '표면장식기법', nameEng: 'Surface Decoration', year: 2, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '조각, 상감, 전사, 안료 장식 등 다양한 도자 표면 장식 기법을 학습합니다.', tags: ['창의', '전문'] },
    // 2학년 2학기
    { id: 'cc-vessel2', name: '용기디자인II', nameEng: 'Vessel Design II', year: 2, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '용기디자인I을 심화하여 세트 구성과 식기류 등 복잡한 용기 디자인을 제작합니다.', tags: ['창의', '전문'] },
    { id: 'cc-glaze2', name: '유약학II', nameEng: 'Glaze Study II', year: 2, semester: 2, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '유약학I을 심화하여 다양한 유약 제조와 특수 유약 표현을 탐구합니다.', tags: ['전문'] },
    { id: 'cc-digital-ceramic', name: '디지털세라믹', nameEng: 'Digital Ceramics', year: 2, semester: 2, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: 'CAD와 3D 프린팅 기술을 도자 제작에 응용하여 새로운 형태와 구조의 도자 작품을 탐구합니다.', tags: ['창의', '전문'] },
    { id: 'cc-design-method', name: '디자인방법론', nameEng: 'Design Methodology', year: 2, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '디자인 사고와 방법론을 이해하고 창의적인 도자 디자인 프로세스를 경험합니다.', tags: ['창의'] },
    // 3학년 1학기
    { id: 'cc-studio1', name: '스튜디오세라믹I', nameEng: 'Studio Ceramics I', year: 3, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '개인적인 조형 언어를 개발하고 개념적인 도자 작품을 제작하는 스튜디오 작업을 시작합니다.', tags: ['창의', '전문'] },
    { id: 'cc-public-art', name: '공공미술과도예', nameEng: 'Public Art and Ceramics', year: 3, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '공공 공간에 설치되는 대형 도자 작품과 환경 도예를 기획하고 제작합니다.', tags: ['소통', '창의', '글로벌'] },
    { id: 'cc-product-design', name: '생활도자디자인', nameEng: 'Product Ceramic Design', year: 3, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '일상생활에 사용되는 도자 제품을 디자인하고 소량 생산을 위한 제작 방법을 연구합니다.', tags: ['창의', '전문'] },
    // 3학년 2학기
    { id: 'cc-studio2', name: '스튜디오세라믹II', nameEng: 'Studio Ceramics II', year: 3, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '스튜디오세라믹I을 심화하여 개인 작품 세계를 심화 발전시킵니다.', tags: ['창의', '전문'] },
    { id: 'cc-workshop', name: '도예워크숍', nameEng: 'Ceramics Workshop', year: 3, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '특정 주제를 중심으로 집중적인 도예 실습을 통해 기술적 역량을 강화합니다.', tags: ['창의', '전문'] },
    { id: 'cc-contemporary', name: '현대도예론', nameEng: 'Contemporary Ceramics', year: 3, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '현대 도예의 동향과 주요 작가들을 분석하고 비평적 시각을 개발합니다.', tags: ['인문', '창의'] },
    // 3-4학년 공통
    { id: 'cc-portfolio', name: '포트폴리오와커리어', nameEng: 'Portfolio and Career', year: 3, yearMax: 4, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '졸업 후 진로를 탐색하고 취업과 창업을 위한 포트폴리오 제작과 커리어 계획을 수립합니다.', tags: ['인문', '소통', '글로벌', '전문'] },
    // 4학년
    { id: 'cc-capstone1', name: '졸업작품I(캡스톤디자인)', nameEng: 'Graduation Work I (Capstone Design)', year: 4, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: true, prerequisite: null, description: '4년간의 학습을 종합하여 졸업 작품의 컨셉을 설정하고 제작을 시작합니다.', tags: ['인문', '소통', '창의', '전문'] },
    { id: 'cc-exhibition', name: '전시기획', nameEng: 'Exhibition Planning', year: 4, semester: 1, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '전시 기획의 개념과 방법을 이해하고 졸업 전시를 위한 기획을 수립합니다.', tags: ['소통', '창의'] },
    { id: 'cc-capstone2', name: '졸업작품II(캡스톤디자인)', nameEng: 'Graduation Work II (Capstone Design)', year: 4, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: true, prerequisite: null, description: '졸업작품I에 이어 작품을 완성하고 졸업전시를 개최합니다.', tags: ['인문', '소통', '창의', '전문'] },
    // 전학기
    { id: 'cc-seminar', name: '사제동행세미나', nameEng: 'Seminar in Special Topics', year: 1, yearMax: 4, semester: 0, category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '교수-학생간의 대면관계를 통하여 학생의 지적호기심을 유발시키고 학생 상호간 관계를 활성화합니다.', tags: ['인문', '소통', '글로벌', '창의', '전문'], note: 'P/N 필수' },
  ]
};

export default ceramicCraft;
