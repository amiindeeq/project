import { getAllOrderFn } from '@/Redux/Slices/orderSlice/AllOrder'
import { AppDispatch, RootState } from '@/Redux/Store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const OrderTable: React.FC = () => {
  const AllOrderState = useSelector((state: RootState) => state.AllOrders)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getAllOrderFn())
  }, [dispatch])

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold leading-tight">Order List</h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                  >
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {AllOrderState.data.slice(0, 10).map((order) => (
                  <tr key={order.Or_Id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {order?.Items?.map((product:any, index) => (
                              <span key={index}>
                                {product.Product.Pr_Name}
                                {index < order.Items.length - 1 && ', '}
                              </span>
                            ))}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {order.Items.map((product:any, index) => (
                          <span key={index}>
                            {product.Product.Pr_Price}
                            {index < order.Items.length - 1 && ', '}
                          </span>
                        ))}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {order.Items.map((product:any, index) => (
                          <span key={index}>
                            {product?.Quant}
                            {index < order.Items.length - 1 && ', '}
                          </span>
                        ))}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderTable
