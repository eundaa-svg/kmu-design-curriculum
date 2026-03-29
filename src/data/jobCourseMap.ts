export interface DesignJob {
  id: string
  name: string
  icon: string
  description: string
}

export interface JobCourseMapping {
  jobId: string
  courseId: string
  relevance: 'core' | 'related'
}

export const designJobs: DesignJob[] = [
  { id: 'graphic', name: '그래픽 디자이너', icon: '', description: '인쇄물, 포스터, 편집물 등 시각 매체 디자인' },
  { id: 'web', name: '웹 디자이너', icon: '', description: '웹사이트 및 웹 서비스 인터페이스 디자인' },
  { id: 'ux', name: 'UX 디자이너', icon: '', description: '사용자 경험 설계 및 리서치 기반 디자인' },
  { id: 'ui-gui', name: 'UI·GUI 디자이너', icon: '', description: '사용자 인터페이스 및 화면 설계' },
  { id: 'product', name: '제품 디자이너', icon: '', description: '산업 제품의 외관과 사용성 설계' },
  { id: 'motion', name: '영상·모션 디자이너', icon: '', description: '모션그래픽, 영상 콘텐츠 제작' },
  { id: 'content', name: '콘텐츠 디자이너', icon: '', description: '브랜드 콘텐츠 기획 및 제작' },
  { id: 'mobile', name: '모바일 디자이너', icon: '', description: '모바일 앱 UI/UX 설계' },
  { id: 'bi-bx', name: 'BI·BX 디자이너', icon: '', description: '브랜드 아이덴티티 및 브랜드 경험 설계' },
  { id: 'publishing', name: '출판·편집 디자이너', icon: '', description: '책, 잡지, 카탈로그 등 출판물 편집 디자인' },
  { id: 'illustrator', name: '일러스트레이터', icon: '', description: '삽화, 캐릭터, 아트워크 제작' },
  { id: 'ad', name: '광고 디자이너', icon: '', description: '광고 캠페인 비주얼 기획 및 제작' },
  { id: '3d', name: '3D 디자이너', icon: '', description: '3D 모델링, 렌더링, 시각화' },
  { id: 'interior', name: '인테리어 디자이너', icon: '', description: '실내 공간 기획 및 디자인' },
  { id: 'package', name: '패키지 디자이너', icon: '', description: '제품 패키지 및 포장 디자인' },
  { id: 'fashion', name: '패션 디자이너', icon: '', description: '의류, 패션 컬렉션 기획 및 제작' },
  { id: 'space', name: '공간 디자이너', icon: '', description: '상업 공간, 전시 공간 기획 및 설계' },
  { id: '2d', name: '2D 디자이너', icon: '', description: '2D 그래픽, 일러스트, 텍스처 제작' },
  { id: 'industrial', name: '산업 디자이너', icon: '', description: '대량 생산 제품의 디자인 및 설계' },
  { id: 'ux-researcher', name: 'UX 리서처', icon: '', description: '사용자 조사, 데이터 분석 기반 인사이트 도출' },
  { id: 'character', name: '캐릭터 디자이너', icon: '', description: '캐릭터 개발, IP 디자인' },
  { id: 'fabric', name: '패브릭 디자이너', icon: '', description: '직물, 텍스타일 패턴 및 소재 디자인' },
  { id: 'furniture', name: '가구 디자이너', icon: '', description: '가구 제품 기획 및 디자인' },
]

export const jobCourseMappings: JobCourseMapping[] = [
  // ===== 그래픽 디자이너 =====
  { jobId: 'graphic', courseId: 'vd-106', relevance: 'core' },
  { jobId: 'graphic', courseId: 'vd-201', relevance: 'core' },
  { jobId: 'graphic', courseId: 'vd-206', relevance: 'core' },
  { jobId: 'graphic', courseId: 'vd-111', relevance: 'core' },
  { jobId: 'graphic', courseId: 'vd-203', relevance: 'related' },
  { jobId: 'graphic', courseId: 'vd-308', relevance: 'related' },
  { jobId: 'graphic', courseId: 'id-114', relevance: 'related' },
  { jobId: 'graphic', courseId: 'vd-105', relevance: 'related' },
  { jobId: 'graphic', courseId: 'vd-110', relevance: 'related' },

  // ===== 웹 디자이너 =====
  { jobId: 'web', courseId: 'vd-304', relevance: 'core' },
  { jobId: 'web', courseId: 'vd-311', relevance: 'core' },
  { jobId: 'web', courseId: 'id-302', relevance: 'related' },
  { jobId: 'web', courseId: 'id-310', relevance: 'core' },
  { jobId: 'web', courseId: 'ai-203', relevance: 'related' },
  { jobId: 'web', courseId: 'ai-208', relevance: 'related' },

  // ===== UX 디자이너 =====
  { jobId: 'ux', courseId: 'id-202', relevance: 'core' },
  { jobId: 'ux', courseId: 'id-302', relevance: 'core' },
  { jobId: 'ux', courseId: 'vd-304', relevance: 'core' },
  { jobId: 'ux', courseId: 'vd-311', relevance: 'core' },
  { jobId: 'ux', courseId: 'ai-203', relevance: 'core' },
  { jobId: 'ux', courseId: 'ai-208', relevance: 'core' },
  { jobId: 'ux', courseId: 'ai-204', relevance: 'related' },
  { jobId: 'ux', courseId: 'id-213', relevance: 'related' },

  // ===== UI·GUI 디자이너 =====
  { jobId: 'ui-gui', courseId: 'id-302', relevance: 'core' },
  { jobId: 'ui-gui', courseId: 'id-310', relevance: 'core' },
  { jobId: 'ui-gui', courseId: 'ai-203', relevance: 'core' },
  { jobId: 'ui-gui', courseId: 'ai-304', relevance: 'related' },
  { jobId: 'ui-gui', courseId: 'ai-208', relevance: 'related' },
  { jobId: 'ui-gui', courseId: 'ai-303', relevance: 'related' },
  { jobId: 'ui-gui', courseId: 'ai-310', relevance: 'related' },
  { jobId: 'ui-gui', courseId: 'ai-306', relevance: 'related' },

  // ===== 제품 디자이너 =====
  { jobId: 'product', courseId: 'id-201', relevance: 'core' },
  { jobId: 'product', courseId: 'id-208', relevance: 'core' },
  { jobId: 'product', courseId: 'id-301', relevance: 'core' },
  { jobId: 'product', courseId: 'id-303', relevance: 'core' },
  { jobId: 'product', courseId: 'id-113', relevance: 'core' },
  { jobId: 'product', courseId: 'id-209', relevance: 'related' },
  { jobId: 'product', courseId: 'id-206', relevance: 'related' },
  { jobId: 'product', courseId: 'id-202', relevance: 'related' },

  // ===== 영상·모션 디자이너 =====
  { jobId: 'motion', courseId: 'vd-209', relevance: 'core' },
  { jobId: 'motion', courseId: 'vd-305', relevance: 'core' },
  { jobId: 'motion', courseId: 'mi-105', relevance: 'core' },
  { jobId: 'motion', courseId: 'mi-304', relevance: 'core' },
  { jobId: 'motion', courseId: 'mi-308', relevance: 'core' },
  { jobId: 'motion', courseId: 'mi-209', relevance: 'core' },
  { jobId: 'motion', courseId: 'mi-206', relevance: 'related' },
  { jobId: 'motion', courseId: 'mi-305', relevance: 'core' },
  { jobId: 'motion', courseId: 'mi-306', relevance: 'related' },
  { jobId: 'motion', courseId: 'mi-311', relevance: 'related' },
  { jobId: 'motion', courseId: 'mi-202', relevance: 'related' },
  { jobId: 'motion', courseId: 'mi-204', relevance: 'related' },
  { jobId: 'motion', courseId: 'mi-211', relevance: 'related' },
  { jobId: 'motion', courseId: 'mi-112', relevance: 'related' },
  { jobId: 'motion', courseId: 'mi-111', relevance: 'related' },
  { jobId: 'motion', courseId: 'mi-106', relevance: 'related' },

  // ===== 콘텐츠 디자이너 =====
  { jobId: 'content', courseId: 'vd-310', relevance: 'core' },
  { jobId: 'content', courseId: 'vd-401', relevance: 'core' },
  { jobId: 'content', courseId: 'vd-208', relevance: 'related' },
  { jobId: 'content', courseId: 'mi-115', relevance: 'related' },
  { jobId: 'content', courseId: 'vd-313', relevance: 'related' },
  { jobId: 'content', courseId: 'vd-105', relevance: 'related' },
  { jobId: 'content', courseId: 'vd-110', relevance: 'related' },
  { jobId: 'content', courseId: 'vd-112', relevance: 'related' },
  { jobId: 'content', courseId: 'vd-204', relevance: 'related' },

  // ===== 모바일 디자이너 =====
  { jobId: 'mobile', courseId: 'id-310', relevance: 'core' },
  { jobId: 'mobile', courseId: 'ai-304', relevance: 'core' },
  { jobId: 'mobile', courseId: 'ai-203', relevance: 'core' },
  { jobId: 'mobile', courseId: 'id-302', relevance: 'related' },
  { jobId: 'mobile', courseId: 'ai-208', relevance: 'related' },
  { jobId: 'mobile', courseId: 'ai-303', relevance: 'related' },
  { jobId: 'mobile', courseId: 'ai-310', relevance: 'related' },

  // ===== BI·BX 디자이너 =====
  { jobId: 'bi-bx', courseId: 'vd-310', relevance: 'core' },
  { jobId: 'bi-bx', courseId: 'vd-401', relevance: 'core' },
  { jobId: 'bi-bx', courseId: 'vd-201', relevance: 'core' },
  { jobId: 'bi-bx', courseId: 'vd-309', relevance: 'related' },
  { jobId: 'bi-bx', courseId: 'vd-404', relevance: 'related' },

  { jobId: 'bi-bx', courseId: 'vd-206', relevance: 'related' },

  // ===== 출판·편집 디자이너 =====
  { jobId: 'publishing', courseId: 'vd-111', relevance: 'core' },
  { jobId: 'publishing', courseId: 'vd-203', relevance: 'core' },
  { jobId: 'publishing', courseId: 'vd-208', relevance: 'core' },
  { jobId: 'publishing', courseId: 'vd-303', relevance: 'related' },
  { jobId: 'publishing', courseId: 'vd-201', relevance: 'related' },

  // ===== 일러스트레이터 =====
  { jobId: 'illustrator', courseId: 'vd-306', relevance: 'core' },
  { jobId: 'illustrator', courseId: 'vd-312', relevance: 'core' },
  { jobId: 'illustrator', courseId: 'vd-107', relevance: 'core' },
  { jobId: 'illustrator', courseId: 'vd-308', relevance: 'related' },
  { jobId: 'illustrator', courseId: 'mi-207', relevance: 'related' },

  // ===== 광고 디자이너 =====
  { jobId: 'ad', courseId: 'vd-313', relevance: 'core' },
  { jobId: 'ad', courseId: 'vd-402', relevance: 'core' },
  { jobId: 'ad', courseId: 'vd-310', relevance: 'related' },
  { jobId: 'ad', courseId: 'vd-401', relevance: 'related' },
  { jobId: 'ad', courseId: 'mi-304', relevance: 'related' },
  { jobId: 'ad', courseId: 'id-205', relevance: 'related' },

  // ===== 3D 디자이너 =====
  { jobId: '3d', courseId: 'vd-110', relevance: 'core' },
  { jobId: '3d', courseId: 'mi-113', relevance: 'core' },
  { jobId: '3d', courseId: 'mi-201', relevance: 'core' },
  { jobId: '3d', courseId: 'mi-208', relevance: 'core' },
  { jobId: '3d', courseId: 'mi-301', relevance: 'related' },
  { jobId: '3d', courseId: 'mi-401', relevance: 'related' },
  { jobId: '3d', courseId: 'id-113', relevance: 'related' },
  { jobId: '3d', courseId: 'id-313', relevance: 'related' },
  { jobId: '3d', courseId: 'ai-311', relevance: 'related' },

  // ===== 인테리어 디자이너 =====
  { jobId: 'interior', courseId: 'sd-201', relevance: 'core' },
  { jobId: 'interior', courseId: 'sd-210', relevance: 'core' },
  { jobId: 'interior', courseId: 'sd-302', relevance: 'core' },
  { jobId: 'interior', courseId: 'sd-207', relevance: 'related' },
  { jobId: 'interior', courseId: 'sd-205', relevance: 'related' },
  { jobId: 'interior', courseId: 'sd-304', relevance: 'related' },

  // ===== 패키지 디자이너 =====
  { jobId: 'package', courseId: 'vd-201', relevance: 'core' },
  { jobId: 'package', courseId: 'vd-206', relevance: 'core' },
  { jobId: 'package', courseId: 'id-209', relevance: 'related' },
  { jobId: 'package', courseId: 'vd-111', relevance: 'related' },
  { jobId: 'package', courseId: 'id-206', relevance: 'related' },

  // ===== 패션 디자이너 =====
  { jobId: 'fashion', courseId: 'fd-206', relevance: 'core' },
  { jobId: 'fashion', courseId: 'fd-210', relevance: 'core' },
  { jobId: 'fashion', courseId: 'fd-305', relevance: 'core' },
  { jobId: 'fashion', courseId: 'fd-312', relevance: 'core' },
  { jobId: 'fashion', courseId: 'fd-201', relevance: 'related' },
  { jobId: 'fashion', courseId: 'fd-113', relevance: 'related' },
  { jobId: 'fashion', courseId: 'fd-208', relevance: 'related' },

  // ===== 공간 디자이너 =====
  { jobId: 'space', courseId: 'sd-113', relevance: 'core' },
  { jobId: 'space', courseId: 'sd-107', relevance: 'core' },
  { jobId: 'space', courseId: 'sd-108', relevance: 'core' },
  { jobId: 'space', courseId: 'sd-106', relevance: 'core' },
  { jobId: 'space', courseId: 'sd-109', relevance: 'core' },
  { jobId: 'space', courseId: 'sd-111', relevance: 'core' },
  { jobId: 'space', courseId: 'sd-110', relevance: 'related' },
  { jobId: 'space', courseId: 'sd-203', relevance: 'related' },
  { jobId: 'space', courseId: 'sd-302', relevance: 'related' },
  { jobId: 'space', courseId: 'sd-211', relevance: 'related' },
  { jobId: 'space', courseId: 'sd-213', relevance: 'related' },
  { jobId: 'space', courseId: 'sd-405', relevance: 'related' },
  { jobId: 'space', courseId: 'sd-310', relevance: 'related' },
  { jobId: 'space', courseId: 'sd-309', relevance: 'core' },
  { jobId: 'space', courseId: 'ai-207', relevance: 'related' },
  { jobId: 'space', courseId: 'ai-312', relevance: 'related' },

  // ===== 2D 디자이너 =====
  { jobId: '2d', courseId: 'vd-105', relevance: 'core' },
  { jobId: '2d', courseId: 'vd-201', relevance: 'core' },
  { jobId: '2d', courseId: 'vd-306', relevance: 'related' },
  { jobId: '2d', courseId: 'mi-108', relevance: 'related' },
  { jobId: '2d', courseId: 'vd-312', relevance: 'related' },

  // ===== 산업 디자이너 =====
  { jobId: 'industrial', courseId: 'id-201', relevance: 'core' },
  { jobId: 'industrial', courseId: 'id-208', relevance: 'core' },
  { jobId: 'industrial', courseId: 'id-301', relevance: 'core' },
  { jobId: 'industrial', courseId: 'id-209', relevance: 'core' },
  { jobId: 'industrial', courseId: 'id-212', relevance: 'related' },
  { jobId: 'industrial', courseId: 'id-304', relevance: 'related' },
  { jobId: 'industrial', courseId: 'id-305', relevance: 'related' },

  // ===== UX 리서처 =====
  { jobId: 'ux-researcher', courseId: 'id-202', relevance: 'core' },
  { jobId: 'ux-researcher', courseId: 'ai-204', relevance: 'core' },
  { jobId: 'ux-researcher', courseId: 'id-213', relevance: 'core' },
  { jobId: 'ux-researcher', courseId: 'vd-304', relevance: 'related' },
  { jobId: 'ux-researcher', courseId: 'ai-301', relevance: 'related' },
  { jobId: 'ux-researcher', courseId: 'cc-306', relevance: 'related' },

  // ===== 캐릭터 디자이너 =====
  { jobId: 'character', courseId: 'mi-207', relevance: 'core' },
  { jobId: 'character', courseId: 'mi-214', relevance: 'core' },
  { jobId: 'character', courseId: 'vd-306', relevance: 'related' },
  { jobId: 'character', courseId: 'mi-112', relevance: 'related' },
  { jobId: 'character', courseId: 'mi-305', relevance: 'related' },
  { jobId: 'character', courseId: 'id-214', relevance: 'related' },
  { jobId: 'character', courseId: 'mi-208', relevance: 'related' },

  // ===== 패브릭 디자이너 =====
  { jobId: 'fabric', courseId: 'fd-108', relevance: 'core' },
  { jobId: 'fabric', courseId: 'fd-204', relevance: 'core' },
  { jobId: 'fabric', courseId: 'fd-212', relevance: 'core' },
  { jobId: 'fabric', courseId: 'fd-306', relevance: 'core' },
  { jobId: 'fabric', courseId: 'fd-313', relevance: 'related' },

  // ===== 가구 디자이너 =====
  { jobId: 'furniture', courseId: 'sd-304', relevance: 'core' },
  { jobId: 'furniture', courseId: 'sd-307', relevance: 'core' },
  { jobId: 'furniture', courseId: 'id-307', relevance: 'core' },
  { jobId: 'furniture', courseId: 'sd-205', relevance: 'related' },
  { jobId: 'furniture', courseId: 'id-206', relevance: 'related' },
]

export function getJobsForCourse(courseId: string): { job: DesignJob; relevance: string }[] {
  return jobCourseMappings
    .filter((m) => m.courseId === courseId)
    .map((m) => ({
      job: designJobs.find((j) => j.id === m.jobId)!,
      relevance: m.relevance,
    }))
}
