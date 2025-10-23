import { useState, useEffect, useMemo } from "react";
import { http } from "../lib/http";
import SidebarCategories from "../components/SidebarCategories";
import SidebarFilter from "./SidebarFilter";
import FilterBar from "../components/Filterbar";
import SingleProduct from "./SingleProduct";
import { useSearchParams } from "react-router-dom";

export default function ProductList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(9);
    const [totalPages, setTotalPages] = useState(1);
    const [currentRange, setCurrentRange] = useState([0, 1000]);

    // Lay cac gia tri tren query string
    const category = searchParams.get("category") || "";
    const sort = searchParams.get("sort") || "";
    const page = searchParams.get("page") || 1;
    const min = Number(searchParams.get("min")) || 0;
    const max = Number(searchParams.get("max")) || 4000;

    const [priceRange, setPriceRange] = useState([min, max]);

    // /products?category=abc => { category: 'abc' }
    const queryString = useMemo(() => {
        const params = new URLSearchParams();
        params.set("limit", limit);
        params.set("page", page);
        if (category) {
            params.set("categoryId", category);
        }
        if (sort) {
            params.set("sort", sort);
        }
        if (min) {
            params.set("minPrice", min);
        }
        if (max) {
            params.set("maxPrice", max);
        }
        return params.toString();
    }, [category, sort, limit, page, min, max]);

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
                    setTotalPages(data.pagination.totalPages);
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

    function handleSortChange(value) {
        const next = new URLSearchParams(searchParams.toString());
        if (!value) {
            next.delete("sort");
        } else {
            next.set("sort", value);
        }
        next.set("page", 1);
        setSearchParams(next);
    }

    function handleLimitChange(value) {
        const next = new URLSearchParams(searchParams.toString());
        next.set("page", 1);
        setSearchParams(next);
        setLimit(value);
    }

    function handlePageChange(value) {
        const next = new URLSearchParams(searchParams.toString());
        if (!value) next.set("page", 1);
        else next.set("page", value);
        setSearchParams(next);
    }

    function handlePriceRangeChange(value) {
        setPriceRange(value);
        const next = new URLSearchParams(searchParams.toString());
        if (value[0] == null) next.delete("min");
        else next.set("min", String(value[0]));
        if (value[1] == null) next.delete("max");
        else next.set("max", String(value[1]));

        next.set("page", 1);
        setSearchParams(next);
    }

    return (

        <div className="container">
            <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-5">
                    <SidebarCategories />
                    <SidebarFilter
                        priceRange={currentRange}
                        onChange={handlePriceRangeChange}
                    />
                </div>
                <div className="col-xl-9 col-lg-8 col-md-7">
                    {loading && <div>Dang tai...</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    {!loading && !error && (
                        <>
                            <FilterBar
                                sort={sort}
                                onSortChange={handleSortChange}
                                limit={limit}
                                onLimitChange={handleLimitChange}
                                page={page}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                            <section className="lattest-product-area pb-40 category-list">
                                <div className="row">
                                    {products.length === 0 ? (
                                        <div className="alert alert-info">Khong co san pham nao.</div>
                                    ) : (
                                        <>
                                            {products.map((p) => (
                                                <SingleProduct key={p.id} product={p} />
                                            ))}
                                        </>
                                    )}
                                </div>
                            </section>
                            <FilterBar />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}