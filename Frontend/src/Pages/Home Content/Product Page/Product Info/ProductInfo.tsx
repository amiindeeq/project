import { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaRegStar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
// import { AddToCartFn, resetCarts } from '../../../../Redux/Slices/Cart Folder/AddToCart'
import { AddToCartFn } from '@/Redux/Slices/Cart Folder/AddToCart'
import { UserCartFn } from '../../../../Redux/Slices/Cart Folder/UserCarts'
import { getOneProductFn } from '../../../../Redux/Slices/Dashbaord/Product/getOneProduct'
import { AppDispatch, RootState } from '../../../../Redux/Store'
import './ProductInfo.css'
// import './ProductInfo.css '
const ProductInfo = () => {
  const OneProductState = useSelector((state: RootState) => state.getOneProduct)

  const { Pr_Id } = useParams()
  //  console.log(Pr_Id)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getOneProductFn(Pr_Id))
  }, [])

  const AddCartSate = useSelector((state: RootState) => state.AddToCart)

  const [quant, setQuant] = useState(1)

  const AddToCart = () => {
    const role = JSON.parse(localStorage.getItem('userInfo')!)?.token

    if (!role) {
      navigate('/login')
    }
    const data = {
      quant,
      Pr_Id,
    }

    dispatch(AddToCartFn(data))
  }

  // Add Cart Part

  const toastId = 'AddingCart'
  const navigate = useNavigate()

  const increamentHanlde = () => {
    if (quant < OneProductState.data?.Pr_Quantity) {
      setQuant(quant + 1)
    }
  }

  const AddtoCartState = useSelector((state: RootState) => state.AddToCart)
  const handleCart = (e: FormEvent) => {
    e.preventDefault()

    dispatch(AddToCartFn(Pr_Id))
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    if (AddtoCartState.IsLoading) {
      toast.loading('Adding...', { id: toastId })
    }
    if (AddtoCartState.IsSuccess) {
      toast.success('Added', { id: toastId })
      navigate('/cart')
      dispatch(UserCartFn())
    }

    if (AddtoCartState.IsError) {
      toast.error(AddtoCartState.E_message, { id: toastId })
      // useDispatch(resetCarts())
    }
  }, [
    AddtoCartState.IsLoading,
    AddtoCartState.IsSuccess,
    AddtoCartState.IsError,
  ])

  // console.log(AddingCart)

  return (
    <>
      <div className="info-all   ">
        <div className="row flex justify-center items-center  ">
          <div className="image ">
            <div className=" im1 image1">
              <img
                className=" h-[50vh]"
                src={OneProductState.data?.Pr_Image?.split(',')[0]}
              />
            </div>
          </div>

          <div className="w-[50%] ">
            <h1 className="name">{OneProductState.data.Pr_Name}</h1>
            <div className="star-info">
              <i className="star">
                {' '}
                <FaRegStar />{' '}
              </i>
              <i className="star">
                {' '}
                <FaRegStar />{' '}
              </i>
              <i className="star">
                {' '}
                <FaRegStar />{' '}
              </i>
              <i className="star">
                {' '}
                <FaRegStar />{' '}
              </i>
              <i className="star">
                {' '}
                <FaRegStar />{' '}
              </i>
            </div>
            <p className="desc">{OneProductState.data.Pr_Desc}</p>
            <h4 className="price">${OneProductState.data.Pr_Price}</h4>
            <div className="flex gap-4">
              <button className="edit bg-blue-600 " onClick={increamentHanlde}>
                +
              </button>
              <input
                defaultValue={1}
                min={0}
                className="quantity text-center"
                // type='number'
                value={quant}
                onChange={() => {
                  increamentHanlde
                }}
              />

              <button
                className="edit bg-blue-600"
                onClick={() => {
                  setQuant((prevQuant: any) => {
                    const newQuant = parseInt(prevQuant) - 1
                    return newQuant >= 0 ? newQuant : 0
                  })
                }}
              >
                -
              </button>
            </div>
            <br />
            <button className="info-btn bg-blue-600" onClick={AddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}

export default ProductInfo
