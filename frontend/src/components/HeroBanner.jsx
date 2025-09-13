import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef } from "react"
import { Button } from "./ui/button";
import { useState } from "react";
import RotatingText from '@/components/RotatingText'

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
    <section className="relative h-[680px] w-full overflow-hidden">

      {/* Arka plan resmi */}
      <img
        src="src/assets/laptop_12.jpg"
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
          <RotatingText
            texts={['Hızlı', 'Güvenli', 'Hesaplı']}
            mainClassName="px-2 sm:px-2 md:px-3 bg-zinc-50 text-zinc-600 text-xl font-sans overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 35, stiffness: 300 }}
            rotationInterval={2000}
          />
        </div>
      )}
    </section>
  );
};

export default HeroBanner;
