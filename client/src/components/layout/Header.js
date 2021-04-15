import React, { Fragment } from "react";
import { Link, Route} from 'react-router-dom'

import{useDispatch,useSelector} from 'react-redux'
import{useAlert} from'react-alert'
import {logout} from '../../actions/userActions'

import Search from './Search'


const Header = () => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.cart);

  const logoutHandler = ()=>{
    dispatch(logout());
    alert.success('Logged Out Successfully.')
  }

  return ( 
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3 text-center">
          <div className="navbar-brand ">
            <Link to ="/">
              <img src="/images/logo_mp.png" width= "60px" height="60px" alt="logo"/>
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({history})=><Search history={history}/>}/>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center mr-auto">
          <Link to="/cart" style={{textDecoration: 'none'}}  >
          <span id="cart" className="ml-1 ">
            <i className="fa fa-shopping-cart fa-3x" ></i>
            <span className="mr-3" id="cart_count">
              {cartItems.length}
            </span>
          </span>
         
          </Link>

          {user?(
            <div className="ml-auto dropdown d-inline">
              <Link to ="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle ="dropdown"
              aria-haspopup="true" aria-expanded="false" >
                <figure className="avatar avatar-nav" >
                  <img src={user.avatar && user.avatar.url} 
                  alt={user && user.name}
                  className="rounded-circle" />
                </figure>
                <span>{user && user.name}</span>
              </Link>
              <div className="dropdown-menu  ml-2 text-center size-dropdown-menu" aria-labelledby="dropDownMenuButton">

                {user && user.role !== 'admin'?(
                  <Link className="dropdown-item" to="/oders/me">Orders</Link>
                ):(
                  <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                  )}
                  <Link className="dropdown-item" to="/me">Profile</Link>
                  <Link className="dropdown-item text-danger" to ="/" onClick={logoutHandler}> Logout</Link>
              </div>
            </div>
          ): !loading && <Link to="/login" className="btn ml-4" id="login_btn">
          Login
        </Link>}

          

        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
