import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaCodeBranch } from "react-icons/fa6";
import { PiNotebookFill } from "react-icons/pi";
import { RiSettings5Fill } from "react-icons/ri";

export default function AdminSidebar({ open, closeDrawer }: { open: boolean; closeDrawer: () => void; }) {
  return (
    <Drawer open={open} onClose={closeDrawer}>
        <div className="mb-2 flex items-center justify-between p-4">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-red-800">
            SEA Salon
          </h3>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <List>
          <ListItem>
            <ListItemPrefix>
              <MdSpaceDashboard />
            </ListItemPrefix>
            <Link to={"/admin"} onClick={closeDrawer}>
            Dashboard
            </Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <FaCodeBranch />
            </ListItemPrefix>
            Branches
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PiNotebookFill />
            </ListItemPrefix>
            Reservations
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <RiSettings5Fill />
            </ListItemPrefix>
            Settings
          </ListItem>
        </List>
      </Drawer>
  )
}
