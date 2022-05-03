import { memo, useDeferredValue, useEffect, useRef } from 'react'
import { useCanvas } from '../../hooks/use-canvas.hook'
import { useWindowResize } from '../../hooks/use-window-resize.hook'
import { getDotsCoordinates, drawDots, handleDrawing } from './CanvasBox.helpers'

interface Props {
  paused?: boolean
}

function CanvasBox ({ paused }: Props) {
  const { innerWidth, innerHeight } = useWindowResize()
  const width = useDeferredValue(Number(innerWidth))
  const height = useDeferredValue(Number(innerHeight) / 2)

  console.log('CanvasBox re-renders')

  const { canvasRef, canvasProps, canvasBox, ctx } = useCanvas(width, height)

  const animationRef = useRef<number>(null)

  useEffect(() => {
    const [dotsCoordinates, dotsDimensions] = getDotsCoordinates(width, height)

    if (ctx && canvasBox && dotsCoordinates && dotsDimensions) {
      if (!paused) handleDrawing(ctx, width, height, dotsCoordinates, dotsDimensions, animationRef)
      else drawDots(ctx, width, height, dotsCoordinates)
    }

    return () => {
      ctx?.clearRect(0, 0, canvasBox?.width ?? 0, canvasBox?.height ?? 0)
      if (animationRef.current != undefined) window.cancelAnimationFrame(animationRef.current)
    }
  }, [ctx, canvasBox, width, height, paused])

  return (
    <div className="bg-black relative overflow-hidden after:absolute after:inset-0 after:content-[''] after:bg-gradient-to-t after:to-transparent after:from-black">
      <canvas ref={canvasRef} {...canvasProps} className="inset-0" />
    </div>
  )
}

export default memo(CanvasBox)
