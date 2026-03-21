export interface TransferRequirement {
  departmentId: string
  departmentName: string
  gpaRequirement: number
  requiredCourses: {
    description: string
    courses?: string[]
    selectCount?: number
  }[]
  selectionMethod: string
}

export const minorRequirements: TransferRequirement[] = [
  {
    departmentId: 'industrial-design',
    departmentName: '공업디자인학과',
    gpaRequirement: 3.5,
    requiredCourses: [
      { description: '총 평점평균 3.50 이상' },
    ],
    selectionMethod: '서류심사(학업계획서, 자기소개서) 및 면접(면접시 포트폴리오 지참)',
  },
  {
    departmentId: 'visual-design',
    departmentName: '시각디자인학과',
    gpaRequirement: 3.5,
    requiredCourses: [
      { description: '총 평점평균 3.50 이상' },
    ],
    selectionMethod: '서류심사(학업계획서, 자기소개서) 및 면접심사',
  },
  {
    departmentId: 'metal-craft',
    departmentName: '금속공예학과',
    gpaRequirement: 3.5,
    requiredCourses: [
      {
        description: '아래 과목 이수 필수',
        courses: ['기초금속공예(3학점)', '기초금속기법응용(3학점)', '재료와기법(3학점)'],
      },
      { description: '지원자 총 평점 평균 3.5 이상' },
    ],
    selectionMethod: '면접심사',
  },
  {
    departmentId: 'ceramic-craft',
    departmentName: '도자공예학과',
    gpaRequirement: 0,
    requiredCourses: [
      {
        description: '아래 3개 그룹 중 택 2 이수',
        courses: [
          '그룹1: 기초도자공예, 기초도자공예응용',
          '그룹2: 창의적방법을통한공예교수법 I, II',
          '그룹3: 조형연습 I, II',
        ],
        selectCount: 2,
      },
    ],
    selectionMethod: '면접',
  },
  {
    departmentId: 'fashion-design',
    departmentName: '의상디자인학과',
    gpaRequirement: 3.5,
    requiredCourses: [
      {
        description: '아래 5과목 중 2과목 이수',
        courses: ['패션드로잉II', '패션내러티브', '패션마켓리서치', '직물과편물', '서양복식사'],
        selectCount: 2,
      },
      { description: '총 평점 평균 3.5 이상' },
    ],
    selectionMethod: '면접',
  },
  {
    departmentId: 'spatial-design',
    departmentName: '공간디자인학과',
    gpaRequirement: 3.5,
    requiredCourses: [
      { description: '총 평점 평균 3.5 이상' },
    ],
    selectionMethod: '면접',
  },
  {
    departmentId: 'moving-image-design',
    departmentName: '영상디자인학과',
    gpaRequirement: 3.5,
    requiredCourses: [
      {
        description: '아래 과목 중 2과목 이상 이수 및 이수 과목 평균평점 3.5 이상',
        courses: [
          '기초비디오워크숍(2학점)',
          '스토리텔링연구(2학점)',
          '엔터테인먼트디자인I:레거시미디어-캡스톤디자인(3학점)',
        ],
        selectCount: 2,
      },
      { description: '지원자 총 평점 평균 3.5(B+) 이상' },
    ],
    selectionMethod: '서류심사(학업계획서, 자기소개서) 및 면접심사',
  },
  {
    departmentId: 'automotive-design',
    departmentName: '자동차·운송디자인학과',
    gpaRequirement: 3.5,
    requiredCourses: [
      {
        description: '아래 3개 과목 중 2개 과목 평점평균 3.5(B+) 이상',
        courses: ['기초자동차디자인스튜디오1', '기초비스컴1', '디지털모델링1'],
        selectCount: 2,
      },
      { description: '총 평점 평균 3.5(B+) 이상' },
    ],
    selectionMethod: '서류심사(학업계획서, 자기소개서) 및 면접심사',
  },
  {
    departmentId: 'ai-design',
    departmentName: 'AI디자인학과',
    gpaRequirement: 3.5,
    requiredCourses: [
      { description: '총 평점평균 3.5 이상' },
    ],
    selectionMethod: '서류심사(학업계획서, 자기소개서) 및 면접심사(포트폴리오 지참)',
  },
]

export const doubleMajorRequirements: TransferRequirement[] = [
  {
    departmentId: 'industrial-design',
    departmentName: '공업디자인학과',
    gpaRequirement: 3.5,
    requiredCourses: [
      {
        description: '아래 8과목 중 3과목 선이수',
        courses: [
          '산업디자인개론',
          '스케치와디자인목업',
          '디지털모델링',
          '디자인지식재산권',
          '디자인스토리텔링',
          '디자인과인간관점',
          '글로벌컬쳐리딩',
          '상품기획과마케팅',
        ],
        selectCount: 3,
      },
      { description: '총 평점평균 3.50 이상' },
    ],
    selectionMethod: '서류심사(학업계획서, 자기소개서) 및 면접(면접시 포트폴리오 지참)',
  },
  {
    departmentId: 'visual-design',
    departmentName: '시각디자인학과',
    gpaRequirement: 3.5,
    requiredCourses: [
      { description: '총 평점 평균 3.5 이상' },
    ],
    selectionMethod: '실기 및 면접',
  },
  {
    departmentId: 'metal-craft',
    departmentName: '금속공예학과',
    gpaRequirement: 3.5,
    requiredCourses: [
      {
        description: '아래 과목 이수 필수',
        courses: ['기초금속공예(3학점)', '기초금속기법응용(3학점)', '재료와기법(3학점)'],
      },
      { description: '총 평점 평균 3.5 이상' },
    ],
    selectionMethod: '면접심사',
  },
  {
    departmentId: 'ceramic-craft',
    departmentName: '도자공예학과',
    gpaRequirement: 3.5,
    requiredCourses: [
      {
        description: '아래 2개 그룹 중 택 2 이수',
        courses: [
          '그룹1: 기초도자공예, 기초도자공예응용',
          '그룹2: 조형연습 I, II',
        ],
        selectCount: 2,
      },
      { description: '총 평점 평균 3.5 이상' },
    ],
    selectionMethod: '면접',
  },
  {
    departmentId: 'fashion-design',
    departmentName: '의상디자인학과',
    gpaRequirement: 3.5,
    requiredCourses: [
      {
        description: '아래 5과목 중 2과목 이수',
        courses: ['패션드로잉II', '패션내러티브', '패션마켓리서치', '직물과편물', '서양복식사'],
        selectCount: 2,
      },
      { description: '총 평점 평균 3.5 이상' },
    ],
    selectionMethod: '면접(면접시 포트폴리오 지참) 및 실기 시험',
  },
  {
    departmentId: 'spatial-design',
    departmentName: '공간디자인학과',
    gpaRequirement: 3.5,
    requiredCourses: [
      { description: '총 평점평균 3.5 이상' },
    ],
    selectionMethod: '면접',
  },
  {
    departmentId: 'moving-image-design',
    departmentName: '영상디자인학과',
    gpaRequirement: 3.5,
    requiredCourses: [
      { description: '총 평점 평균 3.5 이상' },
      { description: '다전공 희망학과 교수와의 면담 진행' },
    ],
    selectionMethod: '면접(포트폴리오 지참)',
  },
  {
    departmentId: 'automotive-design',
    departmentName: '자동차·운송디자인학과',
    gpaRequirement: 3.5,
    requiredCourses: [
      { description: '총 평점평균 3.5 이상' },
    ],
    selectionMethod: '서류심사(학업계획서, 자기소개서) 및 면접심사',
  },
  {
    departmentId: 'ai-design',
    departmentName: 'AI디자인학과',
    gpaRequirement: 3.5,
    requiredCourses: [
      {
        description: '아래 선이수과목 이수 필수',
        courses: ['기초디자인1', '기초디자인2', '빅데이터와인공지능'],
      },
      { description: '총 평점평균 3.5 이상' },
    ],
    selectionMethod: '서류심사(학업계획서, 자기소개서) 및 면접심사(포트폴리오 지참)',
  },
]
