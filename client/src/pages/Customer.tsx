import { Suspense, useState } from "react";
import {
  defer,
  useRouteLoaderData,
  Await,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";
import ReservationsHistory from "../sections/ReservationsHistory";
import { loadProfile } from "../util/admin";
import DetailModal from "../components/DetailModal";
import { formatDate } from "../sections/ReservationsHistory";
import { Profile, Reservation } from "../util/interfaces";

export default function CustomerDashboard() {
  const { profile, reservations } = useRouteLoaderData(
    "customer-dashboard"
  ) as { profile: Profile; reservations: Reservation[] };
  const [detail, setDetail] = useState<Reservation | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = (detail: Reservation | null) => {
    setOpen((curr) => !curr);
    setDetail(detail);
  };

  return (
    <div className="w-full h-fit py-10 lg:px-20 px-5 flex flex-wrap justify-center lg:justify-between gap-5">
      <Suspense fallback={<p className="font-montserrat m-auto">Loading...</p>}>
        <Await resolve={profile}>
          {(loadedProfile) => <ProfileCard profile={loadedProfile} />}
        </Await>
      </Suspense>
      <div className="h-[550px] w-full m-auto md:m-0 md:w-[600px] p-5 rounded-lg border border-black shadow-xl">
        <h4 className="font-montserrat font-semibold">Reservation History</h4>
        <Suspense
          fallback={<p className="font-montserrat m-auto">Loading...</p>}
        >
          <Await resolve={reservations}>
            {(loadedReservations) => (
              <ReservationsHistory
                reservations={loadedReservations}
                handleOpen={handleOpen}
              />
            )}
          </Await>
        </Suspense>
        <button
          className={`w-full flex justify-center font-economica mt-5 font-bold text-xl border-2 border-red-800 bg-white text-red-800 py-1 px-5 rounded-xl hover:bg-red-800 hover:text-gray-200`}
          onClick={() => navigate("/reservation")}
        >
          Make a new Reservation
        </button>
        <DetailModal
          title={"Reservation Detail"}
          open={open}
          handleOpen={() => handleOpen(null)}
          detail={detail}
          formatDate={formatDate}
        >
          <table className="w-full mt-5 text-left font-montserrat text-sm text-gray-800">
            <tr className="h-7">
              <td className="font-semibold w-52">Type of Service:</td>
              <td className="font-regular">{detail?.typeOfService}</td>
            </tr>
            <tr className="h-7">
              <td className="font-semibold w-52">Branch:</td>
              <td className="font-regular">{detail?.branch}</td>
            </tr>
            <tr className="h-7">
              <td className="font-semibold w-52">Customer Name:</td>
              <td className="font-regular">{detail?.name}</td>
            </tr>
            <tr className="h-7">
              <td className="font-semibold w-52">Phone Number:</td>
              <td className="font-regular">{detail?.phoneNumber}</td>
            </tr>
            <tr className="h-7">
              <td className="font-semibold w-52">Date & Time:</td>
              <td className="font-regular">
                {detail && formatDate(detail?.dateAndTime)}
              </td>
            </tr>
            <tr className="h-7">
              <td className="font-semibold w-52">Booking Time:</td>
              <td className="font-regular">
                {detail && formatDate(detail?.updatedAt)}
              </td>
            </tr>
          </table>
        </DetailModal>
      </div>
    </div>
  );
}

async function loadReservations() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("/customer/reservations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.status !== 200) {
      throw new Error(response.data.message || "Unknown error occurred");
    }

    return response.data;
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

export async function loader() {
  return defer({
    profile: await loadProfile(),
    reservations: loadReservations(),
  });
}
