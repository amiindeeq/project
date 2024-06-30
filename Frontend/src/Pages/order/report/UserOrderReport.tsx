import { getAllOrderFn } from '@/Redux/Slices/orderSlice/AllOrder'
import { AppDispatch, RootState } from '@/Redux/Store'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UserOrderReport = () => {
  const AllUserOrderState = useSelector(
    (state: RootState) => state.AllOrders
  )
  const dispatch = useDispatch<AppDispatch>()

  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: 'All'
  })

  useEffect(() => {
    dispatch(getAllOrderFn())
  }, [dispatch])

  const handleFilterChange = (e) => {
    const { id, value } = e.target
    setFilters(prevFilters => ({ ...prevFilters, [id]: value }))
  }

  const applyFilters = (orders:any) => {
    return orders.filter(order => {
      const orderDate = dayjs(order.Created_At)
      const isWithinDateRange = (!filters.startDate || orderDate.isAfter(filters.startDate)) && (!filters.endDate || orderDate.isBefore(filters.endDate))
      const isStatusMatch = filters.status === 'All' || (filters.status === 'Paid' && order.isPaid) || (filters.status === 'Not Paid' && !order.isPaid)
      return isWithinDateRange && isStatusMatch
    })
  }

  const exportToCSV = (orders) => {
    const headers = ['Order ID', 'User Name', 'Date', 'Status', 'Total']
    const rows = orders.map(order => [
      order.Or_Id,
      order?.User?.Username,
      dayjs(order.Created_At).format('YYYY/MM/DD'),
      order.isPaid ? 'Paid' : 'Not Paid',
      '$150.00' // assuming the total is always $150.00, this might need to be dynamic based on actual data
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('hidden', '')
    a.setAttribute('href', url)
    a.setAttribute('download', 'order_report.csv')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const filteredOrders = applyFilters(AllUserOrderState.data)

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Report Orders
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Filter Section */}
          <section className="mb-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Filter Reports</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={filters.startDate}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="endDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      value={filters.endDate}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>All</option>
                      <option>Paid</option>
                      <option>Not Paid</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => applyFilters(AllUserOrderState.data)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Apply Filters
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Table Section */}
          <section>
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold mb-4">Report Orders</h2>
                <button 
                  onClick={() => exportToCSV(filteredOrders)} 
                  className="bg-blue-gray-500 text-white px-2 rounded"
                >
                  Export
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        User Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order:any) => (
                      <tr key={order.Or_Id}>
                        <td className="px-6 py-4 whitespace-nowrap">{order.Or_Id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order?.User?.Username}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {dayjs(order.Created_At).format('YYYY/MM/DD')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {order.isPaid ? 'Paid' : 'Not Paid'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">$150.00</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default UserOrderReport
