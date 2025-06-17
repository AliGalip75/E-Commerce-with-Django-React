const HeroBanner = () => {


  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      
      {/* Background Image */}
      <img
        src="src/assets/yasıo-1.jpg" // Görsel yolunu değiştir
        alt="Hero"
        className="w-full h-full object-cover select-none"
      />
      {/* Overlay & Text */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-8 md:px-20">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 select-none">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
        <p className="text-lg md:text-xl text-white mb-6 max-w-xl select-none">
          Morbi mattis lectus blandit augue scelerisque, a fermentum elit blandit.
        </p>
        <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-100 transition select-none">
          Neque
        </button>
      </div>
      
    </section>
  );
};

export default HeroBanner;
