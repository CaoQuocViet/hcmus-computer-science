import { useState, useEffect, useMemo } from "react";
import { http } from "../lib/http";
import SidebarCategories from "../components/SidebarCategories";
import SidebarFillter from "../components/SidebarFillter";
import FilterBar from "../components/Filterbar";
import SingleProduct from "./SingleProduct";
import { useSearchParams } from "react-router-dom";

export default function ProductList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const category = searchParams.get("category") || "";

    // /products?category=abc => { category: 'abc' }
    const queryString = useMemo(() => {
        const params = new URLSearchParams();
        if (category) {
            params.set("categoryId", category);
        }
        return params.toString();
    }, [category]);

    useEffect(() => {
        let canceled = false;
        setLoading(true);
        setError(null);

        async function loadProducts() {
            try {
                const res = await http.get("/products?" + queryString);
                const data = res.data.data;

                if (!canceled) {
                    setProducts(data.products);
                    setLoading(false);
                    setError(null);
                }
            } catch (err) {
                if (!canceled) {
                    setLoading(false);
                    setError(err?.response?.data?.message || err?.message || "Khong tai duoc san pham");
                }
            }
        }

        loadProducts();

        return () => {
            canceled = true;
        };
    }, [queryString]); 

    return (

        <div className="container">
            <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-5">
                    <SidebarCategories />
                    <SidebarFillter />
                </div>
                <div className="col-xl-9 col-lg-8 col-md-7">
                    <FilterBar />
                    <section className="lattest-product-area pb-40 category-list">
                        <div className="row">
                            {loading && <div>Dang tai...</div>}
                            {error && <div className="alert alert-danger">{error}</div>}
                            {!loading && !error && (
                                <>
                                    {products.length === 0 ? (
                                        <div className="alert alert-info">Khong co san pham nao.</div>
                                    ) : (
                                        <>
                                            {products.map((p) => (
                                                <SingleProduct key={p.id} product={p} />
                                            ))}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </section>
                    <FilterBar />
                </div>
            </div>
        </div>
    );
}