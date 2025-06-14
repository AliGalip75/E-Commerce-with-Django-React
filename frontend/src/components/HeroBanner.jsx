const HeroBanner = () => {


  return (
    <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <img
        src="src/assets/kaisa2.jpg" // Görsel yolunu değiştir
        alt="Hero"
        className="w-full h-full object-cover"
      />

      {/* Overlay & Text */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-8 md:px-20">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Yaz Koleksiyonu Başladı</h1>
        <p className="text-lg md:text-xl text-white mb-6 max-w-xl">
          Şimdi keşfet, yeni sezon ürünleri kaçırma. %50’ye varan indirimlerle!
        </p>
        <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-100 transition">
          Alışverişe Başla
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
