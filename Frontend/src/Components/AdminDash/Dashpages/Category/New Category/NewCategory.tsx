import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createCategoryFn,
  resetCategoryState,
} from '../../../../../Redux/Slices/Dashbaord/Category/CreatingNew'
import { AppDispatch, RootState } from '../../../../../Redux/Store'
import { ComHeader } from '../../ComponentHeader/ComHeader'
// import { newCategory } from "../../../../../Interfaces";
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const NewCategory = () => {
  const toastId = 'creatingcategory'
  const [Ca_Name, setCa_Name] = useState('')
  const [Ca_Desc, setCa_Desc] = useState('')
  const [Ca_Image, setCa_Image] = useState<File | null>(null)

  const createCategoryState = useSelector(
    (state: RootState) => state.createCategory
  )

  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const data = {
      Ca_Name,
      Ca_Desc,
      Ca_Image,
    }

    dispatch(createCategoryFn(data))
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (createCategoryState.IsLoading) {
      toast.loading('Saving...', { id: toastId })
    }
    if (createCategoryState.IsSuccess) {
      toast.success('Successfully Created This Category', { id: toastId })
      navigate('/dashboard/category')
    }
    if (createCategoryState.IsError) {
      toast.error(createCategoryState.Error_Message, { id: toastId })
    }
    dispatch(resetCategoryState())
  }, [
    createCategoryState.IsLoading,
    createCategoryState.IsSuccess,
    createCategoryState.IsError,
  ])

  return (
    <>
      <div>
        <ComHeader
          btnText="Result"
          title="Creating New Category"
          to="category"
          trash="category/trash"
        />

        {/* <div classNameName=" flex flex-col items-center justify-center w-full  bg-white">
        <div classNameName="flex  items-center gap-4 ">
          <div classNameName="name-input  grid">
            <label> Name </label>
            <input
              type="text"
              value={Ca_Name}
              onChange={(e) => setCa_Name(e.target.value)}
              placeholder="Please Enter Category Name "
            />
          </div>
          <div classNameName="desc-i grid">
            <label> Description </label>
            <input
              value={Ca_Desc}
              onChange={(e) => setCa_Desc(e.target.value)}
              type="text"
              placeholder=" Please Enter Category Description "
            />
          </div>
        </div>
      <div classNameName="mt-6">
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setCa_Image(e.target.files[0])
            }
          }}
        />
      </div>
      <div classNameName="w-[60%] h-10 rounded-[3px]  duration-300 hover:bg-transparent hover:border-2 bg-blue-600 text-white inline-block  hover:text-black border-blue-600">
        <button onClick={handleSubmit}>
          {' '}
          {createCategoryState.IsLoading ? 'Loading...' : 'Save'}{' '}
        </button>
      </div>
      </div> */}
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <form className="flex flex-col">
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-gray-700 dark:text-gray-200">
                  category name
                </label>
                <input
                  id="username"
                  value={Ca_Name}
                  onChange={(e) => setCa_Name(e.target.value)}
                  placeholder="Please Enter Category Name "
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-200">
                  Discription
                </label>
                <input
                  value={Ca_Desc}
                  onChange={(e) => setCa_Desc(e.target.value)}
                  type="text"
                  placeholder=" Please Enter Category Description "
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-200">
                  file upload
                </label>
                <input
                  type="file"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setCa_Image(e.target.files[0])
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                className="w-[60%] h-10 rounded-[3px]  duration-300 hover:bg-transparent hover:border-2 bg-blue-600 text-white inline-block  hover:text-black border-blue-600"
              >
                {createCategoryState.IsLoading ? 'Loading...' : 'Save'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}

export default NewCategory
