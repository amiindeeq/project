import { createBrowserRouter, Outlet } from 'react-router-dom'
import Footer from '../Components/Utils/Footer/Footer'
import './Router.css'
// import Header from "../Components/Utils/Header/Header";
import Main from '../Components/AdminDash/Dashpages/Main/Main'
import DashRouter from '../Components/AdminDash/Dashrouter/DashRouter'
import Homepage from '../Pages/Home Content/Homepage/Homepage'
import Loginpage from '../Pages/Loginpage/Loginpage'
import './Router.css'
// import Main from "../Components/Dashboard/";
// import Sidebar from "../Components/Dashboard/Sidebar/Sidebar";
import CartPage from '@/Pages/Cart Part/Cart Page/CartPage'
import UserOrderReport from '@/Pages/order/report/UserOrderReport'
import UserOrder from '@/Pages/order/UserOrder/UserOrder'
import CatInfo from '../Components/AdminDash/Dashpages/Category/CatInfo/CatInfo'
import Category from '../Components/AdminDash/Dashpages/Category/Get All/Category'
import NewCategory from '../Components/AdminDash/Dashpages/Category/New Category/NewCategory'
import Info from '../Components/AdminDash/Dashpages/Category/RecyclePin/Info/Info'
import RecyclePin from '../Components/AdminDash/Dashpages/Category/RecyclePin/RecyclePin'
import { UpdateCategory } from '../Components/AdminDash/Dashpages/Category/Updating Category/UpdateCategory'
import ListingSection from '../Components/AdminDash/Dashpages/Main/listingSection/ListingSection'
import OrderPage from '../Components/AdminDash/Dashpages/Order Page/OrderPage'
import Product from '../Components/AdminDash/Dashpages/Product/GetAll/Product'
import NewProduct from '../Components/AdminDash/Dashpages/Product/New Product/NewProduct'
import PInfo from '../Components/AdminDash/Dashpages/Product/P-Info/PInfo'
import Header2 from '../Components/Utils/Header2/Header2'
import Notfound from '../Components/Utils/notfound/Notfound'
import AboutPage from '../Pages/About Page/AboutPage'
import Cancel from '../Pages/Cancel Page/Cancel'
import { Catepage } from '../Pages/Home Content/CategoryPageh/Catepage'
import ProductInfo from '../Pages/Home Content/Product Page/Product Info/ProductInfo'
import Allorder from '../Pages/order/Allorder'
import OrderView from '../Pages/order/Order View/OrderView'
import ShopPage from '../Pages/Shop Page/ShopPage'
import Success from '../Pages/SuccessPage/Success'
import ReceiptPayment from '@/Pages/order/Receipt/ReceiptPayment'

const Router = () => {
  return (
    <div className="flex flex-col  gap-0 min-h-screen ">
      <div className="Header bg-transparent z-30  fixed w-[100%]  ">
        <Header2 />
      </div>
      <div className="body pt-[60px] ">
        <Outlet />
      </div>
      <footer className="">
        <Footer />
      </footer>
    </div>
  )
}

export default Router

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Router />,
    children: [
      {
        path: '/',
        children: [
          {
            index: true,
            element: <Homepage />,
          },
          {
            path: '/category',
            element: <Catepage />,
          },
        ],
      },
      {
        path: 'product',
        children: [
          {
            index: true,
            element: <ShopPage />,
          },
          {
            path: 'Info/:Pr_Id',
            element: <ProductInfo />,
          },
        ],
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'order',
        children: [
          {
            index: true,
            element: <Allorder />,
          },
          {
            path: 'get-one/:Or_Id',
            element: <OrderView />,
          },
          {
            path: 'userOrder',
            element: <UserOrder />,
          },
          
        ],
      },
      {
        path: '/login',
        element: <Loginpage />,
      },
      {
        path: '*',
        element: <Notfound />,
      },
      {
        path: 'success',
        element: <Success />,
      },
      {
        path: 'cancel',
        element: <Cancel />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      // {
      //   path: 'user/report/:Or_Id',
      //   element: <UserOrderReport />,
      // },
      {
        path : "/receipt/:Or_Id",
        element: <ReceiptPayment/>
      }
    ],
  },
  {
    path: '/dashboard',
    element: <DashRouter />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'category',
        children: [
          {
            index: true,
            element: <Category />,
          },
          {
            path: 'new',
            element: <NewCategory />,
          },
          {
            path: 'update/:Ca_Id',
            element: <UpdateCategory />,
          },
          {
            path: 'trash',
            children: [
              {
                index: true,
                element: <RecyclePin />,
              },
              {
                path: 'info/:Ca_Id',
                element: <Info />,
              },
            ],
          },
          {
            path: 'info/:Ca_Id',
            element: <CatInfo />,
          },
        ],
      },
      {
        path: 'product',
        children: [
          {
            index: true,
            element: <Product />,
          },
          {
            path: 'new',
            element: <NewProduct />,
          },
          {
            path: 'info/:Pr_Id',
            element: <PInfo />,
          },
        ],
      },
      {
        path: 'user',
        element: <ListingSection />,
      },
      {
        path: 'order',
        element: <OrderPage />,
      },
      {
        path: 'allorder',
        element: <UserOrderReport />,
      },
    ],
  },
])
