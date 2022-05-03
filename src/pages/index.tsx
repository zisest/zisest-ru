import type { NextPage } from 'next'
import Head from 'next/head'
import { useReducer } from 'react'
import CanvasBox from '../components/CanvasBox'

const Home: NextPage = () => {
  const [animationsPaused, toggleAnimationsPaused] = useReducer((prev) => !prev, false)

  return (
    <div className="h-full">
      <Head>
        <title>Title</title>
        <meta name="description" content="Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full">
        <CanvasBox paused={animationsPaused} />
        <input
          type="checkbox"
          aria-label="Pause animations"
          checked={animationsPaused}
          onChange={toggleAnimationsPaused}
        />
      </main>
    </div>
  )
}

export default Home
