import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrderFn } from '../../../../Redux/Slices/orderSlice/AllOrder'
import { AppDispatch, RootState } from '../../../../Redux/Store'
import './OrderPage.css'
dayjs.extend(relativeTime)
const OrderPage = () => {
  const AllOrderState = useSelector((state: RootState) => state.AllOrders)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getAllOrderFn())
  }, [])

  return (
    <div className="mt-6">
      <table className="or-table">
        <thead>
          <th>ID</th>
          <th>Product Name</th>
          <th>Quant</th>
          <th>Price</th>
          <th>Status</th>
          <th>User Name</th>
          <th>Created At</th>
          <th>Total</th>
        </thead>
        <tbody>
          {AllOrderState?.data?.map((item, idx) => (
            <tr key={idx}>
              <td>{item.Or_Id}</td>
              <td className="text-start">
                {item?.Items?.map((product: any) => product?.Product?.Pr_Name)}
              </td>
              <td className="text-start">
                {item?.Items?.map((item:any)=>item?.Quant)}
              </td>
              <td className="text-start">
                {item?.Items?.map((item:any)=>item?.Product?.Pr_Price)}
              </td>
              <td>
                {' '}
                {item.isPaid ? (
                  <span className=" text-green-600">Paid</span>
                ) : (
                  <span className=" text-red-500">Not Deleted</span>
                )}{' '}
              </td>
              <td className="text-start">
                {item?.User?.Username}
              </td>
              <td> {dayjs(item.Updated_At).fromNow()} </td>
              <td>${item.Or_Total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderPage
