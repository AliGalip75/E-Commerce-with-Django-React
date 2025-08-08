const CategoryScroller = ({ categories, scrollRef}) => {
  return (
    <div className="flex items-center w-3/5 md:w-9/10 py-4 h-32">
      <div
        ref={scrollRef}
        className="flex items-center overflow-x-auto gap-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="flex-shrink-0 text-center w-32 font-thin text-xl snap-start px-2 py-1"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryScroller;