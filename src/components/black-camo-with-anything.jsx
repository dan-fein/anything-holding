'use client'

import { useEffect, useRef } from 'react'

export function BlackCamoWithAnything() {
  const svgRef = useRef(null)

  useEffect(() => {
    const generateCamo = () => {
      if (!svgRef.current) return

      const svg = svgRef.current
      const width = window.innerWidth
      const height = window.innerHeight

      svg.setAttribute('width', width.toString())
      svg.setAttribute('height', height.toString())
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`)

      // Clear existing content
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild)
      }

      // Define the blur filter
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
      const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
      filter.setAttribute('id', 'softEdge')
      const gaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
      gaussianBlur.setAttribute('stdDeviation', '2')
      filter.appendChild(gaussianBlur)
      defs.appendChild(filter)
      svg.appendChild(defs)

      const colors = ['#000000', '#0A0A0A', '#141414', '#1E1E1E']
      const shapes = 200

      for (let i = 0; i < shapes; i++) {
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
        const points = []

        for (let j = 0; j < 6; j++) {
          const x = Math.random() * width
          const y = Math.random() * height
          points.push(`${x},${y}`)
        }

        polygon.setAttribute('points', points.join(' '))
        polygon.setAttribute('fill', colors[Math.floor(Math.random() * colors.length)])
        polygon.setAttribute('filter', 'url(#softEdge)') // Apply the blur filter
        svg.appendChild(polygon)
      }

      // Add "anything" text multiple times
      const textColors = ['#000000', '#0A0A0A', '#141414', '#1E1E1E', '#282828', '#323232']
      const textCount = 200 // Number of "anything" instances

      for (let i = 0; i < textCount; i++) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        const x = Math.random() * width
        const y = Math.random() * height
        const fontSize = Math.floor(Math.random() * 40) + 10 // Random font size between 10 and 50
        const rotation = Math.random() * 360 // Random rotation

        text.setAttribute('x', x.toString())
        text.setAttribute('y', y.toString())
        text.setAttribute('font-family', 'Arial, sans-serif')
        text.setAttribute('font-size', `${fontSize}px`)
        text.setAttribute('fill', textColors[Math.floor(Math.random() * textColors.length)])
        text.setAttribute('transform', `rotate(${rotation} ${x} ${y})`)
        text.textContent = 'anything'

        svg.appendChild(text)
      }
    }

    generateCamo()
    window.addEventListener('resize', generateCamo)

    return () => {
      window.removeEventListener('resize', generateCamo)
    };
  }, [])

  return (
    (<div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black">
      <svg
        ref={svgRef}
        className="w-full h-full"
        aria-label="Black camouflage background with multiple instances of the word 'anything' in various sizes and positions"></svg>
    </div>)
  );
}