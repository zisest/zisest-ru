import Image from 'next/image'
import Link from 'next/link'
import { ProjectData } from '../../types'
import Icon from '../Icon'
import Meter from '../Meter'

function ProjectCard ({
  name,
  description,
  freshness,
  coolness,
  technologies,
  links,
  cover,
}: ProjectData) {
  return (
    <div className="flex flex-wrap gap-4 py-4 w-full sm:w-10/12">
      <div className="text-cornflower-100 w-full flex flex-col gap-2">
        {/* Info */}
        <h4 className="text-xl font-bold">{name}</h4>
        <div className="px-3 py-2 rounded-lg bg-zinc-900 max-w-2xl text-zinc-200">
          {description}
        </div>
        <div className="text-sm sm:text-base font-mono text-cornflower-500">
          {technologies.join(' - ')}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-between w-52 text-zinc-300">
            <Meter value={freshness} label="freshness" colorScheme="brown-green" />
            <Meter value={coolness} label="coolness" colorScheme="yellow-blue" />
          </div>
          <div className="flex gap-3 scale-75">
            {links.github && (
              <Link href={links.github}>
                <a target="_blank" rel="noreferrer">
                  <Icon type="github" />
                </a>
              </Link>
            )}
            {links.main && (
              <Link href={links.main}>
                <a target="_blank" rel="noreferrer">
                  <Icon type="link" />
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div
          style={{ backgroundImage: `url('${cover}')` }}
          className="bg-cover w-full sm:w-10/12 rounded aspect-video"
        ></div>
      </div>
    </div>
  )
}

export default ProjectCard
