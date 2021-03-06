import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import{composeWithDevTools} from 'redux-devtools-extension'

import {productsReducer, productDetailsReducer,productReducer, newProductReducer, newReviewReducer} from './reducers/productReducers'
import{authReducer, allUsersReducer} from './reducers/userReducers'
import {cartReducer} from './reducers/cartReducers'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    allUsers: allUsersReducer,
    cart: cartReducer,
    newProduct: newProductReducer,
    product: productReducer,
    newReview: newReviewReducer,
})

let initialState ={
    cart:{
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        :[]
    }
}

const middleware =[thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;