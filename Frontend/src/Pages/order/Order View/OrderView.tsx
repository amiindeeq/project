import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../Redux/Store'
import { getOneOrderFn } from '../../../Redux/Slices/orderSlice/OneOrder'
import { useParams } from 'react-router-dom'
import './OrderView.css'

const OrderView = () => {
  const OneOrderState = useSelector((state: RootState) => state.oneOrder)

  const dispatch = useDispatch<AppDispatch>()

  const { Or_Id } = useParams()

  // console.log(
  //   OneOrderState.data?.Item?.map((item, idx) => item.Product.Pr_Name)
  // )

  useEffect(() => {
    dispatch(getOneOrderFn(Or_Id))
  }, [])



  return (
    <div className="flex justify-center mt-6">
      <table className="orview-table">
        <thead>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </thead>
        <tbody>
          {OneOrderState.data?.map((item: any, idx: any) => (
            <tr key={idx}>
              <td className="flex justify-center items-center">
                {' '}
                <img
                  className="w-[80px] h-[80px] rounded-full border-2 p-2 "
                  src={item?.Product?.Pr_Image.split(',')[0]}
                  alt=""
                />{' '}
              </td>
              <td className="text-xl"> {item.Product.Pr_Name} </td>
              <td> {item.Product.Pr_Price} </td>
              <td> {item.Quant} </td>
              <td> {item.Product.Pr_Price * item.Quant} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderView
