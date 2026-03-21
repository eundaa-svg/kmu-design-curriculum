import type { Department } from '../../types';

const aiDesign: Department = {
  id: 'ai-design',
  name: 'AI디자인학과',
  shortName: 'AI디자인',
  icon: '🤖',
  description: '인공지능 기술과 디자인을 융합하여 미래 디지털 환경을 선도하는 AI 기반 디자이너를 양성합니다.',
  educationGoal: '인공지능 기술의 이해를 바탕으로 AI 도구를 활용한 창의적 디자인 능력을 갖추고, 데이터 기반의 디자인 의사결정과 AI와 인간이 협력하는 새로운 디자인 패러다임을 이끌어가는 역량을 배양합니다.',
  totalRequiredCredits: 130,
  courses: [
    // 1학년 1학기
    { id: 'aid-s-team', name: 'S-TEAM Class', nameEng: 'S-TEAM Class', year: 1, semester: 1, category: 'required', credits: 1, theory: 0, practice: 1, isCapstone: false, prerequisite: null, description: '신입생을 대상으로 대학 이해, 학부(과)에 대한 이해, 상담과 검사를 실시하며 강의 후반부에는 실제 교내 다양한 비교과 활동에 참여하는 수업으로 구성됩니다.', tags: ['인문', '소통', '글로벌', '창의', '전문'], note: 'P/N 필수' },
    { id: 'aid-intro', name: 'AI디자인개론', nameEng: 'Introduction to AI Design', year: 1, semester: 1, category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: 'AI 기술의 기초 개념과 디자인 분야에서의 AI 활용 가능성을 이해하고 AI 디자이너로서의 비전을 탐색합니다.', tags: ['인문', '소통'] },
    { id: 'aid-basic-design', name: '기초디자인', nameEng: 'Basic Design', year: 1, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '디자인의 기본 원리와 요소를 이해하고 조형적 표현 능력의 기초를 습득합니다.', tags: ['창의'] },
    { id: 'aid-programming', name: '디자인을위한프로그래밍', nameEng: 'Programming for Design', year: 1, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: 'Python, Processing 등의 프로그래밍 언어를 활용하여 창의적인 디지털 디자인을 만드는 기초를 학습합니다.', tags: ['창의', '전문'] },
    // 1학년 2학기
    { id: 'aid-generative-art', name: '생성형AI와디자인', nameEng: 'Generative AI and Design', year: 1, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: 'Midjourney, Stable Diffusion, DALL-E 등 생성형 AI 도구를 활용하여 창의적인 이미지와 디자인을 제작합니다.', tags: ['창의', '전문'] },
    { id: 'aid-data-visualization', name: '데이터시각화', nameEng: 'Data Visualization', year: 1, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '데이터를 시각적으로 표현하는 원리와 방법을 학습하고 인터랙티브 데이터 시각화를 제작합니다.', tags: ['소통', '창의', '전문'] },
    { id: 'aid-digital-media', name: '디지털미디어론', nameEng: 'Digital Media Theory', year: 1, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '디지털 미디어의 특성과 사회적 영향을 이해하고 AI 시대의 미디어 환경을 탐구합니다.', tags: ['인문', '소통'] },
    // 2학년 1학기
    { id: 'aid-ml-design', name: '머신러닝과디자인', nameEng: 'Machine Learning and Design', year: 2, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '머신러닝의 기초 원리를 이해하고 디자인 프로세스에 머신러닝 기술을 활용하는 방법을 학습합니다.', tags: ['창의', '전문'] },
    { id: 'aid-ux-ai', name: 'AI서비스UX디자인', nameEng: 'AI Service UX Design', year: 2, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: 'AI 기반 서비스의 사용자 경험을 설계하는 방법을 학습하고 AI 서비스 프로토타입을 제작합니다.', tags: ['소통', '창의', '전문'] },
    { id: 'aid-design-thinking', name: '디자인씽킹과AI', nameEng: 'Design Thinking and AI', year: 2, semester: 1, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '디자인 씽킹 방법론과 AI의 결합을 탐구하고 AI를 활용한 창의적 문제 해결 방법을 학습합니다.', tags: ['인문', '소통', '창의'] },
    { id: 'aid-generative-design', name: '제너레이티브디자인', nameEng: 'Generative Design', year: 2, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '알고리즘과 AI를 활용하여 자동으로 다양한 디자인 대안을 생성하고 최적화하는 제너레이티브 디자인을 학습합니다.', tags: ['창의', '전문'] },
    // 2학년 2학기
    { id: 'aid-computer-vision', name: '컴퓨터비전과이미지디자인', nameEng: 'Computer Vision and Image Design', year: 2, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '컴퓨터 비전 기술의 원리를 이해하고 이를 활용한 이미지 생성과 조작, 인식 기반 디자인을 실습합니다.', tags: ['창의', '전문'] },
    { id: 'aid-nlp-design', name: '자연어처리와콘텐츠디자인', nameEng: 'NLP and Content Design', year: 2, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '자연어 처리(NLP) 기술을 이해하고 텍스트 기반 콘텐츠 생성과 챗봇 등 대화형 AI 서비스 디자인을 학습합니다.', tags: ['소통', '창의', '전문'] },
    { id: 'aid-ethical-ai', name: 'AI윤리와책임디자인', nameEng: 'AI Ethics and Responsible Design', year: 2, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: 'AI 기술의 윤리적 문제와 편견, 프라이버시 등의 이슈를 이해하고 책임 있는 AI 디자인 원칙을 탐구합니다.', tags: ['인문', '소통', '글로벌'] },
    { id: 'aid-interactive', name: '인터랙티브AI디자인', nameEng: 'Interactive AI Design', year: 2, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: 'AI와 사용자가 상호작용하는 인터랙티브 경험을 설계하고 프로토타입을 제작합니다.', tags: ['소통', '창의', '전문'] },
    // 3학년 1학기
    { id: 'aid-studio1', name: 'AI디자인스튜디오I', nameEng: 'AI Design Studio I', year: 3, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: 'AI 기술을 활용한 창의적 디자인 프로젝트를 자율적으로 기획하고 실행하는 스튜디오 수업입니다.', tags: ['창의', '전문'] },
    { id: 'aid-xr-design', name: 'XR디자인', nameEng: 'XR Design (AR/VR/MR)', year: 3, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '증강현실(AR), 가상현실(VR), 혼합현실(MR) 기술을 활용한 확장현실 콘텐츠 디자인을 학습합니다.', tags: ['창의', '전문'] },
    { id: 'aid-ai-product', name: 'AI프로덕트디자인', nameEng: 'AI Product Design', year: 3, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: 'AI 기능을 탑재한 제품의 사용자 경험과 인터페이스를 디자인하는 방법을 학습합니다.', tags: ['소통', '창의', '전문'] },
    // 3학년 2학기
    { id: 'aid-studio2', name: 'AI디자인스튜디오II', nameEng: 'AI Design Studio II', year: 3, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: 'AI디자인스튜디오I을 심화하여 사회적·산업적 맥락에서의 AI 기반 디자인 프로젝트를 진행합니다.', tags: ['창의', '전문'] },
    { id: 'aid-future-design', name: '미래디자인과AI', nameEng: 'Future Design and AI', year: 3, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: 'AI 기술의 발전이 디자인의 미래에 미치는 영향을 탐구하고 미래 디자인 트렌드를 분석합니다.', tags: ['인문', '창의', '글로벌'] },
    { id: 'aid-ai-creativity', name: 'AI창작과예술', nameEng: 'AI Creativity and Art', year: 3, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: 'AI를 창작 도구로 활용하는 예술적 실험을 통해 AI 시대의 창의성과 표현의 경계를 탐구합니다.', tags: ['창의', '전문'] },
    // 3-4학년 공통
    { id: 'aid-portfolio', name: '포트폴리오와커리어', nameEng: 'Portfolio and Career', year: 3, yearMax: 4, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '졸업 후 진로를 탐색하고 취업과 창업을 위한 포트폴리오 제작과 커리어 계획을 수립합니다.', tags: ['인문', '소통', '글로벌', '전문'] },
    // 4학년
    { id: 'aid-capstone1', name: '졸업프로젝트I(캡스톤디자인)', nameEng: 'Graduation Project I (Capstone Design)', year: 4, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: true, prerequisite: null, description: '4년간의 학습을 종합하여 AI 기술을 활용한 졸업 디자인 프로젝트를 기획하고 개발을 시작합니다.', tags: ['인문', '소통', '창의', '전문'] },
    { id: 'aid-startup', name: 'AI디자인스타트업', nameEng: 'AI Design Startup', year: 4, semester: 1, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: 'AI 디자인 기반의 창업 방법론을 이해하고 스타트업 아이디어를 기획하는 방법을 학습합니다.', tags: ['소통', '창의'] },
    { id: 'aid-capstone2', name: '졸업프로젝트II(캡스톤디자인)', nameEng: 'Graduation Project II (Capstone Design)', year: 4, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: true, prerequisite: null, description: '졸업프로젝트I에 이어 프로젝트를 완성하고 졸업전시 및 발표를 진행합니다.', tags: ['인문', '소통', '창의', '전문'] },
    // 전학기
    { id: 'aid-seminar', name: '사제동행세미나', nameEng: 'Seminar in Special Topics', year: 1, yearMax: 4, semester: 0, category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '교수-학생간의 대면관계를 통하여 학생의 지적호기심을 유발시키고 학생 상호간 관계를 활성화합니다.', tags: ['인문', '소통', '글로벌', '창의', '전문'], note: 'P/N 필수' },
  ]
};

export default aiDesign;
