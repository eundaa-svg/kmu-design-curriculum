import type { Department } from '../types'
import industrialDesign from './departments/industrialDesign'
import visualDesign from './departments/visualDesign'
import metalCraft from './departments/metalCraft'
import ceramicCraft from './departments/ceramicCraft'
import fashionDesign from './departments/fashionDesign'
import spatialDesign from './departments/spatialDesign'
import movingImageDesign from './departments/movingImageDesign'
import automotiveDesign from './departments/automotiveDesign'
import aiDesign from './departments/aiDesign'

const departments: Department[] = [
  industrialDesign,
  visualDesign,
  metalCraft,
  ceramicCraft,
  fashionDesign,
  spatialDesign,
  movingImageDesign,
  automotiveDesign,
  aiDesign,
]

export { departments }
export default departments

export function getDepartmentById(id: string): Department | undefined {
  return departments.find((d) => d.id === id)
}

export function getAllCourses() {
  return departments.flatMap((dept) =>
    dept.courses.map((course) => ({
      ...course,
      departmentId: dept.id,
      departmentName: dept.shortName,
    }))
  )
}
