import { getOneOrderFn } from '@/Redux/Slices/orderSlice/OneOrder'
import { AppDispatch, RootState } from '@/Redux/Store'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import html2pdf from 'html2pdf.js' // Import html2pdf library

const ReceiptPayment = () => {
  const { Or_Id } = useParams()

  const dispatch = useDispatch<AppDispatch>()
  const order = useSelector((state: RootState) => state.oneOrder)

  useEffect(() => {
    dispatch(getOneOrderFn(Or_Id))
  }, [])

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    const element = document.getElementById('invoice-container')
    html2pdf().from(element).save()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <label htmlFor="upload-logo" className="cursor-pointer">
              <div className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Amira Ecommerce</p>
              </div>
            </label>
          </div>
          <div className="text-right">
            <span className="bg-orange-100 text-orange-600 py-1 px-3 rounded-full text-sm">PAID</span>
          </div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Invoice</h1>
          <div className="mt-4 flex justify-center space-x-4 text-gray-600">
            <p>Date: <span className="font-medium"></span> {dayjs(order.data.Created_At).format("YYYY/MM/DD")} </p>
            <p>Invoice #: <span className="font-medium"> {order.data.Or_Id} </span></p>
          </div>
        </div>
        <div className="mb-8" id="invoice-container"> {/* Added id for HTML2PDF */}
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-700">BILL FROM:</h2>
              <p className="text-gray-600"> {order?.data?.User?.Username} </p>
              <p className="text-gray-600"> {order?.data?.User?.Phone} </p>
              <p className="text-gray-600">{order?.data?.User?.Email}</p>
            </div>
            <div className="text-right">
              <h2 className="text-lg font-bold text-gray-700">BILL TO:</h2>
              <p className="text-gray-600"> Amiira </p>
              <p className="text-gray-600">+252 63 453 6457</p>
              <p className="text-gray-600">amiira@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 border-b">Item Name</th>
                <th className="py-2 border-b">Description</th>
                <th className="py-2 border-b">Quantity</th>
                <th className="py-2 border-b">Amount</th>
                <th className="py-2 border-b">Price</th>
              </tr>
            </thead>
            <tbody>
              {order?.data?.Items?.map((product: any) => (
                <tr>
                  <td className="py-2 border-b"> {product?.Pr_Name} </td>
                  <td className="py-2 border-b"> {product?.Product?.Pr_Desc} </td>
                  <td className="py-2 border-b"> {product?.data?.quant} </td>
                  <td className="py-2 border-b"> ${order?.data?.Or_Total} </td>
                  <td className="py-2 border-b"> ${order?.data?.Or_Total} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Subtotal: <span className="font-medium">${order?.data?.Or_Total}</span></p>
          <p className="text-gray-600">Taxes: <span className="font-medium">0.00%</span></p>
          <p className="text-gray-600">Balance (USD): <span className="text-blue-600 font-bold">${order?.data?.Or_Total}</span></p>
        </div>
        {/* Download button for PDF */}
        <button onClick={handleDownloadPDF} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Download Invoice</button>
      </div>
    </div>
  )
}

export default ReceiptPayment
