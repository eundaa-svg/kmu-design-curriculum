import type { Department } from '../../types';

const automotiveDesign: Department = {
  id: 'automotive-design',
  name: '자동차·운송디자인학과',
  shortName: '자동차·운송디자인',
  icon: '🚗',
  description: '자동차와 운송 수단을 디자인하는 세계적 수준의 전문 디자이너를 양성합니다.',
  educationGoal: '자동차 디자인의 기술적 이해를 바탕으로 미래 모빌리티를 위한 혁신적이고 미래지향적인 운송 수단을 디자인하는 능력을 배양합니다.',
  totalRequiredCredits: 130,
  courses: [
    // 1학년 1학기
    { id: 'ad-s-team', name: 'S-TEAM Class', nameEng: 'S-TEAM Class', year: 1, semester: 1, category: 'required', credits: 1, theory: 0, practice: 1, isCapstone: false, prerequisite: null, description: '신입생을 대상으로 대학 이해, 학부(과)에 대한 이해, 상담과 검사를 실시하며 강의 후반부에는 실제 교내 다양한 비교과 활동에 참여하는 수업으로 구성됩니다.', tags: ['인문', '소통', '글로벌', '창의', '전문'], note: 'P/N 필수' },
    { id: 'ad-intro', name: '자동차디자인개론', nameEng: 'Introduction to Automotive Design', year: 1, semester: 1, category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '자동차 디자인의 역사와 개념, 자동차 산업의 구조와 현황을 이해하고 자동차 디자이너로서의 비전을 탐색합니다.', tags: ['인문', '소통'] },
    { id: 'ad-car-sketch', name: '자동차스케치', nameEng: 'Automotive Sketching', year: 1, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '자동차 디자인을 위한 전문적인 스케치 기법을 학습하고 자동차 형태를 표현하는 능력을 습득합니다.', tags: ['창의', '전문'] },
    { id: 'ad-3d-form', name: '3D조형실습', nameEng: '3D Form Practice', year: 1, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '입체 조형의 원리를 이해하고 클레이, 폼 등의 재료로 3D 자동차 모형을 제작합니다.', tags: ['창의', '전문'] },
    // 1학년 2학기
    { id: 'ad-transportation-sketch', name: '운송기기스케치', nameEng: 'Transportation Sketching', year: 1, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '자동차를 비롯한 다양한 운송 수단의 형태를 스케치로 표현하는 기술을 심화 학습합니다.', tags: ['창의', '전문'] },
    { id: 'ad-digital-drawing', name: '디지털드로잉', nameEng: 'Digital Drawing for Automotive', year: 1, semester: 2, category: 'required', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '디지털 도구를 활용하여 자동차 디자인 스케치와 렌더링을 제작하는 능력을 습득합니다.', tags: ['창의', '전문'] },
    { id: 'ad-car-history', name: '자동차디자인사', nameEng: 'History of Automotive Design', year: 1, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '자동차 디자인의 역사적 흐름과 주요 디자이너, 브랜드의 변화를 이해합니다.', tags: ['인문'] },
    // 2학년 1학기
    { id: 'ad-exterior1', name: '익스테리어디자인I', nameEng: 'Exterior Design I', year: 2, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '자동차 외부 디자인의 원리와 과정을 학습하고 기본적인 자동차 익스테리어 디자인을 진행합니다.', tags: ['창의', '전문'] },
    { id: 'ad-3d-cad', name: '3D CAD모델링', nameEng: '3D CAD Modeling', year: 2, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: 'CAD 소프트웨어를 활용하여 자동차 디자인의 3D 모델을 제작하는 능력을 습득합니다.', tags: ['창의', '전문'] },
    { id: 'ad-ergonomics', name: '인간공학과운전환경', nameEng: 'Ergonomics and Driving Environment', year: 2, semester: 1, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '운전자와 승객의 신체적·심리적 특성을 이해하고 인간공학적 자동차 설계 원리를 학습합니다.', tags: ['인문', '소통'] },
    { id: 'ad-clay-modeling1', name: '클레이모델링I', nameEng: 'Clay Modeling I', year: 2, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '산업용 클레이를 이용한 자동차 모형 제작의 기초를 학습합니다.', tags: ['창의', '전문'] },
    // 2학년 2학기
    { id: 'ad-exterior2', name: '익스테리어디자인II', nameEng: 'Exterior Design II', year: 2, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '익스테리어디자인I을 심화하여 차체 구조와 공학적 제약을 고려한 자동차 디자인을 진행합니다.', tags: ['창의', '전문'] },
    { id: 'ad-interior1', name: '인테리어디자인I', nameEng: 'Interior Design I', year: 2, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '자동차 실내 공간의 구성 원리와 인터페이스 설계를 이해하고 기본적인 자동차 인테리어 디자인을 진행합니다.', tags: ['창의', '전문'] },
    { id: 'ad-clay-modeling2', name: '클레이모델링II', nameEng: 'Clay Modeling II', year: 2, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '클레이모델링I을 심화하여 실제 비율의 축소 모형을 제작합니다.', tags: ['창의', '전문'] },
    { id: 'ad-mobility-trend', name: '모빌리티트렌드', nameEng: 'Mobility Trends', year: 2, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '전기차, 자율주행차 등 미래 모빌리티의 트렌드와 기술 변화가 디자인에 미치는 영향을 탐구합니다.', tags: ['인문', '소통', '글로벌'] },
    // 3학년 1학기
    { id: 'ad-advanced-design1', name: '자동차디자인스튜디오I', nameEng: 'Automotive Design Studio I', year: 3, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '종합적인 자동차 디자인 프로세스를 경험하는 스튜디오 수업으로, 브리프 분석부터 최종 프레젠테이션까지 진행합니다.', tags: ['창의', '전문'] },
    { id: 'ad-concept-car', name: '컨셉카디자인', nameEng: 'Concept Car Design', year: 3, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '미래 자동차의 가능성을 탐구하는 컨셉카를 디자인하고 시각화합니다.', tags: ['창의', '전문', '글로벌'] },
    { id: 'ad-brand-design', name: '자동차브랜드디자인', nameEng: 'Automotive Brand Design', year: 3, semester: 1, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '자동차 브랜드 아이덴티티를 이해하고 브랜드 가치를 디자인으로 표현하는 방법을 탐구합니다.', tags: ['소통', '창의'] },
    // 3학년 2학기
    { id: 'ad-advanced-design2', name: '자동차디자인스튜디오II', nameEng: 'Automotive Design Studio II', year: 3, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '자동차디자인스튜디오I을 심화하여 글로벌 자동차 회사의 프로젝트를 모방한 실전 디자인을 진행합니다.', tags: ['창의', '전문', '글로벌'] },
    { id: 'ad-transport-design', name: '운송기기디자인', nameEng: 'Transportation Design', year: 3, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '오토바이, 선박, 항공기 등 다양한 운송 수단을 디자인하는 능력을 기릅니다.', tags: ['창의', '전문'] },
    { id: 'ad-ux-automotive', name: '자동차UX디자인', nameEng: 'Automotive UX Design', year: 3, semester: 2, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '자동차 사용자 경험을 이해하고 커넥티드카 시대의 인터페이스와 경험을 디자인합니다.', tags: ['소통', '창의', '전문'] },
    // 3-4학년 공통
    { id: 'ad-portfolio', name: '포트폴리오와커리어', nameEng: 'Portfolio and Career', year: 3, yearMax: 4, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '졸업 후 진로를 탐색하고 취업과 창업을 위한 포트폴리오 제작과 커리어 계획을 수립합니다.', tags: ['인문', '소통', '글로벌', '전문'] },
    // 4학년
    { id: 'ad-capstone1', name: '졸업디자인I(캡스톤디자인)', nameEng: 'Graduation Design I (Capstone Design)', year: 4, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: true, prerequisite: null, description: '4년간의 학습을 종합하여 개인 졸업 디자인 프로젝트의 주제를 설정하고 디자인을 시작합니다.', tags: ['인문', '소통', '창의', '전문'] },
    { id: 'ad-global-design', name: '글로벌자동차디자인', nameEng: 'Global Automotive Design', year: 4, semester: 1, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '세계 각국의 자동차 디자인 트렌드와 문화적 차이를 이해하고 글로벌 디자이너로서의 시각을 키웁니다.', tags: ['인문', '글로벌'] },
    { id: 'ad-capstone2', name: '졸업디자인II(캡스톤디자인)', nameEng: 'Graduation Design II (Capstone Design)', year: 4, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: true, prerequisite: null, description: '졸업디자인I에 이어 디자인을 완성하고 졸업전시를 개최합니다.', tags: ['인문', '소통', '창의', '전문'] },
    // 전학기
    { id: 'ad-seminar', name: '사제동행세미나', nameEng: 'Seminar in Special Topics', year: 1, yearMax: 4, semester: 0, category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '교수-학생간의 대면관계를 통하여 학생의 지적호기심을 유발시키고 학생 상호간 관계를 활성화합니다.', tags: ['인문', '소통', '글로벌', '창의', '전문'], note: 'P/N 필수' },
  ]
};

export default automotiveDesign;
