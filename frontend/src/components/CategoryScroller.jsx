import { useNavigate } from "react-router-dom";

const CategoryScroller = ({ categories, scrollRef }) => {

  const navigate = useNavigate();

  const handleCategoryClick = (cat_id) => {
    navigate("/products", { state : { id: cat_id, categories: categories }});
  }

  return (
    <div className="flex items-center w-3/5 md:w-9/10 py-4 h-32">
      <div
        ref={scrollRef}
        className="flex items-center overflow-x-auto gap-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {categories
          .filter((cat) => cat.parent === null)
          .map((cat) => (
            <button
              key={cat.id}
              className="flex-shrink-0 text-center w-32 font-thin text-xl snap-start px-2 py-1 cursor-pointer rounded-md transition-colors"
              onClick={() => handleCategoryClick(cat.id)}
              aria-label={`Kategori: ${cat.name}`}
            >
              {cat.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default CategoryScroller;