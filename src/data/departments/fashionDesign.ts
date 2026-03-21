import type { Department } from '../../types';

const fashionDesign: Department = {
  id: 'fashion-design',
  name: '의상디자인학과',
  shortName: '의상디자인',
  icon: '👗',
  description: '의복과 패션을 통해 인간의 삶을 풍요롭게 하는 창의적인 패션 디자이너를 양성합니다.',
  educationGoal: '의류 소재와 제작 기술의 전문성을 바탕으로 트렌드를 이해하고 창의적인 패션 디자인을 개발하며 브랜드와 컬렉션을 기획하는 능력을 배양합니다.',
  totalRequiredCredits: 130,
  courses: [
    // 1학년 1학기
    { id: 'fd-s-team', name: 'S-TEAM Class', nameEng: 'S-TEAM Class', year: 1, semester: 1, category: 'required', credits: 1, theory: 0, practice: 1, isCapstone: false, prerequisite: null, description: '신입생을 대상으로 대학 이해, 학부(과)에 대한 이해, 상담과 검사를 실시하며 강의 후반부에는 실제 교내 다양한 비교과 활동에 참여하는 수업으로 구성됩니다.', tags: ['인문', '소통', '글로벌', '창의', '전문'], note: 'P/N 필수' },
    { id: 'fd-fashion-intro', name: '패션디자인개론', nameEng: 'Introduction to Fashion Design', year: 1, semester: 1, category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '패션 디자인의 개념과 역사, 패션 산업의 구조와 현황을 이해하고 패션 디자이너로서의 비전을 탐색합니다.', tags: ['인문', '소통'] },
    { id: 'fd-fashion-drawing', name: '패션드로잉', nameEng: 'Fashion Drawing', year: 1, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '패션 일러스트레이션의 기본 기법을 학습하고 인체 비례와 다양한 포즈를 활용한 패션 드로잉 능력을 습득합니다.', tags: ['창의', '전문'] },
    { id: 'fd-sewing', name: '기초의복구성', nameEng: 'Basic Clothing Construction', year: 1, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '의복 제작의 기초가 되는 인체 계측, 패턴 제작, 재봉 기법 등을 학습합니다.', tags: ['창의', '전문'] },
    // 1학년 2학기
    { id: 'fd-textiles', name: '섬유소재학', nameEng: 'Textile and Materials', year: 1, semester: 2, category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '천연섬유와 합성섬유의 특성, 직물 구조와 가공 방법을 이해하고 디자인에 적합한 소재를 선택하는 능력을 기릅니다.', tags: ['전문'] },
    { id: 'fd-pattern1', name: '패턴메이킹I', nameEng: 'Pattern Making I', year: 1, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '의복 패턴 제작의 원리를 이해하고 기본 원형을 바탕으로 다양한 스타일의 패턴을 전개하는 능력을 습득합니다.', tags: ['창의', '전문'] },
    { id: 'fd-fashion-history', name: '패션사', nameEng: 'Fashion History', year: 1, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '서양 복식사와 한국 복식사를 통해 패션의 역사적 흐름과 사회적·문화적 맥락을 이해합니다.', tags: ['인문'] },
    { id: 'fd-digital-fashion', name: '디지털패션드로잉', nameEng: 'Digital Fashion Drawing', year: 1, semester: 2, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '디지털 드로잉 소프트웨어를 활용하여 패션 일러스트레이션을 제작하는 능력을 기릅니다.', tags: ['창의', '전문'] },
    // 2학년 1학기
    { id: 'fd-design1', name: '패션디자인I', nameEng: 'Fashion Design I', year: 2, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '패션 디자인의 기본 프로세스를 이해하고 테마에 따른 의복 디자인 개발 과정을 경험합니다.', tags: ['창의', '전문'] },
    { id: 'fd-pattern2', name: '패턴메이킹II', nameEng: 'Pattern Making II', year: 2, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '패턴메이킹I을 심화하여 재킷, 코트 등 복잡한 의복의 패턴 제작과 봉제 기술을 학습합니다.', tags: ['창의', '전문'] },
    { id: 'fd-trend', name: '패션트렌드분석', nameEng: 'Fashion Trend Analysis', year: 2, semester: 1, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '패션 트렌드를 분석하고 예측하는 방법을 학습하며 사회적·문화적 변화와 패션의 관계를 탐구합니다.', tags: ['인문', '소통', '글로벌'] },
    { id: 'fd-draping', name: '드레이핑', nameEng: 'Draping', year: 2, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '인체나 마네킹에 직접 천을 고정하고 형태를 만들어 가는 드레이핑 기법을 학습합니다.', tags: ['창의', '전문'] },
    // 2학년 2학기
    { id: 'fd-design2', name: '패션디자인II', nameEng: 'Fashion Design II', year: 2, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '패션디자인I을 심화하여 복잡한 컨셉과 스타일을 가진 의복 컬렉션을 개발합니다.', tags: ['창의', '전문'] },
    { id: 'fd-cad', name: '패션CAD', nameEng: 'Fashion CAD', year: 2, semester: 2, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '컴퓨터를 활용한 패션 디자인과 패턴 제작 소프트웨어를 학습하여 디지털 패션 제작 능력을 습득합니다.', tags: ['창의', '전문'] },
    { id: 'fd-fashion-marketing', name: '패션마케팅', nameEng: 'Fashion Marketing', year: 2, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '패션 시장의 구조와 마케팅 전략을 이해하고 브랜드 기획과 제품 상품화 과정을 학습합니다.', tags: ['인문', '소통'] },
    { id: 'fd-sustainable', name: '지속가능패션', nameEng: 'Sustainable Fashion', year: 2, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '패션 산업의 환경적 영향을 이해하고 지속가능한 소재와 제작 방법을 탐구합니다.', tags: ['글로벌', '창의'] },
    // 3학년 1학기
    { id: 'fd-collection1', name: '컬렉션디자인I', nameEng: 'Collection Design I', year: 3, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '통합적인 패션 컬렉션을 기획하고 제작하는 능력을 기릅니다. 주제 설정, 소재 연구, 디자인 개발, 제작까지의 전 과정을 경험합니다.', tags: ['창의', '전문'] },
    { id: 'fd-knitwear', name: '니트웨어디자인', nameEng: 'Knitwear Design', year: 3, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '니트 소재의 특성과 편직 기법을 이해하고 니트웨어 디자인과 제작을 학습합니다.', tags: ['창의', '전문'] },
    { id: 'fd-fashion-brand', name: '패션브랜드기획', nameEng: 'Fashion Brand Planning', year: 3, semester: 1, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '패션 브랜드 구축의 전략과 방법을 이해하고 브랜드 아이덴티티 개발 과정을 경험합니다.', tags: ['소통', '창의'] },
    // 3학년 2학기
    { id: 'fd-collection2', name: '컬렉션디자인II', nameEng: 'Collection Design II', year: 3, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '컬렉션디자인I을 심화하여 상업적 가능성을 고려한 패션 컬렉션을 완성합니다.', tags: ['창의', '전문'] },
    { id: 'fd-fashion-styling', name: '패션스타일링', nameEng: 'Fashion Styling', year: 3, semester: 2, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '패션 스타일링의 원리와 기법을 학습하고 사진 촬영, 광고, 에디토리얼 등의 스타일링 프로젝트를 진행합니다.', tags: ['소통', '창의', '전문'] },
    { id: 'fd-global-fashion', name: '글로벌패션문화', nameEng: 'Global Fashion Culture', year: 3, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '세계 각 지역의 패션 문화와 트렌드를 이해하고 글로벌 패션 시장에서의 경쟁력을 탐구합니다.', tags: ['인문', '글로벌'] },
    // 3-4학년 공통
    { id: 'fd-portfolio', name: '포트폴리오와커리어', nameEng: 'Portfolio and Career', year: 3, yearMax: 4, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '졸업 후 진로를 탐색하고 취업과 창업을 위한 포트폴리오 제작과 커리어 계획을 수립합니다.', tags: ['인문', '소통', '글로벌', '전문'] },
    // 4학년
    { id: 'fd-capstone1', name: '졸업컬렉션I(캡스톤디자인)', nameEng: 'Graduation Collection I (Capstone Design)', year: 4, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: true, prerequisite: null, description: '4년간의 학습을 종합하여 졸업 컬렉션의 컨셉을 설정하고 제작을 시작합니다.', tags: ['인문', '소통', '창의', '전문'] },
    { id: 'fd-fashion-show', name: '패션쇼기획', nameEng: 'Fashion Show Planning', year: 4, semester: 1, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '패션쇼의 기획과 연출 방법을 학습하고 졸업 패션쇼를 위한 기획을 수립합니다.', tags: ['소통', '창의'] },
    { id: 'fd-capstone2', name: '졸업컬렉션II(캡스톤디자인)', nameEng: 'Graduation Collection II (Capstone Design)', year: 4, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: true, prerequisite: null, description: '졸업컬렉션I에 이어 컬렉션을 완성하고 졸업 패션쇼와 전시를 개최합니다.', tags: ['인문', '소통', '창의', '전문'] },
    // 전학기
    { id: 'fd-seminar', name: '사제동행세미나', nameEng: 'Seminar in Special Topics', year: 1, yearMax: 4, semester: 0, category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '교수-학생간의 대면관계를 통하여 학생의 지적호기심을 유발시키고 학생 상호간 관계를 활성화합니다.', tags: ['인문', '소통', '글로벌', '창의', '전문'], note: 'P/N 필수' },
  ]
};

export default fashionDesign;
