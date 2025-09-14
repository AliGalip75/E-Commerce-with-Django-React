import { useState, useEffect } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FilterIcon,
  SearchIcon,
  HomeIcon,
  FolderOpenIcon,
} from "lucide-react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import ProductCard from "@/components/ProductCard";
import { ProductService } from "@/services/ProductService";
import useAxios from "@/hooks/useAxios";

const ProductsPage = ({}) => {
  const axios = useAxios();
  const { state } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams({});
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [products, setProducts] = useState([]);

  // URL'den kategori ID'sini al
  const currentCategoryId = searchParams.get("category");

  // Başlangıçta kategori ID'yi belirle (öncelik state.id'de)
  const initialCategoryId = state?.id || currentCategoryId;

  const [categories, setCategories] = useState([]);

  // Seçili kategori bilgisini URL'den al
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategoryId ? parseInt(initialCategoryId) : null
  );

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await ProductService.getProducts(axios, {
        category: selectedCategory,
        search: searchTerm,
      });
      console.log("Ürünler için istek atılıyor:", {
        category: selectedCategory,
        search: searchTerm,
      });
      console.log("Backend cevabı:", data);
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm]);

  // Kategorileri localStorage'dan yükle
  useEffect(() => {
    window.scrollTo(0, 0);

    handleCategorySelect(initialCategoryId);
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await ProductService.getCategories(axios);
        if (data) {
          setCategories(data);
          console.log("Kategoriler yüklendi:", data);
        } else {
          console.warn("Kategori verisi boş geldi");
        }
      } catch (error) {
        console.error("Kategori çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [axios]);


  // Kategori seçildiğinde URL'i güncelle
  const handleCategorySelect = (categoryId) => {
    if (categoryId) {
      setSearchParams({ category: categoryId });
      setSelectedCategory(categoryId);
    } else {
      setSearchParams({});
      setSelectedCategory(null);
    }
  };

  // Kategori genişletme/daraltma
  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Seçili kategorinin breadcrumb yolunu bul
  const getCategoryPath = (categoryList, targetId, path = []) => {
    for (const category of categoryList) {
      const newPath = [...path, category];

      // ID'leri aynı tipe getir
      if (category.id === Number(targetId)) {
        return newPath;
      }

      if (Array.isArray(category.children) && category.children.length > 0) {
        const found = getCategoryPath(category.children, targetId, newPath);
        if (found.length > 0) return found;
      }
    }

    return [];
  };


  const selectedCategoryPath = selectedCategory
    ? getCategoryPath(categories, selectedCategory)
    : [];

  // Nested kategori render fonksiyonu
  const renderCategoryTree = (categoryList, level = 0) => {
    return categoryList.map((category) => {
      const hasChildren = category.children && category.children.length > 0;
      const isExpanded = expandedCategories.has(category.id);
      const isSelected = selectedCategory === category.id;

      return (
        <div key={category.id} className="w-full">
          <button
            onClick={() => {
              handleCategorySelect(category.id);
              if (hasChildren) toggleCategory(category.id);
            }}
            className={`flex items-center justify-between w-[85%] px-3 py-2 rounded-md  ${
              isSelected
                ? "bg-primary text-primary-foreground font-semibold border-l-4 border-primary pl-2"
                : "text-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
            style={{ marginLeft: `${level * 16}px` }}
          >
            <span className="text-sm">{category.name}</span>
            {hasChildren &&
              (isExpanded ? (
                <ChevronDownIcon className="h-4 w-4" />
              ) : (
                <ChevronRightIcon className="h-4 w-4" />
              ))}
          </button>

          {hasChildren && isExpanded && (
            <Collapsible open={isExpanded}>
              <CollapsibleContent className="mt-1">
                {renderCategoryTree(category.children, level + 1)}
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      );
    });
  };

  // Filtrelenmiş kategoriler (sadece parent olmayanlar)
  const parentCategories = categories.filter((cat) => cat.parent === null);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <HomeIcon className="h-4 w-4 mr-1" />
            <span
              className="cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Ana Sayfa
            </span>

            {selectedCategoryPath &&
              selectedCategoryPath.map((cat, index) => (
                <div key={cat.id} className="flex items-center">
                  <ChevronRightIcon className="h-4 w-4 mx-2" />
                  <span
                    className={`cursor-pointer hover:underline ${
                      index === selectedCategoryPath.length - 1
                        ? "text-foreground font-medium flex items-center gap-1"
                        : ""
                    }`}
                    onClick={() => handleCategorySelect(cat.id)}
                  >
                    <FolderOpenIcon className="h-4 w-4 inline mr-1" />
                    {cat.name}
                  </span>
                </div>
              ))}
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {selectedCategoryPath.length > 0
                ? selectedCategoryPath[selectedCategoryPath.length - 1].name
                : "Tüm Ürünler"}
            </h1>
            <p className="text-muted-foreground">
              {selectedCategoryPath.length > 0
                ? `"${selectedCategoryPath[selectedCategoryPath.length - 1].name}" kategorisindeki ürünler`
                : "Tüm ürünleri keşfedin"}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sol Sidebar - Kategori Filtreleri */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="sticky top-8">
                <div className="bg-card border rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FilterIcon className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Kategoriler</h3>
                  </div>

                  <Separator className="mb-4" />

                  {/* Tüm Kategoriler Butonu */}
                  <button
                    onClick={() => handleCategorySelect(null)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 mb-3 ${
                      !selectedCategory
                        ? "bg-primary text-primary-foreground font-semibold border-l-4 border-primary pl-2"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <span className="text-sm font-medium">Tüm Kategoriler</span>
                  </button>

                  <Separator className="mb-4" />

                  {/* Kategori Ağacı */}
                  <div className="space-y-1">
                    {renderCategoryTree(parentCategories)}
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Taraf - Ürünler */}
            <div className="flex-1">
              {/* Üst Araç Çubuğu */}
              <div className="bg-card border rounded-lg p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  {/* Arama */}
                  <div className="relative flex-1 max-w-md">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Ürün ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Ürün Listesi */}
              {loading ? (
                <div className="flex justify-center min-h-screen items-center py-10">
                    <motion.div
                      className="w-12 h-12 border-4 border-gray-300 border-t-zinc-950 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                </div>
              ) : (
                <>
                  <div className={viewMode === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "space-y-4"}>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <ProductCard key={product.id} product={product} viewMode={viewMode} />
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 border rounded-lg bg-muted/20">
                        <FolderOpenIcon className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          {selectedCategoryPath.length > 0
                            ? `${selectedCategoryPath[selectedCategoryPath.length - 1].name} kategorisinde ürün bulunamadı`
                            : "Ürün bulunamadı"}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Başka kategorilere göz atabilirsin.
                        </p>
                        <Button onClick={() => handleCategorySelect(null)}>
                          Tüm ürünlere dön
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}  
          </div>
        </div>
      </div>
    </div> 
  );
};

export default ProductsPage;
