import { useState, Suspense } from "react";
import Border from "../components/Border";
import StatCard from "../components/StatCard";
import ServiceModal from "../components/forms/ServiceModal";
import axios from "axios";
import { getAuthToken } from "../util/auth";
import { defer, Await, useLoaderData } from "react-router-dom";
import { loadBranches, loadReservations, loadServices } from "../util/admin";
import { FiPlusCircle } from "react-icons/fi";
import ListItem from "../components/ListItem";
import BranchSection from "../sections/BranchSection";
import { Service, Branch, Review, Reservation } from "../util/interfaces";
import { loadReviews } from "../components/ReviewCarousel.tsx";
import { deleteService } from "../util/http.tsx";

const calculateAverageRating = (reviews: Review[]) => {
  if (reviews.length === 0) return 0;

  let sum: number = 0;
  reviews.forEach((r) => {
    sum += r.rating;
  });

  const average = sum / reviews.length;
  return Number(average.toFixed(2));
};

export default function AdminDashboard() {
  const [open, setOpen] = useState<boolean>(false);
  const { services, branches, reviews, reservations } = useLoaderData() as {
    services: Service[];
    branches: Branch[];
    reviews: Review[];
    reservations: Reservation[];
  };
  const handleOpen = () => setOpen((curr) => !curr);

  return (
    <div className="w-full pt-7 px-5 md:px-12">
      <div className="w-fit m-auto border-2 flex flex-wrap justify-center gap-5">
        <Suspense
          fallback={<p className="font-montserrat m-auto">Loading...</p>}
        >
          <Await resolve={branches}>
            {(loadedBranches) => (
              <StatCard
                title="Branches"
                bgColor="bg-blue-200"
                num={loadedBranches.length}
              />
            )}
          </Await>
        </Suspense>
        <Suspense
          fallback={<p className="font-montserrat m-auto">Loading...</p>}
        >
          <Await resolve={reservations}>
            {(loadedReservations) => (
              <StatCard
                title="Reservations"
                bgColor="bg-red-300"
                num={loadedReservations.length}
              />
            )}
          </Await>
        </Suspense>
        <Suspense
          fallback={<p className="font-montserrat m-auto">Loading...</p>}
        >
          <Await resolve={reviews}>
            {(loadedReviews) => (
              <>
                <StatCard
                  title="Average Rating"
                  bgColor="bg-yellow-200"
                  num={calculateAverageRating(loadedReviews)}
                />
                <StatCard
                  title="Reviews"
                  bgColor="bg-purple-200"
                  num={loadedReviews.length}
                />
              </>
            )}
          </Await>
        </Suspense>
      </div>
      <div className="h-fit mt-7 p-10 rounded-t-lg bg-white shadow-xl flex flex-wrap gap-5 lg:justify-between justify-center">
        <div className="md:max-w-[300px] w-full">
          <div className="flex justify-between items-center">
            <h4 className="font-economica font-bold text-2xl">Services</h4>
            <div className="text-xl" onClick={handleOpen}>
              <FiPlusCircle className="hover:cursor-pointer" />
            </div>
          </div>

          <Border>
            <Suspense
              fallback={<p className="font-montserrat m-auto">Loading...</p>}
            >
              <Await resolve={services}>
                {(loadedServices: Service[]) =>
                  loadedServices.map((s) => (
                    <ListItem
                      key={s._id}
                      isAdmin={true}
                      id={s._id}
                      deleteFn={deleteService}
                    >
                      <>
                        <p className="font-bold">{s.name}</p>
                        <p className="mt-1 text-xs">
                          <span className="font-medium">Duration:</span>{" "}
                          {s.duration} Minute{s.duration > 1 && "s"}
                        </p>
                      </>
                    </ListItem>
                  ))
                }
              </Await>
            </Suspense>
          </Border>
        </div>
        <div className="md:max-w-[900px] w-full">
          <div className="flex justify-between items-center">
            <h4 className="font-economica font-bold text-2xl m-auto">
              Branches
            </h4>
          </div>
          <Suspense
            fallback={<p className="font-montserrat m-auto">Loading...</p>}
          >
            <Await resolve={branches}>
              {(loadedBranches) => (
                <BranchSection branches={loadedBranches} searchable={false} />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <ServiceModal open={open} handleOpen={handleOpen} />
    </div>
  );
}

export async function loader() {
  return defer({
    services: loadServices(),
    branches: loadBranches(),
    reviews: loadReviews(),
    reservations: loadReservations(),
  });
}

export async function action({ request }: { request: Request }) {
  const token = getAuthToken();
  try {
    const data = await request.formData();
    const response = await axios.post(
      "/administrator/addservice",
      {
        name: data.get("name"),
        duration: Number(data.get("duration")),
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

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
