import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

// Importing Icons From React Icons
import { BiCategoryAlt } from 'react-icons/bi'
import { LiaProductHunt } from 'react-icons/lia'
import { MdDeliveryDining } from 'react-icons/md'
import { IoMdSpeedometer } from 'react-icons/io'
import { PiUsersThree } from 'react-icons/pi'

// Sidebar Card
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react'
import { BadgeDollarSign, Undo2 } from 'lucide-react'

const dash = [
  { name: 'Dashboard', icon: <IoMdSpeedometer />, link: '/dashboard' },
  { name: 'Users', icon: <PiUsersThree />, link: 'user' },
  { name: 'Category', icon: <BiCategoryAlt />, link: 'category' },
  { name: 'Product', icon: <LiaProductHunt />, link: 'product' },
  { name: 'sales', icon: <BadgeDollarSign />, link: 'order' },
  { name: 'orders', icon: <MdDeliveryDining />, link: 'allorder' },
  { name: 'Back', icon: <Undo2 />, link: '/' },
]

const Sidebar = () => {
  const location = useLocation()
  const [activeLink, setActiveLink] = useState(location.pathname)

  useEffect(() => {
    setActiveLink(location.pathname)
  }, [location])

  return (
    <Card className="h-screen w-27 bg-[#0484fe] max-w-[20rem] p-4 rounded-none">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="white" className="text-center">
          Amiira Ecommerce
        </Typography>
      </div>
      <List>
        {dash.map((item, i) => (
          <Link to={item.link} key={i}>
            <ListItem
              className={`text-white rounded-[5px] ${
                activeLink === item.link ? 'bg-[#148dfe]' : 'hover:bg-[#148dfe]'
              }`}
              onClick={() => setActiveLink(item.link)}
            >
              <ListItemPrefix>
                <span>{item.icon}</span>
              </ListItemPrefix>
              {item.name}
            </ListItem>
          </Link>
        ))}
      </List>
    </Card>
  )
}

export default Sidebar
