import { memo, MutableRefObject, useDeferredValue, useEffect, useRef } from 'react'
import { useCanvas } from '../../hooks/use-canvas.hook'
import { useWindowResize } from '../../hooks/use-window-resize.hook'
import { HEIGHT } from './CanvasBox.constants'
import { getDotsCoordinates, drawDots, handleDrawing } from './CanvasBox.helpers'

interface Props {
  paused?: boolean
}

function CanvasBox ({ paused }: Props) {
  const { innerWidth } = useWindowResize()
  const width = useDeferredValue(Number(innerWidth))
  const height = HEIGHT

  const { canvasRef, canvasProps, ctx } = useCanvas(width, height)

  const animationRef = useRef<number>(null)

  useEffect(() => {
    const [dotsCoordinates, dotsDimensions] = getDotsCoordinates(width, height)

    if (ctx && width && height && dotsCoordinates && dotsDimensions) {
      if (!paused) handleDrawing(ctx, width, height, dotsCoordinates, dotsDimensions, animationRef)
      else drawDots(ctx, width, height, dotsCoordinates)
    }

    return () => {
      ctx?.clearRect(0, 0, width, height)
      if (animationRef.current != undefined) window.cancelAnimationFrame(animationRef.current)
    }
  }, [ctx, width, paused, height])

  return (
    <div className="bg-black relative overflow-hidden after:absolute after:inset-0 after:content-[''] after:bg-gradient-to-t after:to-transparent after:from-black">
      <canvas ref={canvasRef} {...canvasProps} className="inset-0" />
    </div>
  )
}

export default memo(CanvasBox)
