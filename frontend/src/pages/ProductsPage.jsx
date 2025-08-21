import CategoryMenu from "@/components/products/CategoryMenu";
import { useLocation } from "react-router-dom";


const ProductsPage = () => {
    const { state } = useLocation();
    const categories = state?.categories || [];
    return (
        <div className="flex justify-center ">
            <div className="flex justify-center container w-5/6">
                <h1>{state.id}</h1>
                <CategoryMenu categories={categories} id={state.id} />
            </div>
        </div>
    );
}

export default ProductsPage;