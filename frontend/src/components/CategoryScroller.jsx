
// CategoryScroller.jsx
const CategoryScroller = ({ categories, scrollRef }) => {
  return (
    <div className="md:w-[80%] w-[60%] py-4">
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll gap-4 scroll-smooth snap-x snap-mandatory custom-scrollbar items-center"
      >
        {categories.map((cat) => (
          <div
            key={`cat-${cat.id}-${Math.random()}`}
            className="flex-shrink-0 text-center w-30 font-thin text-xl snap-start"
          >
            <p className="mt-1 cursor-pointer">{cat.name}</p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default CategoryScroller;
