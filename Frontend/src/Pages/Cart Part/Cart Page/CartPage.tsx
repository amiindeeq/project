import { UserCartFn, resetAddCart } from '@/Redux/Slices/Cart Folder/UserCarts'
import { newOrderFn } from '@/Redux/Slices/orderSlice/NewOrde'
import { userOrderFn } from '@/Redux/Slices/orderSlice/UserOrders'
import { AppDispatch, RootState } from '@/Redux/Store'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const CartPage = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo)
  const dispatch = useDispatch<AppDispatch>()

  const UserCartState = useSelector((state: RootState) => state.UserCarts)

  useEffect(() => {
    dispatch(UserCartFn())
  }, [])

  const UserOrderState = useSelector((state: RootState) => state.userOrders)

  useEffect(() => {
    dispatch(userOrderFn())
  }, [])
  //cart

  const navigate = useNavigate()

  // const [open,setOpen] = useState(false)

  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (e: any) => {
    setQuantity(parseInt(e.target.value))
  }

  const newOrder = useSelector((state: RootState) => state.newOrder)

  const toastId: string = 'ToastOrder'

  const submitHandle = () => {
    dispatch(newOrderFn())
    navigate('/order')
  }

  useEffect(() => {
    if (newOrder.IsSuccess) {
      toast.success('Order successfully', { id: toastId })
      dispatch(UserCartFn())
    }
    if (newOrder.IsError) {
      toast.error(newOrder.E_message, { id: toastId })
    }
    dispatch(resetAddCart())
  }, [newOrder.IsError, newOrder.IsSuccess])

  const total = UserCartState.data.Cart_Item?.map(
    (cart) => cart.Product.Pr_Price * cart?.Quant
  )

  const subTotal = total?.reduce(
    (prev, current) => prev + parseInt(current.toString())
  )

  return (
    <>
      <div className="w-full mt-5 max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
          Shopping Cart
        </h2>
        {UserCartState?.data?.Cart_Item?.map((cart) => (
          <>
            <div
              key={cart?.Product?.Pr_Id}
              className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4"
            >
              <div className="col-span-12 lg:col-span-2 img box">
                <img
                  src={cart?.Product?.Pr_Image}
                  alt="speaker image"
                  className="max-lg:w-full lg:w-[180px]"
                />
              </div>
              <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                <div className="flex items-center justify-between w-full mb-4">
                  <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
                    {cart?.Product?.Pr_Name}
                  </h5>
                 
                </div>
                <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                  Introducing our sleek round white portable speaker, the
                  epitome of style and sound! Elevate your auditory experience
                  with this compact yet powerful device that delivers
                  crystal-clear audio wherever you go.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4"></div>
                  <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">
                    ${cart.Product.Pr_Price * cart?.Quant}
                  </h6>
                </div>
              </div>
            </div>
          </>
        ))}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
          <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">
            Subtotal
          </h5>

          <div className="flex items-center justify-between gap-5 ">
            <h6 className="font-manrope font-bold text-3xl lead-10 text-indigo-600">
              ${subTotal}
            </h6>
          </div>
        </div>
        <div className="max-lg:max-w-lg mt-5 max-lg:mx-auto flex items-center gap-10">
          {/* <p className="font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6">
            Shipping taxes, and discounts calculated at checkout
          </p> */}
          <button
            onClick={submitHandle}
            className="rounded-full py-4  px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700 "
          >
            Checkout
          </button>
          <Link to={'/'}>
          <button
            onClick={submitHandle}
            className="rounded-full py-2 px-6 bg-blue text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700 "
          >
            continue to shopping
          </button>
              </Link>
        </div>
      </div>
    </>
  )
}

export default CartPage
