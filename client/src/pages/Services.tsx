import ServiceCard from "../components/ServiceCard";
import { Await, defer, useLoaderData } from "react-router-dom";
import { loadServices } from "../util/admin";
import { Suspense } from "react";
import { Service } from "../util/interfaces";

export default function Services() {
  const { services } = useLoaderData() as { services: Service[] };
  return (
    <div className="px-5 md:px-16 pb-10 pt-32 h-fit w-full flex flex-col items-center justify-center">
      <h3 className="font-bold font-economica text-3xl text-red-900 text-center">
        Our Services
      </h3>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-around items-center gap-5">
        <Suspense
          fallback={<p className="text-center font-montserrat">Loading...</p>}
        >
          <Await resolve={services}>
            {(loadedServices) =>
              loadedServices.map((service) => (
                <ServiceCard
                  key={service._id}
                  name={service.name}
                  duration={service.duration}
                />
              ))
            }
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export async function loader() {
  return defer({
    services: loadServices(),
  });
}
