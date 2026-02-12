import { use, useEffect } from 'react';
import SearchForm from './SearchForm';

export default function Header() {
    useEffect(() => {
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll(
            "#navbarSupportedContent .nav-item"
        );
        navItems.forEach((item) => {
            const link = item.querySelector(".nav-link");
            if(link && link.getAttribute("href") === currentPath) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }, []);

    return (
        <header className="header_area sticky-header">
            <div className="main_menu">
                <nav className="navbar navbar-expand-lg navbar-light main_box">
                    <div className="container">
                        {/* Brand and toggle get grouped for better mobile display */}
                        <a className="navbar-brand logo_h" href="index.html"><img src="/img/logo.png" alt="Karma Shop Logo"/></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                        {/* Collect the nav links, forms, and other content for toggling */}
                        <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                            <ul className="nav navbar-nav menu_nav ml-auto">
                                <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                                <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li className="nav-item"><a href="#" className="cart"><span className="ti-bag" /></a></li>
                                <li className="nav-item">
                                    <button className="search"><span className="lnr lnr-magnifier" id="search" /></button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="search_input" id="search_input_box">
                <div className="container">
                    <SearchForm />
                </div>
            </div>
        </header>
    );
}
