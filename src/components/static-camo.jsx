"use client";

const baseWidth = 1920;
const baseHeight = 1080;
const colors = ["#000000", "#0A0A0A", "#141414", "#1E1E1E"];
const textColors = ["#000000", "#0A0A0A", "#141414", "#1E1E1E", "#282828", "#323232"];

const generateStaticCamo = () => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", baseWidth.toString());
  svg.setAttribute("height", baseHeight.toString());
  svg.setAttribute("viewBox", `0 0 ${baseWidth} ${baseHeight}`);

  // Define the blur filter
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
  filter.setAttribute("id", "softEdge");
  const gaussianBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
  gaussianBlur.setAttribute("stdDeviation", "2");
  filter.appendChild(gaussianBlur);
  defs.appendChild(filter);
  svg.appendChild(defs);

  // Create shapes
  const shapesCount = 200;
  for (let i = 0; i < shapesCount; i++) {
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const points = [];

    for (let j = 0; j < 6; j++) {
      const x = Math.random() * baseWidth;
      const y = Math.random() * baseHeight;
      points.push(`${x},${y}`);
    }

    polygon.setAttribute("points", points.join(" "));
    polygon.setAttribute("fill", colors[Math.floor(Math.random() * colors.length)]);
    polygon.setAttribute("filter", "url(#softEdge)");
    svg.appendChild(polygon);
  }

  // Create text
  const textCount = 100;
  for (let i = 0; i < textCount; i++) {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const x = Math.random() * baseWidth;
    const y = Math.random() * baseHeight;
    const fontSize = Math.floor(Math.random() * 40) + 10;
    const rotation = Math.random() * 360;

    text.setAttribute("x", x.toString());
    text.setAttribute("y", y.toString());
    text.setAttribute("font-family", "Arial, sans-serif");
    text.setAttribute("font-size", `${fontSize}px`);
    text.setAttribute("fill", textColors[Math.floor(Math.random() * textColors.length)]);
    text.setAttribute("transform", `rotate(${rotation} ${x} ${y})`);
    text.textContent = "anything";

    svg.appendChild(text);
  }

  return svg.outerHTML;
};

// Generate the SVG markup once, which will stay the same on every render.
const STATIC_CAMO_SVG = generateStaticCamo();

export default function StaticBlackCamo() {
  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden bg-black"
      dangerouslySetInnerHTML={{ __html: STATIC_CAMO_SVG }}
      aria-label="Black camouflage background with multiple instances of the word 'anything' in various sizes and positions"
    ></div>
  );
}
