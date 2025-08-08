import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef } from "react"
import { Button } from "./ui/button";

const HeroBanner = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return

      // Hide the container until the fonts are loaded
      containerRef.current.style.visibility = "visible"

      const { words } = splitText(
        containerRef.current.querySelector("h1")
      )

      // Animate the words in the h1
      animate(
        words,
        { opacity: [0, 1], x: [-20, 0] },
        {
          duration: 1,
          easing: "ease-out",
          delay: stagger(0.04),
        }
      );
    })
  }, [])

  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      
      {/* Background Image */}
      <img
        src="src/assets/ecommerce-banner.jpg" // Görsel yolunu değiştir
        alt="Hero"
        className="w-full h-full object-cover select-none"
      />
      {/* Overlay & Text */}
      <div ref={containerRef} className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-8 md:px-20">
        <h1 className="h1 text-3xl md:text-5xl font-bold text-white mb-4 select-none">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
        <p className="text-lg md:text-xl text-white mb-6 max-w-xl select-none">
          Morbi mattis lectus blandit augue scelerisque, a fermentum elit blandit.
        </p>
        <Button className="bg-white text-gray-900 hover:bg-gray-100 ">
          Keşfet
        </Button>
      </div>
      
    </section>
  );
};

export default HeroBanner;
