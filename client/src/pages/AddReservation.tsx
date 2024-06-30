import { Suspense } from "react";
import { defer, useLoaderData, Await } from "react-router-dom";
import ReservationForm from "../components/forms/ReservationForm.tsx";
import { loadBranches } from "../util/admin.tsx";
import { Branch } from "../util/interfaces.tsx";

export default function Reservation() {
  const { branches } = useLoaderData() as {
    branches: Branch[];
  };

  return (
    <div className="flex items-center pb-16 pt-32 px-5 md:px-32 lg:px-56 xl:px-80 flex-col">
      <div className="h-fit w-full relative">
        <Suspense
          fallback={<p className="font-montserrat m-auto">Loading...</p>}
        >
          <Await resolve={branches}>
            {(resolvedBranches) => (
              <ReservationForm branches={resolvedBranches} />
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
