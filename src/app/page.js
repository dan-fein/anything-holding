export default function Home() {
  return (
    <div className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <span
          key={i}
          className="absolute font-bold text-black"
          style={{
            color: `hsl(0, 0%, ${Math.random() * 10 + 5}%)`, // Darker shades
            fontSize: `${Math.random() * 3 + 1}rem`, // Varying sizes
            top: `${Math.random() * 200}vh`,
            left: `${Math.random() * 200}vw`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          Anything
        </span>
      ))}
    </div>
  );
}
