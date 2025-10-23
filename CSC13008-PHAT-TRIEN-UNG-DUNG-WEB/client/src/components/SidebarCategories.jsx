import { useEffect, useState } from "react";
import { http } from "../lib/http";

export default function SidebarCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let canceled = false;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const res = await http.get("/categories");
                const data = res.data.data;
                if (!canceled) {
                    setCategories(data);
                    setLoading(false);
                }
            } catch (err) {
                if (!canceled) {
                    setError(err?.response?.data?.message || "khong tai duoc danh muc san pham");
                    setLoading(false);
                }
            }
        }
        load();
        return () => {
            canceled = true;
        };
    }, []); // Add empty dependency array to run only once

    return (
        <div className="sidebar-categories">
            <div className="head">Browse Categories</div>
            <ul className="main-categories">
                {loading && <li>Dang tai....</li>}
                {error && <div className="alert alert-danger">{error}</div>}
                {!loading && !error && categories.map((c) => (
                    <li className="main-nav-list" key={c.id}>
                        <a href={`/products?category=${c.id}`}>
                            {c.name}
                            <span className="number">({c.Products?.length || 0})</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>

    );
}