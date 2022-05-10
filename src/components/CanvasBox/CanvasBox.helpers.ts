import { MutableRefObject } from 'react'
import { clamp, normalize, randomInteger } from '../../utils'
import {
  CLEAR_RADIUS,
  FPS,
  INTERVAL,
  MAX_RADIUS,
  NEUTRAL_COLOR,
  PRIMARY_COLOR,
} from './CanvasBox.constants'

export interface DrawFunction {
  from: number
  to: number
  count?: number
  once?: boolean
  playedOnce?: boolean
  prevState?: any
  fn: (this: DrawFunction, elapsed: number, elapsedPercent: number) => void // elapsed is relative to (from, to)
}

export type DotsCoordinates = { x: number; y: number }[][]
export type DotsDimensions = { rows: number; cols: number }

function greetingCoordinates (dotsCoordinates: DotsCoordinates, dotsDimensions: DotsDimensions) {
  const TEXT = [
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1],
  ]

  const TEXT_HEIGHT = TEXT.length
  const TEXT_WIDTH = TEXT[0].length

  const MIN_X_OFFSET = 3
  const MIN_Y_OFFSET = 3

  const xOffset = Math.round(
    Math.max((dotsDimensions.cols - TEXT_WIDTH) / 2 - TEXT_WIDTH, MIN_X_OFFSET)
  )
  const yOffset = Math.round(Math.max((dotsDimensions.rows - TEXT_HEIGHT) * 0.15, MIN_Y_OFFSET))

  const coordinates = []

  for (let rowIndex = 0; rowIndex < TEXT.length; rowIndex++) {
    for (let colIndex = 0; colIndex < TEXT[rowIndex].length; colIndex++) {
      if (TEXT[rowIndex][colIndex]) {
        const coords = dotsCoordinates[rowIndex + yOffset]?.[colIndex + xOffset]
        if (coords) coordinates.push(coords)
      }
    }
  }

  return coordinates
}

export function getAnimations (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  dotsCoordinates: DotsCoordinates,
  dotsDimensions: DotsDimensions
) {
  function dotsFadeIn (from: number, to: number) {
    const drawFunction: DrawFunction = {
      from,
      to,
      fn (elapsed, elapsedPercent) {
        ctx.clearRect(0, 0, width, height)

        const getRadius = (
          row: number,
          maxRow: number,
          maxRadius: number,
          elapsedPercent: number
        ) => {
          let res
          res = (maxRow / row) * elapsedPercent ** 2 * maxRow * maxRadius
          return clamp(res, 0, maxRadius)
        }

        for (let rowNumber = 0; rowNumber < dotsDimensions.rows; rowNumber++) {
          for (const { x, y } of dotsCoordinates[rowNumber]) {
            ctx.beginPath()
            const radius = getRadius(rowNumber, dotsDimensions.rows - 1, MAX_RADIUS, elapsedPercent)
            ctx.arc(x, y, radius, 0, 2 * Math.PI)
            ctx.fillStyle = NEUTRAL_COLOR
            ctx.fill()
            ctx.closePath()
          }
        }
      },
    }

    return drawFunction
  }

  function displayGreeting (from: number, to: number) {
    const greeting = greetingCoordinates(dotsCoordinates, dotsDimensions)

    const drawFunction: DrawFunction = {
      from,
      to,
      fn (elapsed, elapsedPercent) {
        function draw () {
          greeting.forEach((coords) => {
            if (!coords) return

            const { x, y } = coords
            ctx.clearRect(x - CLEAR_RADIUS, y - CLEAR_RADIUS, CLEAR_RADIUS * 2, CLEAR_RADIUS * 2)
            ctx.beginPath()
            ctx.arc(x, y, MAX_RADIUS, 0, 2 * Math.PI)
            ctx.fillStyle = NEUTRAL_COLOR
            ctx.fill()
            ctx.closePath()

            ctx.beginPath()
            ctx.arc(x, y, MAX_RADIUS, 0, 2 * Math.PI)

            const show = normalize(elapsedPercent, 0, 0.3, 0, 1)
            const hide = normalize(elapsedPercent, 0.7, 1, 1, 0)

            const opacity = elapsedPercent < 0.3 ? show : elapsedPercent < 0.7 ? 1 : hide

            ctx.fillStyle = `rgb(${PRIMARY_COLOR} / ${opacity})`
            ctx.fill()
            ctx.closePath()
          })
        }

        draw()

        // if (this.count == undefined) this.count = -1
        // this.count++
        // if (this.count % 10 === 0) {
        //   draw()
        // }
      },
    }

    return drawFunction
  }

  function blinkingDots (from: number, to: number, duration: number = 20) {
    const drawFunction: DrawFunction = {
      from,
      to,
      fn () {
        const rowIndex = randomInteger(0, dotsDimensions.rows - 1)
        const colIndex = randomInteger(0, dotsDimensions.cols - 1)

        if (!dotsCoordinates || !dotsCoordinates[rowIndex]) return

        // prev
        let x: number, y: number, count: number
        if (this.prevState && this.prevState.count < duration) {
          x = this.prevState.x
          y = this.prevState.y
          count = ++this.prevState.count
        } else {
          ;({ x, y } = dotsCoordinates[rowIndex][colIndex])
          count = 0
          this.prevState = {
            x,
            y,
            count,
          }
        }

        ctx.clearRect(x - CLEAR_RADIUS, y - CLEAR_RADIUS, CLEAR_RADIUS * 2, CLEAR_RADIUS * 2)

        ctx.beginPath()
        ctx.arc(x, y, MAX_RADIUS, 0, 2 * Math.PI)
        ctx.fillStyle = NEUTRAL_COLOR
        ctx.fill()
        ctx.closePath()

        ctx.beginPath()
        ctx.arc(x, y, MAX_RADIUS, 0, 2 * Math.PI)
        const progress = count / duration
        const opacity = progress < 0.5 ? progress : 1 - progress
        ctx.fillStyle = `rgb(${PRIMARY_COLOR} / ${opacity})`
        ctx.fill()
        ctx.closePath()
      },
    }

    return drawFunction
  }

  return { dotsFadeIn, displayGreeting, blinkingDots }
}

export function getDotsCoordinates (
  width: number,
  height: number
): [DotsCoordinates, DotsDimensions] | [null, null] {
  if (!width || !height) return [null, null]

  const ROW_COUNT = Math.ceil(height / INTERVAL)
  const COL_COUNT = Math.ceil(width / INTERVAL)

  const coordinates: DotsCoordinates = []
  for (let rowIndex = 0; rowIndex < ROW_COUNT; ++rowIndex) {
    const row = []
    for (let colIndex = 0; colIndex < COL_COUNT; ++colIndex) {
      const x = colIndex * INTERVAL
      const y = rowIndex * INTERVAL
      row.push({ x, y })
    }
    coordinates.push(row)
  }

  return [coordinates, { rows: ROW_COUNT, cols: COL_COUNT }]
}

export function handleDrawing (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  dotsCoordinates: DotsCoordinates,
  dotsDimensions: DotsDimensions,
  animationRef: MutableRefObject<number | null>
) {
  const Animations = getAnimations(context, width, height, dotsCoordinates, dotsDimensions)
  const drawFunctions: DrawFunction[] = [
    Animations.dotsFadeIn(0, 5000),
    Animations.displayGreeting(2000, 8000),
    Animations.blinkingDots(4000, Infinity, 30),
    Animations.blinkingDots(4500, Infinity, 30),
    Animations.blinkingDots(5000, Infinity, 30),
    Animations.blinkingDots(5500, Infinity, 30),
  ]

  console.log('handleDrawing')
  const fpsInterval = 1000 / FPS
  let lastDraw = Date.now()
  const startTime = lastDraw

  // clear everything

  function draw () {
    animationRef.current = requestAnimationFrame(draw)
    const now = Date.now()
    const elapsed = now - lastDraw

    console.log('draw', width)

    if (elapsed > fpsInterval) {
      lastDraw = now
      const elapsedFromStart = now - startTime

      let allAnimationsFinished = true
      drawFunctions.forEach((f) => {
        if (f.to > elapsedFromStart) allAnimationsFinished = false
        if (f.from > elapsedFromStart || f.to < elapsedFromStart) {
          return
        }
        f.fn(elapsedFromStart - f.from, (elapsedFromStart - f.from) / (f.to - f.from))
      })

      if (allAnimationsFinished) cancelAnimationFrame(animationRef.current)
    }
  }

  draw()
}

export function drawDots (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  dotsCoordinates: DotsCoordinates
) {
  context.clearRect(0, 0, width, height)
  for (const row of dotsCoordinates) {
    for (const { x, y } of row) {
      context.beginPath()
      context.arc(x, y, MAX_RADIUS, 0, 2 * Math.PI)
      context.fillStyle = NEUTRAL_COLOR
      context.fill()
      context.closePath()
    }
  }
}
