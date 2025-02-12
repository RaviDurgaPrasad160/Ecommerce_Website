import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from './../pages/AllUsers';
import AllProducts from './../pages/AllProducts';
import CategoreProduct from '../pages/CategoreProduct'
import ProductDetailes from '../pages/ProductDetailes'

const router = createBrowserRouter([
    {
        path: '/',
        element:<App/>,
        children:[
            {
                path:'',
                element:<Home/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'forgot-password',
                element:<ForgotPassword/>
            },
            {
                path:'sign-up',
                element:<SignUp/>
            },
            {
                path:'product-category/:categoryName',
                element:<CategoreProduct/>
            },
            {
                path:'product/:productId',
                element:<ProductDetailes/>
            },
            {
                path:'admin-panel',
                element:<AdminPanel/>,
                children:[
                    {
                        path:'all-users',
                        element:<AllUsers/>
                    },
                    {
                        path:'all-products',
                        element:<AllProducts/>
                    }
                ]
            }
        ]
    }
], {
    future: {
        v7_startTransition: true
    }
})

export default router