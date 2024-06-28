import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../sections/AdminSidebar";
import AdminNavbar from "../sections/AdminNavbar";

export default function AdminLayout() {
  const [open, setOpen] = useState<boolean>(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  return (
    <div className="w-full min-h-screen bg-gray-200">
      <AdminNavbar openDrawer={openDrawer} />
      <Outlet />
      <AdminSidebar open={open} closeDrawer={closeDrawer} />
    </div>
  )
}
