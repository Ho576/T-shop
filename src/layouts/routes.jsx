import Layout from './Layout';
import Home from '../componants/web/home/Home';
import Catigoris from '../componants/web/catigoris/Catigoris';
import HomeDashboard from '../componants/dashbord/home/Home';
import CategoriesDashboard from '../componants/dashbord/catigoris/Catigoris';
import Register from '../componants/web/register/Register';
import Login from '../componants/web/login/Login';
import Product from '../componants/web/products/Product';
import DashbordLayout from './DashbordLayout';
import { createBrowserRouter} from 'react-router-dom'
import CategorisDetails from './../componants/web/catigoris/CategorisDetails';
import Cart from './../componants/web/cart/Cart';
import ProtectedRoute from '../componants/web/protectedRoute/ProtectedRoute';
import Profile from '../componants/web/profile/Profile';
import SendCode from '../componants/web/login/SendCode';
import ChangePassword from '../componants/web/login/ChangePassword';
import UserInfo from '../componants/web/profile/UserInfo';
import UserContact from '../componants/web/profile/UserContact';
import CreateOrder from '../componants/web/cart/CreateOrder';
import GetOrders from '../componants/web/cart/GetOrders';
import Loding from '../componants/web/loading/Loding';

export const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout />,
      children:[
          {
            path:'register',
            element:<Register />
          },
          {
            path:'profile',
            element:<ProtectedRoute><Profile /></ProtectedRoute>,
            children:[
              {
                //path:'',
                index:true,
                element:<UserInfo />
              },
              {
                path:'contact',
                element:<UserContact />
              },
              {
                path:'info',
                element:<UserInfo />
              },
              {
                path:'getorders',
                element:<GetOrders />
              },

            ]
          },
          {
            path:'login',
            element:<Login/>
          },
          {
            path:'forgetPassword',
            element:<SendCode/>
          },
          {
            path:'changePassword',
            element:<ChangePassword/>
          },
          {
            //path:'',
            index:true,
            element:<Home />
          },
          {
            path:'/products/category/:categoryId',
            element:<CategorisDetails/>
          },
          {
            path:'/products/:productId',
            element:<Product/>

          },
          {
            path:'categories',
            element:<Catigoris />
          },
          {
            path:'cart',
            element:<ProtectedRoute><Cart /></ProtectedRoute>,
          },
          {
            path:'createorder',
            element:<ProtectedRoute><CreateOrder /></ProtectedRoute>
          },
          {
            path:'loading',
            element:<Loding/>
          },

          {
            path:'*',
            element:<h2>page not found --- web</h2>
          }
      ]
    },
    {
        path:'/dashboard',
        element:<DashbordLayout />,
        children:[{
        path:'home',
        element:<HomeDashboard />
      }
      ,{
        path:'categories',
        element:<CategoriesDashboard />
      },
      {
        path:'*',
        element:<h2>page not found --- dashboard</h2>
      }
    ]
  
  
    }
  ]);