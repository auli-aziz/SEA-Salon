import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import AdminSidebar from "../sections/AdminSidebar";

export default function AdminLayout() {
  const [open, setOpen] = useState<boolean>(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  return (
    <div className="w-full min-h-screen bg-gray-200">
      <div
        className={`w-full h-fit px-5 md:px-16 flex items-center justify-between py-5 bg-gray-100 z-20 shadow-lg`}
      >
        <Link to={"/admin"}>
          <h3 className="font-economica text-2xl md:text-3xl font-bold text-red-800">
            Admin Dashboard
          </h3>
        </Link>
        <nav className="ml-auto">
          <ul className="font-economica font-bold text-md md:text-xl">
            <li>
              <button onClick={openDrawer} className="hover:text-red-900">
                Menu
              </button>
            </li>
          </ul>
        </nav>
        <LogoutButton isMobile={false} />
      </div>
      <Outlet />
      <AdminSidebar open={open} closeDrawer={closeDrawer} />
    </div>
  )
}
