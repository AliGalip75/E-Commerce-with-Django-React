import { useState, useEffect } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronDownIcon, 
  ChevronRightIcon,
  FilterIcon,
  SearchIcon,
  Grid3X3Icon,
  ListIcon
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ProductCard from "@/components/ProductCard";

const ProductsPage = () => {
  const { state } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  
  // URL'den kategori ID'sini al
  const currentCategoryId = searchParams.get('category');
  
  // State'den kategorileri al, eğer yoksa localStorage'dan veya API'den çek
  const [categories, setCategories] = useState(state?.categories || []);
  
  // Seçili kategori bilgisini URL'den al
  const selectedCategory = currentCategoryId ? parseInt(currentCategoryId) : null;
  
  // Kategorileri localStorage'dan yükle (eğer state'de yoksa)
  useEffect(() => {
    if (state?.categories) {
      setCategories(state.categories);
      // localStorage'a kaydet
      localStorage.setItem('categories', JSON.stringify(state.categories));
    } else {
      // localStorage'dan yükle
      const savedCategories = localStorage.getItem('categories');
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      }
    }
  }, [state]);

  // Kategori seçildiğinde URL'i güncelle
  const handleCategorySelect = (categoryId) => {
    if (categoryId) {
      setSearchParams({ category: categoryId });
    } else {
      setSearchParams({});
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

  // Seçili kategorinin adını bul
  const getSelectedCategoryName = () => {
    if (!selectedCategory) return null;
    
    // Tüm kategorilerde recursive arama yap
    const findCategory = (categoryList, targetId) => {
      for (const category of categoryList) {
        if (category.id === targetId) {
          return category.name;
        }
        if (category.children && category.children.length > 0) {
          const found = findCategory(category.children, targetId);
          if (found) return found;
        }
      }
      return null;
    };
    
    return findCategory(categories, selectedCategory);
  };

  const selectedCategoryName = getSelectedCategoryName();

  // Nested kategori render fonksiyonu
  const renderCategoryTree = (categoryList, level = 0) => {
    return categoryList.map(category => {
      const hasChildren = category.children && category.children.length > 0;
      const isExpanded = expandedCategories.has(category.id);
      const isSelected = selectedCategory === category.id;
      
      return (
        <div key={category.id} className="w-full">
          <div className="flex items-center justify-between group">
            <button
              onClick={() => handleCategorySelect(category.id)}
              className={`flex-1 text-left px-3 py-2 rounded-md transition-all duration-200 hover:bg-accent hover:text-accent-foreground ${
                isSelected 
                  ? 'bg-primary text-primary-foreground font-medium' 
                  : 'text-foreground'
              } ${level > 0 ? 'ml-4' : ''}`}
            >
              <span className="text-sm">{category.name}</span>
            </button>
            
            {hasChildren && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => toggleCategory(category.id)}
              >
                {isExpanded ? (
                  <ChevronDownIcon className="h-4 w-4" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
          
          {hasChildren && (
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
  const parentCategories = categories.filter(cat => cat.parent === null);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Ürünler
          </h1>
          <p className="text-muted-foreground">
            {selectedCategoryName 
              ? `"${selectedCategoryName}" kategorisindeki ürünler`
              : 'Tüm ürünleri keşfedin'
            }
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
                  className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 hover:bg-accent hover:text-accent-foreground mb-3 ${
                    !selectedCategory 
                      ? 'bg-primary text-primary-foreground font-medium' 
                      : 'text-foreground'
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
                
                {/* Görünüm Modu */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3Icon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <ListIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Ürün Listesi */}
            <div className="space-y-6">
              {selectedCategory ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">
                      {selectedCategoryName || 'Bilinmeyen Kategori'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      kategorisinde ürün bulunamadı
                    </span>
                  </div>
                  <p className="text-center text-muted-foreground py-12">
                    Bu kategoride henüz ürün bulunmuyor.
                  </p>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  <p>Lütfen bir kategori seçin veya tüm ürünleri görüntüleyin.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;