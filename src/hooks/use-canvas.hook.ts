import { useCallback, useReducer, useRef } from 'react'

interface CanvasState {
  canvas: HTMLCanvasElement | null
  ctx: CanvasRenderingContext2D | null
  canvasBox: DOMRect | null
}
interface Action {
  canvas: HTMLCanvasElement
  width: number
  height: number
}

const initialState = {
  canvas: null,
  ctx: null,
  canvasBox: null,
}

function reducer (state: CanvasState, action: Action): CanvasState {
  const { canvas, width, height } = action
  const ctx = canvas.getContext('2d')
  const canvasBox = canvas.getBoundingClientRect()

  if (width && height) fixPixelRatio(canvas, ctx, width, height)

  return { canvas, ctx, canvasBox }
}

function fixPixelRatio (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null,
  width: number,
  height: number
) {
  const pixelRatio = window.devicePixelRatio
  if (canvas && ctx && pixelRatio > 1) {
    canvas.width = width * pixelRatio
    canvas.height = height * pixelRatio
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'

    ctx.scale(pixelRatio, pixelRatio)
  }
}

export function useCanvas (width: number, height: number) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [{ canvasBox, ctx }, dispatch] = useReducer(reducer, initialState)

  const canvasProps = {
    width,
    height,
  }

  const setRef = useCallback(
    (node: HTMLCanvasElement | null) => {
      if (node) {
        dispatch({ canvas: node, width, height })
      }

      canvasRef.current = node
    },
    [width, height]
  )

  return {
    canvasRef: setRef,
    canvasElement: canvasRef.current,
    canvasProps,
    canvasBox,
    ctx,
  }
}
