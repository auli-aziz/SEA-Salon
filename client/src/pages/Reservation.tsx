import { Suspense } from "react";
import { defer, useLoaderData, Await } from "react-router-dom";
import ReservationForm from "../components/forms/ReservationForm";
import { loadBranches } from "../util/admin";
import { Branch, Service } from "../util/interfaces.tsx";

export default function Reservation() {
  const { services, branches } = useLoaderData() as {
    services: Service[];
    branches: Branch[];
  };

  return (
    <div className="flex items-center py-16 px-5 md:px-32 flex-col">
      <div className="h-fit w-full relative">
        <Suspense
          fallback={<p className="font-montserrat m-auto">Loading...</p>}
        >
          <Await resolve={branches}>
            {(resolvedBranches) => (
              <ReservationForm
                branches={resolvedBranches}
              />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export async function loader() {
  return defer({
    branches: await loadBranches(),
  });
}
