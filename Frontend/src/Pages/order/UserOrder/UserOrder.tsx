import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AllUserOrderFn } from '../../../Redux/Slices/orderSlice/AllUserOrder'
import { AppDispatch, RootState } from '../../../Redux/Store'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
} from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import './UserOrder.css'

const UserOrder = () => {
  const dispatch = useDispatch<AppDispatch>()
  const AllUserOrderState = useSelector(
    (state: RootState) => state.AllUserOrder
  )
  
  useEffect(() => {
    dispatch(AllUserOrderFn())
  }, [dispatch])
  
  const [searchTerm, setSearchTerm] = useState('')
  const header = ['Name', 'Image', 'Status', 'Total', 'Created At',"show"]

  const filteredOrders = AllUserOrderState.data.filter(
    (order) =>
      order.Items.some((item) =>
        item.Product.Pr_Name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || order.Or_Total.toString().includes(searchTerm)
  )

  return (
    <div className="or-his">
      <div className="table-container p-4">
        <Card className="mb-4">
          <CardHeader className="bg-blue-600 text-white">
            <Typography variant="h6">User Orders</Typography>
          </CardHeader>
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <Typography variant="paragraph">Search for orders:</Typography>
              <Input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-1/3"
              />
            </div>
            {filteredOrders.length === 0 ? (
              <div className="w-full h-screen flex flex-col items-center justify-center">
                <Typography variant="h2" className="font-bold">
                  Empty
                </Typography>
                <Typography variant="paragraph">
                  You don't have any orders
                </Typography>
                <Link to="/product">
                  <Button color="blue" className="mt-4">
                    Go to Shop
                  </Button>
                </Link>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {header.map((item) => (
                      <th
                        key={item}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.Items[0].Product.Pr_Name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          className="w-16 h-16 rounded-full border border-gray-300 object-cover"
                          src={item.Items[0].Product.Pr_Image.split(',')[0]}
                          alt=""
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.isPaid ? (
                          <span className="text-green-300 font-bold px-3 py-1 rounded-md">
                            Paid
                          </span>
                        ) : (
                          <span className="text-red-600 font-bold px-3 py-1 rounded-md">
                            Not Paid
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${item.Or_Total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {dayjs(item.Created_At).format('DD/MM/YYYY')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-blue-500">
                       <Link to={`/receipt/${item.Or_Id}`}>
                       Show
                       </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default UserOrder
