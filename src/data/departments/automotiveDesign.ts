// src/data/departments/automotiveDesign.ts
// 자동차·운송디자인학과 — 2025 국민대학교 기준

import type { Department } from '../../types'

const automotiveDesign: Department = {
  id: 'automotive-design',
  name: '자동차·운송디자인학과',
  shortName: '자동차운송디자인',
  nameEng: 'Automotive & Transportation Design',
  description:
    '국내 최고의 디자인교육과 자동차공학교육 인프라를 융합해 설립된 최초의 학과로, 실무와 이론을 겸비한 탁월한 교수진의 의해 미래 자동차 및 모빌리티 디자인 교육 및 연구를 위한 전반의 창의적, 혁신 주도적 관점에서 교육한다.',
  educationGoal:
    '자동차 디자인을 중심으로 이동 수단의 조형적 연구와 더불어 사용자 중심 모빌리티 디자인 발전 방향을 함께 고찰하는 전문화 된 디자인 연구 역량 및 교육을 제공하여 세계적 수준의 창의적 디자이너를 양성한다.',
  concentrationAreas: [
    { name: '이론', description: '산업디자인론, 자동차공학, 인간공학, CMF, 트렌드' },
    { name: '공통 창의력', description: '입체조형, Visual Communication, 드로잉' },
    { name: '디지털', description: '디지털드로잉, 디지털모델링, 영상프레젠테이션' },
    { name: '자동차 전문성', description: '자동차디자인, 인테리어디자인, 디자인스튜디오' },
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
    { id: 'at-101', name: '글쓰기', nameEng: 'Writing', year: 1, semester: 1, categoryType: '기초교양', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '', tags: [], note: '' },
    { id: 'at-102', name: 'College English I, II', nameEng: 'College English I, II', year: 1, semester: 1, categoryType: '기초교양', category: 'elective', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '', tags: [], note: '택1' },
    { id: 'at-103', name: '컴퓨터프로그래밍1', nameEng: 'Computer Programming 1', year: 1, semester: 1, categoryType: '기초교양', category: 'elective', credits: 3, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '', tags: [], note: '' },

    // ===== 1학년 1학기 — 전공선택 =====
    { id: 'at-104', name: 'S-TEAM Class', nameEng: 'S-TEAM Class', year: 1, semester: 1, categoryType: '전공선택', category: 'elective', credits: 1, theory: 1, practice: 0, isCapstone: false, isRequired: true, prerequisite: null, description: '신입생을 대상으로 대학 이해, 학부(과)에 대한 이해, 상담과 검사를 실시한다.', tags: ['인문소통', '글로벌', '창의융합', '전문'], note: '필수(P/N), 사제동행세미나와 택1' },
    { id: 'at-105', name: '디지털드로잉1', nameEng: 'Digital Drawing 1', year: 1, semester: 1, categoryType: '전공선택', category: 'required', credits: 2, theory: 0, practice: 4, isCapstone: false, isRequired: true, prerequisite: null, description: '3D그래픽 소프트웨어의 이용을 통해 디지털 표현기법을 익히고, 디자인 학습에 응용하는 경험을 얻는다.', tags: ['창의융합', '전문'], note: '필수', concentration: '디지털' },
    { id: 'at-106', name: '기초드로잉', nameEng: 'Basic Drawing', year: 1, semester: 1, categoryType: '전공선택', category: 'required', credits: 2, theory: 0, practice: 4, isCapstone: false, isRequired: true, prerequisite: null, description: '트랜드드로잉의 기초이론과 실습을 통해서 디자이너가 갖추어야 할 기본적인 드로잉 감각을 익히는 과목이다.', tags: ['창의융합', '전문'], note: '필수', concentration: '공통 창의력' },
    { id: 'at-107', name: '입체조형', nameEng: '3-Dimensional Design Practice', year: 1, semester: 1, categoryType: '전공선택', category: 'required', credits: 3, theory: 2, practice: 2, isCapstone: false, isRequired: true, prerequisite: null, description: '플라톤과 순수기하형태의 개념 적용을 통한 기초적인 3차원 조형기법 연습을 통해 자동차/이송기기 디자이너가 활용하는 3차원 입체 조형 훈련이 주가 되는 스튜디오 과목이다.', tags: ['창의융합', '전문'], note: '필수', concentration: '공통 창의력' },
    { id: 'at-108', name: '산업디자인론', nameEng: 'Industrial Design Studies', year: 1, semester: 1, categoryType: '전공선택', category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: true, prerequisite: null, description: '20세기의 디자인 발전의 근원이 된 산업혁명 이후 조형이론을 중심으로 근대 디자인의 개념과 원리, 발전과정 등을 역사적 관점에서 학습한다.', tags: ['인문소통'], note: '필수', concentration: '이론' },

    // ===== 1학년 2학기 — 기초교양 =====
    { id: 'at-109', name: 'English Conversation I, II (Advanced)', nameEng: 'English Conversation I, II (Advanced)', year: 1, semester: 2, categoryType: '기초교양', category: 'elective', credits: 2, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '', tags: [], note: '택1' },
    { id: 'at-110', name: '컴퓨터프로그래밍2', nameEng: 'Computer Programming 2', year: 1, semester: 2, categoryType: '기초교양', category: 'elective', credits: 3, theory: 2, practice: 1, isCapstone: false, isRequired: false, prerequisite: null, description: '', tags: [], note: '' },

    // ===== 1학년 2학기 — 전공선택 =====
    { id: 'at-111', name: '디지털모델링1', nameEng: 'Digital Modeling 1', year: 1, semester: 2, categoryType: '전공선택', category: 'required', credits: 2, theory: 0, practice: 4, isCapstone: false, isRequired: true, prerequisite: null, description: '디자이너의 발상을 효과적으로 발전 시킬 수 있는 수단으로서 강력한 3차원 컴퓨터 소프트웨어 중 하나인 「ALIAS」의 활용능력을 훈련하기 위한 과목이다.', tags: ['창의융합', '전문'], note: '필수', concentration: '디지털' },
    { id: 'at-112', name: '디지털드로잉2', nameEng: 'Digital Drawing 2', year: 1, semester: 2, categoryType: '전공선택', category: 'required', credits: 2, theory: 0, practice: 4, isCapstone: false, isRequired: true, prerequisite: null, description: '다양한 방법의 시각적 의사전달 기법을 위한 응용단계로써, 2차원 컴퓨터 소프트웨어 중 하나인 「얼리어스 스케치북 프로」의 활용법을 연습하는 스튜디오 과목이다.', tags: ['창의융합', '전문'], note: '필수', concentration: '디지털' },
    { id: 'at-113', name: '기초Visual Communication', nameEng: 'Freshmen Visual Communication', year: 1, semester: 2, categoryType: '전공선택', category: 'required', credits: 3, theory: 2, practice: 2, isCapstone: false, isRequired: true, prerequisite: null, description: '자동차/이송기기 디자인 아이디어의 시각적 전달 기법을 위한 기초단계로써, 2차원에서의 스케치 기법을 훈련하는 스튜디오 과목이다.', tags: ['창의융합', '전문'], note: '필수', concentration: '공통 창의력' },
    { id: 'at-114', name: '기초자동차운송디자인', nameEng: 'Freshmen Automotive & Transportation Design', year: 1, semester: 2, categoryType: '전공선택', category: 'required', credits: 3, theory: 2, practice: 2, isCapstone: false, isRequired: true, prerequisite: null, description: '다양한 종류의 위한 이송기기의 기본적인 디자인 개발과정을 익히기 위한 1학년의 스튜디오 과목으로, 1~2인승 2륜 및 3륜의 소형수레를 중심으로 다룬다.', tags: ['인문소통', '글로벌', '창의융합', '전문'], note: '필수', concentration: '자동차 전문성' },
    { id: 'at-115', name: '자동차공학기초', nameEng: 'Fundamentals of Automotive Engineering', year: 1, semester: 2, categoryType: '전공선택', category: 'required', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: true, prerequisite: null, description: '자동차의 기본원리를 이해하고 현재 개발되고 있는 최신 기술들에 대해 이해하도록 학습한다. 특히 자동차의 핵심인 엔진, 전기장치, 동력 전달장치, 조향, 현가장치 등 기술적인 내용을 관해 소개한다.', tags: ['전문'], note: '필수', concentration: '이론' },

    // ===== 2학년 1학기 =====
    { id: 'at-201', name: '인간과모빌리티', nameEng: 'Introduction of Automotive Design', year: 2, semester: 1, categoryType: '전공선택', category: 'required', credits: 3, theory: 3, practice: 0, isCapstone: false, isRequired: true, prerequisite: null, description: '인류의 역사에서 다양한 유형의 자동차와 이송기기의 출현과 발전의 과정을 연대기적 관점과 양산 방식의 관점, 그리고 전반의 패러다임의 변화 등의 관점에서 학습한다.', tags: ['전문'], note: '필수', concentration: '이론' },
    { id: 'at-202', name: 'Visual Communication1', nameEng: 'Visual Communication 1', year: 2, semester: 1, categoryType: '전공선택', category: 'required', credits: 3, theory: 2, practice: 2, isCapstone: false, isRequired: true, prerequisite: null, description: '디자이너의 발상을 제3자에게 보다 효과적으로 전달할 수 있는 수단으로써 개성적 표현 기법을 훈련하기 위한 스튜디오 과목이다.', tags: ['창의융합', '전문'], note: '필수', concentration: '공통 창의력' },
    { id: 'at-203', name: '디지털모델링2', nameEng: 'Digital Modeling 2', year: 2, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 2, practice: 2, isCapstone: false, isRequired: false, prerequisite: null, description: 'ALIAS의 활용 능력을 훈련하기 위한 과목이다. 디지털모델링1의 고급과정.', tags: ['창의융합', '전문'], note: '', concentration: '디지털' },
    { id: 'at-204', name: '자동차디자인', nameEng: 'Automotive Design', year: 2, semester: 1, categoryType: '전공선택', category: 'required', credits: 3, theory: 2, practice: 2, isCapstone: false, isRequired: true, prerequisite: null, description: '다양한 동력을 사용하는 고성능 승용차 혹은 스타일 중심의 스포츠카 디자인 과정을 실습하기 위한 스튜디오 과목이다.', tags: ['창의융합', '전문'], note: '필수', concentration: '자동차 전문성' },
    { id: 'at-205', name: '자동차인간공학디자인', nameEng: 'Automotive Ergonomics Design', year: 2, semester: 1, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '제품의 이미지를 좌우하는 브랜드 아이덴티티에 대하여 이해하며, 자동차 회사의 조형언어 및 브랜드 전략에 대하여 연구한다.', tags: ['전문'], note: '', concentration: '이론' },

    // ===== 2학년 2학기 =====
    { id: 'at-206', name: 'Visual Communication2', nameEng: 'Visual Communication 2', year: 2, semester: 2, categoryType: '전공선택', category: 'required', credits: 3, theory: 2, practice: 2, isCapstone: false, isRequired: true, prerequisite: null, description: '디자이너의 발상을 제3자에게 보다 효과적으로 전달할 수 있는 수단으로써의 복합적인 재료의 위한 시각적 표현 방법을 훈련하기 위한 스튜디오 과목이다.', tags: ['창의융합', '전문'], note: '필수', concentration: '공통 창의력' },
    { id: 'at-207', name: '고급디지털모델링1', nameEng: 'High Class Digital Modeling 1', year: 2, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 2, practice: 2, isCapstone: false, isRequired: false, prerequisite: null, description: 'ALIAS의 활용 능력을 훈련하기 위한 과목이다. 디지털모델링1, 2의 고급과정.', tags: ['창의융합', '전문'], note: '', concentration: '디지털' },
    { id: 'at-208', name: '인테리어디자인', nameEng: 'Interior Design', year: 2, semester: 2, categoryType: '전공선택', category: 'required', credits: 3, theory: 2, practice: 2, isCapstone: false, isRequired: true, prerequisite: null, description: '자동차 인테리어 디자인을 중심으로 이론과 실무 프로젝트를 통해 사용자 중심의 자동차 인테리어 디자인 개발 프로세스 전반을 이해하고 학습한다.', tags: ['창의융합', '전문'], note: '필수', concentration: '자동차 전문성' },
    { id: 'at-209', name: 'CMF', nameEng: 'CMF', year: 2, semester: 2, categoryType: '전공선택', category: 'required', credits: 3, theory: 2, practice: 2, isCapstone: false, isRequired: true, prerequisite: null, description: '차량을 비롯한 다양한 이송기기의 내/외장 부품에 사용되는 다양한 재료의 물리적 특성과 심리적 효과 등을 폭넓게 익혀서 디자인 개발에 활용하는 것을 목표로 하는 과목이다.', tags: ['창의융합', '전문'], note: '필수', concentration: '이론' },
    { id: 'at-210', name: '자동차디자인트렌드', nameEng: 'Automotive Design Trend', year: 2, semester: 2, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '자동차산업에서의 양산방식의 거시적 변화를 관광하고, 각각의 양산방식에 의해 나타나는 디자인 특징과 그로 인한 경쟁환경의 변화를 이해해보고, 그것을 통해 향후의 자동차디자인의 발전 방향에 대한 의사를 얻는다.', tags: ['인문소통', '글로벌'], note: '', concentration: '이론' },

    // ===== 3학년 1학기 =====
    { id: 'at-301', name: 'Visual Communication3', nameEng: 'Visual Communication 3', year: 3, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 2, practice: 2, isCapstone: false, isRequired: false, prerequisite: null, description: '디자이너의 발상을 제3자에게 보다 효과적으로 전달할 수 있는 수단으로써의 복합적인 재료의 위한 시각적 표현 방법을 훈련하기 위한 스튜디오 과목이다.', tags: ['창의융합', '전문'], note: '', concentration: '공통 창의력' },
    { id: 'at-302', name: '고급디지털모델링2', nameEng: 'High Class Digital Modeling 2', year: 3, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 2, practice: 2, isCapstone: false, isRequired: false, prerequisite: null, description: 'ALIAS의 활용 능력을 훈련하기 위한 과목이다.', tags: ['창의융합', '전문'], note: '', concentration: '디지털' },
    { id: 'at-303', name: '모빌리티솔루션디자인1:캡스톤디자인', nameEng: 'Mobility Solution Design 1: Capstone Design', year: 3, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: true, isRequired: false, prerequisite: null, description: '사용자 중심 모빌리티 솔루션 구현을 위한 디자인 접근법과 이동수단, 그리고 이를 뒷받침하는 시스템을 아우르는 모빌리티 솔루션에 관하여 집중적으로 다루어 사용자 중심 미래 이동수단에 대한 고찰을 통한 전공의 전문성을 함양한다.', tags: ['인문소통', '글로벌', '창의융합', '전문'], note: '캡스톤', concentration: '이론' },
    { id: 'at-304', name: '디자인스튜디오1:캡스톤디자인', nameEng: 'Design Studio 1: Capstone Design', year: 3, semester: 1, categoryType: '전공선택', category: 'elective', credits: 4, theory: 3, practice: 2, isCapstone: true, isRequired: false, prerequisite: null, description: '다양한 동력을 사용하는 고성능 승용차 혹은 스타일 중심의 스포츠카 디자인 과정을 실습하기 위한 스튜디오 과목이다.', tags: ['인문소통', '글로벌', '창의융합', '전문'], note: '캡스톤', concentration: '자동차 전문성' },
    { id: 'at-305', name: '영상프레젠테이션1', nameEng: 'Cinematic Presentation 1', year: 3, semester: 1, categoryType: '전공선택', category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, isRequired: false, prerequisite: null, description: '영상프로그램을 활용하여 최종디자인 결과물의 다양한 영상을 영상프로그램의 장점인 동적인 표현을 통하여 효율적으로 구현하는 기법에 대하여 실습하는 과목이다.', tags: ['창의융합', '전문'], note: '', concentration: '디지털' },

    // ===== 3학년 2학기 =====
    { id: 'at-306', name: 'Visual Communication4', nameEng: 'Visual Communication 4', year: 3, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 2, practice: 2, isCapstone: false, isRequired: false, prerequisite: null, description: '디자이너의 발상을 제3자에게 보다 효과적으로 전달할 수 있는 수단으로써의 복합적인 재료의 컴퓨터 소프트웨어의 위한 시각적 표현 방법을 훈련하기 위한 스튜디오 과목이다.', tags: ['창의융합', '전문'], note: '', concentration: '공통 창의력' },
    { id: 'at-307', name: '고급디지털모델링3', nameEng: 'High Class Digital Modeling 3', year: 3, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 2, practice: 2, isCapstone: false, isRequired: false, prerequisite: null, description: 'ALIAS의 활용 능력을 훈련하기 위한 과목이다. 이어드밴스드 디지털 모델링으로 나아가기 전 3년간의 모델링 테크닉을 정리한다.', tags: ['창의융합', '전문'], note: '', concentration: '디지털' },
    { id: 'at-308', name: '모빌리티솔루션디자인2:캡스톤디자인', nameEng: 'Mobility Solution Design 2: Capstone Design', year: 3, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 3, practice: 0, isCapstone: true, isRequired: false, prerequisite: null, description: '사용자 중심 모빌리티 솔루션 구현을 위한 디자인 접근법과 이동수단, 그리고 이를 뒷받침하는 시스템을 아우르는 모빌리티 솔루션에 관하여 집중적으로 다룬다.', tags: ['인문소통', '글로벌', '창의융합', '전문'], note: '캡스톤', concentration: '이론' },
    { id: 'at-309', name: '디자인스튜디오2:캡스톤디자인', nameEng: 'Design Studio 2: Capstone Design', year: 3, semester: 2, categoryType: '전공선택', category: 'elective', credits: 4, theory: 3, practice: 2, isCapstone: true, isRequired: false, prerequisite: null, description: '졸업작품을 위해 자유로운 발상에 의해 다양한 동력의 대중교통을 포함하는 미래지향적 차량이나 이송기의 디자인 과정을 실습하기 위한 스튜디오 과목이다.', tags: ['인문소통', '글로벌', '창의융합', '전문'], note: '캡스톤', concentration: '자동차 전문성' },
    { id: 'at-310', name: '영상프레젠테이션2', nameEng: 'Cinematic Presentation 2', year: 3, semester: 2, categoryType: '전공선택', category: 'elective', credits: 2, theory: 1, practice: 2, isCapstone: false, isRequired: false, prerequisite: null, description: '영상프레젠테이션1의 사화 과정으로, 1학기에 진행된 영상내용을 기반으로 디자인 결과물의 영상물 제작과 관련되어 프로그램의 숙련된 완성도를 고취시키는 과목이다.', tags: ['창의융합', '전문'], note: '', concentration: '디지털' },

    // ===== 4학년 1학기 =====
    { id: 'at-401', name: 'Advanced Visual Communication1', nameEng: 'Advanced Visual Communication 1', year: 4, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 2, practice: 2, isCapstone: false, isRequired: false, prerequisite: null, description: '스토리가 기반이 되는 디자이너의 발상을 복합적인 재료의 컴퓨터 소프트웨어의 사진 등 다양한 매체의 결합에 의해 졸업작품을 위한 시각적 이미지를 제작하기 위한 스튜디오 과목이다.', tags: ['창의융합', '전문'], note: '', concentration: '공통 창의력' },
    { id: 'at-402', name: '졸업작품연구1', nameEng: 'Thesis Study 1', year: 4, semester: 1, categoryType: '전공선택', category: 'required', credits: 5, theory: 3, practice: 3, isCapstone: false, isRequired: true, prerequisite: null, description: '자동차 외장 스타일링, 인테리어, 모빌리티 솔루션 디자인을 주제로 하여 미래 이동수단에서의 새로운 디자인 방향성을 제시하는 졸업작품의 준비하는 첫 학기 과정의 스튜디오 과목이다.', tags: ['인문소통', '글로벌', '창의융합', '전문'], note: '필수', concentration: '자동차 전문성' },
    { id: 'at-403', name: 'Advanced디지털모델링', nameEng: 'Advanced Digital Modeling', year: 4, semester: 1, categoryType: '전공선택', category: 'elective', credits: 3, theory: 2, practice: 2, isCapstone: false, isRequired: false, prerequisite: null, description: '3년간의 디지털 모델링 영역을 바탕으로 가장 높은 수준의 디지털 모델링 기법을 연마하며, 동시에 졸업 작품 준비 및 디지털 모델링 관련 분야로의 진로 모색과 함께 준비하는 작업이다.', tags: ['창의융합', '전문'], note: '', concentration: '디지털' },

    // ===== 4학년 2학기 =====
    { id: 'at-404', name: 'Advanced Visual Communication2', nameEng: 'Advanced Visual Communication 2', year: 4, semester: 2, categoryType: '전공선택', category: 'elective', credits: 3, theory: 2, practice: 2, isCapstone: false, isRequired: false, prerequisite: null, description: '이야기의 상상력을 바탕으로 다양한 영상이 결합되어 만들어지는 공간 속에 존재하는 이송수단과 사물, 그리고 인물 등의 모습이 표현하는 종합적인 이미지 작품을 통해 창의적 관점을 제시하는 능력을 기른다.', tags: ['창의융합', '전문'], note: '', concentration: '공통 창의력' },
    { id: 'at-405', name: '포트폴리오', nameEng: 'Portfolio', year: 4, semester: 2, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: false, prerequisite: null, description: '디자이너의 창의적인 결과물을 효과적이고 체계적으로 정리하여 제3자에게 제시할 수 있는 능력을 기른다.', tags: ['인문소통', '글로벌'], note: '', concentration: '이론' },
    { id: 'at-406', name: '졸업작품연구2', nameEng: 'Thesis Study 2', year: 4, semester: 2, categoryType: '전공선택', category: 'elective', credits: 5, theory: 3, practice: 3, isCapstone: false, isRequired: false, prerequisite: null, description: '1학기 영상내용을 기반으로 졸업을 위한 디자인 연구 결과물을 졸업작품으로 완성하는 스튜디오 작업이다.', tags: ['인문소통', '글로벌', '창의융합', '전문'], note: '', concentration: '자동차 전문성' },

    // ===== 1~4학년 공통 =====
    { id: 'at-500', name: '사제동행세미나', nameEng: 'Seminar in Special Topics', year: 1, semester: 1, categoryType: '전공선택', category: 'elective', credits: 2, theory: 2, practice: 0, isCapstone: false, isRequired: true, prerequisite: null, description: '교수-학생간의 대면관계를 통하여 학생의 지적 호기심을 유발시키고 학생 상호간 동료(선·후배) 관계를 활성화함을 목적으로 한다.', tags: ['인문소통', '글로벌', '창의융합', '전문'], note: '필수(P/N), 1~4학년 선택기, S-TEAM Class와 택1', availableYears: [1, 2, 3, 4] },
  ],
}

export default automotiveDesign
