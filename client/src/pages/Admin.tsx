import { useState } from "react";
import Border from "../components/Border";
import StatCard from "../components/StatCard";
import ServiceModal from "../components/ServiceModal";
import axios from "axios";
import { getAuthToken } from "../util/auth";

export default function AdminDashboard() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen((curr) => !curr);
  return (
    <div className="w-full pt-7 px-12">
      <div className="w-fit m-auto border-2 flex flex-wrap justify-center gap-5">
        <StatCard title="Reservations" bgColor="bg-blue-300" num={12} />
        <StatCard title="Reviews" bgColor="bg-red-300" num={5} />
        <StatCard title="Average Rating" bgColor="bg-yellow-400" num={100} />
        <StatCard title="Users" bgColor="bg-purple-300" num={234} />
      </div>
      <div className="h-fit mt-7 p-10 rounded-t-lg bg-white shadow-xl">
        <div className="max-w-80">
          <div className="flex justify-between">
            <h4 className="font-economica font-bold text-2xl">Services</h4>
            <button onClick={handleOpen} className="font-economica bg-gray-800 hover:bg-gray-900 text-white text-xs px-3 rounded-lg">New Service</button>
          </div>

          <Border></Border>
        </div>
      </div>
      <ServiceModal open={open} handleOpen={handleOpen} />
    </div>
  );
}

export async function action({ request }: { request: Request }) {
  const token = getAuthToken();
  try {
    const data = await request.formData();
    const response = await axios.post("/administrator/addservice", {
      name: data.get("name"),
      duration: data.get("duration"),
    }, {
      headers: {
        "Authorization": "Bearer " + token,
      }
    });

    if (response.status !== 201) {
      throw new Error(response.data.message || "Unknown error occurred");
    }

    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
  
      return {
        status: error.response.status,
        message: errorMessage,
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
}