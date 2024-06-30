import dayjs from 'dayjs'
import { useEffect } from 'react'
import { CgMoreVerticalO } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userOrderFn } from '../../Redux/Slices/orderSlice/UserOrders'
import { AppDispatch, RootState } from '../../Redux/Store'
// import './Order.css'
const Allorder = () => {
  const dispatch = useDispatch<AppDispatch>()
  const userOrderState = useSelector((state: RootState) => state.userOrders)
  useEffect(() => {
    dispatch(userOrderFn())
  }, [])

  const navigate = useNavigate()

  const makePayment = async () => {
    const body = {
      product: userOrderState,
    }
    fetch('http://localhost:5000/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) return res.json()
        return res.json().then((json) => Promise.reject(json))
      })
      .then(({ url }) => {
        window.location = url
      })
      .catch((e) => {
        console.log(e.error)
      })
  }

  return (
    <div className=" ">
      <div className="or-btns mt-6 flex justify-end mr-[260px] mb-1 items-center ">
        <button
          className="bg-blue-500 px-4 py-3 rounded-[5px] text-white"
          onClick={() => {
            navigate('userOrder')
          }}
        >
          View Your Orders
        </button>
      </div>
      {/* <div className="w-full mt-2 px-5 flex flex-col items-center justify-center">
        <table className="my-table">
          <thead>
            <tr>
              {header.map((item, idx) => (
                <th key={idx}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userOrderState.data.map((item, idx) => (
              <tr key={idx}>
                {item.Items.map((item, idx) => (
                  <td key={idx} className="flex justify-center items-center ">
                    {' '}
                    <img
                      className="w-[60px] h-[60px] rounded-full p-2 border-2"
                      src={item.Product.Pr_Image}
                      alt=""
                    />{' '}
                  </td>
                ))}
                <td>{item.Or_Status}</td>
                <td className="text-red-600">{item.Or_Total}</td>
                <td>{item.Cr_Id}</td>
                <td>{dayjs(item.Created_At).format('DD/MMM/YYYY')}</td>
                <td>
                  <Link to={`get-one/${item.Or_Id}`}>
                    <div className="flex justify-center items-center">
                      <CgMoreVerticalO />
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden flex flex-col items-center justify-center">
              <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead className="border-b bg-white font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-4">
                      date
                    </th>
                    <th scope="col" className="px-6 py-4">
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userOrderState.data.map((items) => (
                    <tr
                      key={items.Or_Id}
                      className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600"
                    >
                      {items.Items.map((item) => (
                        <>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <img
                              className="w-[60px] h-[60px] relative left- rounded-full "
                              src={item.Product.Pr_Image}
                              alt=""
                            />{' '}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {' '}
                            {items.Or_Status}{' '}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            ${items.Or_Total}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {' '}
                            {dayjs(items.Created_At).format('DD/MMM/YYYY')}{' '}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <Link to={`get-one/${items.Or_Id}`}>
                              <div className="flex justify-center items-center">
                                <CgMoreVerticalO />
                              </div>
                            </Link>
                          </td>
                        </>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={makePayment}
                className="  px-4 py-3  bg-blue-500  my-5 hover:-translate-y-1 duration-500   text-white rounded-[5px]"
              >
                {' '}
                Proceed CheckOUt{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Allorder
