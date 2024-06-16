
import { getProductsByIds } from "../lib/api.js"

import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import '../style/home.css';
import ProductCard from "../components/ProductCard.jsx"

// since it's async we must await it
// let products = await getAllProducts()
// let products = []
// console.log(products)


export default function Home() {

    const [products, setProducts] = useState([])
    useEffect(()=>{
        getProductsByIds([15, 37,33])
            .then(p => {
                setProducts(p)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    return (
        <>
            <section id="hero">
                <h2>VTS cases</h2>
                <p className="mobile-text">Welcome to VTScases! Elevate your mobile experience with our stylish, protective phone cases. Choose from vibrant printed, timeless plain, or bold colored designs. Our cases combine fashion with functionality, offering trend-setting protection for your device!</p>
                <p className="desktop-text">Welcome to VTScases, where style meets protection! Elevate your mobile experience with our diverse range of phone cases. At VTScases, we pride ourselves on offering a collection that caters to every taste. Whether you prefer the vibrant allure of printed cases, the timeless simplicity of plain designs, or the bold statement made by our colored cases, we have the perfect match for your style. Our cases not only reflect the latest trends but also provide top-notch protection for your device. Discover the fusion of fashion and functionality as you explore our curated selection. Shop VTScases today and let your phone make a statement!</p>
            </section>
            <section id="products">
                {products.map(p => {
                    return (
                        <ProductCard key={`pcard-${p.productId}`} p={p} />
                    )
                })}
            </section>
            <Link to="/products" style={{ color: '#000' }}>See all products</Link>
        </>
    )
}