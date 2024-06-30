import { ShoppingCart } from 'lucide-react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { UserCartFn } from '../../../Redux/Slices/Cart Folder/UserCarts'
import { userOrderFn } from '../../../Redux/Slices/orderSlice/UserOrders'
import { AppDispatch, RootState } from '../../../Redux/Store'
import { DropdownMenuDemo } from '../Header/DropDownUser'
import './Header2.css'

const Header2 = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(UserCartFn())
  }, [])

  useEffect(() => {
    dispatch(userOrderFn())
  }, [])
  //cart

  const navigate = useNavigate()

  const newOrder = useSelector((state: RootState) => state.newOrder)

  const toastId: string = 'ToastOrder'

  useEffect(() => {
    if (newOrder.IsSuccess) {
      toast.success('Order successfully', { id: toastId })
      dispatch(UserCartFn())
    }
    if (newOrder.IsError) {
      toast.error(newOrder.E_message, { id: toastId })
    }
  }, [newOrder.IsError, newOrder.IsSuccess])

  //checkUserInfo

  const checkUserInfo = JSON.parse(localStorage.getItem('userInfo')!)

  return (
    <div className="header2  h-[10vh]">
      <a href="#" className="flex items-center justify-center gap-4">
        <Link to={'/'}>
          {' '}
          <h2 className="text-indigo-500 text-md font-bold "> Amiira </h2>
        </Link>
      </a>
      <div className=" flex justify-center items-center">
        <ul id="navbar">
          <li>
            <a
              className="n-active cursor-pointer"
              onClick={() => {
                navigate('/')
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="cursor-pointer"
              onClick={() => {
                navigate('/product')
              }}
            >
              Shop
            </a>
          </li>

          <li>
            <a
              className="cursor-pointer"
              onClick={() => {
                navigate('/about')
              }}
            >
              About
            </a>
          </li>
        </ul>
      </div>

      <div className="u-icon flex items-center justify-center gap-2">
        <Link to={'cart'}>
          <div className="cursor-pointer">
            <ShoppingCart />
          </div>
        </Link>{' '}
        {userInfo.Username ? (
          <>
            <DropdownMenuDemo user={checkUserInfo} />
          </>
        ) : (
          <div className="btnContainer">
            <Link to={'/login'}>
              <button className="w-20 h-10 rounded-[5px]  duration-300 hover:bg-transparent hover:border-2 bg-blue-600 text-white border-blue-600 inline-block  hover:text-black  ">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header2
