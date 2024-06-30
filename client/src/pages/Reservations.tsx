import { Await, defer, useLoaderData } from "react-router-dom";
import { loadBranches, loadReservations } from "../util/admin";
import { Suspense, useEffect, useState } from "react";
import { Branch, Reservation } from "../util/interfaces";
import Border from "../components/Border";
import { deleteReservation } from "../util/http";
import ListItem from "../components/ListItem";
import { formatDate } from "../util/format";

export default function Reservations() {
  const { reservations, branches } = useLoaderData() as {
    reservations: Reservation[];
    branches: Branch[];
  };
  const [branch, setBranch] = useState<string>(branches[0]?.name || "");
  const [reservation, setReservation] = useState<Reservation[]>([]);

  useEffect(() => {
    const fileteredReservation = reservations.filter(
      (r) => r.branch === branch
    );
    setReservation(fileteredReservation);
  }, [branch, reservations]);

  return (
    <div className="md:px-10 px-3">
      <div className="h-fit mt-7 p-10 rounded-t-lg bg-white shadow-xl flex flex-col gap-5 lg:justify-between justify-center">
        <h3 className="font-economica font-bold text-2xl m-auto text-red-900">
          Customer Reservations
        </h3>
        <div className="mt-3 font-montserrat text-sm">
          <label className="font-semibold">Branch</label>
          <div className="mt-3 font-montserrat text-sm">
            <select
              className="h-10 w-full text-gray-900 !border !border-gray-400 bg-white shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 rounded-lg"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <Suspense
                fallback={<p className="font-montserrat m-auto">Loading...</p>}
              >
                <Await resolve={branches}>
                  {(loadedBranches) =>
                    loadedBranches.length > 0 ? (
                      loadedBranches.map((b) => (
                        <option value={b.name} key={b._id}>
                          {b.name}
                        </option>
                      ))
                    ) : (
                      <option className="flex h-full w-full">
                        <p className="m-auto">No branches found</p>
                      </option>
                    )
                  }
                </Await>
              </Suspense>
            </select>
          </div>
        </div>
        <Border>
          <Suspense
            fallback={<p className="font-montserrat m-auto">Loading...</p>}
          >
            <Await resolve={reservations}>
              {reservation.length > 0 ? (
                reservation.map((r) => (
                  <ListItem
                    isAdmin={true}
                    id={r._id}
                    deleteFn={deleteReservation}
                  >
                    <>
                      <p className="text-base md:text-lg font-semibold">
                        {r.name}
                      </p>
                      <div className="w-fit px-3 my-2 bg-red-100 rounded-md text-center font-medium text-xs">
                        {r.typeOfService}
                      </div>
                      <p className="text-xs md:text-sm">{r.phoneNumber}</p>
                      <p className="text-red-900 font-medium text-xs md:text-sm">
                        {formatDate(r.dateAndTime)}
                      </p>
                    </>
                  </ListItem>
                ))
              ) : (
                <div className="flex h-full w-full">
                  <p className="m-auto">No reservations found</p>
                </div>
              )}
            </Await>
          </Suspense>
        </Border>
      </div>
    </div>
  );
}

export async function loader() {
  return defer({
    reservations: await loadReservations(),
    branches: await loadBranches(),
  });
}
