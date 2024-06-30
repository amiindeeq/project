import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../../Components/ui/table'
import { getAllUsersFn } from '../../../../../Redux/Slices/Dashbaord/User/AllUser'
import { AppDispatch, RootState } from '../../../../../Redux/Store'

const ListingSection = () => {
  const AllUserState = useSelector((state: RootState) => state.getAllUsers)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getAllUsersFn())
  }, [])
  console.log(AllUserState.data)

  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center ">ID</TableHead>
          <TableHead className="text-start">userName</TableHead>
          <TableHead className="text-start">Email</TableHead>
          <TableHead className="text-start">Phone</TableHead>
          <TableHead className="text-start">Role</TableHead>
          <TableHead className="text-start">Admin</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {AllUserState.data?.map((user) => (
          <TableRow className="hover:bg-slate-100" key={user.U_Id}>
            <TableCell className="font-medium text-center">
              {user.U_Id}
            </TableCell>
            <TableCell className="text-start">{user.Username}</TableCell>
            <TableCell className="text-start">{user.Email}</TableCell>
            <TableCell className="text-start">{user.Phone}</TableCell>
            <TableCell className="text-start">{user.Role}</TableCell>
            <TableCell className="text-start">
            {' '}
                {user.Is_Admin ? (
                  <span className=" text-green-600">True</span>
                ) : (
                  <span className=" text-red-500">False</span>
                )}{' '}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ListingSection
