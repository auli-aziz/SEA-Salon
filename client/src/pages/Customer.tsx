import { Suspense } from "react";
import { defer, useRouteLoaderData, Await, redirect } from "react-router-dom";
import axios from "axios";
import ProfileCard, { Profile } from "../components/ProfileCard";
import ReservationsCard, { Reservation } from "../components/ReservationsCard";

export default function CustomerDashboard() {
  const { profile, reservations } = useRouteLoaderData("customer-dashboard") as { profile: Profile, reservations: Reservation[]};
  
  return (
    <div className="w-full h-fit py-10 px-20 flex flex-wrap justify-between gap-5">
      <Suspense fallback={<p className="font-montserrat m-auto">Loading...</p>}>
        <Await resolve={profile}>
          {(loadedProfile) => <ProfileCard profile={loadedProfile} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p className="font-montserrat m-auto">Loading...</p>}>
        <Await resolve={reservations}>
          {(loadedReservations) => (
            <ReservationsCard reservations={loadedReservations} />
          )}
        </Await>
      </Suspense>
    </div>
  );
}

async function loadProfile() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("/customer/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.status !== 200) {
      throw new Error(response.data.message || "Unknown error occurred");
    }    
    
    if(response.data.role === "admin") {
      redirect("/admin")
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
