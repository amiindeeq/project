import { ClipboardMinus, LayoutDashboard, LogOut } from 'lucide-react'

import { Avatar } from '@/Components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../../../Components/ui/dropdown-menu'
import { Link } from 'react-router-dom'
import { AppDispatch } from '@/Redux/Store'
import { logout } from '@/Redux/Slices/userInfo'
import { useDispatch } from 'react-redux'
export function DropdownMenuDemo({user}:any) {
  const dispatch = useDispatch<AppDispatch>()

  const logOutHandler = () => {
    dispatch(logout())
  }
  return (
   <div className="bg-white">
     <DropdownMenu>
      <DropdownMenuTrigger className='bg-white' asChild>
        <Avatar className="cursor-pointer bg-blue-600 rounded-full flex items-center justify-center text-white">
          <p> {user?.Username.slice(0,2).toUpperCase()} </p>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 relative bg-white border-none shadow -left-10 ">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

      {user?.Role ==="USER" ? (
        ""
      ): <Link to={'/dashboard'}>
      <DropdownMenuItem className='cursor-pointer'>
         <LayoutDashboard className="mr-2 h-4 w-4" />
         <span>Dashboard</span>
       </DropdownMenuItem>
      </Link>}
      <Link to={'order/userOrder'}>
      <DropdownMenuItem className='cursor-pointer'>
         <ClipboardMinus className="mr-2 h-4 w-4" />
         <span>your orders</span>
       </DropdownMenuItem>
      </Link>
        <DropdownMenuItem onClick={logOutHandler} className='cursor-pointer'>
          <LogOut  className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
   </div>
  )
}
