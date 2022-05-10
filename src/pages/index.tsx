import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useReducer } from 'react'
import CanvasBox from '../components/CanvasBox'
import Projects from '../components/Projects'

import ArrowSvg from '../assets/arrow.svg'
import Icon from '../components/Icon'
import Link from 'next/link'
import Header from '../components/NavBar'
import CustomLink from '../components/CustomLink'

import { ProjectData } from '../types'

// for getStaticProps
import fs from 'fs'
import path from 'path'

export function getStaticProps () {
  const stringContents = fs.readFileSync(
    path.join(process.cwd(), 'content', 'projects.json'),
    'utf-8'
  )
  const seoDescription = fs.readFileSync(
    path.join(process.cwd(), 'content', 'description.txt'),
    'utf-8'
  )

  let projectsData: ProjectData[]
  try {
    projectsData = JSON.parse(stringContents)

    return {
      props: {
        projectsData,
        seoDescription,
      },
    }
  } catch (err) {
    console.error(err)
  }
}

interface PageProps {
  projectsData: ProjectData[]
  seoDescription: string
}

const Home: NextPage<PageProps> = ({ projectsData, seoDescription }) => {
  const [animationsPaused, toggleAnimationsPaused] = useReducer((prev) => !prev, false)

  return (
    <div className="bg-black">
      <Head>
        <title>Nikita Antonov — web developer</title>
        <meta name="description" content={seoDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute">
        <CanvasBox paused={animationsPaused} />
      </div>
      <Header />

      <main className="min-h-full tracking-wide">
        <section className="relative flex flex-col items-center gap-14 pt-48 pb-16 font-medium tracking-wider">
          <div>
            <h1 className="text-cornflower-100 text-5xl pb-2">Nikita Antonov</h1>
            <h2 className="text-zinc-600 text-5xl">web developer</h2>
          </div>
          <ArrowSvg className="text-cornflower-500" />
        </section>
        <div className="relative w-full flex flex-col items-center px-8 pb-8">
          <section className="max-w-2xl">
            <p className="text-zinc-300 max-w-2xl text-md py-2 text-justify font-sans">
              Hi! My name is Nikita and I&apos;m really into web development :) If you&apos;re here,
              you are either really interested in one of my projects (thanks!) or maybe considering
              interviewing me for a job position? If you wish to get in touch or check out my CV,
              see{' '}
              <CustomLink primary href="#contact_me">
                contacts
              </CustomLink>{' '}
              section.
            </p>
          </section>

          <section className="max-w-2xl">
            <h3 id="about" className="text-cornflower-100 text-2xl font-bold pt-4 pb-3">
              About me
            </h3>
            <p className="text-zinc-300 max-w-2xl text-md py-2 text-justify">
              In 2020 I received a bachelor&apos;s degree in <em>Fundamental Informatics and IT</em>{' '}
              from the Saint-Petersburg State University. During my years at uni, I fell in love
              with web development and have loved it ever since. Although I enjoy outlining backend
              architecture, designing databases and handling logic on the server, front-end
              development is where my allegiancies lie :)
            </p>
            <p className="text-zinc-300 max-w-2xl text-md py-2 text-justify">
              Not so long ago, I&apos;ve decided to pursue front-end development as my full-time
              career. Bringing masterfully designed user experiences to life is <em>definitely</em>{' '}
              something I&apos;m passionate about! In the ever changing and evolving landscape that
              is front-end development, I&apos;ve mostly stuck to React, but have have worked with a
              variety of different technologies and tools. Some of them are listed below:
            </p>
            <div className="text-cornflower-500 font-mono grid grid-cols-[min-content_min-content] justify-around sm:grid-cols-4 text-md py-4">
              <ul className="p-4">
                <li>HTML</li>
                <li>CSS + SASS</li>
                <li>JS</li>
                <li>React</li>
                <li>Next.js</li>
                <li>Node.js</li>
                <li className="opacity-50">Typescript</li>
              </ul>
              <ul className="p-4">
                <li>Express</li>
                <li>PostgreSQL</li>
                <li>MongoDB</li>
                <li>docker</li>
                <li>nginx</li>
                <li className="opacity-50">Django</li>
              </ul>
              <ul className="p-4">
                <li>webpack</li>
                <li>git</li>
                <li>Jest</li>
                <li>Storybook</li>
                <li>CI/CD Tools</li>
                <li>Jira</li>
              </ul>
              <ul className="p-4">
                <li className="opacity-50">Python</li>
                <li className="opacity-50">C++</li>
              </ul>
            </div>
          </section>
          <section className="max-w-2xl">
            <h3 id="projects" className="text-cornflower-100 text-2xl font-bold pt-4 pb-3">
              Some projects of mine
            </h3>
            <p className="text-zinc-300 max-w-2xl text-md py-2 text-justify">
              I haven&apos;t taken on a large-scale project recently, and some of the things I code
              never see the light of day, but here are some of the things I&apos;ve built:
            </p>
            <Projects projectsData={projectsData} />
          </section>
          <section className="max-w-2xl">
            <h3 id="contact_me" className="text-cornflower-100 text-2xl font-bold pt-4 pb-3">
              Contact me
            </h3>
            <p className="text-zinc-300 max-w-2xl text-md py-2 text-justify">
              If you have any inquiries, the best way to reach me is either by e-mail (
              <CustomLink primary href="mailto:zisest@gmail.com">
                zisest@gmail.com
              </CustomLink>
              ) or by sending a Telegram message :)
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="https://github.com/zisest">
                <a>
                  <Icon type="github" alt="my GitHub page" />
                </a>
              </Link>
              <Link href="https://www.linkedin.com/in/nikita-antonov-7a142722b/">
                <a>
                  <Icon type="linked-in" alt="my LinkedIn profile" />
                </a>
              </Link>
              <Link href="https://t.me/zisest">
                <a>
                  <Icon type="telegram" alt="message me in Telegram" />
                </a>
              </Link>
              <Link href="mailto:zisest@gmail.com">
                <a>
                  <Icon type="mail" alt="contact me via e-mail" />
                </a>
              </Link>
            </div>
            <div className="flex gap-3 pt-2 justify-center">
              <Link href="/antonov-cv.pdf">
                <a>
                  <Icon type="cv" alt="cv pdf" />
                </a>
              </Link>
              <Link href="/antonov-cv-ru.pdf">
                <a>
                  <Icon type="cv-ru" alt="cv pdf (in Russian)" />
                </a>
              </Link>
            </div>
            <footer className="text-center text-md text-zinc-700 pt-5">
              Code of the page is available on{' '}
              <CustomLink href="https://github.com/zisest/zisest-ru">GitHub</CustomLink>
            </footer>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Home
