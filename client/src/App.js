import {useEffect} from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/layout/Header";

import Home from "./components/Home";
import ProductDetails from './components/product/ProductDetails'

import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'

import ProtectedRoute from './components/route/ProtectedRoute'

import Cart from './components/cart/Cart'

import Dashboard from './components/admin/Dashboard'
import ProductsList from './components/admin/ProductsList'
import NewProduct from './components/admin/NewProduct'
import UsersList from './components/admin/UsersList'

import Footer from "./components/layout/Footer";

import { useSelector } from 'react-redux'
import {loadUser} from './actions/userActions'
import store from './store'



function App() {
  useEffect(() => {
    store.dispatch(loadUser())
    
  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)
  return (
    <Router>
      <div className="App">
        <Header />
        <div className ="container container-fluid" >
        <Route path="/" component={Home} exact />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/product/:id" component={ProductDetails} exact />

        <Route path="/cart" component={Cart} exact />

        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <ProtectedRoute path="/me" component={Profile} exact/>
        </div>
        
        <ProtectedRoute path="/dashboard" isAdmin ={true} component={Dashboard} exact/>
        <ProtectedRoute path="/admin/products" isAdmin ={true} component={ProductsList} exact/>
        <ProtectedRoute path="/admin/product" isAdmin ={true} component={NewProduct} exact/>
        <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact />
        {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}
      </div>
     </Router>
  );
}

export default App;
