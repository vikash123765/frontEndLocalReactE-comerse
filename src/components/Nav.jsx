import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { nav } from '../lib/nav';
import { isLoggedIn } from '../lib/api';
import logo from '../Logo/logoMobile.webp';
import { useAtom } from 'jotai';
import { storeAtom } from '../lib/store';
import '../style/nav.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';

export default function Nav() {
    const [store, setStore] = useAtom(storeAtom);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to manage mobile menu open/close

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const isFullSizeScreen = window.innerWidth > 1200;

    return (
        <>
            <header>
                {isFullSizeScreen && <img src={logo} alt="Your Logo" className="logo" />}
                <nav className='desktop'>
                    <ul>
                        {nav.filter(r => r.text).map(function (item) {
                            // Your existing conditions for filtering
                            if (
                                (store.loggedIn && (item.loggedIn === false)) ||
                                (!store.loggedIn && (item.loggedIn === true)) ||
                                (store.adminLoggedIn && (item.adminLoggedIn === false)) ||
                                (!store.adminLoggedIn && (item.adminLoggedIn === true))
                            ) {
                                return null;
                            }
                            return (
                                <li key={item.to}>
                                    <Link to={item.to}>{item.text}</Link>
                                </li>
                            )
                        })}
                        <li>
                            <Link to="/cart" className='cart-icon'>
                                <ShoppingCartIcon />
                                <div className='badge'>
                                    {store.cart && store.cart.length}
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* MOBILE VERSION */}
                <nav className="mobile">
                    <div className="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <MenuIcon />
                    </div>
                    <div className="menu" style={{ display: isMobileMenuOpen ? 'block' : 'none' }}>
                        <ul>
                            {nav.filter(r => r.text).map(function (item) {
                                // Your existing conditions for filtering
                                if (
                                    (store.loggedIn && (item.loggedIn === false)) ||
                                    (!store.loggedIn && (item.loggedIn === true)) ||
                                    (store.adminLoggedIn && (item.adminLoggedIn === false)) ||
                                    (!store.adminLoggedIn && (item.adminLoggedIn === true))
                                ) {
                                    return null;
                                }
                                return (
                                    <li key={item.to}>
                                        <Link to={item.to} onClick={closeMobileMenu}>{item.text}</Link>
                                    </li>
                                )
                            })}
                            <li>
                                <Link to="/cart" className='cart-icon' onClick={closeMobileMenu}>
                                    <ShoppingCartIcon />
                                    <div className='badge'>
                                        {store.cart && store.cart.length}
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}