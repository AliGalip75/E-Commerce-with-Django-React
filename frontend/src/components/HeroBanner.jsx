import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef } from "react"
import { Button } from "./ui/button";
import { useState } from "react";

const HeroBanner = () => {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return

    // Başlık ve paragrafı seç
    const h1 = containerRef.current.querySelector("h1")
    const p = containerRef.current.querySelector("p")

    if (!h1 || !p) return

    // Split text
    const { words: titleWords } = splitText(h1)
    const { words: subWords } = splitText(p)

    // Animate h1
    animate(
      titleWords,
      { opacity: [0, 1], x: [-20, 0] },
      {
        duration: 1.5,
        easing: "ease-out",
        delay: stagger(0.04),
      }
    )

    // Animate paragraph
    animate(
      subWords,
      { opacity: [0, 1], x: [-10, 0] },
      {
        duration: 1,
        easing: "ease-out",
        delay: stagger(0.03, { start: 0.5 }), // biraz geç başlasın
      }
    )
  }, [])

  return (
    <section className="relative h-[600px] w-full overflow-hidden">

      {/* Arka plan resmi */}
      <img
        src="src/assets/kaisa2.jpg"
        alt="Hero"
        className={`w-full h-full object-cover select-none transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)} // resim yüklenince tetiklenir
      />

      {/* Overlay & Text (sadece yüklendiyse göster) */}
      {loaded && (
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-8 md:px-20">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 select-none">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h1>
          <p className="text-lg md:text-xl text-white mb-6 max-w-xl select-none">
            Morbi mattis lectus blandit augue scelerisque, a fermentum elit
            blandit.
          </p>
          <Button className="bg-white text-gray-900 hover:bg-gray-100 w-40 h-10 text-base">
            Keşfet
          </Button>
        </div>
      )}
    </section>
  );
};

export default HeroBanner;
