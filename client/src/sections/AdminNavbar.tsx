import { Link, useRouteLoaderData } from "react-router-dom";
import AuthButton from "../components/AuthButton";

export default function AdminNavbar({ openDrawer }: { openDrawer: () => void}) {
  const token = useRouteLoaderData("root") as string | null;
  
  return (
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
        <AuthButton isAdminDashboard={true} isLogin={!!token} />
      </div>
  )
}
