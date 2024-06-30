import {
    PresentationChartBarIcon
} from '@heroicons/react/24/solid'
import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Typography
} from '@material-tailwind/react'

export function DefaultSidebar() {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Hubaal
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
      </List>
    </Card>
  )
}
