import Nav from "./components/Nav"
import Footer from "./components/Footer"
import { Routes, Route } from 'react-router-dom'
import { nav } from './lib/nav'
import { useState, useEffect } from "react"
import { signOutUser, isLoggedIn, getOrders,isAdminLoggedIn } from "./lib/api"
import Login from "./routes/Login.jsx"; // Replace "path-to-your" with the actual path
import Admin from "./routes/Admin.jsx"; // Replace "path
import { storeAtom, updateStore } from "./lib/store"
import { useAtom } from "jotai"
import { getCart_localStorage } from "./lib/cart"

// useEffect is for executing functions at certain points throughout a component's lifecycle (mount, update, destroy)

// npm install --save @stripe/react-stripe-js @stripe/stripe-js



function App() {

  /*
    npm install @mui/icons-material @mui/material @emotion/styled @emotion/react

      Routes (pages)
        - home
        - about
        - shipping info
        - my orders
        - contact
        - cart/checkout
        - products
        - login/signup

      JSX vs HTML
        - when you return JSX, there can only be 1 parent element
        - JSX has "fragments" <></>
        - insert js expressions using {}
        - use "className" instead of "class"
        - generate HTML from an array using map
        - event listeners with on____
              onClick=
              onSubmit=
              etc...
  */

  const [store, setStore] = useAtom(storeAtom)

  // when the app starts up, check localStorage for a cart

  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)


  async function fetchOrders() {
    getOrders()
    .then(orders => {
      updateStore(setStore, {orders})
    }) 
  }

  // useEffect with an empty array as the 2nd argument, will only run on the component mount
  useEffect(()=>{
    // gets the cart from local storage and puts it in the store
    // calls the isLoggedIn function to see if you're logged in
    isLoggedIn()
      .then(userRes => {
        // if logged in, we will have a userame property
        if (userRes.userName) {
          // set the user state to the user object, and the logged-in state to true
          setUser(userRes)
          setLoggedIn(true)
          updateStore(setStore, {
            cart: getCart_localStorage(true),
            user: userRes,
            loggedIn: true
          })
          fetchOrders()
        } else {
          updateStore(setStore, {
            cart: getCart_localStorage()
          })
        }
      })

      isAdminLoggedIn().then((adminValue)=>{
        if(adminValue){
          setAdminLoggedIn(true);
          updateStore(setStore, {
       
            adminLoggedIn: true
          })
        }else{
          setAdminLoggedIn(false);
          updateStore(setStore, {
       
            adminLoggedIn: false
          })
        }
      })



  }, [])

  function logOut() {
    localStorage.removeItem('guest-cart')
    signOutUser()
    setUser({})
    setLoggedIn(false)
  }

  return (
    <>
    <header>
      <div>
        <h1></h1>
        <h2>Welcome, {user.userName || 'guest'}!</h2>
        <div className="spacer"></div>
        <Nav />
        {loggedIn && (
          <button onClick={logOut}>Log out</button>
        )}
      </div>
    </header>

    <main>
      <div>
        <Routes>
          {nav.map(function (item) {
            return (
              <Route key={item.to} element={item.component} path={item.to} />
            );
          })}
          
     
        </Routes>
      </div>
    </main>

    <Footer />
  </>
);
}

export default App