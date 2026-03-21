// @ts-nocheck
import type { Department } from '../../types';

const movingImage: Department = {
  id: 'moving-image',
  name: '영상디자인학과',
  shortName: '영상디자인',
  icon: '🎬',
  description: '영상 매체를 통해 창의적인 이야기와 시각적 경험을 전달하는 영상 디자인 전문가를 양성합니다.',
  educationGoal: '영상의 기획, 촬영, 편집, 후반 작업에 이르는 전 과정의 기술적 역량을 갖추고, 영상 예술의 미학적 원리를 이해하여 독창적인 영상 작품과 콘텐츠를 제작하는 능력을 배양합니다.',
  totalRequiredCredits: 130,
  courses: [
    // 1학년 1학기
    { id: 'mi-s-team', name: 'S-TEAM Class', nameEng: 'S-TEAM Class', year: 1, semester: 1, category: 'required', credits: 1, theory: 0, practice: 1, isCapstone: false, prerequisite: null, description: '신입생을 대상으로 대학 이해, 학부(과)에 대한 이해, 상담과 검사를 실시하며 강의 후반부에는 실제 교내 다양한 비교과 활동에 참여하는 수업으로 구성됩니다.', tags: ['인문', '소통', '글로벌', '창의', '전문'], note: 'P/N 필수' },
    { id: 'mi-intro', name: '영상디자인개론', nameEng: 'Introduction to Moving Image Design', year: 1, semester: 1, category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '영상 디자인의 개념과 역사, 다양한 영상 매체의 특성과 가능성을 이해합니다.', tags: ['인문', '소통'] },
    { id: 'mi-visual-design', name: '영상비주얼디자인', nameEng: 'Moving Image Visual Design', year: 1, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '영상 디자인의 기본 요소인 컬러, 타이포그래피, 구도 등을 학습하고 영상 비주얼 표현의 기초를 습득합니다.', tags: ['창의', '전문'] },
    { id: 'mi-drawing', name: '드로잉과스토리보드', nameEng: 'Drawing and Storyboard', year: 1, semester: 1, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '영상 기획을 위한 드로잉 기법과 스토리보드 작성 방법을 학습합니다.', tags: ['창의', '전문'] },
    // 1학년 2학기
    { id: 'mi-filming', name: '영상촬영기초', nameEng: 'Basic Cinematography', year: 1, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '카메라 조작, 구도, 조명 등 영상 촬영의 기초 기술을 학습하고 단편 영상을 제작합니다.', tags: ['창의', '전문'] },
    { id: 'mi-editing1', name: '영상편집I', nameEng: 'Video Editing I', year: 1, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '비선형 편집 소프트웨어를 활용한 영상 편집의 기초와 편집의 원리와 기법을 학습합니다.', tags: ['창의', '전문'] },
    { id: 'mi-film-history', name: '영화와영상예술사', nameEng: 'History of Film and Video Art', year: 1, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '영화와 영상 예술의 역사적 흐름을 이해하고 주요 작품과 움직임을 분석합니다.', tags: ['인문'] },
    // 2학년 1학기
    { id: 'mi-motion-graphics1', name: '모션그래픽스I', nameEng: 'Motion Graphics I', year: 2, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '모션 그래픽스의 원리와 제작 방법을 학습하고 타이틀, 로고 애니메이션 등을 제작합니다.', tags: ['창의', '전문'] },
    { id: 'mi-editing2', name: '영상편집II', nameEng: 'Video Editing II', year: 2, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '영상편집I을 심화하여 색보정, 사운드 편집, 특수 효과 등 고급 편집 기술을 학습합니다.', tags: ['창의', '전문'] },
    { id: 'mi-screenwriting', name: '스크린라이팅', nameEng: 'Screenwriting', year: 2, semester: 1, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '영상 콘텐츠를 위한 스크립트와 내러티브 구조를 학습하고 단편 시나리오를 작성합니다.', tags: ['인문', '소통', '창의'] },
    { id: 'mi-sound-design', name: '사운드디자인', nameEng: 'Sound Design', year: 2, semester: 1, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '영상에서의 사운드 역할을 이해하고 음악, 음향 효과, 보이스오버 등을 활용한 사운드 디자인을 학습합니다.', tags: ['창의', '전문'] },
    // 2학년 2학기
    { id: 'mi-motion-graphics2', name: '모션그래픽스II', nameEng: 'Motion Graphics II', year: 2, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '모션그래픽스I을 심화하여 방송 그래픽, 광고 영상 등 복잡한 모션 그래픽스 프로젝트를 진행합니다.', tags: ['창의', '전문'] },
    { id: 'mi-vfx', name: 'VFX와합성', nameEng: 'VFX and Compositing', year: 2, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '시각 효과(VFX) 제작 방법과 영상 합성 기술을 학습합니다.', tags: ['창의', '전문'] },
    { id: 'mi-documentary', name: '다큐멘터리제작', nameEng: 'Documentary Production', year: 2, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '다큐멘터리 영상 제작의 특성과 방법을 이해하고 실제 주제를 담은 다큐멘터리를 제작합니다.', tags: ['인문', '소통', '창의'] },
    { id: 'mi-digital-media', name: '디지털미디어콘텐츠', nameEng: 'Digital Media Content', year: 2, semester: 2, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '유튜브, SNS 등 디지털 플랫폼을 위한 영상 콘텐츠 기획과 제작 방법을 학습합니다.', tags: ['소통', '창의', '전문'] },
    // 3학년 1학기
    { id: 'mi-studio1', name: '영상디자인스튜디오I', nameEng: 'Moving Image Design Studio I', year: 3, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '개인적인 영상 작품 제작을 통해 창의적인 표현 능력을 기르는 스튜디오 수업입니다.', tags: ['창의', '전문'] },
    { id: 'mi-3d-animation', name: '3D애니메이션', nameEng: '3D Animation', year: 3, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '3D 모델링과 애니메이션 소프트웨어를 활용하여 3D 애니메이션 작품을 제작합니다.', tags: ['창의', '전문'] },
    { id: 'mi-commercial', name: '광고영상제작', nameEng: 'Commercial Video Production', year: 3, semester: 1, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: 'TV 광고, 인터넷 광고 등 상업 영상을 기획하고 제작하는 방법을 학습합니다.', tags: ['소통', '창의', '전문'] },
    // 3학년 2학기
    { id: 'mi-studio2', name: '영상디자인스튜디오II', nameEng: 'Moving Image Design Studio II', year: 3, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '영상디자인스튜디오I을 심화하여 사회적·예술적 맥락이 있는 영상 작품을 제작합니다.', tags: ['창의', '전문'] },
    { id: 'mi-interactive', name: '인터랙티브미디어', nameEng: 'Interactive Media', year: 3, semester: 2, category: 'elective', credits: 3, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '인터랙티브 영상 설치, 웹 기반 영상 등 상호작용적인 미디어 작품을 제작합니다.', tags: ['소통', '창의', '전문'] },
    { id: 'mi-video-theory', name: '영상이론과비평', nameEng: 'Video Theory and Criticism', year: 3, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '영상 이론과 비평적 관점을 이해하고 영상 작품을 분석하는 능력을 기릅니다.', tags: ['인문', '창의'] },
    // 3-4학년 공통
    { id: 'mi-portfolio', name: '포트폴리오와커리어', nameEng: 'Portfolio and Career', year: 3, yearMax: 4, semester: 2, category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '졸업 후 진로를 탐색하고 취업과 창업을 위한 포트폴리오 제작과 커리어 계획을 수립합니다.', tags: ['인문', '소통', '글로벌', '전문'] },
    // 4학년
    { id: 'mi-capstone1', name: '졸업작품I(캡스톤디자인)', nameEng: 'Graduation Work I (Capstone Design)', year: 4, semester: 1, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: true, prerequisite: null, description: '4년간의 학습을 종합하여 졸업 작품의 컨셉을 설정하고 제작을 시작합니다.', tags: ['인문', '소통', '창의', '전문'] },
    { id: 'mi-festival', name: '영상제기획', nameEng: 'Film Festival Planning', year: 4, semester: 1, category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, prerequisite: null, description: '영상제와 전시의 기획 방법을 이해하고 졸업 작품 상영회를 위한 기획을 수립합니다.', tags: ['소통', '창의'] },
    { id: 'mi-capstone2', name: '졸업작품II(캡스톤디자인)', nameEng: 'Graduation Work II (Capstone Design)', year: 4, semester: 2, category: 'required', credits: 3, theory: 1, practice: 2, isCapstone: true, prerequisite: null, description: '졸업작품I에 이어 작품을 완성하고 졸업전시 및 상영회를 개최합니다.', tags: ['인문', '소통', '창의', '전문'] },
    // 전학기
    { id: 'mi-seminar', name: '사제동행세미나', nameEng: 'Seminar in Special Topics', year: 1, yearMax: 4, semester: 0, category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, prerequisite: null, description: '교수-학생간의 대면관계를 통하여 학생의 지적호기심을 유발시키고 학생 상호간 관계를 활성화합니다.', tags: ['인문', '소통', '글로벌', '창의', '전문'], note: 'P/N 필수' },
  ]
};

export default movingImage;
