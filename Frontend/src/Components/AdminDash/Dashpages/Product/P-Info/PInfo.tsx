import {
  RemoveProductFn,
  resetRemovePro,
} from '@/Redux/Slices/Dashbaord/Product/RemoveProduct'
import { Button } from '@material-tailwind/react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneProductFn } from '../../../../../Redux/Slices/Dashbaord/Product/getOneProduct'
import { AppDispatch, RootState } from '../../../../../Redux/Store'
import './PInfo.css'

// import './ProductInfo.css '
const PInfo = () => {
  const OneProductState = useSelector((state: RootState) => state.getOneProduct)
  const rmPro = useSelector((state: RootState) => state.RemoveProduct)

  const { Pr_Id } = useParams()
  //  console.log(Pr_Id)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getOneProductFn(Pr_Id))
  }, [])

  const navigate = useNavigate()

  // Delte Function
  const toastId: string = 'ToasterId'
  const deletehandle = (productId: number) => {
    dispatch(RemoveProductFn(productId))
  }
  useEffect(() => {
    if (rmPro.IsError) {
      toast.error(rmPro.E_message, { id: toastId })
    }
    if (rmPro.isSuccess) {
      toast.success('Delete product successfully...', { id: toastId })
      navigate('/dashboard/product')
    }

    dispatch(resetRemovePro())
  }, [rmPro.IsError, rmPro.isSuccess, rmPro.E_message])

  return (
    <>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
          <div className="img">
            <div className="img-box h-full max-lg:mx-auto ">
              <img
                src={OneProductState.data.Pr_Image}
                alt="Yellow Tropical Printed Shirt image"
                className="max-lg:mx-auto lg:ml-auto h-full"
              />
            </div>
          </div>
          <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
            <div className="data w-full max-w-xl">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                {OneProductState.data.Pr_Name}
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                  ${OneProductState.data.Pr_Price}
                </h6>
              </div>
              <div className="flex items-center gap-2">
                <span className="pl-2 font-normal leading-7 text-gray-500 text-sm ">
                  {OneProductState.data.Pr_Quantity} stock
                </span>
              </div>
              <p className="text-gray-500 text-base font-normal mb-5">
                {OneProductState.data.Pr_Desc}
              </p>
            </div>
            <Button
              onClick={() => {
                deletehandle(OneProductState.data.Pr_Id)
              }}
              color="blue"
            >
              {' '}
              Delete{' '}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PInfo
