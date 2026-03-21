import type { Department } from '../../types';

const spatialDesign: Department = {
  id: 'spatial-design',
  name: '공간디자인학과',
  shortName: '공간디자인',
  icon: '🏛️',
  description: '인간의 삶을 담는 공간을 창조하는 공간 디자인 전문가를 양성합니다.',
  educationGoal: '실내 공간, 전시 공간, 상업 공간 등 다양한 공간 유형에 대한 이해를 바탕으로 인간 행동과 심리를 고려한 기능적이고 심미적인 공간을 설계하는 능력을 배양합니다.',
  totalRequiredCredits: 130,
  courses: [
    // 1학년 1학기
    { id: 'sd-s-team', name: 'S-TEAM Class', nameEng: 'S-TEAM Class', year: 1, semester: 1, category: 'required', credits: 1, theory: 0, practice: 1, isCapstone: false, prerequisite: null, description: '신입생을 대상으로 대학 이해, 학부(과)에 대한 이해, 상담과 검사를 실시하며 강의 후반부에는 실제 교내 다양한 비교과 활동에 참여하는 수업으로 구성됩니다.', tags: ['인문', '소통', '글로벌', '창의', '전문'], note: 'P/N 필수' },
    { id: 'sd-intro', name: '공간디자인개론', nameEng: 'Introduction to Spatial Design', year: 1, semester: 1, category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '공간디자인의 개념과 역사, 공간 유형과 설계 원리에 대해 개론적으로 이해합니다.', tags: ['인문', '소통'] },
    { id: 'sd-drawing', name: '건축드로잉', nameEng: 'Architectural Drawing', year: 1, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '건축과 공간 디자인에서 사용되는 도면 작성의 기초와 공간 표현 방법을 학습합니다.', tags: ['창의', '전문'] },
    { id: 'sd-color-material', name: '색채와재료', nameEng: 'Color and Material', year: 1, semester: 1, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '공간에서 사용되는 색채 원리와 다양한 마감 재료의 특성을 이해하고 활용하는 방법을 학습합니다.', tags: ['창의', '전문'] },
    // 1학년 2학기
    { id: 'sd-space-design1', name: '공간디자인I', nameEng: 'Spatial Design I', year: 1, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '공간 구성의 원리를 이해하고 기본적인 실내 공간을 설계하는 능력의 기초를 습득합니다.', tags: ['창의', '전문'] },
    { id: 'sd-cad', name: '공간CAD', nameEng: 'Spatial CAD', year: 1, semester: 2, category: 'required', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: 'AutoCAD를 비롯한 2D CAD 소프트웨어를 활용하여 공간 도면을 작성하는 능력을 습득합니다.', tags: ['창의', '전문'] },
    { id: 'sd-history', name: '공간디자인사', nameEng: 'History of Spatial Design', year: 1, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '건축과 실내 디자인의 역사적 흐름을 이해하고 현대 공간 디자인의 맥락을 탐구합니다.', tags: ['인문'] },
    // 2학년 1학기
    { id: 'sd-space-design2', name: '공간디자인II', nameEng: 'Spatial Design II', year: 2, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '주거 공간과 상업 공간 등 다양한 공간 유형을 설계하는 능력을 기릅니다.', tags: ['창의', '전문'] },
    { id: 'sd-3d-modeling', name: '3D모델링과렌더링', nameEng: '3D Modeling and Rendering', year: 2, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '3D 모델링 소프트웨어를 활용하여 공간을 입체적으로 표현하고 렌더링 기술을 학습합니다.', tags: ['창의', '전문'] },
    { id: 'sd-human-behavior', name: '인간행동과환경', nameEng: 'Human Behavior and Environment', year: 2, semester: 1, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '인간 행동과 심리가 공간 설계에 미치는 영향을 이해하고 사용자 중심의 공간 설계 원리를 탐구합니다.', tags: ['인문', '소통'] },
    { id: 'sd-furniture', name: '가구디자인', nameEng: 'Furniture Design', year: 2, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '공간과 조화를 이루는 가구를 디자인하고 제작하는 능력을 기릅니다.', tags: ['창의', '전문'] },
    // 2학년 2학기
    { id: 'sd-commercial', name: '상업공간디자인', nameEng: 'Commercial Space Design', year: 2, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '매장, 식음료 공간, 호텔 등 상업 공간의 설계 방법과 특성을 이해하고 프로젝트를 진행합니다.', tags: ['창의', '전문'] },
    { id: 'sd-lighting', name: '조명디자인', nameEng: 'Lighting Design', year: 2, semester: 2, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '공간에서의 조명 계획 원리와 다양한 조명 기법을 이해하고 조명 설계를 실습합니다.', tags: ['창의', '전문'] },
    { id: 'sd-materials-tech', name: '재료와시공기술', nameEng: 'Materials and Construction', year: 2, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '공간 마감재의 종류와 특성, 시공 방법을 이해하고 현장 적용 능력을 기릅니다.', tags: ['전문'] },
    { id: 'sd-exhibition', name: '전시디자인', nameEng: 'Exhibition Design', year: 2, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '전시 공간의 기획과 설계 방법을 이해하고 전시 프로그램에 맞는 공간 구성을 경험합니다.', tags: ['소통', '창의', '전문'] },
    // 3학년 1학기
    { id: 'sd-studio1', name: '공간디자인스튜디오I', nameEng: 'Spatial Design Studio I', year: 3, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '복잡한 프로그램을 가진 공간을 자율적으로 기획하고 설계하는 스튜디오 수업입니다.', tags: ['창의', '전문'] },
    { id: 'sd-wayfinding', name: '사이니지와환경그래픽', nameEng: 'Signage and Environmental Graphics', year: 3, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '공간 안내 시스템과 환경 그래픽의 원리를 이해하고 설계하는 능력을 기릅니다.', tags: ['소통', '창의', '전문'] },
    { id: 'sd-bim', name: 'BIM과디지털스페이스', nameEng: 'BIM and Digital Space', year: 3, semester: 1, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: 'BIM 소프트웨어와 가상현실을 활용한 공간 설계 방법을 학습합니다.', tags: ['창의', '전문'] },
    // 3학년 2학기
    { id: 'sd-studio2', name: '공간디자인스튜디오II', nameEng: 'Spatial Design Studio II', year: 3, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '공간디자인스튜디오I을 심화하여 사회적·문화적 맥락이 있는 복합 공간 프로젝트를 진행합니다.', tags: ['창의', '전문'] },
    { id: 'sd-cultural', name: '문화공간디자인', nameEng: 'Cultural Space Design', year: 3, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '박물관, 갤러리, 도서관 등 문화 공간의 설계 특성을 이해하고 프로젝트를 진행합니다.', tags: ['인문', '소통', '창의'] },
    { id: 'sd-design-strategy', name: '공간디자인전략', nameEng: 'Spatial Design Strategy', year: 3, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '공간 디자인의 비즈니스적 맥락을 이해하고 디자인 전략을 수립하는 방법을 학습합니다.', tags: ['인문', '소통'] },
    // 3-4학년 공통
    { id: 'sd-portfolio', name: '포트폴리오와커리어', nameEng: 'Portfolio and Career', year: 3, yearMax: 4, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '졸업 후 진로를 탐색하고 취업과 창업을 위한 포트폴리오 제작과 커리어 계획을 수립합니다.', tags: ['인문', '소통', '글로벌', '전문'] },
    // 4학년
    { id: 'sd-capstone1', name: '졸업설계I(캡스톤디자인)', nameEng: 'Graduation Design I (Capstone Design)', year: 4, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: true, prerequisite: null, description: '4년간의 학습을 종합하여 졸업 설계 프로젝트의 주제를 설정하고 기획 및 설계를 시작합니다.', tags: ['인문', '소통', '창의', '전문'] },
    { id: 'sd-urban', name: '도시와공공공간', nameEng: 'Urban and Public Space', year: 4, semester: 1, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '도시 공간의 구조와 공공 공간의 역할을 이해하고 도시 환경에서의 공간 디자인을 탐구합니다.', tags: ['인문', '소통', '글로벌'] },
    { id: 'sd-capstone2', name: '졸업설계II(캡스톤디자인)', nameEng: 'Graduation Design II (Capstone Design)', year: 4, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: true, prerequisite: null, description: '졸업설계I에 이어 설계를 완성하고 졸업전시를 개최합니다.', tags: ['인문', '소통', '창의', '전문'] },
    // 전학기
    { id: 'sd-seminar', name: '사제동행세미나', nameEng: 'Seminar in Special Topics', year: 1, yearMax: 4, semester: 0, category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '교수-학생간의 대면관계를 통하여 학생의 지적호기심을 유발시키고 학생 상호간 관계를 활성화합니다.', tags: ['인문', '소통', '글로벌', '창의', '전문'], note: 'P/N 필수' },
  ]
};

export default spatialDesign;
