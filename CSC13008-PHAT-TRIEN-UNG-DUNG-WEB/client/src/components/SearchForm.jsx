import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const [keyword, setKeyword] = useState("");
    const closeButtonRef = useRef();

    useEffect(() => {
        closeButtonRef.current?.addEventListener("click", handleClose);
        const params = new URLSearchParams(location.search);
        const q = params.get("q") || "";
        setKeyword(q);
    }, [location]);

    function handleSubmit(e) {
        e.preventDefault();
        const params = new URLSearchParams(location.search);
        if (keyword.trim()) {
            params.set("q", keyword.trim());
        } else {
            params.delete("q");
        }
        params.set("page", "1"); // Reset to first page on new search
        navigate({ search: params.toString() });
    }

    const handleClose = () => {
        const params = new URLSearchParams(location.search);
        params.delete("q");
        params.set("page", "1"); // Reset to first page on close
        navigate({ pathname: "/products", search: params.toString() });
    }

    return (
        <form className="d-flex justify-content-between" onSubmit={handleSubmit}>
            <input 
                type="text" 
                className="form-control" 
                id="search_input" 
                placeholder="Search Here"
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="btn" />
            <span className="lnr lnr-cross" id="close_search" title="Close Search" ref={closeButtonRef} />
        </form>
    );
}