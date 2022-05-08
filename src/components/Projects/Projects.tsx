import { useReducer } from 'react'
import { ProjectData } from '../../types'
import CheckboxTag from '../CheckboxTag'
import ProjectCard from '../ProjectCard'

interface Props {
  projectsData: ProjectData[]
}

interface Filters {
  stale: boolean
  fresh: boolean
  lame: boolean
  cool: boolean
}
interface Action {
  name: 'stale' | 'fresh' | 'lame' | 'cool'
  value: boolean
}

function filterReducer (state: Filters, { name, value }: Action) {
  return { ...state, [name]: value }
}

function Projects ({ projectsData }: Props) {
  const [filters, dispatchFilters] = useReducer(filterReducer, {
    stale: true,
    fresh: true,
    lame: true,
    cool: true,
  })

  const showAll = Object.values(filters).every((v) => v)

  const filteredProjects = showAll
    ? projectsData
    : projectsData.filter(({ freshness, coolness }) => {
        const isFresh = freshness > 0.5
        const isCool = coolness > 0.5

        if (filters.fresh && isFresh) return true
        if (filters.stale && !isFresh) return true
        if (filters.cool && isCool) return true
        if (filters.lame && !isCool) return true

        return false
      })

  const projectCards = filteredProjects.length
    ? filteredProjects.map((project) => <ProjectCard key={project.name} {...project} />)
    : 'No projects match the criteria'

  return (
    <div className="pt-6 text-cornflower-100 w-full">
      <div className="border-b border-zinc-800 flex gap-1 py-2 items-center">
        <span className="pr-2">Filters</span>
        <CheckboxTag
          checked={filters.stale}
          color="brown"
          onChange={(value) => dispatchFilters({ name: 'stale', value })}
        >
          stale
        </CheckboxTag>
        <CheckboxTag
          checked={filters.fresh}
          color="green"
          onChange={(value) => dispatchFilters({ name: 'fresh', value })}
        >
          fresh
        </CheckboxTag>
        <CheckboxTag
          checked={filters.lame}
          color="yellow"
          onChange={(value) => dispatchFilters({ name: 'lame', value })}
        >
          lame
        </CheckboxTag>
        <CheckboxTag
          checked={filters.cool}
          color="blue"
          onChange={(value) => dispatchFilters({ name: 'cool', value })}
        >
          cool
        </CheckboxTag>
      </div>
      <div className="pt-6 flex flex-col items-center w-full">{projectCards}</div>
    </div>
  )
}

export default Projects
