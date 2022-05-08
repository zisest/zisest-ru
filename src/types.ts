export interface ProjectData {
  name: string
  description: string
  freshness: number
  coolness: number
  technologies: string[]
  links: {
    main?: string
    github?: string
  }
  cover: string
}
