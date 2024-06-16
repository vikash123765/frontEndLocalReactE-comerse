function addToCart_localStorage(p, loggedIn) {
    const lsCart = getCart_localStorage(loggedIn);
    // Check if the product is not already in the cart before adding it
    if (!lsCart.some(item => item.productId === p.productId)) {
        lsCart.push(p);
        let key = loggedIn ? 'cart' : 'guest-cart';
        localStorage.setItem(key, JSON.stringify(lsCart));
    }
}


function getCart_localStorage(loggedIn) {
    let key = loggedIn ? 'cart' : 'guest-cart';
    let cart = JSON.parse(localStorage.getItem(key) || "[]");
    if (!loggedIn && cart.length === 0) {
        // If the user is not logged in and their cart is empty, check if there is a guest cart
        return JSON.parse(localStorage.getItem('guest-cart') || "[]");
    }
    return cart;
}
function clearCart(setStore) {
    localStorage.removeItem('cart');
    localStorage.removeItem('guest-cart'); // Add this line to clear the guest cart
    setStore(current => {
        current.cart = [];
        return { ...current };
    });
}


export {
    addToCart_localStorage,
    getCart_localStorage,
    clearCart
}
